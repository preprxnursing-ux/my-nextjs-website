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

    if (ext === "docx") {
      const result = await mammoth.extractRawText({ buffer });
      const text = result.value.trim();
      return NextResponse.json({ text: text.slice(0, 8000), scanned: text.length < 20, name: file.name, type: "docx" });
    }

    if (ext === "pdf") {
      try {
        const pdfParse = (await import("pdf-parse/lib/pdf-parse.js")).default;
        const data = await pdfParse(buffer);
        const text = data.text.replace(/\s+/g, " ").trim();
        const alphaRatio = (text.match(/[a-zA-Z ]/g) ?? []).length / Math.max(text.length, 1);
        const isReadable = text.length > 100 && alphaRatio > 0.5;
        if (!isReadable) return NextResponse.json({ text: "", scanned: true, name: file.name, type: "pdf" });
        return NextResponse.json({ text: text.slice(0, 8000), scanned: false, name: file.name, type: "pdf" });
      } catch (e) {
        console.error("pdf-parse error:", e);
        return NextResponse.json({ text: "", scanned: true, name: file.name, type: "pdf" });
      }
    }

    if (ext === "pptx") {
      try {
        const JSZip = (await import("jszip")).default;
        const zip = await JSZip.loadAsync(buffer);
        const slideFiles = Object.keys(zip.files).filter(f => f.match(/ppt\/slides\/slide[0-9]+\.xml/));
        let text = "";
        for (const slideFile of slideFiles.slice(0, 20)) {
          const xml = await zip.files[slideFile].async("string");
          const matches = xml.match(/<a:t[^>]*>([^<]+)<\/a:t>/g) ?? [];
          text += matches.map((m) => m.replace(/<[^>]+>/g, "")).join(" ") + "\n";
        }
        return NextResponse.json({ text: text.slice(0, 8000), scanned: text.trim().length < 20, name: file.name, type: "pptx" });
      } catch {
        return NextResponse.json({ text: "", scanned: true, name: file.name, type: "pptx" });
      }
    }

    if (["txt", "md", "csv"].includes(ext)) {
      return NextResponse.json({ text: buffer.toString("utf-8").slice(0, 8000), scanned: false, name: file.name, type: "txt" });
    }

    return NextResponse.json({ text: "", error: "Unsupported file type", name: file.name });
  } catch (e) {
    console.error("Extract error:", e);
    return NextResponse.json({ text: "", error: "Extraction failed" });
  }
}
