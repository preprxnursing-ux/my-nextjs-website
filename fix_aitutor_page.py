content = '''"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function AITutorPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I am your NCLEX AI Tutor.\n\nI can help you with:\n• Nursing concepts & pharmacology\n• NCLEX exam strategies\n• Practice questions on any topic\n• Clinical rationales & explanations\n\nWhat would you like to study today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const suggestions = [
    "Explain fluid & electrolytes",
    "Generate a pharmacology question",
    "NCLEX priority strategies",
    "Cardiac meds practice question",
    "Explain ABG interpretation",
    "What are SATA question tips?",
  ];

  const send = async (text) => {
    const msg = text || input;
    if (!msg.trim() || loading) return;
    setInput("");
    const newMessages = [...messages, { role: "user", content: msg }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Error connecting. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <main style={{ minHeight: "100vh", background: "#0f172a", display: "flex", flexDirection: "column" }}>
      {/* HERO */}
      <div style={{ textAlign: "center", padding: "48px 20px 32px", background: "linear-gradient(180deg, #0f172a 0%, #0f1f3d 100%)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 16 }}>
          <Image src="/logo.png" alt="Prenclex" width={48} height={48} style={{ borderRadius: 12, background: "white", padding: 3 }} />
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "white", margin: 0 }}>AI Tutor</h1>
        </div>
        <p style={{ color: "#94a3b8", fontSize: "clamp(14px, 2vw, 18px)", maxWidth: 560, margin: "0 auto 24px" }}>
          Your personal NCLEX study assistant. Ask anything about nursing concepts, pharmacology, or exam strategies.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => send(s)} style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
              color: "#94a3b8", borderRadius: 20, padding: "7px 16px",
              fontSize: 13, cursor: "pointer", transition: "all 0.2s",
              fontFamily: "inherit"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,112,243,0.2)"; e.currentTarget.style.color = "#60a5fa"; e.currentTarget.style.borderColor = "rgba(0,112,243,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* CHAT AREA */}
      <div style={{ flex: 1, maxWidth: 900, width: "100%", margin: "0 auto", padding: "0 20px 120px", display: "flex", flexDirection: "column", gap: 16 }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            display: "flex", gap: 12,
            flexDirection: m.role === "user" ? "row-reverse" : "row",
            alignItems: "flex-start"
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
              background: m.role === "user" ? "#0070f3" : "linear-gradient(135deg,#0070f3,#0ea5e9)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 700, color: "white"
            }}>
              {m.role === "user" ? "U" : "AI"}
            </div>
            <div style={{
              background: m.role === "user" ? "#0070f3" : "#1e293b",
              color: "white", padding: "12px 16px", borderRadius: 14,
              maxWidth: "78%", fontSize: 15, whiteSpace: "pre-wrap", lineHeight: 1.6,
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
            }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#0070f3,#0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "white", flexShrink: 0 }}>AI</div>
            <div style={{ background: "#1e293b", padding: "12px 16px", borderRadius: 14, color: "#94a3b8", fontStyle: "italic", fontSize: 14 }}>Thinking...</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* FIXED INPUT BAR */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(15,23,42,0.95)", backdropFilter: "blur(12px)",
        borderTop: "1px solid #1e293b", padding: "16px 20px"
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 10 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
            placeholder="Ask an NCLEX question..."
            style={{
              flex: 1, padding: "14px 18px", borderRadius: 12,
              border: "1px solid #334155", background: "#1e293b",
              color: "white", fontSize: 15, outline: "none", fontFamily: "inherit"
            }}
          />
          <button onClick={() => send()} disabled={loading} style={{
            padding: "14px 28px", background: "#0070f3", color: "white",
            border: "none", borderRadius: 12, cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 700, fontSize: 15, opacity: loading ? 0.7 : 1,
            fontFamily: "inherit", whiteSpace: "nowrap"
          }}>
            Send
          </button>
        </div>
        <p style={{ textAlign: "center", color: "#475569", fontSize: 11, margin: "8px 0 0" }}>
          Powered by Prenclex AI · For study purposes only
        </p>
      </div>
    </main>
  );
}
'''
with open("app/ai-tutor/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Done")
