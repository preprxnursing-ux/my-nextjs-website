const fs = require('fs');
let f = fs.readFileSync('components/MobileNav.tsx','utf8');

// 1. Shrink avatar circle and text in greeting card
f = f.replace(
  '{ width: "30px", height: "30px", borderRadius: "50%", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#fff", flexShrink: 0 }',
  '{ width: "22px", height: "22px", borderRadius: "50%", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "#fff", flexShrink: 0 }'
);

// 2. Make card grey instead of dark blue
f = f.replace(
  'background: "linear-gradient(135deg,#0d1f35,#0f2540)", border: "1px solid rgba(14,165,233,0.2)"',
  'background: "#f1f5f9", border: "1px solid #e2e8f0"'
);

// 3. Fix text colors for grey background
f = f.replace(
  '{ fontSize: "9px", color: "#64748b", margin: 0, lineHeight: 1.2 }}>{greeting}',
  '{ fontSize: "9px", color: "#94a3b8", margin: 0, lineHeight: 1.2 }}>{greeting}'
);
f = f.replace(
  '{ fontSize: "13px", fontWeight: 700, color: "#f8fafc", margin: 0, lineHeight: 1.2 }}>{firstName}',
  '{ fontSize: "12px", fontWeight: 700, color: "#0f172a", margin: 0, lineHeight: 1.2 }}>{firstName}'
);

// 4. Remove Dashboard link from greeting card
f = f.replace(
  /<Link href="\/dashboard" style=\{[^}]+\}[^>]*>Dashboard<\/Link>/,
  ''
);

fs.writeFileSync('components/MobileNav.tsx', f, 'utf8');
console.log('Done');
