const FEATURES = [
  { icon: "🧠", title: "AI-Powered Analysis", desc: "Groq LLM scans your resume and gives instant ATS feedback" },
  { icon: "📊", title: "ATS Score", desc: "See exactly how your resume scores against hiring algorithms" },
  { icon: "💬", title: "Resume Chat", desc: "Ask anything about your resume — get instant AI answers" },
  { icon: "⚡", title: "10-Second Results", desc: "Upload PDF or DOCX and get full analysis in seconds" },
];

const STATS = [
  { value: "98%", label: "ATS Accuracy" },
  { value: "10s", label: "Avg Analysis Time" },
  { value: "50+", label: "Skills Detected" },
  { value: "3", label: "AI Suggestions" },
];

export default function Landing({ onLogin, onRegister }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <nav className="nav">
        <span className="gradient-text font-display" style={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: 1 }}>✦ ResuMind</span>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className="btn-ghost" onClick={onLogin} style={{ padding: "8px 20px", fontSize: "0.875rem" }}>Sign In</button>
          <button className="btn-primary" onClick={onRegister} style={{ padding: "8px 20px", fontSize: "0.875rem" }}>Get Started</button>
        </div>
      </nav>

      <section style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "5rem 2rem 3rem", gap: "1.5rem" }}>
    
        <h1 className="fade-up font-display" style={{ fontSize: "clamp(2.8rem,7vw,5rem)", fontWeight: 900, lineHeight: 1.05, maxWidth: 800, animationDelay: "0.1s" }}>
          Get Your Resume<br />
          <span className="gradient-text">ATS-Ready</span> in Seconds
        </h1>

        <p className="fade-up" style={{ fontSize: "clamp(1rem,2vw,1.2rem)", color: "#64748b", maxWidth: 540, lineHeight: 1.7, animationDelay: "0.2s" }}>
          Upload your PDF or DOCX resume and get an instant AI-powered score, skill breakdown, and actionable improvement tips.
        </p>

        <div className="fade-up" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", animationDelay: "0.3s" }}>
          <button className="btn-primary" onClick={onRegister} style={{ padding: "14px 32px", fontSize: "1rem", borderRadius: 14 }}>Analyse My Resume →</button>
          <button className="btn-ghost" onClick={onLogin} style={{ padding: "14px 32px", fontSize: "1rem", borderRadius: 14 }}>Sign In</button>
        </div>

        <div className="fade-up" style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1rem", animationDelay: "0.4s" }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div className="gradient-text font-display" style={{ fontSize: "1.8rem", fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: "#475569", fontSize: "0.8rem", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: "flex", justifyContent: "center", padding: "0 2rem 4rem" }}>
        <div className="fade-up glass-card" style={{ width: "100%", maxWidth: 700, padding: "2rem", animationDelay: "0.5s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f43f5e" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e" }} />
            <span style={{ color: "#334155", fontSize: "0.8rem", marginLeft: 8 }}>ATS Analysis Result</span>
          </div>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ textAlign: "center", minWidth: 120 }}>
              <svg width="120" height="75" viewBox="0 0 200 110">
                <defs>
                  <linearGradient id="demo-g" x1="0" y1="0" x2="1" y2="0">
                    <stop stopColor="#7c3aed" /><stop offset="1" stopColor="#e879f9" />
                  </linearGradient>
                </defs>
                <path d="M10 100 A90 90 0 0 1 190 100" fill="none" stroke="rgba(167,139,250,0.1)" strokeWidth="16" strokeLinecap="round" />
                <path d="M10 100 A90 90 0 0 1 190 100" fill="none" stroke="url(#demo-g)" strokeWidth="16" strokeLinecap="round" strokeDasharray="212 283" />
                <text x="100" y="88" textAnchor="middle" fill="#a78bfa" fontSize="28" fontWeight="800">75</text>
                <text x="100" y="103" textAnchor="middle" fill="#475569" fontSize="11">/ 100</text>
              </svg>
              <div style={{ color: "#a78bfa", fontWeight: 700, fontSize: "0.85rem" }}>Good</div>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              {[{ label: "Skills", val: 70, c: "#a78bfa" }, { label: "Experience", val: 85, c: "#f59e0b" }, { label: "Education", val: 90, c: "#e879f9" }].map((b) => (
                <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ color: "#64748b", fontSize: "0.78rem", width: 70 }}>{b.label}</span>
                  <div className="progress-track" style={{ flex: 1 }}>
                    <div className="progress-fill" style={{ width: `${b.val}%`, background: b.c }} />
                  </div>
                  <span style={{ color: "#475569", fontSize: "0.72rem", width: 30 }}>{b.val}%</span>
                </div>
              ))}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: "0.75rem" }}>
                {["react", "typescript", "node.js", "python"].map((s) => (
                  <span key={s} className="tag tag-violet" style={{ fontSize: "0.72rem" }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "2rem 2rem 5rem", maxWidth: 900, margin: "0 auto", width: "100%" }}>
        <h2 className="font-display" style={{ textAlign: "center", fontSize: "1.8rem", fontWeight: 800, marginBottom: "2rem" }}>
          Everything you need to <span className="gradient-text">land the job</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem" }}>
          {FEATURES.map((f) => (
            <div key={f.title} className="glass-card" style={{ padding: "1.5rem" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, marginBottom: "0.5rem", fontSize: "0.95rem" }}>{f.title}</h3>
              <p style={{ color: "#64748b", fontSize: "0.83rem", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ textAlign: "center", padding: "3rem 2rem 5rem" }}>
        <div className="glass-card" style={{ display: "inline-block", padding: "3rem 4rem", maxWidth: 500 }}>
          <h2 className="font-display" style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "0.75rem" }}>
            Ready to <span className="gradient-text">get started?</span>
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1.5rem", fontSize: "0.9rem" }}>Free. No credit card. Just upload and go.</p>
          <button className="btn-primary" onClick={onRegister} style={{ padding: "13px 36px", fontSize: "1rem", width: "100%", borderRadius: 14 }}>
            Create Free Account →
          </button>
        </div>
      </section>
    </div>
  );
}
