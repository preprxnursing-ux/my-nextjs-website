const fs = require('fs');
let f = fs.readFileSync('components/Navbar.tsx','utf8');

// Move NursingTVDropdown from after ContactDropdown to before appLinks.map
f = f.replace(
  '<NursingTVDropdown pathname={pathname} />\r\n                <ContactDropdown pathname={pathname} />',
  '<ContactDropdown pathname={pathname} />'
);

// Add NursingTVDropdown just before the appLinks.map block
f = f.replace(
  ' {appLinks.map((link) => (',
  ' <NursingTVDropdown pathname={pathname} />\r\n                {appLinks.map((link) => ('
);

fs.writeFileSync('components/Navbar.tsx', f, 'utf8');
console.log('Done');
