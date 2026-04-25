$b64 = [System.IO.File]::ReadAllText("$PSScriptRoot\nb2.txt").Trim()
$bytes = [Convert]::FromBase64String($b64)
[System.IO.File]::WriteAllBytes("$PWD\components\Navbar.tsx", $bytes)
Write-Host "Done!"
