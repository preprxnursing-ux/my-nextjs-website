"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const rooms = [
  {
    id: "nclex-rn", title: "NCLEX-RN Prep", color: "#0ea5e9",
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
    id: "pharmacology", title: "Pharmacology", color: "#8b5cf6",
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
    id: "critical-care", title: "Critical Care", color: "#ef4444",
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
    id: "clinical-skills", title: "Clinical Skills", color: "#10b981",
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
    id: "case-studies", title: "Case Studies", color: "#f59e0b",
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
    id: "exam-strategy", title: "Exam Strategy", color: "#06b6d4",
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

const roomIcons: Record<string, React.ReactNode> = {
  "nclex-rn": <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  "pharmacology": <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>,
  "critical-care": <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  "clinical-skills": <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  "case-studies": <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg>,
  "exam-strategy": <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>,
};

const PlayIcon = ({ size = 16, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} fill={color} viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
);

const EyeIcon = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
);

const ClockIcon = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

const modes = [
  { id: "cinema", label: "Cinema Mode", desc: "Full lessons", icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg> },
  { id: "sprint", label: "Sprint Mode", desc: "5-min bursts", icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
  { id: "countdown", label: "Exam Countdown", desc: "72hr prep", icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
];

const sprintPlaylists = [
  { title: "5-Min Drug Class Blitz", count: 8, color: "#8b5cf6", desc: "Essential pharmacology in bite-sized lessons" },
  { title: "Morning Priority Practice", count: 5, color: "#0ea5e9", desc: "Start your day with high-yield NCLEX questions" },
  { title: "72-Hour Emergency Prep", count: 12, color: "#ef4444", desc: "Last-minute high-yield topic review" },
  { title: "Weak Spot Destroyer", count: 6, color: "#f59e0b", desc: "Target your lowest-confidence categories" },
];

export default function NursingTVPage() {
  const [activeRoom, setActiveRoom] = useState(0);
  const [mode, setMode] = useState<"cinema" | "sprint" | "countdown">("cinema");
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [ctaHref, setCtaHref] = useState("/auth/signup");
  useEffect(() => {
    const supabase = createClient();
    const otpVerified = document.cookie.includes("otp_verified=true");
    supabase.auth.getUser().then(({ data }) => {
      if (data.user && otpVerified) setCtaHref("/dashboard");
    });
  }, []);
  const room = rooms[activeRoom];

  return (
    <main style={{ minHeight: "100vh", background: "#060f1e", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#e2e8f0" }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        .fade-up { animation: fadeUp .5s ease both; }
        .live-dot { animation: pulse 1.5s ease infinite; }
        .room-btn { transition: all .2s ease; cursor: pointer; border: none; font-family: inherit; width: 100%; text-align: left; }
        .room-btn:hover { background: rgba(255,255,255,.04) !important; }
        .vid-row { transition: all .2s ease; border-radius: 12px; padding: 14px 16px; cursor: pointer; }
        .vid-row:hover { background: rgba(255,255,255,.04); }
        .play-circle { transition: all .3s cubic-bezier(.34,1.56,.64,1); }
        .play-circle:hover { transform: scale(1.1); }
        .mode-tab { transition: all .2s ease; cursor: pointer; border: none; font-family: inherit; }
      `}</style>

      {/* HERO */}
      <div style={{ background: "linear-gradient(160deg,#060f1e 0%,#0a1628 60%,#0d1f35 100%)", borderBottom: "1px solid rgba(255,255,255,.05)", padding: "56px 32px 44px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "radial-gradient(ellipse at top right, rgba(14,165,233,0.06) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: "30%", width: "40%", height: "60%", background: "radial-gradient(ellipse at bottom, rgba(139,92,246,0.04) 0%, transparent 60%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "40px", alignItems: "start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "7px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.22)", borderRadius: "100px", padding: "5px 14px" }}>
                  <span className="live-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
                  <span style={{ fontSize: "10px", fontWeight: 800, color: "#ef4444", letterSpacing: ".22em" }}>NURSING TV</span>
                </div>
                <span style={{ fontSize: "12px", color: "#334155", fontWeight: 500 }}>121 lessons Ãƒâ€šÃ‚Â· 6 categories Ãƒâ€šÃ‚Â· Free forever</span>
              </div>

              <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.4rem,4.5vw,4rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.08, marginBottom: "16px" }}>
                The NCLEX Cinema.<br />
                <span style={{ color: "#0ea5e9" }}>Learn like never before.</span>
              </h1>

              <p style={{ fontSize: "16px", color: "#475569", lineHeight: 1.75, maxWidth: "540px", marginBottom: "32px" }}>
                Cinematic learning rooms, sprint playlists, exam countdown mode and real-time confidence tracking. Built exclusively for nurses who pass first time.
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link href={ctaHref} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "13px 28px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", textDecoration: "none", boxShadow: "0 8px 24px rgba(14,165,233,.3)" }}>
                  <PlayIcon size={15} color="#fff" />
                  Start watching free
                </Link>
                <Link href={ctaHref} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "#94a3b8", padding: "13px 24px", borderRadius: "12px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
                  Practice questions instead
                </Link>
              </div>
            </div>

            {/* STATS PANEL */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "200px" }}>
              {[
                { val: "121", label: "Video lessons", color: "#0ea5e9" },
                { val: "48hrs", label: "Total content", color: "#8b5cf6" },
                { val: "98%", label: "Pass rate", color: "#10b981" },
                { val: "Free", label: "No credit card", color: "#f59e0b" },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: "12px", padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: "#475569", fontWeight: 500 }}>{s.label}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 700, color: s.color }}>{s.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MODE TABS */}
          <div style={{ display: "flex", gap: "6px", marginTop: "32px", borderBottom: "1px solid rgba(255,255,255,.06)", paddingBottom: "0" }}>
            {modes.map(m => (
              <button key={m.id} onClick={() => setMode(m.id as any)} className="mode-tab"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "10px 10px 0 0", background: mode === m.id ? "rgba(14,165,233,0.1)" : "transparent", border: `1px solid ${mode === m.id ? "rgba(14,165,233,.2)" : "transparent"}`, borderBottom: mode === m.id ? "2px solid #0ea5e9" : "2px solid transparent", color: mode === m.id ? "#38bdf8" : "#475569", fontSize: "13px", fontWeight: 700, marginBottom: "-1px" }}>
                <span style={{ color: mode === m.id ? "#38bdf8" : "#475569" }}>{m.icon}</span>
                {m.label}
                <span style={{ fontSize: "10px", color: "#334155", fontWeight: 400 }}>Ãƒâ€šÃ‚Â· {m.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "32px" }}>

        {/* SPRINT MODE */}
        {mode === "sprint" && (
          <div className="fade-up">
            <div style={{ marginBottom: "28px" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#f8fafc", marginBottom: "6px" }}>Sprint Playlists</h2>
              <p style={{ fontSize: "14px", color: "#475569" }}>Micro-lessons for busy nurses. Maximum impact in minimum time.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "16px" }}>
              {sprintPlaylists.map(p => (
                <div key={p.title} style={{ background: "rgba(255,255,255,.03)", border: `1px solid ${p.color}20`, borderRadius: "18px", padding: "28px", transition: "all .2s", cursor: "pointer", position: "relative", overflow: "hidden" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${p.color}40`; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${p.color}20`; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: p.color, borderRadius: "18px 18px 0 0" }} />
                  <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: `${p.color}15`, border: `1px solid ${p.color}25`, display: "flex", alignItems: "center", justifyContent: "center", color: p.color, marginBottom: "16px" }}>
                    <PlayIcon size={18} color={p.color} />
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.25rem", fontWeight: 700, color: "#f8fafc", marginBottom: "6px" }}>{p.title}</h3>
                  <p style={{ fontSize: "12px", color: "#475569", marginBottom: "20px", lineHeight: 1.6 }}>{p.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "11px", color: p.color, fontWeight: 600 }}>{p.count} videos</span>
                    <Link href={ctaHref} style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: p.color, color: "#fff", padding: "7px 16px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, textDecoration: "none" }}>
                      <PlayIcon size={11} color="#fff" />
                      Start
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COUNTDOWN MODE */}
        {mode === "countdown" && (
          <div className="fade-up">
            <div style={{ background: "linear-gradient(135deg,rgba(239,68,68,.06),rgba(239,68,68,.02))", border: "1px solid rgba(239,68,68,.15)", borderRadius: "20px", padding: "40px", marginBottom: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="22" height="22" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <p style={{ fontSize: "11px", fontWeight: 700, color: "#ef4444", letterSpacing: ".16em", margin: 0 }}>EXAM COUNTDOWN</p>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>72-Hour Emergency Protocol</h2>
                </div>
              </div>
              <p style={{ fontSize: "15px", color: "#64748b", marginBottom: "24px", lineHeight: 1.7 }}>Exam in 3 days? This curated sequence covers the highest-yield topics in the exact right order. Used by thousands of nurses who passed on their first attempt.</p>
              <Link href={ctaHref} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#ef4444,#f87171)", color: "#fff", padding: "13px 28px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", textDecoration: "none", boxShadow: "0 8px 24px rgba(239,68,68,.3)" }}>
                <PlayIcon size={14} color="#fff" />
                Start emergency prep
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px" }}>
              {[
                { phase: "Phase 1", title: "Foundation Review", time: "Hour 0 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â 24", desc: "Core concepts, priority setting, safety" },
                { phase: "Phase 2", title: "High-Yield Topics", time: "Hour 24 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â 48", desc: "Pharmacology, critical care, case studies" },
                { phase: "Phase 3", title: "Exam Strategy", time: "Hour 48 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â 72", desc: "Test-taking, elimination, mindset" },
              ].map((p, i) => (
                <div key={p.phase} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "14px", padding: "22px" }}>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#ef4444", letterSpacing: ".12em", display: "block", marginBottom: "8px" }}>{p.phase}</span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", fontWeight: 700, color: "#f8fafc", marginBottom: "4px" }}>{p.title}</h3>
                  <p style={{ fontSize: "11px", color: "#334155", marginBottom: "8px", fontWeight: 600 }}>{p.time}</p>
                  <p style={{ fontSize: "12px", color: "#475569" }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CINEMA MODE */}
        {mode === "cinema" && (
          <div style={{ display: "grid", gridTemplateColumns: "270px 1fr", gap: "28px", alignItems: "start" }}>

            {/* SIDEBAR */}
            <div style={{ position: "sticky", top: "80px" }}>
              <p style={{ fontSize: "10px", fontWeight: 800, color: "#334155", letterSpacing: ".18em", textTransform: "uppercase", marginBottom: "10px" }}>Learning Rooms</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                {rooms.map((r, i) => (
                  <button key={r.id} onClick={() => setActiveRoom(i)} className="room-btn"
                    style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderRadius: "12px", background: activeRoom === i ? `${r.color}10` : "transparent", border: `1px solid ${activeRoom === i ? r.color + "30" : "transparent"}`, color: "inherit" }}>
                    <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: activeRoom === i ? `${r.color}15` : "rgba(255,255,255,.04)", border: `1px solid ${activeRoom === i ? r.color + "25" : "rgba(255,255,255,.06)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: activeRoom === i ? r.color : "#475569", flexShrink: 0, transition: "all .2s" }}>
                      {roomIcons[r.id]}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: activeRoom === i ? "#f8fafc" : "#64748b", margin: 0, transition: "color .2s" }}>{r.title}</p>
                      <p style={{ fontSize: "10px", color: "#334155", margin: 0 }}>{r.totalVideos} lessons Ãƒâ€šÃ‚Â· {r.totalHours}</p>
                    </div>
                    {activeRoom === i && <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: r.color, flexShrink: 0, boxShadow: `0 0 8px ${r.color}` }} />}
                  </button>
                ))}
              </div>

              {/* CONFIDENCE METER */}
              <div style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)", borderRadius: "14px", padding: "16px" }}>
                <p style={{ fontSize: "10px", fontWeight: 800, color: "#334155", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "14px" }}>Topic Confidence</p>
                {rooms.map((r, i) => {
                  const pct = [72, 58, 65, 79, 55, 84][i];
                  return (
                    <div key={r.id} style={{ marginBottom: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <span style={{ fontSize: "11px", color: "#475569" }}>{r.title}</span>
                        <span style={{ fontSize: "11px", color: r.color, fontWeight: 700 }}>{pct}%</span>
                      </div>
                      <div style={{ height: "3px", background: "rgba(255,255,255,.05)", borderRadius: "2px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg,${r.color}80,${r.color})`, borderRadius: "2px" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="fade-up">

              {/* FEATURED */}
              <div style={{ background: `linear-gradient(135deg,${room.color}10 0%,rgba(255,255,255,.02) 100%)`, border: `1px solid ${room.color}20`, borderRadius: "20px", padding: "28px", marginBottom: "24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "240px", height: "240px", borderRadius: "50%", background: `radial-gradient(circle,${room.color}12 0%,transparent 70%)`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,${room.color},${room.color}40)` }} />

                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                  <span style={{ fontSize: "9px", fontWeight: 800, color: room.color, letterSpacing: ".18em", background: `${room.color}12`, border: `1px solid ${room.color}25`, padding: "3px 10px", borderRadius: "100px" }}>FEATURED</span>
                  <span style={{ fontSize: "11px", color: "#334155", fontWeight: 500 }}>{room.title}</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "24px", alignItems: "center" }}>
                  <div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.7rem", fontWeight: 700, color: "#f8fafc", marginBottom: "14px", lineHeight: 1.2 }}>{room.featured.title}</h2>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "10px", fontWeight: 700, background: `${levelColors[room.featured.level]}12`, color: levelColors[room.featured.level], border: `1px solid ${levelColors[room.featured.level]}25`, padding: "3px 10px", borderRadius: "100px" }}>{room.featured.level}</span>
                      <span style={{ fontSize: "12px", color: "#475569", display: "flex", alignItems: "center", gap: "4px" }}><ClockIcon /> {room.featured.duration}</span>
                      <span style={{ fontSize: "12px", color: "#475569", display: "flex", alignItems: "center", gap: "4px" }}><EyeIcon /> {room.featured.views} views</span>
                    </div>
                  </div>
                  <Link href={ctaHref}
                    style={{ width: "60px", height: "60px", borderRadius: "50%", background: `linear-gradient(135deg,${room.color},${room.color}cc)`, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", boxShadow: `0 8px 24px ${room.color}40`, transition: "all .3s cubic-bezier(.34,1.56,.64,1)", flexShrink: 0 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
                    <PlayIcon size={22} color="#fff" />
                  </Link>
                </div>
              </div>

              {/* VIDEO LIST */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>All {room.title} Lessons</h3>
                <span style={{ fontSize: "11px", color: "#334155", fontWeight: 600, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", padding: "3px 10px", borderRadius: "100px" }}>{room.totalVideos} videos</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "24px" }}>
                {room.videos.map((v, i) => (
                  <div key={v.title} className="vid-row"
                    onMouseEnter={() => setHoveredVideo(i)}
                    onMouseLeave={() => setHoveredVideo(null)}
                    style={{ display: "grid", gridTemplateColumns: "40px 1fr auto auto", alignItems: "center", gap: "14px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: hoveredVideo === i ? `${room.color}15` : "rgba(255,255,255,.03)", border: `1px solid ${hoveredVideo === i ? room.color + "30" : "rgba(255,255,255,.06)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s", flexShrink: 0 }}>
                      {hoveredVideo === i
                        ? <PlayIcon size={15} color={room.color} />
                        : <span style={{ fontSize: "11px", fontWeight: 700, color: "#334155" }}>{i + 1}</span>
                      }
                    </div>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: hoveredVideo === i ? "#f8fafc" : "#cbd5e1", margin: "0 0 4px", transition: "color .2s" }}>{v.title}</p>
                      <span style={{ fontSize: "9px", fontWeight: 700, background: `${levelColors[v.level]}10`, color: levelColors[v.level], border: `1px solid ${levelColors[v.level]}20`, padding: "1px 8px", borderRadius: "100px" }}>{v.level}</span>
                    </div>
                    <span style={{ fontSize: "11px", color: "#334155", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "3px" }}><EyeIcon />{v.views}</span>
                    <span style={{ fontSize: "12px", color: "#475569", whiteSpace: "nowrap", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}><ClockIcon />{v.duration}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ background: "linear-gradient(135deg,rgba(14,165,233,.05),rgba(139,92,246,.04))", border: "1px solid rgba(14,165,233,.1)", borderRadius: "16px", padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#f8fafc", margin: "0 0 4px" }}>Ready to watch? It is completely free.</p>
                  <p style={{ fontSize: "12px", color: "#475569", margin: 0 }}>Create your account to track progress, earn badges and unlock all lessons</p>
                </div>
                <Link href={ctaHref} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "12px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 8px 24px rgba(14,165,233,.28)" }}>
                  <PlayIcon size={13} color="#fff" />
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