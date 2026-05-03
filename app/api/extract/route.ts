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

    // DOCX — most reliable
    if (ext === "docx") {
      const result = await mammoth.extractRawText({ buffer });
      const text = result.value.trim();
      if (text.length < 20) return NextResponse.json({ text: "", scanned: true, name: file.name, type: "docx" });
      return NextResponse.json({ text: text.slice(0, 8000), scanned: false, name: file.name, type: "docx" });
    }

    // PDF — safe text-only extraction, reject binary garbage
    if (ext === "pdf") {
      const raw = buffer.toString("latin1");

      // Extract text between BT (Begin Text) and ET (End Text) markers
      const btEtMatches = raw.match(/BT[\s\S]*?ET/g) ?? [];
      let extracted = "";
      for (const block of btEtMatches) {
        const strings = block.match(/\(([^)]{1,200})\)/g) ?? [];
        for (const s of strings) {
          const clean = s.slice(1, -1)
            .replace(/\\n/g, " ")
            .replace(/\\r/g, " ")
            .replace(/\\\\/g, "")
            .replace(/\\[0-9]{3}/g, "")
            .trim();
          if (clean.length > 2) extracted += clean + " ";
        }
      }

      // Also try TJ operator (another PDF text format)
      const tjMatches = raw.match(/\[([^\]]+)\]\s*TJ/g) ?? [];
      for (const block of tjMatches) {
        const strings = block.match(/\(([^)]{1,200})\)/g) ?? [];
        for (const s of strings) {
          extracted += s.slice(1, -1).replace(/\\[0-9]{3}/g, "").trim() + " ";
        }
      }

      const finalText = extracted.replace(/\s+/g, " ").trim();

      // Quality check — reject if not readable English text
      const alphaRatio = (finalText.match(/[a-zA-Z\s]/g) ?? []).length / Math.max(finalText.length, 1);
      const isReadable = finalText.length > 100 && alphaRatio > 0.6;

      if (!isReadable) {
        return NextResponse.json({
          text: "",
          scanned: true,
          name: file.name,
          type: "pdf"
        });
      }

      return NextResponse.json({
        text: finalText.slice(0, 8000),
        scanned: false,
        name: file.name,
        type: "pdf"
      });
    }

    // PPTX — extract from XML
    if (ext === "pptx") {
      try {
        const JSZip = (await import("jszip")).default;
        const zip = await JSZip.loadAsync(buffer);
        const slideFiles = Object.keys(zip.files).filter(f => f.match(/ppt\/slides\/slide[0-9]+\.xml/));
        let text = "";
        for (const slideFile of slideFiles.slice(0, 20)) {
          const xml = await zip.files[slideFile].async("string");
          const matches = xml.match(/<a:t[^>]*>([^<]+)<\/a:t>/g) ?? [];
          text += matches.map((m: string) => m.replace(/<[^>]+>/g, "")).join(" ") + "\n";
        }
        const clean = text.trim();
        if (clean.length < 20) return NextResponse.json({ text: "", scanned: true, name: file.name, type: "pptx" });
        return NextResponse.json({ text: clean.slice(0, 8000), scanned: false, name: file.name, type: "pptx" });
      } catch {
        return NextResponse.json({ text: "", scanned: true, name: file.name, type: "pptx" });
      }
    }

    // Plain text
    if (["txt", "md", "csv"].includes(ext)) {
      const text = buffer.toString("utf-8").trim();
      return NextResponse.json({ text: text.slice(0, 8000), scanned: false, name: file.name, type: "txt" });
    }

    return NextResponse.json({ text: "", error: "Unsupported file type", name: file.name });
  } catch (e) {
    console.error("Extract error:", e);
    return NextResponse.json({ text: "", error: "Extraction failed" });
  }
}
