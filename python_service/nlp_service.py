import contextlib
import io
import json
import os
import sys

os.environ.setdefault("TOKENIZERS_PARALLELISM", "false")
os.environ.setdefault("HF_HUB_DISABLE_PROGRESS_BARS", "1")

from textblob import TextBlob
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

vader = SentimentIntensityAnalyzer()
bert_pipeline = None
skip_bert = os.environ.get("PYTHON_SKIP_BERT", "").strip().lower() in {"1", "true", "yes", "on"}

if not skip_bert:
    try:
        from transformers import logging as transformers_logging
        from transformers import pipeline

        transformers_logging.set_verbosity_error()
        with contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
            bert_pipeline = pipeline(
                "sentiment-analysis",
                model="distilbert/distilbert-base-uncased-finetuned-sst-2-english",
            )
    except Exception:
        bert_pipeline = None


def vader_analysis(text):
    scores = vader.polarity_scores(text)
    compound = scores["compound"]
    return {
        "model": "VADER",
        "score": round(compound, 4),
        "confidence": round(abs(compound), 4),
    }


def textblob_analysis(text):
    polarity = TextBlob(text).sentiment.polarity
    return {
        "model": "TextBlob",
        "score": round(polarity, 4),
        "confidence": round(abs(polarity), 4),
    }


def bert_analysis(text):
    if bert_pipeline is None:
        return None

    result = bert_pipeline(text)[0]
    label = result["label"]
    score = result["score"]
    polarity = score if label == "POSITIVE" else -score

    return {
        "model": "BERT",
        "score": round(polarity, 4),
        "confidence": round(score, 4),
    }


def analyze_sentiment(text):
    results = [vader_analysis(text), textblob_analysis(text)]
    bert_result = bert_analysis(text)
    if bert_result is not None:
        results.append(bert_result)

    avg_score = sum(item["score"] for item in results) / len(results)
    if avg_score > 0.05:
        final_sentiment = "Positive"
    elif avg_score < -0.05:
        final_sentiment = "Negative"
    else:
        final_sentiment = "Neutral"

    avg_confidence = sum(item["confidence"] for item in results) / len(results)
    return {
        "sentiment": final_sentiment,
        "confidence": round(avg_confidence, 4),
        "compound_score": round(avg_score, 4),
        "models": results,
    }


def main():
    text = sys.argv[1] if len(sys.argv) > 1 else ""
    text = text.strip()
    if not text:
        raise ValueError("Text field is required.")

    print(json.dumps(analyze_sentiment(text)))


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(json.dumps({"error": str(exc)}))
        sys.exit(1)
