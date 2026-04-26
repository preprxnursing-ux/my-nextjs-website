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
      { title: "NCLEX-RN TV", tag: "Registered Nurse", color: "#0ea5e9", lessons: 24, live: true, desc: "Full NCLEX-RN prep with NGN-style questions, rationales, and live walkthroughs by licensed RNs." },
      { title: "NCLEX-PN TV", tag: "Practical Nurse", color: "#6366f1", lessons: 18, live: true, desc: "Targeted PN content covering pharmacology, safety, and clinical decision-making for LPN/LVN candidates." },
    ]},
    { label: "Specialty", color: "#ef4444", channels: [
      { title: "CCRN TV", tag: "Critical Care RN", color: "#ef4444", lessons: 20, live: true, desc: "ICU-focused content covering hemodynamics, ventilators, and high-acuity clinical scenarios." },
      { title: "CEN TV", tag: "Emergency Nurse", color: "#f97316", lessons: 14, live: false, desc: "Emergency nursing certification prep covering triage, trauma, and rapid assessment skills." },
      { title: "PCCN TV", tag: "Progressive Care", color: "#ec4899", lessons: 12, live: false, desc: "Step-down unit nursing content for intermediate care and progressive care certification." },
      { title: "FNP TV", tag: "Nurse Practitioner", color: "#8b5cf6", lessons: 16, live: false, desc: "Family nurse practitioner board prep with pharmacology, diagnostics, and clinical management." },
    ]},
    { label: "Entrance", color: "#f59e0b", channels: [
      { title: "TEAS 7 TV", tag: "Pre-Nursing Exam", color: "#f59e0b", lessons: 12, live: false, desc: "ATI TEAS 7 prep covering science, math, reading, and English for nursing school admission." },
      { title: "HESI A2 TV", tag: "Admission Exam", color: "#10b981", lessons: 10, live: false, desc: "HESI A2 exam prep with subject-specific lessons and practice to secure your nursing school spot." },
    ]},
    { label: "Life Support", color: "#06b6d4", channels: [
      { title: "ACLS TV", tag: "Advanced Cardiac", color: "#06b6d4", lessons: 8, live: false, desc: "ACLS certification prep covering algorithms, pharmacology, and advanced cardiac life support skills." },
      { title: "BLS TV", tag: "Basic Life Support", color: "#84cc16", lessons: 6, live: false, desc: "BLS certification training with CPR techniques, AED use, and airway management fundamentals." },
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
            <div style={{ padding: "16px 22px", borderBottom: "1px solid rgba(0,0,0,.06)", background: "linear-gradient(135deg,rgba(239,68,68,.06),rgba(14,165,233,.04))", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "100px", padding: "4px 12px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", display: "inline-block", boxShadow: "0 0 5px #ef4444" }} />
                  <span style={{ fontSize: "9px", fontWeight: 900, color: "#ef4444", letterSpacing: ".22em" }}>NURSING TV</span>
                </div>
                <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 500 }}>10 channels · 140+ lessons · Free forever</span>
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
                  style={{ padding: "8px 18px", borderRadius: "8px 8px 0 0", background: activeGroup === i ? "#ffffff" : "transparent", border: activeGroup === i ? "1px solid rgba(0,0,0,.08)" : "1px solid transparent", borderBottom: activeGroup === i ? "1px solid #fff" : "1px solid transparent", cursor: "pointer", fontFamily: "inherit", fontSize: "12px", fontWeight: activeGroup === i ? 700 : 500, color: activeGroup === i ? g.color : "#94a3b8", transition: "all .15s", marginBottom: "-1px" }}>
                  {g.label}
                </button>
              ))}
            </div>

            {/* BODY: LEFT LIST + RIGHT DETAIL */}
            <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "220px" }}>

              {/* LEFT CHANNEL LIST */}
              <div style={{ background: "rgba(248,249,251,1)", borderRight: "1px solid rgba(0,0,0,.06)", padding: "10px" }}>
                {group.channels.map((c, i) => (
                  <div key={c.title} onMouseEnter={() => setActiveChannel(i)}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "12px", background: activeChannel === i ? "#ffffff" : "transparent", border: `1px solid ${activeChannel === i ? "rgba(0,0,0,.08)" : "transparent"}`, boxShadow: activeChannel === i ? "0 2px 8px rgba(0,0,0,.06)" : "none", cursor: "pointer", transition: "all .18s", marginBottom: "4px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: `${c.color}14`, border: `1px solid ${c.color}${activeChannel === i ? "40" : "20"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .18s" }}>
                      <svg width="16" height="16" fill="none" stroke={c.color} strokeWidth="1.8" viewBox="0 0 24 24"><path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/></svg>
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                        <p style={{ fontSize: "12px", fontWeight: 700, color: activeChannel === i ? "#0f172a" : "#475569", margin: 0, transition: "color .18s" }}>{c.title}</p>
                        {c.live && <span style={{ fontSize: "7px", fontWeight: 900, background: "rgba(239,68,68,.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,.2)", padding: "1px 5px", borderRadius: "100px", letterSpacing: ".1em", flexShrink: 0 }}>LIVE</span>}
                      </div>
                      <p style={{ fontSize: "10px", color: activeChannel === i ? c.color : "#94a3b8", margin: 0, fontWeight: 600, transition: "color .18s" }}>{c.tag}</p>
                    </div>
                    {activeChannel === i && <svg style={{ marginLeft: "auto", flexShrink: 0 }} width="12" height="12" fill="none" stroke={c.color} strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>}
                  </div>
                ))}
              </div>

              {/* RIGHT DETAIL PANEL */}
              <div style={{ padding: "22px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#ffffff", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "180px", height: "180px", borderRadius: "50%", background: `radial-gradient(circle,${channel.color}10 0%,transparent 70%)`, pointerEvents: "none", transition: "background .3s" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ height: "3px", width: "36px", background: channel.color, borderRadius: "3px", marginBottom: "14px", transition: "background .3s" }} />
                  <p style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", margin: "0 0 4px", fontFamily: "'Cormorant Garamond',serif", letterSpacing: ".01em", transition: "color .2s" }}>{channel.title}</p>
                  <p style={{ fontSize: "11px", fontWeight: 600, color: channel.color, margin: "0 0 12px", letterSpacing: ".04em", textTransform: "uppercase", transition: "color .2s" }}>{channel.tag}</p>
                  <p style={{ fontSize: "12px", color: "#475569", lineHeight: 1.75, margin: "0 0 18px", fontWeight: 500 }}>{channel.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", background: `${channel.color}10`, border: `1px solid ${channel.color}25`, borderRadius: "100px", padding: "4px 12px" }}>
                      <svg width="11" height="11" fill="none" stroke={channel.color} strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 110 20A10 10 0 0112 2zm0 5v5l3 3"/></svg>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: channel.color }}>{channel.lessons} lessons</span>
                    </div>
                    {channel.live && (
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", borderRadius: "100px", padding: "4px 12px" }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#ef4444", display: "inline-block", boxShadow: "0 0 4px #ef4444" }} />
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#ef4444" }}>Live now</span>
                      </div>
                    )}
                  </div>
                </div>
                <Link href="/nursing-tv"
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: `${channel.color}08`, border: `1px solid ${channel.color}20`, borderRadius: "12px", textDecoration: "none", transition: "all .2s", marginTop: "18px" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${channel.color}14`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${channel.color}08`; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", margin: "0 0 2px" }}>Watch {channel.title}</p>
                    <p style={{ fontSize: "10px", color: "#64748b", margin: 0, fontWeight: 500 }}>Free · No signup required</p>
                  </div>
                  <svg width="16" height="16" fill="none" stroke={channel.color} strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>

            {/* FOOTER */}
            <div style={{ borderTop: "1px solid rgba(0,0,0,.06)", padding: "12px 20px", background: "rgba(248,249,251,1)", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
              {[{ val: "10", label: "Channels", color: "#0369a1" }, { val: "140+", label: "Lessons", color: "#065f46" }, { val: "Free", label: "Forever", color: "#92400e" }, { val: "Live", label: "Streaming", color: "#dc2626" }].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "14px", fontWeight: 800, color: s.color, margin: "0 0 2px", fontFamily: "'Cormorant Garamond',serif" }}>{s.val}</p>
                  <p style={{ fontSize: "10px", color: "#64748b", margin: 0, fontWeight: 600 }}>{s.label}</p>
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
    print("SUCCESS: NursingTVDropdown replaced with premium design.")