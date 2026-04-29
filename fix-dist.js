const fs = require('fs');
let c = fs.readFileSync('components/Navbar.tsx', 'utf8');
c = c.replace(
  'display: "flex", alignItems: "center", gap: "0px", flex: 1, justifyContent: "space-evenly", fontSize: "12px", overflow: "hidden", minWidth: 0, flexWrap: "nowrap"',
  'display: "flex", alignItems: "center", gap: "0px", flex: 1, justifyContent: "space-between", fontSize: "12px", overflow: "hidden", minWidth: 0, flexWrap: "nowrap", padding: "0 8px"'
);
fs.writeFileSync('components/Navbar.tsx', c, 'utf8');
console.log('Done');