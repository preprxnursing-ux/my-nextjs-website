const fs = require('fs');
let f = fs.readFileSync('components/Navbar.tsx','utf8');

// 1. Remove Dashboard link
f = f.replace(/\r\n                <Link href="\/dashboard" className={`nav-btn\${isActive\(pathname, "\/dashboard"\) \? " active" : ""}`}>Dashboard<\/Link>/g, '');

// 2. Move NursingTV before AI Tutor — remove it from after ContactDropdown and add to appLinks render
// Change appLinks order: put Nursing TV dropdown just before AI Tutor button
// We do this by swapping the NursingTVDropdown to before the appLinks.map
f = f.replace(
  '<ContactDropdown pathname={pathname} />\r\n                <NursingTVDropdown pathname={pathname} />',
  '<NursingTVDropdown pathname={pathname} />\r\n                <ContactDropdown pathname={pathname} />'
);

// 3. Remove Quiz from appLinks render (keep in array, just skip it in map)
f = f.replace(
  "link.label === 'AI Tutor'",
  "link.label === 'Quiz' ? null : link.label === 'AI Tutor'"
);

fs.writeFileSync('components/Navbar.tsx', f, 'utf8');
console.log('Done');
