import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  *, body { font-family: 'Plus Jakarta Sans', sans-serif; }
  .fd { font-family: 'Cormorant Garamond', Georgia, serif; }
`;

const sections = [
  {
    name: "Reading",
    questions: 45,
    scored: 39,
    unscored: 6,
    time: "55 min",
    weight: "26%",
    color: "#0ea5e9",
    bg: "rgba(14,165,233,.08)",
    border: "rgba(14,165,233,.2)",
    icon: "R",
    desc: "Tests ability to understand, analyse, and interpret written passages -- including healthcare-related texts, instructions, and informational graphics.",
    topics: [
      { name: "Key ideas and details", pct: "47-53%", items: ["Identify the main idea", "Summarise passages", "Distinguish fact from opinion", "Draw inferences", "Follow multi-step instructions"] },
      { name: "Craft and structure", pct: "20-27%", items: ["Identify author's purpose", "Analyse text structure", "Understand point of view", "Interpret figurative language", "Use context clues"] },
      { name: "Integration of knowledge", pct: "24-30%", items: ["Interpret charts, graphs, maps", "Compare multiple sources", "Evaluate arguments", "Identify supporting evidence"] },
    ],
    tips: ["Read the question BEFORE the passage to know what you are looking for.", "Main idea questions: read the first and last sentence of each paragraph first.", "Always go back to the text -- never answer from memory alone."],
  },
  {
    name: "Mathematics",
    questions: 38,
    scored: 34,
    unscored: 4,
    time: "57 min",
    weight: "22%",
    color: "#10b981",
    bg: "rgba(16,185,129,.08)",
    border: "rgba(16,185,129,.2)",
    icon: "M",
    desc: "Tests foundational maths skills directly applicable to nursing -- dosage calculations, unit conversions, ratios, and data interpretation. A four-function calculator is provided on-screen.",
    topics: [
      { name: "Numbers and algebra", pct: "56-62%", items: ["Whole numbers, fractions, decimals", "Percentages and ratios", "Proportions", "Algebraic equations", "Word problems"] },
      { name: "Measurement and data", pct: "38-44%", items: ["Unit conversions (metric/imperial)", "Interpret graphs and tables", "Roman numerals", "Military time", "Basic statistics -- mean, median, mode"] },
    ],
    tips: ["Dosage calculation is heavily tested -- practise converting mg to mcg, mL to L, lbs to kg daily.", "Roman numerals appear frequently -- memorise I, V, X, L, C, D, M.", "The on-screen calculator is basic -- practise without it so you are not dependent."],
  },
  {
    name: "Science",
    questions: 50,
    scored: 44,
    unscored: 6,
    time: "60 min",
    weight: "31%",
    color: "#f59e0b",
    bg: "rgba(245,158,11,.08)",
    border: "rgba(245,158,11,.2)",
    icon: "S",
    desc: "The largest and most heavily weighted section. Human Anatomy & Physiology dominates -- this is the section that most separates competitive applicants from average ones.",
    topics: [
      { name: "Human anatomy & physiology", pct: "68-74%", items: ["Cardiovascular system", "Respiratory system", "Nervous system", "Musculoskeletal system", "Integumentary system", "Endocrine system", "Gastrointestinal system", "Renal system", "Reproductive system", "Immune/lymphatic system"] },
      { name: "Life and physical sciences", pct: "13-20%", items: ["Cell biology and genetics", "Microbiology basics", "Chemistry -- atoms, compounds, reactions", "Physics -- motion, energy, waves"] },
      { name: "Scientific reasoning", pct: "12-16%", items: ["Scientific method", "Experimental design", "Data interpretation", "Variables -- independent vs dependent", "Drawing conclusions"] },
    ],
    tips: ["A&P is king -- spend 60% of your science study time here.", "Prioritise the systems in order: cardiovascular, respiratory, nervous, renal.", "For each system: know the structure, function, and what happens when it fails."],
  },
  {
    name: "English & Language Usage",
    questions: 37,
    scored: 33,
    unscored: 4,
    time: "37 min",
    weight: "16%",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,.08)",
    border: "rgba(139,92,246,.2)",
    icon: "E",
    desc: "Tests grammar, punctuation, vocabulary, and sentence structure. The shortest section -- but often overlooked. Strong scores here can significantly boost your composite.",
    topics: [
      { name: "Conventions of standard English", pct: "45-55%", items: ["Subject-verb agreement", "Punctuation -- commas, semicolons, apostrophes", "Capitalization rules", "Sentence fragments and run-ons", "Parallel structure"] },
      { name: "Knowledge of language", pct: "20-30%", items: ["Formal vs informal register", "Clarity and conciseness", "Transition words", "Combining sentences", "Avoiding redundancy"] },
      { name: "Vocabulary acquisition", pct: "20-30%", items: ["Context clues", "Word roots and affixes", "Medical terminology prefixes/suffixes", "Synonyms and antonyms"] },
    ],
    tips: ["Medical terminology prefixes appear frequently -- learn: brady-, tachy-, hypo-, hyper-, -ectomy, -itis, -plasty.", "For grammar questions: read the sentence aloud in your head -- your ear usually catches errors.", "This section is only 37 minutes -- pace yourself at roughly 1 minute per question."],
  },
];

const scoreLevels = [
  { level: "Exemplary", range: "92 - 100%", color: "#10b981", bg: "#ecfdf5", border: "#a7f3d0", desc: "Top 5% of all test-takers. Highly competitive for any nursing programme nationwide. Accelerated BSN and direct-entry MSN programmes.", note: "Aim here" },
  { level: "Advanced", range: "80 - 91.3%", color: "#0ea5e9", bg: "#ecfeff", border: "#a5f3fc", desc: "Top 10-20%. Competitive for BSN programmes. Most state university nursing programmes will accept Advanced scores.", note: "Target" },
  { level: "Proficient", range: "58.7 - 79.3%", color: "#f59e0b", bg: "#fffbeb", border: "#fde68a", desc: "Meets minimum requirements for most ADN and BSN programmes. Typical range for community college applicants.", note: "Minimum" },
  { level: "Basic", range: "40.7 - 58%", color: "#f97316", bg: "#fff7ed", border: "#fed7aa", desc: "Below competitive threshold for most programmes. Accepted at some community colleges. Retake strongly recommended.", note: "Retake" },
  { level: "Developmental", range: "Below 40.7%", color: "#ef4444", bg: "#fff1f2", border: "#fecdd3", desc: "Not yet ready for nursing school admission. Significant additional preparation required before retaking.", note: "Not ready" },
];

const programTargets = [
  { type: "Community College ADN", min: "55-65%", target: "68-72%", color: "#10b981" },
  { type: "BSN (State University)", min: "65-75%", target: "78-82%", color: "#0ea5e9" },
  { type: "Competitive BSN", min: "75-80%", target: "85-90%", color: "#f59e0b" },
  { type: "Accelerated BSN / Direct-Entry MSN", min: "80-85%", target: "88-95%", color: "#8b5cf6" },
];

const studyPlan = [
  {
    week: "Week 1",
    title: "Diagnostic + Foundations",
    color: "#0ea5e9",
    tasks: [
      "Take a full TEAS 7 practice test -- do not study first. This is your baseline.",
      "Analyse section scores -- identify your lowest and highest performing areas.",
      "Begin A&P review: cardiovascular, respiratory, and nervous systems.",
      "Start maths: fractions, decimals, percentages, and basic algebra review.",
    ],
  },
  {
    week: "Week 2",
    title: "Science Deep Dive",
    color: "#f59e0b",
    tasks: [
      "Continue A&P: renal, endocrine, musculoskeletal, and GI systems.",
      "Cell biology, genetics, and microbiology basics.",
      "Chemistry fundamentals: atoms, bonds, pH, and basic reactions.",
      "50 science questions daily -- review every wrong answer with notes.",
    ],
  },
  {
    week: "Week 3",
    title: "Maths Mastery",
    color: "#10b981",
    tasks: [
      "Dosage calculations daily -- at least 20 problems per day.",
      "Unit conversions: metric ↔ imperial, military time, Roman numerals.",
      "Ratio and proportion word problems.",
      "Data interpretation: graphs, tables, and basic statistics.",
    ],
  },
  {
    week: "Week 4",
    title: "Reading + English",
    color: "#8b5cf6",
    tasks: [
      "Reading: main idea, inference, author's purpose -- 30 min daily passage practice.",
      "Grammar: subject-verb agreement, punctuation, sentence structure.",
      "Vocabulary: medical prefixes/suffixes, context clues, word roots.",
      "Full practice test mid-week -- compare to Week 1 baseline.",
    ],
  },
  {
    week: "Week 5",
    title: "Targeted Weak Areas",
    color: "#ef4444",
    tasks: [
      "Dedicate 70% of study time to your two lowest-scoring sections.",
      "Review all previously incorrect questions from weeks 1-4.",
      "Full practice test on Day 5 -- target score should be 5-10 points above Week 1.",
      "Adjust remaining study time based on latest results.",
    ],
  },
  {
    week: "Week 6",
    title: "Final Prep + Exam Day",
    color: "#d97706",
    tasks: [
      "Light review only -- notes, flashcards, and key A&P diagrams.",
      "Final full practice test on Day 3 -- should be at or above your target score.",
      "Day before exam: no new material, rest well, review logistics.",
      "Exam day: arrive 15 min early, government ID, take the optional break.",
    ],
  },
];

const retakeRules = [
  { rule: "Attempts per year", detail: "Maximum 3 attempts per calendar year" },
  { rule: "Wait between attempts", detail: "Minimum 30-day waiting period" },
  { rule: "Score validity", detail: "Scores valid for 2 years from test date (verify with each school)" },
  { rule: "Cost per attempt", detail: "$100-$150 per attempt depending on testing location" },
  { rule: "Best score policy", detail: "Most schools accept your highest score -- some require most recent" },
];

export default async function TEAS7Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <>
      <style>{fontStyle}</style>
      <main style={{ background: "#f6f8fc", minHeight: "100vh" }}>

        {/* ── HERO ── */}
        <section style={{ background: "linear-gradient(160deg,#1a1200 0%,#2d1f00 50%,#1a2d10 100%)", padding: "80px 40px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1800&q=80')`, backgroundSize: "cover", backgroundPosition: "center", opacity: .1 }} />
          <div style={{ position: "absolute", top: "-80px", right: "8%", width: "500px", height: "500px", background: "radial-gradient(circle,rgba(245,158,11,.14) 0%,transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-40px", left: "5%", width: "300px", height: "300px", background: "radial-gradient(circle,rgba(16,185,129,.08) 0%,transparent 65%)", pointerEvents: "none" }} />

          <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            {/* breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
              <Link href="/courses/pre-nursing" style={{ fontSize: "13px", color: "#78716c", textDecoration: "none", fontWeight: 500, transition: "color .15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fbbf24")}
                onMouseLeave={e => (e.currentTarget.style.color = "#78716c")}>Pre-Nursing</Link>
              <span style={{ color: "#57534e", fontSize: "13px" }}>›</span>
              <span style={{ fontSize: "13px", color: "#fbbf24", fontWeight: 600 }}>TEAS 7 Deep Dive</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "48px", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(245,158,11,.14)", border: "1px solid rgba(245,158,11,.3)", color: "#fcd34d", fontSize: "11px", fontWeight: 700, padding: "5px 14px", borderRadius: "100px", letterSpacing: ".1em", marginBottom: "20px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f59e0b" }} />
                  ATI TEAS 7 . 170 Questions . 209 Minutes
                </div>
                <h1 className="fd" style={{ fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 700, color: "#fef3c7", lineHeight: 1.1, marginBottom: "16px" }}>
                  TEAS 7 Complete Guide<br />
                  <span style={{ color: "#fbbf24", fontStyle: "italic" }}>Ace your nursing entrance exam.</span>
                </h1>
                <p style={{ fontSize: "16px", color: "#a8a29e", fontWeight: 400, lineHeight: 1.8, maxWidth: "620px", marginBottom: "32px" }}>
                  The definitive breakdown of every TEAS 7 section -- Reading, Mathematics, Science, and English -- with 2026 score requirements, topic-by-topic content guides, a 6-week study plan, and strategy tips from nurses who scored in the 90th percentile.
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link href={user ? "/quiz" : "/auth/signup"}
                    style={{ background: "#f59e0b", color: "#1c1400", padding: "14px 28px", borderRadius: "12px", fontSize: "14px", fontWeight: 800, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", boxShadow: "0 8px 24px rgba(245,158,11,.35)", transition: "all .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#fbbf24"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#f59e0b"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    Start TEAS 7 practice
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                  <Link href="/courses/pre-nursing"
                    style={{ background: "rgba(255,255,255,.07)", color: "#e7e5e4", border: "1px solid rgba(255,255,255,.14)", padding: "14px 28px", borderRadius: "12px", fontSize: "14px", fontWeight: 600, textDecoration: "none", transition: "all .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.13)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    Pre-Nursing overview
                  </Link>
                  <Link href="/courses/pre-nursing/hesi-a2"
                    style={{ background: "rgba(255,255,255,.07)", color: "#e7e5e4", border: "1px solid rgba(255,255,255,.14)", padding: "14px 28px", borderRadius: "12px", fontSize: "14px", fontWeight: 600, textDecoration: "none", transition: "all .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.13)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    Compare with HESI A2 ->
                  </Link>
                </div>
              </div>

              {/* quick stats card */}
              <div style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "20px", padding: "24px 28px", minWidth: "240px" }}>
                <p style={{ fontSize: "10px", fontWeight: 700, color: "#78716c", letterSpacing: ".16em", textTransform: "uppercase", marginBottom: "16px" }}>Exam at a Glance</p>
                {[
                  { label: "Total questions", val: "170 (150 scored)" },
                  { label: "Total time", val: "209 minutes" },
                  { label: "Sections", val: "4" },
                  { label: "Calculator", val: "4-function (on-screen)" },
                  { label: "Score range", val: "0 - 100%" },
                  { label: "Retakes", val: "3 per year, 30-day wait" },
                  { label: "Score valid", val: "2 years" },
                  { label: "Cost per attempt", val: "$100 - $150" },
                ].map(f => (
                  <div key={f.label} style={{ display: "flex", justifyContent: "space-between", gap: "12px", paddingBottom: "10px", marginBottom: "10px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                    <span style={{ fontSize: "12px", color: "#78716c", fontWeight: 400 }}>{f.label}</span>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#fef3c7", textAlign: "right" }}>{f.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* wave */}
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px", background: "#f6f8fc" }}>
          <path d="M0,30 C360,70 1080,-10 1440,30 L1440,0 L0,0 Z" fill="#2d1f00" />
        </svg>

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 40px" }}>

          {/* ── SECTION OVERVIEW ── */}
          <section style={{ marginBottom: "80px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#d97706", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>Exam Structure</p>
            <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: "#0f172a", lineHeight: 1.2, marginBottom: "8px" }}>
              4 sections. 209 minutes. One goal.
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", fontWeight: 400, lineHeight: 1.75, marginBottom: "36px", maxWidth: "680px" }}>
              The TEAS 7 tests four core academic areas. Science carries the most weight and is the hardest section for most students -- it deserves the most study time.
            </p>

            {/* section summary bar */}
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "20px 24px", marginBottom: "32px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0" }}>
              {sections.map((s, i) => (
                <div key={s.name} style={{ textAlign: "center", padding: "12px 16px", borderRight: i < 3 ? "1px solid #f1f5f9" : "none" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: s.bg, border: `1px solid ${s.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", fontSize: "14px", fontWeight: 800, color: s.color }}>{s.icon}</div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{s.name}</p>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: "3px 0" }}>{s.questions} questions . {s.time}</p>
                  <span style={{ fontSize: "11px", fontWeight: 700, background: s.bg, color: s.color, border: `1px solid ${s.border}`, padding: "2px 10px", borderRadius: "100px" }}>{s.weight} of exam</span>
                </div>
              ))}
            </div>

            {/* detailed section cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {sections.map((s) => (
                <div key={s.name} style={{ background: "#fff", border: `1px solid ${s.border}`, borderRadius: "20px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,.04)", transition: "all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,.09)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,.04)"; e.currentTarget.style.transform = "translateY(0)"; }}>

                  {/* top bar */}
                  <div style={{ height: "3px", background: s.color }} />

                  {/* header */}
                  <div style={{ padding: "24px 28px 20px", borderBottom: `1px solid ${s.border}`, background: s.bg, display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "16px", alignItems: "center" }}>
                    <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "#fff", border: `1.5px solid ${s.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: 800, color: s.color }}>{s.icon}</div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                        <h3 className="fd" style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>{s.name}</h3>
                        <span style={{ fontSize: "11px", fontWeight: 700, background: "#fff", color: s.color, border: `1px solid ${s.border}`, padding: "2px 10px", borderRadius: "100px" }}>{s.weight} of exam</span>
                      </div>
                      <p style={{ fontSize: "13px", color: "#64748b", margin: 0, fontWeight: 400 }}>{s.desc}</p>
                    </div>
                    <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
                      {[
                        { label: "Questions", val: `${s.scored} scored` },
                        { label: "Time", val: s.time },
                      ].map(m => (
                        <div key={m.label} style={{ textAlign: "center", background: "#fff", border: `1px solid ${s.border}`, borderRadius: "10px", padding: "10px 14px" }}>
                          <p style={{ fontSize: "13px", fontWeight: 700, color: s.color, margin: 0 }}>{m.val}</p>
                          <p style={{ fontSize: "10px", color: "#94a3b8", margin: "2px 0 0" }}>{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* topics + tips */}
                  <div style={{ padding: "24px 28px", display: "grid", gridTemplateColumns: "1fr auto", gap: "32px" }}>
                    {/* topics */}
                    <div>
                      <p style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "14px" }}>Topics Covered</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {s.topics.map(t => (
                          <div key={t.name}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                              <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{t.name}</p>
                              <span style={{ fontSize: "10px", fontWeight: 700, background: s.bg, color: s.color, border: `1px solid ${s.border}`, padding: "1px 8px", borderRadius: "100px" }}>{t.pct}</span>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingLeft: "16px" }}>
                              {t.items.map(item => (
                                <span key={item} style={{ fontSize: "12px", background: "#f8fafc", color: "#475569", border: "1px solid #e2e8f0", padding: "3px 10px", borderRadius: "100px", fontWeight: 400 }}>{item}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* strategy tips */}
                    <div style={{ minWidth: "260px", maxWidth: "280px" }}>
                      <p style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "14px" }}>Strategy Tips</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {s.tips.map((tip, i) => (
                          <div key={i} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: "12px", padding: "12px 14px", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                            <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: s.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                              <span style={{ fontSize: "10px", fontWeight: 800, color: "#fff" }}>{i + 1}</span>
                            </div>
                            <p style={{ fontSize: "12px", color: "#475569", fontWeight: 400, lineHeight: 1.6, margin: 0 }}>{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── SCORE LEVELS ── */}
          <section style={{ marginBottom: "80px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#d97706", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>Scoring</p>
            <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: "#0f172a", lineHeight: 1.2, marginBottom: "8px" }}>
              What your TEAS score means
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", fontWeight: 400, lineHeight: 1.75, marginBottom: "36px", maxWidth: "680px" }}>
              There is no universal passing score -- each nursing programme sets its own minimum. ATI classifies scores into five Academic Preparedness Levels. Aim for at least 10-15% above your target school's stated minimum.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "14px", marginBottom: "40px" }}>
              {scoreLevels.map(l => (
                <div key={l.level} style={{ background: "#fff", border: `1.5px solid ${l.border}`, borderRadius: "16px", padding: "22px", boxShadow: "0 2px 10px rgba(0,0,0,.04)", transition: "all .25s", position: "relative" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,.09)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,.04)"; }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: l.color, borderRadius: "16px 16px 0 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                    <p style={{ fontSize: "14px", fontWeight: 800, color: l.color, margin: 0 }}>{l.level}</p>
                    <span style={{ fontSize: "9px", fontWeight: 700, background: l.bg, color: l.color, border: `1px solid ${l.border}`, padding: "2px 8px", borderRadius: "100px" }}>{l.note}</span>
                  </div>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>{l.range}</p>
                  <p style={{ fontSize: "12px", color: "#64748b", fontWeight: 400, lineHeight: 1.6 }}>{l.desc}</p>
                </div>
              ))}
            </div>

            {/* programme targets */}
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", overflow: "hidden" }}>
              <div style={{ padding: "18px 24px", borderBottom: "1px solid #f1f5f9", background: "#fafbfc" }}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Score targets by programme type</p>
                <p style={{ fontSize: "12px", color: "#94a3b8", margin: "2px 0 0" }}>Rule of thumb: aim 10-15% above the stated minimum to remain competitive</p>
              </div>
              {programTargets.map((p, i) => (
                <div key={p.type} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "16px", padding: "16px 24px", borderBottom: i < programTargets.length - 1 ? "1px solid #f1f5f9" : "none", alignItems: "center", transition: "background .15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#fafbfc")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", margin: 0 }}>{p.type}</p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>Minimum</p>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#64748b", margin: 0 }}>{p.min}</p>
                  </div>
                  <div style={{ textAlign: "center", background: p.color + "12", border: `1px solid ${p.color}30`, borderRadius: "10px", padding: "8px 16px" }}>
                    <p style={{ fontSize: "11px", color: p.color, margin: 0, fontWeight: 600 }}>Your target</p>
                    <p style={{ fontSize: "14px", fontWeight: 800, color: p.color, margin: 0 }}>{p.target}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 6-WEEK STUDY PLAN ── */}
          <section style={{ marginBottom: "80px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#d97706", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>Study Plan</p>
            <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: "#0f172a", lineHeight: 1.2, marginBottom: "8px" }}>
              6-week TEAS 7 study plan
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", fontWeight: 400, lineHeight: 1.75, marginBottom: "36px", maxWidth: "680px" }}>
              Six weeks is the recommended preparation time for most students. The plan front-loads Science because it carries the most weight, then works through Maths, Reading, and English before a targeted final review.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "16px" }}>
              {studyPlan.map((w, i) => (
                <div key={w.week} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "18px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,.04)", transition: "all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,.09)"; e.currentTarget.style.borderColor = w.color + "40"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,.04)"; e.currentTarget.style.borderColor = "#e2e8f0"; }}>
                  <div style={{ height: "3px", background: w.color }} />
                  <div style={{ padding: "20px 22px 16px", borderBottom: "1px solid #f1f5f9", background: w.color + "08", display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: w.color + "18", border: `1px solid ${w.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "13px", fontWeight: 800, color: w.color }}>{i + 1}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: "10px", fontWeight: 700, color: w.color, letterSpacing: ".12em", textTransform: "uppercase", margin: 0 }}>{w.week}</p>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{w.title}</p>
                    </div>
                  </div>
                  <div style={{ padding: "16px 22px" }}>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                      {w.tasks.map((task, ti) => (
                        <li key={ti} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                          <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: w.color + "18", border: `1px solid ${w.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: w.color }} />
                          </div>
                          <p style={{ fontSize: "13px", color: "#475569", fontWeight: 400, lineHeight: 1.6, margin: 0 }}>{task}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── RETAKE RULES ── */}
          <section style={{ marginBottom: "80px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#d97706", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>Retake Policy</p>
            <h2 className="fd" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, color: "#0f172a", lineHeight: 1.2, marginBottom: "24px" }}>
              Didn't hit your target score? Here's what to know.
            </h2>
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", overflow: "hidden" }}>
              {retakeRules.map((r, i) => (
                <div key={r.rule} style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "0", borderBottom: i < retakeRules.length - 1 ? "1px solid #f1f5f9" : "none", transition: "background .15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#fafbfc")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <div style={{ padding: "16px 20px", borderRight: "1px solid #f1f5f9" }}>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{r.rule}</p>
                  </div>
                  <div style={{ padding: "16px 20px" }}>
                    <p style={{ fontSize: "13px", color: "#475569", fontWeight: 400, margin: 0 }}>{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "16px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "12px", padding: "16px 20px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                <span style={{ fontSize: "11px", fontWeight: 800, color: "#fff" }}>!</span>
              </div>
              <p style={{ fontSize: "13px", color: "#92400e", fontWeight: 400, lineHeight: 1.65, margin: 0 }}>
                <strong>Important:</strong> Always verify retake policies and score validity directly with each nursing school you are applying to. Some programmes require the most recent score rather than your highest -- check before you retest.
              </p>
            </div>
          </section>

          {/* ── CTA ── */}
          <section style={{ background: "linear-gradient(160deg,#1a1200 0%,#2d1f00 60%,#1a2800 100%)", borderRadius: "24px", padding: "60px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "500px", background: "radial-gradient(circle,rgba(245,158,11,.12) 0%,transparent 65%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80')`, backgroundSize: "cover", backgroundPosition: "center", opacity: .07 }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 700, color: "#fef3c7", lineHeight: 1.2, marginBottom: "16px" }}>
                Your TEAS 7 score opens the door.<br />
                <span style={{ color: "#fbbf24", fontStyle: "italic" }}>Let's get you through it.</span>
              </h2>
              <p style={{ fontSize: "16px", color: "#a8a29e", fontWeight: 400, lineHeight: 1.8, marginBottom: "36px", maxWidth: "540px", margin: "0 auto 36px" }}>
                Start practising with real TEAS 7 style questions -- Reading, Maths, Science, and English -- all with full rationales. Free to begin, no credit card needed.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
                <Link href={user ? "/quiz" : "/auth/signup"}
                  style={{ background: "#f59e0b", color: "#1c1400", padding: "16px 36px", borderRadius: "13px", fontSize: "15px", fontWeight: 800, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", boxShadow: "0 8px 28px rgba(245,158,11,.35)", transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#fbbf24"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#f59e0b"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  {user ? "Go to practice questions ->" : "Start free -- no card needed ->"}
                </Link>
                <Link href="/courses/pre-nursing/hesi-a2"
                  style={{ background: "rgba(255,255,255,.08)", color: "#e7e5e4", border: "1px solid rgba(255,255,255,.15)", padding: "16px 32px", borderRadius: "13px", fontSize: "15px", fontWeight: 600, textDecoration: "none", transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.14)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  Compare with HESI A2 ->
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}