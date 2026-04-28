const fs = require('fs');
let f = fs.readFileSync('components/Navbar.tsx','utf8');
f = f.replace(
  '<header style={{ position: "fixed", top: 0, left: 0, right: 0, width: "100%", zIndex: 1000,',
  '<header className="mob-hide-on-mobile" style={{ position: "fixed", top: 0, left: 0, right: 0, width: "100%", zIndex: 1000,'
);
fs.writeFileSync('components/Navbar.tsx', f, 'utf8');
console.log('Done');
