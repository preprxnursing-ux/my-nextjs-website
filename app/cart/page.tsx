"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cartContext";

const allPlans = [
  {
    id: "free",
    name: "Free Plan",
    price: 0,
    period: "forever",
    color: "#64748b",
    features: ["30 NCLEX-RN questions", "Timed, Tutor and Quick modes", "Basic score tracking"],
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: 29,
    period: "per month",
    color: "#0ea5e9",
    features: ["Unlimited questions", "All courses and topics", "AI study recommendations", "Performance analytics", "Priority support"],
  },
  {
    id: "educator",
    name: "Educator Plan",
    price: 99,
    period: "per month",
    color: "#8b5cf6",
    features: ["Everything in Premium", "Up to 50 student seats", "Cohort analytics", "Custom question sets", "Dedicated support"],
  },
];

export default function CartPage() {
  const { cartPlan, addToCart, removeFromCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const plan = allPlans.find(p => p.id === cartPlan?.id);
  const discount = promoApplied ? 0.2 : 0;
  const total = plan ? plan.price * (1 - discount) : 0;

  function applyPromo() {
    if (promoCode.toUpperCase() === "NCLEX20") {
      setPromoApplied(true);
    } else {
      alert("Invalid promo code. Try NCLEX20 for 20% off!");
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg, #060f1e 0%, #0d1f35 50%, #0e2540 100%)", fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#e2e8f0", padding: "80px 24px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        <div style={{ marginBottom: "40px" }}>
          <Link href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#64748b", textDecoration: "none", fontSize: "13px", fontWeight: 600, marginBottom: "20px" }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back to Pricing
          </Link>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "#f8fafc", margin: "0 0 8px" }}>
            Your Cart
          </h1>
          <p style={{ color: "#64748b", fontSize: "15px", margin: 0 }}>Review your plan before proceeding to checkout.</p>
        </div>

        {!cartPlan || !plan ? (
          <div style={{ textAlign: "center", padding: "80px 24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px" }}>
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>🛒</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 700, color: "#f8fafc", marginBottom: "12px" }}>Your cart is empty</h2>
            <p style={{ color: "#64748b", marginBottom: "28px" }}>Choose a plan to get started with Pre-NCLEX Nursing.</p>
            <Link href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #0ea5e9, #38bdf8)", color: "#fff", padding: "14px 32px", borderRadius: "10px", fontWeight: 700, fontSize: "15px", textDecoration: "none" }}>
              View Plans
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "24px", alignItems: "start" }}>

            <div>
              <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${plan.color}30`, borderRadius: "20px", overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: plan.color }} />
                <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>Selected Plan</p>
                  <button onClick={removeFromCart} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "13px", fontWeight: 600, fontFamily: "inherit" }}>Remove</button>
                </div>
                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: `${plan.color}20`, border: `2px solid ${plan.color}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: plan.color }} />
                    </div>
                    <div>
                      <p style={{ fontSize: "18px", fontWeight: 700, color: "#f8fafc", margin: 0 }}>{plan.name}</p>
                      <p style={{ fontSize: "13px", color: plan.color, margin: 0, fontWeight: 600 }}>
                        {plan.price === 0 ? "Free forever" : `$${plan.price}/month`}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {plan.features.map((f, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: `${plan.color}20`, border: `1px solid ${plan.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="10" height="10" fill="none" stroke={plan.color} strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                        </div>
                        <span style={{ fontSize: "14px", color: "#94a3b8" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "24px" }}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#64748b", marginBottom: "12px" }}>Switch to a different plan:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {allPlans.filter(p => p.id !== cartPlan.id).map(p => (
                    <button key={p.id}
                      onClick={() => { addToCart({ id: p.id, name: p.name, price: p.price, period: p.period, color: p.color }); setPromoApplied(false); }}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderRadius: "14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                        <div>
                          <p style={{ fontSize: "14px", fontWeight: 700, color: "#f1f5f9", margin: 0 }}>{p.name}</p>
                          <p style={{ fontSize: "12px", color: p.color, margin: 0 }}>{p.price === 0 ? "Free" : `$${p.price}/month`}</p>
                        </div>
                      </div>
                      <span style={{ fontSize: "12px", color: "#0ea5e9", fontWeight: 600 }}>Switch</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "24px", position: "sticky", top: "80px" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#f8fafc", margin: "0 0 20px" }}>Order Summary</h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                  <span style={{ color: "#94a3b8" }}>{plan.name}</span>
                  <span style={{ color: "#f1f5f9", fontWeight: 600 }}>{plan.price === 0 ? "Free" : `$${plan.price}`}</span>
                </div>
                {promoApplied && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "#34d399" }}>Promo (NCLEX20)</span>
                    <span style={{ color: "#34d399", fontWeight: 600 }}>-${(plan.price * 0.2).toFixed(2)}</span>
                  </div>
                )}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "12px", display: "flex", justifyContent: "space-between", fontSize: "16px" }}>
                  <span style={{ color: "#f8fafc", fontWeight: 700 }}>Total</span>
                  <span style={{ color: "#f8fafc", fontWeight: 700 }}>{total === 0 ? "Free" : `$${total.toFixed(2)}/mo`}</span>
                </div>
              </div>

              {plan.price > 0 && !promoApplied && (
                <div style={{ marginBottom: "20px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Promo Code</p>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input type="text" placeholder="Enter code" value={promoCode} onChange={e => setPromoCode(e.target.value)}
                      style={{ flex: 1, padding: "10px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#f1f5f9", fontSize: "13px", outline: "none", fontFamily: "inherit" }} />
                    <button onClick={applyPromo} style={{ padding: "10px 16px", background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: "8px", color: "#38bdf8", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Apply</button>
                  </div>
                </div>
              )}

              {promoApplied && (
                <div style={{ marginBottom: "20px", padding: "10px 14px", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)", borderRadius: "8px" }}>
                  <p style={{ fontSize: "13px", color: "#34d399", fontWeight: 600, margin: 0 }}>Promo applied! 20% off.</p>
                </div>
              )}

              <Link href="/auth/signup" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", padding: "16px", background: `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)`, color: "#fff", borderRadius: "12px", fontWeight: 700, fontSize: "15px", textDecoration: "none", boxShadow: `0 8px 28px ${plan.color}40`, marginBottom: "10px" }}>
                {plan.price === 0 ? "Get Started Free" : "Proceed to Checkout"}
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>

              <p style={{ fontSize: "11px", color: "#475569", textAlign: "center", marginTop: "10px" }}>
                Secure checkout. Cancel anytime. No hidden fees.
              </p>

              <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "14px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {["SSL Secure", "Cancel Anytime", "M-Pesa Ready"].map(badge => (
                  <span key={badge} style={{ fontSize: "10px", fontWeight: 600, color: "#475569" }}>{badge}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}