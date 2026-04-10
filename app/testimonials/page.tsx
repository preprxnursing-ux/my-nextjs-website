"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
  *, body { font-family: 'Plus Jakarta Sans', sans-serif; }
  .fd { font-family: 'Cormorant Garamond', Georgia, serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes floatY {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-18px); }
  }
  @keyframes floatY2 {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-12px); }
  }
  @keyframes pulseRing {
    0%   { transform: scale(1); opacity: .6; }
    100% { transform: scale(1.7); opacity: 0; }
  }
  @keyframes ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes starPop {
    0%   { transform: scale(1); }
    50%  { transform: scale(1.4); }
    100% { transform: scale(1); }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .fade-up  { animation: fadeUp .8s ease both; }
  .fade-in  { animation: fadeIn .6s ease both; }
  .float    { animation: floatY 6s ease-in-out infinite; }
  .float2   { animation: floatY2 8s ease-in-out infinite; }

  .shimmer-text {
    background: linear-gradient(90deg, #38bdf8 0%, #e0f2fe 40%, #38bdf8 80%, #e0f2fe 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3s linear infinite;
  }

  .ticker-wrap { overflow: hidden; white-space: nowrap; }
  .ticker-inner { display: inline-flex; animation: ticker 35s linear infinite; }
  .ticker-item {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 0 36px; font-size: 13px; font-weight: 600; color: #94a3b8;
    letter-spacing: .02em;
  }
  .ticker-dot { width: 5px; height: 5px; border-radius: 50%; background: #0ea5e9; flex-shrink: 0; }

  .filter-btn {
    padding: 9px 22px;
    border-radius: 100px;
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;
    transition: all .25s cubic-bezier(.34,1.56,.64,1);
    border: 1px solid rgba(255,255,255,.1);
    background: rgba(255,255,255,.05);
    color: #94a3b8;
    font-family: inherit;
    white-space: nowrap;
    letter-spacing: .02em;
  }
  .filter-btn.active {
    background: linear-gradient(135deg,rgba(14,165,233,.25),rgba(56,189,248,.15));
    border-color: rgba(14,165,233,.5);
    color: #e0f2fe;
    box-shadow: 0 0 20px rgba(14,165,233,.2);
    transform: scale(1.05);
  }
  .filter-btn:hover:not(.active) {
    background: rgba(255,255,255,.1);
    color: #cbd5e1;
    transform: translateY(-2px);
  }

  .t-card {
    border-radius: 22px;
    padding: 28px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    cursor: default;
    transition: all .4s cubic-bezier(.34,1.56,.64,1);
  }

  .t-card:hover {
    transform: translateY(-10px) scale(1.025);
  }

  .mouse-glow {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    pointer-events: none;
    opacity: 0;
    transition: opacity .3s ease;
    transform: translate(-50%, -50%);
  }
  .t-card:hover .mouse-glow { opacity: 1; }

  .quote-mark {
    font-family: Georgia, serif;
    font-size: 80px;
    line-height: .7;
    font-weight: 900;
    position: absolute;
    top: 16px;
    left: 20px;
    opacity: .12;
    transition: opacity .4s ease;
    pointer-events: none;
  }
  .t-card:hover .quote-mark { opacity: .25; }

  .star-animated {
    display: inline-block;
    color: #fbbf24;
    font-size: 15px;
    transition: transform .2s ease;
  }
  .t-card:hover .star-animated {
    animation: starPop .4s ease both;
  }

  .card-expand {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: max-height .4s ease, opacity .4s ease, margin .4s ease;
    margin-top: 0;
  }
  .t-card:hover .card-expand {
    max-height: 80px;
    opacity: 1;
    margin-top: 12px;
  }

  .avatar-ring {
    transition: all .4s cubic-bezier(.34,1.56,.64,1);
  }
  .t-card:hover .avatar-ring {
    transform: scale(1.15);
    box-shadow: 0 0 20px var(--avatar-color, #0ea5e9);
  }

  .score-badge {
    transition: all .3s ease;
  }
  .t-card:hover .score-badge {
    transform: scale(1.08);
  }

  .image-card {
    border-radius: 22px;
    overflow: hidden;
    position: relative;
    transition: all .4s cubic-bezier(.34,1.56,.64,1);
    cursor: pointer;
  }
  .image-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 28px 60px rgba(0,0,0,.5);
  }
  .image-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .6s ease;
    filter: brightness(.65);
  }
  .image-card:hover img {
    transform: scale(1.08);
    filter: brightness(.8);
  }
  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(13,31,53,.95) 0%, rgba(13,31,53,.4) 60%, transparent 100%);
    transition: background .4s ease;
  }
  .image-card:hover .image-overlay {
    background: linear-gradient(to top, rgba(13,31,53,.98) 0%, rgba(13,31,53,.5) 60%, transparent 100%);
  }

  .wall-card {
    border-radius: 18px;
    padding: 22px;
    position: relative;
    overflow: hidden;
    transition: all .35s cubic-bezier(.34,1.56,.64,1);
    cursor: default;
  }
  .wall-card:hover {
    transform: translateY(-6px) scale(1.02);
  }
`;

function useCounter(target: number, duration = 2200, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return val;
}

const testimonials = [
  { name: "Stephanie G.", initials: "SG", exam: "NCLEX-RN", score: "Passed 85Q", attempt: "1st attempt", stars: 5, color: "#38bdf8", glow: "rgba(56,189,248,.2)", quote: "The questions felt exactly like the real exam. I passed at 85 questions on my very first attempt. The rationales after each question changed how I think clinically. This platform is unreal.", tag: "Clinical Reasoning" },
  { name: "Marcus T.", initials: "MT", exam: "NCLEX-RN", score: "Passed 1st try", attempt: "1st attempt", stars: 5, color: "#34d399", glow: "rgba(52,211,153,.2)", quote: "I studied for 3 weeks using only this platform. The rationales taught me to think like a nurse, not just memorise answers. I felt completely calm walking into the exam.", tag: "Confidence Builder" },
  { name: "Amara N.", initials: "AN", exam: "NCLEX-RN", score: "Passed 110Q", attempt: "2nd attempt", stars: 5, color: "#c084fc", glow: "rgba(192,132,252,.2)", quote: "After failing once with another platform I switched here and passed comfortably. The adaptive questions made all the difference. I finally understood why wrong answers were wrong — not just why the right answer was right.", tag: "Second Chance" },
  { name: "Priya M.", initials: "PM", exam: "NCLEX-RN", score: "Passed 85Q", attempt: "1st attempt", stars: 5, color: "#fbbf24", glow: "rgba(251,191,36,.2)", quote: "I used this platform every single day for 6 weeks. The timed mode built my stamina and the tutor mode built my knowledge. By exam day it felt like just another practice session.", tag: "Daily Practice" },
  { name: "Jordan K.", initials: "JK", exam: "NCLEX-RN", score: "Passed 130Q", attempt: "1st attempt", stars: 5, color: "#38bdf8", glow: "rgba(56,189,248,.2)", quote: "The client needs breakdown is genius. I knew exactly which areas I was weak in and could laser-focus my study. Pharmacology was my weakest point and the rationales here fixed that completely.", tag: "Targeted Study" },
  { name: "Fatima A.", initials: "FA", exam: "NCLEX-RN", score: "Passed 85Q", attempt: "1st attempt", stars: 5, color: "#f87171", glow: "rgba(248,113,113,.2)", quote: "As an international nurse sitting NCLEX for the first time I was terrified. This platform gave me the confidence I needed. The explanations are clear and the exam simulation is spot on.", tag: "International Student" },
  { name: "Denise W.", initials: "DW", exam: "NCLEX-PN", score: "Passed 85Q", attempt: "1st attempt", stars: 5, color: "#818cf8", glow: "rgba(129,140,248,.2)", quote: "I was juggling work and studying and needed something efficient. The quick mode 10-question sprints were perfect for me. I passed my PN on the first attempt and I credit this platform completely.", tag: "Working Student" },
  { name: "Rashida P.", initials: "RP", exam: "NCLEX-PN", score: "Passed 1st try", attempt: "1st attempt", stars: 5, color: "#6366f1", glow: "rgba(99,102,241,.2)", quote: "The PN content is thorough and the interface is clean. No clutter, no distraction — just focused practice. Every wrong answer came with a proper explanation not just a label.", tag: "Clean Interface" },
  { name: "Carlos M.", initials: "CM", exam: "Nursing School", score: "Top of class", attempt: "Nursing school", stars: 5, color: "#10b981", glow: "rgba(16,185,129,.2)", quote: "Using this during nursing school gave me a massive edge. My professors noticed the difference in how I reasoned through clinical scenarios. My grades went from Bs to straight As.", tag: "Academic Excellence" },
  { name: "Yemi O.", initials: "YO", exam: "Nursing School", score: "Exam ready", attempt: "Nursing school", stars: 5, color: "#34d399", glow: "rgba(52,211,153,.2)", quote: "I started using this in my first year of nursing school and it completely changed how I study. NCLEX-aligned questions mean I'm preparing for both school exams and boards simultaneously.", tag: "Dual Prep" },
  { name: "Tiana B.", initials: "TB", exam: "NCLEX-RN", score: "Passed 85Q", attempt: "1st attempt", stars: 5, color: "#f472b6", glow: "rgba(244,114,182,.2)", quote: "I came from a different country and English is my second language. This platform explained everything so clearly. I passed NCLEX-RN on my very first attempt and cried tears of joy.", tag: "ESL Nurse" },
  { name: "David L.", initials: "DL", exam: "NCLEX-RN", score: "Passed 145Q", attempt: "1st attempt", stars: 5, color: "#fb923c", glow: "rgba(251,146,60,.2)", quote: "I took the max questions and still passed. The platform prepared me so well that even at question 145 I was still thinking clearly. The mental stamina training here is unlike anything else.", tag: "Mental Stamina" },
  { name: "Kezia N.", initials: "KN", exam: "NCLEX-PN", score: "Passed 85Q", attempt: "2nd attempt", stars: 5, color: "#a78bfa", glow: "rgba(167,139,250,.2)", quote: "My second attempt was completely different because I used this platform. The adaptive difficulty showed me exactly where I was still weak. I went in confident and came out a licensed nurse.", tag: "Comeback Story" },
  { name: "Sandra O.", initials: "SO", exam: "NCLEX-RN", score: "Passed 85Q", attempt: "1st attempt", stars: 5, color: "#2dd4bf", glow: "rgba(45,212,191,.2)", quote: "The dashboard showing my weak areas was a game changer. I focused on Physiological Integrity for 2 weeks and went from 60% to 85% in that category. Strategic studying works.", tag: "Data-Driven" },
  { name: "Michael A.", initials: "MA", exam: "Nursing School", score: "Dean's List", attempt: "Nursing school", stars: 5, color: "#facc15", glow: "rgba(250,204,21,.2)", quote: "Being on the Dean's List was never something I thought was possible. This platform changed how I approach every clinical question. I can't imagine studying any other way.", tag: "Dean's List" },
  { name: "Blessing C.", initials: "BC", exam: "NCLEX-RN", score: "Passed 85Q", attempt: "1st attempt", stars: 5, color: "#60a5fa", glow: "rgba(96,165,250,.2)", quote: "Three failed ATI exams in nursing school made me doubt myself. This platform rebuilt my clinical thinking from scratch. I passed NCLEX on my first try and proved everyone wrong.", tag: "Resilience" },
  { name: "Hannah M.", initials: "HM", exam: "NCLEX-RN", score: "Passed 100Q", attempt: "1st attempt", stars: 5, color: "#f9a8d4", glow: "rgba(249,168,212,.2)", quote: "I only had 4 weeks to prepare while working full time. The adaptive algorithm knew exactly what I needed to focus on. Four weeks later I was a licensed RN.", tag: "Time Efficient" },
  { name: "Emeka J.", initials: "EJ", exam: "NCLEX-PN", score: "Passed 1st try", attempt: "1st attempt", stars: 5, color: "#86efac", glow: "rgba(134,239,172,.2)", quote: "The quality of questions is unmatched. They're not just hard — they're clinically accurate. Every rationale teaches you something real about nursing care.", tag: "Question Quality" },
  { name: "Chidi F.", initials: "CF", exam: "NCLEX-RN", score: "Passed 85Q", attempt: "1st attempt", stars: 5, color: "#67e8f9", glow: "rgba(103,232,249,.2)", quote: "The NGN question formats here were the best preparation I found anywhere. Bowtie, matrix, and extended drag-and-drop — I had seen them all before the real exam.", tag: "NGN Ready" },
  { name: "Adaeze K.", initials: "AK", exam: "Nursing School", score: "Top student", attempt: "Nursing school", stars: 5, color: "#fda4af", glow: "rgba(253,164,175,.2)", quote: "My clinical instructor said I think differently from my peers. I know why — I spent months on this platform learning to reason through problems, not just memorise content.", tag: "Critical Thinking" },
  { name: "Portia S.", initials: "PS", exam: "NCLEX-RN", score: "Passed 85Q", attempt: "1st attempt", stars: 5, color: "#a5b4fc", glow: "rgba(165,180,252,.2)", quote: "I was a single mother with no time to waste. This platform was efficient, focused, and it worked. I'm now an RN and I can provide for my children. Life-changing doesn't cover it.", tag: "Single Parent" },
  { name: "Jerome T.", initials: "JT", exam: "NCLEX-RN", score: "Passed 110Q", attempt: "2nd attempt", stars: 5, color: "#4ade80", glow: "rgba(74,222,128,.2)", quote: "My first NCLEX attempt I left feeling crushed. My second attempt using this platform I left feeling like I aced it. The difference was understanding clinical priority — this platform teaches that.", tag: "Priority Mastery" },
];

const filters = ["All", "NCLEX-RN", "NCLEX-PN", "Nursing School"];

const examImages = [
  { url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80", caption: "Focused. Prepared. Ready.", sub: "NCLEX-RN candidates walk in confident" },
  { url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80", caption: "Every question answered with clarity.", sub: "Deep clinical reasoning built daily" },
  { url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80", caption: "The moment it all pays off.", sub: "Thousands pass on their first attempt" },
  { url: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80", caption: "Built by nurses. Trusted by students.", sub: "Real clinical knowledge, real results" },
];

export default function TestimonialsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(9);
  const [statsActive, setStatsActive] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const students = useCounter(50000, 2500, statsActive);
  const stories  = useCounter(10000, 2000, statsActive);
  const passRate = useCounter(98,    1800, statsActive);
  const rating   = useCounter(49,    1500, statsActive);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsActive(true); },
      { threshold: .2 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const filtered = activeFilter === "All" ? testimonials : testimonials.filter(t => t.exam === activeFilter);
  const visible = filtered.slice(0, visibleCount);

  return (
    <>
      <style>{fontStyle}</style>
      <main style={{ background: "#060f1e", minHeight: "100vh", color: "#f1f5f9" }}>

        {/* ═══════════════ HERO ═══════════════ */}
        <section style={{ position: "relative", padding: "110px 20px 90px", overflow: "hidden", background: "linear-gradient(160deg,#060f1e 0%,#0c1f3a 50%,#0a2540 100%)" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1800&q=80')`, backgroundSize: "cover", backgroundPosition: "center", opacity: .08 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(6,15,30,.95) 0%,rgba(10,37,64,.85) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(14,165,233,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,.03) 1px,transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />

          {/* floating blobs */}
          <div className="float" style={{ position: "absolute", top: "-80px", right: "6%", width: "520px", height: "520px", background: "radial-gradient(circle,rgba(14,165,233,.12) 0%,transparent 65%)", pointerEvents: "none" }} />
          <div className="float2" style={{ position: "absolute", bottom: "-60px", left: "3%", width: "360px", height: "360px", background: "radial-gradient(circle,rgba(52,211,153,.08) 0%,transparent 65%)", pointerEvents: "none" }} />

          <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>

              {/* LEFT TEXT */}
              <div>
                <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(14,165,233,.12)", border: "1px solid rgba(14,165,233,.3)", borderRadius: "100px", padding: "6px 18px", fontSize: "11px", fontWeight: 700, color: "#7dd3fc", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "28px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0ea5e9", display: "inline-block" }} />
                  Student Stories
                </div>
                <h1 className="fd fade-up" style={{ fontSize: "clamp(2.8rem,5.5vw,4.8rem)", fontWeight: 700, lineHeight: 1.08, color: "#f8fafc", marginBottom: "20px", animationDelay: ".1s" }}>
                  Real nurses.<br />
                  <span className="shimmer-text">Real results.</span>
                </h1>
                <p className="fade-up" style={{ fontSize: "1.1rem", color: "#94a3b8", fontWeight: 400, lineHeight: 1.85, maxWidth: "480px", marginBottom: "36px", animationDelay: ".2s" }}>
                  Every story here is from a real student who chose a smarter way to prepare — and passed. No actors. No scripts. Just nurses who made it.
                </p>

                {/* Filter pills */}
                <div className="fade-up" style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "36px", animationDelay: ".3s" }}>
                  {filters.map(f => (
                    <button key={f} className={`filter-btn${activeFilter === f ? " active" : ""}`}
                      onClick={() => { setActiveFilter(f); setVisibleCount(9); }}>
                      {f}
                    </button>
                  ))}
                </div>

                <div className="fade-up" style={{ display: "flex", gap: "20px", flexWrap: "wrap", animationDelay: ".4s" }}>
                  {[
                    { val: "22+", label: "Student stories", color: "#38bdf8" },
                    { val: "98%", label: "Pass rate", color: "#34d399" },
                    { val: "4.9★", label: "Average rating", color: "#fbbf24" },
                  ].map(s => (
                    <div key={s.label} style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "1.6rem", fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: "4px" }}>{s.val}</p>
                      <p style={{ fontSize: "11px", color: "#475569", fontWeight: 500 }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — exam images grid */}
              <div className="fade-up" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", animationDelay: ".2s" }}>
                {examImages.map((img, i) => (
                  <div key={i} className="image-card"
                    style={{ height: i === 0 ? "240px" : i === 3 ? "240px" : "180px" }}
                    onMouseEnter={() => setHoveredImage(i)}
                    onMouseLeave={() => setHoveredImage(null)}>
                    <img src={img.url} alt={img.caption} />
                    <div className="image-overlay" />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px", zIndex: 2, transition: "all .4s ease" }}>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: "#f8fafc", margin: "0 0 3px", lineHeight: 1.3 }}>{img.caption}</p>
                      <p style={{ fontSize: "10px", color: hoveredImage === i ? "#94a3b8" : "transparent", margin: 0, transition: "color .3s ease" }}>{img.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ TICKER ═══════════════ */}
        <div style={{ background: "#040d1a", borderTop: "1px solid rgba(14,165,233,.1)", borderBottom: "1px solid rgba(14,165,233,.1)", padding: "16px 0" }}>
          <div className="ticker-wrap">
            <div className="ticker-inner">
              {[...Array(2)].map((_, ri) => (
                <span key={ri} style={{ display: "inline-flex" }}>
                  {["98% first-attempt pass rate", "50,000+ students preparing", "22+ published success stories", "4.9/5 average rating", "Built by licensed RNs", "Real students · Real results", "NCLEX-RN · NCLEX-PN · Nursing School", "International nurses welcome", "Free to start · No credit card"].map(t => (
                    <span key={t} className="ticker-item"><span className="ticker-dot" />{t}</span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════ ANIMATED STATS ═══════════════ */}
        <section ref={statsRef} style={{ background: "linear-gradient(135deg,#071428 0%,#0a1f38 100%)", padding: "80px 20px", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 className="fd" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, color: "#f8fafc" }}>The numbers speak for themselves.</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "16px" }}>
              {[
                { val: `${students.toLocaleString()}+`, label: "Students preparing", color: "#38bdf8", bg: "rgba(56,189,248,.06)", border: "rgba(56,189,248,.15)", icon: "👩‍⚕️" },
                { val: `${passRate}%`,                   label: "First-attempt pass rate", color: "#34d399", bg: "rgba(52,211,153,.06)", border: "rgba(52,211,153,.15)", icon: "✅" },
                { val: `${stories.toLocaleString()}+`,   label: "Success stories", color: "#c084fc", bg: "rgba(192,132,252,.06)", border: "rgba(192,132,252,.15)", icon: "📖" },
                { val: `${(rating / 10).toFixed(1)} / 5`, label: "Average rating", color: "#fbbf24", bg: "rgba(251,191,36,.06)", border: "rgba(251,191,36,.15)", icon: "⭐" },
              ].map(s => (
                <div key={s.label}
                  style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: "20px", padding: "32px 24px", textAlign: "center", transition: "all .3s cubic-bezier(.34,1.56,.64,1)", cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px) scale(1.03)"; e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,.3)`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ fontSize: "24px", marginBottom: "12px" }}>{s.icon}</div>
                  <p className="fd" style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 700, color: s.color, lineHeight: 1, marginBottom: "10px" }}>{s.val}</p>
                  <p style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 500, lineHeight: 1.4 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ TESTIMONIALS GRID ═══════════════ */}
        <section style={{ background: "linear-gradient(180deg,#0c1e35 0%,#0e2540 100%)", padding: "80px 20px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "52px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>What Students Say</p>
              <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2 }}>
                {activeFilter === "All" ? "Every voice matters." : `${activeFilter} success stories.`}
              </h2>
              <p style={{ fontSize: "15px", color: "#64748b", fontWeight: 400, marginTop: "12px" }}>
                Hover over any card — watch it come alive.
              </p>
            </div>

            {visible.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <p style={{ fontSize: "48px", marginBottom: "12px" }}>💬</p>
                <p style={{ color: "#64748b", fontSize: "16px" }}>No stories for that filter yet.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "16px" }}>
                {visible.map((t, i) => (
                  <TestimonialCard key={i} t={t} index={i} />
                ))}
              </div>
            )}

            {visibleCount < filtered.length && (
              <div style={{ textAlign: "center", marginTop: "48px" }}>
                <button onClick={() => setVisibleCount(v => v + 9)}
                  style={{ padding: "14px 40px", borderRadius: "100px", background: "rgba(14,165,233,.1)", border: "1px solid rgba(14,165,233,.25)", color: "#38bdf8", fontSize: "14px", fontWeight: 700, cursor: "pointer", transition: "all .3s cubic-bezier(.34,1.56,.64,1)", fontFamily: "inherit", letterSpacing: ".02em" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(14,165,233,.2)"; e.currentTarget.style.transform = "translateY(-3px) scale(1.04)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(14,165,233,.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(14,165,233,.1)"; e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
                  Load more stories ↓
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════ WALL OF LOVE (mini cards) ═══════════════ */}
        <section style={{ background: "#060f1e", padding: "80px 20px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#34d399", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>Wall of Love</p>
              <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2 }}>Quick wins from our community.</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "12px" }}>
              {[
                { text: "Passed 85Q first try!", name: "RN graduate", color: "#38bdf8" },
                { text: "Rationales are incredible", name: "Nursing student", color: "#34d399" },
                { text: "Best NCLEX prep ever", name: "NCLEX-PN passer", color: "#c084fc" },
                { text: "Passed after just 3 weeks", name: "Working nurse", color: "#fbbf24" },
                { text: "International nurse — passed!", name: "Global RN", color: "#f87171" },
                { text: "Dean's list with this platform", name: "Nursing student", color: "#818cf8" },
                { text: "My confidence sky-rocketed", name: "Second attempt", color: "#2dd4bf" },
                { text: "NGN questions perfectly covered", name: "2024 graduate", color: "#fb923c" },
                { text: "Study smarter, not harder", name: "Single parent RN", color: "#a78bfa" },
                { text: "Better than any textbook", name: "Clinical student", color: "#4ade80" },
                { text: "Passed at 85 — first time!", name: "New RN", color: "#60a5fa" },
                { text: "Worth every minute I spent", name: "CCRN candidate", color: "#f9a8d4" },
              ].map((w, i) => (
                <div key={i} className="wall-card"
                  style={{ background: `linear-gradient(135deg,${w.color}08 0%,rgba(255,255,255,.03) 100%)`, border: `1px solid ${w.color}20` }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px) scale(1.02)"; e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,.3), 0 0 0 1px ${w.color}30`; e.currentTarget.style.background = `linear-gradient(135deg,${w.color}15 0%,rgba(255,255,255,.06) 100%)`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = `linear-gradient(135deg,${w.color}08 0%,rgba(255,255,255,.03) 100%)`; }}>
                  <div style={{ display: "flex", gap: "2px", marginBottom: "10px" }}>
                    {[...Array(5)].map((_, si) => <span key={si} style={{ color: "#fbbf24", fontSize: "12px" }}>★</span>)}
                  </div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#e2e8f0", marginBottom: "8px", lineHeight: 1.4 }}>"{w.text}"</p>
                  <p style={{ fontSize: "11px", color: w.color, fontWeight: 600 }}>— {w.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ FEATURED QUOTE ═══════════════ */}
        <section style={{ position: "relative", padding: "100px 20px", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1800&q=80')`, backgroundSize: "cover", backgroundPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(6,15,30,.97) 0%,rgba(10,37,64,.92) 100%)" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", background: "radial-gradient(circle,rgba(14,165,233,.07) 0%,transparent 65%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ color: "#38bdf8", fontSize: "6rem", lineHeight: .7, fontFamily: "Georgia,serif", marginBottom: "12px" }}>"</p>
            <p className="fd" style={{ fontSize: "clamp(1.5rem,3.5vw,2.2rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.55, marginBottom: "36px" }}>
              After failing once with another platform I switched here and passed comfortably. The adaptive questions made all the difference. I finally understood why wrong answers were wrong — not just why the right answer was right.
            </p>
            <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "28px" }}>
              {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#fbbf24", fontSize: "20px" }}>★</span>)}
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "16px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "100px", padding: "12px 24px" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "rgba(192,132,252,.15)", border: "1px solid rgba(192,132,252,.35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: 700, color: "#c084fc", flexShrink: 0 }}>AN</div>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#f8fafc", margin: 0 }}>Amara N.</p>
                <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>NCLEX-RN · Passed 110Q · 2nd attempt</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ SHARE YOUR STORY ═══════════════ */}
        <section style={{ background: "linear-gradient(135deg,#071428 0%,#0e2240 100%)", padding: "80px 20px", borderTop: "1px solid rgba(255,255,255,.04)" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#34d399", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px" }}>Share Your Win</p>
                <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2, marginBottom: "14px" }}>
                  Did you pass your exam?
                </h2>
                <p style={{ fontSize: "15px", color: "#94a3b8", fontWeight: 400, lineHeight: 1.8, marginBottom: "28px" }}>
                  We would love to hear your story. Share how you prepared and inspire the next generation of nurses. Your story could be the one that changes someone's life.
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link href="/testimonials/submit"
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "14px 28px", borderRadius: "12px", fontSize: "14px", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 28px rgba(14,165,233,.3)", transition: "all .3s cubic-bezier(.34,1.56,.64,1)" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.04)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(14,165,233,.4)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(14,165,233,.3)"; }}>
                    Share my story →
                  </Link>
                  <Link href="/courses/nclex-rn"
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.06)", color: "#cbd5e1", padding: "14px 24px", borderRadius: "12px", fontSize: "14px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,.1)", transition: "all .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.12)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.06)"; }}>
                    Start my prep
                  </Link>
                </div>
              </div>
              <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", height: "320px" }}>
                <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80" alt="Nurse studying" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.7)", transition: "transform .6s ease" }}
                  onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = "scale(1.06)"; }}
                  onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = "scale(1)"; }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(7,20,40,.9) 0%,transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px" }}>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#f8fafc", margin: "0 0 4px" }}>Your story matters.</p>
                  <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>Eligible students with recent exam history can share their journey.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ BOTTOM CTA ═══════════════ */}
        <section style={{ position: "relative", padding: "100px 20px", overflow: "hidden", textAlign: "center" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1800&q=80')`, backgroundSize: "cover", backgroundPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(6,15,30,.97) 0%,rgba(10,30,55,.95) 100%)" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", background: "radial-gradient(circle,rgba(52,211,153,.07) 0%,transparent 65%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1, maxWidth: "640px", margin: "0 auto" }}>
            <h2 className="fd" style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.1, marginBottom: "18px" }}>
              Your success story<br />
              <span style={{ color: "#34d399", fontStyle: "italic" }}>starts today.</span>
            </h2>
            <p style={{ fontSize: "16px", color: "#94a3b8", fontWeight: 400, lineHeight: 1.85, marginBottom: "40px" }}>
              Join thousands of nursing students who chose a smarter way to prepare. No credit card. No commitment. Just results.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/auth/signup"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "16px 38px", borderRadius: "14px", fontSize: "15px", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 32px rgba(14,165,233,.35)", transition: "all .3s cubic-bezier(.34,1.56,.64,1)" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.04)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(14,165,233,.45)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(14,165,233,.35)"; }}>
                Start free today →
              </Link>
              <Link href="/courses"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.07)", color: "#e2e8f0", padding: "16px 32px", borderRadius: "14px", fontSize: "15px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,.14)", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.14)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; }}>
                Explore courses
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  const delays = [0, .05, .1, .15, .2, .08, .04, .12, .06, .18, .09, .14, .03, .16, .07, .11, .13, .02, .17, .08, .06, .12];
  const delay = delays[index % delays.length];

  return (
    <div
      ref={cardRef}
      className="t-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        background: hovered
          ? `linear-gradient(135deg,${t.color}12 0%,rgba(255,255,255,.06) 100%)`
          : "rgba(255,255,255,.03)",
        border: `1px solid ${hovered ? t.color + "45" : "rgba(255,255,255,.07)"}`,
        boxShadow: hovered ? `0 28px 70px rgba(0,0,0,.4), 0 0 0 1px ${t.color}25, inset 0 1px 0 ${t.color}15` : "none",
        animationDelay: `${delay}s`,
      }}>

      {/* Mouse-tracking glow */}
      <div className="mouse-glow" style={{
        left: mousePos.x,
        top: mousePos.y,
        background: `radial-gradient(circle,${t.color}30 0%,transparent 70%)`,
      }} />

      {/* Big quote mark */}
      <div className="quote-mark" style={{ color: t.color }}>"</div>

      {/* Top color bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg,${t.color},${t.color}50)`, borderRadius: "22px 22px 0 0", opacity: hovered ? 1 : 0.3, transition: "opacity .4s" }} />

      {/* Tag */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: `${t.color}15`, border: `1px solid ${t.color}30`, borderRadius: "100px", padding: "4px 12px", fontSize: "10px", fontWeight: 700, color: t.color, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: "16px", transition: "all .3s", transform: hovered ? "scale(1.05)" : "scale(1)" }}>
        <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: t.color, display: "inline-block" }} />
        {t.tag}
      </div>

      {/* Stars */}
      <div style={{ display: "flex", gap: "3px", marginBottom: "14px" }}>
        {[...Array(t.stars)].map((_, i) => (
          <span key={i} className="star-animated" style={{ animationDelay: hovered ? `${i * .08}s` : "0s", color: "#fbbf24" }}>★</span>
        ))}
      </div>

      {/* Quote */}
      <p style={{ fontSize: "14px", color: hovered ? "#e2e8f0" : "#94a3b8", fontWeight: 400, lineHeight: 1.85, fontStyle: "italic", flex: 1, marginBottom: "16px", transition: "color .4s ease", position: "relative", zIndex: 1 }}>
        "{t.quote}"
      </p>

      {/* Expanded on hover */}
      <div className="card-expand">
        <div style={{ background: `${t.color}10`, border: `1px solid ${t.color}20`, borderRadius: "10px", padding: "10px 14px" }}>
          <p style={{ fontSize: "12px", color: t.color, fontWeight: 600, margin: 0 }}>
            💬 This story was verified by our team. Student passed using Pre-NCLEX Nursing platform.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "16px", borderTop: `1px solid rgba(255,255,255,.06)`, marginTop: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="avatar-ring" style={{ "--avatar-color": t.color } as any}
            style={{ width: "40px", height: "40px", borderRadius: "50%", background: `${t.color}18`, border: `2px solid ${t.color}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 800, color: t.color, flexShrink: 0 }}>
            {t.initials}
          </div>
          <div>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#f1f5f9", margin: 0 }}>{t.name}</p>
            <p style={{ fontSize: "11px", color: "#475569", margin: 0, fontWeight: 400 }}>{t.attempt}</p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <span className="score-badge" style={{ display: "block", fontSize: "10px", fontWeight: 700, background: `${t.color}18`, color: t.color, border: `1px solid ${t.color}35`, padding: "5px 12px", borderRadius: "100px", marginBottom: "4px", whiteSpace: "nowrap" }}>{t.score}</span>
          <p style={{ fontSize: "10px", color: "#334155", margin: 0, fontWeight: 600 }}>{t.exam}</p>
        </div>
      </div>
    </div>
  );
}