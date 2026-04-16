# SentimentAI — Full-Stack NLP Sentiment Analysis App

A complete academic NLP project built with **React**, **Node.js/Express**, and **Python VADER**.


# Architecture (MVC)

React Frontend (View)
       │  POST /api/analyze
       ▼
Node.js Express (Controller → Model)
       │  HTTP POST to :5001/analyze
       ▼
Python VADER (NLP Service)
       │  { sentiment, confidence, compound }
       ▼
Response bubbles back up


# Installation & Setup

# Prerequisites

- **Node.js** v18+ → https://nodejs.org
- **Python** 3.8+ → https://python.org
- **npm** (comes with Node.js)


# Terminal 1

pip install vaderSentiment textblob transformers torch
python -m textblob.download_corpora
python python_service/nlp_service.py

# Terminal 2

cd backend
npm install
node server.js

# Terminal 3

cd frontend
npm install
npm run dev
