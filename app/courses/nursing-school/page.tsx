import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const topicAreas = [
  {
    category: "Fundamentals of Nursing",
    color: "#10b981",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    topics: [
      "Nursing process", "Patient assessment", "Vital signs",
      "Infection control", "Safety and restraints", "Documentation",
      "Communication", "Ethics and legal issues", "Cultural competence",
      "End of life care",
    ],
  },
  {
    category: "Medical-Surgical Nursing",
    color: "#3b82f6",
    bg: "#eff6ff",
    border: "#bfdbfe",
    topics: [
      "Cardiovascular disorders", "Respiratory disorders",
      "Neurological disorders", "Musculoskeletal disorders",
      "Gastrointestinal disorders", "Renal disorders",
      "Endocrine disorders", "Immune disorders",
      "Oncology nursing", "Perioperative care",
    ],
  },
  {
    category: "Pharmacology",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    topics: [
      "Drug classifications", "Dosage calculations",
      "Medication administration routes", "Adverse effects",
      "Drug interactions", "Controlled substances",
      "Antibiotics", "Cardiovascular drugs",
      "Pain management", "Patient education",
    ],
  },
  {
    category: "Maternal and Newborn Nursing",
    color: "#ec4899",
    bg: "#fdf2f8",
    border: "#fbcfe8",
    topics: [
      "Antepartum care", "Intrapartum care",
      "Postpartum care", "Newborn assessment",
      "Breastfeeding", "High-risk pregnancy",
      "Labour complications", "Neonatal disorders",
    ],
  },
  {
    category: "Paediatric Nursing",
    color: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
    topics: [
      "Growth and development", "Paediatric assessment",
      "Common childhood illnesses", "Immunisations",
      "Family-centred care", "Paediatric medications",
      "Child abuse and neglect", "Chronic conditions",
    ],
  },
  {
    category: "Mental Health Nursing",
    color: "#6366f1",
    bg: "#eef2ff",
    border: "#c7d2fe",
    topics: [
      "Therapeutic communication", "Anxiety disorders",
      "Mood disorders", "Psychotic disorders",
      "Personality disorders", "Substance use disorders",
      "Crisis intervention", "Psychopharmacology",
      "Legal and ethical issues",
    ],
  },
];

const examFacts = [
  { label: "Subject areas", value: "6 core areas" },
  { label: "Question types", value: "MCQ, SATA, Case" },
  { label: "Focus", value: "Clinical reasoning" },
  { label: "Pharmacology", value: "Fully covered" },
  { label: "NCLEX alignment", value: "100% mapped" },
  { label: "Rationales", value: "Every question" },
];

export default async function NursingSchoolPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { count } = await supabase
    .from("questions")
    .select("*", { count: "exact", head: true })
    .eq("exam_type", "NURSING_SCHOOL")
    .eq("is_published", true);

  return (
    <main className="min-h-screen bg-[#f8fafc]">

      {/* HERO */}
      <div className="bg-black text-white px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-2xl">
              
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Nursing School
              </p>
              <span className="text-xs font-semibold bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Your Nursing School<br />
            <span className="text-emerald-400">Companion</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mb-8 leading-relaxed">
            From fundamentals to med-surg, pharmacology to paediatrics --
            our question bank covers every core subject you will encounter
            in nursing school, all mapped to NCLEX outcomes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={user ? "/quiz/select?examType=NURSING_SCHOOL" : "/auth/signup"}
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-3.5 rounded-xl transition text-sm"
            >
              {user ? "Start practising " : "Get notified "}
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
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-emerald-600">{count ?? 0}+</p>
            <p className="text-sm text-emerald-700 mt-1 font-medium">Practice questions</p>
            <p className="text-xs text-emerald-500 mt-1">With full rationales</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-slate-900">6</p>
            <p className="text-sm text-slate-600 mt-1 font-medium">Core subjects</p>
            <p className="text-xs text-slate-400 mt-1">All nursing school topics</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-slate-900">100%</p>
            <p className="text-sm text-slate-600 mt-1 font-medium">NCLEX aligned</p>
            <p className="text-xs text-slate-400 mt-1">Every question mapped</p>
          </div>
        </div>

        {/* WHAT IS THIS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Study smarter through nursing school
          </h2>
          <div className="text-sm leading-relaxed space-y-3 text-slate-600">
            <p>
              Nursing school is intense. You are learning pharmacology,
              pathophysiology, clinical skills, and patient care all at once --
              while preparing for exams that directly mirror the NCLEX.
            </p>
            <p>
              Our Nursing School Companion gives you a single place to practise
              questions for every core subject. Every question comes with a
              <strong className="text-slate-800"> detailed rationale</strong> explaining
              not just the right answer but why the other options are wrong.
            </p>
            <p>
              Because all our questions are mapped to NCLEX client needs categories,
              studying for your nursing school exams and studying for the NCLEX
              happen at the same time.
            </p>
          </div>
        </div>

        {/* TOPIC AREAS */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            All core subject areas covered
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Questions span every major nursing school subject from year one through graduation.
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
                icon: "",
                color: "#3b82f6",
                bg: "#eff6ff",
                description: "Simulate nursing school exam pressure with a countdown timer. Build speed and accuracy.",
                best: "Best for: Exam simulation",
              },
              {
                mode: "Tutor Mode",
                icon: "",
                color: "#10b981",
                bg: "#ecfdf5",
                description: "See the rationale immediately after each question. Understand the clinical reasoning behind every answer.",
                best: "Best for: Deep learning",
              },
              {
                mode: "Quick Mode",
                icon: "",
                color: "#f59e0b",
                bg: "#fffbeb",
                description: "10-question sprints between classes. Keep content fresh without needing a full study session.",
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
            Nursing School prep is coming soon
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
            We are building the full Nursing School question bank right now.
            Sign up free to be notified the moment it launches.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={user ? "/dashboard" : "/auth/signup"}
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-3 rounded-xl transition text-sm"
            >
              {user ? "Go to dashboard" : "Sign up for free "}
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
