import { useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import API from '../api';
import { BarChart2, CheckCircle2, ChevronRight, RotateCcw, Award } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Assessment() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/assessment/questions').then(({ data }) => {
      setQuestions(data);
      API.get('/assessment/results').then(res => {
        if (res.data) setResults(res.data);
        setLoading(false);
      });
    });
  }, []);

  const handleSelect = (idx) => {
    setAnswers({ ...answers, [current]: idx });
    if (current < questions.length - 1) setTimeout(() => setCurrent(current + 1), 300);
  };

  const handleSubmit = async () => {
    try {
      const { data } = await API.post('/assessment/submit', { answers });
      setResults(data.results);
      toast.success('Assessment completed!');
    } catch {
      toast.error('Failed to submit assessment');
    }
  };

  if (loading) return <AppLayout><div className="loading">Analyzing...</div></AppLayout>;

  if (results) return (
    <AppLayout>
      <div className="page-container results-page">
        <div className="results-header">
          <Award size={64} className="award-icon" />
          <h1>Analysis Complete!</h1>
          <p>We've analyzed your strengths based on your responses.</p>
        </div>

        <div className="score-grid">
          {[
            { label: 'Logical Reasoning', score: results.logical_score, color: '#6366f1' },
            { label: 'Technical Interest', score: results.technical_score, color: '#10b981' },
            { label: 'Creativity', score: results.creativity_score, color: '#f59e0b' },
            { label: 'Communication', score: results.communication_score, color: '#ec4899' }
          ].map((s, i) => (
            <div key={i} className="score-card">
              <div className="score-ring" style={{ '--score': s.score, '--color': s.color }}>
                <span>{s.score}%</span>
              </div>
              <p>{s.label}</p>
            </div>
          ))}
        </div>

        <div className="action-row centered">
          <button className="btn-primary-action" onClick={() => window.location.href='/careers'}>See Career Matches <ChevronRight /></button>
          <button className="btn-outline" onClick={() => setResults(null)}><RotateCcw size={18} /> Retake Test</button>
        </div>
      </div>
    </AppLayout>
  );

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <AppLayout>
      <div className="page-container assessment-page">
        <div className="quiz-progress">
          <span>Question {current + 1} of {questions.length}</span>
          <div className="prog-bar-bg"><div className="prog-bar-fill" style={{ width: `${progress}%` }}></div></div>
        </div>

        <div className="question-card">
          <div className="category-tag">{q.category}</div>
          <h2>{q.question}</h2>
          <div className="options-grid">
            {q.options.map((opt, i) => (
              <button key={i} className={`option-btn ${answers[current] === i ? 'selected' : ''}`} onClick={() => handleSelect(i)}>
                <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
                <span className="opt-text">{opt}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="quiz-footer">
          <button className="btn-secondary" disabled={current === 0} onClick={() => setCurrent(current - 1)}>Previous</button>
          {current === questions.length - 1 ? (
            <button className="btn-primary-action" onClick={handleSubmit}>View My Results</button>
          ) : (
            <button className="btn-primary" onClick={() => setCurrent(current + 1)}>Next Question <ChevronRight /></button>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
