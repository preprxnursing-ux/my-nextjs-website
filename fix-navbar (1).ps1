$lines = Get-Content components\Navbar.tsx
$before = $lines[0..454]
$after = $lines[480..($lines.Count - 1)]
$insert = @(
'            {user ? (',
'              <>',
'                <Link href="/dashboard" className={`nav-btn${isActive(pathname, "/dashboard") ? " active" : ""}`}>Dashboard</Link>',
'                <span style={{ width: "1px", height: "16px", background: "rgba(255,255,255,.1)", margin: "0 2px", flexShrink: 0 }} />',
'                {appLinks.map((link) => (',
'                  <Link key={link.label} href={link.href} className={`nav-btn${isActive(pathname, link.href) ? " active" : ""}`}>',
'                    {link.label}',
'                  </Link>',
'                ))}',
'              </>',
'            ) : (',
'              <>',
'                <Link href="/educators" className={`nav-btn${isActive(pathname, "/educators") ? " active" : ""}`}>For Educators</Link>',
'                <FeaturesDropdown pathname={pathname} />',
'                <TestimonialsDropdown pathname={pathname} />',
'                <ContactDropdown pathname={pathname} />',
'                <Link href="/pricing" className={`nav-btn${isActive(pathname, "/pricing") ? " active" : ""}`}>Pricing</Link>',
'                <span style={{ width: "1px", height: "16px", background: "rgba(255,255,255,.1)", margin: "0 2px", flexShrink: 0 }} />',
'              </>',
'            )}'
)
$newlines = $before + $insert + $after
[System.IO.File]::WriteAllLines("$PWD\components\Navbar.tsx", $newlines, [System.Text.UTF8Encoding]::new($false))
Write-Host "Done! Lines: $((Get-Content components\Navbar.tsx).Count)"
