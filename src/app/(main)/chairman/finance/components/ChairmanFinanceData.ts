export interface FinanceStatItem {
  id: string
  label: string
  value: string
  change: string
  isIncrease: boolean
  isGood: boolean
  iconColor: string
  iconBg: string
}

export interface RevenueExpensePoint {
  month: string
  revenue: number
  expenses: number
  revenueFormatted: string
  expensesFormatted: string
}

export interface ExpenseCategorySlice {
  name: string
  percentage: number
  amount: string
  color: string
}

export interface FinancialActivityItem {
  id: string
  date: string
  type: "Revenue" | "Expense" | "Payroll"
  reference: string
  departmentSource: string
  amount: string
  status: "Completed" | "Pending" | "Failed"
}

export const CHAIRMAN_FINANCE_STATS: FinanceStatItem[] = [
  {
    id: "total_revenue",
    label: "Total Revenue",
    value: "$24.86M",
    change: "+12.4%",
    isIncrease: true,
    isGood: true,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  {
    id: "total_expenses",
    label: "Total Expenses",
    value: "$18.27M",
    change: "+5.1%",
    isIncrease: true,
    isGood: false,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50",
  },
  {
    id: "net_profit",
    label: "Net Profit",
    value: "$6.59M",
    change: "+25.7%",
    isIncrease: true,
    isGood: true,
    iconColor: "text-teal-600",
    iconBg: "bg-teal-50",
  },
  {
    id: "payroll_cost",
    label: "Payroll Cost",
    value: "$4.32M",
    change: "+5.9%",
    isIncrease: true,
    isGood: true,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    id: "pending_receivables",
    label: "Pending Receivables",
    value: "$2.76M",
    change: "-14.8%",
    isIncrease: false,
    isGood: true,
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-50",
  },
  {
    id: "pending_payables",
    label: "Pending Payables",
    value: "$1.94M",
    change: "+6.3%",
    isIncrease: true,
    isGood: false,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
  },
]

export const REVENUE_VS_EXPENSES_DATA: RevenueExpensePoint[] = [
  {
    month: "Sep",
    revenue: 9.2,
    expenses: 7.1,
    revenueFormatted: "$9.20M",
    expensesFormatted: "$7.10M",
  },
  {
    month: "Oct",
    revenue: 10.4,
    expenses: 8.0,
    revenueFormatted: "$10.40M",
    expensesFormatted: "$8.00M",
  },
  {
    month: "Nov",
    revenue: 10.1,
    expenses: 8.2,
    revenueFormatted: "$10.10M",
    expensesFormatted: "$8.20M",
  },
  {
    month: "Dec",
    revenue: 11.8,
    expenses: 9.3,
    revenueFormatted: "$11.80M",
    expensesFormatted: "$9.30M",
  },
  {
    month: "Jan",
    revenue: 12.5,
    expenses: 9.8,
    revenueFormatted: "$12.50M",
    expensesFormatted: "$9.80M",
  },
  {
    month: "Feb",
    revenue: 14.2,
    expenses: 10.5,
    revenueFormatted: "$14.20M",
    expensesFormatted: "$10.50M",
  },
  {
    month: "Mar",
    revenue: 16.0,
    expenses: 12.1,
    revenueFormatted: "$16.00M",
    expensesFormatted: "$12.10M",
  },
  {
    month: "Apr",
    revenue: 17.8,
    expenses: 13.4,
    revenueFormatted: "$17.80M",
    expensesFormatted: "$13.40M",
  },
  {
    month: "May",
    revenue: 19.5,
    expenses: 14.6,
    revenueFormatted: "$19.50M",
    expensesFormatted: "$14.60M",
  },
  {
    month: "Jun",
    revenue: 21.0,
    expenses: 15.9,
    revenueFormatted: "$21.00M",
    expensesFormatted: "$15.90M",
  },
  {
    month: "Jul",
    revenue: 22.8,
    expenses: 17.1,
    revenueFormatted: "$22.80M",
    expensesFormatted: "$17.10M",
  },
  {
    month: "Aug",
    revenue: 24.86,
    expenses: 18.27,
    revenueFormatted: "$24.86M",
    expensesFormatted: "$18.27M",
  },
]

export const EXPENSE_BREAKDOWN_SLICES: ExpenseCategorySlice[] = [
  {
    name: "Salaries",
    percentage: 42,
    amount: "$7.67M",
    color: "#2563EB",
  },
  {
    name: "Operations",
    percentage: 18,
    amount: "$3.29M",
    color: "#10B981",
  },
  {
    name: "Marketing",
    percentage: 15,
    amount: "$2.74M",
    color: "#F97316",
  },
  {
    name: "Technology",
    percentage: 13,
    amount: "$2.38M",
    color: "#F59E0B",
  },
  {
    name: "Administration",
    percentage: 12,
    amount: "$2.19M",
    color: "#EF4444",
  },
]

export const RECENT_FINANCIAL_ACTIVITIES: FinancialActivityItem[] = [
  {
    id: "act-1",
    date: "Aug 25, 2025",
    type: "Revenue",
    reference: "INV-04583",
    departmentSource: "Client Services",
    amount: "$1,280,000",
    status: "Completed",
  },
  {
    id: "act-2",
    date: "Aug 22, 2025",
    type: "Expense",
    reference: "EXP-03821",
    departmentSource: "Operations",
    amount: "$420,000",
    status: "Completed",
  },
  {
    id: "act-3",
    date: "Aug 20, 2025",
    type: "Payroll",
    reference: "PRL-0825",
    departmentSource: "Human Resources",
    amount: "$360,000",
    status: "Completed",
  },
  {
    id: "act-4",
    date: "Aug 18, 2025",
    type: "Revenue",
    reference: "INV-04571",
    departmentSource: "Corporate Accounts",
    amount: "$950,000",
    status: "Completed",
  },
  {
    id: "act-5",
    date: "Aug 15, 2025",
    type: "Expense",
    reference: "EXP-03807",
    departmentSource: "Technology",
    amount: "$285,000",
    status: "Completed",
  },
]
