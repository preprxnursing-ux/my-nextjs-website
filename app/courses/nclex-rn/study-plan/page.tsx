import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  *, body { font-family: 'Plus Jakarta Sans', sans-serif; }
  .fd { font-family: 'Cormorant Garamond', Georgia, serif; }
`;

const plans = [
  {
    id: "4-week",
    weeks: 4,
    label: "4-Week Intensive",
    subtitle: "For recent graduates confident in fundamentals",
    color: "#f59e0b",
    bg: "rgba(245,158,11,.08)",
    border: "rgba(245,158,11,.25)",
    badgeBg: "#fef3c7",
    badgeColor: "#92400e",
    hoursPerDay: "4-5",
    questionsPerDay: "100-120",
    restDays: "2 per week",
    ideal: "Just graduated . Strong foundation . Exam within 30 days",
    phases: [
      {
        week: "Week 1",
        title: "Diagnostics & Foundations",
        color: "#f59e0b",
        days: [
          { day: "Mon", focus: "CAT Baseline Assessment", detail: "Full diagnostic test . Identify 3 weakest areas . Set daily score targets" },
          { day: "Tue", focus: "Fluids & Electrolytes", detail: "Na, K, Ca, Mg imbalances . IV fluid types . ABG interpretation basics" },
          { day: "Wed", focus: "Pharmacology Foundations", detail: "Drug classifications . Safe dosage calculations . High-alert medications" },
          { day: "Thu", focus: "Safety & Infection Control", detail: "Standard precautions . Transmission-based isolation . RACE/PASS protocols" },
          { day: "Fri", focus: "Management of Care", detail: "Delegation rules . Priority setting . Informed consent . Advance directives" },
          { day: "Sat", focus: "Readiness Assessment #1", detail: "85-question timed CAT . Review all rationales . Update weak area list" },
          { day: "Sun", focus: "Rest & Light Review", detail: "Rest day . Optional flashcard review only . 30 mins maximum" },
        ],
      },
      {
        week: "Week 2",
        title: "Medical-Surgical Systems",
        color: "#0ea5e9",
        days: [
          { day: "Mon", focus: "Cardiovascular", detail: "Heart failure . MI . Dysrhythmias . 12-lead ECG basics . Hemodynamics" },
          { day: "Tue", focus: "Respiratory", detail: "COPD . Pneumonia . ARDS . Mechanical ventilation . Chest tubes" },
          { day: "Wed", focus: "Neurological", detail: "Stroke . ICP . Seizures . GCS scale . Spinal cord injury priorities" },
          { day: "Thu", focus: "Renal & Endocrine", detail: "AKI vs CKD . Dialysis . Diabetes management . Thyroid/adrenal disorders" },
          { day: "Fri", focus: "GI & Musculoskeletal", detail: "GI bleeding . Liver failure . Hip fracture care . Compartment syndrome" },
          { day: "Sat", focus: "Readiness Assessment #2", detail: "85-question timed CAT . Focus on med-surg topics . Track improvement" },
          { day: "Sun", focus: "Rest Day", detail: "Full rest . No studying . Self-care and stress management" },
        ],
      },
      {
        week: "Week 3",
        title: "Specialties & NGN Formats",
        color: "#8b5cf6",
        days: [
          { day: "Mon", focus: "Maternal & Newborn", detail: "Antepartum complications . Labour stages . Postpartum hemorrhage . Newborn assessment" },
          { day: "Tue", focus: "Paediatric Nursing", detail: "Growth milestones . Respiratory emergencies . Fever management . Vaccination schedules" },
          { day: "Wed", focus: "Mental Health Nursing", detail: "Therapeutic communication . Crisis intervention . Psychotropic medications . Suicide risk" },
          { day: "Thu", focus: "NGN Question Formats", detail: "Bowtie . Matrix . Unfolding case studies . Extended drag-and-drop practice" },
          { day: "Fri", focus: "Oncology & Immunology", detail: "Chemo side effects . Neutropenic precautions . Blood transfusion reactions" },
          { day: "Sat", focus: "Readiness Assessment #3", detail: "Full 130-question CAT . Must score High or Very High to proceed . Deep review" },
          { day: "Sun", focus: "Rest Day", detail: "Full rest . Prepare mindset for final week . Light walks, good sleep" },
        ],
      },
      {
        week: "Week 4",
        title: "Final Review & Exam Readiness",
        color: "#10b981",
        days: [
          { day: "Mon", focus: "Prioritisation & Delegation", detail: "ABC priority framework . Maslow's hierarchy . What RN can never delegate" },
          { day: "Tue", focus: "Pharmacology Mastery", detail: "High-yield drug classes . Antidotes . SATA pharm questions . Dosage drills" },
          { day: "Wed", focus: "Weak Area Intensive", detail: "Revisit your 3 lowest-scoring categories . 100 targeted questions per area" },
          { day: "Thu", focus: "Final CAT Assessment #4", detail: "Must score Very High . Full 150-question simulation . 5-hour timed exam" },
          { day: "Fri", focus: "Strategy & Test-Taking", detail: "Answer elimination . NGN stem reading . Time management . Rest protocol" },
          { day: "Sat", focus: "Light Review Only", detail: "Notes and flashcards only . No new questions . Sleep by 9 PM" },
          { day: "Sun", focus: "Exam Day", detail: "Arrive 30 min early . Bring valid ID . Trust your preparation . You are ready" },
        ],
      },
    ],
  },
  {
    id: "6-week",
    weeks: 6,
    label: "6-Week Comprehensive",
    subtitle: "Most popular -- balanced pace for first-time takers",
    color: "#0ea5e9",
    bg: "rgba(14,165,233,.08)",
    border: "rgba(14,165,233,.25)",
    badgeBg: "#dbeafe",
    badgeColor: "#1e40af",
    hoursPerDay: "3-4",
    questionsPerDay: "75-100",
    restDays: "2 per week",
    ideal: "First-time taker . Moderate confidence . Standard timeline",
    phases: [
      { week: "Week 1-2", title: "Foundations & Safety", color: "#0ea5e9", days: [
        { day: "Week 1", focus: "Diagnostic + Fundamentals", detail: "Baseline CAT . Lab values . Fluids & electrolytes . Acid-base balance . Wound care" },
        { day: "Week 2", focus: "Safety, Pharm & Management", detail: "Infection control . Drug calculations . Delegation . Informed consent . Legal issues" },
      ]},
      { week: "Week 3-4", title: "Medical-Surgical Deep Dive", color: "#38bdf8", days: [
        { day: "Week 3", focus: "Cardiovascular, Respiratory, Neuro", detail: "All major cardiac conditions . Respiratory emergencies . Neuro assessment priorities" },
        { day: "Week 4", focus: "Renal, Endocrine, GI, Musculoskeletal", detail: "AKI . Diabetes . GI emergencies . Orthopaedic care . Post-op complications" },
      ]},
      { week: "Week 5", title: "Specialties", color: "#8b5cf6", days: [
        { day: "Week 5", focus: "OB, Paediatrics, Mental Health, Oncology", detail: "High-risk OB . Paediatric emergencies . Psych medications . Chemo protocols" },
      ]},
      { week: "Week 6", title: "NGN Mastery & Final Push", color: "#10b981", days: [
        { day: "Week 6", focus: "NGN Formats + CAT Simulations + Exam Day", detail: "Bowtie . Matrix . Case studies . 4 full readiness assessments . Final strategy session" },
      ]},
    ],
  },
  {
    id: "8-week",
    weeks: 8,
    label: "8-Week Balanced",
    subtitle: "For working nurses or those who want thorough preparation",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,.08)",
    border: "rgba(139,92,246,.25)",
    badgeBg: "#ede9fe",
    badgeColor: "#4c1d95",
    hoursPerDay: "2-3",
    questionsPerDay: "50-75",
    restDays: "3 per week",
    ideal: "Working 3Ã—12 shifts . Want thorough review . More time available",
    phases: [
      { week: "Week 1-2", title: "Foundations", color: "#8b5cf6", days: [
        { day: "Week 1", focus: "Diagnostic + Lab Values + Safety", detail: "Baseline assessment . Critical lab values . Infection control protocols . Legal/ethical" },
        { day: "Week 2", focus: "Pharmacology & Calculations", detail: "All drug classifications . Dosage calculation practice . High-alert medications . Antidotes" },
      ]},
      { week: "Week 3-5", title: "Medical-Surgical Body Systems", color: "#a78bfa", days: [
        { day: "Week 3", focus: "Cardiovascular & Respiratory", detail: "Complete cardiac review . Rhythm interpretation . Respiratory failure . Ventilator management" },
        { day: "Week 4", focus: "Neurological & Renal", detail: "Stroke protocols . ICP management . AKI vs CKD . Dialysis types . Electrolyte emergencies" },
        { day: "Week 5", focus: "Endocrine, GI & Musculoskeletal", detail: "Diabetes emergencies . GI bleeding . Liver failure . Fractures . Compartment syndrome" },
      ]},
      { week: "Week 6-7", title: "Specialties", color: "#c084fc", days: [
        { day: "Week 6", focus: "OB/Maternity & Paediatrics", detail: "Antepartum . Intrapartum complications . Newborn care . Paediatric emergencies . Vaccines" },
        { day: "Week 7", focus: "Mental Health & Community Health", detail: "Therapeutic communication . Crisis intervention . Psych meds . Community nursing priorities" },
      ]},
      { week: "Week 8", title: "Final Review & NGN Mastery", color: "#10b981", days: [
        { day: "Week 8", focus: "NGN + Final CAT Simulations + Exam Day", detail: "All NGN question types . 4 consecutive Very High readiness scores . Final strategy review" },
      ]},
    ],
  },
];

const ngnFormats = [
  { name: "Multiple Choice (MCQ)", weight: "~50% of exam", color: "#0ea5e9", bg: "rgba(14,165,233,.08)", border: "rgba(14,165,233,.2)", desc: "Single best answer from 4 options. Tests knowledge application and clinical judgement.", tip: "Eliminate 2 wrong answers first. Look for the most complete and safe option." },
  { name: "Select All That Apply (SATA)", weight: "~20% of exam", color: "#8b5cf6", bg: "rgba(139,92,246,.08)", border: "rgba(139,92,246,.2)", desc: "Select every correct answer -- partial credit with new NGN scoring model.", tip: "Treat each option as a true/false statement. Never guess -- only select what you know is correct." },
  { name: "Bowtie Questions", weight: "~10% of exam", color: "#f59e0b", bg: "rgba(245,158,11,.08)", border: "rgba(245,158,11,.2)", desc: "Identify condition, actions to take, and parameters to monitor from a case scenario.", tip: "Read the case stem twice. Identify the priority condition before selecting actions." },
  { name: "Matrix / Grid", weight: "~10% of exam", color: "#10b981", bg: "rgba(16,185,129,.08)", border: "rgba(16,185,129,.2)", desc: "Match multiple conditions to multiple categories simultaneously in a table format.", tip: "Complete rows you are certain about first. Use process of elimination for the rest." },
  { name: "Unfolding Case Studies", weight: "~6 sets (18 items)", color: "#ef4444", bg: "rgba(239,68,68,.08)", border: "rgba(239,68,68,.2)", desc: "3 items per case study that unfold progressively -- each answer builds on the last.", tip: "Re-read the entire updated scenario before answering each follow-up question." },
  { name: "Trend / Highlight Items", weight: "~5% of exam", color: "#ec4899", bg: "rgba(236,72,153,.08)", border: "rgba(236,72,153,.2)", desc: "Identify worsening trends in lab values or vitals, or highlight text in a passage.", tip: "Look for direction of change -- not just abnormal values. Ask: is this getting worse?" },
];

const examFacts = [
  { label: "Minimum questions", value: "70", note: "CAT adaptive" },
  { label: "Maximum questions", value: "135", note: "Includes 15 pretest" },
  { label: "Time limit", value: "5 hours", note: "Including optional break" },
  { label: "Passing standard", value: "0.00 logits", note: "Effective until Mar 31 2026" },
  { label: "NGN case studies", value: "18 items", note: "3 sets of 6 items" },
  { label: "Test plan effective", value: "Apr 1 2026", note: "Minor renaming only" },
];

const weeklyHabits = [
  { title: "Morning block", time: "2 hrs", desc: "Content review -- read notes, watch video rationales, review weak areas from previous day." },
  { title: "Afternoon block", time: "1-2 hrs", desc: "Practice questions -- 50-75 questions in timed mode. No looking up answers during the block." },
  { title: "Evening review", time: "30-45 min", desc: "Rationale review -- go through every wrong answer and understand the clinical reasoning." },
  { title: "Weekly CAT", time: "2.5 hrs", desc: "One full readiness assessment per week. Track your score trajectory -- aim for consistent improvement." },
];

export default async function NCLEXStudyPlanPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <>
      <style>{fontStyle}</style>
      <main style={{ background: "#f6f8fc", minHeight: "100vh" }}>

        {/* â”€â”€ HERO â”€â”€ */}
        <section style={{ background: "linear-gradient(160deg,#0d1f35 0%,#0f2540 55%,#0a2a45 100%)", padding: "80px 40px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1800&q=80')`, backgroundSize: "cover", backgroundPosition: "center", opacity: .1 }} />
          <div style={{ position: "absolute", top: "-60px", right: "5%", width: "400px", height: "400px", background: "radial-gradient(circle,rgba(14,165,233,.15) 0%,transparent 65%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            {/* breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
              <Link href="/courses/nclex-rn" style={{ fontSize: "13px", color: "#64748b", textDecoration: "none", fontWeight: 500 }}
                onMouseEnter={e => (e.currentTarget.style.color = "#38bdf8")}
                onMouseLeave={e => (e.currentTarget.style.color = "#64748b")}>
                NCLEX-RN
              </Link>
              <span style={{ color: "#334155", fontSize: "13px" }}>â€º</span>
              <span style={{ fontSize: "13px", color: "#38bdf8", fontWeight: 600 }}>Study Plan</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "40px", alignItems: "center" }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(14,165,233,.12)", border: "1px solid rgba(14,165,233,.28)", color: "#7dd3fc", fontSize: "11px", fontWeight: 700, padding: "5px 14px", borderRadius: "100px", letterSpacing: ".1em", marginBottom: "20px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0ea5e9" }} />
                  2026 NCLEX-RN Test Plan . Updated April 2026
                </div>
                <h1 className="fd" style={{ fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.1, marginBottom: "16px" }}>
                  NCLEX-RN Study Plan<br />
                  <span style={{ color: "#38bdf8", fontStyle: "italic" }}>Built to pass first time.</span>
                </h1>
                <p style={{ fontSize: "16px", color: "#94a3b8", fontWeight: 400, lineHeight: 1.8, maxWidth: "600px", marginBottom: "32px" }}>
                  Three evidence-based study plans -- 4, 6, and 8 weeks -- aligned to the 2026 NCLEX-RN test plan. Each plan includes daily schedules, NGN question format guides, readiness checkpoints, and realistic daily hour targets.
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link href={user ? "/quiz/select?examType=RN" : "/auth/signup"}
                    style={{ background: "#0ea5e9", color: "#fff", padding: "14px 28px", borderRadius: "12px", fontSize: "14px", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", boxShadow: "0 8px 24px rgba(14,165,233,.3)", transition: "all .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#38bdf8"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#0ea5e9"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    Start practising now
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                  <Link href="/courses/nclex-rn"
                    style={{ background: "rgba(255,255,255,.08)", color: "#e2e8f0", border: "1px solid rgba(255,255,255,.15)", padding: "14px 28px", borderRadius: "12px", fontSize: "14px", fontWeight: 600, textDecoration: "none", transition: "all .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.14)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    Back to NCLEX-RN overview
                  </Link>
                </div>
              </div>

              {/* exam quick facts card */}
              <div style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "20px", padding: "24px 28px", minWidth: "260px" }}>
                <p style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", letterSpacing: ".16em", textTransform: "uppercase", marginBottom: "16px" }}>2026 Exam at a Glance</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {examFacts.map(f => (
                    <div key={f.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                      <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 400 }}>{f.label}</span>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontSize: "13px", fontWeight: 700, color: "#f1f5f9", margin: 0 }}>{f.value}</p>
                        <p style={{ fontSize: "10px", color: "#475569", margin: 0 }}>{f.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "18px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,.07)" }}>
                  <p style={{ fontSize: "11px", color: "#475569", fontWeight: 400, lineHeight: 1.6 }}>
                    Passing standard of 0.00 logits stays in effect. 2026 test plan brings minor category renaming only -- no new question types.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* wave */}
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px", background: "#f6f8fc" }}>
          <path d="M0,30 C360,70 1080,-10 1440,30 L1440,0 L0,0 Z" fill="#0d1f35" />
        </svg>

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 40px" }}>

          {/* â”€â”€ DAILY STRUCTURE â”€â”€ */}
          <section style={{ marginBottom: "80px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>Daily Study Structure</p>
            <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: "#0f172a", lineHeight: 1.2, marginBottom: "8px" }}>
              How to structure every study day
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", fontWeight: 400, lineHeight: 1.75, marginBottom: "36px", maxWidth: "680px" }}>
              Regardless of which plan you choose, the most effective daily routine splits study into three focused blocks -- content review in the morning, practice questions in the afternoon, and rationale review in the evening.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "16px" }}>
              {weeklyHabits.map((h, i) => (
                <div key={h.title} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "18px", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,.04)", transition: "all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,.09)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,.04)"; }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#0ea5e9", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "13px", fontWeight: 800 }}>{i + 1}</div>
                    <span style={{ fontSize: "12px", fontWeight: 700, background: "#dbeafe", color: "#1e40af", padding: "3px 10px", borderRadius: "100px" }}>{h.time}</span>
                  </div>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>{h.title}</h3>
                  <p style={{ fontSize: "13px", color: "#64748b", fontWeight: 400, lineHeight: 1.65 }}>{h.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* â”€â”€ STUDY PLANS â”€â”€ */}
          <section style={{ marginBottom: "80px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>Choose Your Plan</p>
            <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: "#0f172a", lineHeight: 1.2, marginBottom: "8px" }}>
              Three plans. One goal -- passing first time.
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", fontWeight: 400, lineHeight: 1.75, marginBottom: "48px", maxWidth: "680px" }}>
              Choose the plan that matches your timeline and confidence level. All three plans follow the same evidence-based progression -- foundations first, body systems second, specialties third, NGN mastery last.
            </p>

            {plans.map((plan) => (
              <div key={plan.id} style={{ marginBottom: "48px" }}>
                {/* plan header */}
                <div style={{ background: "#fff", border: `1.5px solid ${plan.border}`, borderRadius: "20px", padding: "28px 32px", marginBottom: "16px", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "24px", boxShadow: "0 2px 12px rgba(0,0,0,.04)" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                      <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: plan.bg, border: `1px solid ${plan.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "18px", fontWeight: 800, color: plan.color }}>{plan.weeks}</span>
                      </div>
                      <div>
                        <h3 className="fd" style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a", lineHeight: 1 }}>{plan.label}</h3>
                        <p style={{ fontSize: "13px", color: "#64748b", fontWeight: 400, marginTop: "2px" }}>{plan.subtitle}</p>
                      </div>
                    </div>
                    <p style={{ fontSize: "13px", color: "#475569", fontWeight: 500 }}>
                      <span style={{ color: plan.color }}>Best for:</span> {plan.ideal}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "16px", flexShrink: 0 }}>
                    {[
                      { label: "Hours/day", val: plan.hoursPerDay },
                      { label: "Questions/day", val: plan.questionsPerDay },
                      { label: "Rest days", val: plan.restDays },
                    ].map(s => (
                      <div key={s.label} style={{ textAlign: "center", background: plan.bg, border: `1px solid ${plan.border}`, borderRadius: "12px", padding: "12px 16px", minWidth: "80px" }}>
                        <p className="fd" style={{ fontSize: "1.2rem", fontWeight: 700, color: plan.color, lineHeight: 1 }}>{s.val}</p>
                        <p style={{ fontSize: "10px", color: "#64748b", marginTop: "4px", fontWeight: 500 }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* phases */}
                <div style={{ display: "grid", gridTemplateColumns: plan.id === "4-week" ? "1fr" : "repeat(auto-fit,minmax(280px,1fr))", gap: "14px" }}>
                  {plan.phases.map((phase) => (
                    <div key={phase.week} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,.04)" }}>
                      {/* phase header */}
                      <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9", background: `linear-gradient(135deg,${phase.color}12 0%,transparent 100%)`, display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: phase.color, flexShrink: 0 }} />
                        <div>
                          <p style={{ fontSize: "10px", fontWeight: 700, color: phase.color, letterSpacing: ".12em", textTransform: "uppercase", margin: 0 }}>{phase.week}</p>
                          <p style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{phase.title}</p>
                        </div>
                      </div>
                      {/* days */}
                      <div style={{ padding: "8px" }}>
                        {phase.days.map((day, di) => (
                          <div key={di} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "10px 12px", borderRadius: "10px", transition: "background .15s" }}
                            onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
                            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                            <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: `${phase.color}18`, border: `1px solid ${phase.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <span style={{ fontSize: "10px", fontWeight: 800, color: phase.color }}>{day.day.toUpperCase().slice(0, 3)}</span>
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: 0, lineHeight: 1.3 }}>{day.focus}</p>
                              <p style={{ fontSize: "11px", color: "#94a3b8", margin: "3px 0 0", fontWeight: 400, lineHeight: 1.5 }}>{day.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* â”€â”€ NGN QUESTION FORMATS â”€â”€ */}
          <section style={{ marginBottom: "80px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>NGN Question Types</p>
            <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: "#0f172a", lineHeight: 1.2, marginBottom: "8px" }}>
              Next Generation NCLEX formats explained
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", fontWeight: 400, lineHeight: 1.75, marginBottom: "36px", maxWidth: "680px" }}>
              The 2026 NCLEX-RN continues the NGN framework introduced in 2023. These question types test clinical judgement more deeply than traditional MCQs. Here is what to expect and how to approach each format.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "16px" }}>
              {ngnFormats.map(f => (
                <div key={f.name} style={{ background: "#fff", border: `1px solid ${f.border}`, borderRadius: "18px", padding: "24px", boxShadow: "0 2px 10px rgba(0,0,0,.04)", transition: "all .25s", position: "relative", overflow: "hidden" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,.09)`; e.currentTarget.style.borderColor = f.color + "60"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,.04)"; e.currentTarget.style.borderColor = f.border; }}>
                  {/* top bar */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: f.color }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", lineHeight: 1.3, maxWidth: "160px" }}>{f.name}</h3>
                    <span style={{ fontSize: "10px", fontWeight: 700, background: f.bg, color: f.color, border: `1px solid ${f.border}`, padding: "3px 10px", borderRadius: "100px", flexShrink: 0, marginLeft: "8px" }}>{f.weight}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "#475569", fontWeight: 400, lineHeight: 1.65, marginBottom: "14px" }}>{f.desc}</p>
                  <div style={{ background: f.bg, border: `1px solid ${f.border}`, borderRadius: "10px", padding: "10px 14px" }}>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: f.color, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "4px" }}>Strategy tip</p>
                    <p style={{ fontSize: "12px", color: "#475569", fontWeight: 400, lineHeight: 1.6, margin: 0 }}>{f.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* â”€â”€ READINESS MILESTONES â”€â”€ */}
          <section style={{ marginBottom: "80px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>Readiness Milestones</p>
            <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: "#0f172a", lineHeight: 1.2, marginBottom: "8px" }}>
              How to know when you are ready
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", fontWeight: 400, lineHeight: 1.75, marginBottom: "36px", maxWidth: "680px" }}>
              Do not book your exam date until you hit all four of these milestones consistently. They are the strongest predictors of first-attempt success.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "16px" }}>
              {[
                { num: "01", title: "4 consecutive Very High scores", desc: "Complete 4 full readiness assessments and score Very High on all four -- back to back with no Low or Medium in between.", color: "#0ea5e9" },
                { num: "02", title: "70%+ on daily practice blocks", desc: "Your rolling average across the last 100 practice questions should be consistently above 70% before scheduling.", color: "#10b981" },
                { num: "03", title: "No topic below 60%", desc: "Run a topic-by-topic score breakdown. Every single client needs category should be at or above 60% accuracy.", color: "#f59e0b" },
                { num: "04", title: "Comfortable with all NGN formats", desc: "You should be able to complete a Bowtie, Matrix, and unfolding case study without feeling uncertain about how to approach it.", color: "#8b5cf6" },
              ].map(m => (
                <div key={m.num} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "18px", padding: "24px", boxShadow: "0 2px 10px rgba(0,0,0,.04)", transition: "all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,.09)"; e.currentTarget.style.borderColor = m.color + "40"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,.04)"; e.currentTarget.style.borderColor = "#e2e8f0"; }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: m.color + "18", border: `1px solid ${m.color}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 800, color: m.color }}>{m.num}</span>
                  </div>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", marginBottom: "10px", lineHeight: 1.3 }}>{m.title}</h3>
                  <p style={{ fontSize: "13px", color: "#64748b", fontWeight: 400, lineHeight: 1.65 }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* â”€â”€ CTA â”€â”€ */}
          <section style={{ background: "linear-gradient(160deg,#0d1f35 0%,#0f2540 100%)", borderRadius: "24px", padding: "60px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "500px", background: "radial-gradient(circle,rgba(14,165,233,.1) 0%,transparent 65%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2, marginBottom: "16px" }}>
                Your study plan starts today.<br />
                <span style={{ color: "#38bdf8", fontStyle: "italic" }}>Your exam ends in a pass.</span>
              </h2>
              <p style={{ fontSize: "16px", color: "#94a3b8", fontWeight: 400, lineHeight: 1.8, marginBottom: "36px", maxWidth: "560px", margin: "0 auto 36px" }}>
                Pick your plan, start practising with real NCLEX-RN questions, and track your readiness every step of the way. No credit card needed to begin.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
                <Link href={user ? "/quiz/select?examType=RN" : "/auth/signup"}
                  style={{ background: "#0ea5e9", color: "#fff", padding: "16px 36px", borderRadius: "13px", fontSize: "15px", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", boxShadow: "0 8px 28px rgba(14,165,233,.3)", transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#38bdf8"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#0ea5e9"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  {user ? "Go to quiz â†’" : "Start free -- no card needed â†’"}
                </Link>
                <Link href="/courses/nclex-rn"
                  style={{ background: "rgba(255,255,255,.08)", color: "#e2e8f0", border: "1px solid rgba(255,255,255,.15)", padding: "16px 32px", borderRadius: "13px", fontSize: "15px", fontWeight: 600, textDecoration: "none", transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.14)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  Back to NCLEX-RN overview
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}   
