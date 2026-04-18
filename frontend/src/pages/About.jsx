const sections = [
  {
    title: 'What is Sentiment Analysis?',
    content: `Sentiment analysis (also called opinion mining) is a Natural Language Processing (NLP) technique used to identify and extract subjective information from text — primarily whether the expressed opinion is positive, negative, or neutral. In this project, we use a hybrid approach by combining multiple models to improve accuracy and reliability of predictions. It is widely used in social media monitoring, customer feedback analysis, market research, and brand reputation management.`,
  },
  {
    title: 'Multi-Model Approach',
    content: `This system uses three different sentiment analysis models:\n\n1. VADER: A rule-based model optimized for social media text, handling emojis, slang, and punctuation.\n2. TextBlob: A polarity-based model that assigns a score between -1 and +1 based on general language sentiment.\n3. BERT (DistilBERT): A deep learning model that understands context and provides highly accurate predictions.\n\nEach model analyzes the same input text independently and produces its own sentiment score and confidence.`,
  },
  {
    title: 'Final Sentiment Calculation',
    content: `The system combines the outputs of all three models to produce a final result. Each model returns a sentiment score (ranging from -1 to +1), and the system calculates the average of these scores to determine the overall sentiment.\n\nFinal classification:\n≥ 0.05 → Positive\n≤ -0.05 → Negative\nOtherwise → Neutral\n\nThe confidence score is calculated as the average confidence of all models, providing a more balanced and reliable prediction.`,
  },
];

const pipeline = [
  { step: '01', title: 'User Input',     desc: 'Text entered in the React frontend' },
  { step: '02', title: 'HTTP POST',      desc: 'Axios sends request to /api/analyze' },
  { step: '03', title: 'Node Controller',desc: 'Validates input, calls the model' },
  { step: '04', title: 'Python Service', desc: 'Node forwards text to Python via HTTP' },
  { step: '05', title: 'NLP Analysis',   desc: 'VADER + TextBlob + BERT run in parallel' },
  { step: '06', title: 'JSON Response',  desc: 'Averaged sentiment & confidence returned' },
];

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <p className="section-label mb-2">About</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">How Sentiment Analysis Works</h1>
        <p className="text-gray-400 font-body text-lg leading-relaxed">
          A deep dive into the NLP techniques and architecture powering this application.
        </p>
      </div>

      <div className="space-y-6 mb-16">
        {sections.map((s, i) => (
          <div key={i} className="glass-card p-6 md:p-8">
            <h2 className="font-display font-bold text-white text-lg mb-3">{s.title}</h2>
            <p className="text-gray-400 font-body text-sm leading-relaxed whitespace-pre-line">{s.content}</p>
          </div>
        ))}
      </div>

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

      <div className="glass-card p-6 md:p-8">
        <h2 className="font-display font-bold text-white text-lg mb-5">Classification Thresholds</h2>
        <div className="space-y-4">
          {[
            { label: 'Positive', rule: 'avg compound ≥ 0.05',         tagClass: 'tag-positive' },
            { label: 'Neutral',  rule: '-0.05 < avg compound < 0.05', tagClass: 'tag-neutral' },
            { label: 'Negative', rule: 'avg compound ≤ -0.05',        tagClass: 'tag-negative' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3 bg-ink-900 rounded-xl border border-ink-600">
              <span className={item.tagClass}>{item.label}</span>
              <code className="text-gray-400 font-display text-xs bg-ink-700 px-3 py-1 rounded-lg">{item.rule}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
