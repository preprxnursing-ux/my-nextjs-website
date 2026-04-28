const fs = require('fs');
const f = fs.readFileSync('components/Navbar.tsx','utf8');
console.log("=== POS 64175 ===");
console.log(JSON.stringify(f.slice(64140, 64230)));
console.log("=== POS 64593 ===");
console.log(JSON.stringify(f.slice(64550, 64650)));
