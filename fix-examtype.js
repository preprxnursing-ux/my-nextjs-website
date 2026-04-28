const fs = require('fs');
let f = fs.readFileSync('components/Navbar.tsx','utf8');
f = f.replace(/course\.examType/g, 'course.exam.replace("(R)","")');
fs.writeFileSync('components/Navbar.tsx', f, 'utf8');
console.log('Done');
