$lines = Get-Content components\Navbar.tsx
$before = $lines[0..614]
$after = $lines[625..($lines.Count - 1)]
$insert = @(
'              {user && (',
'              <>',
'              <p style={{ fontSize: "10px", fontWeight: 700, color: "#334155", letterSpacing: ".16em", textTransform: "uppercase", padding: "10px 8px 2px" }}>My Portal</p>',
'              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>',
'                <Link href="/dashboard" onClick={() => setMobileOpen(false)}',
'                  style={{ display: "block", padding: "10px 14px", borderRadius: "10px", background: isActive(pathname, "/dashboard") ? "rgba(14,165,233,.15)" : "rgba(255,255,255,.05)", border: `1px solid ${isActive(pathname, "/dashboard") ? "rgba(14,165,233,.3)" : "rgba(255,255,255,.08)"}`, fontSize: "13px", fontWeight: 600, color: isActive(pathname, "/dashboard") ? "#38bdf8" : "#94a3b8", textDecoration: "none" }}>',
'                  Dashboard',
'                </Link>',
'                {appLinks.map((link) => (',
'                  <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}',
'                    style={{ display: "block", padding: "10px 14px", borderRadius: "10px", background: isActive(pathname, link.href) ? "rgba(14,165,233,.15)" : "rgba(255,255,255,.05)", border: `1px solid ${isActive(pathname, link.href) ? "rgba(14,165,233,.3)" : "rgba(255,255,255,.08)"}`, fontSize: "13px", fontWeight: 600, color: isActive(pathname, link.href) ? "#38bdf8" : "#94a3b8", textDecoration: "none" }}>',
'                    {link.label}',
'                  </Link>',
'                ))}',
'              </div>',
'              </>',
'              )}'
)
$newlines = $before + $insert + $after
[System.IO.File]::WriteAllLines("$PWD\components\Navbar.tsx", $newlines, [System.Text.UTF8Encoding]::new($false))
Write-Host "Done! Lines: $((Get-Content components\Navbar.tsx).Count)"
