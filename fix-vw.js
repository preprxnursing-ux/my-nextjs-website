const fs = require('fs');
let c = fs.readFileSync('components/Navbar.tsx', 'utf8');

// Fix the outer header to never exceed viewport
c = c.replace(
  'position: "fixed", top: 0, left: 0, right: 0, width: "100vw", zIndex: 1000, zoom: "reset"',
  'position: "fixed", top: 0, left: 0, width: "100%", maxWidth: "100vw", zIndex: 1000, overflowX: "hidden"'
);

// Fix inner container to never overflow
c = c.replace(
  'padding: "0 12px", height: "75px", gap: "0px", minWidth: 0, overflow: "hidden"',
  'padding: "0 12px", height: "75px", gap: "0px", width: "100%", maxWidth: "100%", overflowX: "hidden"'
);

fs.writeFileSync('components/Navbar.tsx', c, 'utf8');
console.log('Done');