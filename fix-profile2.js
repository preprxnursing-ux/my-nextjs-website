const fs = require('fs');
let c = fs.readFileSync('components/Navbar.tsx', 'utf8');

const component = `
function ProfileDropdown({ pathname }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef(null);
  function handleEnter() { if (timeout.current) clearTimeout(timeout.current); setOpen(true); }
  function handleLeave() { timeout.current = setTimeout(() => setOpen(false), 140); }
  const items = [
    { href: "/dashboard", label: "Dashboard", color: "#0ea5e9", desc: "Performance overview" },
    { href: "/results", label: "Results", color: "#10b981", desc: "Your quiz scores" },
    { href: "/review", label: "Review", color: "#f59e0b", desc: "Flagged questions" },
    { href: "/history", label: "History", color: "#8b5cf6", desc: "All attempts" },
  ];
  return (
    <div style={{ position: "relative" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button className="nav-btn" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
        Profile <ChevronDown style={{ width: 12, height: 12, transition: "transform .2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>
      {open && (
        <div className="nav-dropdown" style={{ position: "absolute", right: 0, top: "100%", zIndex: 1001, paddingTop: "28px", width: "220px" }}>
          <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,.08)", borderRadius: "16px", boxShadow: "0 24px 60px rgba(0,0,0,.15)", overflow: "hidden" }}>
            <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(0,0,0,.06)", background: "rgba(14,165,233,.04)" }}>
              <p style={{ fontSize: "11px", fontWeight: 800, color: "#64748b", letterSpacing: ".12em", textTransform: "uppercase", margin: 0 }}>My Progress</p>
            </div>
            <div style={{ padding: "8px" }}>
              {items.map(item => (
                <Link key={item.label} href={item.href}
                  style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 10px", borderRadius: "10px", textDecoration: "none", transition: "all .15s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = item.color + "12"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                  <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: item.color + "12", border: "1px solid " + item.color + "25", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: item.color, fontSize: "12px", fontWeight: 700 }}>{item.label[0]}</div>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{item.label}</p>
                    <p style={{ fontSize: "10px", color: "#64748b", margin: 0 }}>{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
`;

c = c.replace('export default function Navbar()', component + 'export default function Navbar()');

const cartEnd = '}}>Cart</span>\n            </button>';
const userStart = c.indexOf('{user ? (', c.indexOf(cartEnd));
const insertPoint = c.indexOf('\n', userStart) + 1;
c = c.slice(0, insertPoint) + '              <ProfileDropdown pathname={pathname} />\n' + c.slice(insertPoint);

fs.writeFileSync('components/Navbar.tsx', c, 'utf8');
console.log('Done! Instances:', (c.match(/ProfileDropdown pathname/g)||[]).length);