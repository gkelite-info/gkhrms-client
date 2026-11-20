export interface HeadcountStatItem {
  id: string
  label: string
  value: string
  badgeText?: string
  badgeType?: "increase" | "decrease" | "neutral" | "percentage"
  badgeSubtitle?: string
  iconBg: string
  iconColor: string
}

export interface HeadcountTrendMonth {
  month: string
  monthShort: string
  headcount: number
  isCurrent?: boolean
}

export const HEADCOUNT_TOP_STATS: HeadcountStatItem[] = [
  {
    id: "total_employees",
    label: "Total Employees",
    value: "2,486",
    badgeText: "+3.5%",
    badgeType: "increase",
    badgeSubtitle: "vs last month",
    iconBg: "bg-purple-50",
    iconColor: "text-[#5B50E5]",
  },
  {
    id: "male",
    label: "Male",
    value: "1,412",
    badgeText: "56.8%",
    badgeType: "neutral",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: "female",
    label: "Female",
    value: "1,074",
    badgeText: "43.2%",
    badgeType: "neutral",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
  },
  {
    id: "departments",
    label: "Departments",
    value: "18",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-500",
  },
]

export const HEADCOUNT_BOTTOM_STATS: HeadcountStatItem[] = [
  {
    id: "active_employees",
    label: "Active Employees",
    value: "2,274",
    badgeText: "91.5%",
    badgeType: "percentage",
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
  },
  {
    id: "on_leave",
    label: "On Leave",
    value: "92",
    badgeText: "3.7%",
    badgeType: "percentage",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    id: "resigned_exited",
    label: "Resigned / Exited",
    value: "120",
    badgeText: "4.8%",
    badgeType: "percentage",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
  },
  {
    id: "new_joiners",
    label: "New Joiners (This Month)",
    value: "34",
    badgeText: "+21%",
    badgeType: "increase",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
  },
]

export const HEADCOUNT_TREND_DATA: HeadcountTrendMonth[] = [
  { month: "Jan 2025", monthShort: "Jan 2025", headcount: 1920 },
  { month: "Feb 2025", monthShort: "Feb 2025", headcount: 1980 },
  { month: "Mar 2025", monthShort: "Mar 2025", headcount: 2030 },
  { month: "Apr 2025", monthShort: "Apr 2025", headcount: 2120 },
  { month: "May 2025", monthShort: "May 2025", headcount: 2180 },
  { month: "Jun 2025", monthShort: "Jun 2025", headcount: 2240 },
  { month: "Jul 2025", monthShort: "Jul 2025", headcount: 2310 },
  { month: "Aug 2025", monthShort: "Aug 2025", headcount: 2380 },
  { month: "Sep 2025", monthShort: "Sep 2025", headcount: 2410 },
  { month: "Oct 2025", monthShort: "Oct 2025", headcount: 2450 },
  { month: "Nov 2025", monthShort: "Nov 2025", headcount: 2480 },
  { month: "Dec 2025", monthShort: "Dec 2025", headcount: 2486, isCurrent: true },
]
