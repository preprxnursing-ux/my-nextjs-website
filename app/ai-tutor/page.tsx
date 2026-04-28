"use client";
import AnatomyVisualizer from "@/components/AnatomyVisualizer";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type Exam = { id: string; label: string; icon: string; color: string; desc: string; };

const EXAMS: Exam[] = [
  { id: "nclex-rn",   label: "NCLEX-RN",    icon: "ðŸ¥", color: "#0ea5e9", desc: "Registered Nurse licensure" },
  { id: "nclex-pn",   label: "NCLEX-PN",    icon: "ðŸ’‰", color: "#6366f1", desc: "Practical Nurse licensure" },
  { id: "teas",       label: "TEAS 7",      icon: "ðŸ“š", color: "#f59e0b", desc: "Nursing school entrance" },
  { id: "hesi",       label: "HESI A2",     icon: "ðŸ”¬", color: "#10b981", desc: "Health sciences entrance" },
  { id: "ccrn",       label: "CCRN",        icon: "â¤ï¸", color: "#ef4444", desc: "Critical care certification" },
  { id: "fnp",        label: "FNP / NP",   icon: "ðŸ©º", color: "#8b5cf6", desc: "Nurse Practitioner boards" },
  { id: "hesi-exit",  label: "HESI Exit",   icon: "ðŸŽ“", color: "#06b6d4", desc: "Nursing school exit exam" },
  { id: "ngn",        label: "NGN / Next Gen", icon: "âš¡", color: "#f97316", desc: "Next Generation NCLEX" },
];

const PROMPTS: Record<string, string> = {
  "nclex-rn":  "You are an expert NCLEX-RN study assistant. Focus on registered nurse licensure: adult health, mental health, maternal-newborn, pediatrics, pharmacology, management of care. Use ABC, Maslow, SATA strategies.",
  "nclex-pn":  "You are an expert NCLEX-PN study assistant. Focus on practical nurse content: basic care, coordinated care, pharmacology, physiological integrity at PN scope.",
  "teas":      "You are an expert TEAS 7 study assistant. Cover Reading, Math, Science (A&P, biology, chemistry), and English. Help students get into nursing school.",
  "hesi":      "You are an expert HESI A2 study assistant. Cover anatomy & physiology, biology, chemistry, math, reading, vocabulary and grammar.",
  "ccrn":      "You are an expert CCRN study assistant. Cover critical care: cardiovascular, pulmonary, neurology, renal, endocrine, ICU pharmacology.",
  "fnp":       "You are an expert FNP board exam study assistant. Cover primary care, advanced pharmacology, diagnosis and management across the lifespan.",
  "hesi-exit": "You are an expert HESI Exit exam study assistant. Cover med-surg, pharmacology, mental health, maternal-newborn, pediatrics at senior nursing level.",
  "ngn":       "You are an expert Next Generation NCLEX study assistant. Focus on NGN item types: extended multiple response, drag and drop, cloze, matrix. Emphasize NCSBN Clinical Judgment Model.",
};

const SUGGESTIONS: Record<string, string[]> = {
  "nclex-rn":  ["Give me a SATA question", "Priority nursing care", "Cardiac pharmacology", "ABG interpretation"],
  "nclex-pn":  ["PN scope of practice", "Basic care tips", "Coordinated care", "PN pharmacology"],
  "teas":      ["TEAS science review", "Math practice", "Reading tips", "Biology concepts"],
  "hesi":      ["A&P questions", "HESI vocabulary", "Chemistry basics", "Biology key concepts"],
  "ccrn":      ["Cardiac ICU questions", "Ventilator management", "Hemodynamic monitoring", "ICU meds"],
  "fnp":       ["Primary care case", "Advanced pharmacology", "Differential diagnosis", "Health promotion"],
  "hesi-exit": ["Med-surg questions", "Prioritization tips", "Pharmacology mnemonics", "Mental health nursing"],
  "ngn":       ["NGN case study", "Clinical judgment tips", "Matrix question", "Trend questions"],
};

export default function AITutorPage() {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [messages, setMessages] = useState<{role: string; content: string}[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat"|"anatomy">("chat");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const selectExam = (exam: Exam) => {
    setSelectedExam(exam);
    setMessages([{ role: "assistant", content: "Great choice! I am now your dedicated " + exam.label + " study assistant. ðŸŽ¯\n\nI will tailor all responses specifically for the " + exam.label + " exam.\n\nWhat would you like to study? You can:\nâ€¢ Ask me any " + exam.label + " topic\nâ€¢ Request a practice question\nâ€¢ Ask for study strategies\nâ€¢ Get help with weak areas" }]);
  };

  const send = async (text?: string) => {
    const msg = text || input;
    if (!msg.trim() || loading || !selectedExam) return;
    setInput("");
    const newMessages = [...messages, { role: "user", content: msg }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, systemPrompt: PROMPTS[selectedExam.id] })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Error connecting. Please try again." }]);
    }
    setLoading(false);
  };

  const suggestions = selectedExam ? (SUGGESTIONS[selectedExam.id] || []) : [];

  return (
    <main style={{ minHeight: "100vh", background: "#0f172a", display: "flex", flexDirection: "column" }}>
      <div style={{ textAlign: "center", padding: "24px 20px 20px", background: "linear-gradient(180deg,#0c1526 0%,#0f172a 100%)", borderBottom: "1px solid #1e293b" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 12 }}>
          <Image src="/logo.png" alt="Prenclex" width={44} height={44} style={{ borderRadius: 10, background: "white", padding: 3 }} />
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, color: "white", margin: 0 }}>AI Tutor</h1>
          {selectedExam && (
            <span style={{ background: selectedExam.color + "22", border: "1px solid " + selectedExam.color + "44", color: selectedExam.color, borderRadius: 20, padding: "4px 14px", fontSize: 13, fontWeight: 700 }}>
              {selectedExam.icon} {selectedExam.label}
            </span>
          )}
        </div>
        <p style={{ color: "#94a3b8", fontSize: "clamp(13px,2vw,16px)", maxWidth: 520, margin: "0 auto" }}>
          Your personal <strong style={{ color: "white" }}>Nursing Exams</strong> study assistant. Ask anything, anytime.
        </p>
      </div>

      {!selectedExam ? (
        <div style={{ flex: 1, maxWidth: 860, width: "100%", margin: "0 auto", padding: "36px 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <p style={{ color: "#64748b", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Step 1</p>
            <h2 style={{ color: "white", fontSize: "clamp(1.2rem,3vw,1.8rem)", fontWeight: 700, margin: "0 0 8px" }}>Which exam are you preparing for?</h2>
            <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>I will personalise all my responses to your specific exam</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 14 }}>
            {EXAMS.map(exam => (
              <button key={exam.id} onClick={() => selectExam(exam)} style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 16, padding: "20px 16px", cursor: "pointer", textAlign: "left", transition: "all 0.2s", fontFamily: "inherit", display: "flex", flexDirection: "column", gap: 8 }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = exam.color + "15"; el.style.borderColor = exam.color + "60"; el.style.transform = "translateY(-3px)"; el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)"; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = "#1e293b"; el.style.borderColor = "#334155"; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 28 }}>{exam.icon}</span>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: exam.color, boxShadow: "0 0 8px " + exam.color }} />
                </div>
                <div>
                  <p style={{ color: "white", fontWeight: 700, fontSize: 15, margin: "0 0 3px" }}>{exam.label}</p>
                  <p style={{ color: "#64748b", fontSize: 12, margin: 0 }}>{exam.desc}</p>
                </div>
                <div style={{ marginTop: 4, background: exam.color + "20", border: "1px solid " + exam.color + "30", borderRadius: 8, padding: "5px 10px" }}>
                  <span style={{ color: exam.color, fontSize: 11, fontWeight: 700 }}>Start studying â†’</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "center", padding: "12px 20px 0", gap: 8, flexWrap: "wrap" }}>
            <button onClick={() => { setSelectedExam(null); setMessages([]); }} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #334155", color: "#64748b", borderRadius: 20, padding: "5px 14px", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>â† Switch exam</button>
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => send(s)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", borderRadius: 20, padding: "5px 14px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = selectedExam.color + "20"; e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#94a3b8"; }}>
                {s}
              </button>
            ))}
          </div>
          <div style={{ flex: 1, maxWidth: 900, width: "100%", margin: "0 auto", padding: "20px 20px 140px", display: "flex", flexDirection: "column", gap: 16 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", gap: 12, flexDirection: m.role === "user" ? "row-reverse" : "row", alignItems: "flex-start" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: m.role === "user" ? "#0070f3" : selectedExam.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white" }}>
                  {m.role === "user" ? "U" : selectedExam.icon}
                </div>
                <div style={{ background: m.role === "user" ? "#0070f3" : "#1e293b", color: "white", padding: "12px 16px", borderRadius: 14, maxWidth: "78%", fontSize: 15, whiteSpace: "pre-wrap", lineHeight: 1.6, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: selectedExam.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "white", flexShrink: 0 }}>{selectedExam.icon}</div>
                <div style={{ background: "#1e293b", padding: "12px 16px", borderRadius: 14, color: "#64748b", fontStyle: "italic", fontSize: 14 }}>Thinking...</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, background: "rgba(15,23,42,0.97)", backdropFilter: "blur(12px)", borderTop: "1px solid #1e293b", padding: "14px 20px", paddingBottom: "calc(14px + env(safe-area-inset-bottom))" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 10 }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()} placeholder={"Ask your " + selectedExam.label + " question..."} style={{ flex: 1, padding: "13px 18px", borderRadius: 12, border: "1px solid #334155", background: "#1e293b", color: "white", fontSize: 15, outline: "none", fontFamily: "inherit" }} />
              <button onClick={() => send()} disabled={loading} style={{ padding: "13px 28px", background: selectedExam.color, color: "white", border: "none", borderRadius: 12, cursor: loading ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 15, opacity: loading ? 0.7 : 1, fontFamily: "inherit" }}>Send</button>
            </div>
            <p style={{ textAlign: "center", color: "#334155", fontSize: 11, margin: "6px 0 0" }}>Powered by Prenclex AI Â· {selectedExam.label} mode Â· For study purposes only</p>
          </div>
        </>
      )}
    </main>
  );
}

