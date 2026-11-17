export interface ReportStatItem {
  id: string
  label: string
  value: string
  change: string
  isPositive: boolean
  isGood: boolean
  comparedTo: string
  iconContainer: string
}

export interface MonthlyTrendDataPoint {
  month: string
  payroll: number
  expenses: number
  reimbursements: number
  payrollFormatted: string
  expensesFormatted: string
  reimbursementsFormatted: string
}

export interface ExpenseBreakdownSlice {
  name: string
  percentage: number
  amount: string
  color: string
}

export interface ReportSummaryRow {
  id: string
  reportName: string
  iconBg: string
  iconColor: string
  keyMetrics: string
  change: string
  isIncrease: boolean
  isGood: boolean
}

export const REPORT_STAT_CARDS: ReportStatItem[] = [
  {
    id: "employees",
    label: "Total Employees",
    value: "248",
    change: "+6.9%",
    isPositive: true,
    isGood: true,
    comparedTo: "vs 232 (Oct 2026)",
    iconContainer: "bg-purple-50/80 text-purple-600 border border-purple-100",
  },
  {
    id: "attendance",
    label: "Attendance %",
    value: "94.2%",
    change: "+2.8%",
    isPositive: true,
    isGood: true,
    comparedTo: "vs 91.4% (Oct 2026)",
    iconContainer: "bg-emerald-50/80 text-emerald-600 border border-emerald-100",
  },
  {
    id: "payroll",
    label: "Total Payroll",
    value: "₹ 28,50,000",
    change: "+3.6%",
    isPositive: true,
    isGood: true,
    comparedTo: "vs ₹ 27,50,000 (Oct 2026)",
    iconContainer: "bg-amber-50/80 text-amber-600 border border-amber-100",
  },
  {
    id: "expenses",
    label: "Total Expenses",
    value: "₹ 6,75,000",
    change: "+12.4%",
    isPositive: true,
    isGood: false,
    comparedTo: "vs ₹ 6,00,000 (Oct 2026)",
    iconContainer: "bg-sky-50/80 text-sky-600 border border-sky-100",
  },
  {
    id: "leave",
    label: "Employees on Leave",
    value: "18",
    change: "+20.0%",
    isPositive: true,
    isGood: false,
    comparedTo: "vs 15 (Oct 2026)",
    iconContainer: "bg-rose-50/80 text-rose-500 border border-rose-100",
  },
]

export const MONTHLY_TREND_DATA: MonthlyTrendDataPoint[] = [
  {
    month: "Jun",
    payroll: 2.15,
    expenses: 0.48,
    reimbursements: 0.1,
    payrollFormatted: "₹ 21,50,000",
    expensesFormatted: "₹ 4,80,000",
    reimbursementsFormatted: "₹ 1,00,000",
  },
  {
    month: "Aug",
    payroll: 2.45,
    expenses: 0.54,
    reimbursements: 0.11,
    payrollFormatted: "₹ 24,50,000",
    expensesFormatted: "₹ 5,40,000",
    reimbursementsFormatted: "₹ 1,10,000",
  },
  {
    month: "Sep",
    payroll: 2.6,
    expenses: 0.58,
    reimbursements: 0.115,
    payrollFormatted: "₹ 26,00,000",
    expensesFormatted: "₹ 5,80,000",
    reimbursementsFormatted: "₹ 1,15,000",
  },
  {
    month: "Oct",
    payroll: 2.75,
    expenses: 0.6,
    reimbursements: 0.118,
    payrollFormatted: "₹ 27,50,000",
    expensesFormatted: "₹ 6,00,000",
    reimbursementsFormatted: "₹ 1,18,000",
  },
  {
    month: "Nov",
    payroll: 2.85,
    expenses: 0.675,
    reimbursements: 0.12,
    payrollFormatted: "₹ 28,50,000",
    expensesFormatted: "₹ 6,75,000",
    reimbursementsFormatted: "₹ 1,20,000",
  },
]

export const EXPENSES_BREAKDOWN_DATA: ExpenseBreakdownSlice[] = [
  {
    name: "Office & Infrastructure",
    percentage: 32,
    amount: "₹ 2,16,000",
    color: "#7C3AED",
  },
  {
    name: "Software & Subscriptions",
    percentage: 24,
    amount: "₹ 1,62,000",
    color: "#3B82F6",
  },
  {
    name: "Facility & Maintenance",
    percentage: 16,
    amount: "₹ 1,08,000",
    color: "#10B981",
  },
  {
    name: "Travel & Meetings",
    percentage: 12,
    amount: "₹ 81,000",
    color: "#F59E0B",
  },
  {
    name: "Others",
    percentage: 16,
    amount: "₹ 1,08,000",
    color: "#EF4444",
  },
]

export const MONTHLY_HIGHLIGHTS: string[] = [
  "10 new employees joined",
  "Attendance improved by 2.8%",
  "Payroll cost increased by 3.6%",
  "Expense spend increased by 12.4%",
  "18 employees on leave this month",
]

export const REPORT_SUMMARY_DATA: ReportSummaryRow[] = [
  {
    id: "employees",
    reportName: "Employees",
    iconBg: "bg-purple-50",
    iconColor: "text-[#7C3AED]",
    keyMetrics: "248 Total • 232 Active • 16 Inactive • 10 New Joiners",
    change: "+6.9%",
    isIncrease: true,
    isGood: true,
  },
  {
    id: "attendance",
    reportName: "Attendance",
    iconBg: "bg-blue-50",
    iconColor: "text-[#2563EB]",
    keyMetrics: "94.2% Attendance • 232 Present • 12 Absent • 4 WFH • 18 Leave",
    change: "+2.8%",
    isIncrease: true,
    isGood: true,
  },
  {
    id: "payroll",
    reportName: "Payroll",
    iconBg: "bg-amber-50",
    iconColor: "text-[#D97706]",
    keyMetrics:
      "₹ 28,50,000 Total Payroll • ₹ 32,00,000 Gross • ₹ 3,50,000 Deductions • ₹ 28,50,000 Net",
    change: "+3.6%",
    isIncrease: true,
    isGood: true,
  },
  {
    id: "expenses",
    reportName: "Expenses",
    iconBg: "bg-sky-50",
    iconColor: "text-[#0284C7]",
    keyMetrics:
      "₹ 6,75,000 Total • ₹ 5,10,000 Paid • ₹ 1,65,000 Pending • 12 Recurring",
    change: "+12.4%",
    isIncrease: true,
    isGood: false,
  },
  {
    id: "leave",
    reportName: "Leave",
    iconBg: "bg-rose-50",
    iconColor: "text-[#E11D48]",
    keyMetrics:
      "42 Requests • 26 Approved • 8 Pending • 4 Rejected • 18 On Leave",
    change: "+20.0%",
    isIncrease: true,
    isGood: false,
  },
]
