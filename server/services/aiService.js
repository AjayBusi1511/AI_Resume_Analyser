import Groq from "groq-sdk";

export const getAISuggestions = async ({ skills = [], experience = [], education = [], score = 0 }) => {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("Missing GROQ_API_KEY");

    const client = new Groq({ apiKey });

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content: "You are a professional resume reviewer and ATS expert. Give direct, actionable advice only.",
        },
        {
          role: "user",
          content: `Analyse this resume and give 3 specific improvement tips to increase its ATS score.

Resume Details:
- Skills found: ${skills.length ? skills.join(", ") : "none detected"}
- Experience: ${experience.length ? experience.join(", ") : "not clearly mentioned"}
- Education: ${education.length ? education.join(", ") : "not found"}
- Current ATS Score: ${score}/100

Write exactly 3 bullet points. Each must be a real, specific suggestion.
Start each line with a dash (-). No headers, no numbering, no intro text.`,
        },
      ],
    });

    const text = completion.choices?.[0]?.message?.content;
    if (!text) throw new Error("Empty response from Groq");
    return text.trim();

  } catch (error) {
    console.error("Groq Suggestions Error:", error.message);
    return `- Add relevant technical keywords from job descriptions to improve ATS matching\n- Use standard section headings: Experience, Education, Skills, Projects\n- Quantify your achievements with numbers, percentages, or impact metrics`;
  }
};