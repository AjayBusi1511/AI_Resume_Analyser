import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

export default function Login({ onSwitch, onBack }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handle = async () => {
    if (!email || !pass) { setErr("Please fill in all fields."); return; }
    setLoading(true); setErr("");
    try {
      const d = await api.login({ email, password: pass });
      if (d.token) login(d);
      else setErr(d.error || "Invalid email or password.");
    } catch { setErr("Cannot reach server. Make sure the backend is running on port 5000."); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div className="scale-in glass-card" style={{ width: "100%", maxWidth: 420, padding: "2.5rem" }}>
        <button onClick={onBack} className="btn-ghost" style={{ padding: "6px 12px", fontSize: "0.8rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 6 }}>
          ← Back
        </button>
        <div style={{ marginBottom: "2rem" }}>
          <span className="gradient-text font-display" style={{ fontSize: "1.1rem", fontWeight: 800, display: "block", marginBottom: "1rem" }}>✦ ResuMind</span>
          <h1 className="font-display" style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 6 }}>Welcome back</h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Sign in to continue to ResuMind</p>
        </div>

        {err && (
          <div style={{ background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)", color: "#fda4af", borderRadius: 12, padding: "12px 14px", marginBottom: "1.25rem", fontSize: "0.85rem", display: "flex", gap: 8 }}>
            <span>⚠</span> {err}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ color: "#64748b", fontSize: "0.78rem", fontWeight: 600, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>Email</label>
            <input className="input-field" placeholder="you@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label style={{ color: "#64748b", fontSize: "0.78rem", fontWeight: 600, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>Password</label>
            <div style={{ position: "relative" }}>
              <input className="input-field" placeholder="Your password" type={showPass ? "text" : "password"}
                value={pass} onChange={(e) => setPass(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handle()}
                style={{ paddingRight: 44 }} />
              <button onClick={() => setShowPass(!showPass)}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: "1rem" }}>
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
          </div>
        </div>

        <button className="btn-primary" onClick={handle} disabled={loading}
          style={{ width: "100%", padding: "13px", fontSize: "0.95rem", borderRadius: 12, marginTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {loading
            ? <><span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} /> Signing in…</>
            : "Sign In →"}
        </button>

        <div className="divider" />
        <p style={{ textAlign: "center", color: "#64748b", fontSize: "0.875rem" }}>
          Don't have an account?{" "}
          <span style={{ color: "#a78bfa", cursor: "pointer", fontWeight: 600 }} onClick={onSwitch}>Create one free</span>
        </p>
      </div>
    </div>
  );
}