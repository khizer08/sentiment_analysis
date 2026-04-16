/**
 * sentimentModel.js - Model layer (MVC)
 *
 * Responsibilities:
 *  - Validate and sanitize input text.
 *  - Delegate to the Python service.
 *  - Format and return structured results.
 *  - Maintain in-memory history (simulates a data store).
 */

const { analyzeSentiment } = require("../services/pythonService");
const { MAX_TEXT_LENGTH } = require("../config/constants");

// In-memory store for analysis history (replace with DB for production)
const historyStore = [];

/**
 * Validates the input text and throws descriptive errors if invalid.
 * @param {string} text
 */
function validateText(text) {
  if (!text || typeof text !== "string") {
    throw new Error("Text must be a non-empty string.");
  }
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    throw new Error("Text cannot be blank or whitespace only.");
  }
  if (trimmed.length > MAX_TEXT_LENGTH) {
    throw new Error(`Text must be under ${MAX_TEXT_LENGTH} characters.`);
  }
  return trimmed;
}

/**
 * Main model method: validates text, calls Python service, stores and returns result.
 * @param {string} rawText - Raw text from the user.
 * @returns {Promise<Object>} - Structured sentiment result.
 */
async function processAnalysis(rawText) {
  // Step 1: Validate
  const text = validateText(rawText);

  // Step 2: Call Python NLP service via pythonService
  const nlpResult = await analyzeSentiment(text);

  // Step 3: Build a structured result object
  const result = {
  id: Date.now(),
  text,
  sentiment: nlpResult.sentiment,
  confidence: nlpResult.confidence,
  compound: nlpResult.compound_score,
  models: nlpResult.models,
  analyzedAt: new Date().toISOString(),
};

  // Step 4: Persist to history (newest first)
  historyStore.unshift(result);

  // Keep history capped at 100 entries to avoid memory bloat
  if (historyStore.length > 100) {
    historyStore.pop();
  }

  return result;
}

/**
 * Retrieve all past analyses.
 * @returns {Array} - History array (newest first).
 */
function getHistory() {
  return historyStore;
}

/**
 * Clear all history entries.
 */
function clearHistory() {
  historyStore.length = 0;
}

module.exports = { processAnalysis, getHistory, clearHistory };
