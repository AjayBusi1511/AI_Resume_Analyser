import { useState } from "react";
import Upload from "../components/Upload";
import Result from "../components/Result";
import Chat from "../components/Chat";
import { useAuth } from "../context/AuthContext";

const quotes = [
  "Your resume is your first impression — make it count.",
  "Opportunities don't happen, you create them.",
  "Your skills are your strongest currency.",
];
const STEPS = ["Upload Resume", "View Analysis", "Ask AI"];

export default function Dashboard() {
  const [results, setResults] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const { user, logout } = useAuth();

  const handleResults = (data) => { setResults(data); setActiveStep(1); };

  return (
    <div style={{ background:"#0a0a0f", minHeight:"100vh", color:"#fff" }}>
      <nav style={{ background:"rgba(10,10,15,0.97)", borderBottom:"1px solid #1a1a2e", padding:"0.9rem 2rem", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:100 }}>
        <span style={{ background:"linear-gradient(135deg,#00f5a0,#00d9f5)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontWeight:800, fontSize:"1.3rem", letterSpacing:"2px" }}>⚡ ResuMind</span>
        <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
          <span style={{ background:"rgba(0,245,160,0.08)", border:"1px solid rgba(0,245,160,0.15)", color:"#00f5a0", padding:"5px 12px", borderRadius:"20px", fontSize:"0.8rem" }}>👋 {user?.name}</span>
          <button onClick={logout} style={{ background:"transparent", border:"1px solid #2a2a3e", color:"#fff", padding:"6px 16px", borderRadius:"8px", cursor:"pointer", fontSize:"0.8rem" }}>Logout</button>
        </div>
      </nav>

      <div style={{ maxWidth:"900px", margin:"auto", padding:"2rem" }}>
        <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
          <p style={{ fontSize:"0.7rem", letterSpacing:"4px", color:"#00f5a0", marginBottom:"8px" }}>AI POWERED ATS ANALYSER</p>
          <h1 style={{ fontSize:"3rem", fontWeight:800, background:"linear-gradient(135deg,#00f5a0,#00d9f5)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", margin:"0 0 8px" }}>ResuMind</h1>
          <p style={{ fontStyle:"italic", color:"#00d9f5", fontSize:"0.9rem" }}>"{quotes[Math.floor(Math.random() * quotes.length)]}"</p>
        </div>

        {/* Step indicator */}
        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", marginBottom:"2rem" }}>
          {STEPS.map((step, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 18px", borderRadius:"20px", background: activeStep===i ? "linear-gradient(135deg,#00f5a0,#00d9f5)" : "rgba(255,255,255,0.03)", border: activeStep===i ? "none" : "1px solid #1a1a2e" }}>
                <span style={{ width:"22px", height:"22px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.7rem", fontWeight:800, background: activeStep===i ? "#000" : i<activeStep ? "#00f5a0" : "#2a2a3e", color: activeStep===i||i<activeStep ? "#000" : "#555" }}>
                  {i < activeStep ? "✓" : i+1}
                </span>
                <span style={{ fontSize:"0.8rem", fontWeight:600, color: activeStep===i ? "#000" : i<activeStep ? "#00f5a0" : "#444" }}>{step}</span>
              </div>
              {i < STEPS.length-1 && <div style={{ width:"30px", height:"1px", background: i<activeStep ? "#00f5a0" : "#1a1a2e" }} />}
            </div>
          ))}
        </div>

        <Upload setResults={handleResults} />

        {results && (
          <>
            <Result results={results} />
            <Chat onFirstMessage={() => setActiveStep(2)} />
          </>
        )}

        <div style={{ textAlign:"center", marginTop:"3rem", color:"#333", fontSize:"0.75rem" }}>Built for smarter careers · Powered by Groq AI</div>
      </div>
    </div>
  );
}