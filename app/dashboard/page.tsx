import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: attempts } = await supabase
    .from("exam_attempts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const totalAttempts = attempts?.length ?? 0;
  const averageScore = totalAttempts > 0
    ? Math.round(attempts!.reduce((sum, a) => sum + (a.score ?? 0), 0) / totalAttempts)
    : 0;
  const bestScore = totalAttempts > 0
    ? Math.max(...attempts!.map((a) => a.score ?? 0))
    : 0;
  const latestAttempt = attempts?.[0] ?? null;
  const latestScore = latestAttempt ? Math.round(latestAttempt.score ?? 0) : 0;

  const firstName = profile?.full_name?.split(" ")[0]
    ?? user.email?.split("@")[0]
    ?? "Student";

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const scoreColor = latestScore >= 80 ? "#10b981" : latestScore >= 60 ? "#f59e0b" : "#ef4444";
  const scoreLabel = latestScore >= 80 ? "Excellent" : latestScore >= 60 ? "Good progress" : totalAttempts === 0 ? "No data yet" : "Needs work";

  const stats = [
    { label: "Total Exams", value: String(totalAttempts), sub: "Sessions completed", accent: "#0ea5e9", icon: (<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>) },
    { label: "Average Score", value: totalAttempts > 0 ? `${averageScore}%` : "Ã¢â‚¬â€", sub: "Across all attempts", accent: "#8b5cf6", icon: (<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>) },
    { label: "Best Score", value: totalAttempts > 0 ? `${Math.round(bestScore)}%` : "Ã¢â‚¬â€", sub: "Your personal best", accent: "#10b981", icon: (<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>) },
    { label: "Latest Score", value: totalAttempts > 0 ? `${latestScore}%` : "Ã¢â‚¬â€", sub: "Most recent exam", accent: "#f59e0b", icon: (<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>) },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg,#060f1e 0%,#0d1f35 50%,#0e2540 100%)", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#e2e8f0" }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .dash-card { animation: fadeUp .5s ease both; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); border-radius: 20px; transition: border-color .2s, box-shadow .2s; }
        .dash-card:hover { border-color: rgba(14,165,233,.25); box-shadow: 0 8px 32px rgba(0,0,0,.3); }
        .stat-card { animation: fadeUp .5s ease both; border-radius: 18px; padding: 24px; position: relative; overflow: hidden; transition: transform .2s, box-shadow .2s; }
        .stat-card:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,.4); }
        .action-btn { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-radius: 14px; text-decoration: none; transition: all .2s; border: 1px solid rgba(255,255,255,.07); background: rgba(255,255,255,.03); }
        .action-btn:hover { background: rgba(255,255,255,.07); border-color: rgba(14,165,233,.3); transform: translateX(4px); }
        .attempt-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; border-radius: 12px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.06); transition: all .2s; margin-bottom: 8px; }
        .attempt-row:hover { background: rgba(255,255,255,.06); border-color: rgba(14,165,233,.2); }
        .glow-ring { position: absolute; border-radius: 50%; filter: blur(40px); opacity: .15; pointer-events: none; }
      `}</style>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>

        {/* HERO */}
        <div style={{ animation: "fadeUp .4s ease both", marginBottom: "32px", background: "linear-gradient(135deg,rgba(14,165,233,.12) 0%,rgba(139,92,246,.08) 100%)", border: "1px solid rgba(14,165,233,.2)", borderRadius: "24px", padding: "40px 48px", position: "relative", overflow: "hidden" }}>
          <div className="glow-ring" style={{ background: "#0ea5e9", top: "-20px", right: "80px", width: "120px", height: "120px" }} />
          <div className="glow-ring" style={{ background: "#8b5cf6", bottom: "-20px", right: "200px", width: "120px", height: "120px" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "8px" }}>{greeting}</p>
              <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.15, marginBottom: "10px" }}>
                Welcome back, {firstName} Ã°Å¸â€˜â€¹
              </h1>
              <p style={{ fontSize: "15px", color: "#94a3b8", maxWidth: "480px" }}>
                {totalAttempts === 0
                  ? "You haven't taken any exams yet Ã¢â‚¬â€ start your first one below."
                  : `${totalAttempts} exam${totalAttempts > 1 ? "s" : ""} completed. Average score: ${averageScore}%. Keep pushing!`}
              </p>
              <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
                <Link href="/quiz/select" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "12px 28px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", textDecoration: "none", boxShadow: "0 8px 24px rgba(14,165,233,.35)" }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Start New Exam
                </Link>
                <Link href="/history" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.08)", color: "#e2e8f0", padding: "12px 24px", borderRadius: "12px", fontWeight: 600, fontSize: "14px", textDecoration: "none", border: "1px solid rgba(255,255,255,.12)" }}>
                  View History
                </Link>
              </div>
            </div>
            <div style={{ flexShrink: 0, textAlign: "center" }}>
              <div style={{ position: "relative", width: "120px", height: "120px", margin: "0 auto" }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="8"/>
                  <circle cx="60" cy="60" r="50" fill="none" stroke={scoreColor} strokeWidth="8"
                    strokeDasharray={`${(latestScore / 100) * 314} 314`}
                    strokeLinecap="round" strokeDashoffset="78.5"
                    style={{ filter: `drop-shadow(0 0 8px ${scoreColor})` }}/>
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 700, color: "#f8fafc", lineHeight: 1 }}>{totalAttempts > 0 ? `${latestScore}%` : "Ã¢â‚¬â€"}</p>
                  <p style={{ fontSize: "10px", color: "#64748b", fontWeight: 600, marginTop: "4px" }}>LATEST</p>
                </div>
              </div>
              <p style={{ fontSize: "12px", fontWeight: 600, color: scoreColor, marginTop: "10px" }}>{scoreLabel}</p>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginBottom: "24px" }}>
          {stats.map((s, i) => (
            <div key={s.label} className="stat-card" style={{ background: `linear-gradient(135deg,${s.accent}12 0%,rgba(255,255,255,.02) 100%)`, border: `1px solid ${s.accent}25`, animationDelay: `${i * 0.08}s` }}>
              <div className="glow-ring" style={{ background: s.accent, top: "-30px", right: "-20px", width: "80px", height: "80px" }} />
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: `${s.accent}20`, border: `1px solid ${s.accent}30`, display: "flex", alignItems: "center", justifyContent: "center", color: s.accent, marginBottom: "16px" }}>{s.icon}</div>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.2rem", fontWeight: 700, color: "#f8fafc", lineHeight: 1, marginBottom: "6px" }}>{s.value}</p>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: "2px" }}>{s.label}</p>
              <p style={{ fontSize: "11px", color: "#475569" }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "20px" }}>

          {/* ATTEMPTS */}
          <div className="dash-card" style={{ padding: "32px", animationDelay: ".2s" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", letterSpacing: ".16em", textTransform: "uppercase", marginBottom: "4px" }}>Performance</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", fontWeight: 700, color: "#f8fafc" }}>Recent Attempts</h2>
              </div>
              <Link href="/history" style={{ fontSize: "13px", color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>View all Ã¢â€ â€™</Link>
            </div>
            {totalAttempts === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 24px" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(14,165,233,.1)", border: "1px solid rgba(14,165,233,.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#0ea5e9" }}>
                  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                </div>
                <p style={{ fontSize: "16px", fontWeight: 600, color: "#94a3b8", marginBottom: "8px" }}>No exams yet</p>
                <Link href="/quiz/select" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "10px 24px", borderRadius: "10px", fontWeight: 700, fontSize: "13px", textDecoration: "none" }}>Start First Exam Ã¢â€ â€™</Link>
              </div>
            ) : (
              <div>
                {attempts!.slice(0, 6).map((attempt, index) => {
                  const score = Math.round(attempt.score ?? 0);
                  const ac = score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";
                  const date = new Date(attempt.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
                  return (
                    <div key={attempt.id} className="attempt-row">
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${ac}15`, border: `1px solid ${ac}30`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", fontWeight: 700, color: ac, flexShrink: 0 }}>{totalAttempts - index}</div>
                        <div>
                          <p style={{ fontSize: "14px", fontWeight: 600, color: "#e2e8f0", marginBottom: "2px" }}>Attempt {totalAttempts - index}</p>
                          <p style={{ fontSize: "11px", color: "#475569" }}>{date} Ã‚Â· {attempt.mode ?? "Standard"}</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ width: "80px", height: "4px", background: "rgba(255,255,255,.06)", borderRadius: "4px", overflow: "hidden", marginBottom: "4px" }}>
                            <div style={{ height: "100%", width: `${score}%`, background: ac, borderRadius: "4px" }} />
                          </div>
                          <p style={{ fontSize: "13px", fontWeight: 700, color: ac }}>{score}%</p>
                        </div>
                        <Link href="/results" style={{ fontSize: "12px", color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>Review Ã¢â€ â€™</Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="dash-card" style={{ padding: "28px", animationDelay: ".25s" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", letterSpacing: ".16em", textTransform: "uppercase", marginBottom: "4px" }}>Quick Actions</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 700, color: "#f8fafc", marginBottom: "20px" }}>Jump in</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { href: "/quiz/select", label: "Start Exam", sub: "New practice session", color: "#0ea5e9", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>) },
                  { href: "/review", label: "Open Review", sub: "Study your last attempt", color: "#8b5cf6", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>) },
                  { href: "/results", label: "View Results", sub: "See your latest score", color: "#10b981", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>) },
                  { href: "/history", label: "Full History", sub: "All past attempts", color: "#f59e0b", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>) },
                ].map(a => (
                  <Link key={a.label} href={a.href} className="action-btn">
                    <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: `${a.color}18`, border: `1px solid ${a.color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: a.color, flexShrink: 0 }}>{a.icon}</div>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: "#e2e8f0", margin: 0 }}>{a.label}</p>
                      <p style={{ fontSize: "11px", color: "#475569", margin: 0 }}>{a.sub}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="dash-card" style={{ padding: "28px", animationDelay: ".3s" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", letterSpacing: ".16em", textTransform: "uppercase", marginBottom: "16px" }}>Account</p>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 700, color: "#fff", boxShadow: "0 4px 16px rgba(14,165,233,.35)", flexShrink: 0 }}>
                  {firstName[0]?.toUpperCase()}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#f1f5f9", marginBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{profile?.full_name ?? firstName}</p>
                  <p style={{ fontSize: "11px", color: "#475569", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "rgba(14,165,233,.06)", border: "1px solid rgba(14,165,233,.15)", borderRadius: "12px", marginBottom: "12px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".1em" }}>Plan</span>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#0ea5e9", background: "rgba(14,165,233,.1)", border: "1px solid rgba(14,165,233,.25)", padding: "4px 14px", borderRadius: "100px", textTransform: "capitalize" }}>{profile?.role ?? "Free"}</span>
              </div>
              <Link href="/pricing" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "11px", background: "rgba(139,92,246,.1)", border: "1px solid rgba(139,92,246,.2)", borderRadius: "12px", fontSize: "13px", fontWeight: 700, color: "#c084fc", textDecoration: "none" }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Upgrade to Premium
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}