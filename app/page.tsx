"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function HomePage() {
  const [latestScore, setLatestScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
  const fetchLatest = async () => {
    const { data, error } = await supabase
      .from("exam_attempts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (data && data.length > 0) {
  const attempt = data[0];

  setLatestScore(attempt.score);
  setCorrect(attempt.correct);
  setTotal(attempt.total_questions);
}

    if (error) {
      console.error("Fetch error:", error);
    }
  };

  fetchLatest();
}, []);
  return (
    <main className="min-h-screen bg-[#f1f5f9] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-10 space-y-8">

        {/* TOP GRID */}
        <section className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">

          {/* LEFT PANEL */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">

            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              NCLEX Practice Platform
            </p>

            <h1 className="mt-3 text-[40px] leading-[1.15] font-semibold tracking-tight leading-tight">
              Train smarter with a real exam dashboard
            </h1>

            <p className="mt-4 text-[14px] text-slate-500 leading-[1.6] max-w-xl">
              Launch a timed exam, track your score, review rationales,
              and move through a cleaner testing workflow designed for focused practice.
            </p>

            {/* BUTTONS */}
            <div className="mt-6 flex gap-3 flex-wrap">
              <Link
                href="/quiz"
                className="bg-[#0f172a] text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-[#020617] transition"
              >
                Start Exam
              </Link>

              <Link
                href="/review"
                className="border border-slate-200 bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl hover:bg-slate-200 transition"
              >
                Open Review
              </Link>

              <Link
                href="/results"
                className="border border-slate-200 bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl hover:bg-slate-200 transition"
              >
                View Results
              </Link>
            </div>

            {/* METRICS */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Metric
  label="Latest Score"
  value={`${latestScore}%`}
  sub="Most recent saved attempt"
/>
              <Metric label="Correct" value={String(correct)} sub="Answers marked correct" />

<Metric
  label="Incorrect"
  value={String(total - correct)}
  sub="Questions to revisit"
/>

<Metric
  label="Questions"
  value={String(total)}
  sub="Items in saved exam"
/>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">

            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Latest Status
            </p>

            <h2 className="mt-3 text-[22px] font-semibold tracking-tight">
              Time to rebuild weak areas
            </h2>

            <p className="mt-3 text-[14px] text-slate-500 leading-[1.6]">
              Focus on rationales, practice by topic, and improve one concept cluster at a time.
            </p>

            <div className="mt-4 inline-block bg-rose-100 text-rose-600 text-xs px-3 py-1 rounded-full font-medium">
              Needs improvement
            </div>

            {/* PROGRESS */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-[14px] text-slate-500 leading-[1.6]">
                <span>Progress</span>
                <span>0%</span>
              </div>

              <div className="h-2 bg-slate-200/70 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-[#0f172a] rounded-full w-0"></div>
              </div>
            </div>

            {/* STATS */}
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <Stat label="Strongest Topic" value="No topic data yet" />
              <Stat label="Weakest Topic" value="No topic data yet" />
              <Stat label="Reviewed" value="0" />
              <Stat label="Remaining" value="30" />
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="grid md:grid-cols-3 gap-6">
          <Feature title="Timed Exam" text="Practice inside a focused exam session with timer, navigation controls, answer checking, and submission flow." cta="Go to Exam" href="/quiz" />
          <Feature title="Detailed Review" text="Open a complete breakdown of selected answers, correct answers, and rationales for every saved question." cta="Open Review" href="/review" />
          <Feature title="Results Summary" text="See percentage, raw score, and overall performance insight from your latest saved attempt." cta="See Results" href="/results" />
        </section>

        {/* BOTTOM */}
        <section className="grid lg:grid-cols-[1fr_350px] gap-6">

        {/* STUDY FLOW */}
<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
  <div className="flex items-end justify-between">
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        Study Flow
      </p>

      <h3 className="mt-2 text-[22px] font-semibold tracking-tight">
        How to use the app
      </h3>
    </div>

    <Link
      href="/quiz"
      className="text-sm text-slate-600 hover:underline"
    >
      Jump straight into exam mode
    </Link>
  </div>

  <div className="mt-5 grid sm:grid-cols-3 gap-4 text-sm">
    <Step step="01" title="Take the exam" text="Start the quiz and move through the timed question flow one item at a time." />
    <Step step="02" title="Submit and score" text="Finish the exam to save your score and store answer history locally." />
    <Step step="03" title="Review weak areas" text="Use the review page to study incorrect items and learn from each rationale." />
  </div>
</div>

          {/* QUICK ACTIONS */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Quick Actions
            </p>

            <h3 className="mt-2 text-[22px] font-semibold tracking-tight">
              Reset or continue
            </h3>

            <p className="mt-3 text-sm text-[14px] text-slate-500 leading-[1.6]">
              Clear saved browser data to begin fresh, or continue into your current exam workflow.
            </p>

            <div className="mt-6 space-y-3">
              <Link
  href="/quiz"
  className="block w-full text-center bg-[#0f172a] text-white py-2.5 rounded-xl shadow-md hover:bg-[#020617] transition"
>
  Continue to Exam
</Link>

              <Link
  href="/review"
  className="block w-full text-center border border-slate-200 bg-slate-100 py-2.5 rounded-xl hover:bg-slate-200 transition"
>
  Open Review
</Link>

              <button
  onClick={() => {
    localStorage.clear();
    window.location.reload();
  }}
  className="w-full border border-slate-200 bg-slate-100 py-2.5 rounded-xl hover:bg-slate-200 transition text-slate-600"
>
  Reset Saved Progress
</button>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

/* COMPONENTS */

function Metric({ label, value, sub }: any) {
  return (
    <div className="border border-slate-200 bg-slate-50 rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <p className="text-[11px] uppercase tracking-wide text-slate-400 font-medium">{label}</p>
      <p className="text-[22px] font-semibold tracking-tight mt-1">{value}</p>
      <p className="text-[11px] uppercase tracking-wide text-slate-400 font-medium mt-1">{sub}</p>
    </div>
  );
}

function Stat({ label, value }: any) {
  return (
    <div className="border border-slate-200 bg-slate-50 rounded-xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <p className="text-xs text-[14px] text-slate-500 leading-[1.6]">{label}</p>
      <p className="font-semibold mt-1">{value}</p>
    </div>
  );
}

function Feature({ title, text, cta, href }: any) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="mt-2 text-sm text-[14px] text-slate-500 leading-[1.6]">{text}</p>
      <Link href={href} className="inline-block mt-4 bg-[#0f172a] text-white px-4 py-2 rounded-lg shadow-sm hover:bg-[#020617] transition">
        {cta}
      </Link>
    </div>
  );
}

function Step({ step, title, text }: any) {
  return (
    <div className="border border-slate-200 bg-slate-50 rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        Step {step}
      </p>

      <h4 className="mt-2 font-semibold">{title}</h4>

      <p className="mt-2 text-[14px] text-slate-500 leading-[1.6]">
        {text}
      </p>
    </div>
  );
}