import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import fs from "fs";
import connectDB from "./config/db.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import authRoutes from "./routes/authRoutes.js";

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

connectDB();

const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://ai-resume-analyser-client.onrender.com'
  ],
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`ResuMind server running on port ${PORT}`));