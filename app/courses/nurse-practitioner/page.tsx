import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const examsCovered = [
  {
    name: "FNP-C / FNP-BC",
    full: "Family Nurse Practitioner Certification",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    icon: "ðŸ©º",
    sections: [
      {
        name: "Health Promotion and Disease Prevention",
        topics: [
          "Screening guidelines", "Immunisation schedules",
          "Lifestyle counselling", "Risk factor modification",
          "Preventive care across lifespan",
        ],
      },
      {
        name: "Assessment and Diagnosis",
        topics: [
          "History taking", "Physical examination",
          "Differential diagnosis", "Diagnostic reasoning",
          "Lab and imaging interpretation",
        ],
      },
      {
        name: "Planning and Implementation",
        topics: [
          "Evidence-based treatment", "Pharmacotherapy",
          "Non-pharmacological interventions", "Patient education",
          "Care coordination", "Referral management",
        ],
      },
      {
        name: "Evaluation",
        topics: [
          "Treatment outcomes", "Follow-up care",
          "Chronic disease management", "Quality improvement",
          "Patient safety",
        ],
      },
    ],
  },
  {
    name: "AGPCNP-BC",
    full: "Adult-Gerontology Primary Care NP Certification",
    color: "#6366f1",
    bg: "#eef2ff",
    border: "#c7d2fe",
    icon: "ðŸ‘¨â€âš•ï¸",
    sections: [
      {
        name: "Adult Health",
        topics: [
          "Cardiovascular conditions", "Respiratory conditions",
          "Endocrine disorders", "Neurological conditions",
          "Musculoskeletal disorders",
        ],
      },
      {
        name: "Gerontology",
        topics: [
          "Age-related changes", "Polypharmacy",
          "Cognitive assessment", "Falls prevention",
          "Palliative and end of life care",
        ],
      },
    ],
  },
];

const examFacts = [
  { label: "Certifications", value: "FNP . AGPCNP" },
  { label: "Question types", value: "MCQ, Case-based" },
  { label: "Focus", value: "Advanced practice" },
  { label: "Pharmacology", value: "Advanced level" },
  { label: "Clinical reasoning", value: "Fully covered" },
  { label: "Rationales", value: "Every question" },
];

export default async function NursePractitionerPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { count } = await supabase
    .from("questions")
    .select("*", { count: "exact", head: true })
    .eq("exam_type", "NP")
    .eq("is_published", true);

  return (
    <main className="min-h-screen bg-[#f8fafc]">

      {/* HERO */}
      <div className="bg-black text-white px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-2xl">
              ðŸ©º
            </div>
            <div>
              <p className="text-xs font-bold text-violet-400 uppercase tracking-widest">
                Nurse Practitioner
              </p>
              <span className="text-xs font-semibold bg-violet-500 text-white px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Expert NP<br />
            <span className="text-violet-400">Exam Resources</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mb-8 leading-relaxed">
            Prepare for your FNP or AGPCNP certification with questions
            built around advanced practice competencies -- from diagnosis
            and pharmacotherapy to chronic disease management.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={user ? "/quiz/select?examType=NP" : "/auth/signup"}
              className="bg-violet-500 hover:bg-violet-400 text-white font-bold px-8 py-3.5 rounded-xl transition text-sm"
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
          <div className="bg-violet-50 border border-violet-100 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-violet-600">{count ?? 0}+</p>
            <p className="text-sm text-violet-700 mt-1 font-medium">Practice questions</p>
            <p className="text-xs text-violet-500 mt-1">With full rationales</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-slate-900">2</p>
            <p className="text-sm text-slate-600 mt-1 font-medium">Certifications</p>
            <p className="text-xs text-slate-400 mt-1">FNP . AGPCNP</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-slate-900">Advanced</p>
            <p className="text-sm text-slate-600 mt-1 font-medium">Practice level</p>
            <p className="text-xs text-slate-400 mt-1">Beyond RN scope</p>
          </div>
        </div>

        {/* WHAT IS THIS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            What are NP certification exams?
          </h2>
          <div className="text-sm leading-relaxed space-y-3 text-slate-600">
            <p>
              After completing your NP programme, you must pass a national
              certification exam to practise as a Nurse Practitioner. The two
              most common primary care certifications are the
              <strong className="text-slate-800"> FNP-C</strong> (AANP) and
              <strong className="text-slate-800"> FNP-BC</strong> (ANCC) for
              Family Nurse Practitioners.
            </p>
            <p>
              These exams test advanced clinical knowledge including
              independent diagnosis, prescribing, and management of acute
              and chronic conditions across the lifespan -- going well beyond
              the scope of the NCLEX.
            </p>
            <p>
              Our NP question bank is designed to prepare you for the rigour
              of advanced practice certification with case-based questions
              that mirror the complexity of real NP exams.
            </p>
          </div>
        </div>

        {/* EXAMS COVERED */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Certifications covered
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Questions mapped to the official competency frameworks for each certification.
          </p>
          <div className="space-y-6">
            {examsCovered.map((exam) => (
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
                      <h4 className="font-semibold text-slate-800 text-sm mb-3">
                        {section.name}
                      </h4>
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
                icon: "â±ï¸",
                color: "#3b82f6",
                bg: "#eff6ff",
                description: "Simulate real certification exam pressure. Build the speed and stamina NP exams demand.",
                best: "Best for: Exam simulation",
              },
              {
                mode: "Tutor Mode",
                icon: "ðŸ§ ",
                color: "#10b981",
                bg: "#ecfdf5",
                description: "Detailed rationales after every question. Understand the advanced clinical reasoning behind each answer.",
                best: "Best for: Deep learning",
              },
              {
                mode: "Quick Mode",
                icon: "âš¡",
                color: "#f59e0b",
                bg: "#fffbeb",
                description: "10-question sprints to stay sharp between clinical rotations and study sessions.",
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
            NP exam prep is coming soon
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
            We are building the full NP certification question bank right now.
            Sign up free to be notified the moment it launches.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={user ? "/dashboard" : "/auth/signup"}
              className="bg-violet-500 hover:bg-violet-400 text-white font-bold px-8 py-3 rounded-xl transition text-sm"
            >
              {user ? "Go to dashboard" : "Sign up for free â†’"}
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
