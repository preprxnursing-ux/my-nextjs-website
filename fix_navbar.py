with open(r'app\nursing-tv\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the entire HERO section
old = '''      {/* ── HERO ── */}
      <div style={{ background: "linear-gradient(160deg,#060f1e 0%,#0a1830 60%,#0d1f35 100%)", padding: "52px 32px 40px", position: "relative", overflow: "hidden" }}>        <div style={{ position: "absolute", top: 0, right: 0, width: "60%", height: "100%", background: "radial-gradient(ellipse at top right,rgba(14,165,233,.07) 0%,transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: "20%", width: "50%", height: "50%", background: "radial-gradient(ellipse at bottom,rgba(139,92,246,.05) 0%,transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "48px", alignItems: "center" }}>
            <div className="fade-up">
              <p style={{ fontSize: "11px", fontWeight: 800, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "16px" }}>Pre-NCLEX Nursing . Nursing TV</p>
              <h1 style={{ fontFamily: "\'Cormorant Garamond\',serif", fontSize: "clamp(2.6rem,5vw,4.2rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.06, marginBottom: "20px" }}>
                Your nursing education,<br />
                <span style={{ background: "linear-gradient(135deg,#0ea5e9,#38bdf8,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>on air.</span>
              </h1>
              <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.8, maxWidth: "500px", marginBottom: "32px" }}>
                10 dedicated TV channels. One for every nursing path. Cinematic lessons, expert walkthroughs, and a learning experience unlike anything your competitors offer.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button onClick={() => { setActiveChannel(0); setActiveEpisode(0); scrollToPlayer(); }} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "13px 28px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(14,165,233,.3)", fontFamily: "inherit" }}>
                  <svg width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  Tune in now - free
                </button>
                <Link href={ctaHref} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "#94a3b8", padding: "13px 24px", borderRadius: "12px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
                  Practice questions instead
                </Link>
              </div>
            </div>
            {/* LIVE STATS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "190px" }} className="fade-up">
              {[
                { val: channels.reduce((a, c) => a + c.episodes, 0).toString(), label: "Episodes", color: "#0ea5e9" },
                { val: "10", label: "TV Channels", color: "#8b5cf6" },
                { val: "98%", label: "Pass rate", color: "#10b981" },
                { val: "Free", label: "Always", color: "#f59e0b" },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: "12px", padding: "13px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: "#475569", fontWeight: 500 }}>{s.label}</span>
                  <span style={{ fontFamily: "\'Cormorant Garamond\',serif", fontSize: "1.5rem", fontWeight: 800, color: s.color }}>{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>'''

content = content.replace(old, '')

with open(r'app\nursing-tv\page.tsx', 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print("SUCCESS: Hero section removed.")
