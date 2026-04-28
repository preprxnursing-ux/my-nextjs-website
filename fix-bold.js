const fs = require('fs');
let f = fs.readFileSync('components/MobileNav.tsx','utf8');
f = f.replace(
  '{ fontSize: "11px", color: "#94a3b8", margin: 0, lineHeight: 1.2 }}>{greeting}',
  '{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", margin: 0, lineHeight: 1.2 }}>{greeting}'
);
fs.writeFileSync('components/MobileNav.tsx', f, 'utf8');
console.log('Done');
