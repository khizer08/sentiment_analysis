/**
 * History.jsx - Displays and manages analysis history.
 */

import { useState, useEffect } from 'react';
import axios from 'axios';
import HistoryTable from '../components/HistoryTable';

export default function History() {
  const [entries, setEntries] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHistory = async () => {
    setLoading(true);
    setError('');
    try {
      const [histRes, statsRes] = await Promise.all([
        axios.get('/api/history'),
        axios.get('/api/stats'),
      ]);
      setEntries(histRes.data.data);
      setStats(statsRes.data.data);
    } catch {
      setError('Could not load history. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    if (!window.confirm('Clear all history? This cannot be undone.')) return;
    try {
      await axios.delete('/api/history');
      setEntries([]);
      setStats({ total: 0, breakdown: { positive: 0, negative: 0, neutral: 0 } });
    } catch {
      setError('Failed to clear history.');
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="section-label mb-2">History</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Past Analyses
          </h1>
        </div>
        <button onClick={fetchHistory} className="btn-ghost text-sm self-start sm:self-auto">
          ↻ Refresh
        </button>
      </div>

      {/* Stats cards */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, color: 'text-white' },
            { label: 'Positive', value: stats.breakdown.positive, color: 'text-accent-lime' },
            { label: 'Negative', value: stats.breakdown.negative, color: 'text-accent-rose' },
            { label: 'Neutral', value: stats.breakdown.neutral, color: 'text-accent-amber' },
          ].map((s) => (
            <div key={s.label} className="glass-card p-4 text-center">
              <p className={`font-display text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-gray-500 text-xs mt-1 font-body">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-ink-800 border border-accent-rose rounded-xl text-accent-rose text-sm font-body">
          ⚠ {error}
        </div>
      )}

      {/* Table */}
      <HistoryTable entries={entries} onClear={handleClear} loading={loading} />
    </div>
  );
}
