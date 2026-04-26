with open(r'app\nursing-tv\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace iframe with paywall-aware player
old = '''          {/* VIDEO PLAYER */}
          <div>
            <div className="tv-screen" style={{ position: "relative", background: "#000", borderRadius: "16px", overflow: "hidden", aspectRatio: "16/9", border: "1px solid rgba(255,255,255,.08)", boxShadow: "0 32px 80px rgba(0,0,0,.6)" }}>
              <iframe
                key={ch.id + "-" + ep.id}
                src={"https://www.youtube.com/embed/" + ep.yt + "?autoplay=0&rel=0&modestbranding=1"}
                title={ep.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: "none", display: "block" }}
              />
            </div>'''

new = '''          {/* VIDEO PLAYER */}
          <div>
            <div className="tv-screen" style={{ position: "relative", background: "#000", borderRadius: "16px", overflow: "hidden", aspectRatio: "16/9", border: "1px solid rgba(255,255,255,.08)", boxShadow: "0 32px 80px rgba(0,0,0,.6)" }}>
              {activeEpisode === 0 ? (
                <iframe
                  key={ch.id + "-" + ep.id}
                  src={"https://www.youtube.com/embed/" + ep.yt + "?autoplay=0&rel=0&modestbranding=1"}
                  title={ep.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                />
              ) : !user ? (
                <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#060f1e,#0d1f35)", padding: "40px", textAlign: "center" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "18px", background: "rgba(14,165,233,.1)", border: "1px solid rgba(14,165,233,.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                    <svg width="28" height="28" fill="none" stroke="#0ea5e9" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  </div>
                  <h3 style={{ fontFamily: "\'Cormorant Garamond\',serif", fontSize: "1.6rem", fontWeight: 700, color: "#f8fafc", margin: "0 0 8px" }}>Sign in to continue</h3>
                  <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.7, margin: "0 0 24px", maxWidth: "340px" }}>Create a free account to watch episode 2. Subscribe to a plan to unlock all episodes.</p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <a href="/auth/signup" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "11px 24px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 16px rgba(14,165,233,.3)" }}>
                      <svg width="13" height="13" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      Sign in free
                    </a>
                    <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "#94a3b8", padding: "11px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                      View plans
                    </a>
                  </div>
                </div>
              ) : activeEpisode >= 2 ? (
                <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#060f1e,#0d1f35)", padding: "40px", textAlign: "center" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "18px", background: "rgba(139,92,246,.1)", border: "1px solid rgba(139,92,246,.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                    <svg width="28" height="28" fill="none" stroke="#8b5cf6" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  </div>
                  <h3 style={{ fontFamily: "\'Cormorant Garamond\',serif", fontSize: "1.6rem", fontWeight: 700, color: "#f8fafc", margin: "0 0 8px" }}>Premium episode</h3>
                  <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.7, margin: "0 0 24px", maxWidth: "340px" }}>This episode is available on our Plus and Premium plans. Unlock the full channel and all 10 channels with one subscription.</p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "linear-gradient(135deg,#8b5cf6,#a78bfa)", color: "#fff", padding: "11px 24px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 16px rgba(139,92,246,.3)" }}>
                      <svg width="13" height="13" fill="white" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      Unlock all episodes
                    </a>
                    <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "#94a3b8", padding: "11px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                      View plans
                    </a>
                  </div>
                </div>
              ) : (
                <iframe
                  key={ch.id + "-" + ep.id}
                  src={"https://www.youtube.com/embed/" + ep.yt + "?autoplay=0&rel=0&modestbranding=1"}
                  title={ep.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                />
              )}
            </div>'''

content = content.replace(old, new)

# Fix locked logic in playlist
content = content.replace(
    'const locked = i > 0 && !user;',
    'const locked = (i >= 1 && !user) || (i >= 2 && user);'
)

with open(r'app\nursing-tv\page.tsx', 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print("SUCCESS: Paywall player implemented.")
