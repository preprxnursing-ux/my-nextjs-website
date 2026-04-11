export default function ConfirmPage() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#080d1a", color: "#e2e8f0", fontFamily: "sans-serif", textAlign: "center", padding: "40px" }}>
      <div>
        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📧</div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "12px" }}>Check your email</h1>
        <p style={{ color: "#64748b", lineHeight: 1.7 }}>
          We sent a confirmation link to your email.<br />
          Click it to activate your account, then sign in.
        </p>
      </div>
    </main>
  );
}
