"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

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

function getPerformanceLabel(percentage: number) {
  if (percentage >= 85) return "Excellent";
  if (percentage >= 70) return "Strong";
  if (percentage >= 50) return "Developing";
  return "Needs Review";
}

function getPerformanceGradient(percentage: number) {
  if (percentage >= 85) return "from-emerald-500 to-teal-600";
  if (percentage >= 70) return "from-blue-500 to-indigo-600";
  if (percentage >= 50) return "from-amber-500 to-orange-600";
  return "from-rose-500 to-red-600";
}

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const supabase = createClient();

      // Get logged in user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("exam_attempts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Fetch history error:", error);
        setLoading(false);
        return;
      }

      if (data) {
        const formatted = data.map((item) => ({
          id: item.id,
          score: item.correct,
          total: item.total_questions,
          percentage: item.score ? Math.round(item.score) : 0,
          completedAt: item.created_at,
          flaggedCount: item.flagged_questions?.length ?? 0,
          answeredCount: item.total_questions,
          timeUsed: item.time_used ?? 0,
          timeRemaining: item.time_remaining ?? 0,
          mode: item.mode ?? "standard",
        }));
        setHistory(formatted);
      }

      setLoading(false);
    };

    fetchHistory();
  }, []);

  const chartData = history.map((item, index) => ({
    name: `Attempt ${history.length - index}`,
    score: item.percentage || 0,
  })).reverse();

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
    return history.reduce((sum, item) => sum + (item.flaggedCount ?? 0), 0);
  }, [history]);

  const totalAnswered = useMemo(() => {
    return history.reduce((sum, item) => sum + (item.answeredCount ?? 0), 0);
  }, [history]);

  function formatSeconds(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Loading your history...</p>
      </main>
    );
  }

  if (!history.length) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 p-6 md:p-10">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-white/60 bg-white/80 p-10 text-center shadow-2xl backdrop-blur-xl">
          <h1 className="text-3xl font-bold text-slate-900">No exam history yet</h1>
          <p className="mt-3 text-slate-600">
            Finished attempts will appear here once you complete an exam.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/quiz"
              className="rounded-2xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:opacity-90">
              Start Quiz
            </Link>
            <Link href="/"
              className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-800 transition hover:bg-slate-50">
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
            Track performance, compare attempts, and open a specific session for review.
          </p>
        </div>

        {/* CHART */}
        <div className="mb-6 rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
          <p className="text-sm text-slate-300 mb-4">Performance Trend</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.length ? chartData : [{ name: "Start", score: 0 }]}>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis domain={[0, 100]} stroke="#94a3b8" />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <Line type="monotone" dataKey="score" stroke="#38bdf8" strokeWidth={3}
                  dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* STATS */}
        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Total Attempts", value: history.length },
            { label: "Average Score", value: `${averageScore}%` },
            { label: "Best Attempt", value: bestAttempt ? `${bestAttempt.percentage}%` : "--" },
            { label: "Total Flagged", value: totalFlagged },
          ].map((stat) => (
            <div key={stat.label} className="rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <p className="text-sm text-slate-300">{stat.label}</p>
              <p className="mt-2 text-4xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* ATTEMPTS LIST */}
        <div className="space-y-5">
          {history.map((attempt, index) => {
            const gradient = getPerformanceGradient(attempt.percentage);
            const label = getPerformanceLabel(attempt.percentage);
            const isLatest = index === 0;

            return (
              <section key={attempt.id}
                className={`overflow-hidden rounded-[28px] border shadow-2xl backdrop-blur-xl transition ${
                  isLatest ? "border-emerald-400/40 bg-emerald-500/10" : "border-white/10 bg-white/10"
                }`}>
                <div className={`bg-gradient-to-r ${gradient} p-6 text-white`}>
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm uppercase tracking-[0.2em] text-white/80">
                          Attempt {history.length - index}
                        </p>
                        {isLatest && (
                          <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-semibold">Latest</span>
                        )}
                        <span className="rounded-full bg-white/15 px-2 py-1 text-xs font-semibold">
                          {getModeLabel(attempt.mode)}
                        </span>
                      </div>
                      <h2 className="mt-2 text-3xl font-bold">
                        {attempt.percentage}% . {label}
                      </h2>
                    </div>
                    <p className="text-sm text-white/85">{formatAttemptDate(attempt.completedAt)}</p>
                  </div>
                </div>

                <div className="grid gap-4 p-6 md:grid-cols-5">
                  {[
                    { label: "Score", value: `${attempt.score}/${attempt.total}` },
                    { label: "Answered", value: attempt.answeredCount },
                    { label: "Flagged", value: attempt.flaggedCount },
                    { label: "Time Used", value: formatSeconds(attempt.timeUsed) },
                    { label: "Time Left", value: formatSeconds(attempt.timeRemaining) },
                  ].map((m) => (
                    <div key={m.label} className="rounded-2xl border border-white/10 bg-black/10 p-4">
                      <p className="text-xs text-slate-300">{m.label}</p>
                      <p className="mt-2 text-2xl font-bold text-white">{m.value}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 p-5">
                  <div className="flex flex-wrap gap-3">
                    <Link href="/results"
                      className="rounded-2xl border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
                      View Results
                    </Link>
                    <Link href="/review"
                      className="rounded-2xl border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
                      Review Answers
                    </Link>
                    <Link href="/quiz"
                      className="rounded-2xl border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
                      Retake Exam
                    </Link>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/quiz"
            className="rounded-2xl bg-white px-5 py-3 font-medium text-slate-900 transition hover:opacity-90">
            Start New Exam
          </Link>
          <Link href="/results"
            className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 font-medium text-white transition hover:bg-white/15">
            View Latest Results
          </Link>
        </div>
      </div>
    </main>
  );
}