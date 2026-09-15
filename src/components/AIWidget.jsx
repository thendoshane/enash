import { useState } from 'react';
import { ArrowRight, Bot, Send, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { askEnashAssistant } from '../lib/api';

const starter = 'Hi — I’m the ENASH product guide. Ask about Yenza AI, TaxiFind, KitchCore, What\'s There?, or the company behind them.';
const quickPrompts = ['What does ENASH build?', 'Tell me about Yenza AI', 'How does TaxiFind work?', 'Which product is for operations?'];

export default function AIWidget() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', text: starter }]);
  const [loading, setLoading] = useState(false);

  async function sendText(value) {
    const message = value.trim();
    if (!message || loading) return;
    const history = [...messages, { role: 'user', text: message }];
    setMessages(history);
    setInput('');
    setLoading(true);
    try {
      const data = await askEnashAssistant({ message, page: window.location.pathname, history: history.slice(-8) });
      setMessages((current) => [...current, { role: 'assistant', text: data.answer, route: data.route || null }]);
    } catch (error) {
      setMessages((current) => [...current, { role: 'assistant', text: error.message || 'The ENASH Assistant is temporarily unavailable.' }]);
    } finally {
      setLoading(false);
    }
  }

  return <>
    {open && <aside className="ai-panel" aria-label="ENASH Assistant">
      <div className="ai-header"><div><span className="ai-avatar"><img src="/brand-mark.svg" alt="" /></span><div><strong>ENASH Assistant</strong><small>Product & company guide</small></div></div><button onClick={()=>setOpen(false)} aria-label="Close assistant"><X size={18}/></button></div>
      <div className="ai-quick-actions">{quickPrompts.map((prompt)=><button type="button" key={prompt} onClick={()=>sendText(prompt)} disabled={loading}>{prompt}</button>)}</div>
      <div className="ai-messages">{messages.map((message,index)=><div key={`${message.role}-${index}`} className={`ai-message ${message.role}`}><span>{message.text}</span>{message.route&&<button className="ai-route" onClick={()=>{navigate(message.route.path);setOpen(false)}}>{message.route.label}<ArrowRight size={13}/></button>}</div>)}{loading&&<div className="ai-message assistant typing">Thinking…</div>}</div>
      <form className="ai-form" onSubmit={(e)=>{e.preventDefault();sendText(input)}}><input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Ask about ENASH…" maxLength={1200}/><button aria-label="Send" disabled={loading}><Send size={16}/></button></form>
    </aside>}
    <button className="ai-launcher" onClick={()=>setOpen((value)=>!value)} aria-label="Open ENASH Assistant">{open?<X size={19}/>:<Bot size={19}/>}<span>{open?'Close':'Ask ENASH'}</span></button>
  </>;
}
