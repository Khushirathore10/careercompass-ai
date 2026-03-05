import { useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import API from '../api';
import { User, Book, Briefcase, Plus, X, Save, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Profile() {
  const [profile, setProfile] = useState({ education_level: '', stream: '', skills: [], interests: [], career_goals: '' });
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/profile').then(({ data }) => {
      if (data.profile.user_id) setProfile(data.profile);
      setLoading(false);
    });
  }, []);

  const handleAddSkill = () => {
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill] });
      setNewSkill('');
    }
  };

  const handleSave = async () => {
    try {
      await API.post('/profile/update', profile);
      toast.success('Profile saved successfully!');
    } catch {
      toast.error('Failed to update profile');
    }
  };

  if (loading) return <AppLayout><div className="loading">Loading...</div></AppLayout>;

  return (
    <AppLayout>
      <div className="page-container">
        <h1 className="page-title"><User size={28} /> Complete Your Student Profile</h1>
        <p className="page-sub">Help our AI understand your background to provide accurate recommendations.</p>

        <div className="profile-grid">
          <div className="dash-card">
            <h3><Book size={20} /> Academic Background</h3>
            <div className="form-grid">
              <div className="input-group">
                <label>Education Level</label>
                <select value={profile.education_level} onChange={e => setProfile({...profile, education_level: e.target.value})}>
                  <option value="">Select Level</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's">Bachelor's Degree</option>
                  <option value="Master's">Master's Degree</option>
                  <option value="Diploma">Diploma / Certifications</option>
                </select>
              </div>
              <div className="input-group">
                <label>Stream / Major</label>
                <input type="text" placeholder="e.g. Computer Science, Business, Arts" value={profile.stream} onChange={e => setProfile({...profile, stream: e.target.value})} />
              </div>
            </div>
          </div>

          <div className="dash-card">
            <h3><Briefcase size={20} /> Skills & Interests</h3>
            <div className="input-group">
              <label>Your Skills</label>
              <div className="skill-input">
                <input type="text" placeholder="Add a skill (e.g. Python, Figma, React)" value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleAddSkill()} />
                <button onClick={handleAddSkill}><Plus size={20} /></button>
              </div>
              <div className="tag-cloud">
                {profile.skills.map(s => (
                  <span key={s} className="tag">
                    {s} <X size={12} onClick={() => setProfile({...profile, skills: profile.skills.filter(x => x !== s)})} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="dash-card full-width">
            <h3><Target size={20} /> Career Ambition</h3>
            <div className="input-group">
              <label>What's your ultimate career goal?</label>
              <textarea placeholder="Tell us about the dream role you're aiming for..." value={profile.career_goals} onChange={e => setProfile({...profile, career_goals: e.target.value})} />
            </div>
          </div>
        </div>

        <div className="action-row">
          <button className="btn-primary-action" onClick={handleSave}>
            <Save size={20} /> Save Profile
          </button>
          <a href="/assessment" className="btn-ai-chat border">
            <Sparkles size={18} /> Take Aptitude Test
          </a>
        </div>
      </div>
    </AppLayout>
  );
}
