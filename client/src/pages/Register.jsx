import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

export default function Register({ onSwitch, onBack }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handle = async () => {
    if (!form.name || !form.email || !form.password) { setErr("All fields are required."); return; }
    if (form.password.length < 6) { setErr("Password must be at least 6 characters."); return; }
    setLoading(true); setErr("");
    try {
      const d = await api.register(form);
      if (d.token) login(d);
      else setErr(d.error || "Registration failed.");
    } catch { setErr("Cannot reach server."); }
    setLoading(false);
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthColor = ["transparent", "#f43f5e", "#f59e0b", "#a78bfa"][strength];
  const strengthLabel = ["", "Weak", "Fair", "Strong"][strength];

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div className="scale-in glass-card" style={{ width: "100%", maxWidth: 440, padding: "2.5rem" }}>
        <button onClick={onBack} className="btn-ghost" style={{ padding: "6px 12px", fontSize: "0.8rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 6 }}>
          ← Back
        </button>
        <div style={{ marginBottom: "2rem" }}>
          <span className="gradient-text font-display" style={{ fontSize: "1.1rem", fontWeight: 800, display: "block", marginBottom: "1rem" }}>✦ ResuMind</span>
          <h1 className="font-display" style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 6 }}>Create account</h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Free forever. No credit card needed.</p>
        </div>

        {err && (
          <div style={{ background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)", color: "#fda4af", borderRadius: 12, padding: "12px 14px", marginBottom: "1.25rem", fontSize: "0.85rem", display: "flex", gap: 8 }}>
            <span>⚠</span> {err}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[{ key: "name", label: "Full Name", placeholder: "Jane Smith", type: "text" },
            { key: "email", label: "Email", placeholder: "you@example.com", type: "email" }].map((f) => (
            <div key={f.key}>
              <label style={{ color: "#64748b", fontSize: "0.78rem", fontWeight: 600, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>{f.label}</label>
              <input className="input-field" placeholder={f.placeholder} type={f.type} value={form[f.key]} onChange={set(f.key)} />
            </div>
          ))}
          <div>
            <label style={{ color: "#64748b", fontSize: "0.78rem", fontWeight: 600, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>Password</label>
            <div style={{ position: "relative" }}>
              <input className="input-field" placeholder="Min. 6 characters" type={showPass ? "text" : "password"}
                value={form.password} onChange={set("password")}
                onKeyDown={(e) => e.key === "Enter" && handle()}
                style={{ paddingRight: 44 }} />
              <button onClick={() => setShowPass(!showPass)}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: "1rem" }}>
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
            {form.password.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                  {[1, 2, 3].map((i) => (
                    <div key={i} style={{ flex: 1, height: 3, borderRadius: 4, background: i <= strength ? strengthColor : "rgba(255,255,255,0.06)", transition: "background 0.3s" }} />
                  ))}
                </div>
                <span style={{ color: strengthColor, fontSize: "0.75rem", fontWeight: 600 }}>{strengthLabel}</span>
              </div>
            )}
          </div>
        </div>

        <button className="btn-primary" onClick={handle} disabled={loading}
          style={{ width: "100%", padding: "13px", fontSize: "0.95rem", borderRadius: 12, marginTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {loading
            ? <><span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} /> Creating…</>
            : "Create Account →"}
        </button>

        <div className="divider" />
        <p style={{ textAlign: "center", color: "#64748b", fontSize: "0.875rem" }}>
          Already have an account?{" "}
          <span style={{ color: "#a78bfa", cursor: "pointer", fontWeight: 600 }} onClick={onSwitch}>Sign in</span>
        </p>
      </div>
    </div>
  );
}