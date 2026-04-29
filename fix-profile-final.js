const fs = require('fs');
let c = fs.readFileSync('components/Navbar.tsx', 'utf8');
c = c.replace('  { href: "/results", label: "Results" },', '');
c = c.replace('  { href: "/review", label: "Review" },', '');
c = c.replace('  { href: "/history", label: "History" },', '');
fs.writeFileSync('components/Navbar.tsx', c, 'utf8');
console.log('Done');