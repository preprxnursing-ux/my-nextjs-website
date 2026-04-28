const fs = require('fs');
let f = fs.readFileSync('components/MobileNav.tsx','utf8');
f = f.replace(
  'background: "linear-gradient(135deg,#0d1f35,#0f2540)", border: "1px solid rgba(14,165,233,0.2)", padding: "6px 10px" }}>',
  'background: "linear-gradient(135deg,#0d1f35,#0f2540)", border: "1px solid rgba(14,165,233,0.2)" }}>'
);
fs.writeFileSync('components/MobileNav.tsx', f, 'utf8');
console.log('Done');
