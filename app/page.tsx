"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
  *, body { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 500; }
  .fd { font-family: 'Cormorant Garamond', Georgia, serif; }

  @keyframes ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes floatY {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-14px); }
  }
  @keyframes pulseRing {
    0%   { transform: scale(1); opacity: .5; }
    100% { transform: scale(1.55); opacity: 0; }
  }
  @keyframes waveIn {
    from { opacity:0; transform:scaleX(.97); }
    to   { opacity:1; transform:scaleX(1); }
  }

  .hero-visible { animation: fadeUp .9s ease both; }
  .float        { animation: floatY 5s ease-in-out infinite; }
  .float-slow   { animation: floatY 7s ease-in-out infinite; }

  .bento-card {
    background: rgba(255,255,255,.055);
    border: 1px solid rgba(255,255,255,.12);
    border-radius: 24px;
    transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease, background .3s ease;
    overflow: hidden;
    cursor: pointer;
  }
  .bento-card:hover {
    transform: translateY(-6px) scale(1.012);
    box-shadow: 0 24px 60px rgba(0,0,0,.3);
    border-color: rgba(14,165,233,.4);
    background: rgba(255,255,255,.09);
  }

  .stat-card {
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 18px;
    transition: transform .25s, box-shadow .25s;
  }
  .stat-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,.2); }

  .btn-primary {
    background: #0ea5e9;
    color: #fff;
    border: none;
    padding: 15px 32px;
    border-radius: 14px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: all .25s;
    box-shadow: 0 8px 28px rgba(14,165,233,.35);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    letter-spacing: .01em;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(14,165,233,.45); background: #38bdf8; }

  .btn-outline {
    background: rgba(255,255,255,.09);
    color: #f1f5f9;
    border: 1px solid rgba(255,255,255,.2);
    padding: 15px 32px;
    border-radius: 14px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all .25s;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
  }
  .btn-outline:hover { background: rgba(255,255,255,.15); transform: translateY(-2px); }

  .btn-sm {
    background: rgba(14,165,233,.18);
    color: #7dd3fc;
    border: 1px solid rgba(14,165,233,.35);
    padding: 9px 20px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all .2s;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .btn-sm:hover { background: rgba(14,165,233,.28); transform: translateY(-1px); }

  .btn-dark {
    background: rgba(255,255,255,.1);
    color: #e2e8f0;
    border: 1px solid rgba(255,255,255,.15);
    padding: 11px 22px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all .2s;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .btn-dark:hover { background: rgba(255,255,255,.16); transform: translateY(-1px); }

  .img-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .ticker-wrap { overflow: hidden; white-space: nowrap; }
  .ticker-inner { display: inline-flex; animation: ticker 28s linear infinite; }
  .ticker-item {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 0 36px;
    font-size: 13px;
    font-weight: 600;
    color: #64748b;
  }
  .ticker-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #0ea5e9;
    flex-shrink: 0;
  }

  .live-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(14,165,233,.15);
    border: 1px solid rgba(14,165,233,.35);
    color: #7dd3fc;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .12em;
    padding: 6px 16px;
    border-radius: 100px;
  }
  .live-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #0ea5e9;
    animation: pulseRing 1.8s ease-out infinite;
    position: relative;
    flex-shrink: 0;
  }
`;

function useCounter(target: number, duration = 2000, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active || !target) return;
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

const testimonials = [
  { name: "Stephanie G.", score: "Passed 85Q", exam: "NCLEX-RN", text: "The questions felt exactly like the real exam. The rationales changed how I think clinically.", initials: "SG", color: "#0ea5e9", bg: "rgba(14,165,233,.1)" },
  { name: "Marcus T.", score: "1st attempt", exam: "NCLEX-RN", text: "Three weeks of study using only this platform. I felt calm walking into the exam.", initials: "MT", color: "#34d399", bg: "rgba(52,211,153,.1)" },
  { name: "Amara N.", score: "Passed 110Q", exam: "NCLEX-RN", text: "After failing once with another platform, I switched here and passed comfortably.", initials: "AN", color: "#c084fc", bg: "rgba(192,132,252,.1)" },
];

export default function HomePage() {
  useEffect(() => {
    const supabase = createClient(); supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: listener } = createClient().auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => listener.subscription.unsubscribe();
  }, []);
  const [user, setUser] = useState<any>(null);
  const [latestScore, setLatestScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const [statsActive, setStatsActive] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const students  = useCounter(50000, 2500, statsActive);
  const passRate  = useCounter(98,    1800, statsActive);
  const questions = useCounter(3100,  2000, statsActive);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsActive(true); },
      { threshold: .3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

useEffect(() => {
    const fetchLatest = async () => {
      const supabase = createClient(); if (!supabase) return; const { data } = await supabase
        .from("exam_attempts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);
      if (data?.[0]) {
        setLatestScore(data[0].score);
        setCorrect(data[0].correct);
        setTotal(data[0].total_questions);
      }
    };
    fetchLatest();
  }, []);

  return (
    <>
      <style>{fontStyle}</style>
      <main style={{ background: "#0d2137", minHeight: "100vh", color: "#f1f5f9" }}>

        {/* ---------------------- HERO */}
        <section style={{ position: "relative", minHeight: "96vh", display: "flex", alignItems: "center", overflow: "hidden", background: "linear-gradient(160deg,#0d1f35 0%,#0f2540 55%,#0a2a45 100%)" }}>

          <div style={{ position: "absolute", inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1800&q=80')`, backgroundSize: "cover", backgroundPosition: "center right", opacity: .13 }} />
          <div className="float-slow" style={{ position: "absolute", top: "-80px", right: "10%", width: "500px", height: "500px", background: "radial-gradient(circle,rgba(14,165,233,.16) 0%,transparent 65%)", pointerEvents: "none" }} />
          <div className="float" style={{ position: "absolute", bottom: "-60px", left: "5%", width: "340px", height: "340px", background: "radial-gradient(circle,rgba(56,189,248,.1) 0%,transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(14,165,233,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,.05) 1px,transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />

          <div
            className={heroVisible ? "hero-visible" : ""}
            style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto", padding: "0 40px", width: "100%", opacity: heroVisible ? 1 : 0 }}
          >
            <div style={{ maxWidth: "680px" }}>
              <div className="live-badge" style={{ marginBottom: "28px" }}>
                <span className="live-dot" />
                NCLEX-RN . Live Now
              </div>

              <h1 className="fd" style={{ fontSize: "clamp(3rem,6vw,5.2rem)", fontWeight: 700, lineHeight: 1.08, color: "#f8fafc", marginBottom: "24px", letterSpacing: "-.01em" }}>
                Your first attempt.<br />
                <span style={{ color: "#38bdf8", fontStyle: "italic" }}>Your last exam.</span>
              </h1>

              <p style={{ fontSize: "clamp(1rem,1.4vw,1.15rem)", color: "#94a3b8", fontWeight: 400, lineHeight: 1.8, marginBottom: "40px", maxWidth: "520px" }}>
                The most advanced nursing exam platform. Adaptive questions, deep clinical rationales, and real exam simulation  built by licensed RNs for nurses who pass on the first try.
              </p>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "48px" }}>
                {!user && (<Link href="/auth/signup" className="btn-primary">Start free today<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>)}
                <Link href="/courses" className="btn-outline">Explore courses</Link>
                <Link href="/quiz/select" className="btn-dark">Try a question</Link>
              </div>

              <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
                {[
                  { text: "No credit card required" },
                  { text: "Built by licensed RNs" },
                  { text: "Live in under 60 seconds" },
                ].map(t => (
                  <div key={t.text} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#64748b", fontWeight: 500 }}>
                    <span style={{ color: "#0ea5e9", fontWeight: 800, fontSize: "15px" }}></span>
                    {t.text}
                  </div>
                ))}
              </div>
            </div>

            {/* NURSING TV PROMO CARD */}
            <div style={{ position: "absolute", right: "40px", top: "50%", transform: "translateY(-50%)", width: "440px", zIndex: 2 }}>
              <div style={{ background: "linear-gradient(160deg,#ffffff 0%,#f0f7ff 60%,#e8f4fd 100%)", borderRadius: "24px", padding: "36px", boxShadow: "0 40px 100px rgba(0,0,0,.25), 0 0 0 1px rgba(14,165,233,.15)", position: "relative", overflow: "hidden" }}>

                {/* Decorative background circle */}
                <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle,rgba(14,165,233,.12) 0%,transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "-40px", left: "-40px", width: "160px", height: "160px", borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,.08) 0%,transparent 70%)", pointerEvents: "none" }} />

                {/* Top accent line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg,#0ea5e9,#6366f1,#ef4444)", borderRadius: "24px 24px 0 0" }} />

                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "22px", position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", borderRadius: "100px", padding: "5px 14px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", display: "inline-block", boxShadow: "0 0 8px #ef4444", animation: "pulseRing 1.8s ease-out infinite" }} />
                    <span style={{ fontSize: "9px", fontWeight: 900, color: "#ef4444", letterSpacing: ".25em" }}>LIVE NOW</span>
                  </div>
                  <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 500 }}>6 channels · 100+ episodes</span>
                </div>

                {/* Heading */}
                <div style={{ position: "relative", marginBottom: "14px" }}>
                  <p style={{ fontSize: "11px", fontWeight: 800, color: "#0ea5e9", letterSpacing: ".18em", textTransform: "uppercase", marginBottom: "8px" }}>Nursing TV</p>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.1, margin: 0 }}>
                    The only Nursing TV<br />
                    <span style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>of its kind.</span>
                  </h3>
                </div>

                {/* Description */}
                <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.8, marginBottom: "24px", fontWeight: 400 }}>
                  Cinematic lessons. One dedicated channel per certification path. The learning experience your competitors simply cannot match.
                </p>

                {/* Channel pills */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "24px" }}>
                  {[["NCLEX-RN TV", "#0ea5e9", "Registered Nurse"], ["NCLEX-PN TV", "#6366f1", "Practical Nurse"], ["CCRN TV", "#ef4444", "Critical Care"], ["TEAS 7 TV", "#f59e0b", "Pre-Nursing"]].map(([name, color, tag]) => (
                    <a key={name} href="/nursing-tv" style={{ display: "flex", alignItems: "center", gap: "8px", background: color + "08", border: "1px solid " + color + "20", borderRadius: "10px", padding: "10px 12px", textDecoration: "none", transition: "all .2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = color + "15"; e.currentTarget.style.borderColor = color + "40"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = color + "08"; e.currentTarget.style.borderColor = color + "20"; e.currentTarget.style.transform = "translateY(0)"; }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: color, display: "inline-block", flexShrink: 0, boxShadow: "0 0 4px " + color }} />
                      <div>
                        <p style={{ fontSize: "11px", fontWeight: 800, color: color, margin: 0, letterSpacing: ".02em" }}>{name}</p>
                        <p style={{ fontSize: "9px", color: "#94a3b8", margin: 0, fontWeight: 500 }}>{tag}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* CTA */}
                <a href="/nursing-tv" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "14px 20px", borderRadius: "14px", fontSize: "14px", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 32px rgba(14,165,233,.35)", letterSpacing: ".01em" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    Tune in free — watch now
                  </span>
                  <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>

                {/* Footer note */}
                <p style={{ fontSize: "11px", color: "#94a3b8", textAlign: "center", margin: "14px 0 0", fontWeight: 500 }}>Free forever · No signup required to watch</p>
              </div>
            </div>

          </div>

          <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "10px", letterSpacing: ".18em", color: "#2d5a7a", textTransform: "uppercase" }}>Scroll</span>
            <div style={{ width: "1px", height: "36px", background: "linear-gradient(to bottom,#0ea5e9,transparent)" }} />
          </div>
        </section>

        {/* wave */}
        <div style={{ background: "#0a1e32", marginTop: "-2px" }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
            <path d="M0,30 C360,70 1080,-10 1440,30 L1440,0 L0,0 Z" fill="#0d1f35" />
          </svg>
        </div>

        {/* ---------------------- TICKER */}
        <div style={{ background: "#0a1e32", borderTop: "1px solid rgba(14,165,233,.1)", borderBottom: "1px solid rgba(14,165,233,.1)", padding: "16px 0" }}>
          <div className="ticker-wrap">
            <div className="ticker-inner">
              {[...Array(2)].map((_, ri) => (
                <span key={ri} style={{ display: "inline-flex" }}>
                  {["98% first-attempt pass rate","50,000+ students preparing","3,100+ practice questions","6 certification paths","Built by licensed RNs","Free to start  no credit card","Adaptive CAT exam simulation","Full NGN question support"].map(t => (
                    <span key={t} className="ticker-item">
                      <span className="ticker-dot" />
                      {t}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------------- ANIMATED STATS */}
        <section ref={statsRef} style={{ background: "#0a1e32", padding: "80px 40px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "20px" }}>
              {[
                { val: `${students.toLocaleString()}+`, label: "Students preparing",      color: "#38bdf8" },
                { val: `${passRate}%`,                   label: "First-attempt pass rate", color: "#34d399" },
                { val: `${questions.toLocaleString()}+`, label: "Practice questions",      color: "#c084fc" },
                { val: "6",                              label: "Certification paths",      color: "#fbbf24" },
              ].map(s => (
                <div key={s.label} className="stat-card" style={{ padding: "32px 24px", textAlign: "center" }}>
                  <p className="fd" style={{ fontSize: "clamp(2.4rem,4vw,3.2rem)", fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.val}</p>
                  <p style={{ fontSize: "14px", color: "#94a3b8", fontWeight: 500, marginTop: "10px" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* wave */}
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px", background: "#112a40" }}>
          <path d="M0,0 C480,60 960,0 1440,40 L1440,60 L0,60 Z" fill="#0a1e32" />
        </svg>

        {/* ---------------------- BENTO GRID */}
        <section style={{ background: "#112a40", padding: "20px 40px 80px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px" }}>Certification Paths</p>
              <h2 className="fd" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.15 }}>Every exam. One platform.</h2>
              <p style={{ fontSize: "16px", color: "#94a3b8", fontWeight: 400, marginTop: "12px", maxWidth: "480px", margin: "12px auto 0" }}>
                From nursing school entrance exams to advanced practice certifications.
              </p>
            </div>

            <div className="courses-grid-container" style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "16px" }}>

              {/* NCLEX-RN hero card */}
              <div className="bento-card" onClick={() => window.location.href = "/courses/nclex-rn"}
                style={{ gridColumn: "1/8", gridRow: "1/2", display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "320px", cursor: "pointer" }}>
                <div style={{ padding: "36px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ marginBottom: "20px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, background: "rgba(14,165,233,.18)", color: "#7dd3fc", border: "1px solid rgba(14,165,233,.35)", padding: "5px 14px", borderRadius: "100px", letterSpacing: ".08em", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ width: "6px", height: "6px", background: "#0ea5e9", borderRadius: "50%", display: "inline-block" }} />
                        LIVE NOW
                      </span>
                    </div>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: "#38bdf8", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "8px" }}>NCLEX-RN(R)</p>
                    <h3 className="fd" style={{ fontSize: "clamp(1.6rem,2.5vw,2.2rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2, marginBottom: "14px" }}>NCLEX-RN<br />Success Tools</h3>
                    <p style={{ fontSize: "14px", color: "#94a3b8", fontWeight: 400, lineHeight: 1.75, marginBottom: "24px" }}>
                      Adaptive questions across all 8 client needs categories. Full NGN support with Bowtie, Matrix, and SATA formats.
                    </p>
                  </div>
                  <div>
                    <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
                      <div style={{ background: "rgba(14,165,233,.12)", border: "1px solid rgba(14,165,233,.25)", borderRadius: "12px", padding: "12px 18px" }}>
                        <p className="fd" style={{ fontSize: "1.5rem", fontWeight: 700, color: "#38bdf8" }}>3,100+</p>
                        <p style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>Questions</p>
                      </div>
                      <div style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "12px", padding: "12px 18px" }}>
                        <p className="fd" style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f8fafc" }}>98%</p>
                        <p style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>Pass rate</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Link href="/courses/nclex-rn" className="btn-primary" style={{ fontSize: "13px", padding: "11px 22px" }}>
                        Start practising
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </Link>
                      {!user && <Link href="/auth/signup" className="btn-dark" style={{ fontSize: "13px", padding: "11px 20px" }}>Free trial</Link>}
                    </div>
                  </div>
                </div>
                <div style={{ position: "relative", overflow: "hidden", borderRadius: "0 22px 22px 0" }}>
                  <img src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80" alt="NCLEX-RN nurse" className="img-cover" style={{ filter: "brightness(.78)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(13,31,53,.85) 0%,transparent 55%)" }} />
                </div>
              </div>

              {/* CCRN */}
              <div className="bento-card" onClick={() => window.location.href = "/courses/ccrn"}
                style={{ gridColumn: "8/13", position: "relative", overflow: "hidden", minHeight: "320px", cursor: "pointer" }}>
                <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80" alt="CCRN critical care" className="img-cover" style={{ position: "absolute", inset: 0, filter: "brightness(.5)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(248,113,113,.18) 0%,rgba(13,31,53,.92) 65%)" }} />
                <div style={{ position: "relative", zIndex: 1, padding: "30px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "#f87171", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "8px" }}>CCRN(R)</p>
                    <h3 className="fd" style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2, marginBottom: "10px" }}>Critical Care<br />Certification</h3>
                    <p style={{ fontSize: "14px", color: "#94a3b8", fontWeight: 400, lineHeight: 1.65 }}>ICU-level questions covering cardiovascular, pulmonary, and multisystem critical care.</p>
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", fontWeight: 700, background: "rgba(248,113,113,.14)", color: "#fca5a5", border: "1px solid rgba(248,113,113,.3)", padding: "5px 14px", borderRadius: "100px", display: "inline-block", marginBottom: "14px" }}>Coming Soon</span>
                    <div>
                      <Link href="/courses/ccrn" className="btn-sm" style={{ background: "rgba(248,113,113,.14)", color: "#fca5a5", border: "1px solid rgba(248,113,113,.3)" }}>
                        Learn more
                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* NP */}
              <div className="bento-card" onClick={() => window.location.href = "/courses/nurse-practitioner"}
                style={{ gridColumn: "1/5", position: "relative", overflow: "hidden", minHeight: "240px", cursor: "pointer" }}>
                <img src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80" alt="Nurse Practitioner" className="img-cover" style={{ position: "absolute", inset: 0, filter: "brightness(.48)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(192,132,252,.15) 0%,rgba(13,31,53,.9) 65%)" }} />
                <div style={{ position: "relative", zIndex: 1, padding: "28px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "#c084fc", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "6px" }}>Nurse Practitioner</p>
                    <h3 className="fd" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2, marginBottom: "8px" }}>FNP & AGPCNP<br />Certification Prep</h3>
                    <p style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 400, lineHeight: 1.65 }}>Advanced practice questions for NP certification exams.</p>
                  </div>
                  <Link href="/courses/nurse-practitioner" className="btn-sm" style={{ background: "rgba(192,132,252,.14)", color: "#e9d5ff", border: "1px solid rgba(192,132,252,.3)", alignSelf: "flex-start", marginTop: "14px" }}>
                    Learn more
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>

              {/* NCLEX-PN */}
              <div className="bento-card" onClick={() => window.location.href = "/courses/nclex-pn"}
                style={{ gridColumn: "5/9", position: "relative", overflow: "hidden", minHeight: "240px", cursor: "pointer" }}>
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80" alt="NCLEX-PN" className="img-cover" style={{ position: "absolute", inset: 0, filter: "brightness(.48)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(129,140,248,.15) 0%,rgba(13,31,53,.9) 65%)" }} />
                <div style={{ position: "relative", zIndex: 1, padding: "28px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "#818cf8", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "6px" }}>NCLEX-PN(R)</p>
                    <h3 className="fd" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2, marginBottom: "8px" }}>PN Licensure<br />Preparation</h3>
                    <p style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 400, lineHeight: 1.65 }}>Full coverage of all PN client needs with NGN-ready questions.</p>
                  </div>
                  <Link href="/courses/nclex-pn" className="btn-sm" style={{ background: "rgba(129,140,248,.14)", color: "#c7d2fe", border: "1px solid rgba(129,140,248,.3)", alignSelf: "flex-start", marginTop: "14px" }}>
                    Learn more
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>

              {/* Nursing School + Pre-Nursing stacked */}
              <div style={{ gridColumn: "9/13", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className="bento-card" onClick={() => window.location.href = "/courses/nursing-school"}
                  style={{ flex: 1, padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "rgba(52,211,153,.07)", borderColor: "rgba(52,211,153,.18)", minHeight: "108px", cursor: "pointer" }}>
                  <div>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "#34d399", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "5px" }}>Nursing School</p>
                    <h3 className="fd" style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2 }}>School Companion</h3>
                    <p style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 400, marginTop: "5px" }}>6 core subjects . 100% NCLEX aligned</p>
                  </div>
                  <Link href="/courses/nursing-school" className="btn-sm" style={{ background: "rgba(52,211,153,.12)", color: "#6ee7b7", border: "1px solid rgba(52,211,153,.25)", alignSelf: "flex-start", marginTop: "12px" }}>
                    Learn more <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>

                <div className="bento-card" onClick={() => window.location.href = "/courses/pre-nursing"}
                  style={{ flex: 1, padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "rgba(251,191,36,.06)", borderColor: "rgba(251,191,36,.18)", minHeight: "108px", cursor: "pointer" }}>
                  <div>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "#fbbf24", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "5px" }}>Pre-Nursing</p>
                    <h3 className="fd" style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2 }}>TEAS 7 & HESI A2</h3>
                    <p style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 400, marginTop: "5px" }}>Both entrance exams covered</p>
                  </div>
                  <Link href="/courses/pre-nursing" className="btn-sm" style={{ background: "rgba(251,191,36,.12)", color: "#fde68a", border: "1px solid rgba(251,191,36,.25)", alignSelf: "flex-start", marginTop: "12px" }}>
                    Learn more <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* wave */}
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px", background: "#0d2a40" }}>
          <path d="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" fill="#112a40" />
        </svg>

        {/* ---------------------- WHY US */}
        <section style={{ background: "#0d2a40", padding: "80px 40px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>

            <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", height: "520px" }}>
              <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1000&q=80" alt="Nurse studying" className="img-cover" style={{ filter: "brightness(.82)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,transparent 40%,rgba(10,20,35,.88) 100%)" }} />
              <div style={{ position: "absolute", bottom: "28px", left: "28px", right: "28px", background: "rgba(10,24,40,.92)", backdropFilter: "blur(12px)", border: "1px solid rgba(14,165,233,.22)", borderRadius: "16px", padding: "18px 22px", display: "flex", justifyContent: "space-around" }}>
                {[
                  { val: "98%",    label: "Pass rate",  color: "#34d399" },
                  { val: "50K+",   label: "Students",   color: "#38bdf8" },
                  { val: "3,100+", label: "Questions",  color: "#c084fc" },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <p className="fd" style={{ fontSize: "1.6rem", fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.val}</p>
                    <p style={{ fontSize: "12px", color: "#64748b", marginTop: "5px", fontWeight: 500 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "16px" }}>Why Pre-NCLEX Nursing</p>
              <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2, marginBottom: "20px" }}>
                Built by nurses.<br />
                <span style={{ color: "#38bdf8", fontStyle: "italic" }}>Trusted by students.</span>
              </h2>
              <p style={{ fontSize: "15px", color: "#94a3b8", fontWeight: 400, lineHeight: 1.8, marginBottom: "32px" }}>
                Every question, rationale, and study path was designed by licensed RNs who remember what it felt like to sit that exam. We built the tool we wished existed.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "36px" }}>
                {[
                  "Questions mapped to the official NCLEX test plan",
                  "Instant rationales explaining every answer choice",
                  "Adaptive difficulty mirroring the real CAT exam",
                  "Track weak areas and close knowledge gaps fast",
                  "Three practice modes  Timed, Tutor, and Quick",
                ].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(14,165,233,.15)", border: "1px solid rgba(14,165,233,.32)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#0ea5e9" }} />
                    </div>
                    <p style={{ fontSize: "15px", color: "#94a3b8", fontWeight: 400, lineHeight: 1.6 }}>{item}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link href="/features" className="btn-primary">
                  See all features
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
                <Link href="/courses/nclex-rn" className="btn-outline">Start NCLEX-RN free</Link>
              </div>
            </div>
          </div>
        </section>
{user && (<>

        {/* wave */}
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px", background: "#112a40" }}>
          <path d="M0,0 C480,60 960,0 1440,40 L1440,60 L0,60 Z" fill="#0d2a40" />
        </svg>

        {/* ---------------------- DASHBOARD */}
        <section style={{ background: "#112a40", padding: "80px 40px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>Your Practice Dashboard</p>
              <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2 }}>Track every attempt.</h2>
              <p style={{ fontSize: "15px", color: "#94a3b8", fontWeight: 400, marginTop: "10px" }}>Your latest exam performance at a glance.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.3fr .7fr", gap: "20px", marginBottom: "20px" }}>

              {/* left panel */}
              <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "24px", padding: "36px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "12px" }}>NCLEX Practice Platform</p>
                <h3 className="fd" style={{ fontSize: "1.9rem", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2, marginBottom: "12px" }}>Train smarter with a real exam dashboard</h3>
                <p style={{ fontSize: "15px", color: "#94a3b8", fontWeight: 400, lineHeight: 1.75, marginBottom: "24px", maxWidth: "500px" }}>
                  Launch a timed exam, track your score, review rationales, and move through a cleaner testing workflow designed for focused practice.
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "28px" }}>
                  <Link href="/quiz/select"    className="btn-primary" style={{ fontSize: "13px", padding: "11px 22px" }}>Start Exam</Link>
                  <Link href="/review"  className="btn-outline" style={{ fontSize: "13px", padding: "11px 20px" }}>Open Review</Link>
                  <Link href="/results" className="btn-dark"    style={{ fontSize: "13px", padding: "11px 20px" }}>View Results</Link>
                </div>

                <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "16px", padding: "16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    {[
                      { label: "Nursing School", sub: "Private tutoring", color: "#38bdf8", href: "/courses/nursing-school" },
                      { label: "NCLEX",          sub: "Exam prep",        color: "#34d399", href: "/courses/nclex-rn" },
                      { label: "FNP",            sub: "Certification",    color: "#c084fc", href: "/courses/nurse-practitioner" },
                      { label: "CCRN",           sub: "Critical care",    color: "#f87171", href: "/courses/ccrn" },
                    ].map(q => (
                      <Link key={q.label} href={q.href} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "12px", textDecoration: "none", transition: "all .2s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.04)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: q.color, flexShrink: 0 }} />
                        <div>
                          <p style={{ fontSize: "13px", fontWeight: 600, color: "#e2e8f0", margin: 0 }}>{q.label}</p>
                          <p style={{ fontSize: "11px", color: "#64748b", margin: 0, fontWeight: 400 }}>{q.sub}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px", marginTop: "20px" }}>
                  {[
                    { label: "Latest Score", val: `${latestScore}%` },
                    { label: "Correct",      val: String(correct) },
                    { label: "Incorrect",    val: String(total - correct) },
                    { label: "Questions",    val: String(total) },
                  ].map(m => (
                    <div key={m.label} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "14px", padding: "16px" }}>
                      <p style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 600 }}>{m.label}</p>
                      <p className="fd" style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f8fafc", marginTop: "6px" }}>{m.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* right panel */}
              <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "24px", padding: "32px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "12px" }}>Latest Status</p>
                <h3 className="fd" style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f8fafc", lineHeight: 1.25, marginBottom: "10px" }}>Time to rebuild weak areas</h3>
                <p style={{ fontSize: "14px", color: "#94a3b8", fontWeight: 400, lineHeight: 1.7, marginBottom: "16px" }}>
                  Focus on rationales, practice by topic, and improve one concept cluster at a time.
                </p>
                <div style={{ display: "inline-block", background: "rgba(239,68,68,.1)", color: "#fca5a5", border: "1px solid rgba(239,68,68,.25)", fontSize: "12px", fontWeight: 600, padding: "5px 16px", borderRadius: "100px", marginBottom: "20px" }}>
                  Needs improvement
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#64748b", marginBottom: "6px", fontWeight: 500 }}>
                    <span>Progress</span><span>0%</span>
                  </div>
                  <div style={{ height: "4px", background: "rgba(255,255,255,.08)", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: "0%", background: "#0ea5e9", borderRadius: "4px" }} />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                  {[
                    { label: "Strongest Topic", val: "No data yet" },
                    { label: "Weakest Topic",   val: "No data yet" },
                    { label: "Reviewed",        val: "0" },
                    { label: "Remaining",       val: "30" },
                  ].map(s => (
                    <div key={s.label} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "12px", padding: "14px" }}>
                      <p style={{ fontSize: "11px", color: "#64748b", fontWeight: 400 }}>{s.label}</p>
                      <p style={{ fontSize: "15px", fontWeight: 600, color: "#94a3b8", marginTop: "3px" }}>{s.val}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <Link href="/quiz/select"   className="btn-primary" style={{ justifyContent: "center", fontSize: "13px" }}>Continue to Exam</Link>
                  <Link href="/review" className="btn-outline" style={{ justifyContent: "center", fontSize: "13px" }}>Open Review</Link>
                  <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="btn-dark" style={{ justifyContent: "center", fontSize: "13px", border: "none" }}>
                    Reset Saved Progress
                  </button>
                </div>
              </div>
            </div>

            {/* feature cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", marginBottom: "20px" }}>
              {[
                { title: "Timed Exam",      text: "Practice inside a focused session with a timer, navigation, answer checking, and submission flow.", href: "/quiz/select" },
                { title: "Detailed Review", text: "A full breakdown of selected answers, correct answers, and rationales for every saved question.",   href: "/review" },
                { title: "Results Summary", text: "See your percentage, raw score, and overall performance insight from your latest saved attempt.",    href: "/results" },
              ].map(f => (
                <div key={f.title} className="bento-card" style={{ padding: "28px" }}>
                  <h3 className="fd" style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f8fafc", marginBottom: "10px" }}>{f.title}</h3>
                  <p style={{ fontSize: "14px", color: "#94a3b8", fontWeight: 400, lineHeight: 1.75, marginBottom: "20px" }}>{f.text}</p>
                  <Link href={f.href} className="btn-sm">
                    Open
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              ))}
            </div>

            {/* study flow + quick actions */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "16px" }}>
              <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "20px", padding: "28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px" }}>
                  <div>
                    <p style={{ fontSize: "11px", color: "#64748b", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase" }}>Study Flow</p>
                    <h3 className="fd" style={{ fontSize: "1.4rem", fontWeight: 700, color: "#f8fafc", marginTop: "6px" }}>How to use the platform</h3>
                  </div>
                  <Link href="/quiz/select" style={{ fontSize: "13px", color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>Jump to exam mode</Link>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "14px" }}>
                  {[
                    { step: "01", title: "Take the exam",     text: "Start the quiz and move through timed questions one at a time." },
                    { step: "02", title: "Submit and score",  text: "Finish to save your score and store your answer history." },
                    { step: "03", title: "Review weak areas", text: "Study incorrect items and learn from each detailed rationale." },
                  ].map(s => (
                    <div key={s.step} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "14px", padding: "18px" }}>
                      <p style={{ fontSize: "10px", fontWeight: 700, color: "#0ea5e9", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "8px" }}>Step {s.step}</p>
                      <h4 className="fd" style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f8fafc", marginBottom: "6px" }}>{s.title}</h4>
                      <p style={{ fontSize: "13px", color: "#64748b", fontWeight: 400, lineHeight: 1.6 }}>{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "20px", padding: "28px" }}>
                <p style={{ fontSize: "11px", color: "#64748b", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase" }}>Quick Actions</p>
                <h3 className="fd" style={{ fontSize: "1.4rem", fontWeight: 700, color: "#f8fafc", margin: "8px 0 10px" }}>Reset or continue</h3>
                <p style={{ fontSize: "14px", color: "#94a3b8", fontWeight: 400, lineHeight: 1.7, marginBottom: "20px" }}>
                  Clear saved data to begin fresh, or continue into your current exam workflow.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <Link href="/quiz/select"   className="btn-primary" style={{ justifyContent: "center", fontSize: "13px" }}>Continue to Exam</Link>
                  <Link href="/review" className="btn-outline" style={{ justifyContent: "center", fontSize: "13px" }}>Open Review</Link>
                  <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="btn-dark" style={{ justifyContent: "center", fontSize: "13px" }}>
                    Reset Saved Progress
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* wave */}
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px", background: "#0d2a40" }}>
          <path d="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" fill="#112a40" />
        </svg>
</>)}

        {/* ---------------------- TESTIMONIALS */}
        <section style={{ background: "#0d2a40", padding: "80px 40px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>Student Stories</p>
              <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: "#f8fafc" }}>Real nurses. Real results.</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
              {testimonials.map(t => (
                <div key={t.name} className="bento-card" style={{ padding: "28px", display: "flex", flexDirection: "column" }}>
                  <div style={{ width: "100%", height: "3px", background: t.color, borderRadius: "2px", marginBottom: "20px" }} />
                  <div style={{ display: "flex", gap: "2px", marginBottom: "16px" }}>
                    {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#fbbf24", fontSize: "15px" }}>*</span>)}
                  </div>
                  <p style={{ fontSize: "15px", color: "#94a3b8", fontWeight: 400, lineHeight: 1.75, fontStyle: "italic", flex: 1, marginBottom: "20px" }}>"{t.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,.07)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: t.bg, border: `1px solid ${t.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: t.color }}>{t.initials}</div>
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 700, color: "#e2e8f0" }}>{t.name}</p>
                        <p style={{ fontSize: "12px", color: "#64748b", fontWeight: 400 }}>{t.exam}</p>
                      </div>
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: 700, background: t.bg, color: t.color, border: `1px solid ${t.color}40`, padding: "4px 12px", borderRadius: "100px" }}>{t.score}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <Link href="/testimonials" className="btn-outline" style={{ fontSize: "14px" }}>Read more stories</Link>
            </div>
          </div>
        </section>

        {/* wave */}
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px", background: "#112a40" }}>
          <path d="M0,0 C480,60 960,0 1440,40 L1440,60 L0,60 Z" fill="#0d2a40" />
        </svg>

        {/* ---------------------- FINAL CTA */}
        <section style={{ position: "relative", padding: "120px 40px", overflow: "hidden", background: "#112a40" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1800&q=80')`, backgroundSize: "cover", backgroundPosition: "center", opacity: .14 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#112a40 0%,rgba(17,42,64,.93) 100%)" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", background: "radial-gradient(circle,rgba(14,165,233,.1) 0%,transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
            <h2 className="fd" style={{ fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.1, marginBottom: "20px" }}>
              Ready to pass on<br />
              <span style={{ color: "#38bdf8", fontStyle: "italic" }}>your first attempt?</span>
            </h2>
            <p style={{ fontSize: "17px", color: "#94a3b8", fontWeight: 400, lineHeight: 1.8, marginBottom: "40px" }}>
              Join thousands of nursing students who chose a smarter way to prepare. No credit card. No commitment. Just results.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
              {!user && (<Link href="/auth/signup" className="btn-primary" style={{ fontSize: "16px", padding: "17px 38px" }}>Start free today<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>)}
              <Link href="/pricing" className="btn-outline" style={{ fontSize: "16px", padding: "17px 34px" }}>
                View pricing
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}



























