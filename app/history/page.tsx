"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ExamHistoryItem,
  formatSeconds,
  getExamHistory,
  getPerformanceGradient,
  getPerformanceLabel,
} from "@/lib/quiz-utils";

const ACTIVE_ATTEMPT_KEY = "quiz_activeAttemptId";

function setActiveAttempt(attemptId: string) {
  localStorage.setItem(ACTIVE_ATTEMPT_KEY, attemptId);
}

function getModeLabel(mode?: string) {
  if (mode === "tutor") return "Tutor";
  if (mode === "quick") return "Quick";
  if (mode === "timed") return "Timed";
  return "Standard";
}

function formatAttemptDate(value?: string) {
  if (!value) return "Unknown date";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Unknown date";

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function HistoryPage() {
  const [history, setHistory] = useState<ExamHistoryItem[]>([]);
  const [activeAttemptId, setActiveAttemptId] = useState<string | null>(null);

  useEffect(() => {
    const savedHistory = getExamHistory();
    setHistory(savedHistory);

    const savedActiveAttemptId = localStorage.getItem(ACTIVE_ATTEMPT_KEY);
    setActiveAttemptId(savedActiveAttemptId);
  }, []);

  const bestAttempt = useMemo(() => {
    if (!history.length) return null;
    return [...history].sort((a, b) => b.percentage - a.percentage)[0];
  }, [history]);

  const averageScore = useMemo(() => {
    if (!history.length) return 0;
    const total = history.reduce((sum, item) => sum + item.percentage, 0);
    return Math.round(total / history.length);
  }, [history]);

  const totalFlagged = useMemo(() => {
    if (!history.length) return 0;
    return history.reduce((sum, item) => sum + (item.flaggedCount ?? 0), 0);
  }, [history]);

  const totalAnswered = useMemo(() => {
    if (!history.length) return 0;
    return history.reduce((sum, item) => sum + (item.answeredCount ?? 0), 0);
  }, [history]);

  if (!history.length) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 p-6 md:p-10">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-white/60 bg-white/80 p-10 text-center shadow-2xl backdrop-blur-xl">
          <h1 className="text-3xl font-bold text-slate-900">No exam history yet</h1>
          <p className="mt-3 text-slate-600">
            Finished attempts will appear here for this client.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/quiz"
              className="rounded-2xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:opacity-90"
            >
              Start Quiz
            </Link>

            <Link
              href="/"
              className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-800 transition hover:bg-slate-50"
            >
              Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="mb-2 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-200">
            Attempt Archive
          </p>
          <h1 className="text-3xl font-bold text-white md:text-5xl">
            History and progress
          </h1>
          <p className="mt-2 text-slate-300">
            Track performance for this browser, compare attempts, and open a
            specific session for review.
          </p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
            <p className="text-sm text-slate-300">Total Attempts</p>
            <p className="mt-2 text-4xl font-bold text-white">{history.length}</p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
            <p className="text-sm text-slate-300">Average Score</p>
            <p className="mt-2 text-4xl font-bold text-white">{averageScore}%</p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
            <p className="text-sm text-slate-300">Best Attempt</p>
            <p className="mt-2 text-4xl font-bold text-white">
              {bestAttempt ? `${bestAttempt.percentage}%` : "--"}
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
            <p className="text-sm text-slate-300">Flagged Total</p>
            <p className="mt-2 text-4xl font-bold text-white">{totalFlagged}</p>
          </div>
        </div>

        <div className="mb-6 rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-300">
                Latest active attempt
              </p>
              <p className="mt-2 text-xl font-bold text-white">
                {activeAttemptId
                  ? history.find((item) => item.id === activeAttemptId)
                    ? `Attempt ${
                        history.length -
                        history.findIndex((item) => item.id === activeAttemptId)
                      }`
                    : "Not found"
                  : "Latest default"}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-300">
                Total answered
              </p>
              <p className="mt-2 text-xl font-bold text-white">{totalAnswered}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-300">
                Best mode
              </p>
              <p className="mt-2 text-xl font-bold text-white">
                {bestAttempt ? getModeLabel((bestAttempt as any).mode) : "Standard"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {history.map((attempt, index) => {
            const gradient = getPerformanceGradient(attempt.percentage);
            const label = getPerformanceLabel(attempt.percentage);
            const isLatest = index === 0;
            const isActive = activeAttemptId === attempt.id;

            return (
              <section
                key={attempt.id}
                className={`overflow-hidden rounded-[28px] border shadow-2xl backdrop-blur-xl transition ${
                  isActive
                    ? "border-cyan-400/50 bg-cyan-500/10"
                    : isLatest
                    ? "border-emerald-400/40 bg-emerald-500/10"
                    : "border-white/10 bg-white/10"
                }`}
              >
                <div className={`bg-gradient-to-r ${gradient} p-6 text-white`}>
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm uppercase tracking-[0.2em] text-white/80">
                          Attempt {history.length - index}
                        </p>

                        {isLatest && (
                          <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-semibold">
                            Latest
                          </span>
                        )}

                        {isActive && (
                          <span className="rounded-full bg-slate-900/30 px-2 py-1 text-xs font-semibold">
                            Active
                          </span>
                        )}

                        <span className="rounded-full bg-white/15 px-2 py-1 text-xs font-semibold">
                          {getModeLabel((attempt as any).mode)}
                        </span>
                      </div>

                      <h2 className="mt-2 text-3xl font-bold">
                        {attempt.percentage}% · {label}
                      </h2>
                    </div>

                    <p className="text-sm text-white/85">
                      {formatAttemptDate(attempt.completedAt)}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 p-6 md:grid-cols-5">
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-slate-300">Score</p>
                    <p className="mt-2 text-2xl font-bold text-white">
                      {attempt.score}/{attempt.total}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-slate-300">Answered</p>
                    <p className="mt-2 text-2xl font-bold text-white">
                      {attempt.answeredCount}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-slate-300">Flagged</p>
                    <p className="mt-2 text-2xl font-bold text-white">
                      {attempt.flaggedCount}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-slate-300">Time Used</p>
                    <p className="mt-2 text-2xl font-bold text-white">
                      {formatSeconds(attempt.timeUsed)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs text-slate-300">Time Left</p>
                    <p className="mt-2 text-2xl font-bold text-white">
                      {formatSeconds(attempt.timeRemaining)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/10 p-5">
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        setActiveAttempt(attempt.id);
                        setActiveAttemptId(attempt.id);
                      }}
                      className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:opacity-90"
                    >
                      Set Active
                    </button>

                    <Link
                      href="/results"
                      onClick={() => {
                        setActiveAttempt(attempt.id);
                        setActiveAttemptId(attempt.id);
                      }}
                      className="rounded-2xl border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                    >
                      View Results
                    </Link>

                    <Link
                      href="/review"
                      onClick={() => {
                        setActiveAttempt(attempt.id);
                        setActiveAttemptId(attempt.id);
                      }}
                      className="rounded-2xl border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                    >
                      Review Answers
                    </Link>

                    <Link
                      href="/quiz"
                      className="rounded-2xl border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                    >
                      Retake Exam
                    </Link>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/quiz"
            className="rounded-2xl bg-white px-5 py-3 font-medium text-slate-900 transition hover:opacity-90"
          >
            Start New Exam
          </Link>

          <Link
            href="/results"
            className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 font-medium text-white transition hover:bg-white/15"
          >
            View Latest Results
          </Link>

          <Link
            href="/review"
            className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 font-medium text-white transition hover:bg-white/15"
          >
            Open Review
          </Link>
        </div>
      </div>
    </main>
  );
}