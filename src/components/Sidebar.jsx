import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, User, BookOpen, Target, 
  Map, BarChart2, TrendingUp, Sparkles, LogOut, ChevronLeft, ChevronRight, GraduationCap
} from 'lucide-react';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
    { name: 'Assessment', path: '/assessment', icon: <BarChart2 size={20} /> },
    { name: 'Careers', path: '/careers', icon: <Target size={20} /> },
    { name: 'Salary Index', path: '/salary', icon: <TrendingUp size={20} /> },
    { name: 'Learning Roadmap', path: '/roadmap', icon: <Map size={20} /> },
    { name: 'Skill Gap', path: '/skillgap', icon: <GraduationCap size={20} /> },
    { name: 'Courses', path: '/courses', icon: <BookOpen size={20} /> },
    { name: 'AI Advisor', path: '/chatbot', icon: <Sparkles size={20} /> },
  ];

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Sparkles className="logo-icon" size={24} />
          <span className="logo-text">CareerCompass</span>
        </div>
        <button className="collapse-toggle" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">{user?.name ? user.name[0] : 'U'}</div>
        <div className="user-info">
          <p className="user-name">{user?.name || 'User'}</p>
          <p className="user-email">{user?.email || 'Student'}</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span className="nav-indicator"></span>
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <button className="logout-btn" onClick={() => { logout(); navigate('/'); }}>
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
}
