import { useState, useEffect, useRef } from 'react';
import AppLayout from '../components/AppLayout';
import API from '../api';
import { Send, Sparkles, User, Bot, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hi! I'm your CareerCompass AI. Ask me about careers, salaries, or skills!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const { data } = await API.post('/chatbot/message', { message: input });
      setMessages(prev => [...prev, { role: 'bot', content: data.response }]);
    } catch {
      toast.error('AI Advisor busy...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="chatbot-container">
        <div className="chat-header">
          <div className="header-info"><h3>AI Advisor</h3><p>Online</p></div>
          <button onClick={() => setMessages([{ role: 'bot', content: 'Chat reset. How can I help?' }])}><Trash2 size={18}/></button>
        </div>
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`message-row ${m.role}`}>
              <div className="avatar">{m.role === 'user' ? <User size={16}/> : <Bot size={16}/>}</div>
              <div className="bubble" dangerouslySetInnerHTML={{ __html: m.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
            </div>
          ))}
          {loading && <div className="loading-dots">Thinking...</div>}
          <div ref={endRef} />
        </div>
        <form onSubmit={handleSend} className="chat-input-area">
          <input type="text" placeholder="Ask about Backend Developer salaries..." value={input} onChange={e => setInput(e.target.value)} />
          <button type="submit"><Send size={20}/></button>
        </form>
      </div>
    </AppLayout>
  );
}
