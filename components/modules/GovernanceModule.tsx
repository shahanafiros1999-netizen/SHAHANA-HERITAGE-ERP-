
import React, { useState } from 'react';
import { GOVERNANCE_RULES, PROPOSALS, FAMILY_MEMBERS, MOCK_SUCCESSION_CONFIG } from '../../constants';
import { Scale, ShieldCheck, FileSignature, AlertTriangle, Vote, CheckCircle2, XCircle, Clock, Skull, Activity, Users, Save, FileText, Upload } from 'lucide-react';

const GovernanceModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'constitution' | 'proposals' | 'succession'>('constitution');
  const [isLegalConsentChecked, setIsLegalConsentChecked] = useState(MOCK_SUCCESSION_CONFIG.legalConsentConfirmed || false);

  // Lawyer Verification Simulation State
  const [showLawyerVerify, setShowLawyerVerify] = useState(false);

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-serif text-shahana-900 font-bold mb-3">Governance & Constitution</h2>
          <p className="text-slate-500">
            The codified principles, rules, and protocols governing SHAHANA HERITAGE LLP. 
          </p>
        </div>
        <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg mt-4 md:mt-0 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('constitution')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
              activeTab === 'constitution' ? 'bg-white text-shahana-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Constitution
          </button>
          <button 
            onClick={() => setActiveTab('proposals')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
              activeTab === 'proposals' ? 'bg-white text-shahana-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Active Proposals
          </button>
          <button 
            onClick={() => setActiveTab('succession')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap flex items-center ${
              activeTab === 'succession' ? 'bg-white text-shahana-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Skull size={14} className="mr-1" />
            Succession
          </button>
        </div>
      </header>

      {activeTab === 'constitution' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-shahana-900 to-slate-900 text-white p-6 rounded-xl shadow-md">
              <Scale className="text-shahana-gold mb-4" size={32} />
              <h3 className="text-xl font-serif font-bold mb-2">Constitution Status</h3>
              <p className="text-slate-300 mb-4">Version 4.2 (Ratified 2023)</p>
              <div className="flex items-center space-x-2 text-sm text-green-400">
                <ShieldCheck size={16} />
                <span>Fully Active & Binding</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-shahana-900 mb-4">Council Meetings</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                   <div>
                     <p className="font-medium text-slate-800">Quarterly Review</p>
                     <p className="text-xs text-slate-500">June 15, 2024</p>
                   </div>
                   <button className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-600 font-medium">Scheduled</button>
                </div>
                 <div className="flex justify-between items-center">
                   <div>
                     <p className="font-medium text-slate-800">Succession Summit</p>
                     <p className="text-xs text-slate-500">Dec 10, 2024</p>
                   </div>
                   <button className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-600 font-medium">Scheduled</button>
                </div>
              </div>
            </div>
            
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-shahana-900 mb-4">Conflict Resolution</h3>
              <div className="flex items-center justify-between bg-red-50 p-4 rounded-lg border border-red-100">
                 <div className="flex items-center space-x-3">
                   <AlertTriangle className="text-red-500" size={20} />
                   <span className="text-sm font-medium text-red-700">0 Active Disputes</span>
                 </div>
                 <span className="text-xs text-red-600 font-medium cursor-pointer hover:underline">Log Issue</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-serif font-bold text-shahana-900">Active Protocols</h3>
              <button className="text-sm text-shahana-accent font-medium hover:underline flex items-center">
                <FileSignature size={16} className="mr-1" /> Propose Amendment
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {GOVERNANCE_RULES.map(rule => (
                <div key={rule.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs px-2 py-1 rounded font-medium uppercase tracking-wide
                      ${rule.category === 'Financial' ? 'bg-blue-100 text-blue-700' : 
                        rule.category === 'Conflict' ? 'bg-red-100 text-red-700' : 
                        rule.category === 'Succession' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                      {rule.category}
                    </span>
                    <span className="text-xs text-green-600 border border-green-200 px-2 py-0.5 rounded-full">{rule.status}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-shahana-900 mb-2">{rule.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{rule.description}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'proposals' && (
        <div className="space-y-6">
           <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-100 rounded-lg">
             <div className="flex items-center space-x-3">
               <Vote className="text-amber-600" size={24} />
               <div>
                 <h4 className="text-sm font-bold text-amber-900">Voting in Progress</h4>
                 <p className="text-xs text-amber-700">2 Active proposals require your attention before end of month.</p>
               </div>
             </div>
             <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors shadow-sm">
               View My Ballots
             </button>
           </div>

           <div className="grid gap-6">
             {PROPOSALS.map(proposal => {
               const proposer = FAMILY_MEMBERS.find(m => m.id === proposal.proposerId);
               const progress = Math.min((proposal.votesFor / proposal.requiredQuorum) * 100, 100);
               
               return (
                 <div key={proposal.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6">
                       <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                         <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-1 rounded text-xs font-semibold tracking-wide
                                ${proposal.type === 'Asset' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                                `}>
                                {proposal.type}
                                </span>
                                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">
                                    {proposal.votingModel}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-shahana-900">{proposal.title}</h3>
                         </div>
                         <div className="flex items-center text-xs text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                           <Clock size={14} className="mr-1" />
                           Deadline: {proposal.deadline}
                         </div>
                       </div>
                       
                       <p className="text-slate-600 mb-6 text-sm leading-relaxed">{proposal.description}</p>
                       
                       <div className="flex items-center space-x-3 mb-6">
                         <img src={proposer?.avatarUrl} className="w-8 h-8 rounded-full border border-slate-200" />
                         <div className="text-xs">
                           <span className="block text-slate-500">Proposed by</span>
                           <span className="font-semibold text-shahana-900">{proposer?.name}</span>
                         </div>
                       </div>

                       <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                          <div className="flex justify-between text-sm mb-2">
                             <span className="font-semibold text-slate-700">Quorum Progress</span>
                             <span className="text-shahana-gold font-bold">{proposal.votesFor}% / {proposal.requiredQuorum}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
                             <div className="bg-shahana-gold h-2 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                          </div>
                          
                          <div className="flex justify-between gap-4">
                            <button className="flex-1 flex items-center justify-center space-x-2 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors group">
                               <XCircle size={18} className="text-slate-400 group-hover:text-red-500" />
                               <span className="text-sm font-medium text-slate-600 group-hover:text-red-600">Reject</span>
                            </button>
                            <button className="flex-1 flex items-center justify-center space-x-2 py-2.5 bg-shahana-900 text-white rounded-lg hover:bg-shahana-800 transition-colors shadow-sm">
                               <CheckCircle2 size={18} className="text-green-400" />
                               <span className="text-sm font-medium">Approve</span>
                            </button>
                          </div>
                       </div>
                    </div>
                 </div>
               );
             })}
           </div>
        </div>
      )}

      {activeTab === 'succession' && (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-serif font-bold text-shahana-900">Configure Automated Succession (Dead Man's Switch)</h3>
                        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                            Set up a safe escalation plan that transfers <em className="font-semibold text-slate-700">limited</em> access when prolonged inactivity is detected. 
                            Legal confirmation is required before any irreversible action.
                        </p>
                    </div>
                    {/* Dev Mode Trigger */}
                    <button onClick={() => setShowLawyerVerify(!showLawyerVerify)} className="text-[10px] text-blue-500 underline">
                        [Toggle Lawyer View]
                    </button>
                </div>
                
                {/* Lawyer Verification Simulation Panel */}
                {showLawyerVerify ? (
                    <div className="p-8 bg-slate-50 animate-in slide-in-from-top-4">
                        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                            <h4 className="text-lg font-bold text-shahana-900 mb-2 border-b pb-2">Lawyer Verification — Confirm DMS Activation</h4>
                            <p className="text-sm text-slate-600 mb-6">
                                Please review the DMS Activation Packet for <span className="font-semibold">Rajiv Shah</span>. 
                                Confirm identity and approve or reject the final escalation. Countersignature is required to finalize any irreversible action.
                            </p>
                            
                            <div className="bg-slate-50 p-4 rounded-lg mb-6 border border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors">
                                <div className="text-center">
                                    <Upload className="mx-auto text-slate-400 mb-2" />
                                    <span className="text-sm text-shahana-accent font-medium">Upload Notarized Countersignature</span>
                                    <p className="text-[10px] text-slate-400 mt-1">Stored as WORM in Vault when finalized</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button className="flex-1 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium">Reject</button>
                                <button className="flex-1 py-2 bg-shahana-900 text-white rounded-lg hover:bg-shahana-800 text-sm font-medium">Approve & Countersign</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-6 space-y-8">
                    {/* Time Config */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Inactivity Threshold</label>
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-800 focus:ring-2 focus:ring-shahana-gold/50">
                                <option value="30">30 Days</option>
                                <option value="60">60 Days</option>
                                <option value="90" selected>90 Days</option>
                                <option value="180">180 Days</option>
                                <option value="custom">Custom...</option>
                            </select>
                            <p className="text-xs text-slate-500 mt-1">Period of silence before trigger.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Cooling Period</label>
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-800 focus:ring-2 focus:ring-shahana-gold/50">
                                <option value="3">3 Days</option>
                                <option value="7" selected>7 Days</option>
                                <option value="14">14 Days</option>
                            </select>
                            <p className="text-xs text-slate-500 mt-1">Grace period to cancel activation.</p>
                        </div>
                    </div>

                    {/* Signals */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">Required Validation Signals (Min 2)</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {['No Login Activity', 'No MFA Response', 'No Reply to Secure Email', 'Lawyer Verification (Offline)', 'Biometric Fail'].map((signal, i) => (
                                <label key={i} className="flex items-center p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                                    <input type="checkbox" defaultChecked={MOCK_SUCCESSION_CONFIG.requiredSignals.includes(signal) || i < 2} className="w-4 h-4 text-shahana-gold focus:ring-shahana-gold rounded" />
                                    <span className="ml-3 text-sm text-slate-700">{signal}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Escalation */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">Escalation Actions</label>
                        <div className="space-y-3">
                            <label className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="w-4 h-4 text-shahana-gold rounded" />
                                <div className="ml-3">
                                    <span className="block text-sm font-medium text-shahana-900">Temporary Access Transfer</span>
                                    <span className="text-xs text-slate-500">Grant Read-only view of Vault & Finance to Successors</span>
                                </div>
                            </label>
                             <label className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center opacity-75 cursor-not-allowed">
                                <input type="checkbox" disabled className="w-4 h-4 text-slate-300 rounded" />
                                <div className="ml-3">
                                    <span className="block text-sm font-medium text-shahana-900">Full Ownership Transfer</span>
                                    <span className="text-xs text-slate-500 flex items-center">
                                       <ShieldCheck size={12} className="mr-1 text-slate-400" />
                                       Requires Notarized Upload & Lawyer Confirmation
                                    </span>
                                </div>
                            </label>
                        </div>
                         <div className="mt-3 bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-start">
                             <Activity size={16} className="text-blue-600 mt-0.5 mr-2 shrink-0" />
                             <p className="text-xs text-blue-800 leading-snug">
                               Automated escalation will <strong>not</strong> transfer irreversible ownership (e.g., title deeds) without at least one offline legal confirmation. This is to ensure compliance with jurisdictional requirements.
                             </p>
                        </div>
                    </div>

                    {/* Successors */}
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Designated Successors</label>
                        <div className="flex gap-4">
                            {MOCK_SUCCESSION_CONFIG.designatedSuccessors.map(id => {
                                const member = FAMILY_MEMBERS.find(m => m.id === id);
                                return (
                                    <div key={id} className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-lg shadow-sm">
                                        <img src={member?.avatarUrl} className="w-8 h-8 rounded-full" />
                                        <div className="text-xs">
                                          <span className="block font-semibold text-slate-900">{member?.name}</span>
                                          <span className="text-slate-500">{member?.role}</span>
                                        </div>
                                    </div>
                                )
                            })}
                            <button className="flex items-center justify-center w-10 h-10 rounded-full border border-dashed border-slate-300 hover:border-shahana-gold hover:text-shahana-gold text-slate-400 transition-colors">
                                <Users size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col gap-4 -mx-6 -mb-6 rounded-b-xl">
                        <label className="flex items-start cursor-pointer">
                            <input 
                            type="checkbox" 
                            checked={isLegalConsentChecked}
                            onChange={(e) => setIsLegalConsentChecked(e.target.checked)}
                            className="mt-1 w-4 h-4 text-shahana-gold rounded focus:ring-shahana-gold" 
                            />
                            <span className="ml-3 text-sm text-slate-600">
                            I confirm I have read the legal terms and will provide a notarized paper copy to Family Lawyer.
                            </span>
                        </label>
                        <div className="flex justify-end space-x-3">
                            <button className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">
                            Simulate Test
                            </button>
                            <button 
                            disabled={!isLegalConsentChecked}
                            className="px-6 py-2.5 bg-shahana-900 text-white font-medium rounded-lg hover:bg-shahana-800 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                            <Save size={16} className="mr-2" />
                            Save & Schedule Test
                            </button>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default GovernanceModule;
