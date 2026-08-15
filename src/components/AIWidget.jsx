import { useState } from 'react';
import { Bot, ChevronRight, Send, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { askEnashAssistant } from '../lib/api';

const starter = 'Hi. I can help you find the right page, understand an ENASH service, or shape a project idea before you submit it.';
const quickPrompts = [
  'Which service fits my idea?',
  'Show me systems ENASH developed',
  'I need company documents',
  'Help me start a project',
];

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
      const data = await askEnashAssistant({
        message,
        page: window.location.pathname,
        mode: 'navigation',
        history: nextMessages.slice(-8),
      });
      setMessages((current) => [
        ...current,
        { role: 'assistant', text: data.answer, route: data.route || null },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        { role: 'assistant', text: error?.message || 'The ENASH Assistant is temporarily unavailable.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function submit(e) {
    e.preventDefault();
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
            <div>
              <span className="ai-avatar"><Bot size={18} /></span>
              <div><strong>ENASH Assistant</strong><small>Navigation & project guidance</small></div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close assistant"><X size={19} /></button>
          </div>

          <div className="ai-quick-actions">
            {quickPrompts.map((prompt) => (
              <button key={prompt} onClick={() => sendText(prompt)} disabled={loading}>{prompt}</button>
            ))}
          </div>

          <div className="ai-messages">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`ai-message ${message.role}`}>
                <span>{message.text}</span>
                {message.route && (
                  <button className="ai-route" onClick={() => goTo(message.route)}>
                    {message.route.label} <ChevronRight size={14} />
                  </button>
                )}
              </div>
            ))}
            {loading && <div className="ai-message assistant typing">Working on that…</div>}
          </div>

          <form className="ai-form" onSubmit={submit}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about ENASH…" maxLength={1200} />
            <button aria-label="Send" disabled={loading}><Send size={17} /></button>
          </form>
        </aside>
      )}

      <button className="ai-launcher" onClick={() => setOpen((value) => !value)} aria-label="Open ENASH Assistant">
        {open ? <X size={20} /> : <Bot size={21} />}
        <span>{open ? 'Close' : 'ENASH Assistant'}</span>
      </button>
    </>
  );
}
