const fs = require('fs');

const newPage = `"use client";
import { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

type Exam = { id: string; label: string; icon: string; color: string; desc: string; };

const EXAMS: Exam[] = [
  { id: "nclex-rn",  label: "NCLEX-RN",       icon: "RN", color: "#0ea5e9", desc: "Registered Nurse licensure" },
  { id: "nclex-pn",  label: "NCLEX-PN",       icon: "PN", color: "#6366f1", desc: "Practical Nurse licensure" },
  { id: "teas",      label: "TEAS 7",         icon: "T7", color: "#f59e0b", desc: "Nursing school entrance" },
  { id: "hesi",      label: "HESI A2",        icon: "H2", color: "#10b981", desc: "Health sciences entrance" },
  { id: "ccrn",      label: "CCRN",           icon: "CC", color: "#ef4444", desc: "Critical care certification" },
  { id: "fnp",       label: "FNP / NP",       icon: "NP", color: "#8b5cf6", desc: "Nurse Practitioner boards" },
  { id: "hesi-exit", label: "HESI Exit",      icon: "HE", color: "#06b6d4", desc: "Nursing school exit exam" },
  { id: "ngn",       label: "NGN / Next Gen", icon: "NG", color: "#f97316", desc: "Next Generation NCLEX" },
];

const PROMPTS: Record<string, string> = {
  "nclex-rn":  "You are an expert NCLEX-RN study assistant. Focus on registered nurse licensure: adult health, mental health, maternal-newborn, pediatrics, pharmacology, management of care. Use ABC, Maslow, SATA strategies.",
  "nclex-pn":  "You are an expert NCLEX-PN study assistant. Focus on practical nurse content: basic care, coordinated care, pharmacology, physiological integrity at PN scope.",
  "teas":      "You are an expert TEAS 7 study assistant. Cover Reading, Math, Science and English. Help students get into nursing school.",
  "hesi":      "You are an expert HESI A2 study assistant. Cover anatomy and physiology, biology, chemistry, math, reading, vocabulary and grammar.",
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
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUserId(data.user.id);
    });
  }, []);

  useEffect(() => {
    if (userId) loadHistory();
  }, [userId]);

  async function loadHistory() {
    const { data } = await supabase
      .from("chat_history")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(20);
    if (data) setHistory(data);
  }

  async function saveChat(msgs: { role: string; content: string }[], exam: Exam, sid: string | null) {
    if (!userId) return;
    if (sid) {
      await supabase.from("chat_history").update({
        messages: msgs,
        updated_at: new Date().toISOString(),
      }).eq("id", sid);
    } else {
      const { data } = await supabase.from("chat_history").insert({
        user_id: userId,
        exam_id: exam.id,
        exam_label: exam.label,
        messages: msgs,
      }).select().single();
      if (data) setSessionId(data.id);
    }
  }

  async function send() {
    if (!input.trim() || !selectedExam || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "system", content: PROMPTS[selectedExam.id] }, ...newMsgs.map((m) => ({ role: m.role, content: m.content }))] }),
      });
      const data = await res.json();
      const reply = data.reply ?? "Sorry, I could not generate a response.";
      const finalMsgs = [...newMsgs, { role: "assistant", content: reply }];
      setMessages(finalMsgs);
      await saveChat(finalMsgs, selectedExam, sessionId);
      await loadHistory();
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection error. Please try again." }]);
    }
    setLoading(false);
  }

  function startNewChat(exam: Exam) {
    setSelectedExam(exam);
    setMessages([]);
    setSessionId(null);
  }

  function loadSession(session: any) {
    const exam = EXAMS.find(e => e.id === session.exam_id) || { id: session.exam_id, label: session.exam_label, icon: session.exam_label.slice(0,2).toUpperCase(), color: "#0ea5e9", desc: "" };
    setSelectedExam(exam);
    setMessages(session.messages);
    setSessionId(session.id);
    setShowHistory(false);
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0f172a", color: "white", fontFamily: "system-ui, sans-serif", display: "flex" }}>
      {/* SIDEBAR - history */}
      {userId && (
        <div style={{ width: showHistory ? 280 : 0, flexShrink: 0, overflow: "hidden", transition: "width .25s", background: "#0a1120", borderRight: "1px solid #1e293b", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px", borderBottom: "1px solid #1e293b", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>Chat History</span>
            <button onClick={() => setShowHistory(false)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 18 }}>×</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
            {history.length === 0 && <p style={{ color: "#64748b", fontSize: 13, padding: "12px" }}>No saved chats yet.</p>}
            {history.map((h) => (
              <div key={h.id} onClick={() => loadSession(h)}
                style={{ padding: "10px 12px", borderRadius: 8, cursor: "pointer", marginBottom: 4, background: sessionId === h.id ? "#1e293b" : "transparent", border: "1px solid " + (sessionId === h.id ? "#334155" : "transparent") }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "#1e293b"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = sessionId === h.id ? "#1e293b" : "transparent"}>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#e2e8f0" }}>{h.exam_label}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{h.messages?.length ?? 0} messages · {new Date(h.updated_at).toLocaleDateString()}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {h.messages?.[0]?.content?.slice(0, 50) ?? ""}...
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: "12px" }}>
            <button onClick={() => { setSelectedExam(null); setMessages([]); setSessionId(null); setShowHistory(false); }}
              style={{ width: "100%", padding: "10px", borderRadius: 8, background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", border: "none", color: "white", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>
              + New Chat
            </button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {!selectedExam ? (
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
              <div style={{ textAlign: "center", flex: 1 }}>
                <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Which exam are you preparing for?</h1>
                <p style={{ color: "#94a3b8", fontSize: 15 }}>I will personalise all my responses to your specific exam</p>
              </div>
              {userId && (
                <button onClick={() => setShowHistory(!showHistory)}
                  style={{ background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", borderRadius: 8, padding: "8px 14px", fontSize: 13, cursor: "pointer", flexShrink: 0 }}>
                  📋 History
                </button>
              )}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {EXAMS.map((exam) => (
                <div key={exam.id} onClick={() => startNewChat(exam)}
                  style={{ background: "#1e293b", borderRadius: 16, padding: 24, cursor: "pointer", border: "1px solid #334155", transition: "all .2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = exam.color; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#334155"; }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: exam.color + "22", border: "1px solid " + exam.color + "44", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: exam.color, marginBottom: 12 }}>{exam.icon}</div>
                  <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{exam.label}</div>
                  <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 16 }}>{exam.desc}</div>
                  <div style={{ background: exam.color, color: "white", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700, textAlign: "center" }}>Start studying</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 20px 140px", width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <button onClick={() => setSelectedExam(null)} style={{ background: "#1e293b", border: "none", color: "#94a3b8", cursor: "pointer", borderRadius: 8, padding: "6px 12px", fontSize: 13 }}>← Back</button>
                {userId && <button onClick={() => setShowHistory(!showHistory)} style={{ background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", borderRadius: 8, padding: "6px 12px", fontSize: 13, cursor: "pointer" }}>📋 History</button>}
                <div style={{ width: 36, height: 36, borderRadius: 10, background: selectedExam.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11, color: selectedExam.color }}>{selectedExam.icon}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>{selectedExam.label} AI Tutor</div>
                  <div style={{ color: "#94a3b8", fontSize: 13 }}>{selectedExam.desc}</div>
                </div>
              </div>
              {messages.length === 0 && (
                <div style={{ marginBottom: 24 }}>
                  <p style={{ color: "#64748b", fontSize: 13, marginBottom: 12 }}>Quick starters:</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {(SUGGESTIONS[selectedExam.id] ?? []).map((s) => (
                      <button key={s} onClick={() => setInput(s)} style={{ background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", borderRadius: 20, padding: "6px 14px", fontSize: 13, cursor: "pointer" }}>{s}</button>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, flexDirection: m.role === "user" ? "row-reverse" : "row", alignItems: "flex-start" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: m.role === "user" ? "#0070f3" : selectedExam.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "white" }}>
                      {m.role === "user" ? "U" : selectedExam.icon}
                    </div>
                    <div style={{ background: m.role === "user" ? "#0070f3" : "#1e293b", color: "white", padding: "12px 16px", borderRadius: 14, maxWidth: "78%", fontSize: 15, whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: selectedExam.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "white", flexShrink: 0 }}>{selectedExam.icon}</div>
                    <div style={{ background: "#1e293b", padding: "12px 16px", borderRadius: 14, color: "#64748b", fontStyle: "italic", fontSize: 14 }}>Thinking...</div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </div>
            <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, background: "rgba(15,23,42,0.97)", backdropFilter: "blur(12px)", borderTop: "1px solid #1e293b", padding: "14px 20px" }}>
              <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 10 }}>
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()} placeholder={"Ask your " + selectedExam.label + " question..."} style={{ flex: 1, padding: "13px 18px", borderRadius: 12, border: "1px solid #334155", background: "#1e293b", color: "white", fontSize: 15, outline: "none", fontFamily: "inherit" }} />
                <button onClick={send} disabled={loading} style={{ padding: "13px 28px", background: selectedExam.color, color: "white", border: "none", borderRadius: 12, cursor: loading ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 15, opacity: loading ? 0.7 : 1 }}>Send</button>
              </div>
              <p style={{ textAlign: "center", color: "#334155", fontSize: 11, margin: "6px 0 0" }}>Powered by Prenclex AI · {selectedExam.label} mode · For study purposes only</p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
`;

fs.writeFileSync('app/ai-tutor/page.tsx', newPage, 'utf8');
console.log('Done!');