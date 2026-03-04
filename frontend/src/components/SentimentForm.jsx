/**
 * SentimentForm.jsx
 * Main text input form for sentiment analysis.
 * Handles form state, validation, and API submission.
 */

import { useState } from 'react';
import axios from 'axios';

const EXAMPLE_PHRASES = [
  "I absolutely love this product, it's incredible!",
  "The service was terrible and I'm very disappointed.",
  "The package arrived on Tuesday as expected.",
  "This is the best day of my entire life!",
  "I'm not sure how I feel about this decision.",
];

export default function SentimentForm({ onResult, onLoading }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const charLimit = 1000;

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }
    setError('');
    setIsLoading(true);
    onLoading(true);

    try {
      const response = await axios.post('/api/analyze', { text: text.trim() });
      onResult(response.data.data);
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        (err.code === 'ERR_NETWORK'
          ? 'Cannot connect to backend. Is the server running?'
          : 'Analysis failed. Please try again.');
      setError(msg);
      onResult(null);
    } finally {
      setIsLoading(false);
      onLoading(false);
    }
  };

  const handleExample = (phrase) => {
    setText(phrase);
    setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="glass-card p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="section-label">Input Text</p>
        <span className={`text-xs font-display ${text.length > charLimit * 0.9 ? 'text-accent-rose' : 'text-gray-500'}`}>
          {text.length}/{charLimit}
        </span>
      </div>

      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => {
          if (e.target.value.length <= charLimit) setText(e.target.value);
          if (error) setError('');
        }}
        onKeyDown={handleKeyDown}
        placeholder="Type or paste your text here..."
        rows={5}
        className="w-full bg-ink-900 border border-ink-600 rounded-xl px-4 py-3
                   text-gray-100 font-body text-sm placeholder-gray-600
                   focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan
                   transition-all duration-200 resize-none"
      />

      {/* Error message */}
      {error && (
        <p className="mt-2 text-accent-rose text-sm font-body flex items-center gap-1.5">
          <span>⚠</span> {error}
        </p>
      )}

      {/* Example phrases */}
      <div className="mt-4">
        <p className="section-label mb-2">Try an example:</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_PHRASES.map((phrase, i) => (
            <button
              key={i}
              onClick={() => handleExample(phrase)}
              className="text-xs font-body text-gray-400 border border-ink-600 rounded-lg px-3 py-1.5
                         hover:border-accent-cyan hover:text-accent-cyan transition-all duration-200
                         text-left max-w-xs truncate"
            >
              "{phrase.slice(0, 40)}{phrase.length > 40 ? '…' : ''}"
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-xs text-gray-600 hidden sm:block">Ctrl+Enter to analyze</p>
        <div className="flex gap-3 ml-auto">
          {text && (
            <button
              onClick={() => { setText(''); setError(''); }}
              className="btn-ghost text-sm"
            >
              Clear
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={isLoading || !text.trim()}
            className="btn-primary flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Analyzing…
              </>
            ) : (
              'Analyze →'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
