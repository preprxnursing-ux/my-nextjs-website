"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
  *, body { font-family: 'Plus Jakarta Sans', sans-serif; }
  .fd { font-family: 'Cormorant Garamond', Georgia, serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes floatY {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-14px); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes pulseRing {
    0%   { transform: scale(1); opacity: .5; }
    100% { transform: scale(1.6); opacity: 0; }
  }
  @keyframes ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .fade-up { animation: fadeUp .7s ease both; }
  .float   { animation: floatY 6s ease-in-out infinite; }

  .shimmer-text {
    background: linear-gradient(90deg, #38bdf8 0%, #e0f2fe 40%, #38bdf8 80%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3s linear infinite;
  }

  .ticker-wrap { overflow: hidden; white-space: nowrap; }
  .ticker-inner { display: inline-flex; animation: ticker 30s linear infinite; }
  .ticker-item {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 0 32px; font-size: 13px; font-weight: 600; color: #94a3b8;
  }
  .ticker-dot { width: 5px; height: 5px; border-radius: 50%; background: #0ea5e9; flex-shrink: 0; }

  .contact-card {
    border-radius: 24px;
    padding: 36px;
    position: relative;
    overflow: hidden;
    transition: all .4s cubic-bezier(.34,1.56,.64,1);
    cursor: default;
  }
  .contact-card:hover { transform: translateY(-10px) scale(1.02); }

  .faq-item { border-radius: 16px; overflow: hidden; transition: border-color .3s; }
  input::placeholder, textarea::placeholder { color: #334155; }
`;

const contacts = [
  {
    name: "Melissa Carter",
    role: "Student Success Lead",
    email: "preprxnursing@gmail.com",
    color: "#0ea5e9",
    glow: "rgba(14,165,233,.2)",
    bg: "rgba(14,165,233,.06)",
    border: "rgba(14,165,233,.2)",
    initials: "M",
    avatar: "/melissa2.jpg",
    tagline: "Questions about the platform, courses, or getting started? Melissa is your first stop.",
    topics: ["Platform questions", "Course guidance", "Getting started", "Account support"],
    availability: "Mon - Fri . 8am - 6pm EAT",
    responseTime: "Usually within 4 hours",
    accentLight: "rgba(14,165,233,.08)", href: "/team/melissa",
  },
  {
    name: "Dr. James Whitfield",
    role: "Founder & Lead Educator",
    email: "prenclexreview@gmail.com",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,.2)",
    bg: "rgba(139,92,246,.06)",
    border: "rgba(139,92,246,.2)",
    initials: "J",
    avatar: "/james2.jpg",
    tagline: "Partnerships, educator access, media inquiries, or strategic conversations go to James.",
    topics: ["Partnerships", "Educator access", "Media & press", "Strategic inquiries"],
    availability: "Mon - Fri . 9am - 5pm EAT",
    responseTime: "Usually within 24 hours",
    accentLight: "rgba(139,92,246,.08)", href: "/team/james",
  },
];

const faqs = [
  { q: "Is the platform really free to start?", a: "Yes -- no credit card required. You get full access to NCLEX-RN practice questions immediately after signing up." },
  { q: "How many questions are available?", a: "We currently have 3,100+ NCLEX-RN questions with full clinical rationales. More are added regularly across all certification paths." },
  { q: "Do you offer group or institutional plans?", a: "Yes! Contact James directly at prenclexreview@gmail.com for institutional pricing and educator access arrangements." },
  { q: "Can international nursing students use this?", a: "Absolutely. Our platform is used by students from over 40 countries preparing for NCLEX and other nursing certification exams." },
  { q: "How long does it take to get a response?", a: "Melissa typically responds within 4 hours on weekdays. James responds within 24 hours for strategic or partnership inquiries." },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "", to: "melissa" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: "12px",
    fontSize: "14px",
    outline: "none",
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.1)",
    color: "#e2e8f0",
    transition: "border-color .2s",
    fontFamily: "inherit",
    boxSizing: "border-box",
  };

  const selectedContact = contacts.find(c => c.name.toLowerCase() === formData.to)!;

  return (
    <>
      <style>{fontStyle}</style>
      <main style={{ background: "#060f1e", minHeight: "100vh", color: "#f1f5f9" }}>

        {/* HERO */}
        <section style={{ position: "relative", padding: "110px 20px 90px", overflow: "hidden", background: "linear-gradient(160deg,#060f1e 0%,#0c1f3a 60%,#0a2540 100%)" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1800&q=80')`, backgroundSize: "cover", backgroundPosition: "center", opacity: .06 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(6,15,30,.97) 0%,rgba(10,37,64,.9) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(14,165,233,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,.03) 1px,transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />
          <div className="float" style={{ position: "absolute", top: "-60px", right: "8%", width: "480px", height: "480px", background: "radial-gradient(circle,rgba(14,165,233,.1) 0%,transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-40px", left: "4%", width: "320px", height: "320px", background: "radial-gradient(circle,rgba(139,92,246,.08) 0%,transparent 65%)", pointerEvents: "none" }} />

          <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
              <div>
                <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(14,165,233,.12)", border: "1px solid rgba(14,165,233,.3)", borderRadius: "100px", padding: "6px 18px", fontSize: "11px", fontWeight: 700, color: "#7dd3fc", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "28px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0ea5e9", display: "inline-block" }} />
                  Get In Touch
                </div>
                <h1 className="fd fade-up" style={{ fontSize: "clamp(2.6rem,5.5vw,4.5rem)", fontWeight: 700, lineHeight: 1.1, color: "#f8fafc", marginBottom: "20px", animationDelay: ".1s" }}>
                  We're real people.<br />
                  <span className="shimmer-text">Talk to us directly.</span>
                </h1>
                <p className="fade-up" style={{ fontSize: "1.1rem", color: "#94a3b8", fontWeight: 400, lineHeight: 1.85, maxWidth: "480px", marginBottom: "36px", animationDelay: ".2s" }}>
                  No bots. No ticket queues. Reach Melissa or James directly -- whichever fits your question best.
                </p>
                <div className="fade-up" style={{ display: "flex", gap: "12px", flexWrap: "wrap", animationDelay: ".3s" }}>
                  {contacts.map(c => (
                    <button key={c.name} onClick={() => window.open(`https://mail.google.com/mail/?view=cm&to=${c.email}`, "_blank")}
                      style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 20px", borderRadius: "14px", background: c.bg, border: `1px solid ${c.border}`, textDecoration: "none", transition: "all .3s cubic-bezier(.34,1.56,.64,1)" }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.04)"; e.currentTarget.style.boxShadow = `0 12px 32px ${c.color}30`; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: `${c.color}18`, border: `2px solid ${c.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, color: c.color }}>
                        {c.initials}
                      </div>
                      <div>
                        <p style={{ fontSize: "13px", fontWeight: 700, color: "#f8fafc", margin: 0 }}>Email {c.name}</p>
                        <p style={{ fontSize: "10px", color: c.color, margin: 0, fontWeight: 600 }}>{c.email}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="fade-up" style={{ position: "relative", animationDelay: ".2s" }}>
                <div style={{ borderRadius: "24px", overflow: "hidden", height: "420px", position: "relative" }}>
                  <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1000&q=80" alt="Contact" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.55)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(6,15,30,.7) 0%,rgba(10,37,64,.5) 100%)" }} />
                  <div style={{ position: "absolute", top: "24px", left: "24px", background: "rgba(6,15,30,.92)", backdropFilter: "blur(12px)", border: "1px solid rgba(14,165,233,.2)", borderRadius: "16px", padding: "16px 20px" }}>
                    <p style={{ fontSize: "11px", color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", margin: "0 0 6px" }}>Response Time</p>
                    <p style={{ fontSize: "20px", fontWeight: 800, color: "#38bdf8", margin: 0 }}>{"< 4 hrs"}</p>
                    <p style={{ fontSize: "11px", color: "#475569", margin: "3px 0 0" }}>Weekday average</p>
                  </div>
                  <div style={{ position: "absolute", bottom: "24px", right: "24px", background: "rgba(6,15,30,.92)", backdropFilter: "blur(12px)", border: "1px solid rgba(139,92,246,.2)", borderRadius: "16px", padding: "16px 20px" }}>
                    <p style={{ fontSize: "11px", color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", margin: "0 0 6px" }}>Team</p>
                    <p style={{ fontSize: "20px", fontWeight: 800, color: "#c084fc", margin: 0 }}>2 People</p>
                    <p style={{ fontSize: "11px", color: "#475569", margin: "3px 0 0" }}>Real humans, always</p>
                  </div>
                  <div style={{ position: "absolute", bottom: "24px", left: "24px", background: "rgba(6,15,30,.92)", backdropFilter: "blur(12px)", border: "1px solid rgba(52,211,153,.2)", borderRadius: "16px", padding: "14px 18px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(52,211,153,.3)", animation: "pulseRing 2s ease-out infinite" }} />
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e", position: "relative", zIndex: 1 }} />
                    </div>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: "#34d399", margin: 0 }}>Online now . Ready to help</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TICKER */}
        <div style={{ background: "#040d1a", borderTop: "1px solid rgba(14,165,233,.08)", borderBottom: "1px solid rgba(14,165,233,.08)", padding: "14px 0" }}>
          <div className="ticker-wrap">
            <div className="ticker-inner">
              {[...Array(2)].map((_, ri) => (
                <span key={ri} style={{ display: "inline-flex" }}>
                  {["No bots -- real humans only", "Response within 4 hours", "Melissa handles platform questions", "James handles partnerships", "50,000+ students supported", "Built by nurses for nurses", "Mon-Fri availability"].map(t => (
                    <span key={t} className="ticker-item"><span className="ticker-dot" />{t}</span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CONTACT CARDS */}
        <section style={{ background: "linear-gradient(180deg,#0c1e35 0%,#0e2540 100%)", padding: "80px 20px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "52px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>Who to Contact</p>
              <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2 }}>Choose who to reach.</h2>
              <p style={{ fontSize: "15px", color: "#64748b", marginTop: "10px" }}>Hover over each card -- then click to email directly.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "20px" }}>
              {contacts.map(c => <ContactCard key={c.name} c={c} />)}
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section style={{ background: "#060f1e", padding: "80px 20px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#8b5cf6", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>Send a Message</p>
              <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2 }}>Prefer to write it out?</h2>
              <p style={{ fontSize: "15px", color: "#64748b", marginTop: "10px" }}>Fill the form and we'll get back to you promptly.</p>
            </div>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ position: "relative", width: "80px", height: "80px", margin: "0 auto 24px" }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(52,211,153,.15)", animation: "pulseRing 2s ease-out infinite" }} />
                  <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(52,211,153,.12)", border: "1px solid rgba(52,211,153,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}></div>
                </div>
                <h3 className="fd" style={{ fontSize: "2.2rem", fontWeight: 700, color: "#f8fafc", marginBottom: "12px" }}>Message sent!</h3>
                <p style={{ color: "#64748b", lineHeight: 1.8, maxWidth: "400px", margin: "0 auto 28px" }}>
                  {selectedContact.name} will get back to you {selectedContact.responseTime.toLowerCase()}.
                </p>
                <button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "", to: "melissa" }); }}
                  style={{ padding: "12px 28px", borderRadius: "12px", background: "rgba(14,165,233,.15)", border: "1px solid rgba(14,165,233,.3)", color: "#38bdf8", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  Send another message
                </button>
              </div>
            ) : (
              <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "24px", padding: "40px" }}>
                {/* Who to send to */}
                <div style={{ marginBottom: "28px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#64748b", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "12px" }}>Send to</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    {contacts.map(c => (
                      <button key={c.name} onClick={() => setFormData(prev => ({ ...prev, to: c.name.toLowerCase() }))}
                        style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px", borderRadius: "16px", background: formData.to === c.name.toLowerCase() ? c.accentLight : "rgba(255,255,255,.03)", border: `1px solid ${formData.to === c.name.toLowerCase() ? c.border : "rgba(255,255,255,.07)"}`, cursor: "pointer", transition: "all .25s", fontFamily: "inherit", position: "relative", overflow: "hidden" }}>
                        {formData.to === c.name.toLowerCase() && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: c.color }} />}
                        <div style={{ width: "44px", height: "44px", borderRadius: "50%", overflow: "hidden", border: `2px solid ${formData.to === c.name.toLowerCase() ? c.color + "60" : c.color + "25"}`, flexShrink: 0 }}>
                          <img src={c.avatar} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }} onClick={() => window.location.href = c.href} />
                        </div>
                        <div style={{ textAlign: "left", flex: 1 }}>
                          <p style={{ fontSize: "14px", fontWeight: 700, color: formData.to === c.name.toLowerCase() ? "#f8fafc" : "#94a3b8", margin: "0 0 3px" }}>{c.name}</p>
                          <p style={{ fontSize: "11px", color: formData.to === c.name.toLowerCase() ? c.color : "#334155", margin: 0, fontWeight: 600 }}>{c.role}</p>
                          <p style={{ fontSize: "10px", color: "#334155", margin: "2px 0 0" }}>{c.responseTime}</p>
                        </div>
                        {formData.to === c.name.toLowerCase() && (
                          <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <svg width="10" height="10" fill="none" stroke="#fff" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#64748b", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: "8px" }}>Your name</label>
                    <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Jane Doe" style={inputStyle}
                      onFocus={e => e.currentTarget.style.borderColor = selectedContact.color}
                      onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#64748b", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: "8px" }}>Your email</label>
                    <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="you@email.com" style={inputStyle}
                      onFocus={e => e.currentTarget.style.borderColor = selectedContact.color}
                      onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"} />
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#64748b", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: "8px" }}>Subject</label>
                  <input name="subject" value={formData.subject} onChange={handleChange} type="text" placeholder="What's this about?" style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = selectedContact.color}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"} />
                </div>

                <div style={{ marginBottom: "28px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#64748b", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: "8px" }}>Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us how we can help..." rows={5}
                    style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
                    onFocus={e => e.currentTarget.style.borderColor = selectedContact.color}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"} />
                  <p style={{ fontSize: "11px", color: "#334155", marginTop: "6px" }}>This will be sent to {selectedContact.name} at {selectedContact.email}</p>
                </div>

                <button onClick={handleSubmit} disabled={loading || !formData.name || !formData.email || !formData.message}
                  style={{ width: "100%", padding: "15px", borderRadius: "12px", background: !formData.name || !formData.email || !formData.message ? "rgba(14,165,233,.25)" : `linear-gradient(135deg,${selectedContact.color},${selectedContact.color}cc)`, color: "#fff", fontSize: "15px", fontWeight: 700, border: "none", cursor: !formData.name || !formData.email || !formData.message ? "not-allowed" : "pointer", transition: "all .2s", fontFamily: "inherit", boxShadow: formData.name && formData.email && formData.message ? `0 8px 28px ${selectedContact.color}35` : "none" }}
                  onMouseEnter={e => { if (formData.name && formData.email && formData.message) e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
                  {loading ? "Sending..." : `Send message to ${selectedContact.name} ->`}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: "linear-gradient(180deg,#0c1e35 0%,#0a1929 100%)", padding: "80px 20px" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#34d399", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>Common Questions</p>
              <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2 }}>Before you reach out.</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {faqs.map((faq, i) => (
                <div key={i} className="faq-item"
                  style={{ background: "rgba(255,255,255,.03)", border: `1px solid ${openFaq === i ? "rgba(14,165,233,.25)" : "rgba(255,255,255,.07)"}` }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left", gap: "16px" }}>
                    <p style={{ fontSize: "15px", fontWeight: 700, color: openFaq === i ? "#38bdf8" : "#e2e8f0", margin: 0, lineHeight: 1.4 }}>{faq.q}</p>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: openFaq === i ? "rgba(14,165,233,.15)" : "rgba(255,255,255,.06)", border: `1px solid ${openFaq === i ? "rgba(14,165,233,.35)" : "rgba(255,255,255,.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .3s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}>
                      <svg width="12" height="12" fill="none" stroke={openFaq === i ? "#38bdf8" : "#64748b"} strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                    </div>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: "0 24px 20px" }}>
                      <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.8, margin: 0 }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section style={{ position: "relative", padding: "100px 20px", overflow: "hidden", background: "#060f1e", textAlign: "center" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1800&q=80')`, backgroundSize: "cover", backgroundPosition: "center", opacity: .07 }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(6,15,30,.95)" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", background: "radial-gradient(circle,rgba(14,165,233,.07) 0%,transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto" }}>
            <h2 className="fd" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.15, marginBottom: "16px" }}>
              Ready to start preparing?<br />
              <span style={{ color: "#38bdf8", fontStyle: "italic" }}>We're here for you.</span>
            </h2>
            <p style={{ fontSize: "16px", color: "#64748b", lineHeight: 1.85, marginBottom: "36px" }}>
              Whether you have a question or just want to begin -- we're one click away.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/auth/signup" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "15px 36px", borderRadius: "12px", fontSize: "15px", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 28px rgba(14,165,233,.35)", transition: "all .3s cubic-bezier(.34,1.56,.64,1)" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; }}>
                Start free today
              </Link>
              <Link href="/courses" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.07)", color: "#e2e8f0", padding: "15px 28px", borderRadius: "12px", fontSize: "15px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,.12)", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.13)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; }}>
                Explore courses
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

function ContactCard({ c }: { c: typeof contacts[0] }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div ref={ref} className="contact-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        background: hovered ? `linear-gradient(135deg,${c.color}10 0%,rgba(255,255,255,.05) 100%)` : "rgba(255,255,255,.03)",
        border: `1px solid ${hovered ? c.color + "45" : "rgba(255,255,255,.07)"}`,
        boxShadow: hovered ? `0 28px 70px rgba(0,0,0,.4), 0 0 0 1px ${c.color}20` : "none",
      }}>

      <div style={{ position: "absolute", width: "220px", height: "220px", borderRadius: "50%", background: `radial-gradient(circle,${c.color}25 0%,transparent 70%)`, pointerEvents: "none", opacity: hovered ? 1 : 0, transition: "opacity .3s", transform: "translate(-50%,-50%)", left: mousePos.x, top: mousePos.y }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg,${c.color},${c.color}50)`, borderRadius: "24px 24px 0 0", opacity: hovered ? 1 : 0.3, transition: "opacity .4s" }} />

      <div style={{ position: "relative", display: "inline-block", marginBottom: "24px" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", overflow: "hidden", border: `3px solid ${c.color}${hovered ? "80" : "30"}`, transition: "all .4s cubic-bezier(.34,1.56,.64,1)", transform: hovered ? "scale(1.1)" : "scale(1)", boxShadow: hovered ? `0 0 36px ${c.color}40` : "none" }}>
          <img src={c.avatar} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }} onClick={() => window.location.href = c.href} />
        </div>
        <div style={{ position: "absolute", bottom: "2px", right: "2px", width: "20px", height: "20px", borderRadius: "50%", background: "#22c55e", border: "3px solid #0e2540", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff" }} />
        </div>
      </div>

      <p style={{ fontSize: "22px", fontWeight: 800, color: "#f8fafc", margin: "0 0 4px" }}>{c.name}</p>
      <p style={{ fontSize: "12px", fontWeight: 700, color: c.color, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 16px" }}>{c.role}</p>
      <p style={{ fontSize: "14px", color: hovered ? "#cbd5e1" : "#94a3b8", lineHeight: 1.8, marginBottom: "20px", fontWeight: 400, transition: "color .4s" }}>{c.tagline}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
        {c.topics.map(t => (
          <span key={t} style={{ fontSize: "11px", fontWeight: 600, background: `${c.color}12`, color: c.color, border: `1px solid ${c.color}25`, padding: "5px 12px", borderRadius: "100px" }}>{t}</span>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
        <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "12px", padding: "14px" }}>
          <p style={{ fontSize: "10px", color: "#475569", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", margin: "0 0 5px" }}>Availability</p>
          <p style={{ fontSize: "12px", color: "#cbd5e1", fontWeight: 600, margin: 0, lineHeight: 1.4 }}>{c.availability}</p>
        </div>
        <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "12px", padding: "14px" }}>
          <p style={{ fontSize: "10px", color: "#475569", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", margin: "0 0 5px" }}>Response time</p>
          <p style={{ fontSize: "12px", color: "#cbd5e1", fontWeight: 600, margin: 0, lineHeight: 1.4 }}>{c.responseTime}</p>
        </div>
      </div>

      <button onClick={() => window.open(`https://mail.google.com/mail/?view=cm&to=${c.email}`, "_blank")}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", padding: "14px", borderRadius: "14px", background: hovered ? c.color : `${c.color}15`, color: hovered ? "#fff" : c.color, border: `1px solid ${c.color}${hovered ? "ff" : "40"}`, textDecoration: "none", fontSize: "13px", fontWeight: 700, transition: "all .35s cubic-bezier(.34,1.56,.64,1)", boxShadow: hovered ? `0 8px 28px ${c.color}40` : "none" }}>
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
        Email {c.name} . {c.email}
      </button>
    </div>
  );
}

