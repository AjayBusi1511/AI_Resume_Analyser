import { useState, useRef } from "react";
import { api } from "../services/api";

const STEP_LABELS = ["Uploading…", "Parsing resume…", "Running AI analysis…", "Generating suggestions…", "Done!"];

export default function Upload({ setResults }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [err, setErr] = useState("");
  const [dragging, setDragging] = useState(false);
  const ref = useRef(null);

  const pickFile = (f) => {
    if (!f) return;
    const ok = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!ok.includes(f.type)) { setErr("Only PDF or DOCX files are accepted."); return; }
    setFile(f); setErr("");
  };

  const upload = async () => {
    if (!file) return;
    setLoading(true); setErr(""); setProgress(0); setStepIdx(0);
    const steps = [10, 30, 60, 85];
    for (let i = 0; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, i === 0 ? 300 : 600));
      setProgress(steps[i]); setStepIdx(i + 1);
    }
    try {
      const fd = new FormData();
      fd.append("resume", file);
      const d = await api.uploadResume(fd);
      setProgress(100); setStepIdx(4);
      if (d.error) { setErr(d.error); setProgress(0); setStepIdx(0); }
      else { setTimeout(() => setResults(d), 500); }
    } catch {
      setProgress(0); setStepIdx(0);
      setErr("Upload failed. Make sure the backend is running on port 5000.");
    }
    setLoading(false);
  };

  const borderColor = dragging ? "#a78bfa" : file ? "#e879f9" : "rgba(167,139,250,0.15)";
  const bgColor = dragging ? "rgba(124,58,237,0.06)" : file ? "rgba(232,121,249,0.04)" : "rgba(0,0,0,0.15)";

  return (
    <div className="glass-card" style={{ padding: "2rem", marginBottom: "1.5rem" }}>
      <h2 className="font-display" style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ background: "linear-gradient(135deg,#7c3aed,#e879f9)", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>📄</span>
        Upload Resume
      </h2>

      <div
        style={{ border: `2px dashed ${borderColor}`, borderRadius: 16, padding: "2.5rem 1.5rem", textAlign: "center", cursor: "pointer", background: bgColor, transition: "all 0.25s" }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); pickFile(e.dataTransfer.files[0]); }}
        onClick={() => !loading && ref.current?.click()}>
        <input ref={ref} type="file" accept=".pdf,.docx" style={{ display: "none" }} onChange={(e) => pickFile(e.target.files?.[0] ?? null)} />
        <div style={{ fontSize: "3rem", marginBottom: "0.75rem", animation: dragging ? "float 2s ease infinite" : "none" }}>
          {file ? "📄" : "☁️"}
        </div>
        {file ? (
          <>
            <p style={{ color: "#e879f9", fontWeight: 700, fontSize: "1rem", marginBottom: 4 }}>{file.name}</p>
            <p style={{ color: "#475569", fontSize: "0.8rem" }}>
              {(file.size / 1024).toFixed(1)} KB · <span style={{ color: "#a78bfa" }}>{file.type.includes("pdf") ? "PDF" : "DOCX"}</span> · Click to change
            </p>
          </>
        ) : (
          <>
            <p style={{ color: "#94a3b8", fontWeight: 600, fontSize: "1rem", marginBottom: 4 }}>Drop your resume here</p>
            <p style={{ color: "#475569", fontSize: "0.82rem" }}>
              or click to browse · <span style={{ color: "#a78bfa" }}>PDF</span> or <span style={{ color: "#e879f9" }}>DOCX</span>
            </p>
          </>
        )}
      </div>

      {loading && (
        <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "rgba(124,58,237,0.05)", borderRadius: 14, border: "1px solid rgba(167,139,250,0.15)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: 500 }}>{STEP_LABELS[stepIdx]}</span>
            <span className="gradient-text" style={{ fontWeight: 700, fontSize: "0.85rem" }}>{progress}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
            {STEP_LABELS.slice(0, -1).map((s, i) => (
              <span key={i} style={{ fontSize: "0.72rem", padding: "3px 10px", borderRadius: 20, background: i < stepIdx ? "rgba(124,58,237,0.12)" : "rgba(255,255,255,0.04)", color: i < stepIdx ? "#a78bfa" : "#334155", border: `1px solid ${i < stepIdx ? "rgba(167,139,250,0.25)" : "transparent"}`, transition: "all 0.3s" }}>
                {i < stepIdx ? "✓ " : ""}{s.replace("…", "")}
              </span>
            ))}
          </div>
        </div>
      )}

      {err && (
        <div style={{ marginTop: "1rem", background: "rgba(244,63,94,0.06)", border: "1px solid rgba(244,63,94,0.15)", color: "#fda4af", borderRadius: 12, padding: "10px 14px", fontSize: "0.85rem", display: "flex", gap: 8 }}>
          <span>⚠</span> {err}
        </div>
      )}

      <button onClick={upload} disabled={loading || !file}
        className={file && !loading ? "btn-primary" : ""}
        style={{ width: "100%", marginTop: "1.25rem", padding: "14px", border: "none", borderRadius: 14, fontSize: "1rem", fontWeight: 700, cursor: file && !loading ? "pointer" : "not-allowed", fontFamily: "inherit", background: file && !loading ? undefined : "rgba(255,255,255,0.04)", color: file && !loading ? undefined : "#334155", letterSpacing: 0.5 }}>
        {loading ? "Analysing…" : file ? "✦ Analyse Resume" : "Select a file to continue"}
      </button>
    </div>
  );
}