export default function Footer() {
  return (
    <footer className="border-t border-ink-700 mt-auto py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-accent-cyan flex items-center justify-center text-ink-950 font-display font-bold text-xs">S</span>
            <span className="font-display text-sm text-gray-400">SentimentAI</span>
          </div>
          <p className="text-xs text-gray-600 text-center font-body">
            NLP Academic Project · Built with VADER, TextBlob, BERT, Node.js, and React
          </p>
          <p className="text-xs text-gray-600 font-display">
            VADER · TextBlob · BERT · NLTK · Express
          </p>
        </div>
      </div>
    </footer>
  );
}
