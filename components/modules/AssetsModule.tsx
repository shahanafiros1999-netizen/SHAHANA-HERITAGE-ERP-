
import React, { useState } from 'react';
import { MOCK_ASSETS } from '../../constants';
import { AssetCategory } from '../../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, RefreshCw, FileText, Home, Building } from 'lucide-react';

const COLORS = ['#0f172a', '#d4af37', '#0ea5e9', '#64748b', '#e2e8f0', '#94a3b8'];

const AssetsModule: React.FC = () => {
  const [view, setView] = useState<'owner' | 'tenant'>('owner');

  // Aggregate data for the pie chart
  const dataByCategory = MOCK_ASSETS.reduce((acc, asset) => {
    const existing = acc.find(x => x.name === asset.category);
    if (existing) {
      existing.value += asset.value;
    } else {
      acc.push({ name: asset.category, value: asset.value });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-serif text-shahana-900 font-bold mb-2">Asset Register</h2>
          <p className="text-slate-500">Real-time visibility into global family holdings.</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
             <div className="bg-slate-100 p-1 rounded-lg flex">
                <button 
                    onClick={() => setView('owner')}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-all flex items-center ${view === 'owner' ? 'bg-white shadow-sm text-shahana-900' : 'text-slate-500'}`}
                >
                    <Building size={16} className="mr-2" />
                    Owner View
                </button>
                <button 
                    onClick={() => setView('tenant')}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-all flex items-center ${view === 'tenant' ? 'bg-white shadow-sm text-shahana-900' : 'text-slate-500'}`}
                >
                    <Home size={16} className="mr-2" />
                    Tenant Portal
                </button>
             </div>
             <button className="bg-shahana-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-shahana-800 transition-colors">
                <RefreshCw size={18} />
                <span className="hidden md:inline">Update Valuations</span>
            </button>
        </div>
      </header>

      {view === 'tenant' ? (
          <div className="flex flex-col items-center justify-center h-64 bg-slate-50 rounded-xl border border-dashed border-slate-300">
              <Home size={48} className="text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-600">Tenant Management Portal</h3>
              <p className="text-sm text-slate-400">View lease agreements, maintenance tickets, and rent payments.</p>
              <button className="mt-4 text-shahana-accent hover:underline text-sm">Launch External Tenant App ↗</button>
          </div>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Asset Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Asset Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Valuation</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Stats</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Docs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_ASSETS.map((asset) => (
                  <tr key={asset.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-shahana-900">{asset.name}</div>
                      <div className="text-xs text-slate-400">{asset.owner}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        {asset.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-bold text-shahana-900">
                        ${asset.value.toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-400">
                         {asset.currency} • {asset.lastValuationDate}
                      </div>
                    </td>
                     <td className="px-6 py-4 whitespace-nowrap text-right">
                      {asset.category === AssetCategory.REAL_ESTATE && asset.occupancy ? (
                           <div className="text-xs">
                               <span className="block text-green-600 font-medium">Yield: {asset.yield}%</span>
                               <span className="text-slate-500">Occ: {asset.occupancy}%</span>
                           </div>
                      ) : (
                        <span className={`text-sm font-medium ${asset.roi && asset.roi > 10 ? 'text-green-600' : 'text-slate-600'}`}>
                            {asset.roi ? `ROI: +${asset.roi}%` : '-'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button className="text-slate-400 hover:text-shahana-gold">
                        <FileText size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Allocation Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="font-semibold text-shahana-900 mb-6">Portfolio Allocation</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   formatter={(value: number) => `$${(value / 1000000).toFixed(1)}M`}
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 bg-shahana-surface rounded-lg border border-shahana-gold/20">
             <div className="flex items-start space-x-3">
               <TrendingUp className="text-shahana-gold shrink-0 mt-1" size={20} />
               <div>
                 <h4 className="text-sm font-semibold text-shahana-900">Strategic Insight</h4>
                 <p className="text-sm text-slate-600 mt-1">
                   Real estate exposure is currently 65% of net worth. 
                   Governance mandate suggests capping illiquid assets at 60%. 
                   Consider rebalancing into public markets.
                 </p>
               </div>
             </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default AssetsModule;
