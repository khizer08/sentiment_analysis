/**
 * pythonService.js - Communicates with the Python NLP microservice.
 * Abstracts HTTP calls so the model layer stays clean.
 */

const http = require("http");
const { PYTHON_SERVICE_URL } = require("../config/constants");

/**
 * Sends text to the Python NLP service and returns the parsed result.
 * @param {string} text - The text to analyze.
 * @returns {Promise<Object>} - Sentiment result from Python service.
 */
function analyzeSentiment(text) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ text });

    // Parse the base URL to extract host and port
    const url = new URL(PYTHON_SERVICE_URL);

    const options = {
      hostname: url.hostname,
      port: url.port || 5001,
      path: "/analyze",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(payload),
      },
    };

    const req = http.request(options, (res) => {
      let data = "";

      // Accumulate response chunks
      res.on("data", (chunk) => {
        data += chunk;
      });

      // Parse complete response
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 400) {
            reject(new Error(parsed.error || "Python service error"));
          } else {
            resolve(parsed);
          }
        } catch {
          reject(new Error("Failed to parse Python service response"));
        }
      });
    });

    req.on("error", (err) => {
      reject(new Error(`Cannot reach Python NLP service: ${err.message}`));
    });

    req.setTimeout(8000, () => {
      req.destroy();
      reject(new Error("Python NLP service timed out"));
    });

    // Send the payload
    req.write(payload);
    req.end();
  });
}

module.exports = { analyzeSentiment };
