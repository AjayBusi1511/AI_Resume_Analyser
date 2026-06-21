import { useEffect, useState } from "react";

export default function GaugeScore({ score }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = score / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= score) { setDisplayed(score); clearInterval(timer); }
      else setDisplayed(Math.floor(start));
    }, 25);
    return () => clearInterval(timer);
  }, [score]);

  const color  = score >= 80 ? "#a78bfa" : score >= 60 ? "#f59e0b" : "#f43f5e";
  const color2 = score >= 80 ? "#e879f9" : score >= 60 ? "#fb923c" : "#fb7185";
  const label  = score >= 80 ? "Excellent" : score >= 60 ? "Good" : score >= 40 ? "Fair" : "Poor";
  const badge  = score >= 80 ? "ATS Ready" : score >= 60 ? "Needs Work" : "Poor Match";
  const arc    = (Math.min(score, 100) / 100) * 283;

  return (
    <div style={{ textAlign: "center", minWidth: 170 }}>
      <svg width="170" height="100" viewBox="0 0 200 115">
        <defs>
          <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={color} /><stop offset="100%" stopColor={color2} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path d="M15 100 A85 85 0 0 1 185 100" fill="none" stroke="rgba(167,139,250,0.08)" strokeWidth="14" strokeLinecap="round" />
        <path d="M15 100 A85 85 0 0 1 185 100" fill="none" stroke="url(#gauge-grad)" strokeWidth="14" strokeLinecap="round"
          strokeDasharray={`${arc} 267`} filter="url(#glow)"
          style={{ transition: "stroke-dasharray 1.4s cubic-bezier(0.34,1.56,0.64,1)" }} />
        <text x="100" y="90" textAnchor="middle" fill={color} fontSize="34" fontWeight="900" fontFamily="Space Grotesk, sans-serif">{displayed}</text>
        <text x="100" y="108" textAnchor="middle" fill="#334155" fontSize="12">out of 100</text>
      </svg>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 }}>
        <span style={{ color, fontWeight: 700, fontSize: "0.95rem" }}>{label}</span>
        <span style={{ background: color + "20", color, border: `1px solid ${color}40`, padding: "2px 8px", borderRadius: 10, fontSize: "0.7rem", fontWeight: 600 }}>{badge}</span>
      </div>
    </div>
  );
}