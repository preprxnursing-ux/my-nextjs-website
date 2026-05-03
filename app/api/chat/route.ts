import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages || [];

    const hasImage = messages.some((m: any) =>
      Array.isArray(m.content) && m.content.some((c: any) => c.type === "image_url")
    );

    const hasPdf = messages.some((m: any) =>
      Array.isArray(m.content) && m.content.some((c: any) => c.type === "pdf")
    );

    if (hasImage || hasPdf) {
      const reply = await callGemini(messages);
      return NextResponse.json({ reply });
    } else {
      const reply = await callGroq(messages);
      return NextResponse.json({ reply });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ reply: "Server error. Please try again." });
  }
}

async function callGroq(messages: any[]) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + process.env.GROQ_API_KEY
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      messages: messages.map((m: any) => ({ role: m.role, content: m.content }))
    })
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "No response.";
}

async function callGemini(messages: any[]) {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) throw new Error("No Gemini API key");

    const systemMsg = messages.find((m: any) => m.role === "system");
    const systemText = systemMsg?.content ?? "";
    const contents: any[] = [];

    for (const m of messages) {
      if (m.role === "system") continue;
      if (m.role === "assistant" && contents.length === 0) continue; // Gemini must start with user

      if (Array.isArray(m.content)) {
        const parts: any[] = [];
        for (const c of m.content) {
          if (c.type === "text") {
            parts.push({ text: c.text });
          } else if (c.type === "image_url") {
            const imageUrl = c.image_url?.url ?? "";
            if (imageUrl.startsWith("data:")) {
              const [meta, base64] = imageUrl.split(",");
              const mimeType = meta.split(":")[1].split(";")[0];
              parts.push({ inline_data: { mime_type: mimeType, data: base64 } });
            }
          } else if (c.type === "pdf") {
            // Send PDF as inline document to Gemini
            parts.push({
              inline_data: {
                mime_type: "application/pdf",
                data: c.data
              }
            });
          }
        }
        contents.push({ role: m.role === "assistant" ? "model" : "user", parts });
      } else {
        contents.push({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }]
        });
      }
    }

    const requestBody = {
      system_instruction: systemText ? { parts: [{ text: systemText }] } : undefined,
      contents,
      generationConfig: { maxOutputTokens: 1024, temperature: 0.7 }
    };

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      }
    );

    const geminiData = await geminiRes.json();
    console.log("Gemini response status:", geminiRes.status);
    console.log("Gemini response:", JSON.stringify(geminiData).slice(0, 500));

    if (geminiData.error) {
      console.error("Gemini error:", geminiData.error);
      // Fall back to text-only Groq with a note about the file
      const textMessages = messages.map((m: any) => ({
        role: m.role,
        content: Array.isArray(m.content)
          ? m.content.filter((c: any) => c.type === "text").map((c: any) => c.text).join(" ") || "Please help with this nursing topic."
          : m.content
      }));
      return await callGroq(textMessages);
    }
    return geminiData.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response from Gemini.";
  } catch (err) {
    console.error("Gemini failed:", err);
    return await callGroq(messages);
  }
}