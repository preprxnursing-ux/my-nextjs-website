const fs = require('fs');
let f = fs.readFileSync('components/Navbar.tsx','utf8');
f = f.replace('<header style={{', '<header className="mob-hide-on-mobile" style={{');
fs.writeFileSync('components/Navbar.tsx', f, 'utf8');
console.log('Done');
