import {
  AccountantKpi,
  MonthlyTrendData,
  CategoryExpenseData,
  PendingItem,
  RecentActivity,
} from "../types"

export const accountantKpis: AccountantKpi[] = [
  {
    id: "money-received",
    title: "Money Received",
    value: "₹ 24,45,200",
    trend: "+12.4% vs last month",
    trendType: "up",
    iconType: "received",
  },
  {
    id: "money-paid",
    title: "Money Paid",
    value: "₹ 18,92,650",
    trend: "+8.7% vs last month",
    trendType: "up",
    iconType: "paid",
  },
  {
    id: "upcoming-payments",
    title: "Upcoming Payments",
    value: "₹ 2,35,000",
    subtitle: "4 payments",
    iconType: "upcoming",
  },
]

export const monthlyTrendData: MonthlyTrendData[] = [
  { month: "Jun", received: 800000, paid: 550000 },
  { month: "Jul", received: 1400000, paid: 1050000 },
  { month: "Aug", received: 1450000, paid: 1100000 },
  { month: "Sep", received: 1400000, paid: 1150000 },
  { month: "Oct", received: 1700000, paid: 1300000 },
  { month: "Nov", received: 2445200, paid: 1892650 },
]

export const categoryExpensesData: CategoryExpenseData[] = [
  {
    name: "Utilities (Electricity, Internet, etc.)",
    percentage: 28,
    amount: 346192,
    color: "#2563EB",
  },
  {
    name: "Office & Administration",
    percentage: 20,
    amount: 247280,
    color: "#10B981",
  },
  {
    name: "Rent & Facilities",
    percentage: 18,
    amount: 222552,
    color: "#F59E0B",
  },
  {
    name: "Software & Subscriptions",
    percentage: 12,
    amount: 148368,
    color: "#8B5CF6",
  },
  {
    name: "Travel & Employee Expenses",
    percentage: 10,
    amount: 123640,
    color: "#EC4899",
  },
  {
    name: "Others",
    percentage: 12,
    amount: 148368,
    color: "#94A3B8",
  },
]

export const totalCategoryExpense = "₹ 12,36,400"

export const pendingItems: PendingItem[] = [
  {
    id: "pending-expense-entries",
    title: "Pending Expense Entries",
    amount: "₹ 3,48,000",
    count: 7,
    iconType: "expense-entries",
  },
  {
    id: "pending-reimbursements",
    title: "Pending Reimbursements",
    amount: "₹ 1,26,500",
    count: 4,
    iconType: "reimbursements",
  },
  {
    id: "pending-payments",
    title: "Pending Payments",
    amount: "₹ 2,35,000",
    count: 4,
    iconType: "payments",
  },
]

export const recentActivities: RecentActivity[] = [
  {
    id: "act-1",
    description: "Expense added – Electricity Bill (TSSPDCL)",
    amount: "₹ 18,450",
    date: "28 Nov 2026",
    type: "expense",
  },
  {
    id: "act-2",
    description: "Payment recorded – Office Rent",
    amount: "₹ 1,20,000",
    date: "26 Nov 2026",
    type: "payment",
  },
  {
    id: "act-3",
    description: "Reimbursement approved – Travel (EMP104)",
    amount: "₹ 9,800",
    date: "25 Nov 2026",
    type: "reimbursement",
  },
  {
    id: "act-4",
    description: "Expense added – Internet Bill (Airtel)",
    amount: "₹ 4,720",
    date: "24 Nov 2026",
    type: "expense",
  },
]

export const allRecentActivities: RecentActivity[] = [
  {
    id: "act-1",
    description: "Expense added – Electricity Bill (TSSPDCL)",
    amount: "₹ 18,450",
    date: "28 Nov 2026",
    type: "expense",
  },
  {
    id: "act-2",
    description: "Payment recorded – Office Rent",
    amount: "₹ 1,20,000",
    date: "26 Nov 2026",
    type: "payment",
  },
  {
    id: "act-3",
    description: "Reimbursement approved – Travel (EMP104)",
    amount: "₹ 9,800",
    date: "25 Nov 2026",
    type: "reimbursement",
  },
  {
    id: "act-4",
    description: "Expense added – Internet Bill (Airtel)",
    amount: "₹ 4,720",
    date: "24 Nov 2026",
    type: "expense",
  },
  {
    id: "act-5",
    description: "Expense added – Electricity Bill (TSSPDCL)",
    amount: "₹ 18,450",
    date: "28 Nov 2026",
    type: "expense",
  },
  {
    id: "act-6",
    description: "Payment recorded – Office Rent",
    amount: "₹ 1,20,000",
    date: "26 Nov 2026",
    type: "payment",
  },
  {
    id: "act-7",
    description: "Reimbursement approved – Travel (EMP104)",
    amount: "₹ 9,800",
    date: "25 Nov 2026",
    type: "reimbursement",
  },
  {
    id: "act-8",
    description: "Expense added – Internet Bill (Airtel)",
    amount: "₹ 4,720",
    date: "24 Nov 2026",
    type: "expense",
  },
  {
    id: "act-9",
    description: "Expense added – Electricity Bill (TSSPDCL)",
    amount: "₹ 18,450",
    date: "28 Nov 2026",
    type: "expense",
  },
  {
    id: "act-10",
    description: "Payment recorded – Office Rent",
    amount: "₹ 1,20,000",
    date: "26 Nov 2026",
    type: "payment",
  },
]

