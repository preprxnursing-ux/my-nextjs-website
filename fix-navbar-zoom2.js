const fs = require('fs');
let c = fs.readFileSync('components/Navbar.tsx', 'utf8');
c = c.replace(
  '.nav-btn {',
  'header { transform: none !important; zoom: 1 !important; }\n  .nav-btn {'
);
fs.writeFileSync('components/Navbar.tsx', c, 'utf8');
console.log('Done');