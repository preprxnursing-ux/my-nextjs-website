const fs = require('fs');
const f = fs.readFileSync('components/Navbar.tsx','utf8');
const i = f.indexOf('<header');
console.log(f.slice(i, i+200));
