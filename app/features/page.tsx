import Link from "next/link";

const features = [
  {
    icon: "",
    title: "Three exam modes",
    description:
      "Choose how you learn. Timed mode simulates real NCLEX pressure. Tutor mode gives you instant feedback after every question. Quick mode is a 10-question sprint for daily practice.",
    color: "bg-cyan-50 border-cyan-100",
    iconBg: "bg-cyan-500",
  },
  {
    icon: "",
    title: "Deep clinical rationales",
    description:
      "Every question comes with a full explanation of why the correct answer is right and why each wrong answer is wrong. You learn the reasoning, not just the answer.",
    color: "bg-indigo-50 border-indigo-100",
    iconBg: "bg-indigo-500",
  },
  {
    icon: "",
    title: "Personal performance dashboard",
    description:
      "Track your scores, spot weak topics, and watch your accuracy improve over time. Your dashboard shows every attempt with detailed breakdowns.",
    color: "bg-emerald-50 border-emerald-100",
    iconBg: "bg-emerald-500",
  },
  {
    icon: "",
    title: "Flag and review system",
    description:
      "Flag any question during an exam and come back to it. After submitting, filter your review by incorrect answers, flagged questions, or specific topics.",
    color: "bg-amber-50 border-amber-100",
    iconBg: "bg-amber-500",
  },
  {
    icon: "",
    title: "Adaptive timer",
    description:
      "Timed exams build the mental endurance NCLEX demands. Quick mode sprints build daily momentum. Tutor mode removes the clock so you can focus on learning.",
    color: "bg-rose-50 border-rose-100",
    iconBg: "bg-rose-500",
  },
  {
    icon: "",
    title: "Works on any device",
    description:
      "Study on your phone on the bus, your tablet at the library, or your laptop at home. The platform is fully responsive and feels native on every screen.",
    color: "bg-purple-50 border-purple-100",
    iconBg: "bg-purple-500",
  },
  {
    icon: "",
    title: "Your data stays yours",
    description:
      "Every attempt is saved securely to your account. Your history, scores, and progress are private and tied only to your login -- never shared.",
    color: "bg-slate-50 border-slate-200",
    iconBg: "bg-slate-700",
  },
  {
    icon: "",
    title: "AI Tutor",
    description:
      "Our upcoming AI layer will explain exactly why you keep missing certain questions, generate personalised study plans, and adapt your exam to your weak areas.",
    color: "bg-cyan-50 border-cyan-100",
    iconBg: "bg-cyan-500",
  },
  {
    icon: "",
    title: "Built for NCLEX-RN, FNP and CCRN",
    description:
      "We cover more than just NCLEX-RN. Premium subscribers get access to FNP certification and CCRN critical care question sets as they launch.",
    color: "bg-indigo-50 border-indigo-100",
    iconBg: "bg-indigo-500",
  },
];

const stats = [
  { value: "30+", label: "Practice questions" },
  { value: "3", label: "Exam modes" },
  { value: "100%", label: "Rationale coverage" },
  { value: "24/7", label: "Available anywhere" },
];

const comparisons = [
  { feature: "Full rationale per question", us: true, them: true },
  { feature: "NCLEX thinking tips", us: true, them: false },
  { feature: "Tutor mode with instant feedback", us: true, them: true },
  { feature: "Personal performance dashboard", us: true, them: true },
  { feature: "Flag and review system", us: true, them: true },
  { feature: "AI-powered study recommendations", us: true, them: false },
  { feature: "FNP and CCRN question sets", us: true, them: true },
  { feature: "Free plan with real questions", us: true, them: false },
  { feature: "No ads ever", us: true, them: false },
  { feature: "Built by nurses for nurses", us: true, them: false },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#f1f5f9]">

      {/* HERO */}
      <div className="bg-black text-white px-4 py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-3">
          Platform Features
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Everything you need to pass
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
          Pre-NCLEX Review is built around one goal -- helping you think like a
          nurse, not just memorise answers.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/auth/signup"
            className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-3 rounded-xl transition"
          >
            Start for free
          </Link>
          <Link
            href="/quiz"
            className="border border-white/20 hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-xl transition"
          >
            Try a practice exam
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES GRID */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">
            Built for how nurses actually learn
          </h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Every feature was designed around the way nursing students study --
            not around what was easiest to build.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`rounded-2xl border p-6 ${feature.color}`}
            >
              <div className={`w-10 h-10 ${feature.iconBg} rounded-xl flex items-center justify-center text-lg mb-4`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* COMPARISON TABLE */}
      <div className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900">
              How we compare
            </h2>
            <p className="text-slate-500 mt-3">
              See why students choose Pre-NCLEX Review over other platforms.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            {/* TABLE HEADER */}
            <div className="grid grid-cols-3 bg-slate-900 text-white text-sm font-semibold">
              <div className="p-4">Feature</div>
              <div className="p-4 text-center text-cyan-400">Pre-NCLEX Review</div>
              <div className="p-4 text-center text-slate-400">Others</div>
            </div>

            {/* TABLE ROWS */}
            {comparisons.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 text-sm border-t border-slate-100 ${
                  i % 2 === 0 ? "bg-white" : "bg-slate-50"
                }`}
              >
                <div className="p-4 text-slate-700 font-medium">{row.feature}</div>
                <div className="p-4 flex justify-center">
                  {row.us ? (
                    <div className="w-6 h-6 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-4 flex justify-center">
                  {row.them ? (
                    <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Ready to see it in action?
        </h2>
        <p className="text-slate-500 mb-8">
          Create a free account and take your first practice exam in under
          2 minutes.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/auth/signup"
            className="bg-black hover:opacity-90 text-white font-semibold px-8 py-3 rounded-xl transition"
          >
            Create free account
          </Link>
          <Link
            href="/pricing"
            className="border border-slate-300 bg-white hover:bg-slate-50 text-slate-900 font-semibold px-8 py-3 rounded-xl transition"
          >
            View pricing
          </Link>
        </div>
      </div>

    </main>
  );
}