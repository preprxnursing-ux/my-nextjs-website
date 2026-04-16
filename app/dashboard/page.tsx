import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Get the logged-in user â€” redirect to login if not logged in
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  // Get their profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Get their exam attempts
  const { data: attempts } = await supabase
    .from("exam_attempts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Calculate stats
  const totalAttempts = attempts?.length ?? 0;
  const averageScore = totalAttempts > 0
    ? Math.round(attempts!.reduce((sum, a) => sum + (a.score ?? 0), 0) / totalAttempts)
    : 0;
  const bestScore = totalAttempts > 0
    ? Math.max(...attempts!.map((a) => a.score ?? 0))
    : 0;
  const latestAttempt = attempts?.[0] ?? null;

  // Get first name for greeting
  const firstName = profile?.full_name?.split(" ")[0]
    ?? user.email?.split("@")[0]
    ?? "Student";

  // Time of day greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <main className="min-h-screen bg-[#f1f5f9]">
      <div className="mx-auto max-w-7xl px-4 py-10 space-y-8">

        {/* HEADER */}
        <div className="rounded-2xl bg-black text-white p-8">
          <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-1">
            {greeting}
          </p>
          <h1 className="text-3xl font-bold mb-2">
            {greeting}, {firstName} ðŸ‘‹
          </h1>
          <p className="text-slate-400 text-sm">
            {totalAttempts === 0
              ? "You haven't taken any exams yet â€” start your first one below."
              : `You've completed ${totalAttempts} exam${totalAttempts > 1 ? "s" : ""} so far. Keep going!`}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/quiz/select"
              className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-6 py-2.5 rounded-xl transition text-sm"
            >
              Start New Exam
            </Link>
            <Link
              href="/history"
              className="border border-white/20 text-white hover:bg-white/10 font-semibold px-6 py-2.5 rounded-xl transition text-sm"
            >
              View History
            </Link>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Exams"
            value={String(totalAttempts)}
            sub="Attempts completed"
            color="cyan"
          />
          <StatCard
            label="Average Score"
            value={totalAttempts > 0 ? `${averageScore}%` : "â€”"}
            sub="Across all attempts"
            color="indigo"
          />
          <StatCard
            label="Best Score"
            value={totalAttempts > 0 ? `${Math.round(bestScore)}%` : "â€”"}
            sub="Your personal best"
            color="emerald"
          />
          <StatCard
            label="Latest Score"
            value={latestAttempt ? `${Math.round(latestAttempt.score ?? 0)}%` : "â€”"}
            sub="Most recent exam"
            color="amber"
          />
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-6">

          {/* RECENT ATTEMPTS */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900">Recent Attempts</h2>
              <Link href="/history" className="text-sm text-cyan-600 hover:underline">
                View all
              </Link>
            </div>

            {totalAttempts === 0 ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-slate-500 text-sm">No exams yet</p>
                <Link href="/quiz/select" className="mt-3 inline-block text-sm text-cyan-600 hover:underline font-medium">
                  Take your first exam â†’
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {attempts!.slice(0, 5).map((attempt, index) => {
                  const score = Math.round(attempt.score ?? 0);
                  const scoreColor = score >= 80
                    ? "text-emerald-600 bg-emerald-50 border-emerald-200"
                    : score >= 60
                    ? "text-amber-600 bg-amber-50 border-amber-200"
                    : "text-rose-600 bg-rose-50 border-rose-200";

                  const date = new Date(attempt.created_at).toLocaleDateString(undefined, {
                    month: "short", day: "numeric", year: "numeric"
                  });

                  return (
                    <div key={attempt.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Attempt {totalAttempts - index}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{date} Â· {attempt.mode ?? "Standard"}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${scoreColor}`}>
                          {score}%
                        </span>
                        <Link
                          href="/results"
                          className="text-xs text-cyan-600 hover:underline font-medium"
                        >
                          Review
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* QUICK ACTIONS */}
          <div className="space-y-4">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/quiz/select"
                  className="flex items-center gap-3 p-3 rounded-xl bg-cyan-50 border border-cyan-100 hover:bg-cyan-100 transition">
                  <div className="w-9 h-9 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-cyan-900">Start Exam</p>
                    <p className="text-xs text-cyan-600">Jump into a new session</p>
                  </div>
                </Link>

                <Link href="/review"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition">
                  <div className="w-9 h-9 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Open Review</p>
                    <p className="text-xs text-slate-500">Study your last attempt</p>
                  </div>
                </Link>

                <Link href="/results"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition">
                  <div className="w-9 h-9 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">View Results</p>
                    <p className="text-xs text-slate-500">See your latest score</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* ACCOUNT CARD */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-3">Account</h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {firstName[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{profile?.full_name ?? firstName}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Plan</span>
                <span className="text-xs font-bold text-cyan-600 bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full capitalize">
                  {profile?.role ?? "free"}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value, sub, color }: {
  label: string;
  value: string;
  sub: string;
  color: "cyan" | "indigo" | "emerald" | "amber";
}) {
  const colors = {
    cyan:    "bg-cyan-50 border-cyan-100 text-cyan-700",
    indigo:  "bg-indigo-50 border-indigo-100 text-indigo-700",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-700",
    amber:   "bg-amber-50 border-amber-100 text-amber-700",
  };

  return (
    <div className={`rounded-2xl border p-5 ${colors[color]}`}>
      <p className="text-xs font-semibold uppercase tracking-widest opacity-70 mb-1">{label}</p>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-xs opacity-60">{sub}</p>
    </div>
  );
}
