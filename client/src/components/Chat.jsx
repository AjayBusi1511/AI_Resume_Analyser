import { useState, useRef, useEffect } from "react";
import { api } from "../services/api";
import "./Chat.css";

const QUICK_QUESTIONS = [
  "What skills are on my resume?",
  "What is my education background?",
  "How many years of experience do I have?",
  "What projects have I worked on?",
  "What are my strongest areas?",
];

function Chat({ onFirstMessage }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi! I've read your resume. Ask me anything about it." }
  ]);
  const [loading, setLoading] = useState(false);
  const [hasAsked, setHasAsked] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAsk = async (q) => {
    const text = q || question;
    if (!text.trim() || loading) return;

    if (!hasAsked) {
      setHasAsked(true);
      onFirstMessage?.();
    }

    setMessages((prev) => [...prev, { type: "user", text }]);
    setQuestion("");
    setLoading(true);

    try {
      const data = await api.askQuestion(text);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: data.error ? "Sorry, something went wrong." : data.answer },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Failed to connect. Is the server running?" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-card">
      <div className="chat-header">
        <div className="chat-avatar">🤖</div>
        <div>
          <h3 className="chat-title">Resume Assistant</h3>
          <p className="chat-subtitle">Ask anything about your uploaded resume</p>
        </div>
      </div>

      <div className="quick-questions">
        {QUICK_QUESTIONS.map((q, i) => (
          <button key={i} className="quick-btn" onClick={() => handleAsk(q)} disabled={loading}>
            {q}
          </button>
        ))}
      </div>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`chat-bubble ${m.type}`}>
            {m.type === "bot" && <span className="bubble-icon">🤖</span>}
            <p>{m.text}</p>
            {m.type === "user" && <span className="bubble-icon">👤</span>}
          </div>
        ))}
        {loading && (
          <div className="chat-bubble bot">
            <span className="bubble-icon">🤖</span>
            <div className="typing-indicator">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-row">
        <input
          type="text"
          placeholder="Ask about your resume..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          disabled={loading}
        />
        <button onClick={() => handleAsk()} disabled={loading || !question.trim()}>
          {loading ? "..." : "Send →"}
        </button>
      </div>
    </div>
  );
}

export default Chat;