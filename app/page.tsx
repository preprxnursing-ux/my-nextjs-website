"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type ReviewAnswer = {
  questionId: number;
  question: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  options: string[];
  selectedAnswer: number;
  correctAnswer: number;
  selectedAnswerText: string;
  correctAnswerText: string;
  isCorrect: boolean;
  rationale: string;
};

type ScoreData = {
  score: number;
  total: number;
};

export default function HomePage() {
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [reviewData, setReviewData] = useState<ReviewAnswer[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedScore = localStorage.getItem("quizScore");
      const savedReview = localStorage.getItem("quizReview");

      if (savedScore) {
        setScoreData(JSON.parse(savedScore));
      }

      if (savedReview) {
        setReviewData(JSON.parse(savedReview));
      }
    } catch (error) {
      console.error("Failed to load saved exam data:", error);
    } finally {
      setLoaded(true);
    }
  }, []);

  const stats = useMemo(() => {
    const total = scoreData?.total ?? reviewData.length ?? 0;
    const correct =
      scoreData?.score ?? reviewData.filter((item) => item.isCorrect).length;
    const incorrect = Math.max(total - correct, 0);
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

    return { total, correct, incorrect, percent };
  }, [scoreData, reviewData]);

  const performance = useMemo(() => {
    if (!loaded || stats.total === 0) {
      return {
        title: "Start your first NCLEX-style exam",
        message:
          "Practice with a timed exam, instant answer feedback, and a full rationale review experience.",
        badge: "No attempt yet",
        tone: "neutral" as const,
      };
    }

    if (stats.percent >= 85) {
      return {
        title: "Excellent momentum",
        message:
          "You’re performing at a very strong level. Keep refining weak topics and maintaining exam stamina.",
        badge: "High performance",
        tone: "excellent" as const,
      };
    }

    if (stats.percent >= 70) {
      return {
        title: "Strong progress",
        message:
          "You have a solid foundation. Review missed questions and keep pushing for consistency.",
        badge: "Passing range",
        tone: "good" as const,
      };
    }

    if (stats.percent >= 50) {
      return {
        title: "Building steadily",
        message:
          "You’re moving in the right direction. Use the review page to strengthen patterns in missed content.",
        badge: "Developing",
        tone: "warning" as const,
      };
    }

    return {
      title: "Time to rebuild weak areas",
      message:
        "Focus on rationales, practice by topic, and improve one concept cluster at a time.",
      badge: "Needs improvement",
      tone: "danger" as const,
    };
  }, [loaded, stats]);

  const strongestTopic = useMemo(() => {
    if (!reviewData.length) return "No topic data yet";

    const counts: Record<string, { correct: number; total: number }> = {};

    for (const item of reviewData) {
      if (!counts[item.topic]) {
        counts[item.topic] = { correct: 0, total: 0 };
      }
      counts[item.topic].total += 1;
      if (item.isCorrect) counts[item.topic].correct += 1;
    }

    const ranked = Object.entries(counts)
      .map(([topic, value]) => ({
        topic,
        percent: Math.round((value.correct / value.total) * 100),
      }))
      .sort((a, b) => b.percent - a.percent);

    return ranked[0]?.topic ?? "No topic data yet";
  }, [reviewData]);

  const weakestTopic = useMemo(() => {
    if (!reviewData.length) return "No topic data yet";

    const counts: Record<string, { correct: number; total: number }> = {};

    for (const item of reviewData) {
      if (!counts[item.topic]) {
        counts[item.topic] = { correct: 0, total: 0 };
      }
      counts[item.topic].total += 1;
      if (item.isCorrect) counts[item.topic].correct += 1;
    }

    const ranked = Object.entries(counts)
      .map(([topic, value]) => ({
        topic,
        percent: Math.round((value.correct / value.total) * 100),
      }))
      .sort((a, b) => a.percent - b.percent);

    return ranked[0]?.topic ?? "No topic data yet";
  }, [reviewData]);

  const reviewedCount = reviewData.length;
  const remainingEstimate = Math.max(stats.total - reviewedCount, 0);

  const handleReset = () => {
    localStorage.removeItem("quizScore");
    localStorage.removeItem("quizReview");
    window.location.reload();
  };

  const badgeClass =
    performance.tone === "excellent"
      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
      : performance.tone === "good"
      ? "bg-blue-100 text-blue-700 border-blue-200"
      : performance.tone === "warning"
      ? "bg-amber-100 text-amber-700 border-amber-200"
      : performance.tone === "danger"
      ? "bg-rose-100 text-rose-700 border-rose-200"
      : "bg-slate-100 text-slate-700 border-slate-200";

  const progressBarClass =
    performance.tone === "excellent"
      ? "bg-emerald-500"
      : performance.tone === "good"
      ? "bg-blue-500"
      : performance.tone === "warning"
      ? "bg-amber-500"
      : performance.tone === "danger"
      ? "bg-rose-500"
      : "bg-slate-900";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                NCLEX Practice Platform
              </div>

              <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Train smarter with a real exam dashboard
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Launch a timed exam, track your score, review rationales, and
                move through a cleaner testing workflow designed for focused
                practice.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/quiz"
                  className="rounded-2xl bg-slate-900 px-6 py-3 text-center font-medium text-white transition hover:opacity-90"
                >
                  Start Exam
                </Link>

                <Link
                  href="/review"
                  className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-center font-medium text-slate-800 transition hover:bg-slate-50"
                >
                  Open Review
                </Link>

                <Link
                  href="/results"
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-3 text-center font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  View Results
                </Link>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <DashboardMetric
                  label="Latest Score"
                  value={loaded && stats.total > 0 ? `${stats.percent}%` : "--"}
                  helper="Most recent saved attempt"
                />
                <DashboardMetric
                  label="Correct"
                  value={loaded ? String(stats.correct) : "--"}
                  helper="Answers marked correct"
                />
                <DashboardMetric
                  label="Incorrect"
                  value={loaded ? String(stats.incorrect) : "--"}
                  helper="Questions to revisit"
                />
                <DashboardMetric
                  label="Questions"
                  value={loaded ? String(stats.total) : "--"}
                  helper="Items in saved exam"
                />
              </div>
            </div>

            <div className="border-t border-slate-200 bg-slate-50 p-6 sm:p-8 lg:border-l lg:border-t-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Latest Status
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight">
                {performance.title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {performance.message}
              </p>

              <div
                className={`mt-4 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${badgeClass}`}
              >
                {performance.badge}
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                  <span>Progress</span>
                  <span>{loaded ? `${stats.percent}%` : "--"}</span>
                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full transition-all ${progressBarClass}`}
                    style={{ width: `${loaded ? stats.percent : 0}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <StatusMiniCard label="Strongest Topic" value={strongestTopic} />
                <StatusMiniCard label="Weakest Topic" value={weakestTopic} />
                <StatusMiniCard
                  label="Reviewed"
                  value={loaded ? String(reviewedCount) : "--"}
                />
                <StatusMiniCard
                  label="Remaining"
                  value={loaded ? String(remainingEstimate) : "--"}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <FeatureCard
            title="Timed Exam"
            text="Practice inside a focused exam session with timer, navigation controls, answer checking, and submission flow."
            href="/quiz"
            cta="Go to Exam"
          />

          <FeatureCard
            title="Detailed Review"
            text="Open a complete breakdown of selected answers, correct answers, and rationales for every saved question."
            href="/review"
            cta="Open Review"
          />

          <FeatureCard
            title="Results Summary"
            text="See percentage, raw score, and overall performance insight from your latest saved attempt."
            href="/results"
            cta="See Results"
          />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Study Flow
                </p>
                <h3 className="mt-2 text-2xl font-bold">How to use the app</h3>
              </div>

              <Link
                href="/quiz"
                className="text-sm font-medium text-slate-700 underline-offset-4 hover:underline"
              >
                Jump straight into exam mode
              </Link>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <StepCard
                step="01"
                title="Take the exam"
                text="Start the quiz and move through the timed question flow one item at a time."
              />
              <StepCard
                step="02"
                title="Submit and score"
                text="Finish the exam to save your score and store answer history locally."
              />
              <StepCard
                step="03"
                title="Review weak areas"
                text="Use the review page to study incorrect items and learn from each rationale."
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Quick Actions
            </p>
            <h3 className="mt-2 text-2xl font-bold">Reset or continue</h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Clear saved browser data to begin fresh, or continue into your
              current exam workflow.
            </p>

            <div className="mt-6 space-y-3">
              <Link
                href="/quiz"
                className="block w-full rounded-2xl bg-slate-900 px-5 py-3 text-center font-medium text-white transition hover:opacity-90"
              >
                Continue to Exam
              </Link>

              <Link
                href="/review"
                className="block w-full rounded-2xl border border-slate-300 bg-white px-5 py-3 text-center font-medium text-slate-800 transition hover:bg-slate-50"
              >
                Open Review
              </Link>

              <button
                onClick={handleReset}
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-800 transition hover:bg-slate-50"
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

function DashboardMetric({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{helper}</p>
    </div>
  );
}

function StatusMiniCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function FeatureCard({
  title,
  text,
  href,
  cta,
}: {
  title: string;
  text: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
      <Link
        href={href}
        className="mt-6 inline-block rounded-2xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:opacity-90"
      >
        {cta}
      </Link>
    </div>
  );
}

function StepCard({
  step,
  title,
  text,
}: {
  step: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Step {step}
      </p>
      <h4 className="mt-2 text-lg font-bold text-slate-900">{title}</h4>
      <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
    </div>
  );
}