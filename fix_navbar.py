with open(r'components\Navbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Reorder logged-out nav items and remove Get Started
old = '''              <>
                <NursingTVDropdown pathname={pathname} />
                <FeaturesDropdown pathname={pathname} />
                <TestimonialsDropdown pathname={pathname} />
                <ContactDropdown pathname={pathname} />
                <Link href="/pricing" className={`nav-btn${isActive(pathname, "/pricing") ? " active" : ""}`}>Pricing</Link>
                <span style={{ width: "1px", height: "16px", background: "rgba(255,255,255,.1)", margin: "0 2px", flexShrink: 0 }} />
              </>'''

new = '''              <>
                <CoursesDropdown pathname={pathname} />
                <FeaturesDropdown pathname={pathname} />
                <TestimonialsDropdown pathname={pathname} />
                <NursingTVDropdown pathname={pathname} />
                <ContactDropdown pathname={pathname} />
                <Link href="/pricing" className={`nav-btn${isActive(pathname, "/pricing") ? " active" : ""}`}>Pricing</Link>
              </>'''

content = content.replace(old, new)

# Remove Get Started button
content = content.replace(
    '{!user && <Link href="/auth/signup" className="nav-btn-primary">Get started</Link>}',
    ''
)

# Make Sign In appear as icon + text below
old_signin = '<Link href="/auth/login" className="nav-btn">Sign in</Link>'
new_signin = '''<Link href="/auth/login" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", padding: "6px 14px", borderRadius: "9px", textDecoration: "none", transition: "background .15s", color: "#334155" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(14,165,233,.08)"; e.currentTarget.style.color = "#0ea5e9"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#334155"; }}>
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              <span style={{ fontSize: "11px", fontWeight: 600 }}>Sign in</span>
            </Link>'''

content = content.replace(old_signin, new_signin)

with open(r'components\Navbar.tsx', 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print("SUCCESS: Navbar reordered and Sign In updated.")
