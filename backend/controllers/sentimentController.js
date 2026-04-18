/**
 * sentimentController.js - Controller layer (MVC)
 *
 * Handles all incoming HTTP requests, delegates to the Model,
 * and sends back well-structured JSON responses.
 */

const { processAnalysis, getHistory, clearHistory, getStats } = require("../models/sentimentModel");

/**
 * POST /api/analyze
 * Accepts { text } and returns sentiment result.
 */
async function analyze(req, res) {
  try {
    const { text } = req.body;

    // Delegate business logic to the model
    const result = await processAnalysis(text);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    // Distinguish client errors (4xx) from server errors (5xx)
    const isClientError =
      error.message.includes("non-empty") ||
      error.message.includes("blank") ||
      error.message.includes("characters");

    return res.status(isClientError ? 400 : 500).json({
      success: false,
      error: error.message || "An unexpected error occurred.",
    });
  }
}

/**
 * GET /api/history
 * Returns all previous analyses.
 */
function history(req, res) {
  try {
    const records = getHistory();
    return res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

/**
 * DELETE /api/history
 * Clears all history entries.
 */
function deleteHistory(req, res) {
  try {
    clearHistory();
    return res.status(200).json({ success: true, message: "History cleared." });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

/**
 * GET /api/stats
 * Returns breakdown stats of analyses.
 */
function stats(req, res) {
  try {
    const data = getStats();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { analyze, history, deleteHistory, stats };
