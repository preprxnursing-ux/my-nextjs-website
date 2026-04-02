"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getExamSession, type ExamSession } from "../../lib/examStorage";

export default function ResultsPage() {
  const [session, setSession] = useState<ExamSession | null>(null);

  useEffect(() => {
    const saved = getExamSession();
    setSession(saved);
  }, []);

  const percentage = useMemo(() => {
    if (!session || session.totalQuestions === 0) return 0;
    return Math.round((session.score / session.totalQuestions) * 100);
  }, [session]);

  const flaggedCount = useMemo(() => {
    if (!session) return 0;
    return session.flaggedQuestions.filter(Boolean).length;
  }, [session]);

  const highConfidenceCount = useMemo(() => {
    if (!session) return 0;
    return session.confidenceLevels.filter((c) => c === "High").length;
  }, [session]);

  const mediumConfidenceCount = useMemo(() => {
    if (!session) return 0;
    return session.confidenceLevels.filter((c) => c === "Medium").length;
  }, [session]);

  const lowConfidenceCount = useMemo(() => {
    if (!session) return 0;
    return session.confidenceLevels.filter((c) => c === "Low").length;
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

        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
          <p className="text-sm uppercase tracking-widest text-gray-500">
            Performance Intelligence
          </p>

          <h1 className="text-4xl font-bold mt-3">
            Your Cognitive Snapshot
          </h1>

          <p className={`mt-3 font-semibold ${color}`}>{profile}</p>
          <p className="text-gray-600 mt-2">{message}</p>

          <div className="mt-8 flex justify-center">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 rounded-full border-[10px] border-gray-200" />
              <div
                className="absolute inset-0 rounded-full border-[10px] border-black"
                style={{
                  clipPath: `inset(0 ${100 - percentage}% 0 0)`
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{percentage}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow">
            <p className="text-sm text-gray-500">Score</p>
            <p className="text-2xl font-bold">
              {session.score}/{session.totalQuestions}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <p className="text-sm text-gray-500">Flagged</p>
            <p className="text-2xl font-bold">{flaggedCount}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <p className="text-sm text-gray-500">Checked</p>
            <p className="text-2xl font-bold">
              {session.checkedAnswers.filter(Boolean).length}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <p className="text-sm text-gray-500">Accuracy</p>
            <p className="text-2xl font-bold">{percentage}%</p>
          </div>
        </div>

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