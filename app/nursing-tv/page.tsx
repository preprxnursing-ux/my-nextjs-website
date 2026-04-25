"use client";
import Link from "next/link";
import { useState } from "react";

const categories = [
  {
    title: "NCLEX-RN Prep", color: "#0ea5e9", count: 24,
    desc: "Master every NCLEX-RN category through focused video lessons",
    videos: [
      { title: "Safe & Effective Care Environment", duration: "18:42", level: "Foundation" },
      { title: "Health Promotion & Maintenance", duration: "22:15", level: "Intermediate" },
      { title: "Psychosocial Integrity", duration: "16:30", level: "Foundation" },
      { title: "Physiological Integrity", duration: "28:10", level: "Advanced" },
    ]
  },
  {
    title: "Clinical Skills", color: "#10b981", count: 18,
    desc: "Step-by-step clinical procedures explained by licensed RNs",
    videos: [
      { title: "IV Insertion & Management", duration: "24:10", level: "Intermediate" },
      { title: "Wound Care & Dressing Changes", duration: "19:55", level: "Foundation" },
      { title: "Medication Administration", duration: "31:20", level: "Advanced" },
      { title: "Patient Assessment Head-to-Toe", duration: "26:45", level: "Foundation" },
    ]
  },
  {
    title: "Pharmacology", color: "#8b5cf6", count: 32,
    desc: "Drug classes, mechanisms and nursing implications simplified",
    videos: [
      { title: "Cardiac Medications Overview", duration: "22:30", level: "Intermediate" },
      { title: "Antibiotics & Nursing Considerations", duration: "28:15", level: "Advanced" },
      { title: "Pain Management Drugs", duration: "20:10", level: "Intermediate" },
      { title: "Psychiatric Medications", duration: "25:40", level: "Advanced" },
    ]
  },
  {
    title: "Case Studies", color: "#f59e0b", count: 15,
    desc: "Real patient scenarios with full clinical reasoning walkthroughs",
    videos: [
      { title: "CHF Patient Management", duration: "35:20", level: "Advanced" },
      { title: "Diabetic Ketoacidosis Case", duration: "29:45", level: "Advanced" },
      { title: "Post-Op Care Scenario", duration: "24:10", level: "Intermediate" },
      { title: "Pediatric Assessment Case", duration: "27:30", level: "Intermediate" },
    ]
  },
  {
    title: "Critical Care", color: "#ef4444", count: 20,
    desc: "ICU-level concepts for CCRN candidates and advanced practice",
    videos: [
      { title: "Hemodynamic Monitoring", duration: "32:15", level: "Advanced" },
      { title: "Ventilator Management", duration: "38:40", level: "Advanced" },
      { title: "Sepsis Recognition & Treatment", duration: "26:20", level: "Advanced" },
      { title: "ACLS Algorithms Explained", duration: "44:10", level: "Advanced" },
    ]
  },
  {
    title: "Exam Strategy", color: "#06b6d4", count: 12,
    desc: "Test-taking techniques, time management and mindset coaching",
    videos: [
      { title: "How to Approach NCLEX Questions", duration: "15:30", level: "Foundation" },
      { title: "Elimination Strategy Masterclass", duration: "18:20", level: "Foundation" },
      { title: "Managing Test Anxiety", duration: "12:45", level: "Foundation" },
      { title: "Last 72 Hours Before the Exam", duration: "14:10", level: "Foundation" },
    ]
  },
];

const levelColors: Record<string, string> = {
  Foundation: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#ef4444",
};

export default function NursingTVPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const cat = categories[activeCategory];

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg,#060f1e 0%,#0d1f35 50%,#0e2540 100%)", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#e2e8f0" }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp .6s ease both; }
        .vid-card { background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); border-radius: 16px; transition: all .2s; cursor: pointer; }
        .vid-card:hover { border-color: rgba(14,165,233,.25); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,0,0,.3); }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        .live-dot { animation: pulse 2s ease infinite; }
      `}</style>

      <div style={{ padding: "60px 24px 40px", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="fade-up" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "100px", padding: "6px 16px" }}>
            <span className="live-dot" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
            <span style={{ fontSize: "11px", fontWeight: 800, color: "#ef4444", letterSpacing: ".16em" }}>NURSING TV</span>
          </div>
          <span style={{ fontSize: "12px", color: "#475569", fontWeight: 500 }}>121 lessons · 6 categories · Free access</span>
        </div>
        <h1 className="fade-up" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.1, marginBottom: "20px" }}>
          Learn nursing.<br />
          <span style={{ color: "#0ea5e9" }}>Watch. Understand. Pass.</span>
        </h1>
        <p className="fade-up" style={{ fontSize: "17px", color: "#64748b", lineHeight: 1.8, maxWidth: "600px", marginBottom: "32px" }}>
          Video lessons built by licensed RNs covering everything from NCLEX fundamentals to critical care. Study at your own pace, on any device.
        </p>
        <div className="fade-up" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link href="/auth/signup" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "14px 32px", borderRadius: "12px", fontWeight: 700, fontSize: "15px", textDecoration: "none", boxShadow: "0 8px 24px rgba(14,165,233,.35)" }}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            Start watching free
          </Link>
          <Link href="/quiz" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "#94a3b8", padding: "14px 28px", borderRadius: "12px", fontWeight: 600, fontSize: "15px", textDecoration: "none" }}>
            Practice questions instead
          </Link>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", borderBottom: "1px solid rgba(255,255,255,.06)", background: "rgba(255,255,255,.02)", padding: "20px 24px", marginBottom: "48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "48px", flexWrap: "wrap" }}>
          {[{ val: "121", label: "Video lessons" }, { val: "6", label: "Categories" }, { val: "48hrs", label: "Total content" }, { val: "Free", label: "No credit card" }, { val: "HD", label: "Video quality" }].map(s => (
            <div key={s.label}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 700, color: "#0ea5e9", margin: 0 }}>{s.val}</p>
              <p style={{ fontSize: "11px", color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "28px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", position: "sticky", top: "80px" }}>
            <p style={{ fontSize: "10px", fontWeight: 800, color: "#334155", letterSpacing: ".16em", textTransform: "uppercase", marginBottom: "8px" }}>Browse categories</p>
            {categories.map((c, i) => (
              <button key={c.title} onClick={() => setActiveCategory(i)}
                style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", borderRadius: "12px", border: `1px solid ${activeCategory === i ? c.color + "40" : "rgba(255,255,255,.06)"}`, background: activeCategory === i ? `${c.color}10` : "rgba(255,255,255,.02)", cursor: "pointer", fontFamily: "inherit", textAlign: "left", transition: "all .2s", width: "100%" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: c.color, boxShadow: activeCategory === i ? `0 0 12px ${c.color}80` : "none", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: activeCategory === i ? "#f8fafc" : "#94a3b8", margin: 0 }}>{c.title}</p>
                  <p style={{ fontSize: "10px", color: "#475569", margin: 0 }}>{c.count} lessons</p>
                </div>
                {activeCategory === i && <svg width="14" height="14" fill="none" stroke={c.color} strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>}
              </button>
            ))}
          </div>

          <div>
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: cat.color }} />
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>{cat.title}</h2>
                <span style={{ fontSize: "11px", fontWeight: 700, background: `${cat.color}15`, color: cat.color, border: `1px solid ${cat.color}30`, padding: "3px 10px", borderRadius: "100px" }}>{cat.count} lessons</span>
              </div>
              <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>{cat.desc}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {cat.videos.map((v) => (
                <div key={v.title} className="vid-card" style={{ padding: "20px" }}>
                  <div style={{ background: `linear-gradient(135deg,${cat.color}20,rgba(255,255,255,.02))`, borderRadius: "10px", height: "120px", marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${cat.color}20`, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 30% 50%, ${cat.color}15 0%, transparent 70%)` }} />
                    <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: `${cat.color}20`, border: `2px solid ${cat.color}40`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
                      <svg width="18" height="18" fill={cat.color} viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    <div style={{ position: "absolute", bottom: "10px", right: "10px", background: "rgba(0,0,0,.6)", borderRadius: "6px", padding: "2px 8px", fontSize: "11px", fontWeight: 700, color: "#fff" }}>{v.duration}</div>
                  </div>
                  <span style={{ fontSize: "9px", fontWeight: 700, background: `${levelColors[v.level]}15`, color: levelColors[v.level], border: `1px solid ${levelColors[v.level]}30`, padding: "2px 8px", borderRadius: "100px" }}>{v.level}</span>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#f1f5f9", margin: "8px 0 0", lineHeight: 1.4 }}>{v.title}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "24px", padding: "20px 24px", background: "rgba(14,165,233,.05)", border: "1px solid rgba(14,165,233,.12)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#f8fafc", margin: "0 0 4px" }}>More {cat.title} videos coming soon</p>
                <p style={{ fontSize: "12px", color: "#475569", margin: 0 }}>New lessons added weekly by Dr. James Whitfield</p>
              </div>
              <Link href="/auth/signup" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "10px 20px", borderRadius: "10px", fontWeight: 700, fontSize: "13px", textDecoration: "none", whiteSpace: "nowrap" }}>
                Get notified
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
