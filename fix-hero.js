const fs = require('fs');

// Fix 1: Hide desktop navbar on mobile
let nav = fs.readFileSync('components/Navbar.tsx','utf8');
nav = nav.replace(
  '<header style={{ position: "sticky"',
  '<header className="mob-hide-on-mobile" style={{ position: "sticky"'
);
fs.writeFileSync('components/Navbar.tsx', nav, 'utf8');

// Fix 2: Shrink hero 40%
let mob = fs.readFileSync('components/MobileNav.tsx','utf8');

// Shrink padding
mob = mob.replace(
  '.mob-hero-visitor { padding: 12px 16px 8px;',
  '.mob-hero-visitor { padding: 6px 16px 4px;'
);
// Shrink h1
mob = mob.replace(
  'fontSize: "clamp(1.5rem,7vw,2.2rem)", fontWeight: 700, color: "#0f172a", lineHeight: 1.1, marginBottom: "4px"',
  'fontSize: "clamp(0.95rem,4.5vw,1.35rem)", fontWeight: 700, color: "#0f172a", lineHeight: 1.1, marginBottom: "2px"'
);
// Shrink subtitle
mob = mob.replace(
  'fontSize: "clamp(1.2rem,6vw,1.8rem)", fontWeight: 700, color: "#0ea5e9", fontStyle: "italic", lineHeight: 1.1, marginBottom: "12px"',
  'fontSize: "clamp(0.85rem,4vw,1.15rem)", fontWeight: 700, color: "#0ea5e9", fontStyle: "italic", lineHeight: 1.1, marginBottom: "6px"'
);
// Shrink logged-in hero dark card
mob = mob.replace(
  'background: "linear-gradient(135deg,#0d1f35,#0f2540)", border: "1px solid rgba(14,165,233,0.2)" }}>',
  'background: "linear-gradient(135deg,#0d1f35,#0f2540)", border: "1px solid rgba(14,165,233,0.2)", padding: "6px 10px" }}>'
);

fs.writeFileSync('components/MobileNav.tsx', mob, 'utf8');
console.log('Done');
