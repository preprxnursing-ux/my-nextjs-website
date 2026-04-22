"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
export default function VerifyPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(true);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [visible, setVisible] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user?.email) { router.push("/auth/login"); return; }
      setEmail(data.user.email);
      await sendOtp(data.user.email);
      setSending(false);
      startResendTimer();
    });
  }, []);
  async function sendOtp(userEmail: string) {
    const supabase = createClient();
    await supabase.auth.signInWithOtp({ email: userEmail, options: { shouldCreateUser: false } });
  }
  function startResendTimer() {
    setResendTimer(60);
    setCanResend(false);
    let c = 60;
    const interval = setInterval(() => {
      c -= 1;
      setResendTimer(c);
      if (c <= 0) { clearInterval(interval); setCanResend(true); }
    }, 1000);
  }
  async function handleResend() {
    await sendOtp(email);
    setOtp(["", "", "", "", "", ""]);
    startResendTimer();
  }
  function handleOtpInput(i: number, val: string) {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  }
  function handleOtpKey(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  }
  async function handleVerify() {
    const code = otp.join("");
    if (code.length < 6) { setError("Please enter all 6 digits."); return; }
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: verifyError } = await supabase.auth.verifyOtp({ email, token: code, type: "email" });
    if (verifyError) { setError(verifyError.message); setLoading(false); return; }
    await fetch("/api/auth/verify-otp", { method: "POST" });
    router.push("/dashboard");
    router.refresh();
  }
  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#080d1a", fontFamily: "'Plus Jakarta Sans',sans-serif", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "420px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease" }}>
        <div style={{ background: "linear-gradient(135deg,#0d1829,#0e2540)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "40px 36px", textAlign: "center", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "18px", background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", margin: "0 auto 20px" }}>âœ‰ï¸</div>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "#06b6d4", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px" }}>Security Verification</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#f8fafc", marginBottom: "12px", lineHeight: 1.2 }}>Check your email</h1>
          <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.7, marginBottom: "28px" }}>
            {sending ? "Sending verification code..." : <><span>We sent a 6-digit code to</span><br /><span style={{ color: "#e2e8f0", fontWeight: 600 }}>{email}</span></>}
          </p>
          {error && (
            <div style={{ marginBottom: "16px", padding: "12px 16px", borderRadius: "12px", background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", color: "#fca5a5", fontSize: "13px" }}>
              {error}
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "24px" }}>
            {otp.map((digit, i) => (
              <input key={i} ref={el => { otpRefs.current[i] = el; }}
                type="text" inputMode="numeric" maxLength={1} value={digit}
                onChange={e => handleOtpInput(i, e.target.value)}
                onKeyDown={e => handleOtpKey(i, e)}
                style={{ width: "48px", height: "56px", textAlign: "center", fontSize: "1.3rem", fontWeight: 800, borderRadius: "12px", outline: "none", background: digit ? "rgba(6,182,212,0.1)" : "rgba(255,255,255,0.04)", border: digit ? "1px solid rgba(6,182,212,0.4)" : "1px solid rgba(255,255,255,0.09)", color: "#06b6d4", caretColor: "#06b6d4", transition: "all .2s" }}
                onFocus={e => (e.currentTarget.style.borderColor = "#06b6d4")}
                onBlur={e => (e.currentTarget.style.borderColor = digit ? "rgba(6,182,212,0.4)" : "rgba(255,255,255,0.09)")} />
            ))}
          </div>
          <button onClick={handleVerify} disabled={loading || sending}
            style={{ width: "100%", padding: "14px", borderRadius: "12px", fontSize: "14px", fontWeight: 700, cursor: loading || sending ? "not-allowed" : "pointer", fontFamily: "inherit", background: loading || sending ? "rgba(6,182,212,0.4)" : "linear-gradient(135deg,#06b6d4,#0ea5e9)", border: "none", color: "#fff", boxShadow: "0 8px 24px rgba(6,182,212,0.25)", marginBottom: "16px", transition: "all .2s" }}>
            {loading ? "Verifying..." : "Verify & continue â†’"}
          </button>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button onClick={() => router.push("/auth/login")}
              style={{ fontSize: "12px", color: "#475569", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              â† Back to login
            </button>
            {canResend ? (
              <button onClick={handleResend}
                style={{ fontSize: "12px", color: "#06b6d4", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                Resend code
              </button>
            ) : (
              <span style={{ fontSize: "12px", color: "#334155" }}>Resend in {resendTimer}s</span>
            )}
          </div>
        </div>
        <p style={{ textAlign: "center", fontSize: "11px", color: "#475569", marginTop: "20px" }}>
          ðŸ”’ Your account is protected with two-step verification
        </p>
      </div>
    </main>
  );
}