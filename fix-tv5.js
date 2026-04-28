const fs = require('fs');
let f = fs.readFileSync('components/Navbar.tsx','utf8');
const target = "             ))}\r\n                <NursingTVDropdown pathname={pathname} />\r\n             ";
const replacement = "             ))}\r\n             ";
if (!f.includes(target)) { console.log('NO MATCH'); process.exit(1); }
f = f.replace(target, replacement);
fs.writeFileSync('components/Navbar.tsx', f, 'utf8');
console.log('Done. Remaining:', (f.match(/NursingTVDropdown/g)||[]).length);
