import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import API from '../api';
import { Target, TrendingUp, Map, Star, Search, Filter, Bookmark, Info } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Careers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/careers/recommendations').then(({ data }) => {
      setCareers(data);
      setLoading(false);
    });
  }, []);

  const handleSave = async (id) => {
    await API.post('/careers/save', { career_id: id });
    toast.success('Career saved to your dashboard!');
  };

  const categories = ['All', 'Technology', 'Data & AI', 'Design', 'Management'];
  const filtered = filter === 'All' ? careers : careers.filter(c => c.category === filter);

  if (loading) return <AppLayout><div className="loading">Finding your match...</div></AppLayout>;

  return (
    <AppLayout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title"><Target size={28} /> Career Recommendations</h1>
            <p className="page-sub">AI-powered pathway suggestions based on your profile and aptitude.</p>
          </div>
          <div className="filter-tabs">
            {categories.map(c => (
              <button key={c} className={`tab ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>{c}</button>
            ))}
          </div>
        </div>

        <div className="careers-grid">
          {filtered.map((career) => (
            <div key={career.id} className="career-card">
              <div className="match-badge"><Star size={14} fill="currentColor" /> {career.matchScore}% Match</div>
              <span className="career-icon">{career.icon}</span>
              <h3>{career.title}</h3>
              <p className="career-desc">{career.description}</p>
              
              <div className="career-salary-row">
                <div className="salary-box">
                  <span>Entry-Level</span>
                  <strong>{career.salary.entry.label}</strong>
                </div>
                <div className="salary-box senior">
                  <span>Senior Potential</span>
                  <strong>{career.salary.senior.label}</strong>
                </div>
              </div>

              <div className="tags-row">
                {career.requiredSkills.slice(0, 3).map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
              </div>

              <div className="card-actions">
                <button className="btn-primary-sm" onClick={() => navigate(`/roadmap/${career.id}`)}>
                  <Map size={16} /> Roadmap
                </button>
                <div className="secondary-actions">
                  <button className="icon-btn" title="Salary Insights" onClick={() => navigate('/salary', { state: { careerId: career.id }})}><TrendingUp size={18} /></button>
                  <button className="icon-btn" title="Skill Gap" onClick={() => navigate('/skillgap', { state: { careerId: career.id }})}><BarChart2 size={18} /></button>
                  <button className="icon-btn" title="Save" onClick={() => handleSave(career.id)}><Bookmark size={18} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
