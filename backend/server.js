/**
 * server.js - Express application entry point.
 * Sets up middleware, mounts routes, and starts the HTTP server.
 */

const express = require("express");
const cors = require("cors");
const { PORT } = require("./config/constants");
const sentimentRoutes = require("./routes/sentimentRoutes");

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────

// Allow cross-origin requests from the React dev server (port 5173)
app.use(cors({ origin: "*" }));

// Parse incoming JSON request bodies
app.use(express.json());

// Simple request logger
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ── Routes ────────────────────────────────────────────────────────────────────

// Mount all sentiment API routes under /api
app.use("/api", sentimentRoutes);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "Sentiment Analysis Backend" });
});

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ── Start ─────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
  console.log(`   POST /api/analyze   → Analyze sentiment`);
  console.log(`   GET  /api/history   → Retrieve history`);
  console.log(`   DELETE /api/history → Clear history`);
});
