import { NextResponse } from "next/server";
import mammoth from "mammoth";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ text: "", error: "No file" });

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // DOCX
    if (ext === "docx") {
      const result = await mammoth.extractRawText({ buffer });
      return NextResponse.json({ text: result.value.slice(0, 8000), name: file.name, type: "docx" });
    }

    // PDF — extract text using basic buffer parsing
    if (ext === "pdf") {
      const text = extractPdfText(buffer);
      return NextResponse.json({ text: text.slice(0, 8000), name: file.name, type: "pdf" });
    }

    // PPTX — extract readable text from XML inside zip
    if (ext === "pptx") {
      const text = await extractPptxText(buffer);
      return NextResponse.json({ text: text.slice(0, 8000), name: file.name, type: "pptx" });
    }

    // Plain text
    if (["txt", "md", "csv"].includes(ext)) {
      const text = buffer.toString("utf-8");
      return NextResponse.json({ text: text.slice(0, 8000), name: file.name, type: "txt" });
    }

    return NextResponse.json({ text: "", name: file.name, type: ext, error: "Unsupported file type" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ text: "", error: "Extraction failed" });
  }
}

function extractPdfText(buffer: Buffer): string {
  try {
    const str = buffer.toString("latin1");
    const chunks: string[] = [];
    const streamRegex = /stream([\s\S]*?)endstream/g;
    let match;
    while ((match = streamRegex.exec(str)) !== null) {
      const raw = match[1];
      // Extract readable ASCII text from PDF streams
      const readable = raw.replace(/[^\x20-\x7E\n\r\t]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (readable.length > 20) chunks.push(readable);
    }
    // Also try to extract text between BT and ET markers (PDF text objects)
    const btEtRegex = /BT([\s\S]*?)ET/g;
    while ((match = btEtRegex.exec(str)) !== null) {
      const block = match[1];
      const textParts = block.match(/\(([^)]+)\)/g);
      if (textParts) {
        const extracted = textParts.map(p => p.slice(1, -1)).join(" ");
        if (extracted.trim().length > 5) chunks.push(extracted);
      }
    }
    return chunks.join("\n").slice(0, 8000) || "Could not extract PDF text — try copy-pasting the key sections.";
  } catch {
    return "PDF extraction failed.";
  }
}

async function extractPptxText(buffer: Buffer): Promise<string> {
  try {
    // PPTX is a ZIP file — extract slide XML text
    const { Readable } = await import("stream");
    // Use a simple approach: find readable text between XML tags
    const str = buffer.toString("latin1");
    const textMatches = str.match(/<a:t[^>]*>([^<]+)<\/a:t>/g) ?? [];
    const text = textMatches
      .map(m => m.replace(/<[^>]+>/g, ""))
      .filter(t => t.trim().length > 2)
      .join(" ");
    return text || "Could not extract PowerPoint text.";
  } catch {
    return "PPTX extraction failed.";
  }
}