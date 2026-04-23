"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
const IDLE_TIMEOUT = 6 * 60 * 60 * 1000;
const COUNTDOWN_SECONDS = 60;
export default function SessionGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const idleRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const isLoggedIn = useRef(false);
  const showModalRef = useRef(false);
  const clearAll = () => {
    if (idleRef.current) clearTimeout(idleRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
  };
  const handleLogout = useCallback(async () => {
    clearAll();
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  }, [router]);
  const startCountdown = useCallback(() => {
    showModalRef.current = true;
    setShowModal(true);
    setCountdown(COUNTDOWN_SECONDS);
    let c = COUNTDOWN_SECONDS;
    countdownRef.current = setInterval(() => {
      c -= 1;
      setCountdown(c);
      if (c <= 0) {
        clearInterval(countdownRef.current!);
        handleLogout();
      }
    }, 1000);
  }, [handleLogout]);
  const resetIdleTimer = useCallback(() => {
    if (!isLoggedIn.current) return;
    if (showModalRef.current) return;
    clearAll();
    idleRef.current = setTimeout(startCountdown, IDLE_TIMEOUT);
  }, [startCountdown]);
  const handleStayLoggedIn = useCallback(() => {
    clearAll();
    showModalRef.current = false;
    setShowModal(false);
    setCountdown(COUNTDOWN_SECONDS);
    idleRef.current = setTimeout(startCountdown, IDLE_TIMEOUT);
  }, [startCountdown]);
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return;
      isLoggedIn.current = true;
      idleRef.current = setTimeout(startCountdown, IDLE_TIMEOUT);
    });
    return () => clearAll();
  }, [startCountdown]);
  // Reset idle timer on page navigation
  useEffect(() => {
    resetIdleTimer();
  }, [pathname]);
  // Reset idle timer on user activity
  useEffect(() => {
    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "click"];
    events.forEach(e => window.addEventListener(e, resetIdleTimer, { passive: true }));
    return () => events.forEach(e => window.removeEventListener(e, resetIdleTimer));
  }, [resetIdleTimer]);
  if (!showModal) return null;
  const pct = (countdown / COUNTDOWN_SECONDS) * 100;
  const radius = 28;
  const circ = 2 * Math.PI * radius;
  const dash = (pct / 100) * circ;
  const color = countdown > 30 ? "#06b6d4" : countdown > 10 ? "#f59e0b" : "#ef4444";
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}>
      <div style={{ background: "linear-gradient(135deg,#0d1829,#0e2540)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "40px 36px", maxWidth: "420px", width: "90%", textAlign: "center", boxShadow: "0 32px 80px rgba(0,0,0,0.6)", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
        <div style={{ position: "relative", width: "80px", height: "80px", margin: "0 auto 24px" }}>
          <svg width="80" height="80" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
            <circle cx="40" cy="40" r={radius} fill="none" stroke={color} strokeWidth="5"
              strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
              style={{ transition: "stroke-dasharray 1s linear, stroke 0.5s" }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "1.4rem", fontWeight: 800, color, fontFamily: "'Cormorant Garamond',serif" }}>{countdown}</span>
          </div>
        </div>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#06b6d4", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px" }}>Session Expiring</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 700, color: "#f8fafc", marginBottom: "12px", lineHeight: 1.2 }}>
          Are you still there?
        </h2>
        <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.7, marginBottom: "28px" }}>
          You have been inactive for 6 hours. For your security, you will be logged out in <span style={{ color, fontWeight: 700 }}>{countdown} seconds</span>.
        </p>
        <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", marginBottom: "28px", overflow: "hidden" }}>
          <div style={{ height: "100%", background: color, borderRadius: "2px", width: `${pct}%`, transition: "width 1s linear, background 0.5s" }} />
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={handleLogout}
            style={{ flex: 1, padding: "13px", borderRadius: "12px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", transition: "all .2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
            Log out anyway
          </button>
          <button onClick={handleStayLoggedIn}
            style={{ flex: 1, padding: "13px", borderRadius: "12px", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", background: "linear-gradient(135deg,#06b6d4,#0ea5e9)", border: "none", color: "#fff", boxShadow: "0 8px 24px rgba(6,182,212,0.3)", transition: "all .2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            Stay logged in
          </button>
        </div>
      </div>
    </div>
  );
}
