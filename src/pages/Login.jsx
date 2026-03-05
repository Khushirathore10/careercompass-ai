import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <h1 className="hero-title white">Unlock Your<br/><span className="gradient-text">Future Potential</span></h1>
        <p className="auth-quote">"The best way to predict your future is to create it."</p>
        <div className="perks-list">
          <div className="perk"><div className="perk-dot"></div> Personalized AI Guidance</div>
          <div className="perk"><div className="perk-dot"></div> Skill Gap Analysis</div>
          <div className="perk"><div className="perk-dot"></div> Real-time Market Salaries</div>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-card">
          <h2>Welcome Back</h2>
          <p className="auth-sub">Sign in to continue your career journey</p>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrap">
                <Mail className="input-icon" size={18} />
                <input type="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrap">
                <Lock className="input-icon" size={18} />
                <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button className="btn-auth" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'} <ArrowRight size={18} />
            </button>
          </form>

          <p className="auth-footer">Don't have an account? <Link to="/register">Create one</Link></p>
        </div>
      </div>
    </div>
  );
}
