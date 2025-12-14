import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ArrowUpRight, AlertCircle, Calendar, Plus, Wallet, FileUp, Users } from 'lucide-react';
import { MOCK_ASSETS, FINANCIAL_HISTORY, TASKS } from '../../constants';
import { AssetCategory } from '../../types';

const DashboardModule: React.FC = () => {
  const totalNetWorth = MOCK_ASSETS.reduce((acc, curr) => acc + curr.value, 0);
  const totalLiquid = MOCK_ASSETS
    .filter(a => a.category === AssetCategory.CASH || a.category === AssetCategory.PUBLIC_MARKETS || a.category === AssetCategory.CRYPTO)
    .reduce((acc, curr) => acc + curr.value, 0);
  
  const liquidityRatio = ((totalLiquid / totalNetWorth) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h2 className="text-3xl font-serif text-shahana-900 font-bold mb-2">Family Command Center</h2>
        <p className="text-slate-500">Real-time oversight of the Shahana Heritage ecosystem.</p>
      </header>

      {/* Quick Actions Bar */}
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        <button className="flex items-center space-x-2 bg-shahana-900 text-white px-5 py-3 rounded-lg shadow-md hover:bg-shahana-800 transition-all whitespace-nowrap">
          <Wallet size={18} className="text-shahana-gold" />
          <span className="font-medium text-sm">Log Expense</span>
        </button>
        <button className="flex items-center space-x-2 bg-white text-shahana-900 border border-slate-200 px-5 py-3 rounded-lg shadow-sm hover:bg-slate-50 transition-all whitespace-nowrap">
          <FileUp size={18} className="text-shahana-accent" />
          <span className="font-medium text-sm">Upload to Vault</span>
        </button>
        <button className="flex items-center space-x-2 bg-white text-shahana-900 border border-slate-200 px-5 py-3 rounded-lg shadow-sm hover:bg-slate-50 transition-all whitespace-nowrap">
          <Plus size={18} className="text-green-600" />
          <span className="font-medium text-sm">New Task</span>
        </button>
        <button className="flex items-center space-x-2 bg-white text-shahana-900 border border-slate-200 px-5 py-3 rounded-lg shadow-sm hover:bg-slate-50 transition-all whitespace-nowrap">
          <Users size={18} className="text-purple-600" />
          <span className="font-medium text-sm">Family Meeting</span>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Net Worth</p>
          <div className="flex items-baseline mt-2 space-x-2">
            <h3 className="text-3xl font-bold text-shahana-900">
              ${(totalNetWorth / 1000000).toFixed(2)}M
            </h3>
            <span className="text-sm text-green-600 font-medium flex items-center">
              <ArrowUpRight size={16} /> +5.2%
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Liquidity Ratio</p>
           <div className="flex items-baseline mt-2 space-x-2">
            <h3 className="text-3xl font-bold text-shahana-900">{liquidityRatio}%</h3>
            <span className="text-xs text-slate-400">(Target: 15%+)</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
            <div 
              className="bg-shahana-gold h-2 rounded-full" 
              style={{ width: `${Math.min(parseFloat(liquidityRatio), 100)}%` }}
            ></div>
          </div>
        </div>

         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Pending Actions</p>
           <div className="flex items-baseline mt-2 space-x-2">
            <h3 className="text-3xl font-bold text-shahana-900">{TASKS.filter(t => t.status === 'Pending').length}</h3>
            <span className="text-sm text-amber-600 font-medium">Require Attention</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-semibold text-shahana-900 mb-6">Financial Performance (YTD)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={FINANCIAL_HISTORY}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} fillOpacity={0} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Tasks */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="font-semibold text-shahana-900 mb-4 flex items-center justify-between">
            <span>Intelligent Inbox</span>
            <span className="text-xs bg-shahana-900 text-white px-2 py-1 rounded-full">AI Sorted</span>
          </h3>
          <div className="flex-1 space-y-4 overflow-y-auto max-h-[300px]">
            {TASKS.map(task => (
              <div key={task.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 group hover:border-shahana-gold/50 transition-colors">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-medium text-slate-800">{task.title}</h4>
                  {task.priority === 'High' && <AlertCircle size={16} className="text-amber-500" />}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wide border ${
                      task.category === 'Business' ? 'border-blue-200 text-blue-700 bg-blue-50' : 
                      task.category === 'Health' ? 'border-red-200 text-red-700 bg-red-50' :
                      'border-slate-200 text-slate-700 bg-slate-50'
                    }`}>
                      {task.category}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 flex items-center">
                    <Calendar size={12} className="mr-1" /> {task.dueDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            View All Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardModule;