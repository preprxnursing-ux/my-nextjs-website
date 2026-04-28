const fs = require('fs');
const f = fs.readFileSync('components/Navbar.tsx','utf8');
let pos = 0;
while((pos = f.indexOf('NursingTVDropdown', pos)) !== -1) {
  console.log('pos:', pos, JSON.stringify(f.slice(pos-40, pos+50)));
  pos++;
}
