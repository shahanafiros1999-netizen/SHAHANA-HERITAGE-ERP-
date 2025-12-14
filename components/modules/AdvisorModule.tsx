import React, { useState, useRef, useEffect } from 'react';
import { generateAdvisorResponse } from '../../services/geminiService';
import { Bot, Send, User, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AdvisorModule: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'assistant',
      content: "Greetings. I am the Shahana Heritage Advisor. I have analyzed your current asset register, financial history, and family constitution. How may I assist you with strategic decision-making today?",
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await generateAdvisorResponse(input);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-shahana-900 p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="bg-shahana-gold p-2 rounded-lg">
             <Bot className="text-shahana-900" size={24} />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-white">Strategic Advisor</h3>
            <p className="text-xs text-slate-400 flex items-center">
              <Sparkles size={12} className="mr-1 text-shahana-gold" /> 
              Powered by Gemini AI
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'} space-x-3`}>
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === 'user' ? 'bg-slate-200' : 'bg-shahana-900'
              }`}>
                {msg.role === 'user' ? <User size={16} className="text-slate-600"/> : <Bot size={16} className="text-shahana-gold"/>}
              </div>
              
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-white text-slate-800 border border-slate-200 rounded-tr-none' 
                  : 'bg-white text-slate-800 border border-shahana-gold/30 rounded-tl-none'
              }`}>
                <p className="whitespace-pre-line">{msg.content}</p>
                <span className="text-[10px] text-slate-400 mt-2 block opacity-70">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex justify-start">
             <div className="flex items-center space-x-3 bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
               <Loader2 size={16} className="animate-spin text-shahana-gold" />
               <span className="text-xs text-slate-500">Analyzing family context...</span>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-200 shrink-0">
        <div className="flex items-center space-x-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about liquidity, risk mitigation, or succession planning..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-shahana-gold/50 focus:border-shahana-gold transition-all"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-shahana-900 text-white p-3 rounded-lg hover:bg-shahana-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvisorModule;
