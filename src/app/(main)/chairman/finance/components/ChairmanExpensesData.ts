export interface ExpenseStatCardItem {
  id: string
  label: string
  value: string
  change: string
  subtext?: string
  isIncrease: boolean
  icon: "layers" | "activity" | "briefcase" | "target"
  iconBg: string
  iconColor: string
}

export interface ExpenseTrendPoint {
  month: string
  amount: number
  amountFormatted: string
  isCurrent?: boolean
  [key: string]: string | number | boolean | undefined
}

export interface ExpenseBreakdownSlice {
  name: string
  amount: string
  percentage: number
  color: string
  [key: string]: string | number | boolean | undefined
}

export interface ExpenseDetailItem {
  id: string
  date: string
  expenseName: string
  category: {
    label: string
    icon: "zap" | "server" | "heart" | "building"
    colorClass: string
    bgClass: string
    borderClass: string
  }
  department: string
  amount: string
  approvedBy: string
  status: {
    label: "Paid" | "In Process" | "Rejected"
    icon: "check" | "clock" | "x"
    colorClass: string
    bgClass: string
    borderClass: string
  }
}

export const EXPENSES_STAT_CARDS: ExpenseStatCardItem[] = [
  {
    id: "total_expenses",
    label: "Total Expenses",
    value: "₹ 1,24,80,000",
    change: "+6.8%",
    subtext: "vs previous period",
    isIncrease: true,
    icon: "layers",
    iconBg: "bg-purple-50 text-[#5B50E5]",
    iconColor: "text-[#5B50E5]",
  },
  {
    id: "operating_expenses",
    label: "Operating Expenses",
    value: "₹ 92,40,000",
    change: "+5.9%",
    isIncrease: true,
    icon: "activity",
    iconBg: "bg-emerald-50 text-emerald-600",
    iconColor: "text-emerald-600",
  },
  {
    id: "payroll_expenses",
    label: "Payroll Expenses",
    value: "₹ 24,00,000",
    change: "+7.2%",
    isIncrease: true,
    icon: "briefcase",
    iconBg: "bg-amber-50 text-amber-500",
    iconColor: "text-amber-500",
  },
  {
    id: "other_expenses",
    label: "Other Expenses",
    value: "₹ 8,40,000",
    change: "+4.1%",
    isIncrease: true,
    icon: "target",
    iconBg: "bg-rose-50 text-rose-500",
    iconColor: "text-rose-500",
  },
]

export const MONTHLY_EXPENSE_TREND: ExpenseTrendPoint[] = [
  { month: "Jan", amount: 8.5, amountFormatted: "₹ 8.5L" },
  { month: "Feb", amount: 9.8, amountFormatted: "₹ 9.8L" },
  { month: "Mar", amount: 11.2, amountFormatted: "₹ 11.2L" },
  { month: "Apr", amount: 10.4, amountFormatted: "₹ 10.4L" },
  { month: "May", amount: 10.5, amountFormatted: "₹ 10.5L" },
  { month: "Jun", amount: 10.9, amountFormatted: "₹ 10.9L" },
  { month: "Jul", amount: 10.5, amountFormatted: "₹ 10.5L" },
  { month: "Aug", amount: 12.2, amountFormatted: "₹ 12.2L" },
  { month: "Sep", amount: 10.8, amountFormatted: "₹ 10.8L" },
  { month: "Oct", amount: 12.5, amountFormatted: "₹ 12.5L" },
  { month: "Nov", amount: 16.5, amountFormatted: "₹ 16.5L", isCurrent: true },
]

export const QUARTERLY_EXPENSE_TREND: ExpenseTrendPoint[] = [
  { month: "Q1", amount: 29.5, amountFormatted: "₹ 29.5L" },
  { month: "Q2", amount: 31.8, amountFormatted: "₹ 31.8L" },
  { month: "Q3", amount: 33.5, amountFormatted: "₹ 33.5L" },
  { month: "Q4", amount: 29.0, amountFormatted: "₹ 29.0L", isCurrent: true },
]

export const YEARLY_EXPENSE_TREND: ExpenseTrendPoint[] = [
  { month: "2023", amount: 95.0, amountFormatted: "₹ 95.0L" },
  { month: "2024", amount: 108.5, amountFormatted: "₹ 108.5L" },
  { month: "2025", amount: 116.2, amountFormatted: "₹ 116.2L" },
  { month: "2026", amount: 124.8, amountFormatted: "₹ 124.8L", isCurrent: true },
]

export const EXPENSE_BREAKDOWN_SLICES: ExpenseBreakdownSlice[] = [
  {
    name: "Payroll & Benefits",
    amount: "₹ 24,00,000",
    percentage: 19.2,
    color: "#8B5CF6",
  },
  {
    name: "Operations",
    amount: "₹ 46,20,000",
    percentage: 37.0,
    color: "#06B6D4",
  },
  {
    name: "Infrastructure",
    amount: "₹ 18,40,000",
    percentage: 14.7,
    color: "#10B981",
  },
  {
    name: "Facilities & Util",
    amount: "₹ 12,80,000",
    percentage: 10.3,
    color: "#F59E0B",
  },
  {
    name: "Other Expenses",
    amount: "₹ 23,40,000",
    percentage: 18.8,
    color: "#F43F5E",
  },
]

export const EXPENSE_DETAILS_RECORDS: ExpenseDetailItem[] = [
  {
    id: "exp-1",
    date: "Nov 24, 2026",
    expenseName: "Office Electricity Bill",
    category: {
      label: "Utilities",
      icon: "zap",
      colorClass: "text-[#0284C7]",
      bgClass: "bg-[#F0F9FF]",
      borderClass: "border-[#BAE6FD]/80",
    },
    department: "Administration",
    amount: "1,20,000",
    approvedBy: "Finance Manager",
    status: {
      label: "Paid",
      icon: "check",
      colorClass: "text-[#059669]",
      bgClass: "bg-[#ECFDF5]",
      borderClass: "border-[#A7F3D0]/60",
    },
  },
  {
    id: "exp-2",
    date: "Nov 20, 2026",
    expenseName: "Cloud Hosting Renewal",
    category: {
      label: "IT & Infrastructure",
      icon: "server",
      colorClass: "text-[#7C3AED]",
      bgClass: "bg-[#F5F3FF]",
      borderClass: "border-[#DDD6FE]/80",
    },
    department: "IT",
    amount: "3,60,000",
    approvedBy: "Finance Manager",
    status: {
      label: "Paid",
      icon: "check",
      colorClass: "text-[#059669]",
      bgClass: "bg-[#ECFDF5]",
      borderClass: "border-[#A7F3D0]/60",
    },
  },
  {
    id: "exp-3",
    date: "Nov 18, 2026",
    expenseName: "Team Offsite - Q4",
    category: {
      label: "Employee Welfare",
      icon: "heart",
      colorClass: "text-[#E11D48]",
      bgClass: "bg-[#FFF1F2]",
      borderClass: "border-[#FECDD3]/80",
    },
    department: "HR",
    amount: "4,50,000",
    approvedBy: "HR Manager",
    status: {
      label: "In Process",
      icon: "clock",
      colorClass: "text-[#D97706]",
      bgClass: "bg-[#FEF7EC]",
      borderClass: "border-[#FDE68A]/80",
    },
  },
  {
    id: "exp-4",
    date: "Nov 12, 2026",
    expenseName: "Office Rent",
    category: {
      label: "Facilities",
      icon: "building",
      colorClass: "text-[#059669]",
      bgClass: "bg-[#ECFDF5]",
      borderClass: "border-[#A7F3D0]/80",
    },
    department: "Administration",
    amount: "8,00,000",
    approvedBy: "Finance Manager",
    status: {
      label: "Paid",
      icon: "check",
      colorClass: "text-[#059669]",
      bgClass: "bg-[#ECFDF5]",
      borderClass: "border-[#A7F3D0]/60",
    },
  },
  {
    id: "exp-5",
    date: "Nov 08, 2026",
    expenseName: "Software Licenses",
    category: {
      label: "IT & Infrastructure",
      icon: "server",
      colorClass: "text-[#7C3AED]",
      bgClass: "bg-[#F5F3FF]",
      borderClass: "border-[#DDD6FE]/80",
    },
    department: "IT",
    amount: "2,40,000",
    approvedBy: "Finance Manager",
    status: {
      label: "Paid",
      icon: "check",
      colorClass: "text-[#059669]",
      bgClass: "bg-[#ECFDF5]",
      borderClass: "border-[#A7F3D0]/60",
    },
  },
]
