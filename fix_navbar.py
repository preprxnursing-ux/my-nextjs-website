with open(r'app\nursing-tv\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old = '''            <div style={{ padding: "8px" }}>
              {ch.playlist.map((e, i) => (
                <div key={e.id} className="ep-row"
                  onClick={() => setActiveEpisode(i)}
                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 10px", background: activeEpisode === i ? ch.color + "12" : "transparent", border: "1px solid " + (activeEpisode === i ? ch.color + "25" : "transparent"), marginBottom: "2px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: activeEpisode === i ? ch.color : "rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .18s" }}>
                    {activeEpisode === i'''

new = '''            <div style={{ padding: "8px" }}>
              {ch.playlist.map((e, i) => {
                const locked = i > 0 && !user;
                return (
                <div key={e.id} className="ep-row"
                  onClick={() => { if (!locked) setActiveEpisode(i); }}
                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 10px", background: activeEpisode === i ? ch.color + "12" : "transparent", border: "1px solid " + (activeEpisode === i ? ch.color + "25" : "transparent"), marginBottom: "2px", opacity: locked ? 0.6 : 1, cursor: locked ? "default" : "pointer", position: "relative" }}>
                  {locked && (
                    <div style={{ position: "absolute", inset: 0, borderRadius: "10px", background: "rgba(6,15,30,.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, backdropFilter: "blur(2px)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <svg width="12" height="12" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                        <span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: 600 }}>Sign in to watch</span>
                      </div>
                    </div>
                  )}
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: activeEpisode === i ? ch.color : "rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .18s" }}>
                    {activeEpisode === i'''

content = content.replace(old, new)

# Close the map with })} instead of ))}
old2 = '''                </div>
              ))}
            </div>
            <div style={{ padding: "14px 18px", borderTop: "1px solid rgba(255,255,255,.05)" }}>'''

new2 = '''                </div>
                );
              })}
            </div>
            <div style={{ padding: "14px 18px", borderTop: "1px solid rgba(255,255,255,.05)" }}>'''

content = content.replace(old2, new2)

with open(r'app\nursing-tv\page.tsx', 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print("SUCCESS: Episodes 2+ locked behind signup.")