const fs = require('fs');
let f = fs.readFileSync('components/Navbar.tsx','utf8');

// Add onClick setOpen(false) to all Links inside dropdown panels
// They are identified by being inside nav-dropdown divs
// Simple approach: any Link inside a dropdown that goes to an href
f = f.replace(
  /(<Link href="[^"]*")\s+onClick=\{[^}]*setOpen\(false\)[^}]*\}/g,
  '$1 onClick={() => setOpen(false)}'
);

// For Links inside dropdowns that have NO onClick yet - add it
// Target Links that are children of nav-dropdown
f = f.replace(
  /className="nav-dropdown"[^>]*>([\s\S]*?)<\/div>\s*\)\s*\}/g,
  (match) => match.replace(/<Link href="([^"]*)"(?![^>]*onClick)/g, '<Link href="$1" onClick={() => setOpen(false)}')
);

fs.writeFileSync('components/Navbar.tsx', f, 'utf8');
console.log('Done');
