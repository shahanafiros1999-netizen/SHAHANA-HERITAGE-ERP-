import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Landmark, 
  Scale, 
  Users, 
  Vault, 
  Bot, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { ModuleType, FamilyMember } from '../types';

interface LayoutProps {
  currentModule: ModuleType;
  onModuleChange: (module: ModuleType) => void;
  currentUser: FamilyMember;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ 
  currentModule, 
  onModuleChange, 
  currentUser, 
  onLogout,
  children 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { type: ModuleType.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { type: ModuleType.ASSETS, label: 'Asset Register', icon: Building2 },
    { type: ModuleType.FINANCE, label: 'Finance & Budget', icon: Landmark },
    { type: ModuleType.GOVERNANCE, label: 'Constitution', icon: Scale },
    { type: ModuleType.HR, label: 'Family HR', icon: Users },
    { type: ModuleType.VAULT, label: 'Heritage Vault', icon: Vault },
    { type: ModuleType.ADVISOR, label: 'AI Advisor', icon: Bot },
  ];

  const NavContent = () => (
    <div className="flex flex-col h-full bg-shahana-900 text-white">
      <div className="p-6 border-b border-shahana-800">
        <h1 className="font-serif text-xl tracking-wider text-shahana-gold font-bold">SHAHANA</h1>
        <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Heritage ERP</p>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentModule === item.type;
          return (
            <button
              key={item.type}
              onClick={() => {
                onModuleChange(item.type);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-shahana-gold text-shahana-900 font-medium' 
                  : 'text-slate-300 hover:bg-shahana-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-shahana-800 bg-shahana-900/50">
        <div className="flex items-center space-x-3 mb-4">
          <img 
            src={currentUser.avatarUrl} 
            alt={currentUser.name} 
            className="w-10 h-10 rounded-full border-2 border-shahana-gold"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{currentUser.name}</p>
            <p className="text-xs text-slate-400 truncate">{currentUser.role}</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 p-2 text-sm text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 flex-col fixed inset-y-0 z-50">
        <NavContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-shahana-900 text-white z-50 px-4 py-3 flex items-center justify-between shadow-md">
        <div className="font-serif text-lg text-shahana-gold font-bold">SHAHANA</div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-shahana-900" onClick={e => e.stopPropagation()}>
             <NavContent />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-72 pt-16 md:pt-0 overflow-y-auto bg-slate-50 h-full">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
           {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
