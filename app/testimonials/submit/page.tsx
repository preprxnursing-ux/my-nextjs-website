"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
  *, body { font-family: 'Plus Jakarta Sans', sans-serif; }
  .fd { font-family: 'Cormorant Garamond', Georgia, serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulseRing {
    0%   { transform: scale(1); opacity: .5; }
    100% { transform: scale(1.6); opacity: 0; }
  }
  .fade-up { animation: fadeUp .7s ease both; }
  input::placeholder, textarea::placeholder { color: #334155; }
`;

const examOptions = [
  { label: "NCLEX-RN®", value: "NCLEX-RN" },
  { label: "NCLEX-PN®", value: "NCLEX-PN" },
  { label: "Nursing School", value: "Nursing School" },
  { label: "Pre-Nursing (TEAS/HESI)", value: "Pre-Nursing" },
  { label: "Nurse Practitioner", value: "Nurse Practitioner" },
  { label: "CCRN®", value: "CCRN" },
];

const attemptOptions = ["1st attempt", "2nd attempt", "3rd attempt"];

type Status = "checking" | "eligible" | "ineligible" | "not_logged_in" | "submitted";

export default function SubmitStoryPage() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("checking");
  const [user, setUser] = useState<any>(null);
  const [lastAttempt, setLastAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [examType, setExamType] = useState("");
  const [score, setScore] = useState("");
  const [attempt, setAttempt] = useState("");
  const [story, setStory] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    async function check() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) { setStatus("not_logged_in"); return; }
      setUser(user);

      // Get profile for full name
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();
      if (profile?.full_name) setFullName(profile.full_name);

      // Check exam attempts within last 21 days
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 21);

      const { data: attempts } = await supabase
        .from("exam_attempts")
        .select("*")
        .eq("user_id", user.id)
        .gte("created_at", cutoff.toISOString())
        .order("created_at", { ascending: false })
        .limit(1);

      if (attempts && attempts.length > 0) {
        setLastAttempt(attempts[0]);
        setStatus("eligible");
      } else {
        setStatus("ineligible");
      }
    }
    check();
  }, []);

  async function handleSubmit() {
    setError("");
    if (!examType) { setError("Please select which exam you took."); return; }
    if (!story.trim() || story.trim().length < 50) { setError("Please write at least 50 characters about your experience."); return; }
    if (!fullName.trim()) { setError("Please enter your name."); return; }

    setLoading(true);
    const supabase = createClient();
    const { error: insertError } = await supabase
      .from("testimonials")
      .insert({
        user_id: user.id,
        full_name: fullName,
        exam_type: examType,
        score,
        attempt_number: attempt,
        story,
      });

    setLoading(false);
    if (insertError) { setError(insertError.message); return; }
    setStatus("submitted");
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: "12px",
    fontSize: "14px",
    outline: "none",
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.1)",
    color: "#e2e8f0",
    transition: "border-color .2s",
    fontFamily: "inherit",
  };

  return (
    <>
      <style>{fontStyle}</style>
      <main style={{ background: "#0d1f35", minHeight: "100vh", color: "#f1f5f9", padding: "60px 20px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>

          {/* CHECKING */}
          {status === "checking" && (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ width: "48px", height: "48px", border: "3px solid rgba(14,165,233,.3)", borderTopColor: "#0ea5e9", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
              <p style={{ color: "#64748b" }}>Checking your eligibility...</p>
            </div>
          )}

          {/* NOT LOGGED IN */}
          {status === "not_logged_in" && (
            <div className="fade-up" style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>🔒</div>
              <h2 className="fd" style={{ fontSize: "2rem", fontWeight: 700, color: "#f8fafc", marginBottom: "12px" }}>Sign in required</h2>
              <p style={{ color: "#64748b", marginBottom: "28px", lineHeight: 1.7 }}>You need to be signed in to share your story.</p>
              <Link href="/auth/login?redirectTo=/testimonials/submit"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#0ea5e9", color: "#fff", padding: "13px 28px", borderRadius: "12px", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}>
                Sign in →
              </Link>
            </div>
          )}

          {/* INELIGIBLE */}
          {status === "ineligible" && (
            <div className="fade-up" style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(245,158,11,.12)", border: "1px solid rgba(245,158,11,.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "28px" }}>
                ⏳
              </div>
              <h2 className="fd" style={{ fontSize: "2rem", fontWeight: 700, color: "#f8fafc", marginBottom: "12px" }}>Not quite yet</h2>
              <p style={{ color: "#64748b", marginBottom: "12px", lineHeight: 1.8, maxWidth: "480px", margin: "0 auto 20px" }}>
                To share your story, you need to have completed a practice exam within the last <span style={{ color: "#fbbf24", fontWeight: 700 }}>21 days</span>. This ensures all stories come from active students with real recent experience.
              </p>
              <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "16px", padding: "20px 24px", marginBottom: "28px", maxWidth: "400px", margin: "0 auto 28px" }}>
                <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "8px" }}>To become eligible:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {["Complete at least one practice exam", "Wait up to a few minutes for it to save", "Come back and share your story"].map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(14,165,233,.15)", border: "1px solid rgba(14,165,233,.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#38bdf8", flexShrink: 0 }}>{i + 1}</div>
                      <p style={{ fontSize: "13px", color: "#64748b" }}>{s}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/quiz"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#0ea5e9", color: "#fff", padding: "13px 28px", borderRadius: "12px", fontSize: "14px", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 24px rgba(14,165,233,.3)" }}>
                  Take a practice exam →
                </Link>
                <Link href="/testimonials"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.07)", color: "#94a3b8", padding: "13px 24px", borderRadius: "12px", fontSize: "14px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,.1)" }}>
                  Back to stories
                </Link>
              </div>
            </div>
          )}

          {/* ELIGIBLE — FORM */}
          {status === "eligible" && (
            <div className="fade-up">
              <Link href="/testimonials" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#475569", fontSize: "13px", textDecoration: "none", marginBottom: "32px" }}
                onMouseEnter={e => e.currentTarget.style.color = "#94a3b8"}
                onMouseLeave={e => e.currentTarget.style.color = "#475569"}>
                ← Back to stories
              </Link>

              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(52,211,153,.12)", border: "1px solid rgba(52,211,153,.3)", borderRadius: "100px", padding: "6px 16px", fontSize: "11px", fontWeight: 700, color: "#34d399", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "24px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399", display: "inline-block" }} />
                Eligible to share
              </div>

              <h1 className="fd" style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.15, marginBottom: "10px" }}>
                Share your story.
              </h1>
              <p style={{ color: "#64748b", fontSize: "15px", lineHeight: 1.7, marginBottom: "32px" }}>
                You completed a practice exam on <span style={{ color: "#38bdf8", fontWeight: 600 }}>
                  {new Date(lastAttempt?.created_at).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
                </span>. Tell other students what worked for you.
              </p>

              {error && (
                <div style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px", fontSize: "13px", color: "#fca5a5" }}>
                  {error}
                </div>
              )}

              {/* Full name */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#64748b", letterSpacing: ".06em", marginBottom: "8px", textTransform: "uppercase" }}>Your name</label>
                <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                  placeholder="Jane Doe" style={inputStyle}
                  onFocus={e => e.currentTarget.style.borderColor = "#0ea5e9"}
                  onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"} />
              </div>

              {/* Exam type */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#64748b", letterSpacing: ".06em", marginBottom: "8px", textTransform: "uppercase" }}>Which exam?</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "8px" }}>
                  {examOptions.map(opt => (
                    <button key={opt.value} onClick={() => setExamType(opt.value)}
                      style={{ padding: "10px 14px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all .2s", border: `1px solid ${examType === opt.value ? "rgba(14,165,233,.4)" : "rgba(255,255,255,.08)"}`, background: examType === opt.value ? "rgba(14,165,233,.15)" : "rgba(255,255,255,.04)", color: examType === opt.value ? "#38bdf8" : "#64748b", fontFamily: "inherit", textAlign: "left" }}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Score + Attempt */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#64748b", letterSpacing: ".06em", marginBottom: "8px", textTransform: "uppercase" }}>Score / Result</label>
                  <input type="text" value={score} onChange={e => setScore(e.target.value)}
                    placeholder="e.g. Passed 85Q" style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = "#0ea5e9"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#64748b", letterSpacing: ".06em", marginBottom: "8px", textTransform: "uppercase" }}>Attempt number</label>
                  <div style={{ display: "flex", gap: "6px" }}>
                    {attemptOptions.map(a => (
                      <button key={a} onClick={() => setAttempt(a)}
                        style={{ flex: 1, padding: "10px 6px", borderRadius: "10px", fontSize: "11px", fontWeight: 600, cursor: "pointer", transition: "all .2s", border: `1px solid ${attempt === a ? "rgba(14,165,233,.4)" : "rgba(255,255,255,.08)"}`, background: attempt === a ? "rgba(14,165,233,.15)" : "rgba(255,255,255,.04)", color: attempt === a ? "#38bdf8" : "#64748b", fontFamily: "inherit" }}>
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Story */}
              <div style={{ marginBottom: "28px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#64748b", letterSpacing: ".06em", marginBottom: "8px", textTransform: "uppercase" }}>Your story</label>
                <textarea value={story} onChange={e => setStory(e.target.value)}
                  placeholder="Tell other students what helped you prepare, what the experience was like, and any advice you'd give..."
                  rows={6}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
                  onFocus={e => e.currentTarget.style.borderColor = "#0ea5e9"}
                  onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
                  <p style={{ fontSize: "11px", color: "#334155" }}>Minimum 50 characters</p>
                  <p style={{ fontSize: "11px", color: story.length >= 50 ? "#34d399" : "#334155" }}>{story.length} chars</p>
                </div>
              </div>

              {/* Notice */}
              <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "12px", padding: "14px 18px", marginBottom: "24px" }}>
                <p style={{ fontSize: "12px", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                  📋 Your story will be reviewed by our team before being published. We may lightly edit for clarity. Your name will appear as submitted.
                </p>
              </div>

              <button onClick={handleSubmit} disabled={loading}
                style={{ width: "100%", padding: "15px", borderRadius: "12px", background: loading ? "rgba(14,165,233,.4)" : "#0ea5e9", color: "#fff", fontSize: "15px", fontWeight: 700, border: "none", cursor: loading ? "not-allowed" : "pointer", transition: "all .2s", fontFamily: "inherit", boxShadow: loading ? "none" : "0 8px 28px rgba(14,165,233,.3)" }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#38bdf8"; }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#0ea5e9"; }}>
                {loading ? "Submitting..." : "Submit my story →"}
              </button>
            </div>
          )}

          {/* SUBMITTED */}
          {status === "submitted" && (
            <div className="fade-up" style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ position: "relative", width: "80px", height: "80px", margin: "0 auto 24px" }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(52,211,153,.15)", animation: "pulseRing 2s ease-out infinite" }} />
                <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(52,211,153,.12)", border: "1px solid rgba(52,211,153,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>✓</div>
              </div>
              <h2 className="fd" style={{ fontSize: "2.2rem", fontWeight: 700, color: "#f8fafc", marginBottom: "12px" }}>Thank you!</h2>
              <p style={{ color: "#64748b", lineHeight: 1.8, maxWidth: "400px", margin: "0 auto 28px" }}>
                Your story has been submitted and is under review. We'll publish it shortly so you can inspire other nurses on their journey.
              </p>
              <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/testimonials"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#0ea5e9", color: "#fff", padding: "13px 28px", borderRadius: "12px", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}>
                  Read other stories →
                </Link>
                <Link href="/dashboard"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.07)", color: "#94a3b8", padding: "13px 24px", borderRadius: "12px", fontSize: "14px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,.1)" }}>
                  Go to dashboard
                </Link>
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}