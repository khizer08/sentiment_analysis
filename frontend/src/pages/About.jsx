/**
 * About.jsx - Explains sentiment analysis, NLP concepts, and VADER.
 */

const sections = [
  {
    title: 'What is Sentiment Analysis?',
    content: `Sentiment analysis (also called opinion mining) is a Natural Language Processing (NLP) technique
    used to identify and extract subjective information from text — primarily whether the expressed opinion
    is positive, negative, or neutral. It is widely used in social media monitoring, customer feedback
    analysis, market research, and brand reputation management.`,
  },
  {
    title: 'How VADER Works',
    content: `VADER (Valence Aware Dictionary and sEntiment Reasoner) is a lexicon and rule-based sentiment 
    analysis tool specifically attuned to sentiments expressed in social media. Unlike ML models that 
    require training, VADER uses a curated dictionary of words each associated with a sentiment score,
    combined with grammatical heuristics like punctuation emphasis, capitalization, and degree modifiers.`,
  },
  {
    title: 'The Compound Score',
    content: `VADER outputs four values: pos, neg, neu (proportion scores that sum to 1.0) and a compound
    score — a single normalized value between -1 (most negative) and +1 (most positive). This system uses
    the compound score to classify text: ≥ 0.05 → Positive, ≤ -0.05 → Negative, anything in between → Neutral.
    The confidence score is derived by normalizing the compound to a 0-1 scale.`,
  },
];

const pipeline = [
  { step: '01', title: 'User Input', desc: 'Text entered in the React frontend' },
  { step: '02', title: 'HTTP POST', desc: 'Axios sends request to /api/analyze' },
  { step: '03', title: 'Node Controller', desc: 'Validates input, calls the model' },
  { step: '04', title: 'Python Service', desc: 'Node forwards text to Python via HTTP' },
  { step: '05', title: 'VADER Analysis', desc: 'SentimentIntensityAnalyzer returns scores' },
  { step: '06', title: 'JSON Response', desc: 'Sentiment, confidence, and compound returned' },
];

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <p className="section-label mb-2">About</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
          How Sentiment Analysis Works
        </h1>
        <p className="text-gray-400 font-body text-lg leading-relaxed">
          A deep dive into the NLP techniques and architecture powering this application.
        </p>
      </div>

      {/* Content sections */}
      <div className="space-y-6 mb-16">
        {sections.map((s, i) => (
          <div key={i} className="glass-card p-6 md:p-8">
            <h2 className="font-display font-bold text-white text-lg mb-3">{s.title}</h2>
            <p className="text-gray-400 font-body text-sm leading-relaxed">{s.content}</p>
          </div>
        ))}
      </div>

      {/* Pipeline steps */}
      <div className="mb-16">
        <p className="section-label mb-6 text-center">Request Pipeline</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pipeline.map((item) => (
            <div key={item.step} className="glass-card p-5 hover:border-ink-500 transition-colors">
              <span className="font-display text-xs text-gray-600">{item.step}</span>
              <h3 className="font-display font-bold text-white mt-1 mb-1">{item.title}</h3>
              <p className="text-gray-500 text-sm font-body">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sentiment thresholds */}
      <div className="glass-card p-6 md:p-8">
        <h2 className="font-display font-bold text-white text-lg mb-5">Classification Thresholds</h2>
        <div className="space-y-4">
          {[
            { label: 'Positive', rule: 'compound ≥ 0.05', color: 'text-accent-lime', bg: 'bg-accent-lime', tagClass: 'tag-positive' },
            { label: 'Neutral', rule: '-0.05 < compound < 0.05', color: 'text-accent-amber', bg: 'bg-accent-amber', tagClass: 'tag-neutral' },
            { label: 'Negative', rule: 'compound ≤ -0.05', color: 'text-accent-rose', bg: 'bg-accent-rose', tagClass: 'tag-negative' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3 bg-ink-900 rounded-xl border border-ink-600">
              <span className={item.tagClass}>{item.label}</span>
              <code className="text-gray-400 font-display text-xs bg-ink-700 px-3 py-1 rounded-lg">
                {item.rule}
              </code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
