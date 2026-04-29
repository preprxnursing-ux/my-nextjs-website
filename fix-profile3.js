const fs = require('fs');
let c = fs.readFileSync('components/Navbar.tsx', 'utf8');
const lines = c.split('\n');

// Remove lines containing ProfileDropdown pathname (lines 737 and 761, 0-indexed = 736 and 760)
const cleaned = lines.filter(line => !line.includes('<ProfileDropdown pathname={pathname} />'));

// Find cart button closing </button> in desktop-actions and insert Profile after it
let inserted = false;
const result = [];
let inDesktopActions = false;
for (let i = 0; i < cleaned.length; i++) {
  result.push(cleaned[i]);
  if (cleaned[i].includes('id="desktop-actions"')) inDesktopActions = true;
  if (inDesktopActions && !inserted && cleaned[i].includes('</button>')) {
    result.push('            <ProfileDropdown pathname={pathname} />');
    inserted = true;
  }
}

fs.writeFileSync('components/Navbar.tsx', result.join('\n'), 'utf8');
console.log('Done! Instances:', (result.join('\n').match(/ProfileDropdown pathname/g)||[]).length);