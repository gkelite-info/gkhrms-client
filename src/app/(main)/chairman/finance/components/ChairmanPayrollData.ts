export interface PayrollStatCardItem {
  id: string
  label: string
  value: string
  change: string
  subtext: string
  isIncrease: boolean
  icon: "wallet" | "calendar" | "gift" | "minus-circle"
  iconBg: string
  iconColor: string
}

export interface PayrollTrendPoint {
  month: string
  cost: number
  costFormatted: string
  isLatest?: boolean
  [key: string]: string | number | boolean | undefined
}

export interface DepartmentPayrollSlice {
  name: string
  percentage: number
  amount: string
  color: string
  [key: string]: string | number | boolean | undefined
}

export interface PayrollSummaryMetric {
  label: string
  amount: string
  percentage: number
  barColor: string
}

export interface RecentPayrollRecord {
  id: string
  date: string
  department: {
    name: string
    icon: "code" | "cog" | "megaphone" | "finance" | "users" | "package"
  }
  payrollCycle: string
  employees: number
  grossPayroll: string
  deductions: string
  netSalary: string
  status: "Processed" | "Pending"
}

export const PAYROLL_STAT_CARDS: PayrollStatCardItem[] = [
  {
    id: "total_payroll",
    label: "Total Payroll Cost",
    value: "$12.84M",
    change: "+11.6%",
    subtext: "vs. prior 12 months",
    isIncrease: true,
    icon: "wallet",
    iconBg: "bg-purple-50 text-[#5B50E5]",
    iconColor: "text-[#5B50E5]",
  },
  {
    id: "this_month_payroll",
    label: "This Month Payroll",
    value: "$1.08M",
    change: "+4.8%",
    subtext: "vs. last month",
    isIncrease: true,
    icon: "calendar",
    iconBg: "bg-sky-50 text-sky-500",
    iconColor: "text-sky-500",
  },
  {
    id: "bonuses_incentives",
    label: "Bonuses & Incentives",
    value: "$0.42M",
    change: "+7.7%",
    subtext: "vs. last month",
    isIncrease: true,
    icon: "gift",
    iconBg: "bg-pink-50 text-pink-500",
    iconColor: "text-pink-500",
  },
  {
    id: "deductions",
    label: "Deductions",
    value: "$0.31M",
    change: "+3.2%",
    subtext: "vs. last month",
    isIncrease: true,
    icon: "minus-circle",
    iconBg: "bg-cyan-50 text-cyan-600",
    iconColor: "text-cyan-600",
  },
]

export const PAYROLL_TREND_DATA: PayrollTrendPoint[] = [
  { month: "Jan", cost: 0.72, costFormatted: "$0.72M" },
  { month: "Feb", cost: 0.75, costFormatted: "$0.75M" },
  { month: "Mar", cost: 0.78, costFormatted: "$0.78M" },
  { month: "Apr", cost: 0.80, costFormatted: "$0.80M" },
  { month: "May", cost: 0.83, costFormatted: "$0.83M" },
  { month: "Jun", cost: 0.85, costFormatted: "$0.85M" },
  { month: "Jul", cost: 0.88, costFormatted: "$0.88M" },
  { month: "Aug", cost: 0.91, costFormatted: "$0.91M" },
  { month: "Sep", cost: 0.95, costFormatted: "$0.95M" },
  { month: "Oct", cost: 0.99, costFormatted: "$0.99M" },
  { month: "Nov", cost: 1.03, costFormatted: "$1.03M" },
  { month: "Dec", cost: 1.08, costFormatted: "$1.08M", isLatest: true },
]

export const DEPARTMENT_PAYROLL_SLICES: DepartmentPayrollSlice[] = [
  {
    name: "Engineering",
    percentage: 34.8,
    amount: "$4.47M",
    color: "#4F46E5",
  },
  {
    name: "Operations",
    percentage: 20.6,
    amount: "$2.64M",
    color: "#06B6D4",
  },
  {
    name: "Sales & Marketing",
    percentage: 17.1,
    amount: "$2.20M",
    color: "#2DD4BF",
  },
  {
    name: "Finance",
    percentage: 11.6,
    amount: "$1.49M",
    color: "#F59E0B",
  },
  {
    name: "Product",
    percentage: 8.9,
    amount: "$1.15M",
    color: "#EC4899",
  },
  {
    name: "HR",
    percentage: 7.0,
    amount: "$0.89M",
    color: "#8B5CF6",
  },
]

export const PAYROLL_SUMMARY_METRICS: PayrollSummaryMetric[] = [
  {
    label: "Total Payroll",
    amount: "$12.84M",
    percentage: 100,
    barColor: "bg-[#5B50E5]",
  },
  {
    label: "Net Salary Paid",
    amount: "$12.11M",
    percentage: 94.3,
    barColor: "bg-[#5B50E5]",
  },
  {
    label: "Bonuses",
    amount: "$0.42M",
    percentage: 3.3,
    barColor: "bg-[#A5B4FC]",
  },
  {
    label: "Deductions",
    amount: "$0.31M",
    percentage: 2.4,
    barColor: "bg-[#A5B4FC]",
  },
]

export const RECENT_PAYROLL_RECORDS: RecentPayrollRecord[] = [
  {
    id: "pr-1",
    date: "Dec 31, 2024",
    department: {
      name: "Engineering",
      icon: "code",
    },
    payrollCycle: "Dec 2024",
    employees: 1532,
    grossPayroll: "$4.67M",
    deductions: "$0.11M",
    netSalary: "$4.56M",
    status: "Processed",
  },
  {
    id: "pr-2",
    date: "Dec 31, 2024",
    department: {
      name: "Operations",
      icon: "cog",
    },
    payrollCycle: "Dec 2024",
    employees: 876,
    grossPayroll: "$2.78M",
    deductions: "$0.07M",
    netSalary: "$2.71M",
    status: "Processed",
  },
  {
    id: "pr-3",
    date: "Dec 31, 2024",
    department: {
      name: "Sales & Marketing",
      icon: "megaphone",
    },
    payrollCycle: "Dec 2024",
    employees: 642,
    grossPayroll: "$2.31M",
    deductions: "$0.06M",
    netSalary: "$2.25M",
    status: "Pending",
  },
  {
    id: "pr-4",
    date: "Dec 31, 2024",
    department: {
      name: "Finance",
      icon: "finance",
    },
    payrollCycle: "Dec 2024",
    employees: 421,
    grossPayroll: "$1.49M",
    deductions: "$0.03M",
    netSalary: "$1.46M",
    status: "Processed",
  },
  {
    id: "pr-5",
    date: "Dec 31, 2024",
    department: {
      name: "HR",
      icon: "users",
    },
    payrollCycle: "Dec 2024",
    employees: 318,
    grossPayroll: "$1.11M",
    deductions: "$0.03M",
    netSalary: "$1.08M",
    status: "Processed",
  },
  {
    id: "pr-6",
    date: "Jan 31, 2025",
    department: {
      name: "Product",
      icon: "package",
    },
    payrollCycle: "Jan 2025",
    employees: 357,
    grossPayroll: "$1.15M",
    deductions: "$0.04M",
    netSalary: "$1.11M",
    status: "Pending",
  },
]
