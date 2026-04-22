$files = Get-ChildItem -Recurse -Include "*.tsx","*.ts" -Path "app","components"

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $content = $content.Replace("â€"", "-")
    $content = $content.Replace("â€˜", "'")
    $content = $content.Replace("â€™", "'")
    $content = $content.Replace("â€œ", '"')
    $content = $content.Replace("â†'", "->")
    $content = $content.Replace("â†"", "<-")
    $content = $content.Replace("âœ"", "")
    $content = $content.Replace("âœ…", "")
    $content = $content.Replace("ðŸ'‹", "")
    $content = $content.Replace("ðŸ›'", "")
    $content = $content.Replace("Â·", ".")
    $content = $content.Replace("Â ", " ")
    $content = $content.Replace("â€¢", "-")
    $content = $content.Replace("Â®", "(R)")
    $content = $content.Replace("Â©", "(c)")
    $content = $content.Replace("ðŸ"š", "")
    $content = $content.Replace("ðŸŽ"", "")
    $content = $content.Replace("ðŸ¥", "")
    $content = $content.Replace("ðŸ"‹", "")
    $content = $content.Replace("â¤ï¸", "")
    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.UTF8Encoding]::new($false))
}

Write-Host "Done! Processed $($files.Count) files."
