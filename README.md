# SentimentAI — Full-Stack NLP Sentiment Analysis App

A complete academic NLP project built with **React**, **Node.js/Express**, and **Python VADER**.

---

## 📁 Project Structure

```
sentiment-analysis-app/
├── backend/
│   ├── config/
│   │   └── constants.js          # Port, service URLs, config
│   ├── controllers/
│   │   └── sentimentController.js # HTTP request handlers (Controller layer)
│   ├── models/
│   │   └── sentimentModel.js     # Business logic + in-memory history (Model layer)
│   ├── routes/
│   │   └── sentimentRoutes.js    # Express route definitions
│   ├── services/
│   │   └── pythonService.js      # HTTP client for Python NLP service
│   ├── package.json
│   └── server.js                 # Express server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Responsive navigation
│   │   │   ├── SentimentForm.jsx # Text input form
│   │   │   ├── ResultCard.jsx    # Analysis result display
│   │   │   ├── HistoryTable.jsx  # History list view
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── Analyzer.jsx      # Main analyzer page
│   │   │   ├── History.jsx       # History page
│   │   │   └── About.jsx         # NLP explanation page
│   │   ├── styles/
│   │   │   └── global.css        # Tailwind + custom CSS
│   │   ├── App.jsx               # Router setup
│   │   └── main.jsx              # React entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── python_service/
    └── nlp_service.py            # VADER HTTP microservice
```

---

## 🏗️ Architecture (MVC)

```
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
```

---

## ⚙️ Installation & Setup

### Prerequisites

- **Node.js** v18+ → https://nodejs.org
- **Python** 3.8+ → https://python.org
- **npm** (comes with Node.js)

---

### Step 1 — Install Python NLP Service Dependencies

```bash
cd sentiment-analysis-app/python_service

pip install vaderSentiment
```

> If using Python 3 on macOS/Linux, use `pip3` instead of `pip`.

---

### Step 2 — Install Backend Dependencies

```bash
cd sentiment-analysis-app/backend

npm install
```

---

### Step 3 — Install Frontend Dependencies

```bash
cd sentiment-analysis-app/frontend

npm install
```

---

## 🚀 Running the Application

You need **3 terminals** running simultaneously.

### Terminal 1 — Start Python NLP Service

```bash
cd sentiment-analysis-app/python_service

python nlp_service.py
```

Expected output:
```
✅ Python NLP Service running at http://localhost:5001
   Health check: http://localhost:5001/health
   Analyze endpoint: POST http://localhost:5001/analyze
```

---

### Terminal 2 — Start Node.js Backend

```bash
cd sentiment-analysis-app/backend

node server.js
# or for auto-reload during development:
npx nodemon server.js
```

Expected output:
```
✅ Backend server running at http://localhost:3001
   API base: http://localhost:3001/api
```

---

### Terminal 3 — Start React Frontend

```bash
cd sentiment-analysis-app/frontend

npm run dev
```

Expected output:
```
  VITE v4.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

---

### ✅ Open in Browser

Navigate to: **http://localhost:5173**

---

## 🌐 API Reference

### POST `/api/analyze`

Analyze sentiment of input text.

**Request:**
```json
{
  "text": "I absolutely love this product!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sentiment": "Positive",
    "confidence": 0.9012,
    "compound": 0.8016,
    "details": {
      "positive": 0.6,
      "negative": 0.0,
      "neutral": 0.4
    },
    "text": "I absolutely love this product!",
    "analyzedAt": "2024-01-15T10:30:00.000Z",
    "id": "1705314600000"
  }
}
```

---

### GET `/api/history`

Returns list of previous analyses.

**Query params:** `?limit=50` (default 50)

---

### DELETE `/api/history`

Clears all history from server memory.

---

### GET `/api/stats`

Returns sentiment statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 15,
    "breakdown": {
      "positive": 8,
      "negative": 4,
      "neutral": 3
    }
  }
}
```

---

## 🧪 VADER Classification Rules

| Compound Score    | Sentiment |
|-------------------|-----------|
| ≥ 0.05            | Positive  |
| > -0.05 and < 0.05| Neutral   |
| ≤ -0.05           | Negative  |

---

## 🛠️ Troubleshooting

**"Python NLP service is not running"**
→ Make sure Terminal 1 is running `python nlp_service.py`

**"Cannot connect to backend"**
→ Make sure Terminal 2 is running `node server.js`

**Port already in use**
→ Change `PORT` in `backend/config/constants.js` or kill existing process

**`vaderSentiment` not found**
→ Run `pip install vaderSentiment` or `pip3 install vaderSentiment`

---

## 🎓 Academic Notes

This project demonstrates:
- **MVC Architecture** in a Node.js/Express backend
- **Microservices pattern** with a dedicated Python NLP service
- **REST API design** for frontend-backend communication
- **VADER NLP** — a rule-based sentiment analysis algorithm
- **React functional components** with hooks and React Router
- **Responsive UI** with Tailwind CSS mobile-first utilities
