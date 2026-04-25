import re

with open(r'components\Navbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_component = '''function NursingTVDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  function handleEnter() { if (timeout.current) clearTimeout(timeout.current); setOpen(true); }
  function handleLeave() { timeout.current = setTimeout(() => setOpen(false), 200); }
  const groups = [
    { label: "Licensure", color: "#0ea5e9", channels: [
      { title: "NCLEX-RN TV", tag: "Registered Nurse", color: "#0ea5e9", lessons: 24, live: true },
      { title: "NCLEX-PN TV", tag: "Practical Nurse", color: "#6366f1", lessons: 18, live: true },
    ]},
    { label: "Specialty", color: "#ef4444", channels: [
      { title: "CCRN TV", tag: "Critical Care RN", color: "#ef4444", lessons: 20, live: true },
      { title: "CEN TV", tag: "Emergency Nurse", color: "#f97316", lessons: 14, live: false },
      { title: "PCCN TV", tag: "Progressive Care", color: "#ec4899", lessons: 12, live: false },
      { title: "FNP TV", tag: "Nurse Practitioner", color: "#8b5cf6", lessons: 16, live: false },
    ]},
    { label: "Entrance", color: "#f59e0b", channels: [
      { title: "TEAS 7 TV", tag: "Pre-Nursing Exam", color: "#f59e0b", lessons: 12, live: false },
      { title: "HESI A2 TV", tag: "Admission Exam", color: "#10b981", lessons: 10, live: false },
    ]},
    { label: "Life Support", color: "#06b6d4", channels: [
      { title: "ACLS TV", tag: "Advanced Cardiac", color: "#06b6d4", lessons: 8, live: false },
      { title: "BLS TV", tag: "Basic Life Support", color: "#84cc16", lessons: 6, live: false },
    ]},
  ];
  return (
    <div style={{ position: "relative" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button onClick={() => window.location.href="/nursing-tv"} className={`nav-btn${isActive(pathname, "/nursing-tv") ? " active" : ""}`} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444" style={{ flexShrink: 0 }}><path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/></svg>
        Nursing TV
        <ChevronDown style={{ width: 12, height: 12, transition: "transform .2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>
      {open && (
        <div className="nav-dropdown" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: "100%", zIndex: 1001, paddingTop: "10px", width: "740px" }}>
          <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,.08)", borderRadius: "20px", boxShadow: "0 32px 80px rgba(0,0,0,.18)", overflow: "hidden" }}>

            {/* HEADER */}
            <div style={{ padding: "20px 28px", borderBottom: "1px solid rgba(0,0,0,.06)", background: "linear-gradient(135deg,rgba(239,68,68,.06),rgba(14,165,233,.04))", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "7px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "100px", padding: "5px 14px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", display: "inline-block", boxShadow: "0 0 6px #ef4444" }} />
                  <span style={{ fontSize: "10px", fontWeight: 900, color: "#ef4444", letterSpacing: ".22em" }}>NURSING TV</span>
                </div>
                <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 500 }}>10 channels · 140+ lessons · Free</span>
              </div>
              <Link href="/nursing-tv" style={{ fontSize: "12px", fontWeight: 700, color: "#0ea5e9", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px" }}>
                Browse all
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            {/* GROUP TABS */}
            <div style={{ display: "flex", gap: "2px", padding: "12px 20px 0", background: "#f8f9fb", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
              {groups.map((g, i) => (
                <button key={g.label} onMouseEnter={() => setActiveGroup(i)}
                  style={{ padding: "9px 20px", borderRadius: "10px 10px 0 0", background: activeGroup === i ? "#ffffff" : "transparent", border: activeGroup === i ? "1px solid rgba(0,0,0,.08)" : "1px solid transparent", borderBottom: activeGroup === i ? "1px solid #fff" : "1px solid transparent", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: activeGroup === i ? 700 : 500, color: activeGroup === i ? g.color : "#94a3b8", transition: "all .15s", marginBottom: "-1px" }}>
                  {g.label}
                </button>
              ))}
            </div>

            {/* CHANNELS */}
            <div style={{ padding: "24px", background: "#ffffff", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {groups[activeGroup].channels.map(c => (
                <Link key={c.title} href="/nursing-tv"
                  style={{ display: "flex", alignItems: "center", gap: "14px", padding: "18px 20px", borderRadius: "14px", textDecoration: "none", background: "#f8f9fb", border: "1px solid rgba(0,0,0,.06)", transition: "all .2s", position: "relative", overflow: "hidden" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${c.color}08`; e.currentTarget.style.borderColor = `${c.color}30`; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${c.color}18`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#f8f9fb"; e.currentTarget.style.borderColor = "rgba(0,0,0,.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "3px", background: `linear-gradient(180deg,${c.color},${c.color}66)`, borderRadius: "3px 0 0 3px" }} />
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: `${c.color}12`, border: `1px solid ${c.color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" fill="none" stroke={c.color} strokeWidth="1.8" viewBox="0 0 24 24"><path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/></svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                      <p style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", margin: 0, fontFamily: "'Cormorant Garamond',serif", letterSpacing: ".01em" }}>{c.title}</p>
                      {c.live && <span style={{ fontSize: "8px", fontWeight: 900, background: "rgba(239,68,68,.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,.2)", padding: "2px 7px", borderRadius: "100px", letterSpacing: ".14em" }}>LIVE</span>}
                    </div>
                    <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>{c.tag} · {c.lessons} lessons</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* FOOTER */}
            <div style={{ padding: "16px 28px", borderTop: "1px solid rgba(0,0,0,.06)", background: "linear-gradient(135deg,rgba(239,68,68,.03),rgba(14,165,233,.03))", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
                {[{ val: "10", label: "Channels" }, { val: "140+", label: "Lessons" }, { val: "Free", label: "Forever" }].map(s => (
                  <div key={s.label} style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                    <span style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", fontFamily: "'Cormorant Garamond',serif" }}>{s.val}</span>
                    <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 500 }}>{s.label}</span>
                  </div>
                ))}
              </div>
              <Link href="/nursing-tv" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "10px 22px", borderRadius: "10px", fontSize: "12px", fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 16px rgba(14,165,233,.3)", letterSpacing: ".02em" }}>
                <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Watch free
              </Link>
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
    print("SUCCESS: NursingTVDropdown replaced cleanly.")
