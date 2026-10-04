# Rigenera ../og-image.png (1200x630) da social/og-image.html con Edge (o Chrome) headless.
# Uso: powershell -File social/build-og-image.ps1
$ErrorActionPreference = 'Stop'

$source = Join-Path $PSScriptRoot 'og-image.html'
$output = Join-Path (Split-Path $PSScriptRoot -Parent) 'og-image.png'

$candidates = @(
    "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe"
)
$browser = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $browser) { throw 'Nessun browser Chromium trovato (Edge o Chrome).' }

# Profilo temporaneo: evita il lock sul profilo dell'utente se il browser e' gia' aperto.
$profile = Join-Path $env:TEMP "og-build-$([guid]::NewGuid().ToString('N'))"
try {
    # Il budget di tempo virtuale lascia caricare i font di Google prima dello scatto.
    # Non chiamare la lista "$args": e' una variabile automatica di PowerShell.
    $browserArgs = @(
        '--headless=new', '--disable-gpu', '--hide-scrollbars',
        '--force-device-scale-factor=1', '--window-size=1200,630',
        '--virtual-time-budget=8000',
        "--user-data-dir=$profile",
        "--screenshot=$output",
        ([uri](Resolve-Path $source).Path).AbsoluteUri
    )
    & $browser @browserArgs | Out-Null
    if (-not (Test-Path $output)) { throw "Immagine non generata: $output" }

    Add-Type -AssemblyName System.Drawing
    $img = [System.Drawing.Image]::FromFile($output)
    $size = "$($img.Width)x$($img.Height)"
    $img.Dispose()
    Write-Host "OK: $output ($size, $([math]::Round((Get-Item $output).Length / 1KB, 1)) KB)"
    if ($size -ne '1200x630') { Write-Warning "Dimensioni attese 1200x630, ottenute $size" }
}
finally {
    Remove-Item $profile -Recurse -Force -ErrorAction SilentlyContinue
}
