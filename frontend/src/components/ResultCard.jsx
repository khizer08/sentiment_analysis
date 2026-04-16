/**
 * ResultCard.jsx
 * Displays the sentiment analysis result with visual indicators.
 */

// Color and icon mappings for each sentiment type
const SENTIMENT_CONFIG = {
  Positive: {
    tagClass: 'tag-positive',
    glowClass: 'glow-lime',
    borderColor: 'border-accent-lime',
    barColor: 'bg-accent-lime',
    emoji: '😊',
    icon: '↑',
  },
  Negative: {
    tagClass: 'tag-negative',
    glowClass: 'glow-rose',
    borderColor: 'border-accent-rose',
    barColor: 'bg-accent-rose',
    emoji: '😞',
    icon: '↓',
  },
  Neutral: {
    tagClass: 'tag-neutral',
    glowClass: '',
    borderColor: 'border-accent-amber',
    barColor: 'bg-accent-amber',
    emoji: '😐',
    icon: '→',
  },
};

function ConfidenceBar({ value, color }) {
  return (
    <div className="w-full bg-ink-700 rounded-full h-2 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
        style={{ width: `${Math.round(value * 100)}%` }}
      />
    </div>
  );
}

function ScoreRow({ label, value, color }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500 font-body w-16 capitalize">{label}</span>
      <div className="flex-1 bg-ink-700 rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${Math.round(value * 100)}%`, transition: 'width 1s ease-out' }}
        />
      </div>
      <span className="text-xs text-gray-400 font-display w-10 text-right">
        {Math.round(value * 100)}%
      </span>
    </div>
  );
}

export default function ResultCard({ result }) {
  if (!result) return null;

  const config = SENTIMENT_CONFIG[result.sentiment] || SENTIMENT_CONFIG.Neutral;
  const confidencePct = Math.round(result.confidence * 100);

  return (
    <div className={`glass-card border-2 ${config.borderColor} ${config.glowClass} p-6 md:p-8 animate-slide-up`}>
      
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="section-label mb-2">Analysis Result</p>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{config.emoji}</span>
            <div>
              <span className={config.tagClass}>{result.sentiment.toUpperCase()}</span>
              <p className="text-gray-500 text-xs font-body mt-1">
                {new Date(result.analyzedAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        {/* Confidence score circle */}
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#21262d" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.9" fill="none"
                stroke={result.sentiment === 'Positive' ? '#b5ff4d' : result.sentiment === 'Negative' ? '#ff4d6d' : '#ffbe0b'}
                strokeWidth="3"
                strokeDasharray={`${confidencePct} ${100 - confidencePct}`}
                strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 1s ease-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display font-bold text-white text-sm">{confidencePct}%</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Confidence</p>
        </div>
      </div>

      {/* Analyzed text preview */}
      <div className="mb-5 p-3 bg-ink-900 rounded-xl border border-ink-600">
        <p className="section-label mb-1">Analyzed Text</p>
        <p className="text-gray-300 text-sm font-body leading-relaxed line-clamp-3">
          "{result.text}"
        </p>
      </div>

      {/* Scores breakdown */}
      {result.details && (
        <div className="mb-5 space-y-2">
          <p className="section-label mb-3">Score Breakdown</p>
          <ScoreRow label="Positive" value={result.details.positive} color="bg-accent-lime" />
          <ScoreRow label="Neutral" value={result.details.neutral} color="bg-accent-amber" />
          <ScoreRow label="Negative" value={result.details.negative} color="bg-accent-rose" />
        </div>
      )}

      {/* Compound score */}
      <div className="pt-4 border-t border-ink-600 flex items-center justify-between text-xs">
        <span className="text-gray-500 font-body">Compound Score</span>
        <span className="font-display text-white bg-ink-700 px-3 py-1 rounded-lg">
          {result.compound?.toFixed(4) ?? 'N/A'}
        </span>
      </div>
    </div>
  );
}
