import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import API from '../api';
import { Map, CheckCircle, Circle, Clock, ChevronRight, BookOpen, Star } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Roadmap() {
  const { careerId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = careerId || 'backend-developer';
    API.get(`/roadmap/${id}`).then(({ data }) => {
      setData(data);
      setLoading(false);
    });
  }, [careerId]);

  const toggleStep = async (idx) => {
    await API.post('/roadmap/toggle-step', { careerId: data.career.id, stepIndex: idx });
    const newData = { ...data };
    newData.roadmap[idx].completed = !newData.roadmap[idx].completed;
    const completedCount = newData.roadmap.filter(s => s.completed).length;
    newData.progress = Math.round((completedCount / newData.roadmap.length) * 100);
    setData(newData);
    toast.success('Progress updated!');
  };

  if (loading) return <AppLayout><div className="loading">Building your path...</div></AppLayout>;

  return (
    <AppLayout>
      <div className="page-container">
        <div className="roadmap-header">
          <div className="rh-info">
            <div className="rh-icon">{data.career.icon}</div>
            <div>
              <h1 className="page-title">{data.career.title} Roadmap</h1>
              <p className="page-sub">Step-by-step master plan to achieve your career goal.</p>
            </div>
          </div>
          <div className="rh-progress">
            <div className="prog-label">Your Overall Progress: <strong>{data.progress}%</strong></div>
            <div className="prog-bar-bg"><div className="prog-bar-fill" style={{ width: `${data.progress}%` }}></div></div>
          </div>
        </div>

        <div className="roadmap-timeline">
          {data.roadmap.map((step, idx) => (
            <div key={idx} className={`roadmap-step ${step.completed ? 'completed' : ''}`}>
              <div className="step-marker-line">
                <div className="step-marker" onClick={() => toggleStep(idx)}>
                  {step.completed ? <CheckCircle className="check-icon" /> : <Circle className="empty-icon" />}
                </div>
                {idx < data.roadmap.length - 1 && <div className="step-line"></div>}
              </div>
              <div className="step-content">
                <div className="step-header">
                  <div className="step-title-row">
                    <h3>Step {idx + 1}: {step.title}</h3>
                    <div className="step-meta"><Clock size={14} /> {step.duration}</div>
                  </div>
                  <button className="btn-resources" onClick={() => navigate('/courses', { state: { careerId: data.career.id } })}>Resources <BookOpen size={14} /></button>
                </div>
                <p className="step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
