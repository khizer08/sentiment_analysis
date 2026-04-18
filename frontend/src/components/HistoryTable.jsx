const SENTIMENT_TAG = {
  Positive: 'tag-positive',
  Negative: 'tag-negative',
  Neutral:  'tag-neutral',
};

export default function HistoryTable({ entries, onClear, loading }) {
  if (loading) {
    return (
      <div className="glass-card p-12 text-center">
        <div className="inline-block w-8 h-8 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-400 font-body">Loading history...</p>
      </div>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <p className="text-4xl mb-3">📭</p>
        <p className="text-gray-300 font-body font-medium">No analyses yet</p>
        <p className="text-gray-500 text-sm mt-1">Run some analyses on the Analyzer page to see history here.</p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-ink-600">
        <div>
          <h3 className="font-display text-white font-bold">Analysis History</h3>
          <p className="text-gray-500 text-xs mt-0.5">{entries.length} entries stored in memory</p>
        </div>
        <button
          onClick={onClear}
          className="text-xs font-body text-gray-500 hover:text-accent-rose transition-colors border border-ink-600 hover:border-accent-rose px-3 py-1.5 rounded-lg"
        >
          Clear All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ink-600">
              <th className="text-left px-5 py-3 section-label">#</th>
              <th className="text-left px-5 py-3 section-label">Text</th>
              <th className="text-left px-5 py-3 section-label hidden sm:table-cell">Sentiment</th>
              <th className="text-left px-5 py-3 section-label hidden md:table-cell">Confidence</th>
              <th className="text-left px-5 py-3 section-label hidden lg:table-cell">Compound</th>
              <th className="text-left px-5 py-3 section-label hidden sm:table-cell">Time</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, idx) => (
              <tr key={entry.id} className="border-b border-ink-700 hover:bg-ink-700 transition-colors duration-150">
                <td className="px-5 py-4 text-gray-600 font-display text-xs">{String(idx + 1).padStart(2, '0')}</td>
                <td className="px-5 py-4 max-w-xs">
                  <p className="text-gray-200 text-sm font-body truncate" title={entry.text}>{entry.text}</p>
                  <div className="sm:hidden mt-1">
                    <span className={SENTIMENT_TAG[entry.sentiment] || 'tag-neutral'}>{entry.sentiment}</span>
                  </div>
                </td>
                <td className="px-5 py-4 hidden sm:table-cell">
                  <span className={SENTIMENT_TAG[entry.sentiment] || 'tag-neutral'}>{entry.sentiment}</span>
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-ink-700 rounded-full h-1.5">
                      <div
                        className={`h-full rounded-full ${entry.sentiment === 'Positive' ? 'bg-accent-lime' : entry.sentiment === 'Negative' ? 'bg-accent-rose' : 'bg-accent-amber'}`}
                        style={{ width: `${Math.round(entry.confidence * 100)}%` }}
                      />
                    </div>
                    <span className="font-display text-xs text-gray-400">{Math.round(entry.confidence * 100)}%</span>
                  </div>
                </td>
                <td className="px-5 py-4 hidden lg:table-cell">
                  <span className="font-display text-xs text-gray-400">{entry.compound?.toFixed(3) ?? '—'}</span>
                </td>
                <td className="px-5 py-4 hidden sm:table-cell text-gray-500 text-xs font-body">
                  {new Date(entry.analyzedAt).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
