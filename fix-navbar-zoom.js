const fs = require('fs');
let c = fs.readFileSync('components/Navbar.tsx', 'utf8');
c = c.replace(
  'position: "fixed", top: 0, left: 0, right: 0, width: "100%", zIndex: 1000',
  'position: "fixed", top: 0, left: 0, right: 0, width: "100vw", zIndex: 1000, zoom: "reset"'
);
fs.writeFileSync('components/Navbar.tsx', c, 'utf8');
console.log('Done');