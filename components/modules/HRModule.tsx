import React from 'react';
import { WELLNESS_LOGS, FAMILY_MEMBERS, TASKS } from '../../constants';
import { Heart, GraduationCap, Trophy, Activity, Users, Calendar } from 'lucide-react';

const HRModule: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h2 className="text-3xl font-serif text-shahana-900 font-bold mb-2">People Operations</h2>
        <p className="text-slate-500">Managing the health, education, and roles of the human capital.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Family Wellness Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-shahana-900 flex items-center">
              <Heart className="mr-2 text-red-500" size={20} />
              Health & Wellness
            </h3>
            <button className="text-xs text-slate-500 hover:text-shahana-900 bg-slate-100 px-2 py-1 rounded">Log Update</button>
          </div>
          
          <div className="space-y-4">
             {WELLNESS_LOGS.map(log => {
               const member = FAMILY_MEMBERS.find(m => m.id === log.memberId);
               return (
                 <div key={log.id} className="p-3 bg-red-50/50 border border-red-100 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-bold text-slate-700">{member?.name}</span>
                      <span className="text-[10px] text-slate-400">{log.date}</span>
                    </div>
                    <p className="text-sm text-shahana-900">{log.note}</p>
                    <div className="mt-2 flex items-center">
                       <Activity size={12} className="text-red-400 mr-1" />
                       <span className="text-xs text-slate-500">{log.type} Check-up</span>
                    </div>
                 </div>
               )
             })}
          </div>
        </div>

        {/* Next Gen Education */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-shahana-900 flex items-center">
              <GraduationCap className="mr-2 text-blue-500" size={20} />
              Next-Gen Enablement
            </h3>
          </div>
          <div className="relative pl-4 border-l-2 border-slate-100 space-y-6">
            <div className="relative">
               <span className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-green-500 ring-4 ring-white"></span>
               <h4 className="text-sm font-bold text-shahana-900">Mira Hana</h4>
               <p className="text-xs text-slate-500 mb-1">MBA Application Cycle</p>
               <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                 Status: Recommendations Pending
               </div>
            </div>
            <div className="relative">
               <span className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-slate-300 ring-4 ring-white"></span>
               <h4 className="text-sm font-bold text-shahana-900">Arjun Shah Jr.</h4>
               <p className="text-xs text-slate-500 mb-1">Coding Bootcamp</p>
               <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
                 Starts: Sept 2024
               </div>
            </div>
          </div>
        </div>

        {/* Roles & Responsibilities */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-shahana-900 flex items-center">
              <Users className="mr-2 text-purple-500" size={20} />
              Active Roles
            </h3>
          </div>
          <div className="space-y-3">
             <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
               <div className="flex items-center space-x-3">
                 <img src={FAMILY_MEMBERS[0].avatarUrl} className="w-8 h-8 rounded-full" />
                 <div>
                   <p className="text-sm font-medium text-shahana-900">Rajiv Shah</p>
                   <p className="text-xs text-slate-400">CIO & Patriarch</p>
                 </div>
               </div>
               <Trophy size={16} className="text-shahana-gold" />
             </div>
              <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
               <div className="flex items-center space-x-3">
                 <img src={FAMILY_MEMBERS[3].avatarUrl} className="w-8 h-8 rounded-full" />
                 <div>
                   <p className="text-sm font-medium text-shahana-900">Mira Hana</p>
                   <p className="text-xs text-slate-400">Digital Transformation Lead</p>
                 </div>
               </div>
             </div>
          </div>
          <button className="w-full mt-6 py-2 border border-dashed border-slate-300 rounded-lg text-sm text-slate-500 hover:text-shahana-900 hover:border-shahana-900 transition-colors">
            + Assign New Role
          </button>
        </div>
      </div>
      
      {/* Task Matrix */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-semibold text-shahana-900 mb-4">Task Allocation Matrix</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           {TASKS.map(task => (
             <div key={task.id} className="p-4 border border-slate-100 rounded-lg bg-slate-50">
                <span className={`text-[10px] uppercase font-bold tracking-wider ${
                  task.priority === 'High' ? 'text-red-600' : 'text-slate-500'
                }`}>{task.priority} Priority</span>
                <h4 className="font-medium text-shahana-900 mt-1 mb-2 leading-tight">{task.title}</h4>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center"><Calendar size={12} className="mr-1"/> {task.dueDate}</span>
                  <span className="bg-white px-2 py-0.5 rounded shadow-sm">
                    {FAMILY_MEMBERS.find(m => m.id === task.assigneeId)?.name.split(' ')[0]}
                  </span>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default HRModule;
