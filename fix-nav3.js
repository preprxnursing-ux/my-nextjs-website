const fs = require('fs');
let f = fs.readFileSync('components/Navbar.tsx','utf8');

// Skip Quiz, special render AI Tutor, normal for rest
f = f.replace(
  ' {appLinks.map((link) => (\r\n                  link.label === \'AI Tutor\'',
  ' {appLinks.map((link) => (\r\n                  link.label === \'Quiz\' ? null : link.label === \'AI Tutor\''
);

// Move NursingTV before AI Tutor (before appLinks.map)
f = f.replace(
  '<ContactDropdown pathname={pathname} />\r\n                <NursingTVDropdown pathname={pathname} />',
  '<NursingTVDropdown pathname={pathname} />\r\n                <ContactDropdown pathname={pathname} />'
);

fs.writeFileSync('components/Navbar.tsx', f, 'utf8');
console.log('Done');
