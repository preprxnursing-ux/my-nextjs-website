const fs = require('fs');
let f = fs.readFileSync('components/MobileNav.tsx','utf8');

// Fix 1: Remove the mob-topbar top padding that leaves ghost space
f = f.replace(
  '.mob-topbar { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px 8px; background: #ffffff; border-bottom: 1px solid #e2e8f0; }',
  '.mob-topbar { display: flex; align-items: center; justify-content: space-between; padding: 6px 16px 6px; background: #ffffff; border-bottom: 1px solid #e2e8f0; }'
);

// Fix 2: Shrink the dark greeting card height by 40%
f = f.replace(
  '<div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "12px", background: "linear-gradient(135deg,#0d1f35,#0f2540)", border: "1px solid rgba(14,165,233,0.2)" }}>',
  '<div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 10px", borderRadius: "10px", background: "linear-gradient(135deg,#0d1f35,#0f2540)", border: "1px solid rgba(14,165,233,0.2)" }}>'
);

// Fix 3: Remove outer padding around greeting card
f = f.replace(
  '<div style={{ padding: "4px 16px 4px" }}>',
  '<div style={{ padding: "2px 16px 2px" }}>'
);

fs.writeFileSync('components/MobileNav.tsx', f, 'utf8');
console.log('Done');
