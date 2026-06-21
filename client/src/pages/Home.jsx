import { useState } from "react";
import Upload from "../components/Upload";
import Result from "../components/Result";
import Chat from "../components/Chat";
import "./Home.css";

const quotes = [
  "Your resume is your first impression — make it count.",
  "Opportunities don't happen, you create them.",
  "Your skills are your strongest currency.",
  "Small improvements in your resume = big career growth.",
  "Every line in your resume should sell YOU."
];

function Home() {
  const [results, setResults] = useState(null);

  return (
    <div className="home-container">

      {/* 🔥 HEADER */}
      <div className="hero">
        <p className="badge">AI POWERED</p>
        <h1 className="title">ResuMind </h1>
        <p className="quote">
          "{quotes[Math.floor(Math.random() * quotes.length)]}"
        </p>
      </div>

      {/* 🔥 UPLOAD */}
      <Upload setResults={setResults} />

      {/* 🔥 RESULT */}
      {results && (
        <>
          <Result results={results} />
          <Chat />
        </>
      )}

      {/* 🔥 FOOTER */}
      <div className="footer">
        <p>🚀 Built for smarter careers</p>
      </div>

    </div>
  );
}

export default Home;