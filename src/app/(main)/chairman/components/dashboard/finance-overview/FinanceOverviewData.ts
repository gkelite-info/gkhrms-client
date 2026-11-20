export interface FinanceOverviewStatItem {
  id: string
  label: string
  value: string
  badgeText?: string
  badgeType?: "increase" | "decrease"
  badgeSubtitle?: string
  subtext?: string
  iconBg: string
  iconColor: string
}

export interface FinanceOverviewMonthlyData {
  month: string
  monthFull: string
  expense: number
  expenseFormatted: string
  expenseAmount: string
}

export const FINANCE_OVERVIEW_STATS: FinanceOverviewStatItem[] = [
  {
    id: "total_expense",
    label: "Total Expense",
    value: "$3.6M",
    badgeText: "+28.4%",
    badgeType: "increase",
    badgeSubtitle: "vs. previous period",
    iconBg: "bg-purple-50",
    iconColor: "text-[#5B50E5]",
  },
  {
    id: "avg_monthly_expense",
    label: "Average Monthly Expense",
    value: "$301K",
    badgeText: "+12.6%",
    badgeType: "increase",
    badgeSubtitle: "vs. previous period",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: "highest_expense_month",
    label: "Highest Expense Month",
    value: "$3.6M",
    subtext: "Dec 2024",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    id: "lowest_expense_month",
    label: "Lowest Expense Month",
    value: "$1.0M",
    subtext: "Jan 2024",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-500",
  },
]

export const FINANCE_OVERVIEW_MONTHLY_DATA: FinanceOverviewMonthlyData[] = [
  {
    month: "Jan",
    monthFull: "Jan 2024",
    expense: 1.0,
    expenseFormatted: "$1.0M",
    expenseAmount: "$1,000,000",
  },
  {
    month: "Feb",
    monthFull: "Feb 2024",
    expense: 1.25,
    expenseFormatted: "$1.25M",
    expenseAmount: "$1,250,000",
  },
  {
    month: "Mar",
    monthFull: "Mar 2024",
    expense: 1.55,
    expenseFormatted: "$1.55M",
    expenseAmount: "$1,550,000",
  },
  {
    month: "Apr",
    monthFull: "Apr 2024",
    expense: 1.48,
    expenseFormatted: "$1.48M",
    expenseAmount: "$1,480,000",
  },
  {
    month: "May",
    monthFull: "May 2024",
    expense: 1.7,
    expenseFormatted: "$1.70M",
    expenseAmount: "$1,700,000",
  },
  {
    month: "Jun",
    monthFull: "Jun 2024",
    expense: 2.15,
    expenseFormatted: "$2.15M",
    expenseAmount: "$2,150,000",
  },
  {
    month: "Jul",
    monthFull: "Jul 2024",
    expense: 2.48,
    expenseFormatted: "$2.48M",
    expenseAmount: "$2,480,000",
  },
  {
    month: "Aug",
    monthFull: "Aug 2024",
    expense: 2.7,
    expenseFormatted: "$2.70M",
    expenseAmount: "$2,700,000",
  },
  {
    month: "Sep",
    monthFull: "Sep 2024",
    expense: 2.6,
    expenseFormatted: "$2.60M",
    expenseAmount: "$2,600,000",
  },
  {
    month: "Oct",
    monthFull: "Oct 2024",
    expense: 3.0,
    expenseFormatted: "$3.00M",
    expenseAmount: "$3,000,000",
  },
  {
    month: "Nov",
    monthFull: "Nov 2024",
    expense: 3.3,
    expenseFormatted: "$3.30M",
    expenseAmount: "$3,300,000",
  },
  {
    month: "Dec",
    monthFull: "Dec 2024",
    expense: 3.6,
    expenseFormatted: "$3.60M",
    expenseAmount: "$3,600,000",
  },
]
