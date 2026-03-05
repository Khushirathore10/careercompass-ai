import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import API from '../api';
import { GraduationCap, CheckCircle2, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function SkillGap() {
  const location = useLocation();
  const [career, setCareer] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const careerId = location.state?.careerId || 'backend-developer';
    Promise.all([
      API.get(`/careers/${careerId}`),
      API.get('/profile')
    ]).then(([cRes, pRes]) => {
      setCareer(cRes.data);
      setUserSkills(pRes.data.profile.skills || []);
      setLoading(false);
    });
  }, [location.state]);

  if (loading) return <AppLayout><div className="loading">Analyzing gas...</div></AppLayout>;

  const skillsData = career.requiredSkills.map(s => ({
    name: s,
    status: userSkills.some(us => us.toLowerCase() === s.toLowerCase()) ? 100 : 20
  }));

  const missing = career.requiredSkills.filter(s => !userSkills.some(us => us.toLowerCase() === s.toLowerCase()));

  return (
    <AppLayout>
      <div className="page-container">
        <h1 className="page-title"><GraduationCap size={28} /> Skill Gap Analysis</h1>
        <p className="page-sub">Comparing your profile for <strong>{career.title}</strong></p>

        <div className="gap-grid">
          <div className="dash-card">
            <h3>Skill Proficiency Map</h3>
            <div className="recharts-wrap">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={skillsData} layout="vertical">
                  <XAxis type="number" hide domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={100} stroke="#94a3b8" />
                  <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ background: '#1e293b', border: '1px solid #334155' }} />
                  <Bar dataKey="status" radius={[0, 4, 4, 0]}>
                    {skillsData.map((s, i) => <Cell key={i} fill={s.status === 100 ? '#10b981' : '#ef4444'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="dash-card">
            <h3>Recommendations</h3>
            <div className="missing-list">
              {missing.map(s => (
                <div key={s} className="missing-item">
                  <div className="mi-label"><AlertCircle size={18} color="#ef4444" /> {s}</div>
                  <button className="btn-text-sm" onClick={() => window.location.href='/courses'}>Find Course <ArrowRight size={14} /></button>
                </div>
              ))}
              {missing.length === 0 && <div className="perfect-match"><CheckCircle2 size={42} color="#10b981" /><p>Perfect Skill Match!</p></div>}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
