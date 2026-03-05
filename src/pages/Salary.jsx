import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import API from '../api';
import { TrendingUp, DollarSign, ArrowUpRight, BarChart3, PieChart } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Salary() {
  const location = useLocation();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const careerId = location.state?.careerId || 'backend-developer';
    API.get(`/careers/${careerId}`).then(({ data }) => {
      setCareer(data);
      setLoading(false);
    });
  }, [location.state]);

  if (loading) return <AppLayout><div className="loading">Calculating growth...</div></AppLayout>;

  const chartData = career.salary.growth.map((val, i) => ({ year: i + 1, salary: val }));

  return (
    <AppLayout>
      <div className="page-container">
        <h1 className="page-title"><TrendingUp size={28} /> Salary Market Insights</h1>
        <p className="page-sub">Projected income growth for <strong>{career.title}</strong> in India.</p>

        <div className="salary-stats-grid">
          <div className="stat-card gold">
            <div className="stat-label">Entry Level (0-2 Yrs)</div>
            <div className="stat-value">{career.salary.entry.label}</div>
            <div className="stat-trend"><ArrowUpRight size={16} /> Market High</div>
          </div>
          <div className="stat-card purple">
            <div className="stat-label">Mid Level (3-7 Yrs)</div>
            <div className="stat-value">{career.salary.mid.label}</div>
            <div className="stat-trend"><ArrowUpRight size={16} /> Top Percentile</div>
          </div>
          <div className="stat-card emerald">
            <div className="stat-label">Senior Level (8+ Yrs)</div>
            <div className="stat-value">{career.salary.senior.label}</div>
            <div className="stat-trend"><ArrowUpRight size={16} /> Global Ceiling</div>
          </div>
        </div>

        <div className="growth-chart-container">
          <div className="chart-header">
            <h3><BarChart3 size={20} /> Projected 7-Year Salary Growth (LPA)</h3>
            <p>Based on industry standards and market demand trends.</p>
          </div>
          <div className="recharts-wrap">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="#94a3b8" label={{ value: 'Years of Experience', position: 'insideBottom', offset: -5 }} />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155' }} />
                <Area type="monotone" dataKey="salary" stroke="#6366f1" fillOpacity={1} fill="url(#colorSalary)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
