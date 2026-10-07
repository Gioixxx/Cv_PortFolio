# Invoke-OllamaGenerate.ps1 - chiamata locale al provider LLM (best-effort).
# Nome file, nome funzione e parametri restano quelli storici; il corpo delega a
# scripts/lib/_llm.ps1, che sceglie provider e trasporto (Ollama /api/generate
# oppure LM Studio /v1/chat/completions).
#   LLM_PROVIDER, OLLAMA_URL/OLLAMA_MODEL, LMSTUDIO_URL/LMSTUDIO_MODEL,
#   OLLAMA_TIMEOUT (secondi, default 120, vale per entrambi i provider).
# Tra env e default si consulta models.json (progetto > libreria).

# Riusa Resolve-RalphRefPath per Build-OllamaContext (doppio dot-source innocuo).
. (Join-Path $PSScriptRoot 'Expand-RalphPrompt.ps1')
. (Join-Path $PSScriptRoot 'Resolve-ModelsConfig.ps1')

# _llm.ps1 nel progetto consumer e' distribuito qui accanto da sync-ralph; nel
# repo della libreria vive in scripts/lib/. Ricerca a 2 candidati: questo file
# non puo' dot-sourciare fuori da ralph/lib/ una volta copiato nel progetto.
foreach ($cand in @(
    (Join-Path $PSScriptRoot '_llm.ps1'),
    (Join-Path $PSScriptRoot '..\..\scripts\lib\_llm.ps1')
)) {
    if (Test-Path $cand -PathType Leaf) { . $cand; break }
}

function Invoke-OllamaGenerate {
    # Ritorna il testo generato, o $null su qualunque errore (provider offline,
    # timeout, modello mancante). Mai eccezioni: il chiamante degrada con warning.
    param(
        [Parameter(Mandatory = $true)]
        [string]$Prompt,

        [string]$Model = '',
        [string]$Url = '',
        [int]$TimeoutSec = 0
    )

    if (-not (Get-Command Invoke-LlmGenerate -ErrorAction SilentlyContinue)) {
        Write-Verbose '[Invoke-OllamaGenerate] _llm.ps1 non trovato'
        return $null
    }

    # num_ctx alto: Build-OllamaContext inietta fino a 24000 char di contesto nel
    # prompt; col default Ollama (4096) verrebbe troncato in silenzio. Su lmstudio
    # e' load-time e il payload builder lo scarta.
    return Invoke-LlmGenerate -Prompt $Prompt -ProjectDir (Get-Location).Path `
        -Model $Model -Url $Url -TimeoutSec $TimeoutSec -NumCtx 16384
}

function Build-OllamaContext {
    # Espande le righe @ref di un context block in blocchi FILE inline con cap di
    # dimensione (Ollama riceve il contesto nel prompt, non risolve i riferimenti).
    param(
        [Parameter(Mandatory = $true)]
        [AllowEmptyString()]
        [string]$ContextBlock,

        [Parameter(Mandatory = $true)]
        [string]$ProjectDir,

        [string]$ClaudeLibsPath = '',
        [int]$PerFileCap = 8000,
        [int]$TotalCap = 24000
    )

    $sb = New-Object System.Text.StringBuilder
    foreach ($line in ($ContextBlock -split "`r?`n")) {
        $ref = $line.Trim()
        if ($ref -notmatch '^@') { continue }
        $path = Resolve-RalphRefPath -Ref $ref -ProjectDir $ProjectDir -ClaudeLibsPath $ClaudeLibsPath
        if (-not $path -or -not (Test-Path $path -PathType Leaf)) { continue }
        $content = Get-Content -Path $path -Raw -Encoding utf8
        if ($null -eq $content) { continue }
        if ($content.Length -gt $PerFileCap) {
            $content = $content.Substring(0, $PerFileCap) + "`n[...troncato...]"
        }
        [void]$sb.AppendLine("--- FILE: $($ref.Substring(1)) ---")
        [void]$sb.AppendLine($content)
        [void]$sb.AppendLine("--- END FILE ---")
        if ($sb.Length -ge $TotalCap) { break }
    }

    $text = $sb.ToString()
    if ($text.Length -gt $TotalCap) {
        $text = $text.Substring(0, $TotalCap) + "`n[...contesto troncato...]"
    }
    return $text
}
