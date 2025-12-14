import React, { useState } from 'react';
import Layout from './components/Layout';
import Login from './components/Login';
import DashboardModule from './components/modules/DashboardModule';
import AssetsModule from './components/modules/AssetsModule';
import GovernanceModule from './components/modules/GovernanceModule';
import AdvisorModule from './components/modules/AdvisorModule';
import FinanceModule from './components/modules/FinanceModule';
import VaultModule from './components/modules/VaultModule';
import HRModule from './components/modules/HRModule';
import { FamilyMember, ModuleType } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<FamilyMember | null>(null);
  const [currentModule, setCurrentModule] = useState<ModuleType>(ModuleType.DASHBOARD);

  // Simple Router Switch
  const renderModule = () => {
    switch (currentModule) {
      case ModuleType.DASHBOARD:
        return <DashboardModule />;
      case ModuleType.ASSETS:
        return <AssetsModule />;
      case ModuleType.FINANCE:
        return <FinanceModule />;
      case ModuleType.GOVERNANCE:
        return <GovernanceModule />;
      case ModuleType.VAULT:
        return <VaultModule />;
      case ModuleType.HR:
        return <HRModule />;
      case ModuleType.ADVISOR:
        return <AdvisorModule />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[50vh] text-slate-400">
            <h3 className="text-xl font-medium mb-2">Module Under Development</h3>
            <p>This section is scheduled for Phase 3 Deployment.</p>
          </div>
        );
    }
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <Layout 
      currentModule={currentModule} 
      onModuleChange={setCurrentModule}
      currentUser={user}
      onLogout={() => setUser(null)}
    >
      {renderModule()}
    </Layout>
  );
};

export default App;
