
export enum Role {
  PATRIARCH = 'PATRIARCH',
  MATRIARCH = 'MATRIARCH',
  ADULT = 'ADULT',
  NEXT_GEN = 'NEXT_GEN',
  ADMIN = 'ADMIN'
}

export enum ModuleType {
  DASHBOARD = 'DASHBOARD',
  ASSETS = 'ASSETS',
  FINANCE = 'FINANCE',
  GOVERNANCE = 'GOVERNANCE',
  HR = 'HR',
  VAULT = 'VAULT',
  ADVISOR = 'ADVISOR',
}

export interface FamilyMember {
  id: string;
  name: string;
  familyBranch: 'Shah' | 'Hana';
  role: Role;
  mobile: string;
  avatarUrl: string;
}

export enum AssetCategory {
  REAL_ESTATE = 'Real Estate',
  BUSINESS = 'Business Equity',
  PUBLIC_MARKETS = 'Stocks & Bonds',
  CRYPTO = 'Digital Assets',
  LUXURY = 'Art & Luxury',
  CASH = 'Cash & Equivalents'
}

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  value: number;
  currency: string;
  owner: string; 
  lastValuationDate: string;
  roi?: number;
  occupancy?: number; // For Real Estate
  yield?: number; // For Real Estate
}

export interface GovernanceRule {
  id: string;
  category: 'Financial' | 'Conflict' | 'Succession' | 'Brand';
  title: string;
  description: string;
  status: 'Active' | 'Draft' | 'Under Review';
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  type: 'Financial' | 'Policy' | 'Asset';
  proposerId: string;
  deadline: string;
  votesFor: number;
  votesAgainst: number;
  status: 'Active' | 'Passed' | 'Rejected';
  requiredQuorum: number;
  votingModel: 'One-Person-One-Vote' | 'Equity-Weighted';
}

export interface Task {
  id: string;
  title: string;
  assigneeId: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  category: 'Business' | 'Family' | 'Health' | 'Education';
}

export interface FinancialMetric {
  month: string;
  revenue: number;
  expenses: number;
  savings: number;
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  status: 'On Track' | 'Warning' | 'Exceeded';
}

export interface LedgerEntry {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'Credit' | 'Debit';
  account: string;
  status: 'Reconciled' | 'Pending';
  referenceId?: string;
}

export interface DocumentVersion {
  id: string;
  versionTag: string;
  date: string;
  editorName: string;
  changeLog: string;
}

export interface Document {
  id: string;
  title: string;
  type: 'PDF' | 'IMG' | 'DOC';
  category: 'Legal' | 'Financial' | 'Medical' | 'Memory';
  uploadDate: string;
  accessLevel: 'Public' | 'Family' | 'Restricted' | 'Top Secret';
  size: string;
  versions?: DocumentVersion[];
}

export interface VaultRequest {
  id: string;
  documentId: string;
  requesterId: string;
  reason: string;
  accessWindowHours: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  approvals: {
    approverRole: string;
    status: 'Pending' | 'Signed';
    timestamp?: string;
  }[];
}

export interface WellnessLog {
  id: string;
  memberId: string;
  date: string;
  type: 'Medical' | 'Fitness' | 'Mental';
  note: string;
  status: 'Routine' | 'Critical';
}

export interface SuccessionConfig {
  inactivityThresholdDays: number;
  requiredSignals: string[];
  designatedSuccessors: string[];
  escalationActions: string[];
  coolingPeriodDays: number;
  legalConsentConfirmed: boolean;
  status: 'Active' | 'Configuration Incomplete';
}
