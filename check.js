const fs = require('fs');
const f = fs.readFileSync('components/Navbar.tsx','utf8');
const i = f.indexOf('Dashboard</Link>');
console.log(JSON.stringify(f.slice(i-50, i+400)));
