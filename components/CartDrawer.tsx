"use client";
import { useCart } from "@/lib/cartContext";
import Link from "next/link";

export default function CartDrawer() {
  const { cartPlan, removeFromCart, cartOpen, setCartOpen } = useCart();

  return (
    <>
      {/* Overlay */}
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 9998, backdropFilter: "blur(4px)" }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, height: "100vh", width: "380px", maxWidth: "100vw",
        background: "linear-gradient(160deg, #0d1f35, #0f2540)",
        border: "1px solid rgba(14,165,233,0.15)",
        boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
        zIndex: 9999, transform: cartOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(.32,1,.32,1)",
        display: "flex", flexDirection: "column",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>

        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" fill="none" stroke="#38bdf8" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#f8fafc", margin: 0 }}>Your Cart</h2>
          </div>
          <button onClick={() => setCartOpen(false)} style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {!cartPlan ? (
            <div style={{ textAlign: "center", paddingTop: "60px" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🛒</div>
              <p style={{ color: "#64748b", fontSize: "15px", marginBottom: "24px" }}>Your cart is empty</p>
              <Link href="/pricing" onClick={() => setCartOpen(false)}
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.3)", color: "#38bdf8", padding: "12px 24px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
                View Plans
              </Link>
            </div>
          ) : (
            <>
              {/* Plan Card */}
              <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${cartPlan.color}30`, borderRadius: "16px", padding: "20px", marginBottom: "20px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: cartPlan.color }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: cartPlan.color }} />
                    <p style={{ fontSize: "16px", fontWeight: 700, color: "#f8fafc", margin: 0 }}>{cartPlan.name}</p>
                  </div>
                  <button onClick={removeFromCart} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "12px", fontWeight: 600, fontFamily: "inherit" }}>Remove</button>
                </div>
                <p style={{ fontSize: "24px", fontWeight: 800, color: cartPlan.color, margin: "0 0 4px" }}>
                  {cartPlan.price === 0 ? "Free" : `$${cartPlan.price}`}
                </p>
                <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>{cartPlan.period}</p>
              </div>

              {/* Summary */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "16px", marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "14px", color: "#94a3b8" }}>Subtotal</span>
                  <span style={{ fontSize: "14px", color: "#f1f5f9", fontWeight: 600 }}>{cartPlan.price === 0 ? "Free" : `$${cartPlan.price}`}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: "15px", fontWeight: 700, color: "#f8fafc" }}>Total</span>
                  <span style={{ fontSize: "15px", fontWeight: 700, color: "#f8fafc" }}>{cartPlan.price === 0 ? "Free" : `$${cartPlan.price}/mo`}</span>
                </div>
              </div>

              {/* What's included */}
              <div style={{ marginBottom: "20px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>What you get</p>
                {[
                  cartPlan.price === 0 ? "30 practice questions" : "Unlimited questions",
                  "All exam modes",
                  cartPlan.price >= 29 ? "Full analytics dashboard" : "Basic score tracking",
                  cartPlan.price >= 99 ? "50 student seats" : "Personal account",
                ].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <svg width="14" height="14" fill="none" stroke={cartPlan.color} strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                    <span style={{ fontSize: "13px", color: "#94a3b8" }}>{f}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {cartPlan && (
          <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <Link href="/cart" onClick={() => setCartOpen(false)}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", padding: "15px", background: `linear-gradient(135deg, ${cartPlan.color}, ${cartPlan.color}cc)`, color: "#fff", borderRadius: "12px", fontWeight: 700, fontSize: "15px", textDecoration: "none", marginBottom: "10px", boxShadow: `0 8px 24px ${cartPlan.color}40` }}>
              View Full Cart
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/auth/signup" onClick={() => setCartOpen(false)}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "12px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", borderRadius: "12px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
              {cartPlan.price === 0 ? "Get Started Free" : "Proceed to Checkout"}
            </Link>
            <p style={{ fontSize: "11px", color: "#334155", textAlign: "center", marginTop: "10px" }}>
              Secure. Cancel anytime. M-Pesa supported.
            </p>
          </div>
        )}
      </div>
    </>
  );
}