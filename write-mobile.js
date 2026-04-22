const fs = require('fs');
const content = fs.readFileSync('components/Navbar.tsx', 'utf8');
const oldStart = content.indexOf('{/* MOBILE MENU */}');
const oldEnd = content.indexOf('      </header>');
const before = content.substring(0, oldStart);
const after = content.substring(oldEnd);
const newMobile = `{/* MOBILE MENU - slide-in panel */}
        {mobileOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1100 }}>
            <div onClick={() => setMobileOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(6px)' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 'min(88vw,360px)', background: 'linear-gradient(160deg,#080f1c 0%,#0a1929 40%,#0d1f35 100%)', borderLeft: '1px solid rgba(14,165,233,.18)', boxShadow: '-32px 0 80px rgba(0,0,0,.6)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
              <div style={{ padding: '18px', borderBottom: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'linear-gradient(135deg,#0ea5e9,#38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width='16' height='16' fill='none' stroke='#fff' strokeWidth='2.5' viewBox='0 0 24 24'><path d='M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18'/></svg>
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 800, color: '#f1f5f9', margin: 0 }}>Pre-NCLEX Nursing</p>
                    <p style={{ fontSize: '10px', color: '#475569', margin: 0 }}>Pass on your first attempt</p>
                  </div>
                </div>
                <button onClick={() => setMobileOpen(false)} style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X style={{ width: 15, height: 15 }} />
                </button>
              </div>
              <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <p style={{ fontSize: '9px', fontWeight: 800, color: '#0ea5e9', letterSpacing: '.22em', textTransform: 'uppercase', marginBottom: '8px' }}>Certification Paths</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {courseItems.map((course) => (
                      <Link key={course.exam} href={course.href} onClick={() => setMobileOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 13px', borderRadius: '11px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.05)', textDecoration: 'none' }}
                        onMouseEnter={e => { e.currentTarget.style.background = course.color + '10'; e.currentTarget.style.borderColor = course.color + '25'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.05)'; }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: course.color, flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: '12px', fontWeight: 700, color: course.color, margin: 0 }}>{course.exam}</p>
                          <p style={{ fontSize: '10px', color: '#475569', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{course.tag}</p>
                        </div>
                        {course.available
                          ? <span style={{ fontSize: '8px', fontWeight: 800, background: 'rgba(14,165,233,.15)', color: '#7dd3fc', border: '1px solid rgba(14,165,233,.25)', padding: '2px 7px', borderRadius: '100px', flexShrink: 0 }}>LIVE</span>
                          : <span style={{ fontSize: '8px', color: '#334155', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', padding: '2px 7px', borderRadius: '100px', flexShrink: 0 }}>SOON</span>}
                      </Link>
                    ))}
                  </div>
                </div>
                {!user && (
                <div>
                  <p style={{ fontSize: '9px', fontWeight: 800, color: '#475569', letterSpacing: '.22em', textTransform: 'uppercase', marginBottom: '8px' }}>Explore</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
                    {[
                      { href: '/features', label: 'Features', color: '#0ea5e9' },
                      { href: '/testimonials', label: 'Testimonials', color: '#10b981' },
                      { href: '/pricing', label: 'Pricing', color: '#8b5cf6' },
                      { href: '/contact', label: 'Contact', color: '#06b6d4' },
                      { href: '/faq', label: 'FAQ', color: '#f59e0b' },
                      { href: '/blog', label: 'Blog', color: '#ef4444' },
                      { href: '/educators', label: 'Educators', color: '#c084fc' },
                    ].map((item) => (
                      <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderRadius: '10px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.05)', textDecoration: 'none' }}
                        onMouseEnter={e => { e.currentTarget.style.background = item.color + '10'; e.currentTarget.style.borderColor = item.color + '25'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.05)'; }}>
                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                )}
                {user && (
                <div>
                  <p style={{ fontSize: '9px', fontWeight: 800, color: '#0ea5e9', letterSpacing: '.22em', textTransform: 'uppercase', marginBottom: '8px' }}>My Study Portal</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {[
                      { href: '/dashboard', label: 'Dashboard', desc: 'Stats and progress', color: '#0ea5e9' },
                      { href: '/quiz', label: 'Quiz', desc: 'Practice questions', color: '#10b981' },
                      { href: '/results', label: 'Results', desc: 'Your scores', color: '#8b5cf6' },
                      { href: '/review', label: 'Review', desc: 'Study rationales', color: '#f59e0b' },
                      { href: '/history', label: 'History', desc: 'Past sessions', color: '#06b6d4' },
                    ].map((item) => (
                      <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: '13px', padding: '11px 13px', borderRadius: '11px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.05)', textDecoration: 'none' }}
                        onMouseEnter={e => { e.currentTarget.style.background = item.color + '10'; e.currentTarget.style.borderColor = item.color + '25'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.05)'; }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: item.color + '15', border: '1px solid ' + item.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                        </div>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0', margin: 0 }}>{item.label}</p>
                          <p style={{ fontSize: '10px', color: '#475569', margin: 0 }}>{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                )}
              </div>
              <div style={{ padding: '14px 16px', borderTop: '1px solid rgba(255,255,255,.06)', flexShrink: 0 }}>
                {user ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ padding: '10px 13px', borderRadius: '10px', background: 'rgba(14,165,233,.06)', border: '1px solid rgba(14,165,233,.12)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,#0ea5e9,#38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>{initials}</div>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: '10px', color: '#475569', margin: 0 }}>Signed in as</p>
                        <p style={{ fontSize: '12px', fontWeight: 600, color: '#7dd3fc', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
                      </div>
                    </div>
                    <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(248,113,113,.07)', border: '1px solid rgba(248,113,113,.18)', fontSize: '13px', fontWeight: 700, color: '#f87171', cursor: 'pointer', fontFamily: 'inherit' }}>
                      <LogOut style={{ width: 14, height: 14 }} /> Sign out
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Link href='/auth/login' onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.09)', fontSize: '13px', fontWeight: 600, color: '#94a3b8', textDecoration: 'none' }}>Sign in</Link>
                    <Link href='/auth/signup' onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', borderRadius: '10px', background: 'linear-gradient(135deg,#0ea5e9,#38bdf8)', fontSize: '14px', fontWeight: 700, color: '#fff', textDecoration: 'none', boxShadow: '0 6px 20px rgba(14,165,233,.4)' }}>Get started free</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        `;

const result = before + newMobile + after;
fs.writeFileSync('components/Navbar.tsx', result, 'utf8');
console.log('Done! Lines: ' + result.split('\n').length);
