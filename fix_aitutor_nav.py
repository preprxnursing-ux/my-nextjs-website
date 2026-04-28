f = open("components/Navbar.tsx", "r", encoding="utf-8")
c = f.read()
f.close()

old = '<Link href="/ai-tutor" className={`nav-btn${isActive(pathname, "/ai-tutor") ? " active" : ""}`}>AI Tutor</Link>'
new = '''<Link href="/ai-tutor" style={{
  display: "inline-flex", alignItems: "center", gap: 7,
  padding: "7px 14px", borderRadius: 10, textDecoration: "none",
  background: "linear-gradient(135deg, #0070f3, #0ea5e9)",
  color: "white", fontWeight: 700, fontSize: 13,
  boxShadow: "0 0 14px rgba(0,112,243,0.45)",
  border: "1px solid rgba(255,255,255,0.15)",
  transition: "all 0.2s", whiteSpace: "nowrap", flexShrink: 0
}}
onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 24px rgba(0,112,243,0.7)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 14px rgba(0,112,243,0.45)"; e.currentTarget.style.transform = "translateY(0)"; }}>
  <span style={{ fontSize: 15 }}>🤖</span>
  <span>AI Tutor</span>
  <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: 10, padding: "1px 7px", fontSize: 10, fontWeight: 800, letterSpacing: "0.05em" }}>NEW</span>
</Link>'''

c = c.replace(old, new)
f = open("components/Navbar.tsx", "w", encoding="utf-8")
f.write(c)
f.close()
print("Done")
