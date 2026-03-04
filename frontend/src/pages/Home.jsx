/**
 * Home.jsx - Landing page explaining the project.
 */

import { Link } from 'react-router-dom';

const features = [
  {
    icon: '🧠',
    title: 'VADER NLP Engine',
    desc: 'Uses Valence Aware Dictionary and sEntiment Reasoner — optimized for social-media text.',
  },
  {
    icon: '📊',
    title: 'Confidence Scoring',
    desc: 'Every analysis includes a normalized confidence score and a full pos/neg/neu breakdown.',
  },
  {
    icon: '⚡',
    title: 'Real-time Analysis',
    desc: 'Results in milliseconds via a REST API connecting React, Node.js, and Python.',
  },
  {
    icon: '📜',
    title: 'History Tracking',
    desc: 'All past analyses are stored server-side so you can compare and review them later.',
  },
];

const stack = ['React.js', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'Python', 'VADER NLP', 'REST API'];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

      {/* Hero */}
      <div className="text-center mb-20 animate-fade-in">
        <div className="inline-flex items-center gap-2 bg-ink-800 border border-ink-600 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse-slow" />
          <span className="text-xs font-display text-gray-400 tracking-wider">NLP ACADEMIC PROJECT</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Understand the{' '}
          <span className="text-accent-cyan">Emotion</span>
          <br />
          behind any Text
        </h1>

        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto font-body leading-relaxed mb-10">
          A full-stack sentiment analysis system powered by VADER NLP. Paste any text and get instant
          classification as Positive, Negative, or Neutral — with a confidence score.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/analyzer" className="btn-primary text-base px-8 py-4 glow-cyan">
            Start Analyzing →
          </Link>
          <Link to="/about" className="btn-ghost text-base px-8 py-4">
            How it works
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
        {features.map((f, i) => (
          <div
            key={i}
            className="glass-card p-6 hover:border-ink-500 transition-colors duration-300"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <span className="text-3xl mb-4 block">{f.icon}</span>
            <h3 className="font-display font-bold text-white text-sm mb-2">{f.title}</h3>
            <p className="text-gray-500 text-sm font-body leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Architecture diagram (simplified) */}
      <div className="glass-card p-6 md:p-10 mb-16">
        <p className="section-label text-center mb-8">System Architecture</p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-2 flex-wrap">
          {[
            { label: 'React Frontend', sub: 'User Interface', color: 'border-accent-cyan text-accent-cyan' },
            { label: '→', sub: 'HTTP POST', color: 'text-gray-600', noBox: true },
            { label: 'Node/Express', sub: 'Backend API', color: 'border-accent-lime text-accent-lime' },
            { label: '→', sub: 'HTTP POST', color: 'text-gray-600', noBox: true },
            { label: 'Python VADER', sub: 'NLP Service', color: 'border-accent-amber text-accent-amber' },
          ].map((item, i) =>
            item.noBox ? (
              <div key={i} className="flex flex-col items-center text-center">
                <span className="font-display text-xl">{item.label}</span>
                <span className="text-xs text-gray-600">{item.sub}</span>
              </div>
            ) : (
              <div key={i} className={`border ${item.color} rounded-xl px-5 py-3 text-center bg-ink-900`}>
                <p className={`font-display font-bold text-sm ${item.color.split(' ')[1]}`}>{item.label}</p>
                <p className="text-gray-500 text-xs mt-0.5">{item.sub}</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Tech stack */}
      <div className="text-center">
        <p className="section-label mb-5">Built With</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {stack.map((tech) => (
            <span
              key={tech}
              className="bg-ink-800 border border-ink-600 rounded-lg px-4 py-2 text-sm font-display text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
