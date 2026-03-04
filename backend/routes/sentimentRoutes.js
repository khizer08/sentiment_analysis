/**
 * sentimentRoutes.js - Express router for sentiment API endpoints.
 */

const express = require("express");
const router = express.Router();
const { analyze, history, deleteHistory } = require("../controllers/sentimentController");

// POST /api/analyze   → Run sentiment analysis on provided text
router.post("/analyze", analyze);

// GET /api/history    → Get all previous analyses
router.get("/history", history);

// DELETE /api/history → Clear all history
router.delete("/history", deleteHistory);

module.exports = router;
