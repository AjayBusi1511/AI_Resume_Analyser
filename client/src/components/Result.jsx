import { useState } from "react";
import GaugeScore from "./GaugeScore";

export default function Result({ results }) {
  const [tab, setTab] = useState("Overview");

  const color = results.score >= 80 ? "#a78bfa" : results.score >= 60 ? "#f59e0b" : "#f43f5e";

  const suggestions = results.suggestions
    ? results.suggestions.split("\n").map((l) => l.replace(/^[-*•]\s*/, "").trim()).filter(Boolean)
    : [
        "Add more technical keywords relevant to your target role.",
        "Use action verbs and quantify achievements.",
        "Ensure contact info and section headings are clearly formatted.",
      ];

  const bars = [
    { label: "Skills",     val: Math.min(results.skills.length * 5, 40), max: 40, color: "#a78bfa" },
    { label: "Experience", val: results.experience[0] !== "Not clearly mentioned" ? 30 : 5, max: 30, color: "#f59e0b" },
    { label: "Education",  val: results.education[0]  !== "Not found"             ? 30 : 5, max: 30, color: "#e879f9" },
  ];

  const stats = [
    { label: "ATS Score",  value: results.score, suffix: "/100", color },
    { label: "Skills",     value: results.skills.length, suffix: " found", color: "#a78bfa" },
    { label: "Experience", value: results.experience.filter((e) => e !== "Not clearly mentioned").length, suffix: " items", color: "#f59e0b" },
    { label: "Education",  value: results.education.filter((e) => e !== "Not found").length, suffix: " found", color: "#e879f9" },
  ];

  const tabBtn = (t) => ({
    flex: 1,
    padding: "8px 12px",
    border: tab === t ? "1px solid rgba(167,139,250,0.2)" : "1px solid transparent",
    borderRadius: 9,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.85rem",
    fontFamily: "inherit",
    transition: "all 0.2s",
    background: tab === t ? "rgba(124,58,237,0.2)" : "transparent",
    color: tab === t ? "#a78bfa" : "#475569",
  });

  return (
    <div className="glass-card fade-up" style={{ padding: "2rem", marginBottom: "1.5rem" }}>
      <h2
        className="font-display"
        style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 10 }}
      >
        <span style={{ background: "linear-gradient(135deg,#7c3aed,#e879f9)", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>
          📊
        </span>
        Analysis Results
      </h2>

      {/* Score + bars */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap", marginBottom: "1.75rem", padding: "1.5rem", background: "rgba(124,58,237,0.04)", borderRadius: 16, border: "1px solid rgba(167,139,250,0.1)" }}>
        <GaugeScore score={results.score} />
        <div style={{ flex: 1, minWidth: 220 }}>
          {bars.map((b) => (
            <div key={b.label} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: 500 }}>{b.label}</span>
                <span style={{ color: b.color, fontSize: "0.78rem", fontWeight: 700 }}>{b.val}/{b.max}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${(b.val / b.max) * 100}%`, background: b.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, background: "rgba(0,0,0,0.25)", borderRadius: 12, padding: 4, marginBottom: "1.5rem" }}>
        {["Overview", "Skills", "Suggestions"].map((t) => (
          <button key={t} onClick={() => setTab(t)} style={tabBtn(t)}>
            {t}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === "Overview" && (
        <div className="scale-in">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 12, marginBottom: "1.5rem" }}>
            {stats.map((s) => (
              <div key={s.label} className="stat-box">
                <p style={{ color: "#475569", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, fontWeight: 600 }}>{s.label}</p>
                <p style={{ color: s.color, fontSize: "1.8rem", fontWeight: 900, fontFamily: "Space Grotesk, sans-serif", lineHeight: 1 }}>
                  {s.value}
                  <span style={{ fontSize: "0.85rem", opacity: 0.7, fontWeight: 500 }}>{s.suffix}</span>
                </p>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <p style={{ color: "#475569", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: 1, fontWeight: 600, marginBottom: 10 }}>Experience</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {results.experience[0] === "Not clearly mentioned"
                  ? <span style={{ color: "#334155", fontStyle: "italic", fontSize: "0.82rem" }}>Not detected</span>
                  : results.experience.slice(0, 5).map((e, i) => <span key={i} className="tag tag-amber">{e}</span>)}
              </div>
            </div>
            <div>
              <p style={{ color: "#475569", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: 1, fontWeight: 600, marginBottom: 10 }}>Education</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {results.education[0] === "Not found"
                  ? <span style={{ color: "#334155", fontStyle: "italic", fontSize: "0.82rem" }}>Not detected</span>
                  : results.education.map((e, i) => <span key={i} className="tag tag-pink">{e}</span>)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skills */}
      {tab === "Skills" && (
        <div className="scale-in">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <p style={{ color: "#64748b", fontSize: "0.8rem" }}>
              <span style={{ color: "#a78bfa", fontWeight: 700, fontSize: "1.1rem" }}>{results.skills.length}</span> skills detected
            </p>
            {results.skills.length > 0 && <span className="badge badge-violet">✓ Skills Found</span>}
          </div>
          {results.skills.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "#334155" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🔍</div>
              <p style={{ fontWeight: 600, marginBottom: 6 }}>No common skills detected</p>
              <p style={{ fontSize: "0.82rem" }}>Add keywords like JavaScript, Python, SQL, React, etc.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {results.skills.map((s, i) => (
                <span key={i} className="tag tag-violet">{s}</span>
              ))}
            </div>
          )}
          <div className="divider" />
          <p style={{ color: "#64748b", fontSize: "0.78rem", lineHeight: 1.6 }}>
            💡 <strong style={{ color: "#94a3b8" }}>Tip:</strong> Add industry keywords from job descriptions to boost your ATS score.
          </p>
        </div>
      )}

      {/* Suggestions */}
      {tab === "Suggestions" && (
        <div className="scale-in" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {suggestions.map((s, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: 14, background: "rgba(124,58,237,0.04)", border: "1px solid rgba(167,139,250,0.12)", borderRadius: 14, padding: "1rem 1.25rem" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(167,139,250,0.3)";
                e.currentTarget.style.background = "rgba(124,58,237,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(167,139,250,0.12)";
                e.currentTarget.style.background = "rgba(124,58,237,0.04)";
              }}
            >
              <span style={{ background: "linear-gradient(135deg,#7c3aed,#e879f9)", color: "#fff", fontWeight: 900, fontSize: "0.75rem", minWidth: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "Space Grotesk, sans-serif" }}>
                {i + 1}
              </span>
              <p style={{ color: "#cbd5e1", fontSize: "0.88rem", margin: 0, lineHeight: 1.65 }}>{s}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}