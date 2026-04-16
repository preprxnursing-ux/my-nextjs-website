"use client";
import { useState, useMemo } from "react";
const faqs = [
  { category: "General", question: "What is Pre-NCLEX Nursing?", answer: "Pre-NCLEX Nursing is an online exam preparation platform for nursing students worldwide. We offer study resources for NCLEX-RN, NCLEX-PN, CCRN, Nurse Practitioner certifications, TEAS 7, and HESI A2 exams." },
  { category: "General", question: "Who is this platform for?", answer: "Our platform is built for nursing students at all stages -- whether preparing for NCLEX-RN, brushing up for CCRN certification, or getting ready for TEAS 7 and HESI A2. We also support international nurses seeking US licensure." },
  { category: "General", question: "How is Pre-NCLEX Nursing different from other review platforms?", answer: "We combine adaptive question banks, real-time performance analytics, structured study plans, and expert-written rationales tailored to the latest NCLEX Next Generation format." },
  { category: "General", question: "Is the platform available globally?", answer: "Yes! Pre-NCLEX Nursing is fully online and accessible from anywhere -- US, Kenya, Philippines, Nigeria, UK, or anywhere with an internet connection." },
  { category: "NCLEX Exam", question: "What is the NCLEX-RN exam?", answer: "The NCLEX-RN is a standardized exam every nursing school graduate must pass to become a licensed registered nurse in the US and Canada. It tests clinical judgment and nursing knowledge." },
  { category: "NCLEX Exam", question: "What is Next Generation NCLEX (NGN)?", answer: "NGN is the updated format introduced in 2023. It uses new question types like case studies, drag-and-drop, matrix grids, and bow-tie questions to test real-world nursing decision-making." },
  { category: "NCLEX Exam", question: "How many questions are on the NCLEX-RN?", answer: "The NGN NCLEX-RN uses Computerized Adaptive Testing. You will answer between 85 and 150 questions. The exam stops when the system is statistically confident about your competency level." },
  { category: "NCLEX Exam", question: "What topics does the NCLEX-RN cover?", answer: "The NCLEX-RN covers: Safe and Effective Care Environment, Health Promotion and Maintenance, Psychosocial Integrity, and Physiological Integrity including Pharmacology." },
  { category: "NCLEX Exam", question: "How long should I study for the NCLEX?", answer: "Most students benefit from 4 to 8 weeks of focused preparation. We offer structured 4-week, 6-week, and 8-week study plans designed to ensure full coverage of all content areas." },
  { category: "NCLEX Exam", question: "What is the NCLEX-PN exam?", answer: "The NCLEX-PN is the licensure exam for Practical/Vocational Nurses (LPN/LVN). It focuses on care under supervision of RNs and physicians. We have a dedicated NCLEX-PN question bank." },
  { category: "Platform & Features", question: "What types of practice questions do you offer?", answer: "We offer all NGN question types: multiple choice, SATA, case studies, drag-and-drop, matrix/grid, bow-tie, trend questions, and highlight-in-table -- exactly what you will see on the real NCLEX." },
  { category: "Platform & Features", question: "Do you provide rationales for answers?", answer: "Yes -- every question includes a detailed rationale explaining why the correct answer is right and why distractors are wrong, written by experienced nurse educators." },
  { category: "Platform & Features", question: "How does the performance dashboard work?", answer: "Your dashboard tracks every quiz attempt and shows performance by content area, question type, and difficulty. You can see trends over time and get personalized study recommendations." },
  { category: "Platform & Features", question: "Can I review my past quiz attempts?", answer: "Yes. The History page lets you access every quiz you have taken, review answers, see what you got wrong, read rationales again, and track improvement over time." },
  { category: "Platform & Features", question: "Do you offer study plans?", answer: "Yes! We offer structured 4-week, 6-week, and 8-week NCLEX-RN study plans that break down exactly what to study each day for comprehensive coverage." },
  { category: "Pricing & Account", question: "Is there a free trial?", answer: "Yes -- we offer a free tier so you can explore before committing. Free access includes limited practice questions and basic tracking. Upgrade for unlimited questions and full analytics." },
  { category: "Pricing & Account", question: "What payment methods do you accept?", answer: "We accept all major credit and debit cards (Visa, Mastercard, Amex), as well as M-Pesa for students in Kenya and East Africa. All payments are processed securely." },
  { category: "Pricing & Account", question: "Can I cancel my subscription at any time?", answer: "Yes, cancel anytime from your account settings. You retain access to premium features until the end of your billing period. No cancellation fees." },
  { category: "Pricing & Account", question: "Do you offer group or institutional pricing?", answer: "Yes! We offer discounted pricing for nursing schools and study groups. Contact us at preprxnursing@gmail.com for details." },
  { category: "Technical", question: "What devices can I use to access the platform?", answer: "Pre-NCLEX Nursing is fully responsive and works on desktop, tablet, and mobile. We recommend desktop for case study questions but all features work on mobile." },
  { category: "Technical", question: "I am having trouble logging in. What should I do?", answer: "Try resetting your password using the Forgot Password link. If still stuck, contact us at preprxnursing@gmail.com with your registered email and we will resolve it within 24 hours." },
];
const categories = ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];
export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const filtered = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
      const matchesSearch = search === "" || faq.question.toLowerCase().includes(search.toLowerCase()) || faq.answer.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);
  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg, #060f1e 0%, #0d1f35 50%, #0e2540 100%)", fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#e2e8f0" }}>
      <section style={{ padding: "100px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse, rgba(14,165,233,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: "100px", padding: "6px 16px", marginBottom: "24px", fontSize: "13px", color: "#38bdf8", fontWeight: 500 }}>
          Frequently Asked Questions
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#f8fafc", margin: "0 0 16px", lineHeight: 1.2 }}>
          Got Questions? We Have Answers.
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#94a3b8", maxWidth: "560px", margin: "0 auto 40px", lineHeight: 1.7 }}>
          Everything you need to know about Pre-NCLEX Nursing, the NCLEX exam, and how to prepare with confidence.
        </p>
        <div style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}>
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "16px 20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "14px", color: "#f1f5f9", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
          />
        </div>
      </section>
      <section style={{ padding: "0 24px 40px", maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              style={{ padding: "8px 20px", borderRadius: "100px", border: activeCategory === cat ? "1px solid #0ea5e9" : "1px solid rgba(255,255,255,0.12)", background: activeCategory === cat ? "rgba(14,165,233,0.15)" : "rgba(255,255,255,0.04)", color: activeCategory === cat ? "#38bdf8" : "#94a3b8", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {cat}
            </button>
          ))}
        </div>
      </section>
      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px 80px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748b" }}>
            <p>No questions found for {search}. Try a different search term.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filtered.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} style={{ background: isOpen ? "rgba(14,165,233,0.06)" : "rgba(255,255,255,0.03)", border: isOpen ? "1px solid rgba(14,165,233,0.25)" : "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", overflow: "hidden" }}>
                  <button onClick={() => setOpenIndex(isOpen ? null : i)}
                    style={{ width: "100%", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", gap: "16px" }}>
                    <div>
                      <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 600, color: "#0ea5e9", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {faq.category}
                      </span>
                      <p style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "#f1f5f9", lineHeight: 1.4, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {faq.question}
                      </p>
                    </div>
                    <span style={{ flexShrink: 0, width: "28px", height: "28px", borderRadius: "50%", background: isOpen ? "rgba(14,165,233,0.2)" : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", color: isOpen ? "#38bdf8" : "#64748b", fontSize: "18px", transition: "all 0.25s", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: "18px 24px 22px", color: "#94a3b8", fontSize: "15px", lineHeight: 1.75, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <div style={{ marginTop: "60px", background: "linear-gradient(135deg, rgba(14,165,233,0.1), rgba(56,189,248,0.05))", border: "1px solid rgba(14,165,233,0.2)", borderRadius: "20px", padding: "40px", textAlign: "center" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 700, color: "#f8fafc", margin: "0 0 12px" }}>
            Still have questions?
          </h3>
          <p style={{ color: "#94a3b8", margin: "0 0 24px", fontSize: "15px" }}>
            Our student success team is here to help. We will get back to you within 24 hours.
          </p>
          <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #0ea5e9, #38bdf8)", color: "#fff", padding: "14px 32px", borderRadius: "10px", fontWeight: 600, fontSize: "15px", textDecoration: "none", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
