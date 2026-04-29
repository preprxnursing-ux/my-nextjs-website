const fs = require('fs');
let c = fs.readFileSync('components/Navbar.tsx', 'utf8');
c = c.replace(
  /(<ProfileDropdown pathname=\{pathname\} \/>[\s\S]*?<\/div>\s*\n\s*\}\s*\n\s*\)\s*:\s*\()/,
  (m) => m.replace(') : (', '\n              </>) : (')
);
fs.writeFileSync('components/Navbar.tsx', c, 'utf8');
console.log('Done');
