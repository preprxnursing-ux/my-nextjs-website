const fs = require('fs');
let f = fs.readFileSync('components/Navbar.tsx', 'utf8');
const oldStr = `{appLinks.map((link) => (
                  <Link key={link.label} href={link.href} className={\`nav-btn\${isActive(pathname, link.href) ? " active" : ""}\`}>{link.label}</Link>
                ))}`;
const newStr = `{appLinks.map((link) => (
                  link.label === 'AI Tutor' ? (
                    <Link key={link.label} href={link.href} style={{ display:'flex', alignItems:'center', gap:'6px', background:'linear-gradient(135deg,#0070f3,#0ea5e9)', color:'#fff', borderRadius:'8px', padding:'6px 14px', fontSize:'13px', fontWeight:700, textDecoration:'none', boxShadow:'0 0 14px rgba(0,112,243,0.45)', whiteSpace:'nowrap', flexShrink:0 }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow='0 0 24px rgba(0,112,243,0.7)'; e.currentTarget.style.transform='translateY(-1px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow='0 0 14px rgba(0,112,243,0.45)'; e.currentTarget.style.transform='translateY(0)'; }}>
                      <span style={{fontSize:'15px'}}>🤖</span><span>AI Tutor</span><span style={{background:'rgba(255,255,255,0.2)',borderRadius:10,padding:'1px 7px',fontSize:10,fontWeight:800}}>NEW</span>
                    </Link>
                  ) : (
                    <Link key={link.label} href={link.href} className={\`nav-btn\${isActive(pathname, link.href) ? " active" : ""}\`}>{link.label}</Link>
                  )
                ))}`;
if (!f.includes(oldStr)) { console.log('NO MATCH - string not found'); process.exit(1); }
f = f.replace(oldStr, newStr);
fs.writeFileSync('components/Navbar.tsx', f, 'utf8');
console.log('Done');
