"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
  .font-display { font-family: 'Playfair Display', Georgia, serif; }
  body { font-family: 'DM Sans', sans-serif; }
  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-18px); } }
  @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.4; } 100% { transform: scale(1.6); opacity: 0; } }
  input::placeholder { color: #334155; }
  input:-webkit-autofill { -webkit-box-shadow: 0 0 0 30px #0d1829 inset !important; -webkit-text-fill-color: #e2e8f0 !important; }
`;
type Step = "login" | "otp" | "forgot" | "forgot-sent";
export default function LoginPage() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<Step>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);
  useEffect(() => {
    if (step !== "otp") return;
    setResendTimer(60);
    setCanResend(false);
    let c = 60;
    const interval = setInterval(() => {
      c -= 1;
      setResendTimer(c);
      if (c <= 0) { clearInterval(interval); setCanResend(true); }
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.message || "Invalid email or password.");
      setLoading(false);
      return;
    }
    const supabase = createClient();
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });
    if (otpError) {
      setError(otpError.message);
      setLoading(false);
      return;
    }
    setStep("otp");
    setLoading(false);
  }
  async function handleGoogle() {
    if (loading) return;
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?returnUrl=${encodeURIComponent(new URLSearchParams(window.location.search).get("returnUrl") || "/dashboard")}` },
    });
  }
  function handleOtpInput(i: number, val: string) {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  }
  function handleOtpPaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = ["", "", "", "", "", ""];
    pasted.split("").forEach((d, i) => { next[i] = d; });
    setOtp(next);
    const lastFilled = Math.min(pasted.length, 5);
    otpRefs.current[lastFilled]?.focus();
    if (pasted.length === 6) setTimeout(() => handleVerifyOtp(), 100);
  }
  function handleOtpKey(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  }
  async function handleVerifyOtp() {
    const code = otp.join("");
    if (code.length < 6) { setError("Please enter all 6 digits."); return; }
    setOtpLoading(true);
    setError("");
    const supabase = createClient();
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });
    if (verifyError) {
      setError(verifyError.message);
      setOtpLoading(false);
      return;
    }
    await fetch("/api/auth/verify-otp", { method: "POST" });
    const returnTo = new URLSearchParams(window.location.search).get("returnUrl") || "/dashboard";
    window.location.href = returnTo;
  }
  async function handleResend() {
    const supabase = createClient();
    await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } });
    setOtp(["", "", "", "", "", ""]);
    setStep("otp");
  }
  async function handleForgot(e: React.FormEvent) {
    e.preventDefault();
    setForgotLoading(true);
    setForgotError("");
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    setForgotLoading(false);
    if (error) setForgotError(error.message);
    else setStep("forgot-sent");
  }
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 16px", borderRadius: "12px", fontSize: "0.875rem",
    outline: "none", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
    color: "#e2e8f0", transition: "border-color 0.2s",
  };
  return (
    <>
      <style>{fontStyle}</style>
      <main className="min-h-screen flex" style={{ background: "#080d1a" }}>
        <div className="hidden lg:flex lg:w-[48%] relative overflow-hidden flex-col justify-between p-12">
          <div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80')`, opacity: 0.18 }} />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(150deg, #080d1a 40%, rgba(8,13,26,0.7) 70%, rgba(6,182,212,0.08) 100%)" }} />
          <div className="absolute top-16 right-16 w-64 h-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)", animation: "float 7s ease-in-out infinite" }} />
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
                style={{ background: "#06b6d4", color: "#fff" }}>N</div>
              <span className="text-white font-medium text-sm">Pre-NCLEX Nursing</span>
            </Link>
          </div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="flex gap-2 mb-6">
              {["98%", "50K+", "6"].map((v, i) => (
                <div key={i} className="px-3 py-2 rounded-xl text-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="font-display text-white" style={{ fontSize: "1.1rem", fontWeight: 700 }}>{v}</p>
                  <p style={{ fontSize: "0.6rem", color: "#475569", letterSpacing: "0.08em" }}>
                    {["Pass rate", "Students", "Exams"][i]}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative z-10">
            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(10px)" }}>
              <p style={{ color: "#06b6d4", fontSize: "1.8rem", lineHeight: 1 }}>"</p>
              <p className="font-display text-white mt-1" style={{ fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.4 }}>
                I passed at 85 questions on my first attempt.
              </p>
              <div className="flex items-center gap-2.5 mt-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                  style={{ background: "#ecfeff", color: "#0891b2" }}>S</div>
                <div>
                  <p className="text-white text-xs font-medium">Stephanie G.</p>
                  <p className="text-xs" style={{ color: "#475569" }}>NCLEX-RN . 1st attempt</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center px-6 py-12 relative"
          style={{ background: "rgba(255,255,255,0.015)", borderLeft: "1px solid rgba(255,255,255,0.05)", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
          <div className="w-full max-w-[400px] relative z-10">
            {step === "login" && (
              <>
                <p className="text-xs font-medium uppercase mb-3" style={{ color: "#06b6d4", letterSpacing: "0.2em" }}>Welcome back</p>
                <h1 className="font-display text-white mb-2" style={{ fontSize: "clamp(1.7rem,3vw,2.2rem)", fontWeight: 700, lineHeight: 1.2 }}>
                  Sign in to your<br /><span style={{ color: "#06b6d4", fontStyle: "italic" }}>account</span>
                </h1>
                <p className="mb-7 text-sm" style={{ color: "#64748b" }}>
                  No account?{" "}
                  <Link href="/auth/signup" style={{ color: "#06b6d4" }} className="hover:underline font-medium">Sign up free</Link>
                </p>
                <button onClick={handleGoogle} disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 mb-5"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "#e2e8f0", cursor: loading ? "not-allowed" : "pointer" }}>
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                    <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                  </svg>
                  {loading ? "Redirecting..." : "Continue with Google"}
                </button>
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
                  <span className="text-xs" style={{ color: "#334155" }}>or with email</span>
                  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
                </div>
                {error && (
                  <div className="mb-4 px-4 py-3 rounded-xl text-sm"
                    style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", color: "#fca5a5" }}>
                    {error}
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#64748b" }}>Email address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@email.com" style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = "#06b6d4")}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")} />
                </div>
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium" style={{ color: "#64748b" }}>Password</label>
                    <button onClick={() => setStep("forgot")} className="text-xs hover:underline" style={{ color: "#06b6d4" }}>Forgot password?</button>
                  </div>
                  <div className="relative">
                    <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="" style={{ ...inputStyle, paddingRight: "50px" }}
                      onFocus={e => (e.currentTarget.style.borderColor = "#06b6d4")}
                      onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                      onKeyDown={e => { if (e.key === "Enter") handleLogin(e as any); }} />
                    <button onClick={() => setShowPw(s => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#475569" }}>
                      {showPw ? (
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <button onClick={handleLogin} disabled={loading}
                  className="w-full py-3.5 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{ background: loading ? "rgba(6,182,212,0.45)" : "#06b6d4", color: "#fff", boxShadow: loading ? "none" : "0 8px 24px rgba(6,182,212,0.22)", cursor: loading ? "not-allowed" : "pointer" }}>
                  {loading ? "Checking credentials..." : "Sign in"}
                </button>
                <p className="text-center text-xs mt-6" style={{ color: "#64748b" }}>
                  By continuing you agree to our{" "}
                  <Link href="/terms" className="hover:underline" style={{ color: "#94a3b8" }}>Terms</Link>{" "}and{" "}
                  <Link href="/privacy" className="hover:underline" style={{ color: "#94a3b8" }}>Privacy Policy</Link>
                </p>
              </>
            )}
            {step === "otp" && (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5"
                    style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}>âœ‰ï¸</div>
                  <p className="text-xs font-medium uppercase mb-2" style={{ color: "#06b6d4", letterSpacing: "0.2em" }}>Two-Step Verification</p>
                  <h2 className="font-display text-white mb-2" style={{ fontSize: "1.7rem", fontWeight: 700 }}>Check your email</h2>
                  <p className="text-sm" style={{ color: "#64748b" }}>
                    We sent a 6-digit code to<br /><span style={{ color: "#e2e8f0" }}>{email}</span>
                  </p>
                </div>
                {error && (
                  <div className="mb-4 px-4 py-3 rounded-xl text-sm"
                    style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", color: "#fca5a5" }}>
                    {error}
                  </div>
                )}
                <div className="flex justify-center gap-3 mb-8">
                  {otp.map((digit, i) => (
                    <input key={i} ref={el => { otpRefs.current[i] = el; }}
                      type="text" inputMode="numeric" maxLength={1} value={digit}
                      onChange={e => handleOtpInput(i, e.target.value)}
                      onKeyDown={e => handleOtpKey(i, e)} onPaste={handleOtpPaste}
                      className="text-center text-xl font-bold rounded-xl outline-none transition-all duration-200"
                      style={{ width: "48px", height: "56px", background: digit ? "rgba(6,182,212,0.1)" : "rgba(255,255,255,0.04)", border: digit ? "1px solid rgba(6,182,212,0.4)" : "1px solid rgba(255,255,255,0.09)", color: "#06b6d4", caretColor: "#06b6d4" }}
                      onFocus={e => (e.currentTarget.style.borderColor = "#06b6d4")}
                      onBlur={e => (e.currentTarget.style.borderColor = digit ? "rgba(6,182,212,0.4)" : "rgba(255,255,255,0.09)")} />
                  ))}
                </div>
                <button onClick={handleVerifyOtp} disabled={otpLoading}
                  className="w-full py-3.5 rounded-xl text-sm font-medium transition-all duration-200 mb-4"
                  style={{ background: otpLoading ? "rgba(6,182,212,0.45)" : "#06b6d4", color: "#fff", cursor: otpLoading ? "not-allowed" : "pointer" }}>
                  {otpLoading ? "Verifying..." : "Verify & continue"}
                </button>
                <div className="flex items-center justify-between mb-4">
                  <button onClick={() => { setStep("login"); setOtp(["","","","","",""]); setError(""); }}
                    className="text-xs hover:underline" style={{ color: "#475569" }}>Back to login</button>
                  {canResend ? (
                    <button onClick={handleResend} className="text-xs hover:underline" style={{ color: "#06b6d4" }}>Resend code</button>
                  ) : (
                    <span className="text-xs" style={{ color: "#334155" }}>Resend in {resendTimer}s</span>
                  )}
                </div>
                <div className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <p className="text-xs" style={{ color: "#475569" }}>
                    Code expires in <span style={{ color: "#06b6d4" }}>10 minutes</span>.
                  </p>
                </div>
              </>
            )}
            {step === "forgot" && (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5"
                    style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}>ðŸ”‘</div>
                  <p className="text-xs font-medium uppercase mb-2" style={{ color: "#06b6d4", letterSpacing: "0.2em" }}>Account Recovery</p>
                  <h2 className="font-display text-white mb-2" style={{ fontSize: "1.7rem", fontWeight: 700 }}>Reset your password</h2>
                  <p className="text-sm" style={{ color: "#64748b" }}>Enter your email and we will send a reset link.</p>
                </div>
                {forgotError && (
                  <div className="mb-4 px-4 py-3 rounded-xl text-sm"
                    style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", color: "#fca5a5" }}>
                    {forgotError}
                  </div>
                )}
                <div className="mb-5">
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#64748b" }}>Your email address</label>
                  <input type="email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)}
                    placeholder="you@email.com" style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = "#06b6d4")}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                    onKeyDown={e => { if (e.key === "Enter") handleForgot(e as any); }} />
                </div>
                <button onClick={handleForgot} disabled={forgotLoading}
                  className="w-full py-3.5 rounded-xl text-sm font-medium transition-all duration-200 mb-4"
                  style={{ background: forgotLoading ? "rgba(6,182,212,0.45)" : "#06b6d4", color: "#fff", cursor: forgotLoading ? "not-allowed" : "pointer" }}>
                  {forgotLoading ? "Sending..." : "Send reset link"}
                </button>
                <button onClick={() => { setStep("login"); setForgotError(""); }}
                  className="w-full text-xs hover:underline" style={{ color: "#475569" }}>Back to login</button>
              </>
            )}
            {step === "forgot-sent" && (
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6"
                  style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>âœ…</div>
                <p className="text-xs font-medium uppercase mb-2" style={{ color: "#34d399", letterSpacing: "0.2em" }}>Email sent</p>
                <h2 className="font-display text-white mb-3" style={{ fontSize: "1.7rem", fontWeight: 700 }}>Check your inbox</h2>
                <p className="text-sm mb-6" style={{ color: "#64748b", lineHeight: 1.7 }}>
                  Reset link sent to <span style={{ color: "#e2e8f0" }}>{forgotEmail}</span>.<br />
                  Expires in <span style={{ color: "#34d399" }}>1 hour</span>.
                </p>
                <button onClick={() => { setStep("login"); setForgotEmail(""); }}
                  className="text-xs hover:underline" style={{ color: "#475569" }}>Back to login</button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
