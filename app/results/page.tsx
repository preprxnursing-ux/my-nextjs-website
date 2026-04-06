"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ResultsPage() {
  const [session, setSession] = useState<any>(null);

 useEffect(() => {
  const fetchLatest = async () => {
    const { data, error } = await supabase
      .from("exam_attempts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (data && data.length > 0) {
      setSession({
        score: data[0].correct,
        total: data[0].total_questions,
      });
    }

    if (error) {
      console.error("Fetch error:", error);
    }
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

  if (percentage >= 80) {
    profile = "Clinical Strategist";
    message = "You are demonstrating strong clinical judgment.";
    color = "text-green-600";
  } else if (percentage >= 60) {
    profile = "Advancing Learner";
    message = "You're improving, but consistency is key.";
    color = "text-amber-600";
  } else {
    profile = "Developing Core";
    message = "Focus on fundamentals and repetition.";
    color = "text-red-600";
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
            <Link
              href="/quiz"
              className="bg-black text-white px-5 py-3 rounded-xl"
            >
              Go to Quiz
            </Link>

            <Link
              href="/"
              className="border px-5 py-3 rounded-xl bg-white"
            >
              Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Summary Card */}
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
          <p className="text-sm uppercase tracking-widest text-gray-500">
            Performance Intelligence
          </p>

          <h1 className="text-4xl font-bold mt-3">
            Your Cognitive Snapshot
          </h1>

          <p className={`mt-3 font-semibold ${color}`}>{profile}</p>
          <p className="text-gray-600 mt-2">{message}</p>

          <div className="mt-6 text-2xl font-bold">
            Score: {session.score} / {session.total}
          </div>

          <div className="text-lg text-gray-700 mt-2">
            Accuracy: {percentage}%
          </div>
        </div>

        {/* Actions */}
        <div className="bg-black text-white rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold">
            What do you want to do next?
          </h2>

          <p className="text-gray-300 mt-2">
            Review your decisions or start another exam session.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/review"
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
            >
              Open Review Lab
            </Link>

            <Link
              href="/quiz"
              className="border border-white px-6 py-3 rounded-xl"
            >
              Start New Exam
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}