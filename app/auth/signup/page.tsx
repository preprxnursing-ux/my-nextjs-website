"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
  .font-display { font-family: 'Playfair Display', Georgia, serif; }
  body { font-family: 'DM Sans', sans-serif; }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-18px) rotate(3deg); }
  }
  @keyframes floatB {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-12px) rotate(-2deg); }
  }
  @keyframes pulse-ring {
    0% { transform: scale(1); opacity: 0.4; }
    100% { transform: scale(1.6); opacity: 0; }
  }
  @keyframes grain {
    0%, 100% { transform: translate(0,0); }
    10% { transform: translate(-2%,-3%); }
    30% { transform: translate(3%,-1%); }
    50% { transform: translate(-1%,2%); }
    70% { transform: translate(2%,1%); }
    90% { transform: translate(-3%,3%); }
  }
  .grain::after {
    content: '';
    position: fixed;
    inset: -50%;
    width: 200%;
    height: 200%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.03;
    animation: grain 8s steps(10) infinite;
    pointer-events: none;
    z-index: 0;
  }
  input::placeholder { color: #334155; }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #0d1829 inset !important;
    -webkit-text-fill-color: #e2e8f0 !important;
  }
`;

function getStrength(pw: string) {
  const checks = {
    length: pw.length >= 8,
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
    number: /[0-9]/.test(pw),
    special: /[!@#$%&*()_+\-=\[\]{};':"\\|,.<>\/?`~^]/.test(pw),
    long: pw.length >= 12,
  };
  const score = Object.values(checks).filter(Boolean).length;
  if (score <= 2) return { label: "Weak", color: "#ef4444", width: "25%", checks };
  if (score <= 3) return { label: "Fair", color: "#f59e0b", width: "50%", checks };
  if (score <= 4) return { label: "Good", color: "#06b6d4", width: "75%", checks };
  return { label: "Strong", color: "#10b981", width: "100%", checks };
}

function generateStrongPassword() {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghjkmnpqrstuvwxyz";
  const nums = "23456789";
  const special = "!@#$%&*()_+";
  const all = upper + lower + nums + special;
  const pw = [
    upper[Math.floor(Math.random() * upper.length)],
    upper[Math.floor(Math.random() * upper.length)],
    lower[Math.floor(Math.random() * lower.length)],
    lower[Math.floor(Math.random() * lower.length)],
    nums[Math.floor(Math.random() * nums.length)],
    nums[Math.floor(Math.random() * nums.length)],
    special[Math.floor(Math.random() * special.length)],
    special[Math.floor(Math.random() * special.length)],
  ];
  for (let i = 0; i < 4; i++) pw.push(all[Math.floor(Math.random() * all.length)]);
  return pw.sort(() => Math.random() - 0.5).join("");
}

const examOptions = [
  { label: "Pre-Nursing (TEAS / HESI)", value: "pre-nursing", icon: "📚" },
  { label: "Nursing School", value: "nursing-school", icon: "🎓" },
  { label: "NCLEX-RN®", value: "nclex-rn", icon: "🏥" },
  { label: "NCLEX-PN®", value: "nclex-pn", icon: "📋" },
  { label: "Nurse Practitioner", value: "np", icon: "🩺" },
  { label: "CCRN®", value: "ccrn", icon: "❤️" },
];

export default function SignupPage() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [exam, setExam] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [suggested, setSuggested] = useState("");
  const [showSuggested, setShowSuggested] = useState(false);
  const [copied, setCopied] = useState(false);

  const strength = getStrength(password);
  const passwordsMatch = confirm.length > 0 && password === confirm;
  const passwordsMismatch = confirm.length > 0 && password !== confirm;

  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  async function handleGoogle() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) { setError("Please enter your full name."); return; }
    if (!email.trim()) { setError("Please enter your email."); return; }
    if (strength.label === "Weak") { setError("Please use a stronger password."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (!agreed) { setError("Please agree to the Terms and Privacy Policy."); return; }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, exam_goal: exam },
      },
    });
    setLoading(false);
    if (error) { setError(error.message); return; }
    router.push("/dashboard");
  }

  function handleSuggest() {
    const pw = generateStrongPassword();
    setSuggested(pw);
    setShowSuggested(true);
  }

  function applySuggested() {
    setPassword(suggested);
    setConfirm(suggested);
    setShowSuggested(false);
  }

  function copyPassword() {
    navigator.clipboard.writeText(suggested);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: "12px",
    fontSize: "0.875rem",
    outline: "none",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    color: "#e2e8f0",
    transition: "border-color 0.2s",
  };

  return (
    <>
      <style>{fontStyle}</style>
      <div className="grain" />

      <main className="min-h-screen flex" style={{ background: "#080d1a" }}>

        {/* LEFT PANEL */}
        <div className="hidden lg:flex lg:w-[46%] relative overflow-hidden flex-col justify-between p-12">
          <div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80')`, opacity: 0.17 }} />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(150deg, #080d1a 40%, rgba(8,13,26,0.72) 70%, rgba(6,182,212,0.07) 100%)" }} />
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)", animation: "float 7s ease-in-out infinite" }} />
          <div className="absolute bottom-28 left-8 w-44 h-44 rounded-full opacity-8"
            style={{ background: "radial-gradient(circle, #10b981 0%, transparent 70%)", animation: "floatB 9s ease-in-out infinite" }} />
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
                style={{ background: "#06b6d4", color: "#fff", boxShadow: "0 4px 14px rgba(6,182,212,0.4)" }}>N</div>
              <span className="text-white font-medium text-sm">Pre-NCLEX Nursing</span>
            </Link>
          </div>

          <div className="relative z-10">
            <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full"
                style={{ background: "rgba(16,185,129,0.15)", animation: "pulse-ring 2s ease-out infinite" }} />
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)" }}>🎓</div>
            </div>
            <h2 className="font-display text-white mb-3"
              style={{ fontSize: "clamp(1.5rem,2.5vw,2rem)", fontWeight: 700, lineHeight: 1.3 }}>
              Join 50,000+ nurses<br />
              <span style={{ color: "#34d399", fontStyle: "italic" }}>on their first try.</span>
            </h2>
            <p className="text-sm mb-8" style={{ color: "#475569", fontWeight: 300, lineHeight: 1.7 }}>
              Create your free account in under 60 seconds. No credit card. No commitment.
            </p>
            <div className="space-y-3">
              {[
                { icon: "✅", text: "Free access to NCLEX-RN questions" },
                { icon: "📊", text: "Personal dashboard and score tracking" },
                { icon: "💡", text: "Full rationales after every question" },
                { icon: "🎯", text: "Adaptive difficulty that matches your level" },
                { icon: "🔒", text: "Your data is private and encrypted" },
              ].map((p) => (
                <div key={p.text} className="flex items-center gap-3">
                  <span style={{ fontSize: "0.9rem" }}>{p.icon}</span>
                  <p className="text-sm" style={{ color: "#94a3b8", fontWeight: 300 }}>{p.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex gap-3">
            {[
              { v: "98%", l: "Pass rate", color: "#34d399" },
              { v: "Free", l: "To start", color: "#06b6d4" },
              { v: "60s", l: "To sign up", color: "#a78bfa" },
            ].map((s) => (
              <div key={s.l} className="flex-1 px-3 py-3 rounded-xl text-center"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="font-display" style={{ fontSize: "1.1rem", fontWeight: 700, color: s.color }}>{s.v}</p>
                <p style={{ fontSize: "0.6rem", color: "#334155", letterSpacing: "0.08em" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex items-center justify-center px-6 py-10 relative overflow-y-auto"
          style={{
            background: "rgba(255,255,255,0.015)",
            borderLeft: "1px solid rgba(255,255,255,0.05)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
          <div className="absolute top-0 right-0 w-72 h-72 opacity-5 pointer-events-none"
            style={{ background: "radial-gradient(circle at top right, #10b981, transparent 60%)" }} />
          <div className="absolute bottom-0 left-0 w-56 h-56 opacity-5 pointer-events-none"
            style={{ background: "radial-gradient(circle at bottom left, #06b6d4, transparent 60%)" }} />

          <div className="w-full max-w-[420px] relative z-10 py-4">

            {/* mobile logo */}
            <div className="lg:hidden mb-7 flex justify-center">
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                  style={{ background: "#06b6d4", color: "#fff" }}>N</div>
                <span className="text-white font-medium text-sm">Pre-NCLEX Nursing</span>
              </Link>
            </div>

            <p className="text-xs font-medium uppercase mb-2" style={{ color: "#34d399", letterSpacing: "0.2em" }}>
              Create account
            </p>
            <h1 className="font-display text-white mb-1"
              style={{ fontSize: "clamp(1.6rem,3vw,2.1rem)", fontWeight: 700, lineHeight: 1.2 }}>
              Start your journey<br />
              <span style={{ color: "#34d399", fontStyle: "italic" }}>for free</span>
            </h1>
            <p className="mb-6 text-sm" style={{ color: "#64748b", fontWeight: 300 }}>
              Already have an account?{" "}
              <Link href="/auth/login" style={{ color: "#06b6d4" }} className="hover:underline font-medium">Sign in →</Link>
            </p>

            {/* Google */}
            <button onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 mb-5"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "#e2e8f0" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
              </svg>
              Sign up with Google
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

            {/* full name */}
            <div className="mb-4">
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#64748b", letterSpacing: "0.05em" }}>Full name</label>
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                placeholder="Jane Doe" style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "#34d399")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")} />
            </div>

            {/* email */}
            <div className="mb-4">
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#64748b", letterSpacing: "0.05em" }}>Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com" style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "#34d399")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")} />
            </div>

            {/* exam goal */}
            <div className="mb-4">
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#64748b", letterSpacing: "0.05em" }}>Which exam are you preparing for?</label>
              <div className="grid grid-cols-2 gap-2">
                {examOptions.map((opt) => (
                  <button key={opt.value} onClick={() => setExam(opt.value)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all duration-200"
                    style={{
                      background: exam === opt.value ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.03)",
                      border: exam === opt.value ? "1px solid rgba(52,211,153,0.35)" : "1px solid rgba(255,255,255,0.07)",
                      color: exam === opt.value ? "#34d399" : "#64748b",
                      transform: exam === opt.value ? "scale(1.02)" : "scale(1)",
                    }}>
                    <span style={{ fontSize: "0.9rem" }}>{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* password */}
            <div className="mb-2">
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#64748b", letterSpacing: "0.05em" }}>Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  style={{ ...inputStyle, paddingRight: "80px" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#34d399")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")} />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button onClick={handleSuggest} style={{ color: "#34d399", fontSize: "0.62rem", letterSpacing: "0.05em" }}>SUGGEST</button>
                  <button onClick={() => setShowPw(s => !s)} style={{ color: "#475569" }}>
                    {showPw ? (
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* strength bar */}
            {password.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs" style={{ color: "#475569" }}>Password strength</span>
                  <span className="text-xs font-medium" style={{ color: strength.color }}>{strength.label}</span>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: strength.width, background: strength.color }} />
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[
                    { key: "length", label: "8+ chars" },
                    { key: "upper", label: "A–Z" },
                    { key: "lower", label: "a–z" },
                    { key: "number", label: "0–9" },
                    { key: "special", label: "!@#$%" },
                    { key: "long", label: "12+ chars" },
                  ].map(({ key, label }) => {
                    const ok = strength.checks[key as keyof typeof strength.checks];
                    return (
                      <span key={key} className="text-[10px] px-2 py-0.5 rounded-full transition-all"
                        style={{
                          background: ok ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.04)",
                          border: `1px solid ${ok ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.07)"}`,
                          color: ok ? "#34d399" : "#475569",
                        }}>
                        {ok ? "✓" : "·"} {label}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* suggested password */}
            {showSuggested && (
              <div className="mb-4 p-4 rounded-xl"
                style={{ background: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.2)" }}>
                <p className="text-xs mb-2" style={{ color: "#64748b" }}>Suggested strong password:</p>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-sm font-mono" style={{ color: "#34d399", wordBreak: "break-all" }}>{suggested}</code>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button onClick={copyPassword}
                      className="text-[10px] px-2 py-1 rounded-lg transition-all"
                      style={{ background: copied ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: copied ? "#34d399" : "#94a3b8" }}>
                      {copied ? "Copied!" : "Copy"}
                    </button>
                    <button onClick={applySuggested}
                      className="text-[10px] px-2 py-1 rounded-lg transition-all"
                      style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)", color: "#34d399" }}>
                      Use this
                    </button>
                  </div>
                </div>
                <p className="text-[10px] mt-2" style={{ color: "#334155" }}>Save this password somewhere safe before applying it.</p>
              </div>
            )}

            {/* confirm password */}
            <div className="mb-4">
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#64748b", letterSpacing: "0.05em" }}>Confirm password</label>
              <div className="relative">
                <input type={showConfirm ? "text" : "password"} value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="Repeat your password"
                  style={{
                    ...inputStyle,
                    paddingRight: "44px",
                    borderColor: passwordsMismatch ? "rgba(239,68,68,0.5)" : passwordsMatch ? "rgba(52,211,153,0.4)" : "rgba(255,255,255,0.09)",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = passwordsMismatch ? "rgba(239,68,68,0.5)" : "#34d399")}
                  onBlur={e => (e.currentTarget.style.borderColor = passwordsMismatch ? "rgba(239,68,68,0.5)" : passwordsMatch ? "rgba(52,211,153,0.4)" : "rgba(255,255,255,0.09)")} />
                <button onClick={() => setShowConfirm(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#475569" }}>
                  {showConfirm ? (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {passwordsMismatch && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>Passwords do not match</p>}
              {passwordsMatch && <p className="text-xs mt-1" style={{ color: "#34d399" }}>✓ Passwords match</p>}
            </div>

            {/* agree */}
            <div className="flex items-start gap-3 mb-5">
              <button onClick={() => setAgreed(a => !a)}
                className="w-5 h-5 rounded-md flex-shrink-0 mt-0.5 flex items-center justify-center transition-all duration-200"
                style={{
                  background: agreed ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.04)",
                  border: agreed ? "1px solid rgba(52,211,153,0.4)" : "1px solid rgba(255,255,255,0.09)",
                }}>
                {agreed && <span style={{ color: "#34d399", fontSize: "0.65rem" }}>✓</span>}
              </button>
              <p className="text-xs leading-relaxed" style={{ color: "#475569" }}>
                I agree to the{" "}
                <Link href="/terms" style={{ color: "#64748b" }} className="hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" style={{ color: "#64748b" }} className="hover:underline">Privacy Policy</Link>.
                I understand my data is encrypted and never sold.
              </p>
            </div>

            {/* submit */}
            <button onClick={handleSignup} disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: loading ? "rgba(52,211,153,0.4)" : "#34d399",
                color: "#080d1a",
                fontWeight: 600,
                boxShadow: loading ? "none" : "0 8px 24px rgba(52,211,153,0.22)",
                cursor: loading ? "not-allowed" : "pointer",
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
              {loading ? "Creating account..." : "Create free account →"}
            </button>

            <p className="text-center text-xs mt-5" style={{ color: "#1e293b" }}>
              🔒 Your data is encrypted and secure
            </p>

          </div>
        </div>
      </main>
    </>
  );
}