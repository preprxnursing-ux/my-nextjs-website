'use client';
import { useState, useRef, useEffect } from 'react';

export default function NursingChatbot({ userId }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your NCLEX study assistant. Ask me anything about nursing concepts, pharmacology, or exam strategies." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, userId })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error connecting. Please try again.' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', fontFamily: 'sans-serif', border: '1px solid #ddd', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '80vh' }}>
      <div style={{ background: '#0070f3', color: 'white', padding: '16px 20px', fontWeight: 700, fontSize: 18 }}>
        NCLEX Study Assistant
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 20, background: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', background: m.role === 'user' ? '#0070f3' : 'white', color: m.role === 'user' ? 'white' : '#333', padding: '10px 14px', borderRadius: 12, maxWidth: '75%', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', whiteSpace: 'pre-wrap' }}>
            {m.content}
          </div>
        ))}
        {loading && <div style={{ alignSelf: 'flex-start', color: '#999', fontStyle: 'italic' }}>Thinking...</div>}
        <div ref={bottomRef} />
      </div>
      <div style={{ display: 'flex', padding: 12, gap: 8, borderTop: '1px solid #ddd', background: 'white' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask an NCLEX question..."
          style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid #ddd', fontSize: 15, outline: 'none' }}
        />
        <button onClick={send} disabled={loading} style={{ padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
          Send
        </button>
      </div>
    </div>
  );
}
