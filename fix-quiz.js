const fs = require('fs');
let f = fs.readFileSync('components/Navbar.tsx','utf8');

f = f.replace(
  '<Link href="/courses/nclex-rn" onClick={() => setCoursesOpen(false)} className="nav-btn-primary" style={{ fontSize: "12px", padding: "7px 14px" }}>Try free</Link>',
  '<Link href="/courses/nclex-rn" onClick={() => setCoursesOpen(false)} className="nav-btn-primary" style={{ fontSize: "12px", padding: "7px 14px" }}>Try free</Link>\r\n                      <Link href="/quiz" onClick={() => setCoursesOpen(false)} style={{ fontSize: "12px", padding: "7px 14px", borderRadius: "8px", border: "1px solid rgba(14,165,233,0.3)", color: "#0ea5e9", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "5px" }}>Try Quiz \u2192</Link>'
);

fs.writeFileSync('components/Navbar.tsx', f, 'utf8');
console.log('Done');
