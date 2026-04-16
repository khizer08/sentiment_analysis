from http.server import HTTPServer, BaseHTTPRequestHandler
import json

# VADER
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# TextBlob
from textblob import TextBlob

# Transformers (DistilBERT)
from transformers import pipeline

# Initialize models
vader = SentimentIntensityAnalyzer()
bert_pipeline = pipeline("sentiment-analysis")

# -----------------------------
# Individual Model Functions
# -----------------------------

def vader_analysis(text):
    scores = vader.polarity_scores(text)
    compound = scores["compound"]

    if compound >= 0.05:
        sentiment = "Positive"
    elif compound <= -0.05:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    return {
        "model": "VADER",
        "score": compound,
        "confidence": round((abs(compound)), 4)
    }


def textblob_analysis(text):
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity  # -1 to +1

    if polarity > 0:
        sentiment = "Positive"
    elif polarity < 0:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    return {
        "model": "TextBlob",
        "score": round(polarity, 4),
        "confidence": round(abs(polarity), 4)
    }


def bert_analysis(text):
    result = bert_pipeline(text)[0]

    label = result["label"]
    score = result["score"]

    if label == "POSITIVE":
        polarity = score
        sentiment = "Positive"
    else:
        polarity = -score
        sentiment = "Negative"

    return {
        "model": "BERT",
        "score": round(polarity, 4),
        "confidence": round(score, 4)
    }


# -----------------------------
# Combined Logic
# -----------------------------

def analyze_sentiment(text):
    vader_res = vader_analysis(text)
    textblob_res = textblob_analysis(text)
    bert_res = bert_analysis(text)

    results = [vader_res, textblob_res, bert_res]

    # Average score
    avg_score = sum(r["score"] for r in results) / len(results)

    # Final sentiment
    if avg_score > 0.05:
        final_sentiment = "Positive"
    elif avg_score < -0.05:
        final_sentiment = "Negative"
    else:
        final_sentiment = "Neutral"

    # Average confidence
    avg_confidence = sum(r["confidence"] for r in results) / len(results)

    return {
        "sentiment": final_sentiment,
        "confidence": round(avg_confidence, 4),
        "compound_score": round(avg_score, 4),
        "models": results
    }


# -----------------------------
# HTTP Server (same as yours)
# -----------------------------

class SentimentHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self):
        if self.path != "/analyze":
            self._send_json({"error": "Not found"}, status=404)
            return

        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length)

        try:
            data = json.loads(body)
            text = data.get("text", "").strip()

            if not text:
                self._send_json({"error": "Text field is required."}, status=400)
                return

            result = analyze_sentiment(text)
            self._send_json(result, status=200)

        except Exception as e:
            self._send_json({"error": str(e)}, status=500)

    def _send_json(self, data, status=200):
        body = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    HOST, PORT = "localhost", 5001
    server = HTTPServer((HOST, PORT), SentimentHandler)
    print(f"Running on http://{HOST}:{PORT}")
    server.serve_forever()