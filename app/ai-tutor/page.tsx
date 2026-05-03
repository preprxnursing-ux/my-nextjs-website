"use client";
import { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import katex from "katex";
import "katex/dist/katex.min.css";

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

const GREETINGS: Record<string, string> = {
  "nclex-rn":  "Hey! Ready to tackle NCLEX-RN together. What would you like to work on?",
  "nclex-pn":  "Hi there! Let's work on your NCLEX-PN prep. What's on your mind?",
  "teas":      "Hello! Let's get you into nursing school. What part of the TEAS would you like help with?",
  "hesi":      "Hi! Happy to help with your HESI A2. Which section are you working on?",
  "ccrn":      "Welcome! Let's sharpen those critical care skills. What do you want to dig into?",
  "fnp":       "Hey! Let's work on your FNP boards. What topic are you focusing on today?",
  "hesi-exit": "Hi! Let's get you ready for the HESI Exit. What would you like to review?",
  "ngn":       "Hello! NGN is all about clinical thinking. Where would you like to start?",
};

const PROMPTS: Record<string, string> = {
  "nclex-rn": `You are James, a warm and expert NCLEX-RN tutor at Pre-NCLEX Nursing.

CONVERSATION RULES — follow these strictly:
- Be learner-led. Only answer exactly what the student asks. Do not volunteer extra information.
- Keep every response under 5 sentences unless the student asks for more detail.
- After answering, ask ONE simple follow-up question like "Want me to go deeper on that?" or "Shall I give you a practice question on this?"
- Never lecture unprompted. Wait for the student to ask.
- If the student gets something wrong, gently say "Not quite — want to know why?" before explaining.
- Use plain conversational language. No walls of text.

WHEN ASKED FOR CONTENT, use these frameworks:
- Priority: ABC first, then Maslow, then safety
- Delegation: RN keeps unstable/complex; delegates stable/routine to LPN or UAP
- SATA: treat each option independently as true or false
- ABG: ROME method — Respiratory Opposite, Metabolic Equal
- Pharmacology: always mention what to hold the drug for and the antidote if one exists
- Infection control: airborne=N95+negative pressure; droplet=surgical mask; contact=gloves+gown

Wrap key clinical terms in **double asterisks** for bold. For any formula, use LaTeX notation: inline with $formula$ or display with $$formula$$. Example: Dosage = $$\\frac{Desired}{Have} \\times Volume$$`,

  "nclex-pn": `You are James, a warm and expert NCLEX-PN tutor at Pre-NCLEX Nursing.

CONVERSATION RULES — follow these strictly:
- Be learner-led. Only answer exactly what the student asks.
- Keep every response under 5 sentences unless asked for more.
- After answering, ask ONE simple follow-up like "Want a practice question on this?" or "Shall I explain the reasoning?"
- Never lecture unprompted.
- Use plain conversational language.

WHEN ASKED FOR CONTENT:
- Always clarify PN scope: LPN cannot independently assess, create care plans, or do initial teaching
- LPN CAN: reinforce teaching, give meds, wound care, monitor stable patients
- Priority order: unstable before stable, acute before chronic, actual before potential
- Hold meds when: **HR < 60** (digoxin, beta blockers), **BP < 90/60** (antihypertensives), **RR < 12** (opioids)
- Shock: early = restlessness + tachycardia; late = hypotension + altered LOC

Wrap key terms in **double asterisks** for bold. Use LaTeX for any formula: inline $formula$ or display $$formula$$.`,

  "teas": `You are James, a friendly TEAS 7 tutor at Pre-NCLEX Nursing.

CONVERSATION RULES — follow these strictly:
- Be learner-led. Answer only what the student asks.
- Keep responses short — under 5 sentences unless asked for more.
- After answering, ask ONE follow-up: "Want to try a practice question?" or "Should I break that down further?"
- Never dump all the content at once. Let the student guide the depth.

WHEN ASKED FOR CONTENT:
- Math: dosage = **Desired ÷ Have × Volume**; metric mnemonic = **King Henry Doesn't Usually Drink Cold Milk**
- Reading: main idea = broadest statement the whole passage supports; inference = must be true, not might be true
- Science: focus on A&P — body systems, cell structure, genetics
- English: subject-verb agreement, commonly confused words, sentence structure

Wrap key terms in **double asterisks** for bold. Always use LaTeX for formulas: inline $formula$ or display $$formula$$. Example: $$\\frac{Desired}{Have} \\times Volume$$`,

  "hesi": `You are James, a helpful HESI A2 tutor at Pre-NCLEX Nursing.

CONVERSATION RULES — follow these strictly:
- Be learner-led. Answer only what the student asks.
- Start by asking which HESI subtests their school requires.
- Keep responses short — under 5 sentences unless asked for more.
- After each answer, offer: "Want to try a practice question?" or "Should I go deeper?"

WHEN ASKED FOR CONTENT:
- Dosage: **Desired ÷ Have × Volume**
- Medical prefixes: **tachy**=fast, **brady**=slow, **hyper**=above, **hypo**=below
- Suffixes: **-itis**=inflammation, **-ectomy**=removal, **-ology**=study of
- Military time: add 1200 for PM; subtract 1200 for AM from times over 1200
- Roman numerals: **I=1, V=5, X=10, L=50, C=100**

Wrap key terms in **double asterisks** for bold. Use LaTeX for any formula: inline $formula$ or display $$formula$$.`,

  "ccrn": `You are James, an expert CCRN tutor at Pre-NCLEX Nursing. You treat candidates as ICU colleagues.

CONVERSATION RULES — follow these strictly:
- Be learner-led. Answer only what the student asks.
- Keep responses concise — under 5 sentences unless asked for depth.
- After answering, offer: "Want a clinical scenario on this?" or "Shall I go deeper?"
- Use ICU terminology naturally.

WHEN ASKED FOR CONTENT:
- Hemodynamics: **CVP 2-6**, **PCWP 8-12**, **CO 4-8 L/min**, **SVR 800-1200**
- Vasopressors: **norepinephrine** = first-line septic shock; **vasopressin** = adjunct
- Ventilator: **TV 6-8 mL/kg IBW** for ARDS; PEEP improves oxygenation; rate clears CO2
- ICP: **HOB 30°**, avoid hip flexion, maintain **CPP > 60 mmHg**
- ECG: **VF** = defibrillate; **VT with pulse** = synchronized cardioversion; **Torsades** = magnesium

Wrap key values and terms in **double asterisks** so they render bold.`,

  "fnp": `You are James, an expert FNP board exam tutor at Pre-NCLEX Nursing.

CONVERSATION RULES — follow these strictly:
- Be learner-led. Answer only what the student asks.
- Keep responses short — under 5 sentences unless asked for more.
- After answering, offer: "Want a clinical case on this?" or "Shall I go deeper?"
- Use case-based teaching when the student asks for application.

WHEN ASKED FOR CONTENT:
- HTN: first-line = **thiazides, ACE inhibitors, ARBs, or CCBs**; target **< 130/80**
- DM Type 2: first-line = **metformin**; add **GLP-1** if CVD risk; **SGLT-2** for HF or CKD
- Screening: cervical cancer **Pap q3yr ages 21-65**; colorectal **colonoscopy q10yr from age 45**
- ACE inhibitors: contraindicated in pregnancy; dry cough = switch to **ARB**
- Metformin: hold **48hr** before/after contrast; contraindicated if **GFR < 30**

Wrap key terms in **double asterisks** for bold. Use LaTeX for any formula: inline $formula$ or display $$formula$$.`,

  "hesi-exit": `You are James, an expert HESI Exit Exam tutor at Pre-NCLEX Nursing.

CONVERSATION RULES — follow these strictly:
- Be learner-led. Answer only what the student asks.
- Keep responses short — under 5 sentences unless asked for more.
- After answering, ask: "Want a practice question on this?" or "Shall I explain the reasoning?"
- Treat every question like NCLEX difficulty.

WHEN ASKED FOR CONTENT:
- Post-op order: **airway → breathing → circulation → neuro → wound → pain** — never pain first
- Chest tube: never clamp unless ordered; bubbling in water seal = **air leak**
- Anticoagulant antidotes: **heparin = protamine sulfate**; **warfarin = Vitamin K**; **dabigatran = idarucizumab**
- High-alert meds: **insulin, heparin, concentrated electrolytes** — two-nurse verification required
- Delegation: RN keeps assessment, teaching, unstable patients, IV push meds

Wrap key terms in **double asterisks** for bold. Use LaTeX for any formula: inline $formula$ or display $$formula$$.`,

  "ngn": `You are James, an expert NGN tutor at Pre-NCLEX Nursing.

CONVERSATION RULES — follow these strictly:
- Be learner-led. Answer only what the student asks.
- Keep responses short — under 5 sentences unless asked for more.
- After answering, offer: "Want to try a practice NGN item?" or "Shall I walk through the clinical reasoning?"
- Make the thinking process visible but only when asked.

THE 6-STEP MODEL — use only when student asks:
1. **Recognize Cues** — what matters in the data?
2. **Analyze Cues** — what does it mean clinically?
3. **Prioritize Hypotheses** — what is most urgent?
4. **Generate Solutions** — what interventions apply?
5. **Take Actions** — what do you do first?
6. **Evaluate Outcomes** — is the patient improving?

NGN ITEM TYPES — explain only when asked:
- **Extended Multiple Response** — select all that apply, all-or-nothing
- **Matrix/Grid** — indicate or contraindicate, row by row
- **Cloze** — fill in blanks, read all options first
- **Highlight** — only clinically significant findings
- **Trend** — direction of change matters most
- **Unfolding Case** — same patient across 6 questions

Wrap key terms in **double asterisks** for bold. Use LaTeX for any formula: inline $formula$ or display $$formula$$.`,
};

const SUGGESTIONS: Record<string, string[]> = {
  "nclex-rn":  ["Priority nursing questions", "Delegation rules", "Pharmacology pearls", "Infection control"],
  "nclex-pn":  ["LPN scope of practice", "Pharmacology", "Pressure injury staging", "Signs of shock"],
  "teas":      ["Body systems review", "Dosage calculations", "Reading strategies", "DNA and genetics"],
  "hesi":      ["Cardiovascular system", "Medical prefixes", "Acids and bases", "Grammar tips"],
  "ccrn":      ["Hemodynamic values", "Ventilator management", "Vasopressors", "AACN Synergy Model"],
  "fnp":       ["Hypertension", "Screening guidelines", "Differential diagnosis", "Pharmacology"],
  "hesi-exit": ["Post-op priorities", "High-alert medications", "Delegation", "Blood transfusion"],
  "ngn":       ["The 6-step NCJMM", "Matrix questions", "Unfolding case study", "Trend questions"],
};

function renderMath(tex: string, display: boolean): string {
  try {
    return katex.renderToString(tex, { throwOnError: false, displayMode: display });
  } catch {
    return tex;
  }
}

function renderMessage(content: string) {
  // Split on display math $$...$$ and inline math $...$
  const blocks = content.split(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g);

  const processedBlocks = blocks.map((block, bi) => {
    if (block.startsWith("$$") && block.endsWith("$$")) {
      const tex = block.slice(2, -2).trim();
      return (
        <div key={bi} style={{ overflowX: "auto", margin: "12px 0", padding: "8px 0" }}
          dangerouslySetInnerHTML={{ __html: renderMath(tex, true) }} />
      );
    }
    if (block.startsWith("$") && block.endsWith("$") && block.length > 2) {
      const tex = block.slice(1, -1).trim();
      return <span key={bi} dangerouslySetInnerHTML={{ __html: renderMath(tex, false) }} />;
    }

    // Regular text — split by lines
    const lines = block.split("\n");
    return lines.map((line, i) => {
      if (!line.trim()) return <br key={bi + "-" + i} />;

      const renderInline = (text: string) => {
        const parts = text.split(/(\*\*.+?\*\*)/g);
        return parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={j} style={{ color: "#0369a1", fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
          }
          return <span key={j}>{part}</span>;
        });
      };

      const clean = line.replace(/^#{1,3}\s+/, "").trim();

      if (line.trim().match(/^\d+\./)) {
        const num = line.match(/^\d+/)?.[0];
        const rest = clean.replace(/^\d+\.\s*/, "");
        return (
          <div key={bi + "-" + i} style={{ marginBottom: 6, display: "flex", gap: 8 }}>
            <span style={{ color: "#0ea5e9", fontWeight: 700, flexShrink: 0 }}>{num}.</span>
            <span>{renderInline(rest)}</span>
          </div>
        );
      }
      if (line.trim().startsWith("-") || line.trim().startsWith("•")) {
        const rest = clean.replace(/^[-•]\s*/, "");
        return (
          <div key={bi + "-" + i} style={{ marginBottom: 6, display: "flex", gap: 8 }}>
            <span style={{ color: "#0ea5e9", flexShrink: 0 }}>•</span>
            <span>{renderInline(rest)}</span>
          </div>
        );
      }
      return <div key={bi + "-" + i} style={{ marginBottom: 6 }}>{renderInline(clean)}</div>;
    });
  });

  return <>{processedBlocks}</>;
}

export default function AITutorPage() {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [pendingSuggestion, setPendingSuggestion] = useState<string | null>(null);
  const [showContinueModal, setShowContinueModal] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<{ name: string; content: string; type: string } | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const imageTypes = ["jpg", "jpeg", "png", "gif", "webp", "bmp"];

    if (imageTypes.includes(ext)) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageBase64(reader.result as string);
        setImagePreview(reader.result as string);
        setAttachedFile(null);
      };
      reader.readAsDataURL(file);
    } else if (["pdf", "docx", "pptx", "txt"].includes(ext)) {
      setAttachedFile({ name: file.name, content: "Extracting content...", type: ext });
      setImageBase64(null);
      setImagePreview(null);
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch("/api/extract", { method: "POST", body: formData });
        const data = await res.json();
        if (data.scanned) {
          setAttachedFile({ name: file.name, content: "This appears to be a scanned PDF. Please copy and paste the text you want James to analyse.", type: ext });
        } else {
          if (data.scanned) {
          setAttachedFile({ name: file.name, content: "This PDF appears to be scanned. Please copy and paste the text you want James to read.", type: ext });
        } else {
          setAttachedFile({ name: file.name, content: data.text || "Could not extract content.", type: ext });
        }
        }
      } catch {
        setAttachedFile({ name: file.name, content: "Extraction failed. Please try again.", type: ext });
      }
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

    async function sendMessage(userContent: string, baseMessages: { role: string; content: string }[]) {
    if (!selectedExam || loading) return;
    const fileContext = attachedFile && attachedFile.content && attachedFile.content !== "Extracting content..."
      ? "\n\n--- ATTACHED FILE: " + attachedFile.name + " ---\n" + attachedFile.content + "\n--- END OF FILE ---"
      : attachedFile && attachedFile.content === "Extracting content..."
      ? "\n\n[Note: A file named " + attachedFile.name + " was attached but is still being processed. Please ask the student to try again.]"
      : "";
    const fullText = userContent + fileContext;
    const userMsg: any = imageBase64
      ? { role: "user", content: [{ type: "text", text: fullText }, { type: "image_url", image_url: { url: imageBase64 } }] }
      : { role: "user", content: fullText };
    const displayMsg = { role: "user", content: userContent + (imageBase64 ? " 📷 [image]" : "") + (attachedFile ? ` 📎 [${attachedFile.name}]` : "") };
    const newMsgs = [...baseMessages, displayMsg];
    const apiMsgs = [...baseMessages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setImageBase64(null);
    setImagePreview(null);
    setAttachedFile(null);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: PROMPTS[selectedExam.id] },
            ...apiMsgs.map((m: any) => ({ role: m.role, content: m.content }))
          ]
        }),
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

  async function send() {
    if ((!input.trim() && !imageBase64 && !attachedFile) || !selectedExam || loading) return;
    const text = input.trim() || (attachedFile ? "Please analyse this file." : "");
    await sendMessage(text, messages);
  }

  function handleSuggestionClick(suggestion: string) {
    if (messages.length > 1) {
      // Already in a conversation — ask continue or new
      setPendingSuggestion(suggestion);
      setShowContinueModal(true);
    } else {
      // Fresh chat — send directly
      sendMessage(suggestion, messages);
    }
  }

  async function handleContinueChoice(choice: "new" | "continue") {
    setShowContinueModal(false);
    if (!pendingSuggestion || !selectedExam) return;
    if (choice === "new") {
      const greeting = [{ role: "assistant", content: GREETINGS[selectedExam.id] }];
      setMessages(greeting);
      setSessionId(null);
      await sendMessage(pendingSuggestion, greeting);
    } else {
      await sendMessage(pendingSuggestion, messages);
    }
    setPendingSuggestion(null);
  }

  function startNewChat(exam: Exam) {
    setSelectedExam(exam);
    setSessionId(null);
    setMessages([{ role: "assistant", content: GREETINGS[exam.id] }]);
  }

  function loadSession(session: any) {
    const exam = EXAMS.find(e => e.id === session.exam_id) || {
      id: session.exam_id,
      label: session.exam_label,
      icon: session.exam_label.slice(0, 2).toUpperCase(),
      color: "#0ea5e9",
      desc: ""
    };
    setSelectedExam(exam);
    setMessages(session.messages);
    setSessionId(session.id);
    setShowHistory(false);
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0f172a", color: "white", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", display: "flex" }}>

      {/* CONTINUE/NEW MODAL */}
      {showContinueModal && selectedExam && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 16, padding: "32px 28px", maxWidth: 360, width: "90%", textAlign: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: selectedExam.color + "22", border: "1px solid " + selectedExam.color + "44", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: selectedExam.color, margin: "0 auto 16px" }}>{selectedExam.icon}</div>
            <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>You are already in a session</h3>
            <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
              Would you like to continue this conversation or start a fresh one on <strong style={{ color: "#e2e8f0" }}>{pendingSuggestion}</strong>?
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => handleContinueChoice("continue")}
                style={{ flex: 1, padding: "12px", borderRadius: 10, background: "transparent", border: "1px solid #334155", color: "#94a3b8", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
                Continue here
              </button>
              <button onClick={() => handleContinueChoice("new")}
                style={{ flex: 1, padding: "12px", borderRadius: 10, background: selectedExam.color, border: "none", color: "white", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                Start new chat
              </button>
            </div>
            <button onClick={() => { setShowContinueModal(false); setPendingSuggestion(null); }}
              style={{ marginTop: 12, background: "none", border: "none", color: "#475569", fontSize: 13, cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* HISTORY SIDEBAR */}
      {userId && (
        <div style={{ width: showHistory ? 280 : 0, flexShrink: 0, overflow: "hidden", transition: "width .25s", background: "#0a1120", borderRight: "1px solid #1e293b", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px", borderBottom: "1px solid #1e293b", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>Chat History</span>
            <button onClick={() => setShowHistory(false)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 20, lineHeight: 1 }}>x</button>
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

        {/* EXAM SELECTION */}
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
                  History
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
            <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 20px 160px", width: "100%" }}>

              {/* HEADER */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <button onClick={() => { setSelectedExam(null); setMessages([]); }}
                  style={{ background: "#1e293b", border: "none", color: "#94a3b8", cursor: "pointer", borderRadius: 8, padding: "6px 12px", fontSize: 13 }}>
                  Back
                </button>
                {userId && (
                  <button onClick={() => setShowHistory(!showHistory)}
                    style={{ background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", borderRadius: 8, padding: "6px 12px", fontSize: 13, cursor: "pointer" }}>
                    History
                  </button>
                )}
                <div style={{ width: 36, height: 36, borderRadius: 10, background: selectedExam.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11, color: selectedExam.color }}>{selectedExam.icon}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>{selectedExam.label} AI Tutor</div>
                  <div style={{ color: "#94a3b8", fontSize: 13 }}>James · {selectedExam.desc}</div>
                </div>
              </div>

              {/* SUGGESTION CHIPS */}
              <div style={{ marginBottom: 20 }}>
                <p style={{ color: "#475569", fontSize: 12, marginBottom: 10 }}>Quick topics:</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {(SUGGESTIONS[selectedExam.id] ?? []).map((s) => (
                    <button key={s} onClick={() => handleSuggestionClick(s)}
                      style={{ background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", borderRadius: 20, padding: "7px 16px", fontSize: 13, cursor: "pointer", transition: "border-color .15s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.borderColor = selectedExam.color}
                      onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.borderColor = "#334155"}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* MESSAGES */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, flexDirection: m.role === "user" ? "row-reverse" : "row", alignItems: "flex-start" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: m.role === "user" ? "#0ea5e9" : selectedExam.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "white" }}>
                      {m.role === "user" ? "You" : selectedExam.icon}
                    </div>
                    <div style={{
                      background: m.role === "user" ? "#0ea5e9" : "#ffffff",
                      color: m.role === "user" ? "white" : "#0f172a",
                      padding: "14px 18px",
                      borderRadius: 14,
                      maxWidth: "78%",
                      fontSize: 15,
                      lineHeight: 1.8,
                      boxShadow: m.role === "assistant" ? "0 1px 8px rgba(0,0,0,0.12)" : "none"
                    }}>
                      {m.role === "assistant" ? renderMessage(m.content) : m.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: selectedExam.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "white", flexShrink: 0 }}>{selectedExam.icon}</div>
                    <div style={{ background: "#ffffff", padding: "14px 18px", borderRadius: 14, color: "#94a3b8", fontStyle: "italic", fontSize: 14, boxShadow: "0 1px 8px rgba(0,0,0,0.12)" }}>
                      James is thinking...
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </div>

            {/* INPUT BAR */}
            <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, background: "rgba(15,23,42,0.97)", backdropFilter: "blur(12px)", borderTop: "1px solid #1e293b", padding: "14px 20px" }}>
              {(imagePreview || attachedFile) && (
                <div style={{ maxWidth: 900, margin: "0 auto 8px", display: "flex", alignItems: "center", gap: 10, background: "#1e293b", border: "1px solid #334155", borderRadius: 10, padding: "8px 12px", width: "fit-content" }}>
                  {imagePreview && <a href={imagePreview} target="_blank" rel="noopener noreferrer"><img src={imagePreview} alt="preview" style={{ height: 56, borderRadius: 6, objectFit: "cover", cursor: "pointer" }} /></a>}
                  {attachedFile && <span style={{ fontSize: 24 }}>{attachedFile.type === "pdf" ? "📄" : attachedFile.type === "docx" ? "📝" : attachedFile.type === "pptx" ? "📊" : "📎"}</span>}
                  <div>
                    <div style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>{attachedFile?.name ?? "Image"}</div>
                    <div style={{ color: "#64748b", fontSize: 11 }}>Ready to send with your message</div>
                  </div>
                  <button onClick={() => { setImageBase64(null); setImagePreview(null); setAttachedFile(null); }} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 18, marginLeft: 4 }}>x</button>
                </div>
              )}
              <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 10 }}>
                <input ref={fileInputRef} type="file" accept="image/*,.pdf,.docx,.pptx,.txt" onChange={handleFileUpload} style={{ display: "none" }} />
                <button onClick={() => fileInputRef.current?.click()}
                  title="Attach image, PDF, Word doc, or PowerPoint"
                  style={{ padding: "13px 14px", background: "#1e293b", border: "1px solid " + (imageBase64 || attachedFile ? "#0ea5e9" : "#334155"), borderRadius: 12, cursor: "pointer", fontSize: 18, color: imageBase64 || attachedFile ? "#0ea5e9" : "#64748b", flexShrink: 0 }}>
                  +
                </button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                  placeholder={"Ask James anything about " + selectedExam.label + "..."}
                  style={{ flex: 1, padding: "13px 18px", borderRadius: 12, border: "1px solid #334155", background: "#1e293b", color: "white", fontSize: 15, outline: "none", fontFamily: "inherit" }}
                />
                <button onClick={send} disabled={loading}
                  style={{ padding: "13px 28px", background: selectedExam.color, color: "white", border: "none", borderRadius: 12, cursor: loading ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 15, opacity: loading ? 0.7 : 1 }}>
                  Send
                </button>
              </div>
              <p style={{ textAlign: "center", color: "#334155", fontSize: 11, margin: "6px 0 0" }}>
                Pre-NCLEX Nursing AI · {selectedExam.label} · For study purposes only
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
