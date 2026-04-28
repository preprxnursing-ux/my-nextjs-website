const fs = require('fs');
let f = fs.readFileSync('components/Navbar.tsx','utf8');
// Replace all remaining examType references with course.exam
f = f.split('course.examType').join('course.exam.replace("(R)","")');
fs.writeFileSync('components/Navbar.tsx', f, 'utf8');
console.log('Count fixed:', (f.match(/course\.exam\.replace/g)||[]).length);
