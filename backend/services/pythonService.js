/**
 * pythonService.js - Executes local Python NLP script.
 * Keeps the same response contract as the previous microservice call.
 */

const path = require("path");
const { spawn } = require("child_process");

const PYTHON_SCRIPT_PATH = path.join(process.cwd(), "python_service", "nlp_service.py");
const PYTHON_TIMEOUT_MS = 30000;
const PYTHON_FALLBACK_TIMEOUT_MS = 12000;

function parseAndValidatePayload(rawOutput) {
  const output = (rawOutput || "").trim();
  if (!output) {
    throw new Error("Python NLP service returned empty output");
  }

  let parsed;
  try {
    parsed = JSON.parse(output);
  } catch {
    throw new Error("Failed to parse Python service response");
  }

  if (parsed.error) {
    throw new Error(parsed.error);
  }

  const requiredFields = ["sentiment", "confidence", "compound_score", "models"];
  const hasAllFields = requiredFields.every((field) => Object.prototype.hasOwnProperty.call(parsed, field));
  if (!hasAllFields) {
    throw new Error("Python service response missing required fields");
  }

  return parsed;
}

function runPython(text, executable, options = {}) {
  const timeoutMs = options.timeoutMs || PYTHON_TIMEOUT_MS;
  const env = { ...process.env, ...(options.env || {}) };

  return new Promise((resolve, reject) => {
    const child = spawn(executable, [PYTHON_SCRIPT_PATH, text], {
      windowsHide: true,
      env,
    });

    let stdout = "";
    let stderr = "";
    let settled = false;

    const timeout = setTimeout(() => {
      if (!settled) {
        settled = true;
        child.kill();
        reject(new Error("Python NLP service timed out"));
      }
    }, timeoutMs);

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      reject(error);
    });

    child.on("close", (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);

      if (code !== 0) {
        const stdoutTrimmed = (stdout || "").trim();
        if (stdoutTrimmed) {
          try {
            const parsed = JSON.parse(stdoutTrimmed);
            reject(new Error(parsed.error || stdoutTrimmed));
            return;
          } catch {
            reject(new Error(stdoutTrimmed));
            return;
          }
        }
        reject(new Error(stderr.trim() || `Python process exited with code ${code}`));
        return;
      }

      try {
        const parsed = parseAndValidatePayload(stdout);
        resolve(parsed);
      } catch (error) {
        reject(error);
      }
    });
  });
}

/**
 * Executes the Python NLP service script and returns parsed sentiment output.
 * @param {string} text - The text to analyze.
 * @returns {Promise<Object>} - Sentiment result from Python execution.
 */
async function analyzeSentiment(text) {
  const configuredExecutable = process.env.PYTHON_EXECUTABLE;
  if (configuredExecutable) {
    try {
      return await runPython(text, configuredExecutable);
    } catch (error) {
      if (!String(error && error.message).includes("timed out")) {
        throw error;
      }
      return runPython(text, configuredExecutable, {
        timeoutMs: PYTHON_FALLBACK_TIMEOUT_MS,
        env: { PYTHON_SKIP_BERT: "1" },
      });
    }
  }

  const candidates = process.platform === "win32" ? ["python", "py"] : ["python3", "python"];
  let lastError = null;

  for (const executable of candidates) {
    try {
      try {
        return await runPython(text, executable);
      } catch (error) {
        if (!String(error && error.message).includes("timed out")) {
          throw error;
        }
        return await runPython(text, executable, {
          timeoutMs: PYTHON_FALLBACK_TIMEOUT_MS,
          env: { PYTHON_SKIP_BERT: "1" },
        });
      }
    } catch (error) {
      const message = error && error.message ? error.message : "";
      const isMissingCommand = message.includes("ENOENT");
      if (!isMissingCommand) {
        throw error;
      }
      lastError = error;
    }
  }

  throw new Error(`Cannot execute Python runtime: ${lastError ? lastError.message : "No interpreter found"}`);
}

module.exports = { analyzeSentiment };
