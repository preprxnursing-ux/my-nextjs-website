$lines = Get-Content components\Navbar.tsx

# Find the "App" label line and the closing </div> after appLinks
$appLabelIdx = -1
$appEndIdx = -1
for ($i = 580; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match 'App' -and $lines[$i] -match 'uppercase' -and $appLabelIdx -eq -1) {
        $appLabelIdx = $i
    }
    if ($appLabelIdx -gt 0 -and $i -gt ($appLabelIdx + 5) -and $lines[$i] -match '^\s+</div>$' -and $appEndIdx -eq -1) {
        $appEndIdx = $i
    }
}

Write-Host "App label at 0-index: $appLabelIdx (line $($appLabelIdx+1))"
Write-Host "App end at 0-index: $appEndIdx (line $($appEndIdx+1))"
Write-Host "App label content: $($lines[$appLabelIdx])"
Write-Host "App end content: $($lines[$appEndIdx])"
