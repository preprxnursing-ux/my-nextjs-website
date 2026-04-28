const fs = require('fs');
let f = fs.readFileSync('components/MobileNav.tsx','utf8');
f = f.replace(
  '{ href: "/dashboard",   label: "Dashboard",  sub: "Overview",   color: "#06b6d4", bg: "#ecfeff", icon: <LayoutDashboard size={15} color="#06b6d4"/> },',
  '{ href: "#signout",     label: "Sign Out",   sub: "Logout",     color: "#ef4444", bg: "#fff1f2", icon: <LogOut size={15} color="#ef4444"/> },'
);
fs.writeFileSync('components/MobileNav.tsx', f, 'utf8');
console.log('Done');
