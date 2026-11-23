export interface ReceivablesPayablesStatItem {
  id: string
  label: string
  value: string
  badge?: {
    text: string
    isPositive: boolean
    isWarning?: boolean
  }
  icon: "briefcase" | "check" | "clock" | "file-text"
  iconBg: string
  iconColor: string
}

export interface AgingSlice {
  name: string
  amount: string
  percentage: number
  color: string
  [key: string]: string | number | boolean | undefined
}

export interface ReceivablesPayablesTrendPoint {
  month: string
  amount: number
  amountFormatted: string
  isHighlighted?: boolean
  isUpcoming?: boolean
  [key: string]: string | number | boolean | undefined
}

export interface ReceivablesClientItem {
  id: string
  clientName: string
  invoiceAmount: string
  outstanding: string
  aging: string
  agingColorClass: string
  status: "Overdue" | "Pending"
}

export interface PayablesVendorItem {
  id: string
  vendorName: string
  billAmount: string
  outstanding: string
  aging: string
  agingColorClass: string
  status: "Overdue" | "Pending"
}

export const RECEIVABLES_PAYABLES_STATS: ReceivablesPayablesStatItem[] = [
  {
    id: "total_receivables",
    label: "Total Receivables",
    value: "₹ 62,40,000",
    badge: {
      text: "↑ +8.9%",
      isPositive: true,
    },
    icon: "briefcase",
    iconBg: "bg-emerald-50 text-emerald-600",
    iconColor: "text-emerald-600",
  },
  {
    id: "received_ytd",
    label: "Received (YTD)",
    value: "₹ 4,28,00,000",
    icon: "check",
    iconBg: "bg-cyan-50 text-cyan-600",
    iconColor: "text-cyan-600",
  },
  {
    id: "overdue_receivables",
    label: "Overdue Receivables",
    value: "₹ 12,80,000",
    badge: {
      text: "↑ 20.5%",
      isPositive: false,
      isWarning: true,
    },
    icon: "clock",
    iconBg: "bg-amber-50 text-amber-500",
    iconColor: "text-amber-500",
  },
  {
    id: "total_payables",
    label: "Total Payables",
    value: "₹ 48,70,000",
    badge: {
      text: "↑ +5.6%",
      isPositive: true,
    },
    icon: "file-text",
    iconBg: "bg-purple-50 text-[#5B50E5]",
    iconColor: "text-[#5B50E5]",
  },
  {
    id: "paid",
    label: "Paid",
    value: "₹ 3,96,50,000",
    icon: "check",
    iconBg: "bg-cyan-50 text-cyan-600",
    iconColor: "text-cyan-600",
  },
  {
    id: "overdue_payables",
    label: "Overdue Payables",
    value: "₹ 9,20,000",
    badge: {
      text: "↑ 18.9%",
      isPositive: false,
      isWarning: true,
    },
    icon: "clock",
    iconBg: "bg-rose-50 text-rose-500",
    iconColor: "text-rose-500",
  },
]

export const RECEIVABLES_AGING_SLICES: AgingSlice[] = [
  {
    name: "0 – 30 Days",
    amount: "₹ 28,40,000",
    percentage: 45.5,
    color: "#4F46E5",
  },
  {
    name: "31 – 60 Days",
    amount: "₹ 14,20,000",
    percentage: 22.8,
    color: "#06B6D4",
  },
  {
    name: "61 – 90 Days",
    amount: "₹ 7,80,000",
    percentage: 12.5,
    color: "#F59E0B",
  },
  {
    name: "> 90 Days (Overdue)",
    amount: "₹ 12,80,000",
    percentage: 20.5,
    color: "#EA580C",
  },
]

export const PAYABLES_AGING_SLICES: AgingSlice[] = [
  {
    name: "0 – 30 Days",
    amount: "₹ 22,50,000",
    percentage: 46.2,
    color: "#4F46E5",
  },
  {
    name: "31 – 60 Days",
    amount: "₹ 9,80,000",
    percentage: 20.1,
    color: "#06B6D4",
  },
  {
    name: "61 – 90 Days",
    amount: "₹ 7,20,000",
    percentage: 14.8,
    color: "#F59E0B",
  },
  {
    name: "> 90 Days (Overdue)",
    amount: "₹ 9,20,000",
    percentage: 18.9,
    color: "#EA580C",
  },
]

export const RECEIVABLES_MONTHLY_TREND: ReceivablesPayablesTrendPoint[] = [
  { month: "Jan", amount: 22, amountFormatted: "₹ 22L" },
  { month: "Feb", amount: 35, amountFormatted: "₹ 35L" },
  { month: "Mar", amount: 42, amountFormatted: "₹ 42L" },
  { month: "Apr", amount: 38, amountFormatted: "₹ 38L" },
  { month: "May", amount: 39, amountFormatted: "₹ 39L" },
  { month: "Jun", amount: 40, amountFormatted: "₹ 40L" },
  { month: "Jul", amount: 42, amountFormatted: "₹ 42L" },
  { month: "Aug", amount: 41, amountFormatted: "₹ 41L" },
  { month: "Sep", amount: 42, amountFormatted: "₹ 42L" },
  { month: "Oct", amount: 62.4, amountFormatted: "₹ 62.4L", isHighlighted: true },
  { month: "Nov", amount: 0, amountFormatted: "₹ 0", isUpcoming: true },
]

export const PAYABLES_MONTHLY_TREND: ReceivablesPayablesTrendPoint[] = [
  { month: "Jan", amount: 32, amountFormatted: "₹ 32L" },
  { month: "Feb", amount: 38, amountFormatted: "₹ 38L" },
  { month: "Mar", amount: 44, amountFormatted: "₹ 44L" },
  { month: "Apr", amount: 39, amountFormatted: "₹ 39L" },
  { month: "May", amount: 40, amountFormatted: "₹ 40L" },
  { month: "Jun", amount: 41, amountFormatted: "₹ 41L" },
  { month: "Jul", amount: 43, amountFormatted: "₹ 43L" },
  { month: "Aug", amount: 42, amountFormatted: "₹ 42L" },
  { month: "Sep", amount: 42, amountFormatted: "₹ 42L" },
  { month: "Oct", amount: 48.7, amountFormatted: "₹ 48.7L", isHighlighted: true },
  { month: "Nov", amount: 0, amountFormatted: "₹ 0", isUpcoming: true },
]

export const TOP_RECEIVABLES_CLIENTS: ReceivablesClientItem[] = [
  {
    id: "rec-client-1",
    clientName: "Vertex Solutions",
    invoiceAmount: "28,00,000",
    outstanding: "10,40,000",
    aging: "> 90 Days",
    agingColorClass: "text-rose-500",
    status: "Overdue",
  },
  {
    id: "rec-client-2",
    clientName: "Lumen Technologies",
    invoiceAmount: "18,50,000",
    outstanding: "7,20,000",
    aging: "61 – 90 Days",
    agingColorClass: "text-amber-500",
    status: "Pending",
  },
  {
    id: "rec-client-3",
    clientName: "Atlas Enterprises",
    invoiceAmount: "12,00,000",
    outstanding: "4,80,000",
    aging: "31 – 60 Days",
    agingColorClass: "text-cyan-500",
    status: "Pending",
  },
  {
    id: "rec-client-4",
    clientName: "Core Innovations",
    invoiceAmount: "9,75,000",
    outstanding: "2,60,000",
    aging: "0 – 30 Days",
    agingColorClass: "text-emerald-500",
    status: "Pending",
  },
  {
    id: "rec-client-5",
    clientName: "Nexon Systems",
    invoiceAmount: "8,20,000",
    outstanding: "1,80,000",
    aging: "0 – 30 Days",
    agingColorClass: "text-emerald-500",
    status: "Pending",
  },
]

export const TOP_PAYABLES_VENDORS: PayablesVendorItem[] = [
  {
    id: "pay-vendor-1",
    vendorName: "CloudInfra Services",
    billAmount: "16,00,000",
    outstanding: "5,20,000",
    aging: "> 90 Days",
    agingColorClass: "text-rose-500",
    status: "Overdue",
  },
  {
    id: "pay-vendor-2",
    vendorName: "Office Space Rentals",
    billAmount: "12,00,000",
    outstanding: "3,60,000",
    aging: "61 – 90 Days",
    agingColorClass: "text-amber-500",
    status: "Pending",
  },
  {
    id: "pay-vendor-3",
    vendorName: "NetLink Communications",
    billAmount: "8,75,000",
    outstanding: "2,40,000",
    aging: "31 – 60 Days",
    agingColorClass: "text-cyan-500",
    status: "Pending",
  },
  {
    id: "pay-vendor-4",
    vendorName: "EquipTech Supplies",
    billAmount: "7,50,000",
    outstanding: "1,60,000",
    aging: "0 – 30 Days",
    agingColorClass: "text-emerald-500",
    status: "Pending",
  },
  {
    id: "pay-vendor-5",
    vendorName: "Facility Management",
    billAmount: "4,45,000",
    outstanding: "1,00,000",
    aging: "0 – 30 Days",
    agingColorClass: "text-emerald-500",
    status: "Pending",
  },
]
