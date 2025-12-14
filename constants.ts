
import { Asset, AssetCategory, FamilyMember, FinancialMetric, GovernanceRule, Role, Task, BudgetCategory, Document, WellnessLog, Proposal, LedgerEntry, SuccessionConfig } from './types';

export const FAMILY_MEMBERS: FamilyMember[] = [
  { id: '1', name: 'Rajiv Shah', familyBranch: 'Shah', role: Role.PATRIARCH, mobile: '9999999999', avatarUrl: 'https://picsum.photos/seed/rajiv/100/100' },
  { id: '2', name: 'Sunita Hana', familyBranch: 'Hana', role: Role.MATRIARCH, mobile: '8888888888', avatarUrl: 'https://picsum.photos/seed/sunita/100/100' },
  { id: '3', name: 'Arjun Shah', familyBranch: 'Shah', role: Role.ADULT, mobile: '7777777777', avatarUrl: 'https://picsum.photos/seed/arjun/100/100' },
  { id: '4', name: 'Mira Hana', familyBranch: 'Hana', role: Role.NEXT_GEN, mobile: '6666666666', avatarUrl: 'https://picsum.photos/seed/mira/100/100' },
];

export const MOCK_ASSETS: Asset[] = [
  { id: 'a1', name: 'Shahana Tower (Comm)', category: AssetCategory.REAL_ESTATE, value: 45000000, currency: 'USD', owner: 'SHAHANA LLP', lastValuationDate: '2024-01-15', roi: 8.5, occupancy: 92, yield: 6.8 },
  { id: 'a2', name: 'Heritage Textiles Ltd', category: AssetCategory.BUSINESS, value: 12000000, currency: 'USD', owner: 'Joint Family', lastValuationDate: '2024-03-01', roi: 12.2 },
  { id: 'a3', name: 'Global Equity Portfolio', category: AssetCategory.PUBLIC_MARKETS, value: 8500000, currency: 'USD', owner: 'Trust A', lastValuationDate: '2024-05-20', roi: 15.4 },
  { id: 'a4', name: 'Bitcoin Cold Storage', category: AssetCategory.CRYPTO, value: 1200000, currency: 'USD', owner: 'NextGen Fund', lastValuationDate: '2024-05-21', roi: 45.0 },
  { id: 'a5', name: 'Vintage Watch Collection', category: AssetCategory.LUXURY, value: 500000, currency: 'USD', owner: 'Rajiv Shah', lastValuationDate: '2023-12-01', roi: 4.0 },
  { id: 'a6', name: 'Kensington Flat 4B', category: AssetCategory.REAL_ESTATE, value: 2500000, currency: 'GBP', owner: 'Trust B', lastValuationDate: '2023-11-01', roi: 3.2, occupancy: 100, yield: 4.1 },
];

export const GOVERNANCE_RULES: GovernanceRule[] = [
  { id: 'g1', category: 'Financial', title: 'Liquidity Buffer Mandate', description: 'At least 15% of total portfolio value must be maintained in liquid assets or cash equivalents at all times.', status: 'Active' },
  { id: 'g2', category: 'Succession', title: 'Business Entry Criteria', description: 'Next-gen members must work 2 years outside the family business before joining efficiently.', status: 'Active' },
  { id: 'g3', category: 'Conflict', title: 'Dispute Resolution Council', description: 'Any dispute exceeding $100k value requires mediation by the external advisory board.', status: 'Active' },
];

export const PROPOSALS: Proposal[] = [
  {
    id: 'p1',
    title: 'Acquire Commercial Unit in DIFC',
    description: 'Purchase of 2,500 sqft office space in Dubai for family office expansion. Value: $1.2M. Projected yield: 6.5%.',
    type: 'Asset',
    proposerId: '1',
    deadline: '2024-06-30',
    votesFor: 65,
    votesAgainst: 10,
    status: 'Active',
    requiredQuorum: 75,
    votingModel: 'Equity-Weighted'
  },
  {
    id: 'p2',
    title: 'Update Education Stipend Policy',
    description: 'Increase annual limit for Ivy League applicants to $150k/year to cover rising tuition costs.',
    type: 'Policy',
    proposerId: '2',
    deadline: '2024-07-15',
    votesFor: 40,
    votesAgainst: 5,
    status: 'Active',
    requiredQuorum: 50,
    votingModel: 'One-Person-One-Vote'
  }
];

export const TASKS: Task[] = [
  { id: 't1', title: 'Approve Q2 Trust Distribution', assigneeId: '1', status: 'Pending', priority: 'High', dueDate: '2024-06-01', category: 'Business' },
  { id: 't2', title: 'Submit Annual Health Checkup', assigneeId: '3', status: 'Completed', priority: 'Medium', dueDate: '2024-05-15', category: 'Health' },
  { id: 't3', title: 'Review Smart Contract for Tokenization', assigneeId: '4', status: 'In Progress', priority: 'High', dueDate: '2024-06-10', category: 'Business' },
  { id: 't4', title: 'Summer Internship Selection', assigneeId: '4', status: 'Pending', priority: 'Medium', dueDate: '2024-06-15', category: 'Education' },
];

export const FINANCIAL_HISTORY: FinancialMetric[] = [
  { month: 'Jan', revenue: 120, expenses: 40, savings: 80 },
  { month: 'Feb', revenue: 140, expenses: 55, savings: 85 },
  { month: 'Mar', revenue: 110, expenses: 35, savings: 75 },
  { month: 'Apr', revenue: 160, expenses: 60, savings: 100 },
  { month: 'May', revenue: 190, expenses: 70, savings: 120 },
];

export const LEDGER_ENTRIES: LedgerEntry[] = [
  { id: 'l1', date: '2024-05-25', description: 'Rent Payment - Kensington Flat', category: 'Real Estate Income', amount: 8500, type: 'Credit', account: 'Barclays GBP', status: 'Reconciled' },
  { id: 'l2', date: '2024-05-24', description: 'Legal Retainer - Monthly', category: 'Professional Services', amount: 2500, type: 'Debit', account: 'Chase USD', status: 'Reconciled' },
  { id: 'l3', date: '2024-05-22', description: 'Quarterly Dividend - Heritage Textiles', category: 'Business Income', amount: 150000, type: 'Credit', account: 'UBS Wealth', status: 'Reconciled' },
  { id: 'l4', date: '2024-05-20', description: 'Tuition Fee - Columbia Univ', category: 'Education', amount: 45000, type: 'Debit', account: 'Trust Fund A', status: 'Pending' },
  { id: 'l5', date: '2024-05-18', description: 'Maintenance - Shahana Tower Lifts', category: 'Property Expense', amount: 12000, type: 'Debit', account: 'Chase USD', status: 'Reconciled' },
];

export const BUDGETS: BudgetCategory[] = [
  { id: 'b1', name: 'Household Operations', allocated: 50000, spent: 42000, status: 'On Track' },
  { id: 'b2', name: 'Travel & Lifestyle', allocated: 30000, spent: 35000, status: 'Exceeded' },
  { id: 'b3', name: 'Philanthropy', allocated: 20000, spent: 5000, status: 'On Track' },
  { id: 'b4', name: 'Legal & Professional', allocated: 15000, spent: 12000, status: 'Warning' },
  { id: 'b5', name: 'Security & Logistics', allocated: 10000, spent: 4500, status: 'On Track' },
];

export const DOCUMENTS: Document[] = [
  { 
    id: 'd1', 
    title: 'Family Constitution v4.2', 
    type: 'PDF', 
    category: 'Legal', 
    uploadDate: '2023-11-15', 
    accessLevel: 'Family', 
    size: '2.4 MB',
    versions: [
      { id: 'v1-1', versionTag: 'v4.2', date: '2023-11-15', editorName: 'Rajiv Shah', changeLog: 'Ratified amendments to digital asset clauses' },
      { id: 'v1-2', versionTag: 'v4.1', date: '2022-05-20', editorName: 'Sunita Hana', changeLog: 'Annual review' },
      { id: 'v1-3', versionTag: 'v4.0', date: '2021-01-10', editorName: 'Rajiv Shah', changeLog: 'Initial digital drafting' },
    ]
  },
  { 
    id: 'd2', 
    title: 'Shahana Tower Deed', 
    type: 'PDF', 
    category: 'Legal', 
    uploadDate: '2022-04-10', 
    accessLevel: 'Restricted', 
    size: '5.1 MB',
    versions: [
      { id: 'v2-1', versionTag: 'v1.0', date: '2022-04-10', editorName: 'Legal Team', changeLog: 'Original notarized scan upload' }
    ]
  },
  { id: 'd3', title: 'Grandfather Letters (1980)', type: 'IMG', category: 'Memory', uploadDate: '2024-01-20', accessLevel: 'Public', size: '150 MB' },
  { id: 'd4', title: 'Swiss Trust Access Codes', type: 'DOC', category: 'Financial', uploadDate: '2024-05-01', accessLevel: 'Top Secret', size: '12 KB' },
  { 
    id: 'd5', 
    title: 'Annual Tax Returns 2023', 
    type: 'PDF', 
    category: 'Financial', 
    uploadDate: '2024-04-15', 
    accessLevel: 'Restricted', 
    size: '8.2 MB',
    versions: [
      { id: 'v5-2', versionTag: 'v2.0', date: '2024-04-15', editorName: 'Finance Team', changeLog: 'Final filed copy' },
      { id: 'v5-1', versionTag: 'v1.0', date: '2024-04-01', editorName: 'Auditor', changeLog: 'Draft for review' }
    ]
  },
  { id: 'd6', title: 'Last Will & Testament - R. Shah', type: 'PDF', category: 'Legal', uploadDate: '2023-12-01', accessLevel: 'Top Secret', size: '1.1 MB' },
];

export const WELLNESS_LOGS: WellnessLog[] = [
  { id: 'w1', memberId: '1', date: '2024-05-20', type: 'Medical', note: 'Annual Cardiac Review - All Clear', status: 'Routine' },
  { id: 'w2', memberId: '4', date: '2024-05-18', type: 'Mental', note: 'Exam Stress Management Session', status: 'Routine' },
];

export const MOCK_SUCCESSION_CONFIG: SuccessionConfig = {
  inactivityThresholdDays: 90,
  requiredSignals: ['No Login', 'No MFA Response', 'Lawyer Verification'],
  designatedSuccessors: ['3', '4'], // IDs of successors
  escalationActions: ['Temporary Access Transfer', 'Limited Finance Approvals'],
  coolingPeriodDays: 7,
  legalConsentConfirmed: true,
  status: 'Active'
};
