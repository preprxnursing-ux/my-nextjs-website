const fs = require('fs');
let c = fs.readFileSync('components/Navbar.tsx', 'utf8');
c = c.replace(
  'display: "flex", alignItems: "center", gap: "4px", flex: 1, justifyContent: "center", fontSize: "12px", overflow: "hidden", minWidth: 0, flexWrap: "nowrap"',
  'display: "flex", alignItems: "center", gap: "0px", flex: 1, justifyContent: "space-evenly", fontSize: "12px", overflow: "hidden", minWidth: 0, flexWrap: "nowrap"'
);
fs.writeFileSync('components/Navbar.tsx', c, 'utf8');
console.log('Done');