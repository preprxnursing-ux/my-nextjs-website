import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const examCovered = [
  {
    name: "TEAS 7",
    full: "Test of Essential Academic Skills",
    color: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
    icon: "📚",
    sections: [
      {
        name: "Reading",
        weight: "31%",
        topics: [
          "Key ideas and details", "Craft and structure",
          "Integration of knowledge", "Informational sources",
        ],
      },
      {
        name: "Mathematics",
        weight: "22%",
        topics: [
          "Numbers and algebra", "Measurement and data",
          "Percentages", "Ratios and proportions",
        ],
      },
      {
        name: "Science",
        weight: "31%",
        topics: [
          "Human anatomy and physiology", "Biology",
          "Chemistry", "Scientific reasoning",
        ],
      },
      {
        name: "English and Language Usage",
        weight: "16%",
        topics: [
          "Conventions of standard English", "Knowledge of language",
          "Vocabulary acquisition", "Spelling and punctuation",
        ],
      },
    ],
  },
  {
    name: "HESI A2",
    full: "Health Education Systems Incorporated Admission Assessment",
    color: "#10b981",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    icon: "🩺",
    sections: [
      {
        name: "Reading Comprehension",
        weight: "Core section",
        topics: [
          "Main idea", "Supporting details",
          "Logical conclusions", "Passage analysis",
        ],
      },
      {
        name: "Mathematics",
        weight: "Core section",
        topics: [
          "Basic operations", "Fractions and decimals",
          "Ratios", "Military time and Roman numerals",
        ],
      },
      {
        name: "Vocabulary and General Knowledge",
        weight: "Core section",
        topics: [
          "Medical terminology", "General vocabulary",
          "Context clues", "Word roots",
        ],
      },
      {
        name: "Anatomy and Physiology",
        weight: "Core section",
        topics: [
          "Body systems", "Organ functions",
          "Medical terminology", "Physiological processes",
        ],
      },
      {
        name: "Grammar",
        weight: "Core section",
        topics: [
          "Parts of speech", "Sentence structure",
          "Punctuation", "Common errors",
        ],
      },
    ],
  },
];

const examFacts = [
  { label: "TEAS 7 sections", value: "4 sections" },
  { label: "TEAS 7 questions", value: "170 items" },
  { label: "TEAS 7 time", value: "209 minutes" },
  { label: "HESI A2 sections", value: "Up to 9 sections" },
  { label: "HESI A2 passing", value: "75% per section" },
  { label: "Retake policy", value: "Varies by school" },
];

export default async function PreNursingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { count } = await supabase
    .from("questions")
    .select("*", { count: "exact", head: true })
    .eq("exam_type", "TEAS")
    .eq("is_published", true);

  return (
    <main className="min-h-screen bg-[#f8fafc]">

      {/* HERO */}
      <div className="bg-black text-white px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-2xl">
              📚
            </div>
            <div>
              <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Pre-Nursing
              </p>
              <span className="text-xs font-semibold bg-amber-500 text-white px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            TEAS 7 & HESI A2<br />
            <span className="text-amber-400">Success Toolkit</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mb-8 leading-relaxed">
            Get into nursing school with confidence. Our Pre-Nursing prep covers
            everything you need for both the TEAS 7 and HESI A2 -- the two most
            common nursing school entrance exams.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={user ? "/quiz" : "/auth/signup"}
              className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-3.5 rounded-xl transition text-sm"
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
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-amber-600">{count ?? 0}+</p>
            <p className="text-sm text-amber-700 mt-1 font-medium">Practice questions</p>
            <p className="text-xs text-amber-500 mt-1">With full rationales</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-slate-900">2</p>
            <p className="text-sm text-slate-600 mt-1 font-medium">Exams covered</p>
            <p className="text-xs text-slate-400 mt-1">TEAS 7 . HESI A2</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-slate-900">9</p>
            <p className="text-sm text-slate-600 mt-1 font-medium">Subject areas</p>
            <p className="text-xs text-slate-400 mt-1">All sections covered</p>
          </div>
        </div>

        {/* WHAT IS PRE-NURSING */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            What are the TEAS 7 and HESI A2?
          </h2>
          <div className="text-sm leading-relaxed space-y-3 text-slate-600">
            <p>
              Before you can enter a nursing programme, most schools require you
              to pass an entrance exam. The two most widely used are the
              <strong className="text-slate-800"> TEAS 7</strong> (ATI) and the
              <strong className="text-slate-800"> HESI A2</strong> (Elsevier).
            </p>
            <p>
              Both exams test your foundational knowledge in reading, maths,
              science, and English -- the building blocks of nursing education.
              A strong score significantly improves your chances of admission
              to competitive nursing programmes.
            </p>
            <p>
              Our question bank prepares you for both exams in one place,
              so you are ready no matter which exam your school requires.
            </p>
          </div>
        </div>

        {/* EXAMS COVERED */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Both exams fully covered
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Every question is mapped to a specific section of the TEAS 7 or HESI A2.
          </p>
          <div className="space-y-6">
            {examCovered.map((exam) => (
              <div
                key={exam.name}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
              >
                <div
                  className="px-6 py-4 border-b"
                  style={{ background: exam.bg, borderColor: exam.border }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{exam.icon}</span>
                    <div>
                      <h3 className="font-bold text-slate-900">{exam.name}</h3>
                      <p className="text-xs text-slate-500">{exam.full}</p>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-slate-100">
                  {exam.sections.map((section) => (
                    <div key={section.name} className="px-6 py-5">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-slate-800 text-sm">
                          {section.name}
                        </h4>
                        <span
                          className="text-xs font-bold px-2.5 py-1 rounded-full"
                          style={{
                            background: exam.bg,
                            color: exam.color,
                            border: `1px solid ${exam.border}`,
                          }}
                        >
                          {section.weight}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {section.topics.map((topic) => (
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
                description: "Simulate real exam conditions. Build the speed and stamina both entrance exams demand.",
                best: "Best for: Exam simulation",
              },
              {
                mode: "Tutor Mode",
                icon: "🧠",
                color: "#10b981",
                bg: "#ecfdf5",
                description: "Get instant feedback after every question with full rationales so you truly understand the material.",
                best: "Best for: Deep learning",
              },
              {
                mode: "Quick Mode",
                icon: "⚡",
                color: "#f59e0b",
                bg: "#fffbeb",
                description: "10-question sprints for daily practice. Keep your knowledge fresh between study sessions.",
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
            Pre-Nursing prep is coming soon
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
            We are building the full TEAS 7 and HESI A2 question bank right now.
            Sign up free to be notified the moment it launches.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={user ? "/dashboard" : "/auth/signup"}
              className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-3 rounded-xl transition text-sm"
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