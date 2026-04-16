"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
  .font-display { font-family: 'Playfair Display', Georgia, serif; }
  body { font-family: 'DM Sans', sans-serif; }
`;

const testimonials = [
  {
    name: "Stephanie G.",
    exam: "NCLEX-RN",
    tag: "RN Licensure",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    score: "Passed 85Q",
    attempt: "1st attempt",
    stars: 5,
    quote: "The questions felt exactly like the real exam. I passed at 85 questions on my very first attempt. The rationales after each question changed how I think clinically. This platform is unreal.",
  },
  {
    name: "Marcus T.",
    exam: "NCLEX-RN",
    tag: "RN Licensure",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    score: "Passed 1st try",
    attempt: "1st attempt",
    stars: 5,
    quote: "I studied for 3 weeks using only this platform. The rationales taught me to think like a nurse, not just memorise answers. I felt calm walking into the exam because I had already seen that level of difficulty.",
  },
  {
    name: "Amara N.",
    exam: "NCLEX-RN",
    tag: "RN Licensure",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    score: "Passed 110Q",
    attempt: "2nd attempt",
    stars: 5,
    quote: "After failing once with another platform I switched here and passed comfortably. The adaptive questions made all the difference. I finally understood why wrong answers were wrong -- not just why the right answer was right.",
  },
  {
    name: "Priya M.",
    exam: "NCLEX-RN",
    tag: "RN Licensure",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    score: "Passed 85Q",
    attempt: "1st attempt",
    stars: 5,
    quote: "I used this platform every single day for 6 weeks. The timed mode built my stamina and the tutor mode built my knowledge. By the time I sat the real exam it felt like just another practice session.",
  },
  {
    name: "Jordan K.",
    exam: "NCLEX-RN",
    tag: "RN Licensure",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    score: "Passed 130Q",
    attempt: "1st attempt",
    stars: 5,
    quote: "The client needs breakdown is genius. I knew exactly which areas I was weak in and could laser-focus my study. Pharmacology was my weakest point and the rationales here fixed that completely.",
  },
  {
    name: "Fatima A.",
    exam: "NCLEX-RN",
    tag: "RN Licensure",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    score: "Passed 85Q",
    attempt: "1st attempt",
    stars: 5,
    quote: "As an international nurse sitting NCLEX for the first time I was terrified. This platform gave me the confidence I needed. The explanations are clear and the exam simulation is spot on.",
  },
  {
    name: "Denise W.",
    exam: "NCLEX-PN",
    tag: "PN Licensure",
    color: "#4f46e5",
    bg: "#eef2ff",
    border: "#c7d2fe",
    score: "Passed 85Q",
    attempt: "1st attempt",
    stars: 5,
    quote: "I was juggling work and studying and needed something efficient. The quick mode 10-question sprints were perfect for me. I passed my PN on the first attempt and I credit this platform completely.",
  },
  {
    name: "Rashida P.",
    exam: "NCLEX-PN",
    tag: "PN Licensure",
    color: "#4f46e5",
    bg: "#eef2ff",
    border: "#c7d2fe",
    score: "Passed 1st try",
    attempt: "1st attempt",
    stars: 5,
    quote: "The PN content is thorough and the interface is clean. No clutter, no distraction -- just focused practice. I loved that every wrong answer came with a proper explanation not just a label.",
  },
  {
    name: "Carlos M.",
    exam: "Nursing School",
    tag: "Core Nursing",
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    score: "Top of class",
    attempt: "Nursing school",
    stars: 5,
    quote: "Using this during nursing school gave me a massive edge. My professors noticed the difference in how I reasoned through clinical scenarios. My grades went from Bs to straight As in my second semester.",
  },
  {
    name: "Yemi O.",
    exam: "Nursing School",
    tag: "Core Nursing",
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    score: "Exam ready",
    attempt: "Nursing school",
    stars: 5,
    quote: "I started using this in my first year of nursing school and it completely changed how I study. The fact that questions are NCLEX-aligned means I am preparing for both my school exams and my boards at the same time.",
  },
];

const filters = ["All", "NCLEX-RN", "NCLEX-PN", "Nursing School"];

const stats = [
  { value: "98%", label: "First-attempt pass rate", color: "#34d399" },
  { value: "50,000+", label: "Students preparing", color: "#06b6d4" },
  { value: "10,000+", label: "Success stories", color: "#a78bfa" },
  { value: "4.9 / 5", label: "Average rating", color: "#fbbf24" },
];

export default function TestimonialsPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 80);
  }, []);

  const filtered = activeFilter === "All"
    ? testimonials
    : testimonials.filter((t) => t.exam === activeFilter);

  const visible = filtered.slice(0, visibleCount);

  return (
    <>
      <style>{fontStyle}</style>
      <main className="min-h-screen" style={{ background: "#f6f7f9" }}>

        {/* ── HERO ── */}
        <section
          className="relative min-h-[55vh] flex items-center overflow-hidden"
          style={{ background: "#0a0f1e" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1800&q=80')`,
              opacity: 0.15,
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(120deg, #0a0f1e 55%, rgba(10,15,30,0.85) 80%, rgba(6,182,212,0.05) 100%)" }}
          />

          <div
            className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-center"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.9s ease, transform 0.9s ease",
            }}
          >
            <p
              className="text-xs font-medium uppercase mb-4"
              style={{ color: "#06b6d4", letterSpacing: "0.2em" }}
            >
              Student Stories
            </p>
            <h1
              className="font-display text-white mb-5 mx-auto"
              style={{ fontSize: "clamp(2.4rem,5.5vw,4rem)", fontWeight: 700, lineHeight: 1.1, maxWidth: "700px" }}
            >
              Real nurses.<br />
              <span style={{ color: "#06b6d4", fontStyle: "italic" }}>Real results.</span>
            </h1>
            <p
              className="mx-auto mb-10"
              style={{ color: "#94a3b8", fontWeight: 300, fontSize: "1.05rem", lineHeight: 1.75, maxWidth: "500px" }}
            >
              Every story here is from a real student who chose a smarter
              way to prepare -- and passed.
            </p>

            {/* filter pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => { setActiveFilter(f); setVisibleCount(6); }}
                  className="text-xs font-medium px-5 py-2.5 rounded-full transition-all duration-200"
                  style={{
                    background: activeFilter === f ? "#06b6d4" : "rgba(255,255,255,0.07)",
                    color: activeFilter === f ? "#fff" : "#94a3b8",
                    border: activeFilter === f ? "1px solid #06b6d4" : "1px solid rgba(255,255,255,0.1)",
                    transform: activeFilter === f ? "scale(1.04)" : "scale(1)",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section style={{ background: "#0d1425", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p
                  className="font-display"
                  style={{ fontSize: "clamp(1.8rem,3.5vw,2.4rem)", fontWeight: 700, color: s.color, lineHeight: 1 }}
                >
                  {s.value}
                </p>
                <p className="mt-2 text-sm" style={{ color: "#64748b", fontWeight: 300 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS GRID ── */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 flex flex-col transition-all duration-300"
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.09)";
                  e.currentTarget.style.borderColor = t.border;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                {/* top color bar */}
                <div className="h-1 w-full rounded-full mb-5" style={{ background: t.color }} />

                {/* stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(t.stars)].map((_, si) => (
                    <span key={si} style={{ color: "#fbbf24", fontSize: "0.9rem" }}>*</span>
                  ))}
                </div>

                {/* quote */}
                <p
                  className="text-sm leading-relaxed flex-1 mb-6"
                  style={{ color: "#475569", fontWeight: 300, fontStyle: "italic" }}
                >
                  "{t.quote}"
                </p>

                {/* footer */}
                <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid #f1f5f9" }}>
                  <div className="flex items-center gap-3">
                    {/* avatar circle */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
                      style={{ background: t.bg, color: t.color, border: `1px solid ${t.border}` }}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#1e293b" }}>{t.name}</p>
                      <p className="text-xs" style={{ color: "#94a3b8", fontWeight: 300 }}>{t.attempt}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full block mb-1"
                      style={{ background: t.bg, color: t.color, border: `1px solid ${t.border}` }}
                    >
                      {t.score}
                    </span>
                    <p className="text-[10px]" style={{ color: "#94a3b8" }}>{t.exam}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* load more */}
          {visibleCount < filtered.length && (
            <div className="text-center mt-12">
              <button
                onClick={() => setVisibleCount((v) => v + 6)}
                className="font-medium px-8 py-3.5 rounded-xl text-sm transition-all duration-200"
                style={{ border: "1px solid #e2e8f0", background: "#fff", color: "#475569" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.07)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                Load more stories
              </button>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-3xl mb-3">💬</p>
              <p style={{ color: "#64748b" }}>No stories for that filter yet.</p>
            </div>
          )}
        </section>

        {/* ── FEATURED QUOTE ── */}
        <section
          className="relative py-20 px-6 overflow-hidden"
          style={{ background: "#0a0f1e" }}
        >
          <div className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1800&q=80')` }} />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <p style={{ color: "#06b6d4", fontSize: "4rem", lineHeight: 1 }}>"</p>
            <p
              className="font-display text-white"
              style={{ fontSize: "clamp(1.3rem,3vw,1.9rem)", fontWeight: 700, lineHeight: 1.5, marginTop: "-1.5rem" }}
            >
              After failing once with another platform I switched here and passed
              comfortably. The adaptive questions made all the difference.
            </p>
            <div className="flex items-center justify-center gap-3 mt-8">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{ background: "#ecfeff", color: "#0891b2", border: "1px solid #a5f3fc" }}
              >
                A
              </div>
              <div className="text-left">
                <p className="font-medium text-sm text-white">Amara N.</p>
                <p className="text-xs" style={{ color: "#64748b" }}>NCLEX-RN . Passed 110Q . 2nd attempt</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SUBMIT YOUR STORY ── */}
        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-xs font-medium uppercase mb-3" style={{ color: "#06b6d4", letterSpacing: "0.2em" }}>
            Share Your Win
          </p>
          <h2
            className="font-display mb-4"
            style={{ fontSize: "clamp(1.8rem,3.5vw,2.4rem)", fontWeight: 700, color: "#0f172a", lineHeight: 1.2 }}
          >
            Did you pass your exam?
          </h2>
          <p className="mb-8" style={{ color: "#64748b", fontWeight: 300, lineHeight: 1.75 }}>
            We would love to hear your story. Share how you prepared
            and inspire the next generation of nurses.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="font-medium px-8 py-4 rounded-xl text-sm transition-all duration-200"
              style={{ background: "#0f172a", color: "#fff", boxShadow: "0 4px 14px rgba(15,23,42,0.18)" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              Share my story →
            </Link>
            <Link
              href="/courses/nclex-rn"
              className="font-medium px-8 py-4 rounded-xl text-sm transition-all duration-200"
              style={{ border: "1px solid #e2e8f0", background: "#fff", color: "#475569" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.07)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Start my prep
            </Link>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section
          className="relative py-24 px-6 overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1800&q=80')` }}
        >
          <div className="absolute inset-0" style={{ background: "rgba(10,15,30,0.85)" }} />
          <div className="relative z-10 mx-auto max-w-2xl text-center text-white">
            <h2
              className="font-display mb-5"
              style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.2 }}
            >
              Your success story<br />
              <span style={{ color: "#06b6d4", fontStyle: "italic" }}>starts today.</span>
            </h2>
            <p className="mb-8" style={{ color: "#94a3b8", fontWeight: 300, lineHeight: 1.75 }}>
              Join thousands of nursing students who chose a smarter way to prepare.
              No credit card. No commitment. Just results.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/auth/signup"
                className="font-medium px-8 py-4 rounded-xl text-sm transition-all duration-200"
                style={{ background: "#06b6d4", color: "#fff", boxShadow: "0 8px 28px rgba(6,182,212,0.25)" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                Start free today →
              </Link>
              <Link
                href="/courses"
                className="font-medium px-8 py-4 rounded-xl text-sm transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.18)", color: "#e2e8f0", background: "transparent" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Explore courses
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}


