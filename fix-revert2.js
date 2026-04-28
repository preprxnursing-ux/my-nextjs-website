const fs = require('fs');
let f = fs.readFileSync('app/layout.tsx','utf8');
f = f.replace('overflowX: "hidden", paddingTop: "64px"', 'overflowX: "hidden"');
fs.writeFileSync('app/layout.tsx', f, 'utf8');
console.log('Done');
