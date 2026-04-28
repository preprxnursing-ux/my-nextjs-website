const fs = require('fs');
let f = fs.readFileSync('components/Navbar.tsx','utf8');

f = f.replace(
  '<ContactDropdown pathname={pathname} />\r\n                <NursingTVDropdown pathname={pathname} />',
  '<ContactDropdown pathname={pathname} />'
);

f = f.replace(
  ' {appLinks.map((link) => (',
  ' <NursingTVDropdown pathname={pathname} />\r\n                {appLinks.map((link) => ('
);

fs.writeFileSync('components/Navbar.tsx', f, 'utf8');
console.log('Done');
