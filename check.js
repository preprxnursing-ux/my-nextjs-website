const fs = require('fs');
const f = fs.readFileSync('components/Navbar.tsx','utf8');
const i = f.indexOf('/auth/login');
console.log(f.slice(i-50, i+100));
