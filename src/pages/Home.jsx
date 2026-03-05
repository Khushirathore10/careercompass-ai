import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Target, Map, TrendingUp, BarChart2, ChevronRight, CheckCircle2, Star, Github, Twitter, Linkedin } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <nav className="home-nav">
        <div className="nav-brand">
          <Sparkles className="brand-icon" size={28} />
          <span>CareerCompass AI</span>
        </div>
        <div className="nav-links">
          <Link to="/about">About</Link>
          <Link to="/pricing">Resources</Link>
          {user ? (
            <button className="btn-primary" onClick={() => navigate('/dashboard')}>Go to Dashboard <ChevronRight size={18} /></button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <button className="btn-primary" onClick={() => navigate('/register')}>Get Started</button>
            </>
          )}
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-badge">✨ Explore 50+ Career Paths with AI</div>
        <h1 className="hero-title">Your Personalized <span className="gradient-text">AI Career Roadmap</span> Starts Here</h1>
        <p className="hero-sub">One-stop intelligent platform for students to discover career paths, analyze skill gaps, and track learning journeys with AI-powered insights.</p>
        
        <div className="hero-actions">
          <button className="btn-hero-primary" onClick={() => navigate(user ? '/dashboard' : '/register')}>
            {user ? 'View Dashboard' : 'Start Free Assessment'} <ChevronRight size={20} />
          </button>
          <button className="btn-hero-secondary">Explore Career Index</button>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-value">15k+</span>
            <span className="stat-label">Students Guided</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">98%</span>
            <span className="stat-label">Match Accuracy</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">500+</span>
            <span className="stat-label">Course Resources</span>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-header">
          <h2>Everything you need to <span className="gradient-text">Excel</span></h2>
          <p>Stop guessing and start building your future with data-driven career choices.</p>
        </div>

        <div className="features-grid">
          {[
            { title: 'AI Matching', desc: 'Advanced assessment to find your perfect career fit.', icon: <Target className="feature-icon" color="#6366f1" /> },
            { title: 'Interactive Roadmaps', desc: 'Step-by-step learning paths for every tech role.', icon: <Map className="feature-icon" color="#10b981" /> },
            { title: 'Salary Index', desc: 'Real-time salary growth insights and projections.', icon: <TrendingUp className="feature-icon" color="#f59e0b" /> },
            { title: 'Skill Gap', desc: 'Identify exactly what you need to learn next.', icon: <BarChart2 className="feature-icon" color="#ec4899" /> }
          ].map((f, i) => (
            <div key={i} className="feature-card">
              <div className="icon-wrap">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer-section">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="nav-brand"><Sparkles className="brand-icon" /> <span>CareerCompass AI</span></div>
            <p>Advancing careers through personalized intelligence.</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Platform</h4>
              <Link to="/careers">Careers</Link>
              <Link to="/assessment">Assessment</Link>
            </div>
            <div className="link-group">
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
