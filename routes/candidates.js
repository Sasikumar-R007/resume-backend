const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate"); // Mongoose model

// POST candidate data
router.post("/", async (req, res) => {
  try {
    const newCandidate = new Candidate(req.body);
    await newCandidate.save();
    res.status(201).json({ message: "Candidate profile saved successfully" });
  } catch (error) {
    console.error("Error saving candidate:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all candidates
router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.json(candidates);
  } catch (err) {
    console.error("Error fetching candidates:", err);
    res.status(500).json({ error: "Server error" });
  }
});

const multer = require("multer");
const path = require("path");

// Store in /uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Candidate resume upload route
router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ fileUrl });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
});



module.exports = router;
