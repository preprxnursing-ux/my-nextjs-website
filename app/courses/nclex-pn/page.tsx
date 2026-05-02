"use client";
import Link from "next/link";
import { useState } from "react";

const topics = [
  { name: "Management of Care", pct: 18, sub: ["Advance directives","Client rights","Confidentiality","Ethical practice","Supervision & delegation"] },
  { name: "Safety & Infection Control", pct: 12, sub: ["Emergency response","Error prevention","Home safety","Standard precautions","Use of restraints"] },
  { name: "Health Promotion & Maintenance", pct: 9, sub: ["Aging process","Developmental stages","Disease prevention","Self-care","Immunisation schedule"] },
  { name: "Psychosocial Integrity", pct: 9, sub: ["Behavioural interventions","Chemical dependency","Coping mechanisms","Crisis intervention","Therapeutic communication"] },
  { name: "Basic Care & Comfort", pct: 8, sub: ["Assistive devices","Elimination","Mobility","Non-pharmacological comfort","Palliative care"] },
  { name: "Pharmacological Therapies", pct: 14, sub: ["Adverse effects","Contraindications","Dosage calculations","Expected outcomes","Medication administration"] },
  { name: "Reduction of Risk Potential", pct: 11, sub: ["Diagnostic tests","Lab values","Potential complications","Therapeutic procedures","Vital signs"] },
  { name: "Physiological Adaptation", pct: 14, sub: ["Alterations in body systems","Fluid & electrolytes","Illness management","Medical emergencies","Pathophysiology"] },
];

const plans = [
  { name: "Q-Bank", price: 25, per: "month", badge: "", features: ["2,400+ practice questions","Detailed rationales","Performance tracking","Topic-specific filters","Mobile access"] },
  { name: "Complete Prep", price: 69, per: "month", badge: "Most Popular", features: ["Everything in Q-Bank","80+ hours video library","Unlimited CAT exams","Readiness assessments","NGN item formats"] },
  { name: "Sure PASS", price: 129, per: "one-time", badge: "Best Value", features: ["Everything in Complete","2-day live review","Pass guarantee","Personalised study plan","Dedicated tutor support"] },
];

export default function NCLEXPNPage() {
  const [activeTab, setActiveTab] = useState(-1);

  return (
    <main style={{ background: "#060f1e", color: "#e2e8f0", fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "100vh" }}>
      <section style={{ background: "linear-gradient(135deg, #060f1e 0%, #0d1f35 50%, #0e2540 100%)", padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: 999, padding: "6px 16px", marginBottom: 20 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0ea5e9", display: "inline-block" }} />
          <span style={{ color: "#38bdf8", fontSize: 13, fontWeight: 600, letterSpacing: "0.05em" }}>2026 NGN UPDATED</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: "0 0 16px" }}>NCLEX-PN® Exam Prep</h1>
        <p style={{ color: "#94a3b8", fontSize: "clamp(1rem, 2vw, 1.15rem)", maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.7 }}>
          Purpose-built for LPN/LVN candidates — comprehensive content, adaptive testing, and NGN item formats designed around the PN scope of practice.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/pricing" style={{ background: "#0ea5e9", color: "#fff", padding: "14px 28px", borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Start Preparing — Free</Link>
          <Link href="/quiz" style={{ background: "transparent", color: "#38bdf8", padding: "14px 28px", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none", border: "1px solid rgba(56,189,248,0.3)" }}>Try a Practice Question</Link>
        </div>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
          {[["2,400+","Practice Questions"],["99%","Pass Rate"],["NGN Ready","2026 Updated"],["80+ hrs","Video Content"]].map(([n,l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ color: "#38bdf8", fontSize: "1.6rem", fontWeight: 800, fontFamily: "'Cormorant Garamond', serif" }}>{n}</div>
              <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 0" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", marginBottom: 8 }}>What is the NCLEX-PN®?</h2>
        <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 40, maxWidth: 700 }}>
          The NCLEX-PN (Practical Nurse) is the licensing exam for LPNs and LVNs in the United States and Canada. The exam uses Computer Adaptive Testing and covers the scope of practice specific to practical nursing — assisting with care under the supervision of an RN or physician. The 2023 NGN update introduced new item formats requiring critical thinking and clinical judgement.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {[["Question count","85–150 questions (CAT)"],["Time limit","Up to 5 hours"],["Eligibility","PN or VN program graduate"],["Focus","PN scope of practice"]].map(([label, value]) => (
            <div key={label} style={{ background: "#0d1f35", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 10, padding: "18px 20px" }}>
              <div style={{ color: "#475569", fontSize: 12, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
              <div style={{ color: "#e2e8f0", fontWeight: 600 }}>{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 0" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", marginBottom: 8 }}>Client Needs Categories</h2>
        <p style={{ color: "#64748b", marginBottom: 32 }}>Click any category to see covered subtopics.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
          {topics.map((t, i) => (
            <div key={t.name} onClick={() => setActiveTab(activeTab === i ? -1 : i)}
              style={{ background: "#0d1f35", border: `1px solid ${activeTab === i ? "#0ea5e9" : "rgba(14,165,233,0.12)"}`, borderRadius: 10, padding: "18px 20px", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 14 }}>{t.name}</span>
                <span style={{ background: "rgba(14,165,233,0.15)", color: "#38bdf8", borderRadius: 999, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{t.pct}%</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, margin: "10px 0" }}>
                <div style={{ height: "100%", width: `${t.pct * 5}%`, background: "#0ea5e9", borderRadius: 2 }} />
              </div>
              {activeTab === i && <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>{t.sub.map(s => <li key={s} style={{ color: "#94a3b8", fontSize: 13, marginBottom: 4 }}>{s}</li>)}</ul>}
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 0" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", textAlign: "center", marginBottom: 8 }}>Choose Your Plan</h2>
        <p style={{ color: "#64748b", textAlign: "center", marginBottom: 40 }}>Free trial on every plan. No credit card required.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {plans.map((p) => (
            <div key={p.name} style={{ background: p.badge === "Most Popular" ? "linear-gradient(135deg,#0d2a40,#0e2a3a)" : "#0d1f35", border: `1px solid ${p.badge ? "#0ea5e9" : "rgba(14,165,233,0.12)"}`, borderRadius: 14, padding: "28px 24px", position: "relative" }}>
              {p.badge && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#0ea5e9", color: "#fff", borderRadius: 999, padding: "3px 14px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>{p.badge}</div>}
              <h3 style={{ color: "#f1f5f9", fontWeight: 700, marginBottom: 4 }}>{p.name}</h3>
              <div style={{ marginBottom: 20 }}><span style={{ color: "#38bdf8", fontSize: "2rem", fontWeight: 800 }}>${p.price}</span><span style={{ color: "#475569", fontSize: 13 }}> / {p.per}</span></div>
              <ul style={{ paddingLeft: 0, listStyle: "none", marginBottom: 24 }}>{p.features.map(f => <li key={f} style={{ color: "#94a3b8", fontSize: 13, marginBottom: 8, display: "flex", gap: 8 }}><span style={{ color: "#0ea5e9", flexShrink: 0 }}>✓</span>{f}</li>)}</ul>
              <Link href="/pricing" style={{ display: "block", textAlign: "center", background: p.badge === "Most Popular" ? "#0ea5e9" : "transparent", color: p.badge === "Most Popular" ? "#fff" : "#38bdf8", border: `1px solid ${p.badge === "Most Popular" ? "#0ea5e9" : "rgba(56,189,248,0.3)"}`, borderRadius: 8, padding: "12px", fontWeight: 700, textDecoration: "none", fontSize: 14 }}>Get Started</Link>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 80px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "#f1f5f9", marginBottom: 20 }}>Explore Other Courses</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[["Pre-Nursing","/courses/pre-nursing"],["Nursing School","/courses/nursing-school"],["NCLEX-RN","/courses/nclex-rn"],["Nurse Practitioner (FNP)","/courses/fnp"],["CCRN","/courses/ccrn"]].map(([name, href]) => (
            <Link key={name} href={href} style={{ background: "#0d1f35", color: "#94a3b8", border: "1px solid rgba(14,165,233,0.12)", borderRadius: 8, padding: "10px 18px", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>{name}</Link>
          ))}
        </div>
      </section>
    </main>
  );
}