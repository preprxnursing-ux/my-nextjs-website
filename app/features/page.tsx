"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
  *, body { font-family: 'Plus Jakarta Sans', sans-serif; }
  .fd { font-family: 'Cormorant Garamond', Georgia, serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes floatY {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-16px); }
  }
  @keyframes pulseRing {
    0%   { transform: scale(1); opacity: .5; }
    100% { transform: scale(1.6); opacity: 0; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .fade-up { animation: fadeUp .7s ease both; }
  .float   { animation: floatY 6s ease-in-out infinite; }

  .feature-card {
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 20px;
    padding: 28px;
    cursor: pointer;
    transition: all .35s cubic-bezier(.34,1.56,.64,1);
    position: relative;
    overflow: hidden;
  }
  .feature-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 0%, rgba(14,165,233,.06) 100%);
    opacity: 0;
    transition: opacity .35s ease;
    border-radius: 20px;
  }
  .feature-card:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(14,165,233,.35);
    box-shadow: 0 24px 60px rgba(0,0,0,.3), 0 0 0 1px rgba(14,165,233,.15);
    background: rgba(255,255,255,.07);
  }
  .feature-card:hover::before { opacity: 1; }

  .feature-card .card-icon {
    transition: transform .35s cubic-bezier(.34,1.56,.64,1);
  }
  .feature-card:hover .card-icon {
    transform: scale(1.2) rotate(-5deg);
  }

  .feature-card .card-desc {
    max-height: 0;
    overflow: hidden;
    transition: max-height .4s ease, opacity .4s ease, margin .4s ease;
    opacity: 0;
    margin-top: 0;
  }
  .feature-card:hover .card-desc {
    max-height: 120px;
    opacity: 1;
    margin-top: 12px;
  }

  .comparison-row {
    transition: background .2s ease;
    cursor: default;
  }
  .comparison-row:hover { background: rgba(14,165,233,.06) !important; }

  .tab-btn {
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all .2s ease;
    border: 1px solid rgba(255,255,255,.08);
    background: transparent;
    color: #64748b;
    font-family: inherit;
    white-space: nowrap;
  }
  .tab-btn.active {
    background: rgba(14,165,233,.15);
    border-color: rgba(14,165,233,.35);
    color: #38bdf8;
  }
  .tab-btn:hover:not(.active) {
    background: rgba(255,255,255,.06);
    color: #94a3b8;
  }

  .shimmer-text {
    background: linear-gradient(90deg, #38bdf8 0%, #ffffff 50%, #38bdf8 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3s linear infinite;
  }

  .ticker-wrap { overflow: hidden; white-space: nowrap; }
  .ticker-inner { display: inline-flex; animation: ticker 30s linear infinite; }
  .ticker-item {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 0 32px; font-size: 13px; font-weight: 600; color: #475569;
  }
  .ticker-dot { width: 4px; height: 4px; border-radius: 50%; background: #0ea5e9; flex-shrink: 0; }
`;

function useCounter(target: number, duration = 2000, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return val;
}

const features = [
  { icon: "🎯", title: "Three Exam Modes", short: "Timed · Tutor · Quick", desc: "Timed mode simulates real NCLEX pressure. Tutor mode gives instant feedback. Quick mode is a 10-question daily sprint.", color: "#0ea5e9", glow: "rgba(14,165,233,.2)" },
  { icon: "🧠", title: "Deep Clinical Rationales", short: "Learn the why, not just the what", desc: "Every question includes a full breakdown of why each answer is right or wrong — building real clinical reasoning.", color: "#8b5cf6", glow: "rgba(139,92,246,.2)" },
  { icon: "📊", title: "Performance Dashboard", short: "Track every attempt", desc: "See your scores, spot weak topics, and watch accuracy improve over time with full attempt breakdowns.", color: "#10b981", glow: "rgba(16,185,129,.2)" },
  { icon: "🚩", title: "Flag & Review System", short: "Never lose a tough question", desc: "Flag any question mid-exam. After submitting, filter by incorrect, flagged, or topic — then study what matters.", color: "#f59e0b", glow: "rgba(245,158,11,.2)" },
  { icon: "⏱️", title: "Adaptive Timer", short: "Pressure that builds real skill", desc: "Timed exams build the mental endurance NCLEX demands. Tutor mode removes the clock so you can focus on learning.", color: "#ef4444", glow: "rgba(239,68,68,.2)" },
  { icon: "📱", title: "Any Device, Anywhere", short: "Mobile · Tablet · Desktop", desc: "Fully responsive — study on your phone on the bus, tablet at the library, or laptop at home.", color: "#06b6d4", glow: "rgba(6,182,212,.2)" },
  { icon: "🔒", title: "Private & Secure", short: "Your data stays yours", desc: "Every attempt is saved securely to your account. Your history and scores are private and never shared.", color: "#64748b", glow: "rgba(100,116,139,.2)" },
  { icon: "🤖", title: "AI Tutor — Coming Soon", short: "Personalised study plans", desc: "Our upcoming AI layer will explain why you keep missing certain questions and generate adaptive study plans.", color: "#c084fc", glow: "rgba(192,132,252,.2)" },
  { icon: "🎓", title: "Multi-Certification", short: "NCLEX · FNP · CCRN", desc: "We cover more than just NCLEX-RN. Premium subscribers get FNP and CCRN question sets as they launch.", color: "#34d399", glow: "rgba(52,211,153,.2)" },
];

const comparisons = [
  { feature: "Full rationale per question",        us: true,  them: true  },
  { feature: "NCLEX clinical thinking tips",       us: true,  them: false },
  { feature: "Tutor mode with instant feedback",   us: true,  them: true  },
  { feature: "Personal performance dashboard",     us: true,  them: true  },
  { feature: "Flag and review system",             us: true,  them: true  },
  { feature: "AI-powered study recommendations",   us: true,  them: false },
  { feature: "FNP and CCRN question sets",         us: true,  them: true  },
  { feature: "Free plan with real questions",      us: true,  them: false },
  { feature: "No ads ever",                        us: true,  them: false },
  { feature: "Built by nurses for nurses",         us: true,  them: false },
];

const tabs = [
  {
    id: "quiz",
    label: "Quiz Mode",
    icon: "🎯",
    preview: {
      title: "NCLEX-RN Practice Exam",
      subtitle: "Question 12 of 30 · Timed Mode",
      question: "A nurse is caring for a client who has heart failure and is receiving IV furosemide. Which finding should the nurse report to the provider immediately?",
      options: [
        { label: "A", text: "Urine output of 200 mL in 2 hours", correct: false },
        { label: "B", text: "Serum potassium of 2.8 mEq/L", correct: true },
        { label: "C", text: "Blood pressure of 138/88 mmHg", correct: false },
        { label: "D", text: "Weight loss of 0.5 kg since yesterday", correct: false },
      ],
      timer: "18:42",
    },
  },
  {
    id: "rationale",
    label: "Rationales",
    icon: "🧠",
    preview: {
      title: "Clinical Rationale",
      subtitle: "Correct Answer: B",
      question: "Serum potassium of 2.8 mEq/L indicates hypokalemia — a serious electrolyte imbalance that can cause life-threatening cardiac dysrhythmias.",
      bullets: [
        "Furosemide is a loop diuretic that causes potassium wasting",
        "Normal potassium range is 3.5–5.0 mEq/L",
        "Hypokalemia increases risk of digoxin toxicity",
        "Immediate provider notification and replacement therapy required",
      ],
    },
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "📊",
    preview: {
      title: "Your Performance",
      subtitle: "Last 7 days · NCLEX-RN",
      stats: [
        { label: "Latest Score", val: "74%", color: "#0ea5e9" },
        { label: "Questions Done", val: "312", color: "#10b981" },
        { label: "Weak Topic", val: "Pharmacology", color: "#f59e0b" },
        { label: "Streak", val: "6 days", color: "#8b5cf6" },
      ],
    },
  },
];

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState("quiz");
  const [statsActive, setStatsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const students  = useCounter(50000, 2500, statsActive);
  const passRate  = useCounter(98,    1800, statsActive);
  const questions = useCounter(3100,  2000, statsActive);
  const courses   = useCounter(6,     1000, statsActive);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsActive(true); },
      { threshold: .3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const activeTabData = tabs.find(t => t.id === activeTab)!;

  return (
    <>
      <style>{fontStyle}</style>
      <main style={{ background: "#0d1f35", minHeight: "100vh", color: "#f1f5f9" }}>

        {/* ══ HERO ══ */}
        <section style={{ position: "relative", padding: "100px 40px 80px", overflow: "hidden", background: "linear-gradient(160deg,#0d1f35 0%,#0f2a45 100%)" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(14,165,233,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,.04) 1px,transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />
          <div className="float" style={{ position: "absolute", top: "-60px", right: "8%", width: "480px", height: "480px", background: "radial-gradient(circle,rgba(14,165,233,.12) 0%,transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-40px", left: "4%", width: "300px", height: "300px", background: "radial-gradient(circle,rgba(139,92,246,.08) 0%,transparent 65%)", pointerEvents: "none" }} />

          <div style={{ maxWidth: "1280px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(14,165,233,.12)", border: "1px solid rgba(14,165,233,.3)", borderRadius: "100px", padding: "6px 18px", fontSize: "11px", fontWeight: 700, color: "#7dd3fc", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "28px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0ea5e9", display: "inline-block" }} />
              Platform Features
            </div>

            <h1 className="fd fade-up" style={{ fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 700, lineHeight: 1.08, color: "#f8fafc", marginBottom: "20px", animationDelay: ".1s" }}>
              Everything you need<br />
              <span className="shimmer-text">to pass first time.</span>
            </h1>

            <p className="fade-up" style={{ fontSize: "clamp(1rem,1.4vw,1.15rem)", color: "#64748b", fontWeight: 400, lineHeight: 1.8, maxWidth: "560px", margin: "0 auto 40px", animationDelay: ".2s" }}>
              Built around one goal — helping you think like a nurse, not just memorise answers. Every feature exists for a reason.
            </p>

            <div className="fade-up" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", animationDelay: ".3s" }}>
              <Link href="/auth/signup" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#0ea5e9", color: "#fff", padding: "14px 32px", borderRadius: "12px", fontSize: "14px", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 28px rgba(14,165,233,.35)", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#38bdf8"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#0ea5e9"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Start for free →
              </Link>
              <Link href="/quiz" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.08)", color: "#e2e8f0", padding: "14px 28px", borderRadius: "12px", fontSize: "14px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,.12)", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.14)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; }}>
                Try a question
              </Link>
            </div>
          </div>
        </section>

        {/* ══ TICKER ══ */}
        <div style={{ background: "#0a1e32", borderTop: "1px solid rgba(14,165,233,.08)", borderBottom: "1px solid rgba(14,165,233,.08)", padding: "14px 0" }}>
          <div className="ticker-wrap">
            <div className="ticker-inner">
              {[...Array(2)].map((_, ri) => (
                <span key={ri} style={{ display: "inline-flex" }}>
                  {["3,100+ practice questions", "98% first-attempt pass rate", "6 certification paths", "Built by licensed RNs", "Adaptive CAT simulation", "Full NGN question support", "Free to start", "Deep clinical rationales"].map(t => (
                    <span key={t} className="ticker-item">
                      <span className="ticker-dot" />{t}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ══ ANIMATED STATS ══ */}
        <section ref={statsRef} style={{ background: "#0a1e32", padding: "72px 40px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "20px" }}>
              {[
                { val: `${students.toLocaleString()}+`, label: "Students preparing",      color: "#38bdf8" },
                { val: `${passRate}%`,                   label: "First-attempt pass rate", color: "#34d399" },
                { val: `${questions.toLocaleString()}+`, label: "Practice questions",      color: "#c084fc" },
                { val: String(courses),                  label: "Certification paths",      color: "#fbbf24" },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "18px", padding: "28px 20px", textAlign: "center", transition: "transform .25s, box-shadow .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <p className="fd" style={{ fontSize: "clamp(2.2rem,4vw,3rem)", fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.val}</p>
                  <p style={{ fontSize: "13px", color: "#64748b", fontWeight: 500, marginTop: "10px" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ INTERACTIVE DEMO ══ */}
        <section style={{ background: "#112a40", padding: "80px 40px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>Live Preview</p>
              <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2 }}>See it before you sign up.</h2>
              <p style={{ fontSize: "15px", color: "#64748b", fontWeight: 400, marginTop: "10px" }}>Click the tabs to explore each feature.</p>
            </div>

            {/* TABS */}
            <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "32px", flexWrap: "wrap" }}>
              {tabs.map(tab => (
                <button key={tab.id} className={`tab-btn${activeTab === tab.id ? " active" : ""}`}
                  onClick={() => { setActiveTab(tab.id); setSelectedOption(null); setShowAnswer(false); }}>
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* PREVIEW PANEL */}
            <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "24px", padding: "36px", maxWidth: "760px", margin: "0 auto" }}>

              {/* Quiz Tab */}
              {activeTab === "quiz" && activeTabData.preview && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                    <div>
                      <p style={{ fontSize: "11px", color: "#475569", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" }}>{activeTabData.preview.subtitle}</p>
                      <p style={{ fontSize: "16px", fontWeight: 700, color: "#f8fafc", marginTop: "4px" }}>{activeTabData.preview.title}</p>
                    </div>
                    <div style={{ background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.25)", borderRadius: "10px", padding: "8px 16px", fontSize: "14px", fontWeight: 700, color: "#f87171", fontFamily: "monospace" }}>
                      ⏱ {activeTabData.preview.timer}
                    </div>
                  </div>
                  <p style={{ fontSize: "15px", color: "#cbd5e1", lineHeight: 1.75, marginBottom: "24px", fontWeight: 400 }}>
                    {activeTabData.preview.question}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                    {activeTabData.preview.options?.map((opt) => {
                      const isSelected = selectedOption === opt.label;
                      const isCorrect = opt.correct;
                      const showResult = showAnswer;
                      let bg = "rgba(255,255,255,.04)";
                      let border = "rgba(255,255,255,.08)";
                      let color = "#94a3b8";
                      if (isSelected && !showResult) { bg = "rgba(14,165,233,.12)"; border = "rgba(14,165,233,.35)"; color = "#38bdf8"; }
                      if (showResult && isCorrect) { bg = "rgba(16,185,129,.12)"; border = "rgba(16,185,129,.35)"; color = "#34d399"; }
                      if (showResult && isSelected && !isCorrect) { bg = "rgba(239,68,68,.1)"; border = "rgba(239,68,68,.3)"; color = "#f87171"; }
                      return (
                        <button key={opt.label} onClick={() => !showAnswer && setSelectedOption(opt.label)}
                          style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 18px", borderRadius: "12px", background: bg, border: `1px solid ${border}`, color, fontSize: "14px", fontWeight: 500, cursor: showAnswer ? "default" : "pointer", transition: "all .2s", textAlign: "left", fontFamily: "inherit" }}>
                          <span style={{ width: "28px", height: "28px", borderRadius: "8px", border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, flexShrink: 0, background: "rgba(255,255,255,.04)" }}>{opt.label}</span>
                          {opt.text}
                          {showResult && isCorrect && <span style={{ marginLeft: "auto", color: "#34d399" }}>✓</span>}
                          {showResult && isSelected && !isCorrect && <span style={{ marginLeft: "auto", color: "#f87171" }}>✗</span>}
                        </button>
                      );
                    })}
                  </div>
                  {!showAnswer ? (
                    <button onClick={() => selectedOption && setShowAnswer(true)}
                      style={{ padding: "12px 28px", borderRadius: "10px", background: selectedOption ? "#0ea5e9" : "rgba(255,255,255,.06)", color: selectedOption ? "#fff" : "#475569", fontSize: "13px", fontWeight: 700, border: "none", cursor: selectedOption ? "pointer" : "not-allowed", transition: "all .2s", fontFamily: "inherit" }}>
                      {selectedOption ? "Submit Answer →" : "Select an answer first"}
                    </button>
                  ) : (
                    <button onClick={() => { setSelectedOption(null); setShowAnswer(false); }}
                      style={{ padding: "12px 28px", borderRadius: "10px", background: "rgba(52,211,153,.15)", color: "#34d399", fontSize: "13px", fontWeight: 700, border: "1px solid rgba(52,211,153,.3)", cursor: "pointer", fontFamily: "inherit" }}>
                      Try again →
                    </button>
                  )}
                </div>
              )}

              {/* Rationale Tab */}
              {activeTab === "rationale" && activeTabData.preview && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(16,185,129,.15)", border: "1px solid rgba(16,185,129,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>✓</div>
                    <div>
                      <p style={{ fontSize: "11px", color: "#475569", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" }}>{activeTabData.preview.subtitle}</p>
                      <p style={{ fontSize: "15px", fontWeight: 700, color: "#34d399" }}>{activeTabData.preview.title}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: "15px", color: "#cbd5e1", lineHeight: 1.8, marginBottom: "24px", fontWeight: 400, padding: "16px 20px", background: "rgba(52,211,153,.05)", border: "1px solid rgba(52,211,153,.15)", borderRadius: "12px" }}>
                    {activeTabData.preview.question}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {activeTabData.preview.bullets?.map((b, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "12px 16px", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "10px" }}>
                        <div style={{ width: "22px", height: "22px", borderRadius: "6px", background: "rgba(14,165,233,.15)", border: "1px solid rgba(14,165,233,.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#38bdf8", flexShrink: 0 }}>{i + 1}</div>
                        <p style={{ fontSize: "14px", color: "#94a3b8", fontWeight: 400, lineHeight: 1.6 }}>{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dashboard Tab */}
              {activeTab === "dashboard" && activeTabData.preview && (
                <div>
                  <div style={{ marginBottom: "24px" }}>
                    <p style={{ fontSize: "11px", color: "#475569", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" }}>{activeTabData.preview.subtitle}</p>
                    <p style={{ fontSize: "16px", fontWeight: 700, color: "#f8fafc", marginTop: "4px" }}>{activeTabData.preview.title}</p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                    {activeTabData.preview.stats?.map(s => (
                      <div key={s.label} style={{ padding: "20px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "14px", transition: "all .2s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.04)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                        <p style={{ fontSize: "11px", color: "#475569", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "8px" }}>{s.label}</p>
                        <p className="fd" style={{ fontSize: "1.6rem", fontWeight: 700, color: s.color }}>{s.val}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "16px 20px", background: "rgba(14,165,233,.06)", border: "1px solid rgba(14,165,233,.15)", borderRadius: "12px" }}>
                    <p style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>📈 You're improving! Your score is up <span style={{ color: "#34d399", fontWeight: 700 }}>+8%</span> from last week. Focus on Pharmacology to break 80%.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ══ FEATURE CARDS ══ */}
        <section style={{ background: "#0d2a40", padding: "80px 40px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>What's Inside</p>
              <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2 }}>Hover to explore each feature.</h2>
              <p style={{ fontSize: "15px", color: "#64748b", fontWeight: 400, marginTop: "10px" }}>Every feature was designed around how nurses actually study.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
              {features.map((f) => (
                <div key={f.title} className="feature-card">
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: f.color, borderRadius: "20px 20px 0 0", opacity: 0.5, transition: "opacity .35s" }} />
                  <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "80px", height: "80px", borderRadius: "50%", background: `radial-gradient(circle,${f.glow} 0%,transparent 70%)`, pointerEvents: "none", transition: "opacity .35s" }} />
                  <div className="card-icon" style={{ fontSize: "28px", marginBottom: "14px", display: "block" }}>{f.icon}</div>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#f8fafc", marginBottom: "6px" }}>{f.title}</h3>
                  <p style={{ fontSize: "12px", color: f.color, fontWeight: 600, letterSpacing: ".04em" }}>{f.short}</p>
                  <p className="card-desc" style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.7, fontWeight: 400 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ COMPARISON TABLE ══ */}
        <section style={{ background: "#112a40", padding: "80px 40px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>How We Compare</p>
              <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2 }}>Why students choose us.</h2>
            </div>

            <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(255,255,255,.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 160px 160px", background: "rgba(14,165,233,.08)", borderBottom: "1px solid rgba(255,255,255,.08)", padding: "16px 20px" }}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#475569", letterSpacing: ".1em", textTransform: "uppercase" }}>Feature</p>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#38bdf8", letterSpacing: ".1em", textTransform: "uppercase", textAlign: "center" }}>Pre-NCLEX</p>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#475569", letterSpacing: ".1em", textTransform: "uppercase", textAlign: "center" }}>Others</p>
              </div>

              {comparisons.map((row, i) => (
                <div key={row.feature} className="comparison-row"
                  style={{ display: "grid", gridTemplateColumns: "1fr 160px 160px", padding: "16px 20px", borderBottom: i < comparisons.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none", background: i % 2 === 0 ? "rgba(255,255,255,.02)" : "transparent" }}>
                  <p style={{ fontSize: "14px", color: "#94a3b8", fontWeight: 500 }}>{row.feature}</p>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {row.us ? (
                      <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(52,211,153,.15)", border: "1px solid rgba(52,211,153,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="13" height="13" fill="none" stroke="#34d399" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                      </div>
                    ) : (
                      <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(255,255,255,.04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="13" height="13" fill="none" stroke="#334155" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {row.them ? (
                      <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="13" height="13" fill="none" stroke="#475569" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                      </div>
                    ) : (
                      <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(239,68,68,.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="13" height="13" fill="none" stroke="#ef4444" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FINAL CTA ══ */}
        <section style={{ position: "relative", padding: "100px 40px", overflow: "hidden", background: "#0d1f35", textAlign: "center" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "500px", background: "radial-gradient(circle,rgba(14,165,233,.08) 0%,transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto" }}>
            <h2 className="fd" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.15, marginBottom: "16px" }}>
              Ready to see it<br />
              <span style={{ color: "#38bdf8", fontStyle: "italic" }}>in action?</span>
            </h2>
            <p style={{ fontSize: "16px", color: "#64748b", fontWeight: 400, lineHeight: 1.8, marginBottom: "36px" }}>
              Create a free account and take your first practice exam in under 2 minutes. No credit card needed.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/auth/signup" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#0ea5e9", color: "#fff", padding: "15px 36px", borderRadius: "12px", fontSize: "15px", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 28px rgba(14,165,233,.35)", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#38bdf8"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#0ea5e9"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Create free account →
              </Link>
              <Link href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.07)", color: "#e2e8f0", padding: "15px 28px", borderRadius: "12px", fontSize: "15px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,.12)", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.13)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; }}>
                View pricing
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}