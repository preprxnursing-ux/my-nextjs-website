"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function ChatbotWidget({ autoOpen = false }: { autoOpen?: boolean }) {
  const [open, setOpen] = useState(autoOpen);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I am your Nursing Exams AI Tutor. Visit prenclex.com/ai-tutor for a personalised experience. Or ask me anything: NCLEX, TEAS, HESI, CCRN, pharmacology, practice questions." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState({ width: 370, height: 520 });
  const isResizing = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 370, height: 520 });
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const onMouseDown = (e: React.MouseEvent) => {
    isResizing.current = true;
    startPos.current = { x: e.clientX, y: e.clientY };
    startSize.current = { ...size };
    e.preventDefault();
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      const dx = startPos.current.x - e.clientX;
      const dy = startPos.current.y - e.clientY;
      setSize({
        width: Math.max(300, Math.min(700, startSize.current.width + dx)),
        height: Math.max(400, Math.min(800, startSize.current.height + dy))
      });
    };
    const onMouseUp = () => { isResizing.current = false; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const send = async (text?: string) => {
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

  const suggestions = ["Explain fluid & electrolytes", "Give me a pharmacology question", "NCLEX priority strategies", "Generate a cardiac practice question"];

  return (
    <>
      <button onClick={() => setOpen(!open)} title="AI Tutor" style={{ position: "fixed", bottom: 80, right: 16, zIndex: 9990, width: 56, height: 56, borderRadius: "50%", background: "#0070f3", color: "white", border: "none", fontSize: 26, cursor: "pointer", boxShadow: "0 4px 20px rgba(0,112,243,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {open ? "x" : "💬"}
      </button>
      {open && (
        <div style={{ position: "fixed", bottom: 145, right: 16, zIndex: 9989, width: size.width, height: size.height, borderRadius: 16, background: "#0f172a", border: "1px solid #1e293b", boxShadow: "0 8px 40px rgba(0,0,0,0.6)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div onMouseDown={onMouseDown} style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, cursor: "nw-resize", zIndex: 10, background: "linear-gradient(to bottom, rgba(0,112,243,0.4), transparent)", borderRadius: "16px 16px 0 0" }} />
          <div onMouseDown={onMouseDown} style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 6, cursor: "nw-resize", zIndex: 10, background: "linear-gradient(to right, rgba(0,112,243,0.4), transparent)" }} />
          <div style={{ background: "linear-gradient(135deg, #0070f3, #0ea5e9)", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <Image src="/logo.png" alt="Prenclex" width={36} height={36} style={{ borderRadius: 8, background: "white", padding: 2 }} />
            <div>
              <div style={{ color: "white", fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>Nursing Exams AI Tutor</div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>Powered by Prenclex</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ marginLeft: "auto", background: "none", border: "none", color: "white", fontSize: 18, cursor: "pointer", opacity: 0.8 }}>x</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", background: m.role === "user" ? "#0070f3" : "#1e293b", color: "white", padding: "9px 13px", borderRadius: 12, maxWidth: "82%", fontSize: 14, whiteSpace: "pre-wrap", lineHeight: 1.5 }}>
                {m.content}
              </div>
            ))}
            {loading && <div style={{ alignSelf: "flex-start", color: "#94a3b8", fontSize: 13, fontStyle: "italic" }}>Thinking...</div>}
            <div ref={bottomRef} />
          </div>
          {messages.length === 1 && (
            <div style={{ padding: "0 14px 10px", display: "flex", flexWrap: "wrap", gap: 6, flexShrink: 0 }}>
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => send(s)} style={{ background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", borderRadius: 20, padding: "5px 12px", fontSize: 12, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}>{s}</button>
              ))}
            </div>
          )}
          <div style={{ display: "flex", padding: 10, gap: 8, borderTop: "1px solid #1e293b", flexShrink: 0 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask a nursing exam question..." style={{ flex: 1, padding: "9px 12px", borderRadius: 8, border: "1px solid #334155", background: "#1e293b", color: "white", fontSize: 14, outline: "none" }} />
            <button onClick={() => send()} disabled={loading} style={{ padding: "9px 16px", background: "#0070f3", color: "white", border: "none", borderRadius: 8, cursor: loading ? "not-allowed" : "pointer", fontWeight: 600, fontSize: 14, opacity: loading ? 0.7 : 1, fontFamily: "inherit" }}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
