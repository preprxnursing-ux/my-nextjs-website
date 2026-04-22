import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const clientNeeds = [
  {
    category: "Safe and Effective Care Environment",
    color: "#6366f1",
    bg: "#eef2ff",
    border: "#c7d2fe",
    subcategories: [
      {
        name: "Management of Care",
        weight: "11-17%",
        topics: [
          "Advance directives", "Advocacy", "Case management",
          "Client rights", "Collaboration", "Confidentiality",
          "Continuity of care", "Delegation", "Ethical practice",
          "Informed consent", "Legal rights", "Prioritisation",
          "Referrals", "Supervision",
        ],
      },
      {
        name: "Safety and Infection Control",
        weight: "9-15%",
        topics: [
          "Accident prevention", "Error prevention", "Ergonomic principles",
          "Handling hazardous materials", "Home safety", "Reporting incidents",
          "Safe use of equipment", "Standard precautions",
          "Surgical asepsis", "Use of restraints",
        ],
      },
    ],
  },
  {
    category: "Health Promotion and Maintenance",
    color: "#10b981",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    subcategories: [
      {
        name: "Health Promotion",
        weight: "6-12%",
        topics: [
          "Ante/intra/postpartum care", "Developmental stages",
          "Family planning", "Growth and development",
          "Health screening", "High-risk behaviours",
          "Immunisations", "Lifestyle choices", "Self-care",
        ],
      },
    ],
  },
  {
    category: "Psychosocial Integrity",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    subcategories: [
      {
        name: "Psychosocial Integrity",
        weight: "9-15%",
        topics: [
          "Abuse and neglect", "Behavioural interventions",
          "Chemical dependency", "Coping mechanisms", "Crisis intervention",
          "Cultural awareness", "End of life", "Grief and loss",
          "Mental health concepts", "Stress management",
          "Support systems", "Therapeutic communication",
        ],
      },
    ],
  },
  {
    category: "Physiological Integrity",
    color: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
    subcategories: [
      {
        name: "Basic Care and Comfort",
        weight: "7-13%",
        topics: [
          "Assistive devices", "Elimination", "Mobility",
          "Non-pharmacological comfort", "Nutrition", "Oral hygiene",
          "Personal hygiene", "Rest and sleep",
        ],
      },
      {
        name: "Pharmacological Therapies",
        weight: "10-16%",
        topics: [
          "Adverse effects", "Blood products", "Dosage calculations",
          "Expected effects", "Medication administration",
          "Pharmacological pain management",
        ],
      },
      {
        name: "Reduction of Risk Potential",
        weight: "9-15%",
        topics: [
          "Changes in vital signs", "Diagnostic tests", "Lab values",
          "Pathophysiology", "Potential complications",
          "System-specific assessments", "Therapeutic procedures",
        ],
      },
      {
        name: "Physiological Adaptation",
        weight: "7-13%",
        topics: [
          "Alterations in body systems", "Fluid imbalances",
          "Illness management", "Medical emergencies",
          "Pathophysiology", "Unexpected responses to therapies",
        ],
      },
    ],
  },
];

const examFacts = [
  { label: "Question format", value: "Next Generation NCLEX (NGN)" },
  { label: "Total questions", value: "85-150 items" },
  { label: "Time limit", value: "5 hours" },
  { label: "Passing standard", value: "Logit score based" },
  { label: "Question types", value: "MCQ, SATA, Bowtie, Matrix" },
  { label: "Exam frequency", value: "Year-round testing" },
];

export default async function NCLEXPNPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { count } = await supabase
    .from("questions")
    .select("*", { count: "exact", head: true })
    .eq("exam_type", "NCLEX-PN")
    .eq("is_published", true);

  return (
    <main className="min-h-screen bg-[#f8fafc]">

      {/* HERO */}
      <div className="bg-black text-white px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-2xl">
              ðŸ“‹
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                NCLEX-PN(R)
              </p>
              <span className="text-xs font-semibold bg-indigo-500 text-white px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            NCLEX-PN<br />
            <span className="text-indigo-400">Effective Prep</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mb-8 leading-relaxed">
            Build the clinical knowledge and judgement you need to pass the
            NCLEX-PN. Every question is mapped to the official test plan so
            you study exactly what the exam tests.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={user ? "/quiz/select?examType=PN" : "/auth/signup"}
              className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-8 py-3.5 rounded-xl transition text-sm"
            >
              {user ? "Start practising â†’" : "Get notified â†’"}
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
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-indigo-600">{count ?? 0}+</p>
            <p className="text-sm text-indigo-700 mt-1 font-medium">Practice questions</p>
            <p className="text-xs text-indigo-500 mt-1">With full rationales</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-slate-900">3</p>
            <p className="text-sm text-slate-600 mt-1 font-medium">Exam modes</p>
            <p className="text-xs text-slate-400 mt-1">Timed . Tutor . Quick</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-slate-900">8</p>
            <p className="text-sm text-slate-600 mt-1 font-medium">Client needs</p>
            <p className="text-xs text-slate-400 mt-1">All categories covered</p>
          </div>
        </div>

        {/* WHAT IS NCLEX-PN */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What is the NCLEX-PN?</h2>
          <div className="text-sm leading-relaxed space-y-3 text-slate-600">
            <p>
              The NCLEX-PN (National Council Licensure Examination for Practical Nurses)
              is the standardised exam all practical and vocational nursing graduates must
              pass to become licensed as an LPN or LVN in the United States and Canada.
            </p>
            <p>
              Like the RN exam, the PN uses <strong className="text-slate-800">Computer Adaptive Testing (CAT)</strong> --
              adjusting question difficulty based on your performance. The 2024 Next Generation
              NCLEX (NGN) update introduced new clinical judgement question types to both exams.
            </p>
            <p>
              Our question bank covers all NCLEX-PN client needs categories with the exact
              weighting used on the real exam -- so you spend your time where it counts most.
            </p>
          </div>
        </div>

        {/* CLIENT NEEDS */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            All client needs categories
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Every question is mapped to one of these official NCLEX-PN categories.
          </p>
          <div className="space-y-4">
            {clientNeeds.map((cn) => (
              <div
                key={cn.category}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
              >
                <div
                  className="px-6 py-4 border-b"
                  style={{ background: cn.bg, borderColor: cn.border }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ background: cn.color }}
                    />
                    <h3 className="font-bold text-slate-900 text-sm">{cn.category}</h3>
                  </div>
                </div>
                <div className="divide-y divide-slate-100">
                  {cn.subcategories.map((sub) => (
                    <div key={sub.name} className="px-6 py-5">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-slate-800 text-sm">{sub.name}</h4>
                        <span
                          className="text-xs font-bold px-2.5 py-1 rounded-full"
                          style={{ background: cn.bg, color: cn.color, border: `1px solid ${cn.border}` }}
                        >
                          {sub.weight} of exam
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {sub.topics.map((topic) => (
                          <span
                            key={topic}
                            className="text-xs bg-slate-50 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EXAM MODES */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Three ways to practise</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                mode: "Timed Mode",
                icon: "â±ï¸",
                color: "#3b82f6",
                bg: "#eff6ff",
                description: "Simulate real exam conditions with a countdown timer. Build the mental endurance the NCLEX-PN demands.",
                best: "Best for: Exam simulation",
              },
              {
                mode: "Tutor Mode",
                icon: "ðŸ§ ",
                color: "#10b981",
                bg: "#ecfdf5",
                description: "Get instant feedback after every question. Read the rationale, understand why, then move forward confidently.",
                best: "Best for: Deep learning",
              },
              {
                mode: "Quick Mode",
                icon: "âš¡",
                color: "#f59e0b",
                bg: "#fffbeb",
                description: "10-question sprints for daily practice. Perfect for building momentum and keeping knowledge sharp.",
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
                <p className="text-sm text-slate-500 leading-relaxed mb-3">{m.description}</p>
                <p className="text-xs font-semibold" style={{ color: m.color }}>
                  {m.best}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-black rounded-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">NCLEX-PN prep is coming soon</h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
            We are building out the full NCLEX-PN question bank right now.
            Start with NCLEX-RN today or sign up to be notified when PN launches.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/courses/nclex-rn"
              className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-8 py-3 rounded-xl transition text-sm"
            >
              Try NCLEX-RN instead â†’
            </Link>
            <Link
              href={user ? "/dashboard" : "/auth/signup"}
              className="border border-white/20 hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-xl transition text-sm"
            >
              {user ? "Go to dashboard" : "Sign up for free"}
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
