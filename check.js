const fs = require('fs');
const f = fs.readFileSync('components/Navbar.tsx','utf8');
const i = f.indexOf('SOON');
console.log(f.slice(i-50, i+200));
