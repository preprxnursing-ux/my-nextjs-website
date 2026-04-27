"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export default function NursingChatbot({ userId = "guest" }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = useCallback(async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || loading) return;
    setInput("");

    const userMsg = { role: "user", content: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const history = [...messages.slice(-9), userMsg].map(m => ({
        role: m.role, content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      const data = await res.json();
      const reply = data.reply ?? "Sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Something went wrong. Please try again.",
      }]);
    } finally {
      setLoading(false);
    }
  }, [input, messages, loading]);

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const STARTERS = [
    "Explain priority setting for NCLEX",
    "What is SATA and how to approach it?",
    "Key CNA skills I must know",
    "HESI exit exam strategies",
  ];

  return (
    <>
      <style>{`
        .plx-fab {
          position: fixed; bottom: 28px; right: 28px; z-index: 9999;
          width: 58px; height: 58px; border-radius: 50%; border: none;
          cursor: pointer; color: white;
          background: linear-gradient(135deg, #0B2D5E, #0F7EA0);
          box-shadow: 0 4px 18px rgba(11,45,94,0.4);
          font-size: 24px; display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s;
        }
        .plx-fab:hover { transform: scale(1.08); }
        .plx-panel {
          position: fixed; bottom: 100px; right: 28px; z-index: 9998;
          width: 370px; max-width: calc(100vw - 32px);
          height: 555px; max-height: calc(100vh - 120px);
          background: white; border-radius: 18px; display: flex; flex-direction: column;
          box-shadow: 0 8px 40px rgba(11,45,94,0.22); overflow: hidden;
          animation: plxIn 0.2s ease;
        }
        @keyframes plxIn { from { opacity:0; transform: scale(0.9); } to { opacity:1; transform: scale(1); } }
        .plx-header {
          background: linear-gradient(135deg, #0B2D5E, #0F7EA0);
          padding: 13px 15px; display: flex; align-items: center; gap: 10px; flex-shrink: 0;
        }
        .plx-header-title { font-size: 15px; font-weight: 600; color: white; }
        .plx-header-sub { font-size: 11px; color: rgba(255,255,255,0.7); }
        .plx-close {
          margin-left: auto; background: rgba(255,255,255,0.2); border: none;
          color: white; width: 28px; height: 28px; border-radius: 8px; cursor: pointer;
          font-size: 16px; display: flex; align-items: center; justify-content: center;
        }
        .plx-badges {
          background: #F0F4FA; border-bottom: 1px solid #D6D9E0;
          padding: 6px 12px; display: flex; gap: 5px; flex-wrap: wrap; flex-shrink: 0;
        }
        .plx-badge {
          font-size: 10px; font-weight: 500; color: #0B2D5E;
          background: #DDEEFF; border: 1px solid #B8D4F5;
          border-radius: 20px; padding: 2px 8px;
        }
        .plx-messages {
          flex: 1; overflow-y: auto; padding: 12px;
          background: #EEEFF2; display: flex; flex-direction: column; gap: 10px;
        }
        .plx-welcome { background: white; border-radius: 14px; padding: 16px; text-align: center; }
        .plx-welcome h3 { font-size: 15px; color: #0B2D5E; margin: 0 0 6px; }
        .plx-welcome p { font-size: 12px; color: #6B7280; margin: 0 0 12px; }
        .plx-starters { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
        .plx-starter {
          background: #F0F4FA; border: 1px solid #DDEEFF; border-radius: 9px;
          padding: 8px; font-size: 11.5px; color: #1A5FB4; cursor: pointer; text-align: left;
        }
        .plx-starter:hover { background: #DDEEFF; }
        .plx-row { display: flex; gap: 8px; align-items: flex-end; }
        .plx-row.user { flex-direction: row-reverse; }
        .plx-bubble {
          max-width: 78%; padding: 10px 13px; border-radius: 14px;
          font-size: 13.5px; line-height: 1.55; word-break: break-word; white-space: pre-line;
        }
        .plx-bubble.ai { background: white; color: #1C2B3A; border-bottom-left-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
        .plx-bubble.user { background: #DDEEFF; color: #1A5FB4; font-weight: 500; border-bottom-right-radius: 4px; }
        .plx-typing { display: flex; gap: 4px; align-items: center; padding: 12px 16px; }
        .plx-dot { width: 6px; height: 6px; border-radius: 50%; background: #9CA3AF; animation: plxBounce 1.2s ease-in-out infinite; }
        .plx-dot:nth-child(2) { animation-delay: 0.2s; }
        .plx-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes plxBounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
        .plx-input-area { padding: 10px 12px 12px; background: white; border-top: 1px solid #E5E7EB; flex-shrink: 0; }
        .plx-input-row {
          display: flex; align-items: flex-end; gap: 8px;
          background: #F4F5F8; border-radius: 12px; border: 1.5px solid #D6D9E0; padding: 8px 10px;
        }
        .plx-input-row:focus-within { border-color: #1A5FB4; }
        .plx-textarea {
          flex: 1; border: none; background: transparent; resize: none;
          font-size: 13.5px; color: #1C2B3A; outline: none; max-height: 100px; line-height: 1.5;
        }
        .plx-send {
          width: 33px; height: 33px; border-radius: 9px; border: none; cursor: pointer;
          background: linear-gradient(135deg, #0B2D5E, #0F7EA0); color: white;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          font-size: 14px; transition: opacity 0.15s;
        }
        .plx-send:disabled { opacity: 0.4; cursor: not-allowed; }
        .plx-note { font-size: 10px; color: #B0B5BE; text-align: center; margin-top: 6px; }
      `}</style>

      {/* FAB */}
      <button className="plx-fab" onClick={() => setOpen(o => !o)}>
        {open ? "✕" : "💬"}
      </button>

      {/* Panel */}
      {open && (
        <div className="plx-panel">
          {/* Header */}
          <div className="plx-header">
            <div>
              <div className="plx-header-title">🏥 Prenclex AI Tutor</div>
              <div className="plx-header-sub">CNA · HESI · NCLEX · TEAS · and more</div>
            </div>
            <button className="plx-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Badges */}
          <div className="plx-badges">
            {["CNA","HESI","NCLEX-RN","NCLEX-PN","TEAS 7","ATI","NP","CCRN"].map(b => (
              <span key={b} className="plx-badge">{b}</span>
            ))}
          </div>

          {/* Messages */}
          <div className="plx-messages">
            {messages.length === 0 && !loading ? (
              <div className="plx-welcome">
                <h3>👋 Hi, I'm your Nursing Tutor!</h3>
                <p>Ask me anything about CNA, HESI, NCLEX, TEAS and more.</p>
                <div className="plx-starters">
                  {STARTERS.map(s => (
                    <button key={s} className="plx-starter" onClick={() => sendMessage(s)}>{s}</button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m, i) => (
                <div key={i} className={`plx-row ${m.role === "user" ? "user" : ""}`}>
                  <div className={`plx-bubble ${m.role === "user" ? "user" : "ai"}`}>
                    {m.content}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="plx-row">
                <div className="plx-bubble ai plx-typing">
                  <span className="plx-dot"/><span className="plx-dot"/><span className="plx-dot"/>
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Input */}
          <div className="plx-input-area">
            <div className="plx-input-row">
              <textarea
                className="plx-textarea"
                placeholder="Ask about NCLEX, CNA, HESI, TEAS…"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                rows={1}
                disabled={loading}
              />
              <button
                className="plx-send"
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
              >
                ➤
              </button>
            </div>
            <div className="plx-note">AI answers are study aids — verify with official materials.</div>
          </div>
        </div>
      )}
    </>
  );
}