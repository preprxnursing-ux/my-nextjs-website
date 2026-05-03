"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type Message = { role: string; content: string };

function renderMessage(content: string) {
  const lines = content.split("\n");
  return lines.map((line, i) => {
    if (!line.trim()) return <br key={i} />;
    const renderInline = (text: string) => {
      const parts = text.split(/(\*\*.+?\*\*)/g);
      return parts.map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={j} style={{ color: "#0ea5e9", fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
        }
        return <span key={j}>{part}</span>;
      });
    };
    const clean = line.replace(/^#{1,3}\s+/, "").trim();
    if (line.trim().match(/^\d+\./)) {
      return <div key={i} style={{ marginBottom: 4, display: "flex", gap: 6 }}><span style={{ color: "#0ea5e9", fontWeight: 700, flexShrink: 0 }}>{line.match(/^\d+/)?.[0]}.</span><span>{renderInline(clean.replace(/^\d+\.\s*/, ""))}</span></div>;
    }
    if (line.trim().startsWith("-") || line.trim().startsWith("•")) {
      return <div key={i} style={{ marginBottom: 4, display: "flex", gap: 6 }}><span style={{ color: "#0ea5e9", flexShrink: 0 }}>•</span><span>{renderInline(clean.replace(/^[-•]\s*/, ""))}</span></div>;
    }
    return <div key={i} style={{ marginBottom: 4 }}>{renderInline(clean)}</div>;
  });
}

const SYSTEM_PROMPT = `You are AI Tutor, a warm nursing exam tutor at Pre-NCLEX Nursing. Help with NCLEX-RN, NCLEX-PN, TEAS 7, HESI A2, CCRN, and FNP. Be concise — max 4 sentences. Answer only what is asked. Wrap key terms in **asterisks**. After answering ask ONE follow-up question. If given an image analyze it for nursing content. If given a file read and respond to it.`;

export default function ChatbotWidget({ autoOpen = false }: { autoOpen?: boolean }) {
  const [open, setOpen] = useState(autoOpen);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I am AI Tutor, your nursing exam tutor. What would you like to work on today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState({ width: 370, height: 520 });
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<{ name: string; content: string; type: string } | null>(null);
  const isResizing = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 370, height: 520 });
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

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
      setSize({ width: Math.max(300, Math.min(700, startSize.current.width + dx)), height: Math.max(400, Math.min(800, startSize.current.height + dy)) });
    };
    const onMouseUp = () => { isResizing.current = false; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => { window.removeEventListener("mousemove", onMouseMove); window.removeEventListener("mouseup", onMouseUp); };
  }, []);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (["jpg","jpeg","png","gif","webp","bmp"].includes(ext)) {
      const reader = new FileReader();
      reader.onload = () => { setImageBase64(reader.result as string); setImagePreview(reader.result as string); setAttachedFile(null); };
      reader.readAsDataURL(file);
    } else if (["pdf","docx","pptx","txt"].includes(ext)) {
      setAttachedFile({ name: file.name, content: "Extracting...", type: ext });
      setImageBase64(null); setImagePreview(null);
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch("/api/extract", { method: "POST", body: formData });
        const data = await res.json();
        setAttachedFile({ name: file.name, content: data.scanned ? "Scanned PDF — please paste the text you want analysed." : (data.text || "Could not extract."), type: ext });
      } catch { setAttachedFile({ name: file.name, content: "Extraction failed.", type: ext }); }
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const send = async (text?: string) => {
    const msg = text || input;
    if ((!msg.trim() && !imageBase64 && !attachedFile) || loading) return;
    const userText = msg.trim() || (attachedFile ? "Please analyse this file." : "Please analyse this image.");
    const fileContext = attachedFile && attachedFile.content && attachedFile.content !== "Extracting..."
      ? "\n\n--- FILE: " + attachedFile.name + " ---\n" + attachedFile.content + "\n--- END ---" : "";
    const userMsg: any = imageBase64
      ? { role: "user", content: [{ type: "text", text: userText + fileContext }, { type: "image_url", image_url: { url: imageBase64 } }] }
      : { role: "user", content: userText + fileContext };
    const displayMsg: Message = { role: "user", content: userText + (imageBase64 ? " [image]" : "") + (attachedFile ? " [" + attachedFile.name + "]" : "") };
    const newMessages = [...messages, displayMsg];
    const apiMessages = [...messages, userMsg];
    setMessages(newMessages); setInput(""); setImageBase64(null); setImagePreview(null); setAttachedFile(null); setLoading(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "system", content: SYSTEM_PROMPT }, ...apiMessages.map((m: any) => ({ role: m.role, content: m.content }))] }) });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch { setMessages(prev => [...prev, { role: "assistant", content: "Error connecting. Please try again." }]); }
    setLoading(false);
  };

  return (
    <>
      <button onClick={() => setOpen(!open)} title="AI Tutor" style={{ position: "fixed", bottom: 80, right: 16, zIndex: 9990, width: 56, height: 56, borderRadius: "50%", background: "#0ea5e9", color: "white", border: "none", fontSize: 14, cursor: "pointer", boxShadow: "0 4px 20px rgba(14,165,233,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>
        {open ? "x" : "AI"}
      </button>
      {open && (
        <div style={{ position: "fixed", bottom: 145, right: 16, zIndex: 9989, width: size.width, height: size.height, borderRadius: 16, background: "#0f172a", border: "1px solid #1e293b", boxShadow: "0 8px 40px rgba(0,0,0,0.6)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div onMouseDown={onMouseDown} style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, cursor: "nw-resize", zIndex: 10 }} />
          <div onMouseDown={onMouseDown} style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 6, cursor: "nw-resize", zIndex: 10 }} />
          <div style={{ background: "linear-gradient(135deg, #0369a1, #0ea5e9)", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <Image src="/logo.png" alt="Prenclex" width={36} height={36} style={{ borderRadius: 8, background: "white", padding: 2 }} />
            <div>
              <div style={{ color: "white", fontWeight: 700, fontSize: 15 }}>AI Tutor — Nursing AI Tutor</div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>Powered by Pre-NCLEX Nursing</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ marginLeft: "auto", background: "none", border: "none", color: "white", fontSize: 18, cursor: "pointer" }}>x</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%" }}>
                <div style={{ background: m.role === "user" ? "#0ea5e9" : "#ffffff", color: m.role === "user" ? "white" : "#0f172a", padding: "10px 14px", borderRadius: 12, fontSize: 13, lineHeight: 1.6, boxShadow: m.role === "assistant" ? "0 1px 6px rgba(0,0,0,0.15)" : "none" }}>
                  {m.role === "assistant" ? renderMessage(m.content) : m.content}
                </div>
              </div>
            ))}
            {loading && <div style={{ alignSelf: "flex-start", background: "#ffffff", padding: "10px 14px", borderRadius: 12, color: "#94a3b8", fontSize: 13, fontStyle: "italic", boxShadow: "0 1px 6px rgba(0,0,0,0.15)" }}>AI Tutor is thinking...</div>}
            <div ref={bottomRef} />
          </div>
          {messages.length === 1 && (
            <div style={{ padding: "0 12px 8px", display: "flex", flexWrap: "wrap", gap: 6, flexShrink: 0 }}>
              {["NCLEX priorities", "Pharmacology", "Fluid & electrolytes", "Cardiac question"].map((s, i) => (
                <button key={i} onClick={() => send(s)} style={{ background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", borderRadius: 20, padding: "5px 12px", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{s}</button>
              ))}
            </div>
          )}
          {(imagePreview || attachedFile) && (
            <div style={{ margin: "0 10px 6px", display: "flex", alignItems: "center", gap: 8, background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: "6px 10px" }}>
              {imagePreview && <a href={imagePreview} target="_blank" rel="noopener noreferrer"><img src={imagePreview} alt="preview" style={{ height: 40, borderRadius: 4, objectFit: "cover", cursor: "pointer" }} /></a>}
              {attachedFile && <span style={{ fontSize: 14, color: "#94a3b8" }}>{attachedFile.type.toUpperCase()}</span>}
              <span style={{ color: "#94a3b8", fontSize: 12, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{attachedFile?.name ?? "Image ready"}</span>
              <button onClick={() => { setImageBase64(null); setImagePreview(null); setAttachedFile(null); }} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 16 }}>x</button>
            </div>
          )}
          <div style={{ display: "flex", padding: 10, gap: 8, borderTop: "1px solid #1e293b", flexShrink: 0, alignItems: "center" }}>
            <input ref={fileInputRef} type="file" accept="image/*,.pdf,.docx,.pptx,.txt" onChange={handleFileUpload} style={{ display: "none" }} />
            <button onClick={() => fileInputRef.current?.click()} title="Attach file" style={{ padding: "8px 10px", background: "#1e293b", border: "1px solid " + (imageBase64 || attachedFile ? "#0ea5e9" : "#334155"), borderRadius: 8, cursor: "pointer", color: imageBase64 || attachedFile ? "#0ea5e9" : "#64748b", flexShrink: 0, fontWeight: 700, fontSize: 16 }}>+</button>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask AI Tutor anything..." style={{ flex: 1, padding: "9px 12px", borderRadius: 8, border: "1px solid #334155", background: "#1e293b", color: "white", fontSize: 13, outline: "none", fontFamily: "inherit" }} />
            <button onClick={() => send()} disabled={loading} style={{ padding: "9px 14px", background: "#0ea5e9", color: "white", border: "none", borderRadius: 8, cursor: loading ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 13, opacity: loading ? 0.7 : 1, fontFamily: "inherit" }}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
