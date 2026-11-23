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
  [key: string]: string | number | boolean | undefined
}

export interface FinancialActivityItem {
  id: string
  date: string
  type: "Revenue" | "Expense" | "Payroll"
  reference: string
  departmentSource: string
  amount: string
  status: "Completed" | "Pending" | "Failed" | "Processing"
  paymentMethod?: string
  description?: string
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

export const ALL_FINANCIAL_ACTIVITIES: FinancialActivityItem[] = [
  {
    id: "act-1",
    date: "Aug 25, 2025",
    type: "Revenue",
    reference: "INV-04583",
    departmentSource: "Client Services",
    amount: "$1,280,000",
    status: "Completed",
    paymentMethod: "Wire Transfer",
    description: "Enterprise multi-region software deployment contract final tranche.",
  },
  {
    id: "act-2",
    date: "Aug 22, 2025",
    type: "Expense",
    reference: "EXP-03821",
    departmentSource: "Operations",
    amount: "$420,000",
    status: "Completed",
    paymentMethod: "Corporate ACH",
    description: "Global cloud infrastructure tier-1 data center hosting fees.",
  },
  {
    id: "act-3",
    date: "Aug 20, 2025",
    type: "Payroll",
    reference: "PRL-0825",
    departmentSource: "Human Resources",
    amount: "$360,000",
    status: "Completed",
    paymentMethod: "Direct Deposit",
    description: "Bi-weekly contractor disbursements and performance bonuses.",
  },
  {
    id: "act-4",
    date: "Aug 18, 2025",
    type: "Revenue",
    reference: "INV-04571",
    departmentSource: "Corporate Accounts",
    amount: "$950,000",
    status: "Completed",
    paymentMethod: "Wire Transfer",
    description: "Annual SaaS licensing subscription renewal for strategic partner.",
  },
  {
    id: "act-5",
    date: "Aug 15, 2025",
    type: "Expense",
    reference: "EXP-03807",
    departmentSource: "Technology",
    amount: "$285,000",
    status: "Completed",
    paymentMethod: "Corporate Card",
    description: "Developer tooling licenses, AI compute tokens, and dev infrastructure.",
  },
  {
    id: "act-6",
    date: "Aug 14, 2025",
    type: "Revenue",
    reference: "INV-04562",
    departmentSource: "Strategic Consulting",
    amount: "$680,000",
    status: "Completed",
    paymentMethod: "ACH Transfer",
    description: "Enterprise IT modernization advisory deliverables milestone 2.",
  },
  {
    id: "act-7",
    date: "Aug 12, 2025",
    type: "Payroll",
    reference: "PRL-0812",
    departmentSource: "Human Resources",
    amount: "$1,840,000",
    status: "Completed",
    paymentMethod: "Direct Deposit",
    description: "Monthly executive and salaried workforce payroll execution.",
  },
  {
    id: "act-8",
    date: "Aug 10, 2025",
    type: "Expense",
    reference: "EXP-03792",
    departmentSource: "Marketing",
    amount: "$175,000",
    status: "Completed",
    paymentMethod: "Corporate Card",
    description: "Q3 global industry tech conference sponsorship and booth setup.",
  },
  {
    id: "act-9",
    date: "Aug 08, 2025",
    type: "Revenue",
    reference: "INV-04544",
    departmentSource: "Client Services",
    amount: "$1,450,000",
    status: "Completed",
    paymentMethod: "Wire Transfer",
    description: "Quarterly retainer billing for banking consortium client.",
  },
  {
    id: "act-10",
    date: "Aug 06, 2025",
    type: "Expense",
    reference: "EXP-03780",
    departmentSource: "Administration",
    amount: "$94,000",
    status: "Completed",
    paymentMethod: "Bank Transfer",
    description: "Headquarters facility maintenance, security, and utilities settlement.",
  },
  {
    id: "act-11",
    date: "Aug 05, 2025",
    type: "Revenue",
    reference: "INV-04530",
    departmentSource: "Healthcare Solutions",
    amount: "$820,000",
    status: "Completed",
    paymentMethod: "Wire Transfer",
    description: "Clinical management software implementation phase 3 sign-off.",
  },
  {
    id: "act-12",
    date: "Aug 03, 2025",
    type: "Expense",
    reference: "EXP-03764",
    departmentSource: "Legal & Compliance",
    amount: "$112,000",
    status: "Completed",
    paymentMethod: "Bank Transfer",
    description: "International patent filings, regulatory audit, and external counsel retainers.",
  },
  {
    id: "act-13",
    date: "Aug 02, 2025",
    type: "Payroll",
    reference: "PRL-0801",
    departmentSource: "Human Resources",
    amount: "$210,000",
    status: "Completed",
    paymentMethod: "Direct Deposit",
    description: "Intern stipends and specialist external contractor settlements.",
  },
  {
    id: "act-14",
    date: "Aug 01, 2025",
    type: "Revenue",
    reference: "INV-04518",
    departmentSource: "E-Commerce Systems",
    amount: "$530,000",
    status: "Completed",
    paymentMethod: "ACH Transfer",
    description: "Monthly cloud transaction fee share and API integrations revenue.",
  },
  {
    id: "act-15",
    date: "Jul 29, 2025",
    type: "Expense",
    reference: "EXP-03742",
    departmentSource: "Technology",
    amount: "$340,000",
    status: "Completed",
    paymentMethod: "Corporate ACH",
    description: "Hardware procurement, server blade replacements, and network firewalls.",
  },
  {
    id: "act-16",
    date: "Jul 28, 2025",
    type: "Revenue",
    reference: "INV-04505",
    departmentSource: "Corporate Accounts",
    amount: "$1,120,000",
    status: "Completed",
    paymentMethod: "Wire Transfer",
    description: "Multi-year enterprise cloud migration milestone payment.",
  },
  {
    id: "act-17",
    date: "Jul 26, 2025",
    type: "Payroll",
    reference: "PRL-0725",
    departmentSource: "Human Resources",
    amount: "$350,000",
    status: "Completed",
    paymentMethod: "Direct Deposit",
    description: "Bi-weekly contractor and consulting staff compensations.",
  },
  {
    id: "act-18",
    date: "Jul 24, 2025",
    type: "Expense",
    reference: "EXP-03725",
    departmentSource: "Operations",
    amount: "$165,000",
    status: "Completed",
    paymentMethod: "Corporate ACH",
    description: "Logistics, supply chain warehousing, and field operations expenses.",
  },
]

export const RECENT_FINANCIAL_ACTIVITIES: FinancialActivityItem[] = ALL_FINANCIAL_ACTIVITIES.slice(0, 5)
