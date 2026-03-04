"""
nlp_service.py - Python NLP Microservice
Uses VADER (Valence Aware Dictionary and sEntiment Reasoner) for sentiment analysis.
Exposes a simple HTTP server on port 5001.
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# Initialize the VADER sentiment analyzer (loaded once at startup for performance)
analyzer = SentimentIntensityAnalyzer()


def analyze_sentiment(text: str) -> dict:
    """
    Analyzes the sentiment of a given text using VADER.

    VADER compound score rules:
      >= 0.05  → Positive
      <= -0.05 → Negative
      otherwise → Neutral
    """
    scores = analyzer.polarity_scores(text)
    compound = scores["compound"]

    if compound >= 0.05:
        sentiment = "Positive"
        confidence = round((compound + 1) / 2, 4)
    elif compound <= -0.05:
        sentiment = "Negative"
        confidence = round((1 - compound) / 2, 4)
    else:
        sentiment = "Neutral"
        confidence = round(max(0.5, 1 - abs(compound) * 10), 4)

    return {
        "sentiment": sentiment,
        "confidence": confidence,
        "compound_score": round(compound, 4),
        "raw_scores": {
            "positive": round(scores["pos"], 4),
            "negative": round(scores["neg"], 4),
            "neutral": round(scores["neu"], 4),
        }
    }


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
        except json.JSONDecodeError:
            self._send_json({"error": "Invalid JSON body."}, status=400)
        except Exception as e:
            self._send_json({"error": str(e)}, status=500)

    def do_GET(self):
        if self.path == "/health":
            self._send_json({"status": "ok", "service": "NLP Sentiment Service"})
        else:
            self._send_json({"error": "Not found"}, status=404)

    def _send_json(self, data: dict, status: int = 200):
        body = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):
        print(f"[NLP] {self.address_string()} - {format % args}")


if __name__ == "__main__":
    HOST, PORT = "localhost", 5001
    server = HTTPServer((HOST, PORT), SentimentHandler)
    print(f"✅ Python NLP Service running at http://{HOST}:{PORT}")
    server.serve_forever()
