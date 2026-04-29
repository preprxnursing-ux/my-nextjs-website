const fs = require('fs');
let c = fs.readFileSync('components/Navbar.tsx', 'utf8');
// Fix the broken fragment closing
c = c.replace(/(<\/Link>\s*\n\s*<\/>)\s*\n\s*\}\)/, '<\/Link>\n              <\/>\n            })\n          }');
fs.writeFileSync('components/Navbar.tsx', c, 'utf8');
console.log('Done');
