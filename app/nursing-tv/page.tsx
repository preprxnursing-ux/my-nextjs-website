"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

const channels = [
  {
    id: "nclex-rn", name: "NCLEX-RN TV", tag: "Registered Nurse", color: "#0ea5e9",
    live: true, episodes: 24, hours: "18h",
    desc: "Full NCLEX-RN prep — NGN questions, rationales, and live walkthroughs by licensed RNs.",
    icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
    playlist: [
      { id: 1, title: "NCLEX-RN Orientation & CAT Strategy", duration: "18:42", level: "Foundation", views: "8.2K", yt: "Odzpo_vnp14" },
      { id: 2, title: "Safe & Effective Care Environment", duration: "22:15", level: "Foundation", views: "6.1K", yt: "Odzpo_vnp14" },
      { id: 3, title: "Health Promotion & Maintenance", duration: "16:30", level: "Intermediate", views: "9.3K", yt: "Odzpo_vnp14" },
      { id: 4, title: "Psychosocial Integrity Deep Dive", duration: "28:10", level: "Intermediate", views: "12.4K", yt: "Odzpo_vnp14" },
      { id: 5, title: "Physiological Integrity Masterclass", duration: "20:45", level: "Advanced", views: "15.1K", yt: "Odzpo_vnp14" },
      { id: 6, title: "NGN Question Formats Explained", duration: "24:30", level: "Advanced", views: "11.8K", yt: "Odzpo_vnp14" },
    ]
  },
  {
    id: "nclex-pn", name: "NCLEX-PN TV", tag: "Practical Nurse", color: "#6366f1",
    live: true, episodes: 18, hours: "14h",
    desc: "Targeted PN content covering pharmacology, safety, and clinical decision-making for LPN/LVN candidates.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    playlist: [
      { id: 1, title: "NCLEX-PN Overview & Test Plan", duration: "15:20", level: "Foundation", views: "5.4K", yt: "Odzpo_vnp14" },
      { id: 2, title: "Coordinated Care & Safety", duration: "19:45", level: "Foundation", views: "4.8K", yt: "Odzpo_vnp14" },
      { id: 3, title: "Pharmacology for PN Candidates", duration: "26:10", level: "Intermediate", views: "7.2K", yt: "Odzpo_vnp14" },
      { id: 4, title: "Physiological Adaptation", duration: "22:30", level: "Advanced", views: "6.1K", yt: "Odzpo_vnp14" },
      { id: 5, title: "Reduction of Risk Potential", duration: "18:55", level: "Intermediate", views: "5.9K", yt: "Odzpo_vnp14" },
    ]
  },
  {
    id: "ccrn", name: "CCRN TV", tag: "Critical Care RN", color: "#ef4444",
    live: true, episodes: 20, hours: "16h",
    desc: "ICU-focused content covering hemodynamics, ventilators, and high-acuity clinical scenarios.",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    playlist: [
      { id: 1, title: "Hemodynamic Monitoring Essentials", duration: "32:15", level: "Advanced", views: "14.3K", yt: "Odzpo_vnp14" },
      { id: 2, title: "Mechanical Ventilator Management", duration: "38:40", level: "Advanced", views: "16.8K", yt: "Odzpo_vnp14" },
      { id: 3, title: "Sepsis Recognition & Surviving Sepsis Bundle", duration: "26:20", level: "Advanced", views: "19.2K", yt: "Odzpo_vnp14" },
      { id: 4, title: "ACLS Algorithms Explained", duration: "44:10", level: "Advanced", views: "21.5K", yt: "Odzpo_vnp14" },
      { id: 5, title: "Arterial Blood Gas Interpretation", duration: "28:30", level: "Intermediate", views: "17.9K", yt: "Odzpo_vnp14" },
      { id: 6, title: "Shock States & Management", duration: "35:45", level: "Advanced", views: "13.6K", yt: "Odzpo_vnp14" },
    ]
  },
  {
    id: "fnp", name: "FNP TV", tag: "Nurse Practitioner", color: "#8b5cf6",
    live: false, episodes: 16, hours: "13h",
    desc: "Family nurse practitioner board prep with pharmacology, diagnostics, and clinical management.",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    playlist: [
      { id: 1, title: "FNP Board Exam Overview", duration: "20:10", level: "Foundation", views: "4.2K", yt: "Odzpo_vnp14" },
      { id: 2, title: "Advanced Pharmacology for NPs", duration: "34:20", level: "Advanced", views: "6.8K", yt: "Odzpo_vnp14" },
      { id: 3, title: "Differential Diagnosis Framework", duration: "28:45", level: "Advanced", views: "5.1K", yt: "Odzpo_vnp14" },
      { id: 4, title: "Chronic Disease Management", duration: "31:10", level: "Advanced", views: "4.7K", yt: "Odzpo_vnp14" },
    ]
  },
  {
    id: "teas7", name: "TEAS 7 TV", tag: "Pre-Nursing Exam", color: "#f59e0b",
    live: false, episodes: 12, hours: "9h",
    desc: "ATI TEAS 7 prep covering science, math, reading, and English for nursing school admission.",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    playlist: [
      { id: 1, title: "TEAS 7 Test Structure & Strategy", duration: "14:30", level: "Foundation", views: "7.8K", yt: "Odzpo_vnp14" },
      { id: 2, title: "Science: Human Body Systems", duration: "24:15", level: "Intermediate", views: "6.2K", yt: "Odzpo_vnp14" },
      { id: 3, title: "Math: Ratios & Dosage Calculations", duration: "19:40", level: "Intermediate", views: "5.4K", yt: "Odzpo_vnp14" },
      { id: 4, title: "Reading Comprehension Strategies", duration: "16:20", level: "Foundation", views: "4.9K", yt: "Odzpo_vnp14" },
    ]
  },
  {
    id: "hesi", name: "HESI A2 TV", tag: "Admission Exam", color: "#10b981",
    live: false, episodes: 10, hours: "7h",
    desc: "HESI A2 exam prep with subject-specific lessons and practice to secure your nursing school spot.",
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
    playlist: [
      { id: 1, title: "HESI A2 Overview & Scoring", duration: "12:20", level: "Foundation", views: "3.8K", yt: "Odzpo_vnp14" },
      { id: 2, title: "Anatomy & Physiology Essentials", duration: "22:45", level: "Intermediate", views: "4.1K", yt: "Odzpo_vnp14" },
      { id: 3, title: "Vocabulary & Grammar for HESI", duration: "15:10", level: "Foundation", views: "3.2K", yt: "Odzpo_vnp14" },
    ]
  },
];

const levelColors: Record<string, string> = {
  Foundation: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#ef4444",
};

const bgColors = ["#dbeafe","#ede9fe","#fee2e2","#fef3c7","#dcfce7","#cffafe"];
const borderColors = ["#bfdbfe","#ddd6fe","#fecaca","#fde68a","#bbf7d0","#a5f3fc"];

export default function NursingTVPage() {
  const [activeChannel, setActiveChannel] = useState(0);
  const [activeEpisode, setActiveEpisode] = useState(0);
  const [ctaHref, setCtaHref] = useState("/auth/signup");
  const [user, setUser] = useState<any>(null);
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user && document.cookie.includes("otp_verified=true")) {
        setCtaHref("/dashboard");
        setUser(data.user);
      }
    });
  }, []);

  const ch = channels[activeChannel];
  const ep = ch.playlist[activeEpisode];

  const scrollToPlayer = () => {
    setTimeout(() => playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  return (
    <main style={{ minHeight: "100vh", background: "#060f1e", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#e2e8f0", overflowX: "hidden" }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        .fade-up { animation: fadeUp .45s ease both; }
        .live-dot { animation: pulse 1.4s ease infinite; }
        .ch-card { transition: transform .2s ease, box-shadow .2s ease; cursor: pointer; -webkit-tap-highlight-color: transparent; }
        .ch-card:active { transform: scale(0.97); }
        .ep-row { transition: background .15s ease; cursor: pointer; border-radius: 10px; -webkit-tap-highlight-color: transparent; }

        /* ── BROADCAST BAR ── */
        .broadcast-bar {
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          overflow: hidden;
        }
        .broadcast-chips { display: flex; gap: 6px; flex-wrap: wrap; }

        /* ── CHANNEL GUIDE ── */
        .channel-guide { padding: 24px 16px; }
        .channel-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        /* ── PLAYER SECTION ── */
        .player-section { padding: 24px 16px; }
        .player-layout {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .playlist-panel {
          border-radius: 16px;
          overflow: hidden;
          background: rgba(255,255,255,.02);
          border: 1px solid rgba(255,255,255,.06);
        }

        /* ── TABLET 640px+ ── */
        @media (min-width: 640px) {
          .broadcast-bar { padding: 12px 28px; }
          .channel-guide { padding: 28px 28px; }
          .channel-grid { grid-template-columns: repeat(3, 1fr); }
          .player-section { padding: 32px 28px; }
        }

        /* ── DESKTOP 1024px+ ── */
        @media (min-width: 1024px) {
          .broadcast-bar { padding: 12px 40px; }
          .channel-guide { padding: 32px 40px; }
          .channel-grid { grid-template-columns: repeat(6, 1fr); }
          .player-section { padding: 40px 40px; }
          .player-layout {
            display: grid;
            grid-template-columns: 1fr 340px;
            gap: 24px;
            align-items: start;
          }
        }

        /* ── PLAYLIST TOGGLE (mobile only) ── */
        .playlist-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          cursor: pointer;
          border-bottom: 1px solid rgba(255,255,255,.05);
          -webkit-tap-highlight-color: transparent;
        }
        @media (min-width: 1024px) {
          .playlist-toggle { display: none; }
          .playlist-body { display: block !important; }
        }

        /* ── CTA SECTION ── */
        .cta-section { padding: 48px 20px; }
        @media (min-width: 640px) { .cta-section { padding: 56px 32px; } }

        /* ── EPISODE INFO NAV BUTTONS ── */
        .ep-nav { display: flex; gap: 8px; flex-wrap: wrap; }
      `}</style>

      {/* BROADCAST BAR */}
      <div style={{ background: "linear-gradient(90deg,#060f1e,#0a1628,#060f1e)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div className="broadcast-bar">
          <div style={{ display: "flex", alignItems: "center", gap: "7px", background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.25)", borderRadius: "100px", padding: "4px 14px", flexShrink: 0 }}>
            <span className="live-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
            <span style={{ fontSize: "10px", fontWeight: 900, color: "#ef4444", letterSpacing: ".2em" }}>ON AIR</span>
          </div>
          <span style={{ fontSize: "11px", color: "#475569", fontWeight: 500 }}>
            {channels.filter(c => c.live).length} live · {channels.reduce((a, c) => a + c.episodes, 0)} episodes · Free
          </span>
          <div className="broadcast-chips">
            {channels.filter(c => c.live).map(c => (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: "4px", background: c.color + "15", border: "1px solid " + c.color + "30", borderRadius: "100px", padding: "3px 9px" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: c.color, display: "inline-block" }} />
                <span style={{ fontSize: "9px", fontWeight: 700, color: c.color }}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CHANNEL GUIDE */}
      <div style={{ background: "linear-gradient(180deg,#f8fafc,#f1f5f9)", borderTop: "1px solid rgba(0,0,0,.05)", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
        <div className="channel-guide" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
            <div>
              <p style={{ fontSize: "10px", fontWeight: 800, color: "#0ea5e9", letterSpacing: ".18em", textTransform: "uppercase", margin: "0 0 3px" }}>Channel Guide</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.3rem,4vw,1.6rem)", fontWeight: 700, color: "#0f172a", margin: 0 }}>Choose your channel</h2>
            </div>
            <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>{channels.length} channels</span>
          </div>

          <div className="channel-grid">
            {channels.map((c, i) => (
              <div key={c.id} className="ch-card"
                onClick={() => { setActiveChannel(i); setActiveEpisode(0); setPlaylistOpen(false); scrollToPlayer(); }}
                style={{ background: activeChannel === i ? c.color : bgColors[i % 6], border: "2px solid " + (activeChannel === i ? c.color : borderColors[i % 6]), borderRadius: "14px", padding: "14px 12px", position: "relative", overflow: "hidden", boxShadow: activeChannel === i ? "0 8px 24px " + c.color + "30" : "none" }}>
                {activeChannel === i && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "rgba(255,255,255,.4)", borderRadius: "2px" }} />}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: activeChannel === i ? "rgba(255,255,255,.2)" : c.color + "18", border: "1px solid " + (activeChannel === i ? "rgba(255,255,255,.3)" : c.color + "30"), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="14" height="14" fill="none" stroke={activeChannel === i ? "#fff" : c.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d={c.icon}/></svg>
                  </div>
                  {c.live && (
                    <div style={{ display: "flex", alignItems: "center", gap: "3px", background: activeChannel === i ? "rgba(255,255,255,.2)" : "rgba(239,68,68,.1)", border: "1px solid " + (activeChannel === i ? "rgba(255,255,255,.3)" : "rgba(239,68,68,.2)"), borderRadius: "100px", padding: "2px 6px" }}>
                      <span className="live-dot" style={{ width: "4px", height: "4px", borderRadius: "50%", background: activeChannel === i ? "#fff" : "#ef4444", display: "inline-block" }} />
                      <span style={{ fontSize: "7px", fontWeight: 900, color: activeChannel === i ? "#fff" : "#ef4444", letterSpacing: ".1em" }}>LIVE</span>
                    </div>
                  )}
                </div>
                <p style={{ fontSize: "12px", fontWeight: 700, color: activeChannel === i ? "#fff" : "#0f172a", margin: "0 0 2px", lineHeight: 1.3 }}>{c.name}</p>
                <p style={{ fontSize: "9px", color: activeChannel === i ? "rgba(255,255,255,.75)" : "#64748b", margin: "0 0 8px", fontWeight: 500 }}>{c.tag}</p>
                <p style={{ fontSize: "9px", color: activeChannel === i ? "rgba(255,255,255,.65)" : "#94a3b8", margin: 0, fontWeight: 500 }}>{c.episodes} eps · {c.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PLAYER SECTION */}
      <div ref={playerRef} className="player-section" style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* NOW PLAYING LABEL */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px", flexWrap: "wrap" }}>
          <div style={{ width: "4px", height: "26px", background: ch.color, borderRadius: "4px", flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: "9px", fontWeight: 800, color: ch.color, letterSpacing: ".18em", textTransform: "uppercase", margin: "0 0 2px" }}>Now Playing</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.2rem,4vw,1.5rem)", fontWeight: 700, color: "#f8fafc", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ch.name}</h2>
          </div>
          {ch.live && (
            <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.22)", borderRadius: "100px", padding: "4px 12px", flexShrink: 0 }}>
              <span className="live-dot" style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
              <span style={{ fontSize: "9px", fontWeight: 900, color: "#ef4444", letterSpacing: ".18em" }}>LIVE</span>
            </div>
          )}
        </div>

        <div className="player-layout">

          {/* VIDEO PLAYER + INFO */}
          <div>
            {/* VIDEO */}
            <div style={{ position: "relative", background: "#000", borderRadius: "14px", overflow: "hidden", aspectRatio: "16/9", border: "1px solid rgba(255,255,255,.08)", boxShadow: "0 24px 60px rgba(0,0,0,.55)", width: "100%" }}>
              {activeEpisode === 0 ? (
                <iframe
                  key={ch.id + "-" + ep.id}
                  src={"https://www.youtube.com/embed/" + ep.yt + "?autoplay=0&rel=0&modestbranding=1&controls=1"}
                  title={ep.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                />
              ) : !user ? (
                <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#060f1e,#0d1f35)", padding: "24px 20px", textAlign: "center" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "rgba(14,165,233,.1)", border: "1px solid rgba(14,165,233,.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    <svg width="24" height="24" fill="none" stroke="#0ea5e9" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.2rem,4vw,1.6rem)", fontWeight: 700, color: "#f8fafc", margin: "0 0 8px" }}>Sign in to continue</h3>
                  <p style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.7, margin: "0 0 20px", maxWidth: "280px" }}>Create a free account to watch episode 2 and beyond.</p>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
                    <a href="/auth/signup" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "10px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>
                      <svg width="12" height="12" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      Sign in free
                    </a>
                    <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "#94a3b8", padding: "10px 16px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                      View plans
                    </a>
                  </div>
                </div>
              ) : activeEpisode >= 2 ? (
                <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#060f1e,#0d1f35)", padding: "24px 20px", textAlign: "center" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "rgba(139,92,246,.1)", border: "1px solid rgba(139,92,246,.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    <svg width="24" height="24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.2rem,4vw,1.6rem)", fontWeight: 700, color: "#f8fafc", margin: "0 0 8px" }}>Premium episode</h3>
                  <p style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.7, margin: "0 0 20px", maxWidth: "280px" }}>Unlock all episodes with a Plus or Premium plan.</p>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
                    <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "linear-gradient(135deg,#8b5cf6,#a78bfa)", color: "#fff", padding: "10px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>
                      Unlock all episodes
                    </a>
                    <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "#94a3b8", padding: "10px 16px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                      View plans
                    </a>
                  </div>
                </div>
              ) : (
                <iframe
                  key={ch.id + "-" + ep.id}
                  src={"https://www.youtube.com/embed/" + ep.yt + "?autoplay=0&rel=0&modestbranding=1&controls=1"}
                  title={ep.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                />
              )}
            </div>

            {/* EPISODE INFO */}
            <div style={{ marginTop: "14px", padding: "16px", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: "14px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "10px", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "10px", fontWeight: 700, background: levelColors[ep.level] + "18", color: levelColors[ep.level], border: "1px solid " + levelColors[ep.level] + "30", padding: "2px 10px", borderRadius: "100px" }}>{ep.level}</span>
                    <span style={{ fontSize: "10px", color: "#475569", fontWeight: 500 }}>Ep {ep.id} of {ch.playlist.length}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.1rem,3.5vw,1.4rem)", fontWeight: 700, color: "#f8fafc", margin: "0 0 4px", lineHeight: 1.3 }}>{ep.title}</h3>
                  <p style={{ fontSize: "11px", color: "#475569", margin: 0, fontWeight: 500 }}>{ch.name} · {ep.duration} · {ep.views} views</p>
                </div>
                <div className="ep-nav">
                  {activeEpisode > 0 && (
                    <button onClick={() => setActiveEpisode(e => e - 1)} style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", color: "#94a3b8", padding: "9px 14px", borderRadius: "9px", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", minHeight: "40px" }}>
                      <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                      Prev
                    </button>
                  )}
                  {activeEpisode < ch.playlist.length - 1 && (
                    <button onClick={() => setActiveEpisode(e => e + 1)} style={{ display: "flex", alignItems: "center", gap: "5px", background: ch.color, border: "none", color: "#fff", padding: "9px 16px", borderRadius: "9px", fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", minHeight: "40px" }}>
                      Next
                      <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  )}
                </div>
              </div>
              <p style={{ fontSize: "12px", color: "#475569", lineHeight: 1.7, margin: 0 }}>{ch.desc}</p>
            </div>
          </div>

          {/* PLAYLIST PANEL */}
          <div className="playlist-panel">
            {/* Mobile toggle header */}
            <div className="playlist-toggle" onClick={() => setPlaylistOpen(o => !o)} style={{ background: ch.color + "0e" }}>
              <div>
                <p style={{ fontSize: "10px", fontWeight: 800, color: ch.color, letterSpacing: ".14em", textTransform: "uppercase", margin: "0 0 2px" }}>Episode List</p>
                <p style={{ fontSize: "11px", color: "#475569", margin: 0, fontWeight: 500 }}>{ch.playlist.length} episodes · {ch.hours}</p>
              </div>
              <svg width="16" height="16" fill="none" stroke="#475569" strokeWidth="2.5" viewBox="0 0 24 24" style={{ transform: playlistOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s" }}>
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>

            {/* Playlist body — always visible on desktop, toggled on mobile */}
            <div className="playlist-body" style={{ display: playlistOpen ? "block" : "none" }}>
              <div style={{ padding: "8px", maxHeight: "360px", overflowY: "auto" }}>
                {ch.playlist.map((e, i) => {
                  const locked = (i >= 1 && !user) || (i >= 2 && user);
                  return (
                    <div key={e.id} className="ep-row"
                      onClick={() => { if (!locked) { setActiveEpisode(i); setPlaylistOpen(false); scrollToPlayer(); } }}
                      style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 10px", background: activeEpisode === i ? ch.color + "12" : "transparent", border: "1px solid " + (activeEpisode === i ? ch.color + "25" : "transparent"), marginBottom: "2px", opacity: locked ? 0.55 : 1, cursor: locked ? "default" : "pointer", position: "relative" }}>
                      {locked && (
                        <div style={{ position: "absolute", inset: 0, borderRadius: "10px", background: "rgba(6,15,30,.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, backdropFilter: "blur(2px)" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <svg width="11" height="11" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                            <span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: 600 }}>Sign in to watch</span>
                          </div>
                        </div>
                      )}
                      <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: activeEpisode === i ? ch.color : "rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {activeEpisode === i
                          ? <svg width="10" height="10" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                          : <span style={{ fontSize: "11px", fontWeight: 700, color: "#475569" }}>{i + 1}</span>
                        }
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "12px", fontWeight: activeEpisode === i ? 700 : 500, color: activeEpisode === i ? "#f8fafc" : "#94a3b8", margin: "0 0 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.title}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          <span style={{ fontSize: "9px", color: levelColors[e.level], fontWeight: 600 }}>{e.level}</span>
                          <span style={{ fontSize: "9px", color: "#334155" }}>·</span>
                          <span style={{ fontSize: "9px", color: "#475569", fontWeight: 500 }}>{e.duration}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ padding: "12px 14px", borderTop: "1px solid rgba(255,255,255,.05)" }}>
                <Link href={ctaHref} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", background: "linear-gradient(135deg," + ch.color + "," + ch.color + "cc)", color: "#fff", padding: "11px", borderRadius: "10px", fontSize: "12px", fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 16px " + ch.color + "30" }}>
                  <svg width="11" height="11" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  Unlock full channel
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CTA SECTION */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,.05)", background: "linear-gradient(135deg,rgba(14,165,233,.04),rgba(139,92,246,.04))", textAlign: "center" }}>
        <div className="cta-section" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p style={{ fontSize: "10px", fontWeight: 800, color: "#334155", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>All Access</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.6rem,5vw,2.2rem)", fontWeight: 700, color: "#f8fafc", marginBottom: "14px", lineHeight: 1.25 }}>Every channel. Every episode.<br />Always free.</h2>
          <p style={{ fontSize: "clamp(13px,2.5vw,14px)", color: "#475569", lineHeight: 1.8, marginBottom: "28px" }}>No subscriptions. No paywalls. Just premium nursing education, on demand.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href={ctaHref} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "14px 28px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", textDecoration: "none", boxShadow: "0 8px 24px rgba(14,165,233,.3)" }}>
              <svg width="13" height="13" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              Start watching free
            </Link>
            <Link href="/quiz" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "#94a3b8", padding: "14px 20px", borderRadius: "12px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
              Practice questions
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
