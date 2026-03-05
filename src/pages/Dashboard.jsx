import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import API from '../api';
import { LayoutDashboard, Star, Target, Zap, BarChart2, ChevronRight, Sparkles, Map } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ user: null, recommendations: [], assessment: null, savedCareers: [] });

  useEffect(() => {
    Promise.all([
      API.get('/profile'),
      API.get('/careers/recommendations'),
      API.get('/assessment/results'),
      API.get('/careers/saved/list')
    ]).then(([u, r, a, s]) => {
      setData({ user: u.data.user, recommendations: r.data, assessment: a.data, savedCareers: s.data });
      setLoading(false);
    });
  }, []);

  if (loading) return <AppLayout><div className="loading">Preparing Dashboard...</div></AppLayout>;

  const hasResults = data.assessment;
  const assessmentData = hasResults ? [
    { name: 'Logical', val: data.assessment.logical_score },
    { name: 'Technical', val: data.assessment.technical_score },
    { name: 'Creativity', val: data.assessment.creativity_score },
    { name: 'Communication', val: data.assessment.communication_score }
  ] : [];

  return (
    <AppLayout>
      <div className="page-container">
        <div className="dashboard-welcome">
          <div>
            <h1>Hi, {data.user?.name.split(' ')[0]} 👋</h1>
            <p className="page-sub">Track your career journey and recommendations here.</p>
          </div>
          <button className="btn-ai-chat" onClick={() => navigate('/chatbot')}><Sparkles size={18} /> Ask AI Advisor</button>
        </div>

        <div className="dashboard-grid">
          <div className="dash-col-main">
            <div className="dash-card">
              <div className="card-header">
                <h3><Target size={20} /> Top Career Matches</h3>
                <button className="view-all" onClick={() => navigate('/careers')}>View All <ChevronRight size={16}/></button>
              </div>
              <div className="dash-career-list">
                {data.recommendations.slice(0, 3).map(c => (
                  <div key={c.id} className="dash-career-item" onClick={() => navigate(`/roadmap/${c.id}`)}>
                    <span className="icon">{c.icon}</span>
                    <div className="info"><strong>{c.title}</strong><span>{c.matchScore}% Match</span></div>
                    <ChevronRight size={18} />
                  </div>
                ))}
              </div>
            </div>

            <div className="dash-card">
              <h3><BarChart2 size={20} /> Skills Assessment</h3>
              <div className="dash-chart-wrap">
                {hasResults ? (
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={assessmentData} layout="vertical">
                      <XAxis type="number" hide domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={100} stroke="#94a3b8" />
                      <Bar dataKey="val" radius={[0, 4, 4, 0]}>
                        {assessmentData.map((e, i) => <Cell key={i} fill={['#6366f1', '#10b981', '#f59e0b', '#ec4899'][i]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="empty-dash-chart" onClick={() => navigate('/assessment')}>
                    <button>Complete Assessment to see details</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="dash-col-side">
            <div className="dash-card">
              <h3><Zap size={20} /> Quick Stats</h3>
              <div className="stat-row"><span>Saved Paths</span><strong>{data.savedCareers.length}</strong></div>
              <div className="stat-row"><span>Tests Taken</span><strong>{hasResults ? 1 : 0}</strong></div>
              <div className="stat-row"><span>Courses Explored</span><strong>12</strong></div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
