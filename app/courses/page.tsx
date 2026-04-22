"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
  .font-display { font-family: 'Playfair Display', Georgia, serif; }
  body { font-family: 'DM Sans', sans-serif; }
`;

const courses = [
  {
    exam: "Pre-Nursing",
    title: "TEAS 7 & HESI A2 Success Toolkit",
    description: "Ace your nursing school entrance exam. Covers Reading, Maths, Science, and English for both TEAS 7 and HESI A2.",
    icon: "",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
    accentBg: "rgba(217,119,6,0.08)",
    href: "/courses/pre-nursing",
    available: false,
    tag: "Entrance Exams",
    stats: [{ label: "Exams covered", value: "2" }, { label: "Subject areas", value: "9" }],
  },
  {
    exam: "Nursing School",
    title: "Your Nursing School Companion",
    description: "Master fundamentals, med-surg, pharmacology, maternal, paediatric, and mental health nursing -- all NCLEX aligned.",
    icon: "",
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    accentBg: "rgba(5,150,105,0.08)",
    href: "/courses/nursing-school",
    available: false,
    tag: "Core Nursing",
    stats: [{ label: "Core subjects", value: "6" }, { label: "NCLEX aligned", value: "100%" }],
  },
  {
    exam: "NCLEX-RN(R)",
    title: "NCLEX-RN Success Tools",
    description: "The gold standard for RN licensure prep. Adaptive questions across all 8 client needs categories with full NGN support.",
    icon: "",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    accentBg: "rgba(8,145,178,0.08)",
    href: "/courses/nclex-rn",
    available: true,
    tag: "RN Licensure",
    stats: [{ label: "Questions", value: "3,100+" }, { label: "Pass rate", value: "98%" }],
  },
  {
    exam: "NCLEX-PN(R)",
    title: "Effective NCLEX-PN Prep",
    description: "Built for LPN and LVN candidates. Covers all PN client needs categories with the same adaptive question engine.",
    icon: "",
    color: "#4f46e5",
    bg: "#eef2ff",
    border: "#c7d2fe",
    accentBg: "rgba(79,70,229,0.08)",
    href: "/courses/nclex-pn",
    available: false,
    tag: "PN Licensure",
    stats: [{ label: "Client needs", value: "8" }, { label: "Question types", value: "NGN" }],
  },
  {
    exam: "Nurse Practitioner",
    title: "Expert NP Exam Resources",
    description: "Prepare for FNP-C, FNP-BC, and AGPCNP-BC with advanced practice questions covering diagnosis, pharmacotherapy, and more.",
    icon: "",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    accentBg: "rgba(124,58,237,0.08)",
    href: "/courses/nurse-practitioner",
    available: false,
    tag: "Advanced Practice",
    stats: [{ label: "Certifications", value: "2" }, { label: "Level", value: "Advanced" }],
  },
  {
    exam: "CCRN(R)",
    title: "Essential CCRN Success Resources",
    description: "Critical care certification prep. ICU-level questions covering cardiovascular, pulmonary, neuro, and multisystem topics.",
    icon: "",
    color: "#dc2626",
    bg: "#fff1f2",
    border: "#fecdd3",
    accentBg: "rgba(220,38,38,0.08)",
    href: "/courses/ccrn",
    available: false,
    tag: "Critical Care",
    stats: [{ label: "Topic areas", value: "6" }, { label: "Questions", value: "150" }],
  },
];

const finderQuestions = [
  {
    q: "Where are you in your nursing journey?",
    options: [
      { label: "Applying to nursing school", course: 0 },
      { label: "Currently in nursing school", course: 1 },
      { label: "About to take NCLEX-RN", course: 2 },
      { label: "About to take NCLEX-PN", course: 3 },
      { label: "Already an RN, going for NP", course: 4 },
      { label: "ICU nurse going for CCRN", course: 5 },
    ],
  },
];

export default function CoursesPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [filter, setFilter] = useState<"all" | "live" | "soon">("all");
  const [finderResult, setFinderResult] = useState<number | null>(null);
  const [finderOpen, setFinderOpen] = useState(false);
  const finderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 80);
  }, []);

  const filtered = courses.filter((c) => {
    if (filter === "live") return c.available;
    if (filter === "soon") return !c.available;
    return true;
  });

  return (
    <>
      <style>{fontStyle}</style>
      <main className="min-h-screen" style={{ background: "#f6f7f9" }}>

        {/*  HERO  */}
        <section
          className="relative min-h-[60vh] flex items-center overflow-hidden"
          style={{ background: "#0a0f1e" }}
        >
          {/* nurse bg image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1800&q=80')`,
              opacity: 0.15,
            }}
          />
          {/* gradient */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(120deg, #0a0f1e 50%, rgba(10,15,30,0.85) 75%, rgba(6,182,212,0.06) 100%)" }}
          />

          <div
            className="relative z-10 mx-auto max-w-7xl px-6 py-24"
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
              All Certification Paths
            </p>
            <h1
              className="font-display text-white mb-5"
              style={{ fontSize: "clamp(2.4rem,5.5vw,4.2rem)", fontWeight: 700, lineHeight: 1.1 }}
            >
              Every exam.<br />
              <span style={{ color: "#06b6d4", fontStyle: "italic" }}>One platform.</span>
            </h1>
            <p
              className="max-w-xl mb-10"
              style={{ color: "#94a3b8", fontWeight: 300, fontSize: "1.05rem", lineHeight: 1.75 }}
            >
              From your first nursing school entrance exam all the way to
              advanced practice certification -- we cover the full journey
              with adaptive questions, deep rationales, and real exam simulation.
            </p>

            {/* filter pills */}
            <div className="flex flex-wrap gap-3">
              {(["all", "live", "soon"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="text-xs font-medium px-5 py-2.5 rounded-full transition-all duration-200 capitalize"
                  style={{
                    background: filter === f ? "#06b6d4" : "rgba(255,255,255,0.07)",
                    color: filter === f ? "#fff" : "#94a3b8",
                    border: filter === f ? "1px solid #06b6d4" : "1px solid rgba(255,255,255,0.1)",
                    transform: filter === f ? "scale(1.04)" : "scale(1)",
                  }}
                >
                  {f === "all" ? "All courses" : f === "live" ? " Live now" : " Coming soon"}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/*  COURSE CARDS GRID  */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <Link
                key={course.exam}
                href={course.href}
                className="group block rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  animationDelay: `${i * 60}ms`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.10)`;
                  e.currentTarget.style.borderColor = course.border;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                {/* TOP COLOR BAR */}
                <div
                  className="h-1.5 w-full"
                  style={{ background: course.color }}
                />

                <div className="p-6">
                  {/* header row */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-13 h-13 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ background: course.bg, width: 52, height: 52 }}
                    >
                      {course.icon}
                    </div>
                    {course.available ? (
                      <span
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5"
                        style={{ background: "#ecfeff", color: "#0891b2", border: "1px solid #a5f3fc" }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ background: "#06b6d4" }}
                        />
                        LIVE NOW
                      </span>
                    ) : (
                      <span
                        className="text-[10px] font-medium px-2.5 py-1 rounded-full"
                        style={{ background: "#f1f5f9", color: "#94a3b8" }}
                      >
                        COMING SOON
                      </span>
                    )}
                  </div>

                  {/* tag */}
                  <p
                    className="text-[10px] font-semibold uppercase mb-1"
                    style={{ color: course.color, letterSpacing: "0.15em" }}
                  >
                    {course.tag}
                  </p>

                  {/* title */}
                  <h2
                    className="font-display mb-2"
                    style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.3 }}
                  >
                    {course.exam}
                  </h2>

                  {/* subtitle */}
                  <p
                    className="text-xs font-medium mb-3"
                    style={{ color: "#64748b" }}
                  >
                    {course.title}
                  </p>

                  {/* description */}
                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: "#64748b", fontWeight: 300 }}
                  >
                    {course.description}
                  </p>

                  {/* stats row */}
                  <div
                    className="flex gap-4 py-3 px-4 rounded-xl mb-5"
                    style={{ background: course.accentBg }}
                  >
                    {course.stats.map((s) => (
                      <div key={s.label}>
                        <p
                          className="font-display"
                          style={{ fontSize: "1.1rem", fontWeight: 700, color: course.color }}
                        >
                          {s.value}
                        </p>
                        <p className="text-[10px]" style={{ color: "#94a3b8" }}>{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm font-medium flex items-center gap-1 transition-all duration-200"
                      style={{ color: course.color }}
                    >
                      {course.available ? "Start practising" : "Learn more"}
                      <span className="inline-block group-hover:translate-x-1 transition-transform"></span>
                    </span>
                    {course.available && (
                      <span
                        className="text-xs font-medium px-3 py-1 rounded-full"
                        style={{ background: course.bg, color: course.color, border: `1px solid ${course.border}` }}
                      >
                        Free trial
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl mb-3"></p>
              <p style={{ color: "#64748b" }}>No courses match that filter.</p>
            </div>
          )}
        </section>

        {/*  FIND YOUR PATH  */}
        <section
          style={{ background: "#0a0f1e", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          className="py-20 px-6"
          ref={finderRef}
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase mb-3" style={{ color: "#06b6d4", letterSpacing: "0.2em" }}>
              Not Sure Where to Start?
            </p>
            <h2
              className="font-display text-white mb-4"
              style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 700, lineHeight: 1.2 }}
            >
              Find your certification path
            </h2>
            <p className="mb-10" style={{ color: "#64748b", fontWeight: 300, fontSize: "0.95rem" }}>
              Answer one question and we'll point you to the right course.
            </p>

            {!finderOpen && finderResult === null && (
              <button
                onClick={() => setFinderOpen(true)}
                className="font-medium px-8 py-4 rounded-xl transition-all duration-200 text-sm"
                style={{ background: "#06b6d4", color: "#fff", boxShadow: "0 8px 28px rgba(6,182,212,0.25)" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                Find my course 
              </button>
            )}

            {finderOpen && finderResult === null && (
              <div
                className="rounded-2xl p-8 text-left"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p
                  className="font-display text-white mb-6 text-center"
                  style={{ fontSize: "1.15rem", fontWeight: 700 }}
                >
                  {finderQuestions[0].q}
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {finderQuestions[0].options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => { setFinderResult(opt.course); setFinderOpen(false); }}
                      className="text-left px-5 py-4 rounded-xl text-sm transition-all duration-200"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#cbd5e1", fontWeight: 300 }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(6,182,212,0.1)"; e.currentTarget.style.borderColor = "rgba(6,182,212,0.3)"; e.currentTarget.style.color = "#e2e8f0"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#cbd5e1"; }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {finderResult !== null && (
              <div
                className="rounded-2xl p-8"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="text-sm mb-4" style={{ color: "#64748b" }}>We recommend</p>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                    style={{ background: courses[finderResult].bg }}
                  >
                    {courses[finderResult].icon}
                  </div>
                  <div className="text-left">
                    <p
                      className="font-display text-white"
                      style={{ fontSize: "1.3rem", fontWeight: 700 }}
                    >
                      {courses[finderResult].exam}
                    </p>
                    <p className="text-sm" style={{ color: "#64748b", fontWeight: 300 }}>
                      {courses[finderResult].title}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center gap-3 flex-wrap">
                  <Link
                    href={courses[finderResult].href}
                    className="font-medium px-7 py-3 rounded-xl text-sm transition-all duration-200"
                    style={{ background: courses[finderResult].color, color: "#fff" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                  >
                    Go to {courses[finderResult].exam} 
                  </Link>
                  <button
                    onClick={() => { setFinderResult(null); setFinderOpen(true); }}
                    className="font-medium px-7 py-3 rounded-xl text-sm transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/*  JOURNEY TIMELINE  */}
        <section className="mx-auto max-w-5xl px-6 py-24">
          <div className="text-center mb-14">
            <p className="text-xs font-medium uppercase mb-3" style={{ color: "#06b6d4", letterSpacing: "0.2em" }}>
              The Nursing Journey
            </p>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 700, color: "#0f172a", lineHeight: 1.2 }}
            >
              We're with you every step.
            </h2>
          </div>

          <div className="relative">
            {/* vertical line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
              style={{ background: "linear-gradient(to bottom, #06b6d4, #7c3aed, #dc2626)", opacity: 0.3 }}
            />

            <div className="space-y-6">
              {courses.map((course, i) => (
                <Link
                  key={course.exam}
                  href={course.href}
                  className="group flex items-start gap-6 rounded-2xl p-5 transition-all duration-300 md:pl-16 relative"
                  style={{ background: "#fff", border: "1px solid #e2e8f0" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = course.border; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.07)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateX(0)"; }}
                >
                  {/* timeline dot */}
                  <div
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-white hidden md:flex items-center justify-center"
                    style={{ background: course.color, boxShadow: `0 0 0 3px ${course.bg}` }}
                  />

                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: course.bg }}
                  >
                    {course.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p
                        className="text-xs font-semibold uppercase"
                        style={{ color: course.color, letterSpacing: "0.12em" }}
                      >
                        {course.exam}
                      </p>
                      {course.available ? (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: "#ecfeff", color: "#0891b2", border: "1px solid #a5f3fc" }}>
                          LIVE
                        </span>
                      ) : (
                        <span className="text-[9px] px-2 py-0.5 rounded-full"
                          style={{ background: "#f1f5f9", color: "#94a3b8" }}>
                          SOON
                        </span>
                      )}
                    </div>
                    <p className="font-medium text-sm" style={{ color: "#1e293b" }}>{course.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#94a3b8", fontWeight: 300 }}>{course.description.slice(0, 80)}...</p>
                  </div>

                  <span
                    className="text-sm flex-shrink-0 self-center group-hover:translate-x-1 transition-transform"
                    style={{ color: "#94a3b8" }}
                  >
                    
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/*  BOTTOM CTA  */}
        <section
          className="relative py-24 px-6 overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1800&q=80')` }}
        >
          <div className="absolute inset-0" style={{ background: "rgba(10,15,30,0.85)" }} />
          <div className="relative z-10 mx-auto max-w-2xl text-center text-white">
            <h2
              className="font-display mb-5"
              style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.2 }}
            >
              Start with NCLEX-RN.<br />
              <span style={{ color: "#06b6d4", fontStyle: "italic" }}>It's live and it's free.</span>
            </h2>
            <p className="mb-8" style={{ color: "#94a3b8", fontWeight: 300, lineHeight: 1.75 }}>
              No credit card. No commitment. Just real NCLEX-RN questions
              with full rationales -- ready for you right now.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/courses/nclex-rn"
                className="font-medium px-8 py-4 rounded-xl text-sm transition-all duration-200"
                style={{ background: "#06b6d4", color: "#fff", boxShadow: "0 8px 28px rgba(6,182,212,0.25)" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                Start NCLEX-RN free 
              </Link>
              <Link
                href="/auth/signup"
                className="font-medium px-8 py-4 rounded-xl text-sm transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.18)", color: "#e2e8f0", background: "transparent" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Create free account
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}