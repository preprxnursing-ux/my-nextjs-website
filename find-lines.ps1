$lines = Get-Content components\Navbar.tsx

# We know from inspection:
# "Pages" label is around index 597 (line 598)
# "App" section starts around index 607 (line 608)  
# App section ends around index 617 (line 618)
# Get started mobile button is around index 637 (line 638)

# Find exact indices
$pagesLabelIdx = -1
$appLabelIdx = -1
$appSectionEndIdx = -1
$mobileGetStartedIdx = -1

for ($i = 550; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '"Pages"' -and $pagesLabelIdx -eq -1) { $pagesLabelIdx = $i; Write-Host "Pages at $i: $($lines[$i].Trim())" }
    if ($lines[$i] -match '"App"' -and $appLabelIdx -eq -1) { $appLabelIdx = $i; Write-Host "App at $i: $($lines[$i].Trim())" }
    if ($appLabelIdx -gt 0 -and $i -gt ($appLabelIdx+5) -and $lines[$i] -match '^\s+</div>$' -and $appSectionEndIdx -eq -1) { $appSectionEndIdx = $i; Write-Host "AppEnd at $i: $($lines[$i].Trim())" }
    if ($lines[$i] -match 'auth/signup' -and $lines[$i] -match 'Get started') { $mobileGetStartedIdx = $i; Write-Host "GetStarted at $i: $($lines[$i].Trim())" }
}
