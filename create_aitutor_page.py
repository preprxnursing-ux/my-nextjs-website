content = '''"use client";
import ChatbotWidget from "@/components/ChatbotWidget";

export default function AITutorPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0f172a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: "white", marginBottom: 12 }}>AI Tutor</h1>
        <p style={{ color: "#94a3b8", fontSize: 18, maxWidth: 500, margin: "0 auto" }}>
          Your personal NCLEX study assistant. Ask anything about nursing concepts, pharmacology, or exam strategies.
        </p>
      </div>
      <ChatbotWidget autoOpen={true} />
    </main>
  );
}
'''
with open("app/ai-tutor/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Done")
