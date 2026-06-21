import express from "express";
import { uploadResume, askResume } from "../controllers/resumeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload", protect, uploadResume);
router.post("/ask", protect, askResume);

export default router;