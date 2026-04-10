import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const topicAreas = [
  {
    category: "Cardiovascular",
    color: "#ef4444",
    bg: "#fff1f2",
    border: "#fecdd3",
    topics: [
      "Acute coronary syndromes", "Heart failure",
      "Dysrhythmia recognition", "12-lead ECG interpretation",
      "Haemodynamic monitoring", "Cardiogenic shock",
      "Cardiac tamponade", "Aortic aneurysm",
      "Pacemakers and ICDs", "Post-cardiac surgery care",
    ],
  },
  {
    category: "Pulmonary",
    color: "#3b82f6",
    bg: "#eff6ff",
    border: "#bfdbfe",
    topics: [
      "Mechanical ventilation", "ARDS",
      "Respiratory failure", "Pneumothorax",
      "Pulmonary embolism", "COPD exacerbation",
      "Weaning from ventilator", "Arterial blood gases",
      "Airway management", "Chest tubes",
    ],
  },
  {
    category: "Neurology",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    topics: [
      "Stroke management", "Traumatic brain injury",
      "Increased intracranial pressure", "Seizure management",
      "Spinal cord injury", "Neuromuscular disorders",
      "Sedation and analgesia", "Neurological assessment",
      "Brain death", "Post-neurosurgical care",
    ],
  },
  {
    category: "Multisystem",
    color: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
    topics: [
      "Sepsis and septic shock", "Multi-organ dysfunction",
      "Trauma care", "Burns management",
      "Disseminated intravascular coagulation",
      "Anaphylaxis", "Toxicology",
      "Hypothermia and hyperthermia",
    ],
  },
  {
    category: "Gastrointestinal and Renal",
    color: "#10b981",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    topics: [
      "Acute kidney injury", "Renal replacement therapy",
      "Electrolyte imbalances", "GI bleeding",
      "Acute pancreatitis", "Liver failure",
      "Abdominal compartment syndrome",
      "Nutritional support in ICU",
    ],
  },
  {
    category: "Professional Caring and Ethics",
    color: "#6366f1",
    bg: "#eef2ff",
    border: "#c7d2fe",
    topics: [
      "Advocacy", "Caring practices",
      "Clinical judgement", "Collaboration",
      "End of life care in ICU", "Family-centred care",
      "Ethical decision making", "Systems thinking",
    ],
  },
];

const examFacts = [
  { label: "Questions", value: "150 items" },
  { label: "Time limit", value: "3 hours" },
  { label: "Passing score", value: "72 out of 150" },
  { label: "Eligibility", value: "1,750 ICU hours" },
  { label: "Renewal", value: "Every 3 years" },
  { label: "Offered by", value: "AACN" },
];

export default async function CCRNPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { count } = await supabase
    .from("questions")
    .select("*", { count: "exact", head: true })
    .eq("exam_type", "CCRN")
    .eq("is_published", true);

  return (
    <main className="min-h-screen bg-[#f8fafc]">

      {/* HERO */}
      <div className="bg-black text-white px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-2xl">
              ❤️
            </div>
            <div>
              <p className="text-xs font-bold text-red-400 uppercase tracking-widest">
                CCRN®
              </p>
              <span className="text-xs font-semibold bg-red-500 text-white px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            CCRN<br />
            <span className="text-red-400">Success Resources</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mb-8 leading-relaxed">
            Master the critical care knowledge needed to earn your CCRN
            certification. Every question covers the high-acuity topics
            you face daily in the ICU — from haemodynamics to mechanical
            ventilation to sepsis management.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={user ? "/quiz" : "/auth/signup"}
              className="bg-red-500 hover:bg-red-400 text-white font-bold px-8 py-3.5 rounded-xl transition text-sm"
            >
              {user ? "Start practising →" : "Get notified →"}
            </Link>
            <Link
              href="/pricing"
              className="border border-white/20 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-xl transition text-sm"
            >
              View pricing
            </Link>
          </div>
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {examFacts.map((fact) => (
              <div key={fact.label} className="text-center">
                <p className="text-sm font-bold text-slate-900">{fact.value}</p>
                <p className="text-xs text-slate-400 mt-1">{fact.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 space-y-12">

        {/* PRACTICE STATS */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-red-600">{count ?? 0}+</p>
            <p className="text-sm text-red-700 mt-1 font-medium">Practice questions</p>
            <p className="text-xs text-red-500 mt-1">With full rationales</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-slate-900">6</p>
            <p className="text-sm text-slate-600 mt-1 font-medium">Topic areas</p>
            <p className="text-xs text-slate-400 mt-1">All CCRN domains</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-slate-900">ICU</p>
            <p className="text-sm text-slate-600 mt-1 font-medium">Level content</p>
            <p className="text-xs text-slate-400 mt-1">Critical care focused</p>
          </div>
        </div>

        {/* WHAT IS CCRN */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            What is the CCRN?
          </h2>
          <div className="text-sm leading-relaxed space-y-3 text-slate-600">
            <p>
              The CCRN is the gold standard certification for critical care
              nurses, awarded by the American Association of Critical-Care
              Nurses (AACN). It validates your expertise in caring for
              acutely and critically ill patients.
            </p>
            <p>
              To sit the exam you need at least
              <strong className="text-slate-800"> 1,750 hours of direct care</strong> of
              acutely or critically ill patients in the past two years,
              with 875 of those hours in the most recent year preceding application.
            </p>
            <p>
              Our CCRN question bank is built around the official AACN test
              blueprint, covering everything from cardiovascular and pulmonary
              emergencies to professional caring and ethical practice.
            </p>
          </div>
        </div>

        {/* TOPIC AREAS */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            All CCRN topic areas covered
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Every question is mapped to the official AACN CCRN test blueprint.
          </p>
          <div className="space-y-4">
            {topicAreas.map((area) => (
              <div
                key={area.category}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
              >
                <div
                  className="px-6 py-4 border-b"
                  style={{ background: area.bg, borderColor: area.border }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ background: area.color }}
                    />
                    <h3 className="font-bold text-slate-900 text-sm">
                      {area.category}
                    </h3>
                  </div>
                </div>
                <div className="px-6 py-5">
                  <div className="flex flex-wrap gap-2">
                    {area.topics.map((topic) => (
                      <span
                        key={topic}
                        className="text-xs bg-slate-50 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EXAM MODES */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Three ways to practise
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                mode: "Timed Mode",
                icon: "⏱️",
                color: "#3b82f6",
                bg: "#eff6ff",
                description: "Simulate the 3-hour CCRN exam. Build the speed and focus the real test demands.",
                best: "Best for: Exam simulation",
              },
              {
                mode: "Tutor Mode",
                icon: "🧠",
                color: "#10b981",
                bg: "#ecfdf5",
                description: "Detailed critical care rationales after every question. Understand the clinical reasoning behind each answer.",
                best: "Best for: Deep learning",
              },
              {
                mode: "Quick Mode",
                icon: "⚡",
                color: "#f59e0b",
                bg: "#fffbeb",
                description: "10-question sprints between shifts. Keep your critical care knowledge sharp without a full study session.",
                best: "Best for: Daily revision",
              },
            ].map((m) => (
              <div
                key={m.mode}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4"
                  style={{ background: m.bg }}
                >
                  {m.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{m.mode}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                  {m.description}
                </p>
                <p className="text-xs font-semibold" style={{ color: m.color }}>
                  {m.best}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-black rounded-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">
            CCRN prep is coming soon
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
            We are building the full CCRN question bank right now.
            Sign up free to be notified the moment it launches.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={user ? "/dashboard" : "/auth/signup"}
              className="bg-red-500 hover:bg-red-400 text-white font-bold px-8 py-3 rounded-xl transition text-sm"
            >
              {user ? "Go to dashboard" : "Sign up for free →"}
            </Link>
            <Link
              href="/courses/nclex-rn"
              className="border border-white/20 hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-xl transition text-sm"
            >
              Try NCLEX-RN instead
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}