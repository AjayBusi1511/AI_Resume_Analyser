import Groq from "groq-sdk";

let resumeChunks = [];

export const setResumeText = (text) => {
  try {
    const chunkSize = 500;
    resumeChunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      resumeChunks.push(text.slice(i, i + chunkSize));
    }
    console.log("✅ Resume stored as chunks:", resumeChunks.length);
  } catch (e) {
    console.error("❌ Error setting resume text:", e.message);
  }
};

const getRelevantChunks = (question) => {
  if (!resumeChunks.length) return [];
  const keywords = question.toLowerCase().split(" ");
  const scored = resumeChunks.map(chunk => ({
    chunk,
    score: keywords.filter(w => chunk.toLowerCase().includes(w)).length,
  }));
  return scored.sort((a, b) => b.score - a.score).slice(0, 3).map(i => i.chunk);
};

export const askResumeQuestion = async (question) => {
  try {
    if (!question || question.trim() === "") return "Please provide a valid question.";
    if (!resumeChunks.length) return "Please upload your resume first before asking questions.";

    const relevantChunks = getRelevantChunks(question);
    if (!relevantChunks.length) return "Not mentioned in resume.";

    const context = relevantChunks.join("\n\n");
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("Missing GROQ_API_KEY");

    const client = new Groq({ apiKey });
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 500,
      messages: [
        { role: "system", content: "You are an expert resume analyst. Answer ONLY using the provided context." },
        { role: "user", content: `Context:\n${context}\n\nQuestion: ${question}\n\nIf not found, say: "Not mentioned in resume."` },
      ],
    });

    const text = completion.choices?.[0]?.message?.content;
    if (!text) throw new Error("Empty response from Groq");
    return text.trim();
  } catch (e) {
    console.error("askResumeQuestion ERROR:", e.message);
    return "Error answering question. Please try again.";
  }
};