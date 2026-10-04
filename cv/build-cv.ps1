# Rigenera ../cv.pdf da cv/cv.html con Edge (o Chrome) in modalita' headless.
# Uso: powershell -File cv/build-cv.ps1
$ErrorActionPreference = 'Stop'

$source = Join-Path $PSScriptRoot 'cv.html'
$output = Join-Path (Split-Path $PSScriptRoot -Parent) 'cv.pdf'

$candidates = @(
    "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe"
)
$browser = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $browser) { throw 'Nessun browser Chromium trovato (Edge o Chrome).' }

# Profilo temporaneo: evita il lock sul profilo dell'utente se il browser e' gia' aperto.
$profile = Join-Path $env:TEMP "cv-build-$([guid]::NewGuid().ToString('N'))"
try {
    # Non chiamare la lista "$args": e' una variabile automatica di PowerShell.
    $browserArgs = @(
        '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
        "--user-data-dir=$profile",
        "--print-to-pdf=$output",
        ([uri](Resolve-Path $source).Path).AbsoluteUri
    )
    & $browser @browserArgs | Out-Null
    if (-not (Test-Path $output)) { throw "PDF non generato: $output" }
    Write-Host "OK: $output ($([math]::Round((Get-Item $output).Length / 1KB, 1)) KB)"
}
finally {
    Remove-Item $profile -Recurse -Force -ErrorAction SilentlyContinue
}
