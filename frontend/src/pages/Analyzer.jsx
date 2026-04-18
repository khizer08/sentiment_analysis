import { useState } from 'react';
import SentimentForm from '../components/SentimentForm';
import ResultCard from '../components/ResultCard';

export default function Analyzer() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="section-label mb-2">Sentiment Analyzer</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Analyze your text</h1>
        <p className="text-gray-400 font-body mt-2 text-sm sm:text-base">
          Enter any English text and get an instant sentiment classification using our multi-model NLP pipeline.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <SentimentForm onResult={setResult} onLoading={setIsLoading} />
        </div>

        <div className="flex flex-col">
          {isLoading ? (
            <div className="glass-card p-8 flex flex-col items-center justify-center flex-1 min-h-48">
              <div className="w-10 h-10 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-gray-400 font-body text-sm">Analyzing sentiment…</p>
              <p className="text-gray-600 font-body text-xs mt-1">Running VADER · TextBlob · BERT</p>
            </div>
          ) : result ? (
            <ResultCard result={result} />
          ) : (
            <div className="glass-card p-8 flex flex-col items-center justify-center flex-1 min-h-48 text-center">
              <div className="w-16 h-16 rounded-2xl bg-ink-700 flex items-center justify-center text-3xl mb-4">🔍</div>
              <p className="text-gray-300 font-body font-medium">Awaiting analysis</p>
              <p className="text-gray-600 text-sm mt-1 font-body">Results will appear here after you analyze text.</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: '✅', title: 'Best for',   desc: 'Reviews, tweets, feedback, opinions, social posts' },
          { icon: '🌐', title: 'Language',   desc: 'English text works best with the NLP models' },
          { icon: '⚙️', title: 'Powered by', desc: 'VADER + TextBlob + BERT — multi-model hybrid' },
        ].map((tip, i) => (
          <div key={i} className="flex items-start gap-3 p-4 bg-ink-800 border border-ink-700 rounded-xl">
            <span className="text-xl">{tip.icon}</span>
            <div>
              <p className="font-body text-xs text-gray-400 font-medium">{tip.title}</p>
              <p className="font-body text-xs text-gray-600 mt-0.5">{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
