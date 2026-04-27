import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { messages } = await req.json();

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `You are an expert nursing exam tutor for Prenclex, a nursing exam prep platform. 
Help students prepare for CNA, HESI, NCLEX-RN, NCLEX-PN, TEAS 7, ATI, CCRN, and NP exams.
Give clear, concise, practical explanations. Use mnemonics when helpful.
For NCLEX questions, explain clinical reasoning step by step.
Be encouraging and supportive. Keep responses focused and not overly long.`,
  });

  const history = messages.slice(0, -1).map((m: any) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const chat = model.startChat({ history });
  const lastMessage = messages[messages.length - 1].content;
  const result = await chat.sendMessage(lastMessage);

  return NextResponse.json({ reply: result.response.text() });
}
