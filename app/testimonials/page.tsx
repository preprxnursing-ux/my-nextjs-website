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
    50%      { transform: translateY(-14px); }
  }
  @keyframes pulseRing {
    0%   { transform: scale(1); opacity: .5; }
    100% { transform: scale(1.6); opacity: 0; }
  }
  @keyframes ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  .fade-up { animation: fadeUp .7s ease both; }
  .float   { animation: floatY 6s ease-in-out infinite; }

  .testimonial-card {
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 20px;
    padding: 28px;
    transition: all .35s cubic-bezier(.34,1.56,.64,1);
    position: relative;
    overflow: hidden;
    cursor: default;
  }
  .testimonial-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 24px 60px rgba(0,0,0,.35);
    background: rgba(255,255,255,.07);
  }

  .filter-btn {
    padding: 8px 18px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all .2s ease;
    border: 1px solid rgba(255,255,255,.1);
    background: rgba(255,255,255,.05);
    color: #64748b;
    font-family: inherit;
    white-space: nowrap;
  }
  .filter-btn.active {
    background: rgba(14,165,233,.15);
    border-color: rgba(14,165,233,.35);
    color: #38bdf8;
  }
  .filter-btn:hover:not(.active) {
    background: rgba(255,255,255,.09);
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
  .ticker-inner { display: inline-flex; animation: ticker 32s linear infinite; }
  .ticker-item {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 0 32px; font-size: 13px; font-weight: 600; color: #475569;
  }
  .ticker-dot { width: 4px; height: 4px; border-radius: 50%; background: #0ea5e9; flex-shrink: 0; }

  .star { color: #fbbf24; font-size: 14px; }
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

const testimonials = [
  { name: "Stephanie G.", initials: "SG", exam: "NCLEX-RN", score: "Passed 85Q", attempt: "1st attempt", stars: 5, color: "#0ea5e9", glow: "rgba(14,165,233,.15)", quote: "The questions felt exactly like the real exam. I passed at 85 questions on my very first attempt. The rationales after each question changed how I think clinically. This platform is unreal." },
  { name: "Marcus T.", initials: "MT", exam: "NCLEX-RN", score: "Passed 1st try", attempt: "1st attempt", stars: 5, color: "#34d399", glow: "rgba(52,211,153,.15)", quote: "I studied for 3 weeks using only this platform. The rationales taught me to think like a nurse, not just memorise answers. I felt calm walking into the exam because I had already seen that level of difficulty." },
  { name: "Amara N.", initials: "AN", exam: "NCLEX-RN", score: "Passed 110Q", attempt: "2nd attempt", stars: 5, color: "#c084fc", glow: "rgba(192,132,252,.15)", quote: "After failing once with another platform I switched here and passed comfortably. The adaptive questions made all the difference. I finally understood why wrong answers were wrong." },
  { name: "Priya M.", initials: "PM", exam: "NCLEX-RN", score: "Passed 85Q", attempt: "1st attempt", stars: 5, color: "#f59e0b", glow: "rgba(245,158,11,.15)", quote: "I used this platform every single day for 6 weeks. The timed mode built my stamina and the tutor mode built my knowledge. By the time I sat the real exam it felt like just another practice session." },
  { name: "Jordan K.", initials: "JK", exam: "NCLEX-RN", score: "Passed 130Q", attempt: "1st attempt", stars: 5, color: "#38bdf8", glow: "rgba(56,189,248,.15)", quote: "The client needs breakdown is genius. I knew exactly which areas I was weak in and could laser-focus my study. Pharmacology was my weakest point and the rationales here fixed that completely." },
  { name: "Fatima A.", initials: "FA", exam: "NCLEX-RN", score: "Passed 85Q", attempt: "1st attempt", stars: 5, color: "#f87171", glow: "rgba(248,113,113,.15)", quote: "As an international nurse sitting NCLEX for the first time I was terrified. This platform gave me the confidence I needed. The explanations are clear and the exam simulation is spot on." },
  { name: "Denise W.", initials: "DW", exam: "NCLEX-PN", score: "Passed 85Q", attempt: "1st attempt", stars: 5, color: "#818cf8", glow: "rgba(129,140,248,.15)", quote: "I was juggling work and studying and needed something efficient. The quick mode 10-question sprints were perfect for me. I passed my PN on the first attempt and I credit this platform completely." },
  { name: "Rashida P.", initials: "RP", exam: "NCLEX-PN", score: "Passed 1st try", attempt: "1st attempt", stars: 5, color: "#6366f1", glow: "rgba(99,102,241,.15)", quote: "The PN content is thorough and the interface is clean. No clutter, no distraction — just focused practice. I loved that every wrong answer came with a proper explanation not just a label." },
  { name: "Carlos M.", initials: "CM", exam: "Nursing School", score: "Top of class", attempt: "Nursing school", stars: 5, color: "#10b981", glow: "rgba(16,185,129,.15)", quote: "Using this during nursing school gave me a massive edge. My professors noticed the difference in how I reasoned through clinical scenarios. My grades went from Bs to straight As in my second semester." },
  { name: "Yemi O.", initials: "YO", exam: "Nursing School", score: "Exam ready", attempt: "Nursing school", stars: 5, color: "#34d399", glow: "rgba(52,211,153,.15)", quote: "I started using this in my first year of nursing school and it completely changed how I study. The fact that questions are NCLEX-aligned means I am preparing for both my school exams and my boards at the same time." },
];

const filters = ["All", "NCLEX-RN", "NCLEX-PN", "Nursing School"];

export default function TestimonialsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [statsActive, setStatsActive] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const students = useCounter(50000, 2500, statsActive);
  const stories  = useCounter(10000, 2000, statsActive);
  const passRate = useCounter(98,    1800, statsActive);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsActive(true); },
      { threshold: .3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const filtered = activeFilter === "All"
    ? testimonials
    : testimonials.filter(t => t.exam === activeFilter);

  const visible = filtered.slice(0, visibleCount);

  return (
    <>
      <style>{fontStyle}</style>
      <main style={{ background: "#0d1f35", minHeight: "100vh", color: "#f1f5f9" }}>

        {/* HERO */}
        <section style={{ position: "relative", padding: "100px 20px 80px", overflow: "hidden", background: "linear-gradient(160deg,#0d1f35 0%,#0f2a45 100%)" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1800&q=80')`, backgroundSize: "cover", backgroundPosition: "center", opacity: .07 }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(14,165,233,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,.04) 1px,transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />
          <div className="float" style={{ position: "absolute", top: "-60px", right: "8%", width: "480px", height: "480px", background: "radial-gradient(circle,rgba(14,165,233,.1) 0%,transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-40px", left: "4%", width: "300px", height: "300px", background: "radial-gradient(circle,rgba(52,211,153,.07) 0%,transparent 65%)", pointerEvents: "none" }} />

          <div style={{ maxWidth: "1280px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(14,165,233,.12)", border: "1px solid rgba(14,165,233,.3)", borderRadius: "100px", padding: "6px 18px", fontSize: "11px", fontWeight: 700, color: "#7dd3fc", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "28px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0ea5e9", display: "inline-block" }} />
              Student Stories
            </div>

            <h1 className="fd fade-up" style={{ fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 700, lineHeight: 1.08, color: "#f8fafc", marginBottom: "20px", animationDelay: ".1s" }}>
              Real nurses.<br />
              <span className="shimmer-text">Real results.</span>
            </h1>

            <p className="fade-up" style={{ fontSize: "clamp(1rem,1.4vw,1.15rem)", color: "#64748b", fontWeight: 400, lineHeight: 1.8, maxWidth: "520px", margin: "0 auto 40px", animationDelay: ".2s" }}>
              Every story here is from a real student who chose a smarter way to prepare — and passed.
            </p>

            {/* Filter pills */}
            <div className="fade-up" style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap", animationDelay: ".3s" }}>
              {filters.map(f => (
                <button key={f} className={`filter-btn${activeFilter === f ? " active" : ""}`}
                  onClick={() => { setActiveFilter(f); setVisibleCount(6); }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* TICKER */}
        <div style={{ background: "#0a1e32", borderTop: "1px solid rgba(14,165,233,.08)", borderBottom: "1px solid rgba(14,165,233,.08)", padding: "14px 0" }}>
          <div className="ticker-wrap">
            <div className="ticker-inner">
              {[...Array(2)].map((_, ri) => (
                <span key={ri} style={{ display: "inline-flex" }}>
                  {["98% first-attempt pass rate", "50,000+ students preparing", "10,000+ success stories", "4.9/5 average rating", "Built by licensed RNs", "Real students, real results", "NCLEX-RN · NCLEX-PN · Nursing School"].map(t => (
                    <span key={t} className="ticker-item"><span className="ticker-dot" />{t}</span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ANIMATED STATS */}
        <section ref={statsRef} style={{ background: "#0a1e32", padding: "72px 20px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "20px" }}>
              {[
                { val: `${students.toLocaleString()}+`, label: "Students preparing", color: "#38bdf8" },
                { val: `${passRate}%`,                   label: "First-attempt pass rate", color: "#34d399" },
                { val: `${stories.toLocaleString()}+`,   label: "Success stories", color: "#c084fc" },
                { val: "4.9 / 5",                        label: "Average rating", color: "#fbbf24" },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "18px", padding: "28px 20px", textAlign: "center", transition: "transform .25s, box-shadow .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <p className="fd" style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.val}</p>
                  <p style={{ fontSize: "13px", color: "#64748b", fontWeight: 500, marginTop: "10px" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS GRID */}
        <section style={{ background: "#112a40", padding: "72px 20px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>What Students Say</p>
              <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2 }}>
                {activeFilter === "All" ? "Every voice matters." : `${activeFilter} stories.`}
              </h2>
              <p style={{ fontSize: "15px", color: "#64748b", fontWeight: 400, marginTop: "10px" }}>
                Hover over any card to read the full story.
              </p>
            </div>

            {visible.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <p style={{ fontSize: "40px", marginBottom: "12px" }}>💬</p>
                <p style={{ color: "#64748b" }}>No stories for that filter yet.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "16px" }}>
                {visible.map((t, i) => (
                  <TestimonialCard key={i} t={t} />
                ))}
              </div>
            )}

            {visibleCount < filtered.length && (
              <div style={{ textAlign: "center", marginTop: "40px" }}>
                <button onClick={() => setVisibleCount(v => v + 6)}
                  style={{ padding: "12px 32px", borderRadius: "12px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "#94a3b8", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all .2s", fontFamily: "inherit" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.06)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  Load more stories
                </button>
              </div>
            )}
          </div>
        </section>

        {/* FEATURED QUOTE */}
        <section style={{ position: "relative", padding: "80px 20px", overflow: "hidden", background: "#0d2a40" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1800&q=80')`, backgroundSize: "cover", backgroundPosition: "center", opacity: .08 }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "500px", background: "radial-gradient(circle,rgba(14,165,233,.08) 0%,transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ color: "#0ea5e9", fontSize: "5rem", lineHeight: .8, marginBottom: "8px", fontFamily: "Georgia, serif" }}>"</p>
            <p className="fd" style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.5, marginBottom: "32px" }}>
              After failing once with another platform I switched here and passed comfortably. The adaptive questions made all the difference.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "14px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "100px", padding: "10px 20px" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "rgba(192,132,252,.15)", border: "1px solid rgba(192,132,252,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, color: "#c084fc", flexShrink: 0 }}>AN</div>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#f8fafc", margin: 0 }}>Amara N.</p>
                <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>NCLEX-RN · Passed 110Q · 2nd attempt</p>
              </div>
            </div>
          </div>
        </section>

        {/* SHARE YOUR STORY */}
        <section style={{ background: "#0a1e32", padding: "72px 20px" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px" }}>Share Your Win</p>
            <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2, marginBottom: "14px" }}>
              Did you pass your exam?
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", fontWeight: 400, lineHeight: 1.8, marginBottom: "32px" }}>
              We would love to hear your story. Share how you prepared and inspire the next generation of nurses.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#0ea5e9", color: "#fff", padding: "14px 32px", borderRadius: "12px", fontSize: "14px", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 28px rgba(14,165,233,.3)", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#38bdf8"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#0ea5e9"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Share my story →
              </Link>
              <Link href="/courses/nclex-rn" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.07)", color: "#e2e8f0", padding: "14px 28px", borderRadius: "12px", fontSize: "14px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,.12)", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.13)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; }}>
                Start my prep
              </Link>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section style={{ position: "relative", padding: "100px 20px", overflow: "hidden", background: "#0d1f35", textAlign: "center" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1800&q=80')`, backgroundSize: "cover", backgroundPosition: "center", opacity: .1 }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(13,31,53,.88)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto" }}>
            <h2 className="fd" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.15, marginBottom: "16px" }}>
              Your success story<br />
              <span style={{ color: "#38bdf8", fontStyle: "italic" }}>starts today.</span>
            </h2>
            <p style={{ fontSize: "16px", color: "#64748b", fontWeight: 400, lineHeight: 1.8, marginBottom: "36px" }}>
              Join thousands of nursing students who chose a smarter way to prepare. No credit card. No commitment. Just results.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/auth/signup" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#0ea5e9", color: "#fff", padding: "15px 36px", borderRadius: "12px", fontSize: "15px", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 28px rgba(14,165,233,.35)", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#38bdf8"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#0ea5e9"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Start free today →
              </Link>
              <Link href="/courses" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.07)", color: "#e2e8f0", padding: "15px 28px", borderRadius: "12px", fontSize: "15px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,.12)", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.13)"; }}
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

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,.07)" : "rgba(255,255,255,.04)",
        border: `1px solid ${hovered ? t.color + "50" : "rgba(255,255,255,.08)"}`,
        borderRadius: "20px",
        padding: "28px",
        transition: "all .35s cubic-bezier(.34,1.56,.64,1)",
        position: "relative",
        overflow: "hidden",
        transform: hovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered ? `0 24px 60px rgba(0,0,0,.3), 0 0 0 1px ${t.color}20` : "none",
        display: "flex",
        flexDirection: "column",
      }}>

      {/* top color bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: t.color, opacity: hovered ? 1 : 0.4, transition: "opacity .35s" }} />

      {/* glow */}
      <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", borderRadius: "50%", background: t.glow, opacity: hovered ? 1 : 0, transition: "opacity .35s", pointerEvents: "none" }} />

      {/* stars */}
      <div style={{ display: "flex", gap: "2px", marginBottom: "16px" }}>
        {[...Array(t.stars)].map((_, i) => (
          <span key={i} className="star">★</span>
        ))}
      </div>

      {/* quote */}
      <p style={{ fontSize: "14px", color: "#94a3b8", fontWeight: 400, lineHeight: 1.8, fontStyle: "italic", flex: 1, marginBottom: "20px", transition: "color .35s", ...(hovered ? { color: "#cbd5e1" } : {}) }}>
        "{t.quote}"
      </p>

      {/* footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: t.glow, border: `1px solid ${t.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: t.color, flexShrink: 0, transition: "transform .35s", transform: hovered ? "scale(1.1)" : "scale(1)" }}>
            {t.initials}
          </div>
          <div>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#e2e8f0", margin: 0 }}>{t.name}</p>
            <p style={{ fontSize: "11px", color: "#475569", margin: 0, fontWeight: 400 }}>{t.attempt}</p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, background: t.glow, color: t.color, border: `1px solid ${t.color}40`, padding: "4px 12px", borderRadius: "100px", display: "block", marginBottom: "4px" }}>{t.score}</span>
          <p style={{ fontSize: "10px", color: "#475569", margin: 0 }}>{t.exam}</p>
        </div>
      </div>
    </div>
  );
}