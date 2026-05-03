import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages || [];

    const hasImage = messages.some((m: any) =>
      Array.isArray(m.content) && m.content.some((c: any) => c.type === "image_url")
    );

    // Use Gemini for image messages, Groq for text
    if (hasImage) {
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
  return data.choices?.[0]?.message?.content ?? "No response from Groq.";
}

async function callGemini(messages: any[]) {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) throw new Error("No Gemini API key");

    // Extract system prompt and conversation
    const systemMsg = messages.find((m: any) => m.role === "system");
    const systemText = systemMsg?.content ?? "";

    // Build Gemini contents from messages
    const contents: any[] = [];

    for (const m of messages) {
      if (m.role === "system") continue;

      if (Array.isArray(m.content)) {
        // Message with image
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
            } else {
              parts.push({ image_url: imageUrl });
            }
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

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: systemText ? { parts: [{ text: systemText }] } : undefined,
          contents,
          generationConfig: {
            maxOutputTokens: 1024,
            temperature: 0.7,
          }
        })
      }
    );

    const geminiData = await geminiRes.json();

    if (geminiData.error) {
      console.error("Gemini error:", geminiData.error);
      // Fall back to Groq vision model
      return await callGroqVision(messages);
    }

    return geminiData.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response from Gemini.";
  } catch (err) {
    console.error("Gemini failed, falling back to Groq vision:", err);
    return await callGroqVision(messages);
  }
}

async function callGroqVision(messages: any[]) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + process.env.GROQ_API_KEY
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      max_tokens: 1024,
      messages: messages.map((m: any) => ({ role: m.role, content: m.content }))
    })
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "No response from vision model.";
}
