const fs = require('fs');
let c = fs.readFileSync('components/Navbar.tsx', 'utf8');
const before = (c.match(/ProfileDropdown pathname/g)||[]).length;
c = c.replace(/{user \? \([\s\S]*?<div style={{ position: "relative" }}>[\s\S]*?<button onClick=\{.*?setAvatarOpen/, (m) => m.replace('{user ? (', '{user ? (\n              <>\n                <ProfileDropdown pathname={pathname} />'));
c = c.replace('<div style={{ position: "relative" }}>\n                <button onClick={() => setAvatarOpen', '<div style={{ position: "relative" }}>\n                <button onClick={() => setAvatarOpen');
fs.writeFileSync('components/Navbar.tsx', c, 'utf8');
console.log('Matches after:', (c.match(/ProfileDropdown pathname/g)||[]).length);
