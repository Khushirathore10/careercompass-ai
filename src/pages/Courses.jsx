import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import API from '../api';
import { BookOpen, ExternalLink, Filter, Search, Award, Star, Clock } from 'lucide-react';

export default function Courses() {
  const location = useLocation();
  const navigate = useNavigate();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [catFilter, setCatFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const careerId = location.state?.careerId;
    if (careerId) {
      API.get(`/careers/${careerId}`).then(({ data }) => {
        setCareer(data);
        setLoading(false);
      });
    } else {
      API.get('/careers/saved/list').then(({ data: saved }) => {
        if (saved.length > 0) {
          API.get(`/careers/${saved[0].id}`).then(({ data }) => {
            setCareer(data);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      });
    }
  }, [location.state]);

  if (loading) return <AppLayout><div className="loading">Curating courses...</div></AppLayout>;

  if (!career) return (
    <AppLayout>
      <div className="empty-state">
        <BookOpen size={64} />
        <h2>No Resources Found</h2>
        <p>Save a career to see recommended courses.</p>
        <button className="btn-primary" onClick={() => navigate('/careers')}>Browse Careers</button>
      </div>
    </AppLayout>
  );

  const filtered = career.courses.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = catFilter === 'All' || (catFilter === 'Free' ? c.free : !c.free);
    return matchSearch && matchCat;
  });

  return (
    <AppLayout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title"><BookOpen size={28} /> Learning Resources</h1>
            <p className="page-sub">Best courses for <strong>{career.title}</strong></p>
          </div>
          <div className="search-bar"><Search size={18} /><input type="text" placeholder="Search topics..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></div>
        </div>

        <div className="courses-grid">
          {filtered.map((course, i) => (
            <div key={i} className="course-card">
              <span className="platform-tag">{course.platform}</span>
              <h3>{course.name}</h3>
              <div className="course-footer">
                <span className={`price-badge ${course.free ? 'free' : 'paid'}`}>{course.free ? 'FREE' : 'PAID'}</span>
                <a href={course.url} target="_blank" className="btn-icon">Visit <ExternalLink size={16}/></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
