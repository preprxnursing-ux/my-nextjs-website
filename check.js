const fs = require('fs');
const f = fs.readFileSync('components/Navbar.tsx','utf8');
const i = f.indexOf('appLinks.map');
console.log(JSON.stringify(f.slice(i-5, i+200)));
