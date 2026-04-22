const fs = require('fs');
const content = fs.readFileSync('components/Navbar.tsx', 'utf8');
const oldStart = content.indexOf('{/* MOBILE MENU */}');
const oldEnd = content.indexOf('      </header>');
const before = content.substring(0, oldStart);
const after = content.substring(oldEnd);
console.log('before:', before.length, 'after:', after.length);
