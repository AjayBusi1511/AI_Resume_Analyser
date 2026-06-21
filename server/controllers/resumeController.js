import multer from "multer";
import { parseResume } from "../services/parserService.js";
import { extractSkills, extractExperience, extractEducation, calculateScore } from "../utils/helpers.js";
import { getAISuggestions } from "../services/aiService.js";
import { setResumeText, askResumeQuestion } from "../services/ragService.js";
import User from "../models/User.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage }).single("resume");

export const uploadResume = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: "No file uploaded. Please attach a PDF or DOCX file." });

    try {
      const text = await parseResume(req.file.path);
      const skills = extractSkills(text);
      const experience = extractExperience(text);
      const education = extractEducation(text);
      const score = calculateScore(skills, experience, education);

      setResumeText(text);

      const suggestions = await getAISuggestions({ skills, experience, education, score });

      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          resumeHistory: { score, skills, experience, education, suggestions },
        },
      });

      res.json({ skills, experience, education, score, suggestions });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
};

export const askResume = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || question.trim() === "") {
      return res.status(400).json({ error: "Question is required" });
    }
    const answer = await askResumeQuestion(question);
    res.json({ answer });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};