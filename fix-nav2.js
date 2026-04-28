const fs = require('fs');
let f = fs.readFileSync('components/Navbar.tsx','utf8');

// Remove Dashboard link
f = f.replace(
  `<Link href="/dashboard" className={\`nav-btn\${isActive(pathname, "/dashboard") ? " active" : ""}\`}>Dashboard</Link>`,
  ''
);

// Skip Quiz in appLinks map (already AI Tutor special case exists)
f = f.replace(
  "link.label === 'Quiz' ? null : link.label === 'AI Tutor'",
  "link.label === 'Quiz' ? null : link.label === 'AI Tutor'"
);

fs.writeFileSync('components/Navbar.tsx', f, 'utf8');
console.log('Done');
