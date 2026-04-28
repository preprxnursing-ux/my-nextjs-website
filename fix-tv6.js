const fs = require('fs');
let f = fs.readFileSync('components/Navbar.tsx','utf8');

// Add NursingTVDropdown just before appLinks.map
const target = ' {appLinks.map((link) => (';
const replacement = ' <NursingTVDropdown pathname={pathname} />\r\n                {appLinks.map((link) => (';

if (!f.includes(target)) { console.log('NO MATCH'); process.exit(1); }
f = f.replace(target, replacement);
fs.writeFileSync('components/Navbar.tsx', f, 'utf8');
console.log('Done. TV count:', (f.match(/NursingTVDropdown/g)||[]).length);
