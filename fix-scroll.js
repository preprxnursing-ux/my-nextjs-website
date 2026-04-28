const fs = require('fs');
let f = fs.readFileSync('app/auth/login/page.tsx','utf8');

// Save scroll position before navigating to login
// After successful login, restore scroll position using sessionStorage
f = f.replace(
  'const returnTo = new URLSearchParams(window.location.search).get("returnUrl") || "/dashboard";\n    window.location.href = returnTo;',
  'const returnTo = new URLSearchParams(window.location.search).get("returnUrl") || "/dashboard";\n    sessionStorage.setItem("scrollTo", window.location.search);\n    window.location.href = returnTo;'
);

fs.writeFileSync('app/auth/login/page.tsx', f, 'utf8');
console.log('Done');
