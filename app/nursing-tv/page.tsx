"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

const channels = [
  {
    id: "nclex-rn", name: "NCLEX-RN TV", tag: "Registered Nurse", color: "#0ea5e9",
    live: true, episodes: 24, hours: "18h",
    desc: "Full NCLEX-RN prep â€” NGN questions, rationales, and live walkthroughs by licensed RNs.",
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

export default function NursingTVPage() {
  const [activeChannel, setActiveChannel] = useState(0);
  const [activeEpisode, setActiveEpisode] = useState(0);
  const [ctaHref, setCtaHref] = useState("/auth/signup");
  const [user, setUser] = useState<any>(null);
  const [ticker, setTicker] = useState(0);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();
    const otpVerified = document.cookie.includes("otp_verified=true");
    supabase.auth.getUser().then(({ data }) => {
      if (data.user && otpVerified) { setCtaHref("/dashboard"); setUser(data.user); }
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTicker(t => t + 1), 3000);
    return () => clearInterval(interval);
  }, []);

  const ch = channels[activeChannel];
  const ep = ch.playlist[activeEpisode];

  const scrollToPlayer = () => {
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main style={{ minHeight: "100vh", background: "#060f1e", fontFamily: "\'Plus Jakarta Sans\',sans-serif", color: "#e2e8f0" }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.25; } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(400%); } }
        .fade-up { animation: fadeUp .5s ease both; }
        .live-dot { animation: pulse 1.4s ease infinite; }
        .ch-card { transition: all .22s ease; cursor: pointer; }
        .ch-card:hover { transform: translateY(-3px); }
        .ep-row { transition: all .18s ease; cursor: pointer; border-radius: 10px; }
        .ep-row:hover { background: rgba(255,255,255,.05) !important; }
        .tv-screen::after { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: rgba(255,255,255,.08); animation: scan 3s linear infinite; pointer-events: none; }
      `}</style>

      {/* â”€â”€ HERO BROADCAST BAR â”€â”€ */}
      <div style={{ background: "linear-gradient(90deg,#060f1e 0%,#0a1628 50%,#060f1e 100%)", borderBottom: "1px solid rgba(255,255,255,.06)", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.25)", borderRadius: "100px", padding: "5px 16px" }}>
            <span className="live-dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
            <span style={{ fontSize: "10px", fontWeight: 900, color: "#ef4444", letterSpacing: ".22em" }}>ON AIR</span>
          </div>
          <span style={{ fontSize: "12px", color: "#475569", fontWeight: 500 }}>
            {channels.filter(c => c.live).length} channels live . {channels.reduce((a, c) => a + c.episodes, 0)} episodes . Free forever
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {channels.filter(c => c.live).map(c => (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: "5px", background: c.color + "15", border: "1px solid " + c.color + "30", borderRadius: "100px", padding: "3px 10px" }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: c.color, display: "inline-block" }} />
              <span style={{ fontSize: "10px", fontWeight: 700, color: c.color }}>{c.name}</span>
            </div>
          ))}
        </div>
      </div>


      {/* â”€â”€ CHANNEL GUIDE â”€â”€ */}
      <div style={{ background: "linear-gradient(180deg,#f8fafc 0%,#f1f5f9 100%)", borderTop: "1px solid rgba(0,0,0,.06)", borderBottom: "1px solid rgba(0,0,0,.06)", padding: "28px 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div>
              <p style={{ fontSize: "10px", fontWeight: 800, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", margin: "0 0 4px" }}>Channel Guide</p>
              <h2 style={{ fontFamily: "\'Cormorant Garamond\',serif", fontSize: "1.6rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>Choose your channel</h2>
            </div>
            <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>{channels.length} channels available</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "10px" }}>
            {channels.map((c, i) => (
              <div key={c.id} className="ch-card"
                onClick={() => { setActiveChannel(i); setActiveEpisode(0); scrollToPlayer(); }}
                style={{ background: activeChannel === i ? c.color : ["#dbeafe","#ede9fe","#fee2e2","#fef3c7","#dcfce7","#cffafe"][i % 6], border: "1px solid " + (activeChannel === i ? c.color : ["#e2e8f0","#cbd5e1","#bbf7d0","#fde68a","#e9d5ff","#bae6fd"][i % 6]), borderRadius: "16px", padding: "18px 16px", position: "relative", overflow: "hidden" }}>
                {activeChannel === i && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: c.color }} />}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: c.color + "18", border: "1px solid " + c.color + "30", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" fill="none" stroke={c.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d={c.icon}/></svg>
                  </div>
                  {c.live && (
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.2)", borderRadius: "100px", padding: "2px 8px" }}>
                      <span className="live-dot" style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
                      <span style={{ fontSize: "8px", fontWeight: 800, color: "#ef4444", letterSpacing: ".1em" }}>LIVE</span>
                    </div>
                  )}
                </div>
                <p style={{ fontSize: "13px", fontWeight: 700, color: activeChannel === i ? "#ffffff" : "#0f172a", margin: "0 0 3px", transition: "color .2s" }}>{c.name}</p>
                <p style={{ fontSize: "10px", color: activeChannel === i ? "#ffffffcc" : "#64748b", margin: "0 0 10px", fontWeight: 500, transition: "color .2s" }}>{c.tag}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "10px", color: "#475569", fontWeight: 600 }}>{c.episodes} eps</span>
                  <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#1e293b", display: "inline-block" }} />
                  <span style={{ fontSize: "10px", color: "#475569", fontWeight: 500 }}>{c.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* â”€â”€ NOW PLAYING â”€â”€ */}
      <div ref={playerRef} style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <div style={{ width: "4px", height: "28px", background: ch.color, borderRadius: "4px" }} />
          <div>
            <p style={{ fontSize: "10px", fontWeight: 800, color: ch.color, letterSpacing: ".18em", textTransform: "uppercase", margin: "0 0 2px" }}>Now Playing</p>
            <h2 style={{ fontFamily: "\'Cormorant Garamond\',serif", fontSize: "1.5rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>{ch.name}</h2>
          </div>
          {ch.live && (
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px", background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.22)", borderRadius: "100px", padding: "5px 14px" }}>
              <span className="live-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
              <span style={{ fontSize: "10px", fontWeight: 800, color: "#ef4444", letterSpacing: ".18em" }}>LIVE</span>
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "24px", alignItems: "start" }}>

          {/* VIDEO PLAYER */}
          <div>
            <div className="tv-screen" style={{ position: "relative", background: "#000", borderRadius: "16px", overflow: "hidden", aspectRatio: "16/9", border: "1px solid rgba(255,255,255,.08)", boxShadow: "0 32px 80px rgba(0,0,0,.6)" }}>
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
                <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#060f1e,#0d1f35)", padding: "40px", textAlign: "center" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "18px", background: "rgba(14,165,233,.1)", border: "1px solid rgba(14,165,233,.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                    <svg width="28" height="28" fill="none" stroke="#0ea5e9" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", fontWeight: 700, color: "#f8fafc", margin: "0 0 8px" }}>Sign in to continue</h3>
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
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", fontWeight: 700, color: "#f8fafc", margin: "0 0 8px" }}>Premium episode</h3>
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
                  src={"https://www.youtube.com/embed/" + ep.yt + "?autoplay=0&rel=0&modestbranding=1&controls=1"}
                  title={ep.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                />
              )}
            </div>

            {/* EPISODE INFO */}
            <div style={{ marginTop: "20px", padding: "20px 24px", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: "14px" }}>
              <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: "16px", marginBottom: "10px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, background: levelColors[ep.level] + "18", color: levelColors[ep.level], border: "1px solid " + levelColors[ep.level] + "30", padding: "2px 10px", borderRadius: "100px" }}>{ep.level}</span>
                    <span style={{ fontSize: "11px", color: "#334155", fontWeight: 500 }}>Ep {ep.id} of {ch.playlist.length}</span>
                  </div>
                  <h3 style={{ fontFamily: "\'Cormorant Garamond\',serif", fontSize: "1.4rem", fontWeight: 700, color: "#f8fafc", margin: "0 0 4px" }}>{ep.title}</h3>
                  <p style={{ fontSize: "12px", color: "#475569", margin: 0, fontWeight: 500 }}>{ch.name} . {ep.duration} . {ep.views} views</p>
                </div>
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  {activeEpisode > 0 && (
                    <button onClick={() => setActiveEpisode(e => e - 1)} style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", color: "#94a3b8", padding: "8px 14px", borderRadius: "9px", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                      Prev
                    </button>
                  )}
                  {activeEpisode < ch.playlist.length - 1 && (
                    <button onClick={() => setActiveEpisode(e => e + 1)} style={{ display: "flex", alignItems: "center", gap: "5px", background: ch.color, border: "none", color: "#fff", padding: "8px 16px", borderRadius: "9px", fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                      Next
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  )}
                </div>
              </div>
              <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.7, margin: 0 }}>{ch.desc}</p>
            </div>
          </div>

          {/* PLAYLIST */}
          <div style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)", borderRadius: "16px", overflow: "hidden" }}>
            <div style={{ padding: "16px 18px", borderBottom: "1px solid rgba(255,255,255,.05)", background: ch.color + "0e" }}>
              <p style={{ fontSize: "11px", fontWeight: 800, color: ch.color, letterSpacing: ".15em", textTransform: "uppercase", margin: "0 0 2px" }}>Episode List</p>
              <p style={{ fontSize: "12px", color: "#475569", margin: 0, fontWeight: 500 }}>{ch.playlist.length} episodes . {ch.hours} total</p>
            </div>
            <div style={{ padding: "8px" }}>
              {ch.playlist.map((e, i) => {
                const locked = (i >= 1 && !user) || (i >= 2 && user);
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
                    {activeEpisode === i
                      ? <svg width="11" height="11" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      : <span style={{ fontSize: "11px", fontWeight: 700, color: "#475569" }}>{i + 1}</span>
                    }
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "12px", fontWeight: activeEpisode === i ? 700 : 500, color: activeEpisode === i ? "#f8fafc" : "#94a3b8", margin: "0 0 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", transition: "color .18s" }}>{e.title}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "10px", color: levelColors[e.level], fontWeight: 600 }}>{e.level}</span>
                      <span style={{ fontSize: "10px", color: "#1e293b" }}>.</span>
                      <span style={{ fontSize: "10px", color: "#334155", fontWeight: 500 }}>{e.duration}</span>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
            <div style={{ padding: "14px 18px", borderTop: "1px solid rgba(255,255,255,.05)" }}>
              <Link href={ctaHref} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", background: "linear-gradient(135deg," + ch.color + "," + ch.color + "cc)", color: "#fff", padding: "11px", borderRadius: "10px", fontSize: "12px", fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 16px " + ch.color + "30" }}>
                <svg width="12" height="12" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Unlock full channel
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* â”€â”€ MORE CHANNELS CTA â”€â”€ */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,.05)", background: "linear-gradient(135deg,rgba(14,165,233,.04),rgba(139,92,246,.04))", padding: "48px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p style={{ fontSize: "10px", fontWeight: 800, color: "#334155", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>All Access</p>
          <h2 style={{ fontFamily: "\'Cormorant Garamond\',serif", fontSize: "2.2rem", fontWeight: 700, color: "#f8fafc", marginBottom: "14px" }}>Every channel. Every episode.<br />Always free.</h2>
          <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.8, marginBottom: "28px" }}>No subscriptions. No paywalls. Just premium nursing education, on demand, whenever you need it.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href={ctaHref} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "14px 32px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", textDecoration: "none", boxShadow: "0 8px 24px rgba(14,165,233,.3)" }}>
              <svg width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              Start watching free
            </Link>
            <Link href="/quiz" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "#94a3b8", padding: "14px 24px", borderRadius: "12px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
              Practice questions instead
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}







