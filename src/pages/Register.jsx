import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) return toast.error("Passwords don't match");
    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      toast.success('Account created successfully!');
      navigate('/profile');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <h1 className="hero-title white">Join the <br/><span className="gradient-text">Elite Network</span></h1>
        <p className="auth-quote">Get personalized advice used by top students from IITs, BITS, and Global Universities.</p>
        <div className="security-badge">
          <ShieldCheck size={24} /> <span>Built with Enterprise-grade Security</span>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-card">
          <h2>Create Account</h2>
          <p className="auth-sub">Start your personalized career journey today</p>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <div className="input-wrap">
                <User className="input-icon" size={18} />
                <input type="text" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrap">
                <Mail className="input-icon" size={18} />
                <input type="email" placeholder="name@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrap">
                <Lock className="input-icon" size={18} />
                <input type="password" placeholder="••••••••" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
              </div>
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <div className="input-wrap">
                <Lock className="input-icon" size={18} />
                <input type="password" placeholder="••••••••" value={formData.confirm} onChange={e => setFormData({...formData, confirm: e.target.value})} required />
              </div>
            </div>

            <button className="btn-auth" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'} <ArrowRight size={18} />
            </button>
          </form>

          <p className="auth-footer">Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}
