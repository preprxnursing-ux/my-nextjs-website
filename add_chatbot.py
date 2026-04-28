content = open("components/ChatbotWidget.tsx", "w", encoding="utf-8")
content.write(""""use client";
import { useState } from "react";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I am your NCLEX study assistant. Ask me anything about nursing concepts, pharmacology, or exam strategies." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user", content: userMsg }];
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
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 9999,
          width: 56, height: 56, borderRadius: "50%",
          background: "#0070f3", color: "white", border: "none",
          fontSize: 26, cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,112,243,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}
      >
        {open ? "x" : "💬"}
      </button>

      {open && (
        <div style={{
          position: "fixed", bottom: 90, right: 24, zIndex: 9998,
          width: 360, height: 500, borderRadius: 16,
          background: "#0f172a", border: "1px solid #1e293b",
          boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
          display: "flex", flexDirection: "column", overflow: "hidden"
        }}>
          <div style={{ background: "#0070f3", padding: "14px 18px", fontWeight: 700, fontSize: 16, color: "white" }}>
            NCLEX Study Assistant
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                background: m.role === "user" ? "#0070f3" : "#1e293b",
                color: "white", padding: "9px 13px", borderRadius: 12,
                maxWidth: "82%", fontSize: 14, whiteSpace: "pre-wrap"
              }}>
                {m.content}
              </div>
            ))}
            {loading && <div style={{ color: "#94a3b8", fontSize: 13, fontStyle: "italic" }}>Thinking...</div>}
          </div>
          <div style={{ display: "flex", padding: 10, gap: 8, borderTop: "1px solid #1e293b" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask an NCLEX question..."
              style={{
                flex: 1, padding: "9px 12px", borderRadius: 8,
                border: "1px solid #334155", background: "#1e293b",
                color: "white", fontSize: 14, outline: "none"
              }}
            />
            <button onClick={send} disabled={loading} style={{
              padding: "9px 16px", background: "#0070f3", color: "white",
              border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 14
            }}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
""")
content.close()
print("Done")
