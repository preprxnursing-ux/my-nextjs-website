import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const courses = [
  {
    id: 1,
    title: "NCLEX-RN Complete Prep",
    subtitle: "The full preparation course",
    description:
      "A comprehensive question bank covering all 8 NCLEX client needs categories. Timed exams, tutor mode, rationales, and performance tracking — everything in one place.",
    topics: ["Med-Surg", "Pharmacology", "Pediatrics", "OB/Maternity", "Mental Health", "Fundamentals", "Management", "Community"],
    questions: "300+",
    difficulty: "All levels",
    duration: "Self-paced",
    badge: "Most Popular",
    badgeColor: "bg-cyan-500 text-white",
    color: "border-cyan-400",
    access: "premium",
    cta: "Start learning",
    href: "/quiz",
  },
  {
    id: 2,
    title: "NCLEX-RN Quick Start",
    subtitle: "For beginners",
    description:
      "New to NCLEX prep? Start here. 30 carefully selected Med-Surg questions with full rationales and NCLEX thinking tips. Get a feel for the platform before going premium.",
    topics: ["Med-Surg", "Clinical reasoning", "Priority setting", "Safety"],
    questions: "30",
    difficulty: "Easy to Medium",
    duration: "1–2 hours",
    badge: "Free",
    badgeColor: "bg-emerald-500 text-white",
    color: "border-emerald-400",
    access: "free",
    cta: "Start free",
    href: "/quiz",
  },
  {
    id: 3,
    title: "FNP Certification Prep",
    subtitle: "Family Nurse Practitioner",
    description:
      "Prepare for the AANP and ANCC FNP certification exams with targeted question sets covering advanced practice nursing, pharmacology, and clinical management.",
    topics: ["Advanced Pharmacology", "Primary Care", "Women's Health", "Geriatrics", "Pediatrics", "Chronic Disease"],
    questions: "200+",
    difficulty: "Advanced",
    duration: "Self-paced",
    badge: "Coming Soon",
    badgeColor: "bg-slate-500 text-white",
    color: "border-slate-200",
    access: "premium",
    cta: "Notify me",
    href: "/contact",
  },
  {
    id: 4,
    title: "CCRN Critical Care Prep",
    subtitle: "Critical Care Registered Nurse",
    description:
      "Master the knowledge needed for AACN CCRN certification. Covers cardiovascular, respiratory, neurological, and multi-system critical care content.",
    topics: ["Cardiovascular", "Respiratory", "Neuro/Neurotrauma", "Multisystem", "Renal", "Endocrine"],
    questions: "200+",
    difficulty: "Advanced",
    duration: "Self-paced",
    badge: "Coming Soon",
    badgeColor: "bg-slate-500 text-white",
    color: "border-slate-200",
    access: "premium",
    cta: "Notify me",
    href: "/contact",
  },
];

const steps = [
  {
    step: "01",
    title: "Create your free account",
    description: "Sign up in under a minute. No credit card required.",
  },
  {
    step: "02",
    title: "Choose your exam mode",
    description: "Timed, Tutor, or Quick — pick the mode that fits your study style.",
  },
  {
    step: "03",
    title: "Practice and review",
    description: "Answer questions, read rationales, and flag items for later review.",
  },
  {
    step: "04",
    title: "Track your progress",
    description: "Watch your scores improve over time on your personal dashboard.",
  },
];

export default async function CoursesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-[#f1f5f9]">

      {/* HERO */}
      <div className="bg-black text-white px-4 py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-3">
          Our Courses
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Train for the exam that matters
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
          Whether you are preparing for NCLEX-RN, FNP or CCRN — we have a
          focused question bank built around how these exams actually test you.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/auth/signup"
            className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-3 rounded-xl transition"
          >
            Start for free
          </Link>
          <Link
            href="/pricing"
            className="border border-white/20 hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-xl transition"
          >
            View pricing
          </Link>
        </div>
      </div>

      {/* COURSES GRID */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">
            Choose your certification path
          </h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Each course is built around the specific exam you are preparing for —
            not a generic nursing question bank.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`relative bg-white rounded-2xl border-2 ${course.color} p-8 shadow-sm`}
            >
              {/* BADGE */}
              <div className="flex items-start justify-between mb-4">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${course.badgeColor}`}>
                  {course.badge}
                </span>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                  {course.access === "free" ? "Free access" : "Premium"}
                </span>
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-bold text-slate-900">{course.title}</h3>
              <p className="text-sm text-slate-500 mt-0.5">{course.subtitle}</p>

              {/* DESCRIPTION */}
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                {course.description}
              </p>

              {/* META */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { label: "Questions", value: course.questions },
                  { label: "Level", value: course.difficulty },
                  { label: "Duration", value: course.duration },
                ].map((meta) => (
                  <div key={meta.label} className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wide">{meta.label}</p>
                    <p className="text-sm font-semibold text-slate-800 mt-1">{meta.value}</p>
                  </div>
                ))}
              </div>

              {/* TOPICS */}
              <div className="mt-5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Topics covered
                </p>
                <div className="flex flex-wrap gap-2">
                  {course.topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6">
                <Link
                  href={user ? course.href : "/auth/signup"}
                  className={`block w-full text-center font-semibold py-3 rounded-xl transition text-sm ${
                    course.access === "free"
                      ? "bg-emerald-500 hover:bg-emerald-400 text-white"
                      : course.badge === "Coming Soon"
                      ? "border border-slate-300 bg-slate-50 text-slate-600 hover:bg-slate-100"
                      : "bg-cyan-500 hover:bg-cyan-400 text-white"
                  }`}
                >
                  {course.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">How it works</h2>
            <p className="text-slate-500 mt-3">
              From signup to your first practice exam in under 2 minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.step} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center text-sm font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Start your prep today
        </h2>
        <p className="text-slate-500 mb-8 max-w-lg mx-auto">
          The free plan gives you real questions, real rationales, and real
          exam experience — no credit card needed.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/auth/signup"
            className="bg-black hover:opacity-90 text-white font-semibold px-8 py-3 rounded-xl transition"
          >
            Create free account
          </Link>
          <Link
            href="/features"
            className="border border-slate-300 bg-white hover:bg-slate-50 text-slate-900 font-semibold px-8 py-3 rounded-xl transition"
          >
            See all features
          </Link>
        </div>
      </div>

    </main>
  );
}