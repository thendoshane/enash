import { useState } from 'react';
import { Bot, ChevronRight, MessageCircle, Send, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { askEnashAssistant } from '../lib/api';

const starter = 'Hi. I can help you find a page, choose a service, or shape a project requirement.';
const quickPrompts = ['Find the right service', 'Show developed systems', 'Help with a project brief'];

export default function AIWidget() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', text: starter }]);
  const [loading, setLoading] = useState(false);

  async function sendText(text) {
    const message = text.trim();
    if (!message || loading) return;
    const nextMessages = [...messages, { role: 'user', text: message }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);
    try {
      const data = await askEnashAssistant({ message, page: window.location.pathname, mode: 'navigation', history: nextMessages.slice(-8) });
      setMessages((current) => [...current, { role: 'assistant', text: data.answer, route: data.route || null }]);
    } catch (error) {
      setMessages((current) => [...current, { role: 'assistant', text: error?.message || 'The ENASH Assistant is temporarily unavailable.' }]);
    } finally {
      setLoading(false);
    }
  }

  function submit(event) {
    event.preventDefault();
    sendText(input);
  }

  function goTo(route) {
    navigate(route.path);
    setOpen(false);
  }

  return (
    <>
      {open && (
        <aside className="ai-panel" aria-label="ENASH Assistant">
          <div className="ai-header">
            <div><span className="ai-avatar"><Bot size={17} /></span><div><strong>ENASH Assistant</strong><small>Navigation & project help</small></div></div>
            <button onClick={() => setOpen(false)} aria-label="Close assistant"><X size={18} /></button>
          </div>
          <div className="ai-quick-actions">{quickPrompts.map((prompt) => <button key={prompt} onClick={() => sendText(prompt)} disabled={loading}>{prompt}</button>)}</div>
          <div className="ai-messages">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`ai-message ${message.role}`}>
                <span>{message.text}</span>
                {message.route && <button className="ai-route" onClick={() => goTo(message.route)}>{message.route.label} <ChevronRight size={14} /></button>}
              </div>
            ))}
            {loading && <div className="ai-message assistant typing">Working on that…</div>}
          </div>
          <form className="ai-form" onSubmit={submit}>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask ENASH…" maxLength={1200} />
            <button aria-label="Send" disabled={loading}><Send size={16} /></button>
          </form>
        </aside>
      )}
      <button className="ai-launcher" onClick={() => setOpen((value) => !value)} aria-label="Open ENASH Assistant">
        {open ? <X size={19} /> : <MessageCircle size={19} />}
        <span>{open ? 'Close' : 'Need help?'}</span>
      </button>
    </>
  );
}
