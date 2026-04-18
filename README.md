# SentimentAI — Full-Stack NLP Sentiment Analysis App

A complete academic NLP project built with **React**, **Node.js/Express**, **Python VADER/TextBlob/BERT**, and **React Native (Expo)** for Android.

## Architecture (MVC)

React Frontend (Web)     React Native (Mobile APK)
        │  POST /api/analyze        │
        └──────────┬────────────────┘
                   ▼
        Node.js Express (Controller → Model)
                   │  HTTP POST to :5001/analyze
                   ▼
        Python NLP Service (VADER + TextBlob + BERT)
                   │  { sentiment, confidence, compound, models }
                   ▼
        Response bubbles back up

## Installation & Setup

### Prerequisites
- **Node.js** v18+ → https://nodejs.org
- **Python** 3.8+ → https://python.org
- **npm** (comes with Node.js)

### Terminal 1 — Python NLP Servicecd 
```bash
pip install vaderSentiment textblob transformers torch
python -m textblob.download_corpora
cd python_service
python nlp_service.py
```

### Terminal 2 — Node.js Backend
```bash
cd backend
npm install
node server.js
```

### Terminal 3 — React Web Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

---

## Mobile App (Android APK)

See `mobile/README.md` for full instructions.

### Quick start (Expo Go)
```bash
cd mobile
npm install
npm start
```

### Build APK
```bash
npm install -g eas-cli
eas login
eas init
eas build -p android --profile preview
```

> **Important**: Edit `mobile/src/services/api.js` and set `BASE_URL` to your machine's local IP before building.
