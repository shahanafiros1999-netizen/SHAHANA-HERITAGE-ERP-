
import React, { useState, useEffect } from 'react';
import { DOCUMENTS } from '../../constants';
import { Folder, FileText, Image as ImageIcon, Lock, Search, Eye, ShieldAlert, X, FileKey, CheckCircle2, Clock, UserCheck, History, RotateCcw, GitCommit, UploadCloud, FileUp, Shield, RefreshCw } from 'lucide-react';
import { Document, DocumentVersion } from '../../types';

const VaultModule: React.FC = () => {
  // --- Core Data State ---
  const [documents, setDocuments] = useState<Document[]>(DOCUMENTS);

  // --- View States ---
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [historyDoc, setHistoryDoc] = useState<Document | null>(null);
  
  // --- Auth Simulation State ---
  const [isAuthChallengeOpen, setIsAuthChallengeOpen] = useState(false);
  const [authStage, setAuthStage] = useState<'request' | 'pending_approval' | 'approved' | 'unlocked'>('request');
  const [isApproverView, setIsApproverView] = useState(false);

  // --- Upload Workflow State ---
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadState, setUploadState] = useState<'idle' | 'encrypting' | 'uploading' | 'success'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadData, setUploadData] = useState({
    title: '',
    category: 'Legal',
    accessLevel: 'Restricted',
    file: null as File | null
  });

  // --- Handlers: Document Access ---
  const handleFileClick = (doc: Document) => {
    if (doc.accessLevel === 'Top Secret' || doc.accessLevel === 'Restricted') {
      setSelectedDoc(doc);
      setIsAuthChallengeOpen(true);
      setAuthStage('request');
      setIsApproverView(false);
    } else {
      // Allow immediate access for Public/Family
      console.log(`Opening ${doc.title}...`);
    }
  };

  const handleHistoryClick = (e: React.MouseEvent, doc: Document) => {
    e.stopPropagation();
    setHistoryDoc(doc);
  };

  const handleRequestUnlock = () => {
    setAuthStage('pending_approval');
  };

  const handleApproverSign = () => {
    setAuthStage('approved');
    setTimeout(() => {
        setIsApproverView(false);
        setAuthStage('unlocked');
    }, 1500);
  };

  const closeAuth = () => {
      setIsAuthChallengeOpen(false);
      setSelectedDoc(null);
      setAuthStage('request');
      setIsApproverView(false);
  };

  // --- Handlers: Secure Upload ---
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadData({ ...uploadData, file: e.target.files[0] });
    }
  };

  const executeUpload = () => {
    if (!uploadData.file || !uploadData.title) return;

    // 1. Encryption Phase
    setUploadState('encrypting');
    setUploadProgress(0);
    
    const encryptInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(encryptInterval);
          startNetworkUpload();
          return 100;
        }
        return prev + 4; // Simulate fast local encryption
      });
    }, 50);

    const startNetworkUpload = () => {
      // 2. Upload Phase
      setUploadState('uploading');
      setUploadProgress(0);
      
      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(uploadInterval);
            finalizeUpload();
            return 100;
          }
          return prev + 8;
        });
      }, 100);
    };

    const finalizeUpload = () => {
      setUploadState('success');
      
      // Mock adding to list
      const newDoc: Document = {
        id: `new-${Date.now()}`,
        title: uploadData.title,
        type: uploadData.file?.name.split('.').pop()?.toUpperCase() as any || 'DOC',
        category: uploadData.category as any,
        uploadDate: new Date().toISOString().split('T')[0],
        accessLevel: uploadData.accessLevel as any,
        size: `${(uploadData.file!.size / 1024 / 1024).toFixed(2)} MB`,
        versions: []
      };

      setTimeout(() => {
        setDocuments([newDoc, ...documents]);
        setIsUploadOpen(false);
        setUploadState('idle');
        setUploadData({ title: '', category: 'Legal', accessLevel: 'Restricted', file: null });
        setUploadProgress(0);
      }, 1500);
    };
  };

  return (
    <div className="space-y-6 relative">
      <header className="mb-6">
        <h2 className="text-3xl font-serif text-shahana-900 font-bold mb-2">Heritage Vault</h2>
        <p className="text-slate-500">Secure storage for legal documents, digital assets, and family memories.</p>
      </header>

      {/* Vault Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
           <input 
             type="text" 
             placeholder="Search documents, dates, or tags..." 
             className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-shahana-gold/50"
           />
        </div>
        <div className="flex space-x-2">
           <button className="px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium">
             Recent
           </button>
           <button 
             onClick={() => setIsUploadOpen(true)}
             className="px-4 py-3 bg-shahana-900 text-white rounded-lg hover:bg-shahana-800 font-medium shadow-sm flex items-center transition-all"
           >
             <Lock size={16} className="mr-2 text-shahana-gold" />
             Secure Upload
           </button>
        </div>
      </div>

      {/* Folders Grid */}
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Categories</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {['Legal & Property', 'Financial Records', 'Health & Medical', 'Memories & Archives'].map((folder, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-shahana-gold/50 cursor-pointer transition-all group">
            <div className="flex justify-between items-start mb-3">
              <Folder className="text-shahana-gold fill-current" size={32} />
              <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-full">{12 + i * 4} Items</span>
            </div>
            <h4 className="font-medium text-shahana-900 group-hover:text-shahana-accent transition-colors">{folder}</h4>
            <p className="text-xs text-slate-400 mt-1">Last updated 2 days ago</p>
          </div>
        ))}
      </div>

      {/* Documents Table */}
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Recent Access</h3>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Document Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Access Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => handleFileClick(doc)}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-slate-100 rounded-lg mr-3">
                       {doc.type === 'IMG' ? <ImageIcon size={20} className="text-purple-500" /> : <FileText size={20} className="text-blue-500" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-shahana-900">{doc.title}</div>
                      <div className="text-xs text-slate-400">{doc.size}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">{doc.type}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    doc.accessLevel === 'Top Secret' ? 'bg-red-100 text-red-800' :
                    doc.accessLevel === 'Restricted' ? 'bg-amber-100 text-amber-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {doc.accessLevel === 'Top Secret' && <Lock size={10} className="mr-1" />}
                    {doc.accessLevel}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {doc.uploadDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    <button 
                      onClick={(e) => handleHistoryClick(e, doc)} 
                      className="text-slate-400 hover:text-shahana-900 transition-colors p-1"
                      title="Version History"
                    >
                      <History size={18} />
                    </button>
                    <button className="text-slate-400 hover:text-shahana-900 transition-colors p-1" title="View Document">
                      <Eye size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL: Secure Upload --- */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="bg-shahana-900 p-6 flex justify-between items-center relative overflow-hidden">
               {/* Decorative Background Element */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-shahana-gold/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
               
               <div className="flex items-center space-x-3 z-10">
                 <div className="bg-shahana-gold/20 p-2 rounded-lg">
                   <UploadCloud className="text-shahana-gold" size={24} />
                 </div>
                 <div>
                   <h3 className="text-lg font-serif font-bold text-white">Secure Envelope Creation</h3>
                   <p className="text-xs text-slate-400 flex items-center">
                     <Shield size={10} className="mr-1 text-green-400" />
                     Client-Side Encryption Active
                   </p>
                 </div>
               </div>
               <button onClick={() => setIsUploadOpen(false)} className="text-slate-400 hover:text-white z-10">
                 <X size={20} />
               </button>
            </div>

            <div className="p-6">
              {uploadState === 'idle' && (
                <div className="space-y-4">
                  {/* File Drop Zone */}
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-shahana-gold/50 hover:bg-slate-50 transition-all cursor-pointer relative group">
                     <input 
                       type="file" 
                       onChange={handleFileSelect} 
                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                     />
                     <div className="bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                       <FileUp className="text-slate-500" />
                     </div>
                     {uploadData.file ? (
                        <div>
                          <p className="text-sm font-bold text-shahana-900">{uploadData.file.name}</p>
                          <p className="text-xs text-slate-500">{(uploadData.file.size / 1024).toFixed(1)} KB • Ready to Encrypt</p>
                        </div>
                     ) : (
                        <div>
                          <p className="text-sm font-medium text-slate-700">Drag & Drop secure assets here</p>
                          <p className="text-xs text-slate-400 mt-1">Supports PDF, IMG, DOC (Max 25MB)</p>
                        </div>
                     )}
                  </div>

                  {/* Metadata Fields */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Document Title</label>
                      <input 
                        type="text" 
                        value={uploadData.title}
                        onChange={(e) => setUploadData({...uploadData, title: e.target.value})}
                        placeholder="e.g. 2024 Trust Deed Signed"
                        className="w-full text-sm p-3 border border-slate-200 rounded-lg focus:ring-shahana-gold focus:border-shahana-gold"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                        <select 
                          value={uploadData.category}
                          onChange={(e) => setUploadData({...uploadData, category: e.target.value})}
                          className="w-full text-sm p-3 border border-slate-200 rounded-lg bg-white"
                        >
                          <option>Legal</option>
                          <option>Financial</option>
                          <option>Medical</option>
                          <option>Memory</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Access Level</label>
                        <select 
                           value={uploadData.accessLevel}
                           onChange={(e) => setUploadData({...uploadData, accessLevel: e.target.value})}
                           className="w-full text-sm p-3 border border-slate-200 rounded-lg bg-white"
                        >
                          <option>Family</option>
                          <option>Restricted</option>
                          <option>Top Secret</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={executeUpload}
                    disabled={!uploadData.file || !uploadData.title}
                    className="w-full py-4 bg-shahana-900 text-white rounded-xl font-semibold hover:bg-shahana-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4 flex items-center justify-center space-x-2"
                  >
                    <Lock size={18} className="text-shahana-gold" />
                    <span>Encrypt & Store</span>
                  </button>
                </div>
              )}

              {(uploadState === 'encrypting' || uploadState === 'uploading') && (
                <div className="py-8 text-center space-y-6">
                   <div className="relative w-24 h-24 mx-auto">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100" />
                        <circle 
                          cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="6" fill="transparent" 
                          className="text-shahana-gold transition-all duration-300" 
                          strokeDasharray={251.2} 
                          strokeDashoffset={251.2 - (251.2 * uploadProgress / 100)} 
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-shahana-900">{uploadProgress}%</span>
                      </div>
                   </div>
                   <div>
                     <h4 className="text-lg font-bold text-shahana-900 animate-pulse">
                       {uploadState === 'encrypting' ? 'Encrypting Payload...' : 'Pushing to Vault...'}
                     </h4>
                     <p className="text-sm text-slate-500 mt-2 font-mono">
                       {uploadState === 'encrypting' ? 'AES-256-GCM :: Generating Keys' : 'TLS 1.3 :: Streaming Chunks'}
                     </p>
                   </div>
                </div>
              )}

              {uploadState === 'success' && (
                <div className="py-8 text-center animate-in fade-in slide-in-from-bottom-4">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={40} className="text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold text-shahana-900">Asset Secured</h4>
                  <p className="text-sm text-slate-500 mt-2">
                    Document has been encrypted, sharded, and stored in the Heritage Vault.
                  </p>
                </div>
              )}
            </div>
            
            <div className="bg-slate-50 px-6 py-4 text-center border-t border-slate-100">
               <p className="text-[10px] text-slate-400 flex items-center justify-center">
                 <Lock size={8} className="mr-1" />
                 Zero-Knowledge Architecture: We cannot read your files.
               </p>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: Version History --- */}
      {historyDoc && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
             <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <div className="bg-shahana-gold/20 p-2 rounded-lg">
                        <GitCommit className="text-shahana-gold" size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-serif font-bold text-shahana-900">Version History</h3>
                        <p className="text-xs text-slate-500">{historyDoc.title}</p>
                    </div>
                </div>
                <button onClick={() => setHistoryDoc(null)} className="text-slate-400 hover:text-slate-700">
                    <X size={20} />
                </button>
             </div>
             
             <div className="p-0 max-h-[60vh] overflow-y-auto">
                {historyDoc.versions && historyDoc.versions.length > 0 ? (
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Ver</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Editor</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Log</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {historyDoc.versions.map((ver, idx) => (
                                <tr key={ver.id} className="hover:bg-slate-50 group transition-colors">
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-mono px-2 py-1 rounded ${idx === 0 ? 'bg-green-100 text-green-700 font-bold' : 'bg-slate-100 text-slate-600'}`}>
                                            {ver.versionTag}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{ver.date}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-shahana-900">{ver.editorName}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate" title={ver.changeLog}>{ver.changeLog}</td>
                                    <td className="px-6 py-4 text-right">
                                        {idx !== 0 && (
                                            <button className="text-shahana-accent hover:underline text-xs font-medium flex items-center justify-end">
                                                <RotateCcw size={12} className="mr-1" /> Restore
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-12 text-center">
                        <History className="mx-auto text-slate-300 mb-2" size={32} />
                        <p className="text-slate-500">No version history available for this document.</p>
                    </div>
                )}
             </div>
          </div>
        </div>
      )}

      {/* --- MODAL: Auth Challenge (Multi-Sig Simulation) --- */}
      {isAuthChallengeOpen && selectedDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
             <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
                {isApproverView ? (
                   // --- APPROVER VIEW (Simulation) ---
                   <div className="p-8 bg-shahana-surface">
                       <div className="text-center mb-6">
                           <UserCheck size={48} className="mx-auto text-shahana-gold mb-4" />
                           <h3 className="text-xl font-bold text-shahana-900">Approver Request</h3>
                           <p className="text-sm text-slate-600 mt-2">
                               <span className="font-semibold">Rajiv Shah</span> requested access to <br/>
                               <span className="italic">{selectedDoc.title}</span>
                           </p>
                       </div>
                       <div className="flex space-x-4">
                           <button onClick={() => setIsApproverView(false)} className="flex-1 py-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-medium">
                               Deny
                           </button>
                           <button onClick={handleApproverSign} className="flex-1 py-3 bg-shahana-900 text-white rounded-lg hover:bg-shahana-800 font-medium flex justify-center items-center">
                               <FileKey size={18} className="mr-2" />
                               Sign & Approve
                           </button>
                       </div>
                       <p className="text-xs text-center text-slate-400 mt-4">Simulating Patriarch/Matriarch approval</p>
                   </div>
                ) : (
                   // --- REQUESTER VIEW ---
                   <>
                       <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                             <ShieldAlert className="text-red-600" size={24} />
                             <div>
                                 <h3 className="text-lg font-bold text-shahana-900">Restricted Access</h3>
                                 <p className="text-xs text-slate-500">{selectedDoc.accessLevel} Protocol Enforced</p>
                             </div>
                          </div>
                          <button onClick={closeAuth} className="text-slate-400 hover:text-slate-700">
                             <X size={20} />
                          </button>
                       </div>

                       <div className="p-8">
                          {authStage === 'request' && (
                             <div className="space-y-6">
                                 <p className="text-sm text-slate-600">
                                     This document is cryptographically locked. To decrypt, you must request a temporary access lease and obtain multi-sig approval.
                                 </p>
                                 <div>
                                     <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Access Duration</label>
                                     <select className="w-full border border-slate-300 rounded-lg p-2 text-sm bg-white">
                                         <option value="24">24 Hours</option>
                                         <option value="48">48 Hours</option>
                                         <option value="72">72 Hours (Standard)</option>
                                     </select>
                                 </div>
                                 <button 
                                   onClick={handleRequestUnlock}
                                   className="w-full bg-shahana-900 text-white py-3 rounded-lg font-medium hover:bg-shahana-800 transition-colors flex justify-center items-center"
                                 >
                                   <Lock size={16} className="mr-2" />
                                   Initiate Unlock Request
                                 </button>
                             </div>
                          )}

                          {authStage === 'pending_approval' && (
                              <div className="text-center py-4">
                                  <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                      <Clock className="text-amber-500" size={32} />
                                  </div>
                                  <h4 className="text-lg font-bold text-shahana-900">Awaiting Approval</h4>
                                  <p className="text-sm text-slate-500 mt-2 mb-6">
                                      Notification sent to 2 Keyholders.<br/>Waiting for 1 signature.
                                  </p>
                                  <button onClick={() => setIsApproverView(true)} className="text-xs text-blue-500 hover:underline">
                                      [Dev: Simulate Approver Login]
                                  </button>
                              </div>
                          )}

                          {authStage === 'approved' && (
                              <div className="text-center py-4">
                                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                      <CheckCircle2 className="text-green-500" size={32} />
                                  </div>
                                  <h4 className="text-lg font-bold text-shahana-900">Access Granted</h4>
                                  <p className="text-sm text-slate-500 mt-2">
                                      Decryption keys received.
                                  </p>
                              </div>
                          )}
                          
                          {authStage === 'unlocked' && (
                              <div className="text-center space-y-4">
                                  <div className="p-4 bg-slate-100 rounded-lg border border-slate-200">
                                      <FileText size={32} className="mx-auto text-shahana-900 mb-2" />
                                      <p className="font-bold text-shahana-900">{selectedDoc.title}</p>
                                      <p className="text-xs text-slate-500">{selectedDoc.size} • Decrypted</p>
                                  </div>
                                  <div className="flex gap-3">
                                      <button className="flex-1 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50">Preview</button>
                                      <button className="flex-1 py-2 bg-shahana-900 text-white rounded-lg text-sm font-medium hover:bg-shahana-800 flex items-center justify-center">
                                          <UploadCloud size={14} className="mr-2" /> Download
                                      </button>
                                  </div>
                              </div>
                          )}
                       </div>
                   </>
                )}
             </div>
          </div>
      )}
    </div>
  );
};

export default VaultModule;
