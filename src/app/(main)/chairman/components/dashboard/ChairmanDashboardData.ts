export interface ChairmanStatItem {
  id: string
  label: string
  value: string
  badgeText: string
  badgeType: "increase" | "decrease" | "neutral" | "percentage"
  iconBg: string
  iconColor: string
}

export interface FinanceOverviewPoint {
  month: string
  expense: number
  expenseFormatted: string
}

export interface ExpenseSlice {
  name: string
  percentage: number
  amount: string
  color: string
  [key: string]: string | number | boolean | undefined
}

export interface HeadcountPoint {
  month: string
  headcount: number
  isPeak?: boolean
}

export interface DepartmentStrengthItem {
  department: string
  count: number
  percentage: number
}

export interface RecruitmentSlice {
  name: string
  percentage: number
  count: number
  color: string
  [key: string]: string | number | boolean | undefined
}

export interface KeyAlertItem {
  id: string
  title: string
  badgeHighlight?: string
  timeAgo: string
  iconType: "calendar" | "trending" | "building" | "briefcase" | "survey"
  iconBg: string
  iconColor: string
}

export const CHAIRMAN_KPI_STATS: ChairmanStatItem[] = [
  {
    id: "total_employees",
    label: "Total Employees",
    value: "2,486",
    badgeText: "+3.5%",
    badgeType: "increase",
    iconBg: "bg-purple-50",
    iconColor: "text-[#7C3AED]",
  },
  {
    id: "active_departments",
    label: "Active Departments",
    value: "18",
    badgeText: "No change",
    badgeType: "neutral",
    iconBg: "bg-blue-50",
    iconColor: "text-[#2563EB]",
  },
  {
    id: "present_today",
    label: "Present Today",
    value: "2,274",
    badgeText: "91.5%",
    badgeType: "percentage",
    iconBg: "bg-emerald-50",
    iconColor: "text-[#059669]",
  },
  {
    id: "new_joiners",
    label: "New Joiners This Month",
    value: "34",
    badgeText: "+21%",
    badgeType: "increase",
    iconBg: "bg-amber-50",
    iconColor: "text-[#D97706]",
  },
  {
    id: "attrition_rate",
    label: "Attrition Rate",
    value: "6.4%",
    badgeText: "-1.2%",
    badgeType: "decrease",
    iconBg: "bg-indigo-50",
    iconColor: "text-[#4F46E5]",
  },
]

export const FINANCE_OVERVIEW_DATA: FinanceOverviewPoint[] = [
  { month: "Jan", expense: 1.2, expenseFormatted: "$1.20M" },
  { month: "Feb", expense: 1.45, expenseFormatted: "$1.45M" },
  { month: "Mar", expense: 1.6, expenseFormatted: "$1.60M" },
  { month: "Apr", expense: 1.55, expenseFormatted: "$1.55M" },
  { month: "May", expense: 1.9, expenseFormatted: "$1.90M" },
  { month: "Jun", expense: 2.1, expenseFormatted: "$2.10M" },
  { month: "Jul", expense: 2.45, expenseFormatted: "$2.45M" },
  { month: "Aug", expense: 2.3, expenseFormatted: "$2.30M" },
  { month: "Sep", expense: 2.65, expenseFormatted: "$2.65M" },
  { month: "Oct", expense: 2.8, expenseFormatted: "$2.80M" },
  { month: "Nov", expense: 3.1, expenseFormatted: "$3.10M" },
  { month: "Dec", expense: 3.45, expenseFormatted: "$3.45M" },
]

export const EXPENSE_BREAKDOWN_ITEMS: ExpenseSlice[] = [
  {
    name: "Salaries & Benefits",
    percentage: 42,
    amount: "$0.92M",
    color: "#2563EB",
  },
  {
    name: "Infrastructure",
    percentage: 18,
    amount: "$0.39M",
    color: "#10B981",
  },
  {
    name: "Technology",
    percentage: 15,
    amount: "$0.33M",
    color: "#06B6D4",
  },
  {
    name: "Administration",
    percentage: 10,
    amount: "$0.22M",
    color: "#84CC16",
  },
  {
    name: "Marketing",
    percentage: 8,
    amount: "$0.17M",
    color: "#F59E0B",
  },
  {
    name: "Other",
    percentage: 7,
    amount: "$0.15M",
    color: "#EF4444",
  },
]

export const HEADCOUNT_TREND_DATA: HeadcountPoint[] = [
  { month: "Jan", headcount: 1100 },
  { month: "Feb", headcount: 1250 },
  { month: "Mar", headcount: 1400 },
  { month: "Apr", headcount: 1550 },
  { month: "May", headcount: 1650 },
  { month: "Jun", headcount: 1800 },
  { month: "Jul", headcount: 3100, isPeak: true },
  { month: "Aug", headcount: 1950 },
  { month: "Sep", headcount: 2150 },
  { month: "Oct", headcount: 2300 },
]

export const DEPARTMENT_STRENGTH_ITEMS: DepartmentStrengthItem[] = [
  { department: "Technology", count: 642, percentage: 88 },
  { department: "Operations", count: 428, percentage: 65 },
  { department: "Sales & Marketing", count: 362, percentage: 55 },
  { department: "Finance", count: 286, percentage: 44 },
  { department: "Human Resources", count: 214, percentage: 33 },
  { department: "Product", count: 188, percentage: 29 },
  { department: "Customer Support", count: 168, percentage: 26 },
  { department: "Legal & Compliance", count: 98, percentage: 15 },
]

export const RECRUITMENT_SLICES: RecruitmentSlice[] = [
  { name: "Salaries & Benefits", percentage: 42, count: 24, color: "#2563EB" },
  { name: "Infrastructure", percentage: 18, count: 10, color: "#10B981" },
  { name: "Technology", percentage: 15, count: 8, color: "#06B6D4" },
  { name: "Administration", percentage: 10, count: 6, color: "#84CC16" },
  { name: "Marketing", percentage: 8, count: 4, color: "#F59E0B" },
  { name: "Other", percentage: 7, count: 4, color: "#EF4444" },
]

export const KEY_ALERTS_DATA: KeyAlertItem[] = [
  {
    id: "alert-1",
    title: "Q3 Budget Review scheduled on 05 Sep 2025",
    timeAgo: "2 hours ago",
    iconType: "calendar",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
  },
  {
    id: "alert-2",
    title: "Attrition rate reduced to 6.4% (▼1.2%)",
    timeAgo: "5 hours ago",
    iconType: "trending",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: "alert-3",
    title: "New office setup in Bengaluru is 80% complete",
    timeAgo: "1 day ago",
    iconType: "building",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    id: "alert-4",
    title: "56 open positions across key departments",
    timeAgo: "1 day ago",
    iconType: "briefcase",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: "alert-5",
    title: "Annual employee engagement survey to be launched next week",
    timeAgo: "2 days ago",
    iconType: "survey",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
]
