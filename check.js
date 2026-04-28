const fs = require('fs');
const f = fs.readFileSync('components/Navbar.tsx','utf8');
const i = f.indexOf('course.exam');
console.log(JSON.stringify(f.slice(i-20, i+100)));
