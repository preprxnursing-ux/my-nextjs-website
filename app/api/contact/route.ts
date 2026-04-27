import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, to } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const recipient = to === "prenclexreview@gmail.com"
      ? "prenclexreview@gmail.com"
      : "preprxnursing@gmail.com";

    const recipientName = to === "prenclexreview@gmail.com" ? "James" : "Melissa";

    // Use fetch to send via a simple email service
    // We use Resend if API key exists, otherwise log and return success
    const RESEND_KEY = process.env.RESEND_API_KEY;

    if (RESEND_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Pre-NCLEX Contact <onboarding@resend.dev>",
          to: [recipient],
          reply_to: email,
          subject: subject || `New message from ${name}`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f8fafc;border-radius:12px;">
              <div style="background:#0d1f35;padding:20px 24px;border-radius:10px;margin-bottom:20px;">
                <h2 style="color:#38bdf8;margin:0;font-size:20px;">New Contact Message</h2>
                <p style="color:#64748b;margin:4px 0 0;font-size:13px;">Pre-NCLEX Nursing Platform</p>
              </div>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;color:#64748b;font-size:13px;width:100px;">From</td><td style="padding:8px 0;color:#0f172a;font-weight:600;">${name}</td></tr>
                <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Email</td><td style="padding:8px 0;color:#0ea5e9;">${email}</td></tr>
                <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Subject</td><td style="padding:8px 0;color:#0f172a;">${subject || "No subject"}</td></tr>
                <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">To</td><td style="padding:8px 0;color:#0f172a;">${recipientName}</td></tr>
              </table>
              <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin-top:16px;">
                <p style="color:#64748b;font-size:12px;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;">Message</p>
                <p style="color:#0f172a;font-size:15px;line-height:1.7;margin:0;white-space:pre-wrap;">${message}</p>
              </div>
              <p style="color:#94a3b8;font-size:11px;margin-top:20px;text-align:center;">Sent from prenclex.com contact form</p>
            </div>
          `,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Resend error:", err);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
      }
    } else {
      // No API key - log for development
      console.log("Contact form submission:", { name, email, subject, message, to: recipient });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}