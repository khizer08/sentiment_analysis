/**
 * constants.js - Application-wide configuration constants
 */

module.exports = {
  // Python NLP microservice URL
  PYTHON_SERVICE_URL: process.env.PYTHON_SERVICE_URL || "http://localhost:5001",

  // Express server port
  PORT: process.env.PORT || 3001,

  // Maximum text length accepted for analysis
  MAX_TEXT_LENGTH: 2000,

  // Sentiment labels
  SENTIMENTS: {
    POSITIVE: "Positive",
    NEGATIVE: "Negative",
    NEUTRAL: "Neutral",
  },
};
