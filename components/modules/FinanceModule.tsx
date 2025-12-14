
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { TrendingDown, CreditCard, PieChart, DollarSign, Download, BookOpen, ArrowUpRight, ArrowDownRight, Search } from 'lucide-react';
import { BUDGETS, FINANCIAL_HISTORY, LEDGER_ENTRIES } from '../../constants';

const FinanceModule: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row justify-between md:items-end mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-serif text-shahana-900 font-bold mb-2">Finance & Settlements</h2>
          <p className="text-slate-500">Double-entry ledger, treasury management, and automated reconciliation.</p>
        </div>
        <div className="flex gap-2">
            <button className="text-slate-500 hover:text-shahana-900 border border-slate-300 rounded-lg px-4 py-2 flex items-center space-x-2 text-sm font-medium bg-white">
                <BookOpen size={16} />
                <span>General Ledger</span>
            </button>
            <button className="text-white bg-shahana-900 hover:bg-shahana-800 rounded-lg px-4 py-2 flex items-center space-x-2 text-sm font-medium">
                <Download size={16} />
                <span>Export Reports</span>
            </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Budget Status */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           <h3 className="font-semibold text-shahana-900 mb-6 flex items-center justify-between">
             <div className="flex items-center">
                <PieChart size={20} className="mr-2 text-slate-400" />
                <span>Budget vs Actuals</span>
             </div>
             <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">May 2024</span>
           </h3>
           <div className="space-y-5">
             {BUDGETS.map(budget => {
               const percent = Math.min((budget.spent / budget.allocated) * 100, 100);
               return (
                 <div key={budget.id}>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="font-medium text-slate-700">{budget.name}</span>
                     <span className={`${
                       budget.status === 'Exceeded' ? 'text-red-600 font-bold' : 
                       budget.status === 'Warning' ? 'text-amber-600' : 'text-slate-500'
                     }`}>
                       ${budget.spent.toLocaleString()} / ${budget.allocated.toLocaleString()}
                     </span>
                   </div>
                   <div className="w-full bg-slate-100 rounded-full h-2.5">
                     <div 
                        className={`h-2.5 rounded-full ${
                          budget.status === 'Exceeded' ? 'bg-red-500' : 
                          budget.status === 'Warning' ? 'bg-amber-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${percent}%` }}
                     ></div>
                   </div>
                 </div>
               );
             })}
           </div>
        </div>

        {/* Quick Stats */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
           <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                   <DollarSign size={24} />
                </div>
                <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded">YTD</span>
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium mt-4">Total Revenue</p>
                <h4 className="text-2xl font-bold text-shahana-900">$7.2M</h4>
              </div>
           </div>

           <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                   <TrendingDown size={24} />
                </div>
                <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded">Avg</span>
              </div>
              <div>
                <p className="text-sm text-amber-600 font-medium mt-4">Monthly Burn Rate</p>
                <h4 className="text-2xl font-bold text-shahana-900">$520k</h4>
              </div>
           </div>
           
           <div className="sm:col-span-2 bg-white p-6 rounded-xl border border-slate-200">
             <h3 className="font-semibold text-shahana-900 mb-4">Cash Flow Trends</h3>
             <div className="h-32">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={FINANCIAL_HISTORY}>
                    <XAxis dataKey="month" hide />
                    <Tooltip cursor={{fill: '#f1f5f9'}} />
                    <Bar dataKey="savings" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
               </ResponsiveContainer>
             </div>
           </div>
        </div>
      </div>

      {/* General Ledger Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
           <h3 className="font-semibold text-shahana-900 flex items-center">
             <CreditCard size={18} className="mr-2 text-slate-400" />
             Transaction Ledger
           </h3>
           <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                    type="text" 
                    placeholder="Search transactions..." 
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-shahana-gold"
                />
           </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full">
            <thead className="bg-slate-50">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Account</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {LEDGER_ENTRIES.map(entry => (
                    <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">{entry.date}</td>
                        <td className="px-6 py-4 text-sm font-medium text-shahana-900">{entry.description}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">{entry.account}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                            <span className="inline-block bg-slate-100 px-2 py-0.5 rounded text-xs">
                                {entry.category}
                            </span>
                        </td>
                        <td className={`px-6 py-4 text-sm font-bold text-right whitespace-nowrap ${entry.type === 'Credit' ? 'text-green-600' : 'text-slate-900'}`}>
                            {entry.type === 'Credit' ? '+' : '-'}${entry.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                entry.status === 'Reconciled' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                                {entry.status}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default FinanceModule;
