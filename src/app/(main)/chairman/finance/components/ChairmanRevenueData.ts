export interface RevenueStatCardItem {
  id: string
  label: string
  value: string
  change?: string
  subtext?: string
  isIncrease?: boolean
  isWarning?: boolean
  icon: "trending-up" | "calendar" | "database" | "clock" | "bar-chart"
  iconBg: string
  iconColor: string
}

export interface RevenueTrendPoint {
  month: string
  revenue: number
  revenueFormatted: string
  [key: string]: string | number | boolean | undefined
}

export interface RevenueBySourceSlice {
  name: string
  percentage: number
  amount: string
  color: string
  [key: string]: string | number | boolean | undefined
}

export interface CollectionsSummaryData {
  totalAmount: string
  growthRate: string
  collectedRevenue: {
    amount: string
    percentage: number
  }
  pendingRevenue: {
    amount: string
    percentage: number
  }
}

export interface RecentRevenueRecord {
  id: string
  date: string
  revenueSource: {
    label: string
    icon: "card" | "tag" | "users" | "training" | "layers"
    colorClass: string
    bgClass: string
    borderClass: string
  }
  referenceId: string
  clientDepartment: string
  amount: string
  paymentStatus: {
    label: "Received" | "Partial" | "Pending"
    icon: "check" | "clock"
    colorClass: string
    bgClass: string
    borderClass: string
  }
}

export const REVENUE_STAT_CARDS: RevenueStatCardItem[] = [
  {
    id: "total_revenue",
    label: "Total Revenue",
    value: "$24.86M",
    change: "+12.4%",
    isIncrease: true,
    icon: "trending-up",
    iconBg: "bg-emerald-50 text-emerald-600",
    iconColor: "text-emerald-600",
  },
  {
    id: "revenue_this_month",
    label: "Revenue This Month",
    value: "$2.31M",
    change: "+8.9%",
    isIncrease: true,
    icon: "calendar",
    iconBg: "bg-purple-50 text-[#5B50E5]",
    iconColor: "text-[#5B50E5]",
  },
  {
    id: "collected_revenue",
    label: "Collected Revenue",
    value: "$22.07M",
    change: "+13.1%",
    isIncrease: true,
    icon: "database",
    iconBg: "bg-cyan-50 text-cyan-600",
    iconColor: "text-cyan-600",
  },
  {
    id: "pending_revenue",
    label: "Pending Revenue",
    value: "$2.79M",
    change: "+7.6%",
    isIncrease: true,
    isWarning: true,
    icon: "clock",
    iconBg: "bg-amber-50 text-amber-500",
    iconColor: "text-amber-500",
  },
  {
    id: "growth_rate",
    label: "Growth Rate",
    value: "+12.4%",
    subtext: "vs. prior 12 months",
    icon: "bar-chart",
    iconBg: "bg-teal-50 text-teal-600",
    iconColor: "text-teal-600",
  },
]

export const REVENUE_TREND_DATA: RevenueTrendPoint[] = [
  { month: "Sep", revenue: 13.0, revenueFormatted: "$13.0M" },
  { month: "Oct", revenue: 13.9, revenueFormatted: "$13.9M" },
  { month: "Nov", revenue: 14.8, revenueFormatted: "$14.8M" },
  { month: "Dec", revenue: 15.6, revenueFormatted: "$15.6M" },
  { month: "Jan", revenue: 16.5, revenueFormatted: "$16.5M" },
  { month: "Feb", revenue: 17.6, revenueFormatted: "$17.6M" },
  { month: "Mar", revenue: 18.7, revenueFormatted: "$18.7M" },
  { month: "Apr", revenue: 19.8, revenueFormatted: "$19.8M" },
  { month: "May", revenue: 21.0, revenueFormatted: "$21.0M" },
  { month: "Jun", revenue: 22.3, revenueFormatted: "$22.3M" },
  { month: "Jul", revenue: 23.5, revenueFormatted: "$23.5M" },
  { month: "Aug", revenue: 24.86, revenueFormatted: "$24.86M" },
]

export const REVENUE_BY_SOURCE_SLICES: RevenueBySourceSlice[] = [
  {
    name: "Client Projects",
    percentage: 42,
    amount: "$10.44M",
    color: "#5B50E5",
  },
  {
    name: "Product Sales",
    percentage: 24,
    amount: "$5.97M",
    color: "#06B6D4",
  },
  {
    name: "Consulting",
    percentage: 16,
    amount: "$3.98M",
    color: "#10B981",
  },
  {
    name: "Training",
    percentage: 10,
    amount: "$2.49M",
    color: "#F59E0B",
  },
  {
    name: "Other",
    percentage: 8,
    amount: "$1.98M",
    color: "#F97316",
  },
]

export const COLLECTIONS_SUMMARY: CollectionsSummaryData = {
  totalAmount: "$22.07M",
  growthRate: "+13.1%",
  collectedRevenue: {
    amount: "$22.07M",
    percentage: 88.7,
  },
  pendingRevenue: {
    amount: "$2.79M",
    percentage: 11.3,
  },
}

export const RECENT_REVENUE_RECORDS: RecentRevenueRecord[] = [
  {
    id: "rec-1",
    date: "Aug 25, 2025",
    revenueSource: {
      label: "Client Projects",
      icon: "card",
      colorClass: "text-[#5B50E5]",
      bgClass: "bg-[#EEF0FD]",
      borderClass: "border-[#D6D9FA]/80",
    },
    referenceId: "REV-04592",
    clientDepartment: "Atlas Enterprises",
    amount: "$1,280,000",
    paymentStatus: {
      label: "Received",
      icon: "check",
      colorClass: "text-[#059669]",
      bgClass: "bg-[#ECFDF5]",
      borderClass: "border-[#A7F3D0]/60",
    },
  },
  {
    id: "rec-2",
    date: "Aug 22, 2025",
    revenueSource: {
      label: "Product Sales",
      icon: "tag",
      colorClass: "text-[#0891B2]",
      bgClass: "bg-[#E6F8FB]",
      borderClass: "border-[#BAE6FD]/80",
    },
    referenceId: "REV-04591",
    clientDepartment: "Vertex Solutions",
    amount: "$420,000",
    paymentStatus: {
      label: "Partial",
      icon: "clock",
      colorClass: "text-[#D97706]",
      bgClass: "bg-[#FEF7EC]",
      borderClass: "border-[#FDE68A]/80",
    },
  },
  {
    id: "rec-3",
    date: "Aug 20, 2025",
    revenueSource: {
      label: "Consulting",
      icon: "users",
      colorClass: "text-[#059669]",
      bgClass: "bg-[#ECFDF5]",
      borderClass: "border-[#A7F3D0]/80",
    },
    referenceId: "REV-04590",
    clientDepartment: "Lumen Technologies",
    amount: "$360,000",
    paymentStatus: {
      label: "Received",
      icon: "check",
      colorClass: "text-[#059669]",
      bgClass: "bg-[#ECFDF5]",
      borderClass: "border-[#A7F3D0]/60",
    },
  },
  {
    id: "rec-4",
    date: "Aug 18, 2025",
    revenueSource: {
      label: "Training",
      icon: "training",
      colorClass: "text-[#D97706]",
      bgClass: "bg-[#FFFBEB]",
      borderClass: "border-[#FDE68A]/80",
    },
    referenceId: "REV-04589",
    clientDepartment: "Client Services",
    amount: "$950,000",
    paymentStatus: {
      label: "Pending",
      icon: "clock",
      colorClass: "text-[#EA580C]",
      bgClass: "bg-[#FFF7ED]",
      borderClass: "border-[#FED7AA]/80",
    },
  },
  {
    id: "rec-5",
    date: "Aug 15, 2025",
    revenueSource: {
      label: "Other",
      icon: "layers",
      colorClass: "text-[#EA580C]",
      bgClass: "bg-[#FFF1EC]",
      borderClass: "border-[#FFDDD2]/80",
    },
    referenceId: "REV-04588",
    clientDepartment: "Internal Programs",
    amount: "$285,000",
    paymentStatus: {
      label: "Received",
      icon: "check",
      colorClass: "text-[#059669]",
      bgClass: "bg-[#ECFDF5]",
      borderClass: "border-[#A7F3D0]/60",
    },
  },
]
