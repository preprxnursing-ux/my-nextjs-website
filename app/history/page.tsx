"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, ReferenceLine, AreaChart, Area, BarChart, Bar, Cell,
} from "recharts";

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
  *, body { font-family: 'Plus Jakarta Sans', sans-serif; }
  .fd { font-family: 'Cormorant Garamond', Georgia, serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes pulseRing {
    0%   { transform: scale(1); opacity: .5; }
    100% { transform: scale(1.5); opacity: 0; }
  }

  .fade-up { animation: fadeUp .6s ease both; }

  .shimmer-text {
    background: linear-gradient(90deg, #38bdf8 0%, #e0f2fe 40%, #38bdf8 80%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3s linear infinite;
  }

  .attempt-card {
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,.07);
    background: rgba(255,255,255,.03);
    overflow: hidden;
    transition: all .35s cubic-bezier(.34,1.56,.64,1);
    cursor: default;
  }
  .attempt-card:hover {
    transform: translateY(-4px);
    border-color: rgba(14,165,233,.25);
    box-shadow: 0 20px 50px rgba(0,0,0,.3);
    background: rgba(255,255,255,.05);
  }

  .stat-card {
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,.07);
    background: rgba(255,255,255,.04);
    padding: 24px;
    transition: all .3s cubic-bezier(.34,1.56,.64,1);
    cursor: default;
  }
  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0,0,0,.25);
  }
`;

function getModeLabel(mode?: string) {
  if (mode === "tutor") return "Tutor";
  if (mode === "quick") return "Quick";
  if (mode === "timed") return "Timed";
  return "Standard";
}

function getModeColor(mode?: string) {
  if (mode === "tutor") return "#10b981";
  if (mode === "quick") return "#f59e0b";
  if (mode === "timed") return "#ef4444";
  return "#6366f1";
}

function formatDate(value?: string) {
  if (!value) return "Unknown";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "Unknown";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function formatDateTime(value?: string) {
  if (!value) return "Unknown";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "Unknown";
  return d.toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
}

function formatSeconds(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function getScoreColor(pct: number) {
  if (pct >= 85) return "#34d399";
  if (pct >= 70) return "#38bdf8";
  if (pct >= 50) return "#fbbf24";
  return "#f87171";
}

function getScoreLabel(pct: number) {
  if (pct >= 85) return "Excellent";
  if (pct >= 70) return "Strong";
  if (pct >= 50) return "Developing";
  return "Needs Review";
}

function getScoreBg(pct: number) {
  if (pct >= 85) return "rgba(52,211,153,.12)";
  if (pct >= 70) return "rgba(56,189,248,.12)";
  if (pct >= 50) return "rgba(251,191,36,.12)";
  return "rgba(248,113,113,.12)";
}

// Custom tooltip for line chart
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const score = payload[0]?.value ?? 0;
  return (
    <div style={{ background: "#0d1f35", border: "1px solid rgba(14,165,233,.25)", borderRadius: "12px", padding: "12px 16px", boxShadow: "0 12px 32px rgba(0,0,0,.4)" }}>
      <p style={{ fontSize: "11px", color: "#64748b", margin: "0 0 4px", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em" }}>{label}</p>
      <p style={{ fontSize: "20px", fontWeight: 800, color: getScoreColor(score), margin: 0 }}>{score}%</p>
      <p style={{ fontSize: "11px", color: "#64748b", margin: "3px 0 0" }}>{getScoreLabel(score)}</p>
    </div>
  );
}

function BarTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0d1f35", border: "1px solid rgba(255,255,255,.1)", borderRadius: "10px", padding: "10px 14px" }}>
      <p style={{ fontSize: "11px", color: "#64748b", margin: "0 0 3px" }}>{label}</p>
      <p style={{ fontSize: "16px", fontWeight: 800, color: "#f8fafc", margin: 0 }}>{payload[0]?.value}%</p>
    </div>
  );
}

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAttempt, setSelectedAttempt] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHistory() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data, error } = await supabase
        .from("exam_attempts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setHistory(data.map(item => ({
          id: item.id,
          score: item.correct ?? 0,
          total: item.total_questions ?? 0,
          percentage: item.score ? Math.round(item.score) : 0,
          completedAt: item.created_at,
          flaggedCount: item.flagged_questions?.length ?? 0,
          timeUsed: item.time_used ?? 0,
          timeRemaining: item.time_remaining ?? 0,
          mode: item.mode ?? "standard",
        })));
      }
      setLoading(false);
    }
    fetchHistory();
  }, []);

  const chartData = useMemo(() => {
    return [...history].reverse().map((item, i) => ({
      name: `#${i + 1}`,
      fullName: `Attempt ${i + 1}`,
      score: item.percentage,
      date: formatDate(item.completedAt),
      color: getScoreColor(item.percentage),
    }));
  }, [history]);

  const barData = useMemo(() => {
    return chartData.slice(-8);
  }, [chartData]);

  const bestAttempt = useMemo(() => history.length ? [...history].sort((a, b) => b.percentage - a.percentage)[0] : null, [history]);
  const averageScore = useMemo(() => history.length ? Math.round(history.reduce((s, i) => s + i.percentage, 0) / history.length) : 0, [history]);
  const latestScore = history[0]?.percentage ?? 0;
  const trend = history.length >= 2 ? history[0].percentage - history[1].percentage : 0;
  const totalAnswered = useMemo(() => history.reduce((s, i) => s + i.total, 0), [history]);
  const passRate = useMemo(() => {
    if (!history.length) return 0;
    return Math.round((history.filter(i => i.percentage >= 70).length / history.length) * 100);
  }, [history]);

  if (loading) {
    return (
      <main style={{ minHeight: "100vh", background: "#060f1e", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "48px", height: "48px", border: "3px solid rgba(14,165,233,.3)", borderTopColor: "#0ea5e9", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ color: "#64748b", fontSize: "14px" }}>Loading your history...</p>
        </div>
      </main>
    );
  }

  if (!history.length) {
    return (
      <>
        <style>{fontStyle}</style>
        <main style={{ minHeight: "100vh", background: "#060f1e", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
          <div style={{ textAlign: "center", maxWidth: "480px" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(14,165,233,.1)", border: "1px solid rgba(14,165,233,.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "32px" }}>📊</div>
            <h2 className="fd" style={{ fontSize: "2rem", fontWeight: 700, color: "#f8fafc", marginBottom: "12px" }}>No exam history yet</h2>
            <p style={{ color: "#64748b", lineHeight: 1.8, marginBottom: "28px" }}>Complete a practice exam and your performance history will appear here with detailed graphs and insights.</p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/quiz" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#0ea5e9", color: "#fff", padding: "13px 28px", borderRadius: "12px", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}>Start your first exam →</Link>
              <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.07)", color: "#94a3b8", padding: "13px 24px", borderRadius: "12px", fontSize: "14px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,.1)" }}>Go to dashboard</Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <style>{fontStyle}</style>
      <main style={{ background: "#060f1e", minHeight: "100vh", color: "#f1f5f9", padding: "40px 20px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* ═══ HEADER ═══ */}
          <div className="fade-up" style={{ marginBottom: "40px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(14,165,233,.12)", border: "1px solid rgba(14,165,233,.3)", borderRadius: "100px", padding: "5px 16px", fontSize: "11px", fontWeight: 700, color: "#7dd3fc", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "16px" }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#0ea5e9", display: "inline-block" }} />
              Attempt Archive
            </div>
            <h1 className="fd" style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 700, lineHeight: 1.1, color: "#f8fafc", marginBottom: "10px" }}>
              History &{" "}
              <span className="shimmer-text">Progress</span>
            </h1>
            <p style={{ fontSize: "15px", color: "#64748b", fontWeight: 400 }}>
              Track performance, compare attempts, and open any session for review.
            </p>
          </div>

          {/* ═══ STATS ROW ═══ */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "14px", marginBottom: "32px" }}>
            {[
              { label: "Total Attempts", val: String(history.length), color: "#38bdf8", icon: "📋" },
              { label: "Average Score", val: `${averageScore}%`, color: getScoreColor(averageScore), icon: "📊" },
              { label: "Best Score", val: bestAttempt ? `${bestAttempt.percentage}%` : "--", color: "#34d399", icon: "🏆" },
              { label: "Latest Score", val: `${latestScore}%`, color: getScoreColor(latestScore), icon: "⚡" },
              { label: "Pass Rate", val: `${passRate}%`, color: passRate >= 70 ? "#34d399" : "#f87171", icon: "✅" },
              { label: "Questions Done", val: totalAnswered.toLocaleString(), color: "#c084fc", icon: "🎯" },
            ].map((s, i) => (
              <div key={s.label} className="stat-card fade-up" style={{ animationDelay: `${i * .05}s` }}>
                <div style={{ fontSize: "20px", marginBottom: "10px" }}>{s.icon}</div>
                <p style={{ fontSize: "10px", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".1em", margin: "0 0 6px" }}>{s.label}</p>
                <p className="fd" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, color: s.color, margin: 0, lineHeight: 1 }}>{s.val}</p>
                {s.label === "Latest Score" && trend !== 0 && (
                  <p style={{ fontSize: "11px", color: trend > 0 ? "#34d399" : "#f87171", margin: "6px 0 0", fontWeight: 600 }}>
                    {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% vs previous
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* ═══ CHARTS ROW ═══ */}
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "16px", marginBottom: "32px" }}>

            {/* Area chart — score trend */}
            <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "20px", padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
                <div>
                  <p style={{ fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".12em", margin: "0 0 6px" }}>Score Trend</p>
                  <p className="fd" style={{ fontSize: "1.4rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>Performance Over Time</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "11px", color: "#475569", margin: "0 0 3px" }}>Average</p>
                  <p style={{ fontSize: "18px", fontWeight: 800, color: getScoreColor(averageScore), margin: 0 }}>{averageScore}%</p>
                </div>
              </div>

              <div style={{ height: "220px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                    <defs>
                      <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.06)" vertical={false} />
                    <XAxis dataKey="name" stroke="#334155" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} stroke="#334155" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={70} stroke="rgba(251,191,36,.4)" strokeDasharray="4 4" label={{ value: "Pass line 70%", fill: "#64748b", fontSize: 10, position: "insideTopRight" }} />
                    <ReferenceLine y={averageScore} stroke="rgba(14,165,233,.3)" strokeDasharray="4 4" />
                    <Area type="monotoneX" dataKey="score" stroke="#0ea5e9" strokeWidth={2.5} fill="url(#scoreGrad)"
                      dot={(props: any) => {
                        const { cx, cy, payload } = props;
                        return (
                          <circle key={payload.name} cx={cx} cy={cy} r={4} fill={getScoreColor(payload.score)} stroke="#060f1e" strokeWidth={2} />
                        );
                      }}
                      activeDot={{ r: 6, fill: "#0ea5e9", stroke: "#060f1e", strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div style={{ display: "flex", gap: "16px", marginTop: "16px", flexWrap: "wrap" }}>
                {[
                  { color: "#34d399", label: "Excellent (85%+)" },
                  { color: "#38bdf8", label: "Strong (70–84%)" },
                  { color: "#fbbf24", label: "Developing (50–69%)" },
                  { color: "#f87171", label: "Needs Review (<50%)" },
                ].map(l => (
                  <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: l.color, flexShrink: 0 }} />
                    <span style={{ fontSize: "10px", color: "#475569", fontWeight: 500 }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bar chart — recent attempts */}
            <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "20px", padding: "28px" }}>
              <div style={{ marginBottom: "24px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".12em", margin: "0 0 6px" }}>Recent Attempts</p>
                <p className="fd" style={{ fontSize: "1.4rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>Last {Math.min(8, history.length)} Sessions</p>
              </div>

              <div style={{ height: "220px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 5, right: 5, bottom: 0, left: -25 }} barSize={20}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.06)" vertical={false} />
                    <XAxis dataKey="name" stroke="#334155" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} stroke="#334155" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                    <Tooltip content={<BarTooltip />} />
                    <ReferenceLine y={70} stroke="rgba(251,191,36,.4)" strokeDasharray="4 4" />
                    <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                      {barData.map((entry, i) => (
                        <Cell key={i} fill={getScoreColor(entry.score)} fillOpacity={0.85} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Score distribution */}
              <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
                {[
                  { label: "Excellent (85%+)", count: history.filter(h => h.percentage >= 85).length, color: "#34d399" },
                  { label: "Strong (70–84%)", count: history.filter(h => h.percentage >= 70 && h.percentage < 85).length, color: "#38bdf8" },
                  { label: "Below pass (<70%)", count: history.filter(h => h.percentage < 70).length, color: "#f87171" },
                ].map(d => (
                  <div key={d.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                    <span style={{ fontSize: "11px", color: "#64748b", flex: 1, fontWeight: 500 }}>{d.label}</span>
                    <div style={{ flex: 2, height: "4px", background: "rgba(255,255,255,.06)", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: history.length ? `${(d.count / history.length) * 100}%` : "0%", background: d.color, borderRadius: "4px", transition: "width 1s ease" }} />
                    </div>
                    <span style={{ fontSize: "11px", color: d.color, fontWeight: 700, minWidth: "20px", textAlign: "right" }}>{d.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ IMPROVEMENT INSIGHT ═══ */}
          {history.length >= 2 && (
            <div style={{ background: trend >= 0 ? "rgba(52,211,153,.06)" : "rgba(248,113,113,.06)", border: `1px solid ${trend >= 0 ? "rgba(52,211,153,.2)" : "rgba(248,113,113,.2)"}`, borderRadius: "16px", padding: "20px 24px", marginBottom: "32px", display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ fontSize: "28px" }}>{trend >= 0 ? "📈" : "📉"}</div>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 700, color: trend >= 0 ? "#34d399" : "#f87171", margin: "0 0 4px" }}>
                  {trend >= 0 ? `↑ Improving! Up ${trend}% from your previous attempt.` : `↓ Score dropped by ${Math.abs(trend)}% from your previous attempt.`}
                </p>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                  {trend >= 0 ? "Keep this momentum going. Consistency is key to NCLEX success." : "Review your rationales for recent incorrect answers and focus on weak topics."}
                </p>
              </div>
              <Link href={trend >= 0 ? "/quiz" : "/review"} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: "6px", background: trend >= 0 ? "rgba(52,211,153,.15)" : "rgba(248,113,113,.15)", color: trend >= 0 ? "#34d399" : "#f87171", border: `1px solid ${trend >= 0 ? "rgba(52,211,153,.3)" : "rgba(248,113,113,.3)"}`, padding: "9px 18px", borderRadius: "10px", fontSize: "12px", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>
                {trend >= 0 ? "Keep going →" : "Review now →"}
              </Link>
            </div>
          )}

          {/* ═══ ATTEMPTS LIST ═══ */}
          <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".12em", margin: "0 0 4px" }}>All Sessions</p>
              <p className="fd" style={{ fontSize: "1.4rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>{history.length} Exam Attempt{history.length !== 1 ? "s" : ""}</p>
            </div>
            <Link href="/quiz" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#0ea5e9", color: "#fff", padding: "10px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 14px rgba(14,165,233,.3)" }}>
              + New Exam
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {history.map((attempt, index) => {
              const isLatest = index === 0;
              const scoreColor = getScoreColor(attempt.percentage);
              const scoreBg = getScoreBg(attempt.percentage);
              const modeColor = getModeColor(attempt.mode);
              const isExpanded = selectedAttempt === attempt.id;

              return (
                <div key={attempt.id} className="attempt-card"
                  style={{ borderColor: isLatest ? "rgba(52,211,153,.25)" : "rgba(255,255,255,.07)", background: isLatest ? "rgba(52,211,153,.04)" : "rgba(255,255,255,.03)" }}>

                  {/* Card header — always visible */}
                  <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap", cursor: "pointer" }}
                    onClick={() => setSelectedAttempt(isExpanded ? null : attempt.id)}>

                    {/* Score circle */}
                    <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: scoreBg, border: `2px solid ${scoreColor}40`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative" }}>
                      <p style={{ fontSize: "16px", fontWeight: 800, color: scoreColor, margin: 0, lineHeight: 1 }}>{attempt.percentage}%</p>
                      {isLatest && (
                        <div style={{ position: "absolute", top: "-4px", right: "-4px", width: "14px", height: "14px", borderRadius: "50%", background: "#22c55e", border: "2px solid #060f1e", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#fff" }} />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px", flexWrap: "wrap" }}>
                        <p style={{ fontSize: "15px", fontWeight: 700, color: "#f8fafc", margin: 0 }}>
                          Attempt {history.length - index}
                        </p>
                        {isLatest && (
                          <span style={{ fontSize: "9px", fontWeight: 800, background: "rgba(34,197,94,.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,.3)", padding: "2px 8px", borderRadius: "100px", letterSpacing: ".08em", textTransform: "uppercase" }}>Latest</span>
                        )}
                        <span style={{ fontSize: "9px", fontWeight: 700, background: `${modeColor}15`, color: modeColor, border: `1px solid ${modeColor}30`, padding: "2px 8px", borderRadius: "100px", textTransform: "uppercase", letterSpacing: ".06em" }}>{getModeLabel(attempt.mode)}</span>
                        <span style={{ fontSize: "9px", fontWeight: 700, background: scoreBg, color: scoreColor, border: `1px solid ${scoreColor}30`, padding: "2px 8px", borderRadius: "100px" }}>{getScoreLabel(attempt.percentage)}</span>
                      </div>
                      <p style={{ fontSize: "12px", color: "#475569", margin: 0, fontWeight: 500 }}>{formatDateTime(attempt.completedAt)}</p>
                    </div>

                    {/* Quick stats */}
                    <div style={{ display: "flex", gap: "20px", flexShrink: 0 }}>
                      {[
                        { label: "Score", val: `${attempt.score}/${attempt.total}` },
                        { label: "Flagged", val: attempt.flaggedCount },
                        { label: "Time used", val: formatSeconds(attempt.timeUsed) },
                      ].map(m => (
                        <div key={m.label} style={{ textAlign: "center" }}>
                          <p style={{ fontSize: "10px", color: "#475569", margin: "0 0 3px", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em" }}>{m.label}</p>
                          <p style={{ fontSize: "14px", fontWeight: 700, color: "#e2e8f0", margin: 0 }}>{m.val}</p>
                        </div>
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div style={{ width: "120px", flexShrink: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                        <span style={{ fontSize: "10px", color: "#475569", fontWeight: 600 }}>Score</span>
                        <span style={{ fontSize: "10px", color: scoreColor, fontWeight: 700 }}>{attempt.percentage}%</span>
                      </div>
                      <div style={{ height: "6px", background: "rgba(255,255,255,.08)", borderRadius: "6px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${attempt.percentage}%`, background: `linear-gradient(90deg,${scoreColor},${scoreColor}cc)`, borderRadius: "6px", transition: "width 1s ease" }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                        <span style={{ fontSize: "9px", color: "#334155" }}>0%</span>
                        <span style={{ fontSize: "9px", color: "#334155" }}>Pass: 70%</span>
                        <span style={{ fontSize: "9px", color: "#334155" }}>100%</span>
                      </div>
                    </div>

                    {/* Expand chevron */}
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .3s", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
                      <svg width="12" height="12" fill="none" stroke="#64748b" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", padding: "20px 24px", background: "rgba(0,0,0,.1)" }}>

                      {/* Detailed metrics */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: "10px", marginBottom: "20px" }}>
                        {[
                          { label: "Correct", val: String(attempt.score), color: "#34d399" },
                          { label: "Incorrect", val: String(attempt.total - attempt.score), color: "#f87171" },
                          { label: "Total Qs", val: String(attempt.total), color: "#38bdf8" },
                          { label: "Flagged", val: String(attempt.flaggedCount), color: "#fbbf24" },
                          { label: "Time Used", val: formatSeconds(attempt.timeUsed), color: "#c084fc" },
                          { label: "Time Left", val: formatSeconds(attempt.timeRemaining), color: "#64748b" },
                        ].map(m => (
                          <div key={m.label} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "12px", padding: "14px" }}>
                            <p style={{ fontSize: "10px", color: "#475569", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", margin: "0 0 5px" }}>{m.label}</p>
                            <p style={{ fontSize: "1.4rem", fontWeight: 800, color: m.color, margin: 0 }}>{m.val}</p>
                          </div>
                        ))}
                      </div>

                      {/* Accuracy bar */}
                      <div style={{ marginBottom: "20px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                          <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Accuracy breakdown</span>
                          <span style={{ fontSize: "12px", color: scoreColor, fontWeight: 700 }}>{attempt.percentage}% correct</span>
                        </div>
                        <div style={{ height: "10px", background: "rgba(255,255,255,.06)", borderRadius: "10px", overflow: "hidden", display: "flex" }}>
                          <div style={{ height: "100%", width: `${attempt.total ? (attempt.score / attempt.total) * 100 : 0}%`, background: "linear-gradient(90deg,#34d399,#10b981)", borderRadius: "10px 0 0 10px", transition: "width 1s ease" }} />
                          <div style={{ height: "100%", flex: 1, background: "rgba(248,113,113,.2)" }} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
                          <span style={{ fontSize: "11px", color: "#34d399", fontWeight: 600 }}>✓ {attempt.score} correct</span>
                          <span style={{ fontSize: "11px", color: "#f87171", fontWeight: 600 }}>✗ {attempt.total - attempt.score} incorrect</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <Link href="/results" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "#0ea5e9", color: "#fff", padding: "10px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 14px rgba(14,165,233,.3)", transition: "all .2s" }}
                          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
                          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                          View Results
                        </Link>
                        <Link href="/review" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(139,92,246,.15)", color: "#c084fc", border: "1px solid rgba(139,92,246,.3)", padding: "10px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, textDecoration: "none", transition: "all .2s" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "rgba(139,92,246,.25)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "rgba(139,92,246,.15)"; }}>
                          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>
                          Review Answers
                        </Link>
                        <Link href="/quiz" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(255,255,255,.06)", color: "#94a3b8", border: "1px solid rgba(255,255,255,.1)", padding: "10px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, textDecoration: "none", transition: "all .2s" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.12)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.06)"; }}>
                          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          Retake Exam
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom nav */}
          <div style={{ display: "flex", gap: "12px", marginTop: "32px", flexWrap: "wrap" }}>
            <Link href="/quiz" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "13px 28px", borderRadius: "12px", fontSize: "14px", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 24px rgba(14,165,233,.3)", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
              Start New Exam →
            </Link>
            <Link href="/results" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.07)", color: "#e2e8f0", padding: "13px 24px", borderRadius: "12px", fontSize: "14px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,.1)", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.13)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; }}>
              View Latest Results
            </Link>
            <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.07)", color: "#e2e8f0", padding: "13px 24px", borderRadius: "12px", fontSize: "14px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,.1)", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.13)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; }}>
              Dashboard
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}