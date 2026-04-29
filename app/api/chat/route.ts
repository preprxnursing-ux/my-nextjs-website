import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages || [];
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.GROQ_API_KEY
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1024,
        messages: messages.map((m: {role: string; content: string}) => ({ role: m.role, content: m.content }))
      })
    });
    const groqData = await groqRes.json();
    const reply = groqData.choices?.[0]?.message?.content ?? "No response";
    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json({ reply: "Server error. Please try again." });
  }
}
