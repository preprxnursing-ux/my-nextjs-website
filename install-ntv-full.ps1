$b64 = [System.IO.File]::ReadAllText("$PSScriptRoot\ntv-full-b64.txt").Trim()
$bytes = [Convert]::FromBase64String($b64)
New-Item -ItemType Directory -Force -Path "$PWD\app\nursing-tv" | Out-Null
[System.IO.File]::WriteAllBytes("$PWD\app\nursing-tv\page.tsx", $bytes)
Write-Host "Nursing TV cinematic page installed!"
