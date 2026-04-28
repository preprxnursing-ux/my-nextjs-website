const fs = require('fs');
const f = fs.readFileSync('components/Navbar.tsx','utf8');
const i = f.indexOf('Dashboard</Link>');
console.log(i === -1 ? 'Dashboard removed' : 'Still there at: ' + i);
const j = f.indexOf("link.label === 'Quiz'");
console.log(j === -1 ? 'Quiz check missing' : 'Quiz check at: ' + j);
