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

    // PDF using pdfjs-dist server-side
    if (ext === "pdf") {
      try {
        const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs" as any);
        const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
        const pdf = await loadingTask.promise;
        let text = "";
        const maxPages = Math.min(pdf.numPages, 15);
        for (let i = 1; i <= maxPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items
            .map((item: any) => item.str)
            .join(" ");
          text += pageText + "\n";
        }
        const clean = text.replace(/\s+/g, " ").trim();
        return NextResponse.json({
          text: clean.slice(0, 8000) || "No readable text found in PDF.",
          name: file.name,
          type: "pdf"
        });
      } catch (pdfErr) {
        console.error("PDF parse error:", pdfErr);
        // Fallback: basic text extraction
        const str = buffer.toString("latin1");
        const matches = str.match(/\(([^)]{3,200})\)/g) ?? [];
        const text = matches
          .map(m => m.slice(1, -1).replace(/\\[0-9]{3}/g, "").trim())
          .filter(t => /[a-zA-Z]{3,}/.test(t))
          .join(" ");
        return NextResponse.json({
          text: text.slice(0, 8000) || "Could not extract PDF text. Try copy-pasting the content.",
          name: file.name,
          type: "pdf"
        });
      }
    }

    // PPTX - extract from XML inside ZIP
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
        return NextResponse.json({
          text: text.slice(0, 8000) || "Could not extract PowerPoint text.",
          name: file.name,
          type: "pptx"
        });
      } catch {
        return NextResponse.json({ text: "Could not extract PowerPoint text.", name: file.name, type: "pptx" });
      }
    }

    // Plain text
    if (["txt", "md", "csv"].includes(ext)) {
      return NextResponse.json({ text: buffer.toString("utf-8").slice(0, 8000), name: file.name, type: "txt" });
    }

    return NextResponse.json({ text: "", name: file.name, type: ext, error: "Unsupported file type" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ text: "", error: "Extraction failed" });
  }
}
