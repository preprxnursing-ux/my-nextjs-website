const fs = require('fs');
let f = fs.readFileSync('components/MobileNav.tsx','utf8');

// 1. Tighten greeting card padding
f = f.replace(
  '<div style={{ padding: "4px 16px 4px" }}>',
  '<div style={{ padding: "4px 16px 2px" }}>'
);

// 2. Remove Dashboard and Nursing TV from the 6-grid, keep only 4 tools
f = f.replace(
  `{ href: "/history",     label: "History",    sub: "Attempts",   color: "#8b5cf6", bg: "#fdf4ff", icon: <History size={15} color="#8b5cf6"/> },
                  { href: "/dashboard",   label: "Dashboard",  sub: "Overview",   color: "#06b6d4", bg: "#ecfeff", icon: <LayoutDashboard size={15} color="#06b6d4"/> },
                  { href: "/nursing-tv",  label: "Nursing TV", sub: "Watch free", color: "#ef4444", bg: "#fff7ed", icon: <Tv size={15} color="#ef4444"/> },`,
  `{ href: "/history",     label: "History",    sub: "Attempts",   color: "#8b5cf6", bg: "#fdf4ff", icon: <History size={15} color="#8b5cf6"/> },`
);

// 3. Change grid from 3 cols to 4 cols so 4 items fit in one row
f = f.replace(
  '.mob-grid-3 { display: grid; grid-template-columns: repeat(3,1fr);',
  '.mob-grid-3 { display: grid; grid-template-columns: repeat(4,1fr);'
);

fs.writeFileSync('components/MobileNav.tsx', f, 'utf8');
console.log('Done');
