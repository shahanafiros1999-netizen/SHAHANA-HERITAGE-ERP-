import React, { useState } from 'react';
import { FAMILY_MEMBERS } from '../constants';
import { FamilyMember } from '../types';
import { ArrowRight, Shield } from 'lucide-react';

interface LoginProps {
  onLogin: (user: FamilyMember) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = FAMILY_MEMBERS.find(m => m.mobile === mobile);
    if (user) {
      onLogin(user);
    } else {
      setError('Number not recognized in Family Registry.');
    }
  };

  return (
    <div className="min-h-screen bg-shahana-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-slate-50 p-8 text-center border-b border-slate-100">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-shahana-900 rounded-full mb-4 ring-4 ring-shahana-gold/20">
             <Shield className="text-shahana-gold" size={32} />
          </div>
          <h1 className="text-2xl font-serif font-bold text-shahana-900">SHAHANA HERITAGE</h1>
          <p className="text-sm text-slate-500 uppercase tracking-widest mt-1">Operating System</p>
        </div>
        
        <div className="p-8">
          <p className="text-center text-slate-600 mb-6 text-sm">
            Enter your registered mobile number to access the secure family vault.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="mobile" className="block text-xs font-semibold text-slate-500 uppercase mb-2">Mobile Number</label>
              <input
                id="mobile"
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="9999999999"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-shahana-gold/50 focus:border-transparent transition-all text-lg font-medium text-slate-800 placeholder-slate-300"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            
            <button 
              type="submit" 
              className="w-full bg-shahana-900 text-white py-4 rounded-lg font-semibold hover:bg-shahana-800 transition-colors flex items-center justify-center group"
            >
              <span>Access Secure Portal</span>
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center">
             <p className="text-xs text-slate-400">
               Simulation Mode: Try <span className="font-mono bg-slate-100 px-1 rounded">9999999999</span> (Patriarch)
             </p>
          </div>
        </div>
        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
          <p className="text-[10px] text-slate-400">
            Protected by End-to-End Encryption. Property of SHAHANA HERITAGE LLP.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
