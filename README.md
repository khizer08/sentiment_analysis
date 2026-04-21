# SentimentAI — Full-Stack NLP Sentiment Analysis App

A complete academic NLP project built with **React**, **Node.js/Express**, **Python VADER/TextBlob/BERT**, and **React Native (Expo)** for Android.

## Current Architecture (Single Backend Service)

React Frontend (Web)     React Native (Mobile APK)
        │  POST /api/analyze        │
        └──────────┬────────────────┘
                   ▼
        Node.js Express (Controller → Model)
                   │  Internal spawn() call
                   ▼
        Python NLP Script (VADER + TextBlob + optional BERT)
                   │  { sentiment, confidence, compound_score, models }
                   ▼
        Response bubbles back up

## Installation & Setup

### Prerequisites
- **Node.js** v18+ → https://nodejs.org
- **Python** 3.8+ → https://python.org
- **npm** (comes with Node.js)

## One-time Setup

### 1) Python dependencies
```bash
cd python_service
pip install -r requirements.txt
python -m textblob.download_corpora
```

### 2) Backend dependencies
```bash
cd backend
npm install
```

### 3) Frontend dependencies
```bash
cd frontend
npm install
```

## Run the Project

### Terminal 1 — Backend (includes Python execution internally)
```bash
cd backend
node server.js
```

### Terminal 2 — React Web Frontend
```bash
cd frontend
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
cd mobile
npm install -g eas-cli
eas login
eas init
eas env:create --name EXPO_PUBLIC_API_BASE_URL --value https://sentiment-analysis-mlwn.onrender.com
eas build -p android --profile preview
```

> **Important**: Edit `mobile/src/services/api.js` and set `BASE_URL` to your machine's local IP before building.

## Notes

- You no longer need to run a separate Python HTTP server on `localhost:5001`.
- Backend routes and responses remain unchanged.
- If Python is not auto-detected, set `PYTHON_EXECUTABLE` before starting backend.
  - Windows PowerShell example:
    ```powershell
    $env:PYTHON_EXECUTABLE="python"
    node server.js
    ```