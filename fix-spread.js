const fs = require('fs');
let c = fs.readFileSync('components/Navbar.tsx', 'utf8');
c = c.replace(
  /display: "flex", alignItems: "center", gap: "[^"]*", flex: 1, justifyContent: "[^"]*"[^}]*/,
  'display: "flex", alignItems: "center", gap: "0px", flex: 1, justifyContent: "space-evenly"'
);
fs.writeFileSync('components/Navbar.tsx', c, 'utf8');
console.log('Done');