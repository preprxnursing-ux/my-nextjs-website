const fs = require('fs');
let f = fs.readFileSync('components/Navbar.tsx','utf8');

// Remove the duplicate - the one after ContactDropdown
f = f.replace(
  '\r\n                <NursingTVDropdown pathname={pathname} />',
  ''
);

fs.writeFileSync('components/Navbar.tsx', f, 'utf8');
console.log('Remaining TV count:', (f.match(/NursingTVDropdown/g)||[]).length);
