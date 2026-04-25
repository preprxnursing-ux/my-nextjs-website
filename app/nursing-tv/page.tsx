"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const rooms = [
  {
    id: "nclex-rn", title: "NCLEX-RN Prep", emoji: "🏥", color: "#0ea5e9",
    desc: "Master every NCLEX-RN category through cinematic video lessons",
    totalVideos: 24, totalHours: "18h",
    featured: { title: "Physiological Integrity Masterclass", duration: "28:10", views: "12.4K", level: "Advanced" },
    videos: [
      { title: "Safe & Effective Care Environment", duration: "18:42", level: "Foundation", views: "8.2K" },
      { title: "Health Promotion & Maintenance", duration: "22:15", level: "Intermediate", views: "6.1K" },
      { title: "Psychosocial Integrity Deep Dive", duration: "16:30", level: "Foundation", views: "9.3K" },
      { title: "Physiological Integrity Masterclass", duration: "28:10", level: "Advanced", views: "12.4K" },
      { title: "NGN Question Formats Explained", duration: "20:45", level: "Intermediate", views: "15.1K" },
      { title: "NCLEX CAT Adaptive Testing Strategy", duration: "24:30", level: "Advanced", views: "11.8K" },
    ]
  },
  {
    id: "pharmacology", title: "Pharmacology", emoji: "💊", color: "#8b5cf6",
    desc: "Drug classes, mechanisms and nursing implications in minutes",
    totalVideos: 32, totalHours: "24h",
    featured: { title: "Cardiac Medications: The Complete Guide", duration: "34:20", views: "18.7K", level: "Advanced" },
    videos: [
      { title: "Cardiac Medications Overview", duration: "22:30", level: "Intermediate", views: "9.4K" },
      { title: "Antibiotics & Nursing Considerations", duration: "28:15", level: "Advanced", views: "7.8K" },
      { title: "Pain Management Drug Classes", duration: "20:10", level: "Intermediate", views: "11.2K" },
      { title: "Psychiatric Medications Simplified", duration: "25:40", level: "Advanced", views: "8.9K" },
      { title: "Diuretics & Fluid Balance", duration: "18:55", level: "Intermediate", views: "6.7K" },
      { title: "Anticoagulants & Clotting Cascade", duration: "31:10", level: "Advanced", views: "13.4K" },
    ]
  },
  {
    id: "critical-care", title: "Critical Care", emoji: "❤️", color: "#ef4444",
    desc: "ICU-level mastery for CCRN candidates and advanced nurses",
    totalVideos: 20, totalHours: "16h",
    featured: { title: "Sepsis Recognition & The Surviving Sepsis Bundle", duration: "42:15", views: "22.1K", level: "Advanced" },
    videos: [
      { title: "Hemodynamic Monitoring Essentials", duration: "32:15", level: "Advanced", views: "14.3K" },
      { title: "Mechanical Ventilator Management", duration: "38:40", level: "Advanced", views: "16.8K" },
      { title: "Sepsis Recognition & Treatment", duration: "26:20", level: "Advanced", views: "19.2K" },
      { title: "ACLS Algorithms Explained", duration: "44:10", level: "Advanced", views: "21.5K" },
      { title: "Arterial Blood Gas Interpretation", duration: "28:30", level: "Intermediate", views: "17.9K" },
      { title: "Shock States & Management", duration: "35:45", level: "Advanced", views: "13.6K" },
    ]
  },
  {
    id: "clinical-skills", title: "Clinical Skills", emoji: "🩺", color: "#10b981",
    desc: "Step-by-step procedures demonstrated by experienced RNs",
    totalVideos: 18, totalHours: "12h",
    featured: { title: "Complete Head-to-Toe Assessment", duration: "45:00", views: "24.3K", level: "Foundation" },
    videos: [
      { title: "IV Insertion & Management", duration: "24:10", level: "Intermediate", views: "11.7K" },
      { title: "Wound Care & Dressing Changes", duration: "19:55", level: "Foundation", views: "8.4K" },
      { title: "Medication Administration Safety", duration: "31:20", level: "Advanced", views: "9.8K" },
      { title: "Foley Catheter Insertion", duration: "22:45", level: "Intermediate", views: "7.3K" },
      { title: "NG Tube Placement & Verification", duration: "18:30", level: "Intermediate", views: "6.9K" },
      { title: "Blood Transfusion Protocol", duration: "26:15", level: "Advanced", views: "10.2K" },
    ]
  },
  {
    id: "case-studies", title: "Case Studies", emoji: "📋", color: "#f59e0b",
    desc: "Real patient scenarios with full clinical reasoning walkthroughs",
    totalVideos: 15, totalHours: "10h",
    featured: { title: "CHF Exacerbation: Full Patient Journey", duration: "52:30", views: "19.8K", level: "Advanced" },
    videos: [
      { title: "CHF Patient Management", duration: "35:20", level: "Advanced", views: "12.1K" },
      { title: "Diabetic Ketoacidosis Case", duration: "29:45", level: "Advanced", views: "10.4K" },
      { title: "Post-Op Care Scenario", duration: "24:10", level: "Intermediate", views: "8.7K" },
      { title: "Pediatric Febrile Seizure Case", duration: "27:30", level: "Intermediate", views: "9.3K" },
      { title: "Stroke Alert Protocol", duration: "33:15", level: "Advanced", views: "14.6K" },
      { title: "Psychiatric Emergency Scenario", duration: "28:40", level: "Advanced", views: "11.2K" },
    ]
  },
  {
    id: "exam-strategy", title: "Exam Strategy", emoji: "🎯", color: "#06b6d4",
    desc: "Test-taking mastery, mindset coaching and last-minute prep",
    totalVideos: 12, totalHours: "8h",
    featured: { title: "The 72-Hour Pre-Exam Protocol", duration: "38:45", views: "31.2K", level: "Foundation" },
    videos: [
      { title: "How to Approach NCLEX Questions", duration: "15:30", level: "Foundation", views: "28.4K" },
      { title: "Elimination Strategy Masterclass", duration: "18:20", level: "Foundation", views: "22.1K" },
      { title: "Managing Test Anxiety", duration: "12:45", level: "Foundation", views: "19.8K" },
      { title: "The 72-Hour Pre-Exam Protocol", duration: "14:10", level: "Foundation", views: "31.2K" },
      { title: "Priority & Delegation Framework", duration: "21:35", level: "Intermediate", views: "17.6K" },
      { title: "SATA Questions Decoded", duration: "16:50", level: "Intermediate", views: "24.3K" },
    ]
  },
];

const levelColors: Record<string, string> = { Foundation: "#10b981", Intermediate: "#f59e0b", Advanced: "#ef4444" };

const sprintPlaylists = [
  { title: "5-Min Drug Class Blitz", count: 8, color: "#8b5cf6", icon: "⚡" },
  { title: "Morning Ritual: Priority Questions", count: 5, color: "#0ea5e9", icon: "🌅" },
  { title: "72-Hour Emergency Prep", count: 12, color: "#ef4444", icon: "🚨" },
  { title: "Weak Spot Destroyer", count: 6, color: "#f59e0b", icon: "🎯" },
];

function formatViews(v: string) { return v; }

export default function NursingTVPage() {
  const [activeRoom, setActiveRoom] = useState(0);
  const [mode, setMode] = useState<"cinema" | "sprint" | "countdown">("cinema");
  const [streak, setStreak] = useState(7);
  const [watchedToday, setWatchedToday] = useState(3);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const room = rooms[activeRoom];

  return (
    <main style={{ minHeight: "100vh", background: "#060f1e", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#e2e8f0" }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-6px); } }
        .fade-up { animation: fadeUp .5s ease both; }
        .live-dot { animation: pulse 1.5s ease infinite; }
        .room-card { transition: all .3s cubic-bezier(.34,1.56,.64,1); cursor: pointer; }
        .room-card:hover { transform: translateY(-4px) scale(1.02); }
        .vid-row { transition: all .2s ease; border-radius: 12px; }
        .vid-row:hover { background: rgba(255,255,255,.04); }
        .play-btn { transition: all .3s cubic-bezier(.34,1.56,.64,1); }
        .play-btn:hover { transform: scale(1.15); }
        .mode-btn { transition: all .2s ease; cursor: pointer; border: none; font-family: inherit; }
        .streak-fire { animation: float 2s ease infinite; display: inline-block; }
      `}</style>

      {/* HERO HEADER */}
      <div style={{ background: "linear-gradient(160deg,#060f1e 0%,#0d1829 60%,#0e2540 100%)", borderBottom: "1px solid rgba(255,255,255,.06)", padding: "48px 32px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "600px", height: "100%", background: "radial-gradient(ellipse at top right, rgba(14,165,233,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "100px", padding: "5px 14px" }}>
                  <span className="live-dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
                  <span style={{ fontSize: "10px", fontWeight: 800, color: "#ef4444", letterSpacing: ".2em" }}>NURSING TV</span>
                </div>
                <span style={{ fontSize: "11px", color: "#334155", fontWeight: 600 }}>121 lessons · Free forever</span>
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem,4vw,3.8rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.1, marginBottom: "12px" }}>
                The NCLEX Cinema.<br />
                <span style={{ color: "#0ea5e9" }}>Learn like never before.</span>
              </h1>
              <p style={{ fontSize: "15px", color: "#475569", lineHeight: 1.7, maxWidth: "520px" }}>
                Cinematic learning rooms, smart playlists, sprint mode and real-time confidence tracking — built exclusively for nurses who pass first time.
              </p>
            </div>

            {/* STREAK + STATS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: "220px" }}>
              <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "16px", padding: "20px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <span className="streak-fire" style={{ fontSize: "24px" }}>🔥</span>
                  <div>
                    <p style={{ fontSize: "22px", fontWeight: 800, color: "#f59e0b", margin: 0, fontFamily: "'Cormorant Garamond',serif" }}>{streak} day streak</p>
                    <p style={{ fontSize: "11px", color: "#475569", margin: 0 }}>Keep it up! You are on a roll</p>
                  </div>
                </div>
                <div style={{ height: "4px", background: "rgba(255,255,255,.06)", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(streak / 30) * 100}%`, background: "linear-gradient(90deg,#f59e0b,#fbbf24)", borderRadius: "2px" }} />
                </div>
                <p style={{ fontSize: "10px", color: "#334155", marginTop: "6px" }}>{30 - streak} days to 30-day badge</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <div style={{ background: "rgba(14,165,233,.06)", border: "1px solid rgba(14,165,233,.12)", borderRadius: "12px", padding: "12px", textAlign: "center" }}>
                  <p style={{ fontSize: "20px", fontWeight: 800, color: "#0ea5e9", margin: 0, fontFamily: "'Cormorant Garamond',serif" }}>{watchedToday}</p>
                  <p style={{ fontSize: "10px", color: "#475569", margin: 0 }}>Today</p>
                </div>
                <div style={{ background: "rgba(16,185,129,.06)", border: "1px solid rgba(16,185,129,.12)", borderRadius: "12px", padding: "12px", textAlign: "center" }}>
                  <p style={{ fontSize: "20px", fontWeight: 800, color: "#10b981", margin: 0, fontFamily: "'Cormorant Garamond',serif" }}>92%</p>
                  <p style={{ fontSize: "10px", color: "#475569", margin: 0 }}>Confidence</p>
                </div>
              </div>
            </div>
          </div>

          {/* MODE SWITCHER */}
          <div style={{ display: "flex", gap: "8px", marginTop: "28px", flexWrap: "wrap" }}>
            {[
              { id: "cinema", label: "🎬 Cinema Mode", desc: "Full lessons" },
              { id: "sprint", label: "⚡ Sprint Mode", desc: "5-min bursts" },
              { id: "countdown", label: "🚨 Exam Countdown", desc: "72hr prep" },
            ].map(m => (
              <button key={m.id} onClick={() => setMode(m.id as any)} className="mode-btn"
                style={{ padding: "10px 20px", borderRadius: "12px", background: mode === m.id ? "rgba(14,165,233,0.15)" : "rgba(255,255,255,.04)", border: `1px solid ${mode === m.id ? "rgba(14,165,233,.35)" : "rgba(255,255,255,.08)"}`, color: mode === m.id ? "#38bdf8" : "#64748b", fontSize: "13px", fontWeight: 700 }}>
                {m.label}
                <span style={{ fontSize: "10px", color: "#475569", display: "block", fontWeight: 400 }}>{m.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "32px" }}>

        {/* SPRINT MODE */}
        {mode === "sprint" && (
          <div className="fade-up">
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#f8fafc", marginBottom: "8px" }}>Sprint Playlists</h2>
            <p style={{ fontSize: "14px", color: "#475569", marginBottom: "28px" }}>Micro-lessons designed for busy nurses. 5 minutes. Maximum impact.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "16px" }}>
              {sprintPlaylists.map(p => (
                <div key={p.title} className="room-card" style={{ background: `linear-gradient(135deg,${p.color}12,rgba(255,255,255,.02))`, border: `1px solid ${p.color}25`, borderRadius: "18px", padding: "24px" }}>
                  <span style={{ fontSize: "32px", display: "block", marginBottom: "12px" }}>{p.icon}</span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 700, color: "#f8fafc", marginBottom: "8px" }}>{p.title}</h3>
                  <p style={{ fontSize: "12px", color: "#475569", marginBottom: "16px" }}>{p.count} videos · under 5 min each</p>
                  <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: p.color, color: "#fff", padding: "8px 18px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>
                    <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    Start sprint
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COUNTDOWN MODE */}
        {mode === "countdown" && (
          <div className="fade-up">
            <div style={{ background: "linear-gradient(135deg,rgba(239,68,68,.08),rgba(239,68,68,.02))", border: "1px solid rgba(239,68,68,.2)", borderRadius: "20px", padding: "32px", marginBottom: "28px", textAlign: "center" }}>
              <span style={{ fontSize: "48px", display: "block", marginBottom: "12px" }}>🚨</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.5rem", fontWeight: 700, color: "#f8fafc", marginBottom: "8px" }}>72-Hour Emergency Protocol</h2>
              <p style={{ fontSize: "15px", color: "#64748b", marginBottom: "24px" }}>Exam in 3 days? This curated sequence covers the highest-yield topics in the right order.</p>
              <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#ef4444,#f87171)", color: "#fff", padding: "14px 32px", borderRadius: "12px", fontWeight: 700, fontSize: "15px", textDecoration: "none", boxShadow: "0 8px 24px rgba(239,68,68,.35)" }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Start emergency prep
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px" }}>
              {["Hour 0-24: Foundation Review", "Hour 24-48: High-Yield Topics", "Hour 48-72: Exam Strategy"].map((t, i) => (
                <div key={t} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "14px", padding: "20px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#ef4444", letterSpacing: ".1em" }}>PHASE {i + 1}</span>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#f1f5f9", marginTop: "6px" }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CINEMA MODE */}
        {mode === "cinema" && (
          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "24px", alignItems: "start" }}>

            {/* ROOMS SIDEBAR */}
            <div style={{ position: "sticky", top: "80px" }}>
              <p style={{ fontSize: "10px", fontWeight: 800, color: "#334155", letterSpacing: ".18em", textTransform: "uppercase", marginBottom: "12px" }}>Learning Rooms</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {rooms.map((r, i) => (
                  <button key={r.id} onClick={() => setActiveRoom(i)} className="mode-btn"
                    style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", borderRadius: "13px", background: activeRoom === i ? `${r.color}12` : "rgba(255,255,255,.02)", border: `1px solid ${activeRoom === i ? r.color + "35" : "rgba(255,255,255,.06)"}`, textAlign: "left", width: "100%", color: "inherit" }}>
                    <span style={{ fontSize: "20px", flexShrink: 0 }}>{r.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: activeRoom === i ? "#f8fafc" : "#94a3b8", margin: 0 }}>{r.title}</p>
                      <p style={{ fontSize: "10px", color: "#334155", margin: 0 }}>{r.totalVideos} lessons · {r.totalHours}</p>
                    </div>
                    {activeRoom === i && (
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: r.color, flexShrink: 0, boxShadow: `0 0 8px ${r.color}` }} />
                    )}
                  </button>
                ))}
              </div>

              {/* CONFIDENCE METER */}
              <div style={{ marginTop: "20px", background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)", borderRadius: "14px", padding: "16px" }}>
                <p style={{ fontSize: "10px", fontWeight: 800, color: "#334155", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "12px" }}>Topic Confidence</p>
                {rooms.map(r => (
                  <div key={r.id} style={{ marginBottom: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                      <span style={{ fontSize: "11px", color: "#475569" }}>{r.title}</span>
                      <span style={{ fontSize: "11px", color: r.color, fontWeight: 700 }}>{Math.floor(Math.random() * 40 + 55)}%</span>
                    </div>
                    <div style={{ height: "3px", background: "rgba(255,255,255,.05)", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${Math.floor(Math.random() * 40 + 55)}%`, background: r.color, borderRadius: "2px", transition: "width .5s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="fade-up">
              {/* FEATURED VIDEO */}
              <div style={{ background: `linear-gradient(135deg,${room.color}15 0%,rgba(255,255,255,.02) 60%)`, border: `1px solid ${room.color}25`, borderRadius: "20px", padding: "28px", marginBottom: "24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: `radial-gradient(circle,${room.color}20 0%,transparent 70%)`, pointerEvents: "none" }} />
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                  <span style={{ fontSize: "10px", fontWeight: 800, color: room.color, letterSpacing: ".16em", background: `${room.color}15`, border: `1px solid ${room.color}30`, padding: "3px 10px", borderRadius: "100px" }}>FEATURED</span>
                  <span style={{ fontSize: "10px", color: "#334155", fontWeight: 600 }}>{room.emoji} {room.title}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "24px", alignItems: "center" }}>
                  <div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 700, color: "#f8fafc", marginBottom: "12px", lineHeight: 1.2 }}>{room.featured.title}</h2>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, background: `${levelColors[room.featured.level]}15`, color: levelColors[room.featured.level], border: `1px solid ${levelColors[room.featured.level]}30`, padding: "3px 10px", borderRadius: "100px" }}>{room.featured.level}</span>
                      <span style={{ fontSize: "12px", color: "#475569" }}>⏱ {room.featured.duration}</span>
                      <span style={{ fontSize: "12px", color: "#475569" }}>👁 {room.featured.views} views</span>
                    </div>
                  </div>
                  <Link href="/dashboard" className="play-btn"
                    style={{ width: "64px", height: "64px", borderRadius: "50%", background: `linear-gradient(135deg,${room.color},${room.color}cc)`, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", boxShadow: `0 8px 24px ${room.color}50`, flexShrink: 0 }}>
                    <svg width="24" height="24" fill="#fff" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </Link>
                </div>
              </div>

              {/* VIDEO LIST */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>All {room.title} Lessons</h3>
                <span style={{ fontSize: "11px", color: "#334155", fontWeight: 600 }}>{room.totalVideos} videos</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {room.videos.map((v, i) => (
                  <div key={v.title} className="vid-row"
                    onMouseEnter={() => setHoveredVideo(i)}
                    onMouseLeave={() => setHoveredVideo(null)}
                    style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", alignItems: "center", gap: "16px", padding: "14px 16px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: hoveredVideo === i ? `${room.color}20` : "rgba(255,255,255,.04)", border: `1px solid ${hoveredVideo === i ? room.color + "40" : "rgba(255,255,255,.07)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s", flexShrink: 0 }}>
                      {hoveredVideo === i ? (
                        <svg width="16" height="16" fill={room.color} viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      ) : (
                        <span style={{ fontSize: "12px", fontWeight: 700, color: "#334155" }}>{i + 1}</span>
                      )}
                    </div>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 600, color: hoveredVideo === i ? "#f8fafc" : "#e2e8f0", margin: 0, transition: "color .2s" }}>{v.title}</p>
                      <span style={{ fontSize: "10px", fontWeight: 700, background: `${levelColors[v.level]}12`, color: levelColors[v.level], padding: "1px 8px", borderRadius: "100px" }}>{v.level}</span>
                    </div>
                    <span style={{ fontSize: "12px", color: "#334155", whiteSpace: "nowrap" }}>👁 {v.views}</span>
                    <span style={{ fontSize: "12px", color: "#475569", whiteSpace: "nowrap", fontWeight: 600 }}>{v.duration}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ marginTop: "24px", background: "linear-gradient(135deg,rgba(14,165,233,.06),rgba(139,92,246,.04))", border: "1px solid rgba(14,165,233,.12)", borderRadius: "16px", padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#f8fafc", margin: "0 0 4px" }}>Ready to watch? It is completely free.</p>
                  <p style={{ fontSize: "12px", color: "#475569", margin: 0 }}>Create your account to track progress, earn badges and unlock all lessons</p>
                </div>
                <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "12px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 8px 24px rgba(14,165,233,.3)" }}>
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  Start watching free
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
