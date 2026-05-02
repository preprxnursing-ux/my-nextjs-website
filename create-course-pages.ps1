# ============================================================
# Pre-NCLEX Nursing — Course Pages Generator
# Run from: C:\Users\USER\Desktop\nclex-app
# Creates all 6 individual course landing pages
# ============================================================

Write-Host "Creating course pages..." -ForegroundColor Cyan

# ─── NCLEX-RN PAGE ───────────────────────────────────────────
$nclexRN = @'
"use client";
import Link from "next/link";
import { useState } from "react";

const topics = [
  { name: "Management of Care", pct: 17, sub: ["Prioritization & delegation","Ethical practice","Advance directives","Informed consent","Legal rights"] },
  { name: "Safety & Infection Control", pct: 9, sub: ["Standard precautions","Error prevention","Safe medication admin","Restraints & safety","Hazardous materials"] },
  { name: "Health Promotion", pct: 9, sub: ["Developmental stages","Immunizations","Lifestyle choices","Screening programs","Risk factor reduction"] },
  { name: "Psychosocial Integrity", pct: 9, sub: ["Coping mechanisms","Crisis intervention","Mental health concepts","Abuse & neglect","Cultural sensitivity"] },
  { name: "Basic Care & Comfort", pct: 9, sub: ["Personal hygiene","Non-pharmacological pain","Rest & sleep","Nutrition & hydration","Elimination patterns"] },
  { name: "Pharmacological Therapies", pct: 15, sub: ["Drug classifications","Expected effects","Adverse reactions","Calculation & dosage","High-alert medications"] },
  { name: "Reduction of Risk", pct: 12, sub: ["Diagnostic tests","Lab values","Vital sign monitoring","Pre/post-op care","Therapeutic procedures"] },
  { name: "Physiological Adaptation", pct: 15, sub: ["Fluid & electrolytes","Hemodynamics","Unexpected responses","Medical emergencies","Pathophysiology"] },
];

const plans = [
  { name: "Q-Bank", price: 29, per: "month", badge: "", features: ["3,100+ practice questions","Custom test builder","Detailed rationales","Performance analytics","Topic filtering","Mobile app access"] },
  { name: "Complete Prep", price: 79, per: "month", badge: "Most Popular", features: ["Everything in Q-Bank","110+ hours video library","Unlimited CAT exams","Readiness assessments","NGN item formats","Live webinar access"] },
  { name: "Sure PASS", price: 149, per: "one-time", badge: "Best Value", features: ["Everything in Complete","3-day 23-hour live review","Pass guarantee","Dedicated support","Study schedule","Pharmacology crash course"] },
];

export default function NCLEXRNPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main style={{ background: "#060f1e", color: "#e2e8f0", fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "100vh" }}>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #060f1e 0%, #0d1f35 50%, #0e2540 100%)", padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: 999, padding: "6px 16px", marginBottom: 20 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0ea5e9", display: "inline-block" }} />
          <span style={{ color: "#38bdf8", fontSize: 13, fontWeight: 600, letterSpacing: "0.05em" }}>2026 NGN UPDATED</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: "0 0 16px" }}>
          NCLEX-RN® Exam Prep
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "clamp(1rem, 2vw, 1.15rem)", maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.7 }}>
          The most comprehensive NCLEX-RN preparation platform — built around NGN item formats, adaptive testing, and real clinical reasoning.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/pricing" style={{ background: "#0ea5e9", color: "#fff", padding: "14px 28px", borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Start Preparing — Free</Link>
          <Link href="/quiz" style={{ background: "transparent", color: "#38bdf8", padding: "14px 28px", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none", border: "1px solid rgba(56,189,248,0.3)" }}>Take a Practice Question</Link>
        </div>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
          {[["3,100+","Practice Questions"],["99%","First-Attempt Pass Rate"],["NGN Ready","2026 Updated"],["110+ hrs","Video Library"]].map(([n,l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ color: "#38bdf8", fontSize: "1.6rem", fontWeight: 800, fontFamily: "'Cormorant Garamond', serif" }}>{n}</div>
              <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* EXAM OVERVIEW */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 0" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", marginBottom: 8 }}>What is the NCLEX-RN®?</h2>
        <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 40, maxWidth: 700 }}>
          The NCLEX-RN is the national licensing examination for registered nurses in the US and Canada. It uses Computer Adaptive Testing (CAT) to assess clinical decision-making across 8 client needs categories. The 2023 NGN update introduced new item types — unfolding case studies, bow-tie questions, extended drag-and-drop, and matrix questions — that require deep clinical reasoning, not memorisation.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {[
            { label: "Question count", value: "85–145 questions (CAT)" },
            { label: "Time limit", value: "Up to 5 hours" },
            { label: "Passing standard", value: "Next Generation NCLEX (NGN)" },
            { label: "Eligibility", value: "BSN or ADN graduate" },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: "#0d1f35", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 10, padding: "18px 20px" }}>
              <div style={{ color: "#475569", fontSize: 12, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
              <div style={{ color: "#e2e8f0", fontWeight: 600 }}>{value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TOPIC BREAKDOWN */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 0" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", marginBottom: 8 }}>Client Needs Categories</h2>
        <p style={{ color: "#64748b", marginBottom: 32 }}>Click any category to explore subtopics covered in our Q-Bank.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
          {topics.map((t, i) => (
            <div key={t.name} onClick={() => setActiveTab(activeTab === i ? -1 : i)}
              style={{ background: "#0d1f35", border: `1px solid ${activeTab === i ? "#0ea5e9" : "rgba(14,165,233,0.12)"}`, borderRadius: 10, padding: "18px 20px", cursor: "pointer", transition: "border-color 0.2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: activeTab === i ? 12 : 0 }}>
                <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 14 }}>{t.name}</span>
                <span style={{ background: "rgba(14,165,233,0.15)", color: "#38bdf8", borderRadius: 999, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{t.pct}%</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, margin: "10px 0" }}>
                <div style={{ height: "100%", width: `${t.pct * 5}%`, background: "#0ea5e9", borderRadius: 2, transition: "width 0.4s" }} />
              </div>
              {activeTab === i && (
                <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
                  {t.sub.map(s => <li key={s} style={{ color: "#94a3b8", fontSize: 13, marginBottom: 4 }}>{s}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* NGN SECTION */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 0" }}>
        <div style={{ background: "linear-gradient(135deg, #0d1f35, #0e2540)", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 16, padding: "40px 36px" }}>
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <span style={{ background: "rgba(14,165,233,0.15)", color: "#38bdf8", borderRadius: 999, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>NGN READY</span>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "#f1f5f9", margin: "14px 0 12px" }}>Next Generation NCLEX® Item Types</h3>
              <p style={{ color: "#94a3b8", lineHeight: 1.8, fontSize: 14 }}>Our Q-Bank is fully updated for 2026 with all NGN question formats. You won't face surprises on exam day.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, minWidth: 280 }}>
              {["Unfolding Case Studies","Bow-Tie Questions","Extended Drag & Drop","Matrix Multiple Response","Enhanced Hot Spot","Highlight Text"].map(item => (
                <div key={item} style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#cbd5e1" }}>
                  <span style={{ color: "#0ea5e9", marginRight: 6 }}>✓</span>{item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 0" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", textAlign: "center", marginBottom: 8 }}>Choose Your Plan</h2>
        <p style={{ color: "#64748b", textAlign: "center", marginBottom: 40 }}>All plans include a free trial. No credit card required.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {plans.map((p) => (
            <div key={p.name} style={{ background: p.badge === "Most Popular" ? "linear-gradient(135deg, #0d2a40, #0e2a3a)" : "#0d1f35", border: `1px solid ${p.badge ? "#0ea5e9" : "rgba(14,165,233,0.12)"}`, borderRadius: 14, padding: "28px 24px", position: "relative" }}>
              {p.badge && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#0ea5e9", color: "#fff", borderRadius: 999, padding: "3px 14px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>{p.badge}</div>}
              <h3 style={{ color: "#f1f5f9", fontWeight: 700, marginBottom: 4 }}>{p.name}</h3>
              <div style={{ marginBottom: 20 }}>
                <span style={{ color: "#38bdf8", fontSize: "2rem", fontWeight: 800 }}>${p.price}</span>
                <span style={{ color: "#475569", fontSize: 13 }}> / {p.per}</span>
              </div>
              <ul style={{ paddingLeft: 0, listStyle: "none", marginBottom: 24 }}>
                {p.features.map(f => <li key={f} style={{ color: "#94a3b8", fontSize: 13, marginBottom: 8, display: "flex", gap: 8 }}><span style={{ color: "#0ea5e9", flexShrink: 0 }}>✓</span>{f}</li>)}
              </ul>
              <Link href="/pricing" style={{ display: "block", textAlign: "center", background: p.badge === "Most Popular" ? "#0ea5e9" : "transparent", color: p.badge === "Most Popular" ? "#fff" : "#38bdf8", border: `1px solid ${p.badge === "Most Popular" ? "#0ea5e9" : "rgba(56,189,248,0.3)"}`, borderRadius: 8, padding: "12px", fontWeight: 700, textDecoration: "none", fontSize: 14 }}>
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* OTHER COURSES */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 80px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "#f1f5f9", marginBottom: 20 }}>Explore Other Courses</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[["Pre-Nursing","/courses/pre-nursing"],["Nursing School","/courses/nursing-school"],["NCLEX-PN","/courses/nclex-pn"],["Nurse Practitioner (FNP)","/courses/fnp"],["CCRN","/courses/ccrn"]].map(([name, href]) => (
            <Link key={name} href={href} style={{ background: "#0d1f35", color: "#94a3b8", border: "1px solid rgba(14,165,233,0.12)", borderRadius: 8, padding: "10px 18px", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>{name}</Link>
          ))}
        </div>
      </section>
    </main>
  );
}
'@

New-Item -ItemType Directory -Force -Path "app\courses\nclex-rn" | Out-Null
[System.IO.File]::WriteAllText("app\courses\nclex-rn\page.tsx", $nclexRN, [System.Text.Encoding]::UTF8)
Write-Host "  [OK] NCLEX-RN page" -ForegroundColor Green

# ─── NCLEX-PN PAGE ───────────────────────────────────────────
$nclexPN = @'
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
'@

New-Item -ItemType Directory -Force -Path "app\courses\nclex-pn" | Out-Null
[System.IO.File]::WriteAllText("app\courses\nclex-pn\page.tsx", $nclexPN, [System.Text.Encoding]::UTF8)
Write-Host "  [OK] NCLEX-PN page" -ForegroundColor Green

# ─── PRE-NURSING PAGE ────────────────────────────────────────
$preNursing = @'
"use client";
import Link from "next/link";
import { useState } from "react";

export default function PreNursingPage() {
  const [activeExam, setActiveExam] = useState<"teas"|"hesi">("teas");

  const teasTopics = [
    { name: "Reading", pct: 31, sub: ["Key ideas & details","Craft & structure","Integration of knowledge","Informational sources"] },
    { name: "Mathematics", pct: 22, sub: ["Numbers & algebra","Measurement & data","Metric conversions","Fractions & percentages"] },
    { name: "Science", pct: 31, sub: ["Human anatomy & physiology","Life & physical science","Scientific reasoning","Biology fundamentals"] },
    { name: "English & Language Usage", pct: 16, sub: ["Conventions of Standard English","Knowledge of language","Vocabulary acquisition"] },
  ];

  const hesiTopics = [
    { name: "Math", pct: 25, sub: ["Basic operations","Fractions & decimals","Dosage calculation","Roman numerals"] },
    { name: "Reading Comprehension", pct: 25, sub: ["Identify main idea","Make inferences","Fact vs opinion","Passage analysis"] },
    { name: "Vocabulary & General Knowledge", pct: 20, sub: ["Medical terminology","Healthcare vocabulary","Context clues"] },
    { name: "Grammar", pct: 15, sub: ["Sentence structure","Punctuation","Parts of speech","Subject-verb agreement"] },
    { name: "Biology", pct: 8, sub: ["Cell biology","Metabolism","Genetics","Biological macromolecules"] },
    { name: "Chemistry", pct: 7, sub: ["Periodic table","Chemical bonding","Acids & bases","Nuclear chemistry"] },
  ];

  const topics = activeExam === "teas" ? teasTopics : hesiTopics;

  return (
    <main style={{ background: "#060f1e", color: "#e2e8f0", fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "100vh" }}>
      <section style={{ background: "linear-gradient(135deg, #060f1e 0%, #0d1f35 50%, #0e2540 100%)", padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: 999, padding: "6px 16px", marginBottom: 20 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0ea5e9", display: "inline-block" }} />
          <span style={{ color: "#38bdf8", fontSize: 13, fontWeight: 600, letterSpacing: "0.05em" }}>TEAS 7 &amp; HESI A2</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: "0 0 16px" }}>Pre-Nursing Exam Prep</h1>
        <p style={{ color: "#94a3b8", fontSize: "clamp(1rem, 2vw, 1.15rem)", maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.7 }}>
          Your nursing school journey starts here. Comprehensive TEAS 7 and HESI A2 preparation — practice tests, video walkthroughs, and personalised study plans.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/pricing" style={{ background: "#0ea5e9", color: "#fff", padding: "14px 28px", borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Start Free Today</Link>
          <Link href="/quiz" style={{ background: "transparent", color: "#38bdf8", padding: "14px 28px", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none", border: "1px solid rgba(56,189,248,0.3)" }}>Try a Sample Question</Link>
        </div>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
          {[["1,800+","Practice Questions"],["TEAS 7","& HESI A2"],["Expert","Video Walkthroughs"],["Score","Improvement Guarantee"]].map(([n,l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ color: "#38bdf8", fontSize: "1.6rem", fontWeight: 800, fontFamily: "'Cormorant Garamond', serif" }}>{n}</div>
              <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* EXAM SELECTOR */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 0" }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
          {(["teas","hesi"] as const).map(exam => (
            <button key={exam} onClick={() => setActiveExam(exam)}
              style={{ background: activeExam === exam ? "#0ea5e9" : "#0d1f35", color: activeExam === exam ? "#fff" : "#94a3b8", border: `1px solid ${activeExam === exam ? "#0ea5e9" : "rgba(14,165,233,0.2)"}`, borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontWeight: 700, fontSize: 15, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {exam === "teas" ? "TEAS 7" : "HESI A2"}
            </button>
          ))}
        </div>

        {activeExam === "teas" && (
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", marginBottom: 8 }}>TEAS 7 — Test of Essential Academic Skills</h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, maxWidth: 700, marginBottom: 24 }}>
              The ATI TEAS 7 is the most widely used nursing school entrance exam in the United States. It assesses academic readiness across four content areas — Reading, Mathematics, Science, and English & Language Usage. Most nursing programs require a minimum score of 65–70%.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 32 }}>
              {[["Questions","170 (150 scored + 20 unscored)"],["Time","209 minutes"],["Format","Multiple choice + ATI Technology-Enhanced"],["Sections","4 content areas"]].map(([k,v]) => (
                <div key={k} style={{ background: "#0d1f35", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 10, padding: "16px 18px" }}>
                  <div style={{ color: "#475569", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{k}</div>
                  <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeExam === "hesi" && (
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", marginBottom: 8 }}>HESI A2 — Admission Assessment Exam</h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, maxWidth: 700, marginBottom: 24 }}>
              The HESI A2 (Health Education Systems Incorporated Admissions Assessment) is used by nursing schools to evaluate a candidate's academic readiness. Unlike the TEAS, each school selects which subtests to require, so your preparation should match your specific program's requirements.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 32 }}>
              {[["Questions","Varies by subtest"],["Time","5+ hours (full exam)"],["Passing score","Varies by school (usually 75–80%)"],["Subtests","Up to 9 depending on program"]].map(([k,v]) => (
                <div key={k} style={{ background: "#0d1f35", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 10, padding: "16px 18px" }}>
                  <div style={{ color: "#475569", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{k}</div>
                  <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "#f1f5f9", marginBottom: 16 }}>Content Breakdown</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
          {topics.map((t, i) => (
            <div key={t.name} style={{ background: "#0d1f35", border: "1px solid rgba(14,165,233,0.12)", borderRadius: 10, padding: "18px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 14 }}>{t.name}</span>
                <span style={{ background: "rgba(14,165,233,0.15)", color: "#38bdf8", borderRadius: 999, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{t.pct}%</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginBottom: 12 }}>
                <div style={{ height: "100%", width: `${t.pct * 3}%`, background: "#0ea5e9", borderRadius: 2 }} />
              </div>
              <ul style={{ paddingLeft: 18, margin: 0 }}>{t.sub.map(s => <li key={s} style={{ color: "#94a3b8", fontSize: 12, marginBottom: 3 }}>{s}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 80px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "#f1f5f9", marginBottom: 20 }}>Continue Your Journey</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[["Nursing School","/courses/nursing-school"],["NCLEX-RN","/courses/nclex-rn"],["NCLEX-PN","/courses/nclex-pn"],["Nurse Practitioner","/courses/fnp"],["CCRN","/courses/ccrn"]].map(([name, href]) => (
            <Link key={name} href={href} style={{ background: "#0d1f35", color: "#94a3b8", border: "1px solid rgba(14,165,233,0.12)", borderRadius: 8, padding: "10px 18px", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>{name}</Link>
          ))}
        </div>
      </section>
    </main>
  );
}
'@

New-Item -ItemType Directory -Force -Path "app\courses\pre-nursing" | Out-Null
[System.IO.File]::WriteAllText("app\courses\pre-nursing\page.tsx", $preNursing, [System.Text.Encoding]::UTF8)
Write-Host "  [OK] Pre-Nursing page" -ForegroundColor Green

# ─── NURSING SCHOOL PAGE ─────────────────────────────────────
$nursingSchool = @'
"use client";
import Link from "next/link";
import { useState } from "react";

const subjects = [
  { name: "Fundamentals of Nursing", icon: "🏥", sub: ["Nursing process (ADPIE)","Vital signs assessment","Patient hygiene & comfort","Documentation","Safety & environment"] },
  { name: "Medical-Surgical Nursing", icon: "💊", sub: ["Cardiovascular disorders","Respiratory conditions","GI & renal disorders","Neurological nursing","Oncology care"] },
  { name: "Pharmacology", icon: "⚗️", sub: ["Drug classifications","Mechanisms of action","Safe administration","Calculation practice","High-alert medications"] },
  { name: "Mental Health Nursing", icon: "🧠", sub: ["Therapeutic communication","Mood & anxiety disorders","Psychosis management","Substance use","Crisis intervention"] },
  { name: "Maternal-Newborn Nursing", icon: "👶", sub: ["Antepartum care","Labour & delivery","Postpartum nursing","Newborn assessment","High-risk pregnancy"] },
  { name: "Paediatric Nursing", icon: "🌱", sub: ["Growth & development","Immunisation schedules","Paediatric assessment","Common childhood illnesses","Family-centred care"] },
  { name: "Community Health", icon: "🌍", sub: ["Epidemiology","Home health nursing","Public health practice","Cultural competence","Health promotion"] },
  { name: "Leadership & Management", icon: "📋", sub: ["Delegation principles","Conflict resolution","Quality improvement","Evidence-based practice","Staffing & scheduling"] },
];

export default function NursingSchoolPage() {
  const [active, setActive] = useState(-1);

  return (
    <main style={{ background: "#060f1e", color: "#e2e8f0", fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "100vh" }}>
      <section style={{ background: "linear-gradient(135deg, #060f1e 0%, #0d1f35 50%, #0e2540 100%)", padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: 999, padding: "6px 16px", marginBottom: 20 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0ea5e9", display: "inline-block" }} />
          <span style={{ color: "#38bdf8", fontSize: 13, fontWeight: 600, letterSpacing: "0.05em" }}>ALL SEMESTERS COVERED</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: "0 0 16px" }}>Nursing School Prep</h1>
        <p style={{ color: "#94a3b8", fontSize: "clamp(1rem, 2vw, 1.15rem)", maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.7 }}>
          From Fundamentals to Senior Practicum — master every subject, ace every exam, and build the clinical reasoning skills that will carry you through your entire nursing career.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/pricing" style={{ background: "#0ea5e9", color: "#fff", padding: "14px 28px", borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Start Free</Link>
          <Link href="/quiz" style={{ background: "transparent", color: "#38bdf8", padding: "14px 28px", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none", border: "1px solid rgba(56,189,248,0.3)" }}>Practice Questions</Link>
        </div>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
          {[["8","Core Subjects"],["2,000+","Practice Questions"],["NCLEX-Aligned","Content"],["All Semesters","Covered"]].map(([n,l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ color: "#38bdf8", fontSize: "1.6rem", fontWeight: 800, fontFamily: "'Cormorant Garamond', serif" }}>{n}</div>
              <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 0" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", marginBottom: 8 }}>Why study with Pre-NCLEX Nursing?</h2>
        <p style={{ color: "#94a3b8", lineHeight: 1.8, maxWidth: 700, marginBottom: 40 }}>
          Nursing school exams don't just test facts — they test clinical judgement. Our content is aligned to the NCLEX Client Needs Framework from day one, so every question you practise in school also prepares you for your licensing exam. You'll study smarter, not longer.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 48 }}>
          {[["NCLEX-Aligned","Every question maps to NCLEX Client Needs categories"],["Rationale-Rich","Detailed explanations teach the why, not just the what"],["Progress Tracking","See exactly which subjects need more attention"],["Study Plans","Week-by-week schedules built around your exam dates"]].map(([title, desc]) => (
            <div key={title} style={{ background: "#0d1f35", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 12, padding: "20px" }}>
              <div style={{ color: "#38bdf8", fontWeight: 700, marginBottom: 8, fontSize: 14 }}>{title}</div>
              <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", marginBottom: 8 }}>Core Subject Areas</h2>
        <p style={{ color: "#64748b", marginBottom: 24 }}>Click any subject to see what&apos;s covered.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
          {subjects.map((s, i) => (
            <div key={s.name} onClick={() => setActive(active === i ? -1 : i)}
              style={{ background: "#0d1f35", border: `1px solid ${active === i ? "#0ea5e9" : "rgba(14,165,233,0.12)"}`, borderRadius: 10, padding: "18px 20px", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: active === i ? 12 : 0 }}>
                <span style={{ fontSize: 18 }}>{s.icon}</span>
                <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 14 }}>{s.name}</span>
              </div>
              {active === i && <ul style={{ paddingLeft: 18, margin: 0 }}>{s.sub.map(x => <li key={x} style={{ color: "#94a3b8", fontSize: 13, marginBottom: 4 }}>{x}</li>)}</ul>}
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 80px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "#f1f5f9", marginBottom: 20 }}>Your Full Learning Path</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[["Pre-Nursing","/courses/pre-nursing"],["NCLEX-RN","/courses/nclex-rn"],["NCLEX-PN","/courses/nclex-pn"],["Nurse Practitioner","/courses/fnp"],["CCRN","/courses/ccrn"]].map(([name, href]) => (
            <Link key={name} href={href} style={{ background: "#0d1f35", color: "#94a3b8", border: "1px solid rgba(14,165,233,0.12)", borderRadius: 8, padding: "10px 18px", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>{name}</Link>
          ))}
        </div>
      </section>
    </main>
  );
}
'@

New-Item -ItemType Directory -Force -Path "app\courses\nursing-school" | Out-Null
[System.IO.File]::WriteAllText("app\courses\nursing-school\page.tsx", $nursingSchool, [System.Text.Encoding]::UTF8)
Write-Host "  [OK] Nursing School page" -ForegroundColor Green

# ─── FNP PAGE ────────────────────────────────────────────────
$fnp = @'
"use client";
import Link from "next/link";
import { useState } from "react";

const domains = [
  { name: "Health Promotion & Disease Prevention", pct: 19, sub: ["Preventive care guidelines","Immunisation schedules","Screening recommendations","Healthy lifestyle counselling","Chronic disease risk reduction"] },
  { name: "Assessment", pct: 20, sub: ["Complete health history","Physical examination","Diagnostic reasoning","Functional status","Comprehensive geriatric assessment"] },
  { name: "Diagnosis", pct: 17, sub: ["Differential diagnosis","Diagnostic testing","Evidence-based criteria","ICD coding fundamentals","Clinical decision-making"] },
  { name: "Clinical Management", pct: 24, sub: ["Pharmacotherapy principles","Treatment protocols","Chronic disease management","Acute care management","Co-morbidity management"] },
  { name: "Professionalism", pct: 10, sub: ["Scope of practice","Collaboration & referral","Patient education","Healthcare systems","Quality improvement"] },
  { name: "Research & Evidence", pct: 10, sub: ["Critically appraising evidence","Applying EBP to practice","Clinical guidelines","Research methodology","Outcome measurement"] },
];

export default function FNPPage() {
  const [active, setActive] = useState(-1);

  return (
    <main style={{ background: "#060f1e", color: "#e2e8f0", fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "100vh" }}>
      <section style={{ background: "linear-gradient(135deg, #060f1e 0%, #0d1f35 50%, #0e2540 100%)", padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: 999, padding: "6px 16px", marginBottom: 20 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0ea5e9", display: "inline-block" }} />
          <span style={{ color: "#38bdf8", fontSize: 13, fontWeight: 600, letterSpacing: "0.05em" }}>AANPCP &amp; ANCC ALIGNED</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: "0 0 16px" }}>Family Nurse Practitioner (FNP) Prep</h1>
        <p style={{ color: "#94a3b8", fontSize: "clamp(1rem, 2vw, 1.15rem)", maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.7 }}>
          Prepare for both the AANPCP FNP-BC and ANCC FNP-BC certification exams with comprehensive content, clinical reasoning practice, and expert-led review sessions.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/pricing" style={{ background: "#0ea5e9", color: "#fff", padding: "14px 28px", borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Start Free</Link>
          <Link href="/quiz" style={{ background: "transparent", color: "#38bdf8", padding: "14px 28px", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none", border: "1px solid rgba(56,189,248,0.3)" }}>Practice Questions</Link>
        </div>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
          {[["1,500+","Practice Questions"],["AANPCP","& ANCC Aligned"],["Case-Based","Scenarios"],["Expert","Instructors"]].map(([n,l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ color: "#38bdf8", fontSize: "1.6rem", fontWeight: 800, fontFamily: "'Cormorant Garamond', serif" }}>{n}</div>
              <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 0" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", marginBottom: 8 }}>Two Exams. One Preparation.</h2>
        <p style={{ color: "#94a3b8", lineHeight: 1.8, maxWidth: 700, marginBottom: 32 }}>
          The FNP certification is offered by two bodies — the AANPCP (American Academy of Nurse Practitioners Certification Program) and the ANCC (American Nurses Credentialing Center). Our content covers both blueprints so you can choose the pathway that suits you.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
          {[
            { name: "AANPCP FNP-BC", items: ["175 questions (150 scored)","3 hours","Eligibility: MSN/DNP + 500 clinical hours","Validity: 5 years, 100 CE hours to renew"] },
            { name: "ANCC FNP-BC", items: ["150 questions","3.5 hours","Eligibility: MSN/DNP + 500 clinical hours","Validity: 5 years, 75 CE hours to renew"] },
          ].map(card => (
            <div key={card.name} style={{ background: "#0d1f35", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 12, padding: "24px" }}>
              <h3 style={{ color: "#38bdf8", fontWeight: 700, marginBottom: 12 }}>{card.name}</h3>
              <ul style={{ paddingLeft: 18, margin: 0 }}>{card.items.map(i => <li key={i} style={{ color: "#94a3b8", fontSize: 13, marginBottom: 6 }}>{i}</li>)}</ul>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", marginBottom: 8 }}>Competency Domains</h2>
        <p style={{ color: "#64748b", marginBottom: 24 }}>Click any domain to see key topics covered.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
          {domains.map((d, i) => (
            <div key={d.name} onClick={() => setActive(active === i ? -1 : i)}
              style={{ background: "#0d1f35", border: `1px solid ${active === i ? "#0ea5e9" : "rgba(14,165,233,0.12)"}`, borderRadius: 10, padding: "18px 20px", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13, flex: 1, paddingRight: 12 }}>{d.name}</span>
                <span style={{ background: "rgba(14,165,233,0.15)", color: "#38bdf8", borderRadius: 999, padding: "2px 10px", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{d.pct}%</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, margin: "10px 0" }}>
                <div style={{ height: "100%", width: `${d.pct * 4}%`, background: "#0ea5e9", borderRadius: 2 }} />
              </div>
              {active === i && <ul style={{ paddingLeft: 18, margin: 0 }}>{d.sub.map(s => <li key={s} style={{ color: "#94a3b8", fontSize: 13, marginBottom: 4 }}>{s}</li>)}</ul>}
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 80px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "#f1f5f9", marginBottom: 20 }}>Explore Other Courses</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[["Pre-Nursing","/courses/pre-nursing"],["Nursing School","/courses/nursing-school"],["NCLEX-RN","/courses/nclex-rn"],["NCLEX-PN","/courses/nclex-pn"],["CCRN","/courses/ccrn"]].map(([name, href]) => (
            <Link key={name} href={href} style={{ background: "#0d1f35", color: "#94a3b8", border: "1px solid rgba(14,165,233,0.12)", borderRadius: 8, padding: "10px 18px", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>{name}</Link>
          ))}
        </div>
      </section>
    </main>
  );
}
'@

New-Item -ItemType Directory -Force -Path "app\courses\fnp" | Out-Null
[System.IO.File]::WriteAllText("app\courses\fnp\page.tsx", $fnp, [System.Text.Encoding]::UTF8)
Write-Host "  [OK] FNP page" -ForegroundColor Green

# ─── CCRN PAGE ───────────────────────────────────────────────
$ccrn = @'
"use client";
import Link from "next/link";
import { useState } from "react";

const domains = [
  { name: "Cardiovascular", pct: 17, sub: ["Acute coronary syndromes","Heart failure management","Dysrhythmia recognition","Haemodynamic monitoring","Cardiovascular surgical care"] },
  { name: "Pulmonary", pct: 15, sub: ["Mechanical ventilation","ARDS management","Respiratory failure","Chest drainage","Arterial blood gas interpretation"] },
  { name: "Endocrine / Haematology / GI / Renal / Integumentary", pct: 20, sub: ["DKA & HHS","AKI & CKD management","Liver failure","Coagulopathies","Burns & wound care"] },
  { name: "Musculoskeletal / Neurological / Psychosocial", pct: 14, sub: ["Traumatic brain injury","Status epilepticus","ICU-acquired weakness","Delirium management","Family-centred care"] },
  { name: "Multisystem", pct: 19, sub: ["Sepsis & septic shock","MODS","Trauma resuscitation","Toxicology","End-of-life care"] },
  { name: "Professional Caring & Ethics", pct: 15, sub: ["Advocacy & moral distress","Clinical inquiry","Systems thinking","Response to diversity","Collaboration"] },
];

export default function CCRNPage() {
  const [active, setActive] = useState(-1);

  return (
    <main style={{ background: "#060f1e", color: "#e2e8f0", fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "100vh" }}>
      <section style={{ background: "linear-gradient(135deg, #060f1e 0%, #0d1f35 50%, #0e2540 100%)", padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: 999, padding: "6px 16px", marginBottom: 20 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0ea5e9", display: "inline-block" }} />
          <span style={{ color: "#38bdf8", fontSize: 13, fontWeight: 600, letterSpacing: "0.05em" }}>AACN ACCREDITED · CE CREDITS</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: "0 0 16px" }}>CCRN® Critical Care Certification Prep</h1>
        <p style={{ color: "#94a3b8", fontSize: "clamp(1rem, 2vw, 1.15rem)", maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.7 }}>
          The definitive preparation for AACN's CCRN certification. Master the synergy model, critical care pharmacology, and complex multi-system patient management — and earn CE contact hours as you study.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/pricing" style={{ background: "#0ea5e9", color: "#fff", padding: "14px 28px", borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Start Free</Link>
          <Link href="/quiz" style={{ background: "transparent", color: "#38bdf8", padding: "14px 28px", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none", border: "1px solid rgba(56,189,248,0.3)" }}>Try Practice Questions</Link>
        </div>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
          {[["1,000+","Practice Questions"],["13+ hrs","Video Library"],["13.75","CE Contact Hours"],["AACN","Synergy Model"]].map(([n,l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ color: "#38bdf8", fontSize: "1.6rem", fontWeight: 800, fontFamily: "'Cormorant Garamond', serif" }}>{n}</div>
              <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 0" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", marginBottom: 8 }}>About the CCRN® Exam</h2>
        <p style={{ color: "#94a3b8", lineHeight: 1.8, maxWidth: 700, marginBottom: 32 }}>
          The CCRN (Critical Care Registered Nurse) certification by AACN validates expertise in the care of acutely and critically ill patients. It is one of the most respected specialty certifications in nursing. Eligibility requires 1,750 hours of direct care of acutely or critically ill patients within the last 2 years, with 875 of those hours in the most recent year preceding application.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 48 }}>
          {[["Questions","150 (125 scored + 25 unscored)"],["Time","3 hours"],["Eligibility","1,750 direct care hours"],["Renewal","Every 3 years (100 pts)"]].map(([k,v]) => (
            <div key={k} style={{ background: "#0d1f35", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 10, padding: "18px 20px" }}>
              <div style={{ color: "#475569", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{k}</div>
              <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13 }}>{v}</div>
            </div>
          ))}
        </div>

        {/* CE Credits callout */}
        <div style={{ background: "linear-gradient(135deg, #0d1f35, #0e2540)", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 14, padding: "32px", marginBottom: 48 }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "#f1f5f9", marginBottom: 10 }}>Earn CE Credits While You Study</h3>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>
            Our CCRN video library is AACN-accredited, meaning you earn 13.75 contact hours just by watching — certificates issued instantly upon completion and accepted in all states.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {["13.75 CE contact hours","AACN-accredited content","Instant certificate download","Accepted in all US states"].map(f => (
              <span key={f} style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)", color: "#94a3b8", borderRadius: 8, padding: "6px 14px", fontSize: 12 }}>✓ {f}</span>
            ))}
          </div>
        </div>

        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", marginBottom: 8 }}>Exam Content Areas</h2>
        <p style={{ color: "#64748b", marginBottom: 24 }}>Click any area to explore subtopics.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
          {domains.map((d, i) => (
            <div key={d.name} onClick={() => setActive(active === i ? -1 : i)}
              style={{ background: "#0d1f35", border: `1px solid ${active === i ? "#0ea5e9" : "rgba(14,165,233,0.12)"}`, borderRadius: 10, padding: "18px 20px", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13, flex: 1, paddingRight: 10 }}>{d.name}</span>
                <span style={{ background: "rgba(14,165,233,0.15)", color: "#38bdf8", borderRadius: 999, padding: "2px 10px", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{d.pct}%</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, margin: "10px 0" }}>
                <div style={{ height: "100%", width: `${d.pct * 5}%`, background: "#0ea5e9", borderRadius: 2 }} />
              </div>
              {active === i && <ul style={{ paddingLeft: 18, margin: 0 }}>{d.sub.map(s => <li key={s} style={{ color: "#94a3b8", fontSize: 13, marginBottom: 4 }}>{s}</li>)}</ul>}
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 80px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "#f1f5f9", marginBottom: 20 }}>Explore Other Courses</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[["Pre-Nursing","/courses/pre-nursing"],["Nursing School","/courses/nursing-school"],["NCLEX-RN","/courses/nclex-rn"],["NCLEX-PN","/courses/nclex-pn"],["Nurse Practitioner (FNP)","/courses/fnp"]].map(([name, href]) => (
            <Link key={name} href={href} style={{ background: "#0d1f35", color: "#94a3b8", border: "1px solid rgba(14,165,233,0.12)", borderRadius: 8, padding: "10px 18px", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>{name}</Link>
          ))}
        </div>
      </section>
    </main>
  );
}
'@

New-Item -ItemType Directory -Force -Path "app\courses\ccrn" | Out-Null
[System.IO.File]::WriteAllText("app\courses\ccrn\page.tsx", $ccrn, [System.Text.Encoding]::UTF8)
Write-Host "  [OK] CCRN page" -ForegroundColor Green

# ─── TYPESCRIPT CHECK ─────────────────────────────────────────
Write-Host ""
Write-Host "Running TypeScript check..." -ForegroundColor Yellow
npx tsc --noEmit 2>&1 | Select-Object -First 20

Write-Host ""
Write-Host "=== All 6 course pages created ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pages created:" -ForegroundColor White
Write-Host "  app/courses/pre-nursing/page.tsx   -> /courses/pre-nursing" -ForegroundColor Green
Write-Host "  app/courses/nursing-school/page.tsx -> /courses/nursing-school" -ForegroundColor Green
Write-Host "  app/courses/nclex-rn/page.tsx      -> /courses/nclex-rn" -ForegroundColor Green
Write-Host "  app/courses/nclex-pn/page.tsx      -> /courses/nclex-pn" -ForegroundColor Green
Write-Host "  app/courses/fnp/page.tsx           -> /courses/fnp" -ForegroundColor Green
Write-Host "  app/courses/ccrn/page.tsx          -> /courses/ccrn" -ForegroundColor Green
Write-Host ""
Write-Host "Next: git add . && git commit -m 'feat: add all 6 course landing pages' && git push" -ForegroundColor Cyan
