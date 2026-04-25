import re

with open(r'components\Navbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_component = '''function NursingTVDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeChannel, setActiveChannel] = useState(0);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  function handleEnter() { if (timeout.current) clearTimeout(timeout.current); setOpen(true); }
  function handleLeave() { timeout.current = setTimeout(() => setOpen(false), 200); }
  const groups = [
    { label: "Licensure", color: "#0ea5e9", channels: [
      { title: "NCLEX-RN TV", tag: "Registered Nurse", color: "#0ea5e9", lessons: 24, live: true, desc: "Full NCLEX-RN prep with NGN-style questions, rationales, and live walkthroughs by licensed RNs.", icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" },
      { title: "NCLEX-PN TV", tag: "Practical Nurse", color: "#6366f1", lessons: 18, live: true, desc: "Targeted PN content covering pharmacology, safety, and clinical decision-making for LPN/LVN candidates.", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
    ]},
    { label: "Specialty", color: "#ef4444", channels: [
      { title: "CCRN TV", tag: "Critical Care RN", color: "#ef4444", lessons: 20, live: true, desc: "ICU-focused content covering hemodynamics, ventilators, and high-acuity clinical scenarios.", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
      { title: "CEN TV", tag: "Emergency Nurse", color: "#f97316", lessons: 14, live: false, desc: "Emergency nursing certification prep covering triage, trauma, and rapid assessment skills.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
      { title: "PCCN TV", tag: "Progressive Care", color: "#ec4899", lessons: 12, live: false, desc: "Step-down unit nursing content for intermediate care and progressive care certification.", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
      { title: "FNP TV", tag: "Nurse Practitioner", color: "#8b5cf6", lessons: 16, live: false, desc: "Family nurse practitioner board prep with pharmacology, diagnostics, and clinical management.", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    ]},
    { label: "Entrance", color: "#f59e0b", channels: [
      { title: "TEAS 7 TV", tag: "Pre-Nursing Exam", color: "#f59e0b", lessons: 12, live: false, desc: "ATI TEAS 7 prep covering science, math, reading, and English for nursing school admission.", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
      { title: "HESI A2 TV", tag: "Admission Exam", color: "#10b981", lessons: 10, live: false, desc: "HESI A2 exam prep with subject-specific lessons and practice to secure your nursing school spot.", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
    ]},
    { label: "Life Support", color: "#06b6d4", channels: [
      { title: "ACLS TV", tag: "Advanced Cardiac", color: "#06b6d4", lessons: 8, live: false, desc: "ACLS certification prep covering algorithms, pharmacology, and advanced cardiac life support skills.", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" },
      { title: "BLS TV", tag: "Basic Life Support", color: "#84cc16", lessons: 6, live: false, desc: "BLS certification training with CPR techniques, AED use, and airway management fundamentals.", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
    ]},
  ];
  const group = groups[activeGroup];
  const channel = group.channels[Math.min(activeChannel, group.channels.length - 1)];
  return (
    <div style={{ position: "relative" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button onClick={() => window.location.href="/nursing-tv"} className={`nav-btn${isActive(pathname, "/nursing-tv") ? " active" : ""}`} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444" style={{ flexShrink: 0 }}><path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/></svg>
        Nursing TV
        <ChevronDown style={{ width: 12, height: 12, transition: "transform .2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>
      {open && (
        <div className="nav-dropdown" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: "100%", zIndex: 1001, paddingTop: "10px", width: "720px" }}>
          <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,.08)", borderRadius: "20px", boxShadow: "0 32px 80px rgba(0,0,0,.18)", overflow: "hidden" }}>
            {/* HEADER */}
            <div style={{ padding: "14px 22px", borderBottom: "1px solid rgba(0,0,0,.06)", background: "linear-gradient(135deg,rgba(239,68,68,.05),rgba(14,165,233,.04))", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "100px", padding: "4px 12px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", display: "inline-block", boxShadow: "0 0 5px #ef4444" }} />
                  <span style={{ fontSize: "9px", fontWeight: 900, color: "#ef4444", letterSpacing: ".22em" }}>NURSING TV</span>
                </div>
                <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>10 channels &middot; 140+ lessons &middot; Free forever</span>
              </div>
              <Link href="/nursing-tv" style={{ fontSize: "11px", fontWeight: 700, color: "#0ea5e9", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
                Browse all
                <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
            {/* GROUP TABS */}
            <div style={{ display: "flex", gap: "2px", padding: "10px 16px 0", background: "#f8f9fb", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
              {groups.map((g, i) => (
                <button key={g.label} onMouseEnter={() => { setActiveGroup(i); setActiveChannel(0); }}
                  style={{ padding: "8px 18px", borderRadius: "8px 8px 0 0", background: activeGroup === i ? "#ffffff" : "transparent", border: activeGroup === i ? "1px solid rgba(0,0,0,.08)" : "1px solid transparent", borderBottom: activeGroup === i ? "1px solid #fff" : "1px solid transparent", cursor: "pointer", fontFamily: "inherit", fontSize: "12px", fontWeight: activeGroup === i ? 700 : 500, color: activeGroup === i ? g.color : "#94a3b8", transition: "all .15s", marginBottom: "-1px", whiteSpace: "nowrap" }}>
                  {g.label}
                </button>
              ))}
            </div>
            {/* BODY */}
            <div style={{ display: "grid", gridTemplateColumns: "210px 1fr", minHeight: "230px" }}>
              {/* LEFT LIST */}
              <div style={{ background: "linear-gradient(180deg,#f8fafc 0%,#f1f5f9 100%)", borderRight: "1px solid rgba(0,0,0,.07)", padding: "10px" }}>
                {group.channels.map((c, i) => (
                  <div key={c.title} onMouseEnter={() => setActiveChannel(i)}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 11px", borderRadius: "11px", background: activeChannel === i ? "#ffffff" : "transparent", border: "1px solid " + (activeChannel === i ? "rgba(0,0,0,.08)" : "transparent"), boxShadow: activeChannel === i ? "0 2px 10px rgba(0,0,0,.07)" : "none", cursor: "pointer", transition: "all .18s", marginBottom: "3px" }}>
                    <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: activeChannel === i ? c.color + "18" : c.color + "0e", border: "1px solid " + c.color + (activeChannel === i ? "35" : "18"), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .18s" }}>
                      <svg width="15" height="15" fill="none" stroke={c.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d={c.icon}/></svg>
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "1px" }}>
                        <p style={{ fontSize: "11.5px", fontWeight: 700, color: activeChannel === i ? "#0f172a" : "#334155", margin: 0, transition: "color .18s", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.title}</p>
                        {c.live && <span style={{ fontSize: "7px", fontWeight: 900, background: "rgba(239,68,68,.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,.25)", padding: "1px 4px", borderRadius: "100px", letterSpacing: ".1em", flexShrink: 0 }}>LIVE</span>}
                      </div>
                      <p style={{ fontSize: "10px", color: activeChannel === i ? c.color : "#94a3b8", margin: 0, fontWeight: 500, transition: "color .18s", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.tag}</p>
                    </div>
                    {activeChannel === i && <svg style={{ marginLeft: "auto", flexShrink: 0 }} width="11" height="11" fill="none" stroke={c.color} strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>}
                  </div>
                ))}
              </div>
              {/* RIGHT DETAIL */}
              <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#ffffff", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle," + channel.color + "12 0%,transparent 70%)", pointerEvents: "none", transition: "background .3s" }} />
                <div style={{ position: "absolute", bottom: "-30px", left: "-30px", width: "120px", height: "120px", borderRadius: "50%", background: "radial-gradient(circle," + channel.color + "08 0%,transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "11px", background: channel.color + "15", border: "1px solid " + channel.color + "30", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="18" height="18" fill="none" stroke={channel.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d={channel.icon}/></svg>
                    </div>
                    <div>
                      <p style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", margin: "0 0 2px", fontFamily: "'Cormorant Garamond',serif", letterSpacing: ".01em" }}>{channel.title}</p>
                      <p style={{ fontSize: "10px", fontWeight: 700, color: channel.color, margin: 0, letterSpacing: ".08em", textTransform: "uppercase" }}>{channel.tag}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: "12px", color: "#334155", lineHeight: 1.7, margin: "0 0 14px", fontWeight: 400 }}>{channel.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", background: channel.color + "10", border: "1px solid " + channel.color + "25", borderRadius: "100px", padding: "4px 12px" }}>
                      <svg width="11" height="11" fill="none" stroke={channel.color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: channel.color }}>{channel.lessons} lessons</span>
                    </div>
                    {channel.live && (
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(239,68,68,.07)", border: "1px solid rgba(239,68,68,.18)", borderRadius: "100px", padding: "4px 12px" }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#ef4444", display: "inline-block", boxShadow: "0 0 4px #ef4444" }} />
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#ef4444" }}>Live now</span>
                      </div>
                    )}
                  </div>
                </div>
                <Link href="/nursing-tv"
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 16px", background: channel.color + "08", border: "1px solid " + channel.color + "20", borderRadius: "12px", textDecoration: "none", transition: "all .2s", marginTop: "16px" }}
                  onMouseEnter={e => { e.currentTarget.style.background = channel.color + "14"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 16px " + channel.color + "18"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = channel.color + "08"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", margin: "0 0 1px" }}>Watch {channel.title}</p>
                    <p style={{ fontSize: "10px", color: "#64748b", margin: 0, fontWeight: 500 }}>Free &middot; No signup required</p>
                  </div>
                  <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: channel.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="12" height="12" fill="white" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" fill="none"/></svg>
                  </div>
                </Link>
              </div>
            </div>
            {/* FOOTER */}
            <div style={{ borderTop: "1px solid rgba(0,0,0,.06)", padding: "11px 22px", background: "linear-gradient(135deg,rgba(239,68,68,.03),rgba(14,165,233,.03))", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
              {[{ val: "10", label: "Channels", color: "#0ea5e9" }, { val: "140+", label: "Lessons", color: "#0ea5e9" }, { val: "Free", label: "Forever", color: "#0ea5e9" }, { val: "Live", label: "Streaming", color: "#ef4444" }].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "15px", fontWeight: 800, color: s.color, margin: "0 0 1px", fontFamily: "'Cormorant Garamond',serif" }}>{s.val}</p>
                  <p style={{ fontSize: "10px", color: "#94a3b8", margin: 0, fontWeight: 600 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}'''

pattern = r'function NursingTVDropdown\(\{ pathname \}.*?^\}'
result = re.sub(pattern, new_component, content, flags=re.DOTALL | re.MULTILINE)

if result == content:
    print("ERROR: Pattern did not match. No changes made.")
else:
    with open(r'components\Navbar.tsx', 'w', encoding='utf-8', newline='\n') as f:
        f.write(result)
    print("SUCCESS: Nursing TV dropdown polished.")
    