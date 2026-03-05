import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
