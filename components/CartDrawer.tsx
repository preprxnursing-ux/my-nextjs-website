"use client";
import { useCart } from "@/lib/cartContext";
import Link from "next/link";

export default function CartDrawer() {
  const { cartPlan, removeFromCart, cartOpen, setCartOpen } = useCart();

  return (
    <>
      {cartOpen && (
        <div onClick={() => setCartOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 9998, backdropFilter: "blur(6px)", transition: "opacity .3s" }} />
      )}
      <div style={{
        position: "fixed", top: 0, right: 0, height: "100vh", width: "400px", maxWidth: "100vw",
        background: "linear-gradient(160deg, #060f1e 0%, #0d1f35 50%, #0e2540 100%)",
        borderLeft: "1px solid rgba(14,165,233,0.2)",
        boxShadow: "-32px 0 80px rgba(0,0,0,0.6)",
        zIndex: 9999, transform: cartOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.4s cubic-bezier(.32,1,.32,1)",
        display: "flex", flexDirection: "column",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>

        {/* Top glow */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "200px", height: "200px", background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Header */}
        <div style={{ padding: "24px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(14,165,233,0.4)" }}>
              <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#f8fafc", margin: 0 }}>Your Cart</h2>
              <p style={{ fontSize: "11px", color: "#475569", margin: 0, fontWeight: 500 }}>
                {cartPlan ? "1 item" : "Empty"}
              </p>
            </div>
          </div>
          <button onClick={() => setCartOpen(false)}
            style={{ width: "34px", height: "34px", borderRadius: "9px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#f1f5f9"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#64748b"; }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px", position: "relative", zIndex: 1 }}>
          {!cartPlan ? (
            <div style={{ textAlign: "center", paddingTop: "80px" }}>
              <div style={{ width: "72px", height: "72px", borderRadius: "20px", background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <svg width="32" height="32" fill="none" stroke="#0ea5e9" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#f8fafc", marginBottom: "8px", fontFamily: "'Cormorant Garamond',serif" }}>Your cart is empty</h3>
              <p style={{ color: "#475569", fontSize: "14px", marginBottom: "28px", lineHeight: 1.6 }}>Choose a plan to get started on your NCLEX journey</p>
              <Link href="/pricing" onClick={() => setCartOpen(false)}
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "12px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", textDecoration: "none", boxShadow: "0 8px 24px rgba(14,165,233,0.3)" }}>
                View Plans
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          ) : (
            <>
              {/* Plan Card */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${cartPlan.color}40`, borderRadius: "18px", padding: "20px", marginBottom: "20px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${cartPlan.color}, ${cartPlan.color}80)` }} />
                <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "120px", height: "120px", borderRadius: "50%", background: `radial-gradient(circle, ${cartPlan.color}15 0%, transparent 70%)`, pointerEvents: "none" }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: cartPlan.color, boxShadow: `0 0 10px ${cartPlan.color}80` }} />
                    <p style={{ fontSize: "16px", fontWeight: 800, color: "#f8fafc", margin: 0 }}>{cartPlan.name}</p>
                  </div>
                  <button onClick={removeFromCart}
                    style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", cursor: "pointer", fontSize: "11px", fontWeight: 700, fontFamily: "inherit", padding: "4px 10px", borderRadius: "6px", transition: "all .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}>
                    Remove
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "4px" }}>
                  <p style={{ fontSize: "32px", fontWeight: 800, color: cartPlan.color, margin: 0, fontFamily: "'Cormorant Garamond',serif" }}>
                    {cartPlan.price === 0 ? "Free" : `$${cartPlan.price}`}
                  </p>
                  {cartPlan.price > 0 && <span style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>/month</span>}
                </div>
                <p style={{ fontSize: "11px", color: "#475569", margin: 0, fontWeight: 500 }}>{cartPlan.period}</p>
              </div>

              {/* What is included */}
              <div style={{ marginBottom: "20px" }}>
                <p style={{ fontSize: "10px", fontWeight: 800, color: "#334155", textTransform: "uppercase", letterSpacing: ".16em", marginBottom: "12px" }}>What you get</p>
                {[
                  cartPlan.price === 0 ? "30 practice questions" : "Unlimited questions",
                  "All 3 exam modes — Timed, Tutor, Quick",
                  cartPlan.price >= 29 ? "Full analytics dashboard" : "Basic score tracking",
                  cartPlan.price >= 99 ? "50 student seats + cohort analytics" : "Personal account",
                  "Deep clinical rationales",
                ].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", padding: "8px 12px", borderRadius: "10px", background: "rgba(255,255,255,0.02)" }}>
                    <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: `${cartPlan.color}15`, border: `1px solid ${cartPlan.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="10" height="10" fill="none" stroke={cartPlan.color} strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div style={{ background: "rgba(14,165,233,0.04)", border: "1px solid rgba(14,165,233,0.1)", borderRadius: "14px", padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ fontSize: "13px", color: "#64748b" }}>Subtotal</span>
                  <span style={{ fontSize: "13px", color: "#e2e8f0", fontWeight: 600 }}>{cartPlan.price === 0 ? "Free" : `$${cartPlan.price}`}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: "15px", fontWeight: 800, color: "#f8fafc" }}>Total</span>
                  <span style={{ fontSize: "15px", fontWeight: 800, color: "#f8fafc" }}>{cartPlan.price === 0 ? "Free" : `$${cartPlan.price}/mo`}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {cartPlan && (
          <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 1 }}>
            <Link href="/checkout" onClick={() => setCartOpen(false)}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", padding: "15px", background: "linear-gradient(135deg, #8b5cf6, #a855f7)", color: "#fff", borderRadius: "14px", fontWeight: 700, fontSize: "15px", textDecoration: "none", marginBottom: "10px", boxShadow: `0 8px 24px ${cartPlan.color}40`, transition: "all .2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              {cartPlan.price === 0 ? "Get Started Free" : "Proceed to Checkout"}
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/cart" onClick={() => setCartOpen(false)}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", width: "100%", padding: "11px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#64748b", borderRadius: "12px", fontWeight: 600, fontSize: "13px", textDecoration: "none", transition: "all .2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#94a3b8"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#64748b"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}>
              View Full Cart
            </Link>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: "14px" }}>
              {["SSL Secure", "Cancel Anytime", "M-Pesa Ready"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <svg width="10" height="10" fill="none" stroke="#334155" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                  <span style={{ fontSize: "10px", color: "#334155", fontWeight: 600 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
