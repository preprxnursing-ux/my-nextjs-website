"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ResultsPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
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
        .order("created_at", { ascending: false })
        .limit(1);

      if (data && data.length > 0) {
        setSession({
          score: data[0].correct,
          total: data[0].total_questions,
          mode: data[0].mode,
          timeUsed: data[0].time_used,
          createdAt: data[0].created_at,
        });
      }

      if (error) console.error("Fetch error:", error);
      setLoading(false);
    };

    fetchLatest();
  }, []);

  const percentage = useMemo(() => {
    if (!session || session.total === 0) return 0;
    return Math.round((session.score / session.total) * 100);
  }, [session]);

  let profile = "Emerging Thinker";
  let message = "You're building your clinical reasoning foundation.";
  let color = "text-amber-600";
  let bgColor = "bg-amber-50 border-amber-200";

  if (percentage >= 80) {
    profile = "Clinical Strategist";
    message = "You are demonstrating strong clinical judgment.";
    color = "text-emerald-600";
    bgColor = "bg-emerald-50 border-emerald-200";
  } else if (percentage >= 60) {
    profile = "Advancing Learner";
    message = "You're improving -- consistency is key.";
    color = "text-amber-600";
    bgColor = "bg-amber-50 border-amber-200";
  } else {
    profile = "Developing Core";
    message = "Focus on fundamentals and repetition.";
    color = "text-rose-600";
    bgColor = "bg-rose-50 border-rose-200";
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <p className="text-slate-500 text-sm">Loading your results...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="pt-10 px-4">
        <div className="max-w-4xl mx-auto bg-white border rounded-3xl p-8 shadow-sm">
          <h1 className="text-3xl font-bold">No exam data found</h1>
          <p className="text-gray-600 mt-3">
            Finish an exam first so your results can appear here.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/quiz" className="bg-black text-white px-5 py-3 rounded-xl">
              Go to Quiz
            </Link>
            <Link href="/" className="border px-5 py-3 rounded-xl bg-white">
              Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const date = new Date(session.createdAt).toLocaleDateString(undefined, {
    month: "long", day: "numeric", year: "numeric",
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* SUMMARY CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
          <p className="text-sm uppercase tracking-widest text-gray-500">
            Performance Intelligence
          </p>
          <h1 className="text-4xl font-bold mt-3">Your Cognitive Snapshot</h1>

          <div className={`mt-4 inline-block border rounded-2xl px-6 py-3 ${bgColor}`}>
            <p className={`font-bold text-lg ${color}`}>{profile}</p>
            <p className="text-gray-600 text-sm mt-1">{message}</p>
          </div>

          <div className="mt-6 text-3xl font-bold text-slate-900">
            {session.score} / {session.total}
          </div>
          <div className="text-lg text-gray-500 mt-1">
            Accuracy: {percentage}%
          </div>

          {/* SCORE BAR */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  percentage >= 80 ? "bg-emerald-500" :
                  percentage >= 60 ? "bg-amber-500" : "bg-rose-500"
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* STATS ROW */}
          <div className="mt-6 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Mode</p>
              <p className="font-bold text-slate-800 mt-1 capitalize">{session.mode ?? "Standard"}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Score</p>
              <p className="font-bold text-slate-800 mt-1">{percentage}%</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Date</p>
              <p className="font-bold text-slate-800 mt-1 text-xs">{date}</p>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="bg-black text-white rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold">What do you want to do next?</h2>
          <p className="text-gray-300 mt-2">
            Review your decisions or start another exam session.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/review"
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">
              Open Review Lab
            </Link>
            <Link href="/history"
              className="border border-white/20 px-6 py-3 rounded-xl hover:bg-white/10 transition">
              View History
            </Link>
            <Link href="/quiz"
              className="border border-white/20 px-6 py-3 rounded-xl hover:bg-white/10 transition">
              Start New Exam
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}