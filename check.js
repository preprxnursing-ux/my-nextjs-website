const fs = require('fs');
const f = fs.readFileSync('components/MobileNav.tsx','utf8');
fs.writeFileSync('mob-dump.txt', f, 'utf8');
console.log('Lines:', f.split('\n').length);
