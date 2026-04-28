const fs = require('fs');
let f = fs.readFileSync('components/MobileNav.tsx','utf8');

f = f.replace(
  'background: "#f1f5f9", border: "1px solid #e2e8f0"',
  'background: "#1e293b", border: "1px solid #334155"'
);
f = f.replace(
  '{ fontSize: "9px", color: "#94a3b8", margin: 0, lineHeight: 1.2 }}>{greeting}',
  '{ fontSize: "11px", color: "#94a3b8", margin: 0, lineHeight: 1.2 }}>{greeting}'
);
f = f.replace(
  '{ fontSize: "12px", fontWeight: 700, color: "#0f172a", margin: 0, lineHeight: 1.2 }}>{firstName}',
  '{ fontSize: "14px", fontWeight: 700, color: "#f8fafc", margin: 0, lineHeight: 1.2 }}>{firstName}'
);

fs.writeFileSync('components/MobileNav.tsx', f, 'utf8');
console.log('Done');
