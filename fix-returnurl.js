const fs = require('fs');
let f = fs.readFileSync('components/Navbar.tsx','utf8');

// Replace all /auth/login links with dynamic returnUrl
f = f.replace(
  /href="\/auth\/login"/g,
  'href={`/auth/login?returnUrl=${encodeURIComponent(pathname)}`}'
);

// Same for /auth/signup
f = f.replace(
  /href="\/auth\/signup"/g,
  'href={`/auth/signup?returnUrl=${encodeURIComponent(pathname)}`}'
);

fs.writeFileSync('components/Navbar.tsx', f, 'utf8');
console.log('Done');
