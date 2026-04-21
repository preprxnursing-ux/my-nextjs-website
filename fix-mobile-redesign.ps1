$lines = Get-Content components\Navbar.tsx
$before = $lines[0..582]
$after = $lines[648..($lines.Count - 1)]
$insert = [System.Collections.Generic.List[string]]::new()
