"use client";
import { useCart } from "@/lib/cartContext";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const { cartPlan } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const plan = cartPlan ?? { name: "Premium Plan", price: 29, color: "#0ea5e9" };

  function handleNotify() {
    if (email) setSubmitted(true);
  }

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg,#060f1e 0%,#0d1f35 50%,#0e2540 100%)", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ maxWidth: "560px", width: "100%", textAlign: "center" }}>

        {/* Icon */}
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg,rgba(14,165,233,.2),rgba(139,92,246,.15))", border: "1px solid rgba(14,165,233,.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", boxShadow: "0 0 40px rgba(14,165,233,.2)" }}>
          <svg width="36" height="36" fill="none" stroke="#0ea5e9" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>

        {/* Heading */}
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>Almost there</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2, marginBottom: "16px" }}>
          Payment Coming Soon
        </h1>
        <p style={{ fontSize: "16px", color: "#94a3b8", lineHeight: 1.75, marginBottom: "32px", maxWidth: "420px", margin: "0 auto 32px" }}>
          We are finalising our secure payment system. Leave your email and we will notify you the moment checkout goes live â€” your selected plan will be waiting.
        </p>

        {/* Plan badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: `${plan.color}12`, border: `1px solid ${plan.color}30`, borderRadius: "100px", padding: "8px 20px", marginBottom: "32px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: plan.color }} />
          <span style={{ fontSize: "13px", fontWeight: 700, color: plan.color }}>{plan.name} â€” {plan.price === 0 ? "Free" : `$${plan.price}/mo`}</span>
        </div>

        {/* Email capture */}
        {!submitted ? (
          <div style={{ display: "flex", gap: "10px", maxWidth: "420px", margin: "0 auto 32px" }}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ flex: 1, padding: "14px 18px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: "12px", color: "#f1f5f9", fontSize: "14px", outline: "none", fontFamily: "inherit" }}
            />
            <button
              onClick={handleNotify}
              style={{ padding: "14px 24px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", borderRadius: "12px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", boxShadow: "0 8px 24px rgba(14,165,233,.3)" }}>
              Notify me
            </button>
          </div>
        ) : (
          <div style={{ maxWidth: "420px", margin: "0 auto 32px", padding: "16px 24px", background: "rgba(16,185,129,.08)", border: "1px solid rgba(16,185,129,.25)", borderRadius: "14px" }}>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#34d399", margin: 0 }}>You are on the list!</p>
            <p style={{ fontSize: "13px", color: "#64748b", margin: "6px 0 0" }}>We will email you at {email} when payments go live.</p>
          </div>
        )}

        {/* What you get */}
        <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "20px", padding: "28px", maxWidth: "420px", margin: "0 auto 32px", textAlign: "left" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", letterSpacing: ".16em", textTransform: "uppercase", marginBottom: "16px" }}>What you get with {plan.name}</p>
          {[
            "Full access to all NCLEX-RN questions",
            "Timed, Tutor and Quick exam modes",
            "Deep clinical rationales for every answer",
            "Personal performance dashboard",
            "Flag and review system",
            "Priority support from our team",
          ].map(f => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "rgba(14,165,233,.15)", border: "1px solid rgba(14,165,233,.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="10" height="10" fill="none" stroke="#0ea5e9" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
              </div>
              <span style={{ fontSize: "13px", color: "#94a3b8" }}>{f}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/quiz/select" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "12px 28px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", textDecoration: "none", boxShadow: "0 8px 24px rgba(14,165,233,.3)" }}>
            Start practising free
          </Link>
          <Link href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.06)", color: "#94a3b8", padding: "12px 24px", borderRadius: "12px", fontWeight: 600, fontSize: "14px", textDecoration: "none", border: "1px solid rgba(255,255,255,.1)" }}>
            Back to pricing
          </Link>
        </div>

      </div>
    </main>
  );
}