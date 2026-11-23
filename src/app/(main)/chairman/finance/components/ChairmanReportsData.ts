export interface ReportsStatCardItem {
  id: string
  label: string
  value: string
  change: string
  subtext: string
  isIncrease: boolean
  icon: "trending-up" | "rupee-expenses" | "rupee-profit" | "user"
  iconBg: string
  iconColor: string
}

export interface QuarterlyTrendPoint {
  quarter: string
  revenue: number
  expenses: number
  revenueFormatted: string
  expensesFormatted: string
  [key: string]: string | number | boolean | undefined
}

export interface DepartmentCostItem {
  department: string
  amount: string
  percentage: number
  barColor: string
}

export interface ReportCategory {
  label: string
  colorClass: string
  bgClass: string
  borderClass: string
}

export interface ReportSummaryStat {
  label: string
  value: string
  change?: string
  isPositive?: boolean
}

export interface GeneratedReportItem {
  id: string
  name: string
  category: ReportCategory
  period: string
  format: "PDF" | "XLSX"
  fileSize?: string
  generatedDate?: string
  generatedBy?: string
  description?: string
  status?: "Finalized" | "Approved" | "Draft"
  summaryStats?: ReportSummaryStat[]
  highlights?: string[]
}

export const REPORT_CATEGORIES: ReportCategory[] = [
  {
    label: "Financial Performance",
    colorClass: "text-[#7C3AED]",
    bgClass: "bg-[#F5F3FF]",
    borderClass: "border-[#DDD6FE]/80",
  },
  {
    label: "Revenue",
    colorClass: "text-[#059669]",
    bgClass: "bg-[#ECFDF5]",
    borderClass: "border-[#A7F3D0]/80",
  },
  {
    label: "Expenses",
    colorClass: "text-[#E11D48]",
    bgClass: "bg-[#FFF1F2]",
    borderClass: "border-[#FECDD3]/80",
  },
  {
    label: "Payroll",
    colorClass: "text-[#0284C7]",
    bgClass: "bg-[#F0F9FF]",
    borderClass: "border-[#BAE6FD]/80",
  },
  {
    label: "Working Capital",
    colorClass: "text-[#4F46E5]",
    bgClass: "bg-[#EEF2FF]",
    borderClass: "border-[#C7D2FE]/80",
  },
  {
    label: "Tax & Compliance",
    colorClass: "text-[#D97706]",
    bgClass: "bg-[#FFFBEB]",
    borderClass: "border-[#FDE68A]/80",
  },
]

export const REPORTS_STAT_CARDS: ReportsStatCardItem[] = [
  {
    id: "total_revenue",
    label: "Total Revenue",
    value: "845,320,000",
    change: "+12.6%",
    subtext: "vs. previous quarter",
    isIncrease: true,
    icon: "trending-up",
    iconBg: "bg-emerald-50 text-emerald-600",
    iconColor: "text-emerald-600",
  },
  {
    id: "total_expenses",
    label: "Total Expenses",
    value: "612,780,000",
    change: "+6.3%",
    subtext: "vs. previous quarter",
    isIncrease: true,
    icon: "rupee-expenses",
    iconBg: "bg-rose-50 text-rose-500",
    iconColor: "text-rose-500",
  },
  {
    id: "net_profit",
    label: "Net Profit",
    value: "232,540,000",
    change: "+33.9%",
    subtext: "vs. previous quarter",
    isIncrease: true,
    icon: "rupee-profit",
    iconBg: "bg-purple-50 text-[#5B50E5]",
    iconColor: "text-[#5B50E5]",
  },
  {
    id: "payroll_cost",
    label: "Payroll Cost",
    value: "185,670,000",
    change: "+4.8%",
    subtext: "vs. previous quarter",
    isIncrease: true,
    icon: "user",
    iconBg: "bg-cyan-50 text-cyan-600",
    iconColor: "text-cyan-600",
  },
]

export const QUARTERLY_TREND_DATA: QuarterlyTrendPoint[] = [
  {
    quarter: "Q1 2024",
    revenue: 580,
    expenses: 420,
    revenueFormatted: "580M",
    expensesFormatted: "420M",
  },
  {
    quarter: "Q2 2024",
    revenue: 620,
    expenses: 450,
    revenueFormatted: "620M",
    expensesFormatted: "450M",
  },
  {
    quarter: "Q3 2024",
    revenue: 650,
    expenses: 480,
    revenueFormatted: "650M",
    expensesFormatted: "480M",
  },
  {
    quarter: "Q4 2024",
    revenue: 700,
    expenses: 510,
    revenueFormatted: "700M",
    expensesFormatted: "510M",
  },
  {
    quarter: "Q1 2025",
    revenue: 845.3,
    expenses: 612.8,
    revenueFormatted: "845.3M",
    expensesFormatted: "612.8M",
  },
]

export const DEPARTMENT_WISE_COSTS: DepartmentCostItem[] = [
  {
    department: "Operations",
    amount: "182.4M",
    percentage: 29.8,
    barColor: "bg-[#5B50E5]",
  },
  {
    department: "Administration",
    amount: "128.7M",
    percentage: 21.0,
    barColor: "bg-[#818CF8]",
  },
  {
    department: "Sales & Marketing",
    amount: "103.6M",
    percentage: 16.9,
    barColor: "bg-[#A5B4FC]",
  },
  {
    department: "R&D / Innovation",
    amount: "78.9M",
    percentage: 12.9,
    barColor: "bg-[#C7D2FE]",
  },
  {
    department: "IT & Systems",
    amount: "62.5M",
    percentage: 10.2,
    barColor: "bg-[#DEDCFA]",
  },
  {
    department: "Others",
    amount: "56.7M",
    percentage: 9.3,
    barColor: "bg-[#EDE9FE]",
  },
]

export const GENERATED_REPORTS_DATA: GeneratedReportItem[] = [
  {
    id: "rep-1",
    name: "Company Financial Summary",
    category: {
      label: "Financial Performance",
      colorClass: "text-[#7C3AED]",
      bgClass: "bg-[#F5F3FF]",
      borderClass: "border-[#DDD6FE]/80",
    },
    period: "Q1 2025 (Jan – Mar)",
    format: "PDF",
    fileSize: "4.2 MB",
    generatedDate: "Apr 02, 2025 • 09:15 AM",
    generatedBy: "Suresh Narayanan (CFO)",
    status: "Finalized",
    description:
      "Comprehensive consolidated quarterly financial statement including EBITDA, operational margins, and net performance against annual targets.",
    summaryStats: [
      { label: "Total Revenue", value: "₹845.32M", change: "+12.6%", isPositive: true },
      { label: "Total Expenses", value: "₹612.78M", change: "+6.3%", isPositive: true },
      { label: "Net Profit", value: "₹232.54M", change: "+33.9%", isPositive: true },
      { label: "Profit Margin", value: "27.5%", change: "+3.8%", isPositive: true },
    ],
    highlights: [
      "Quarterly revenue grew by 12.6% over the preceding quarter driven by strong expansion across technology services.",
      "Consolidated operating expenditure remained strictly within the approved Q1 budget threshold at 72.5% of gross revenue.",
      "Cash flow from operations reached ₹198.40M with healthy reserve allocations for upcoming strategic investments.",
    ],
  },
  {
    id: "rep-2",
    name: "Revenue Analysis Report",
    category: {
      label: "Revenue",
      colorClass: "text-[#059669]",
      bgClass: "bg-[#ECFDF5]",
      borderClass: "border-[#A7F3D0]/80",
    },
    period: "Q1 2025 (Jan – Mar)",
    format: "PDF",
    fileSize: "2.8 MB",
    generatedDate: "Apr 01, 2025 • 11:30 AM",
    generatedBy: "Priya Sharma (Finance Director)",
    status: "Approved",
    description:
      "Detailed breakdown of recurring revenue streams, enterprise client accounts, retention metrics, and regional revenue distribution.",
    summaryStats: [
      { label: "Gross Revenue", value: "₹845.32M", change: "+12.6%", isPositive: true },
      { label: "Client Retainers", value: "₹510.20M", change: "+15.2%", isPositive: true },
      { label: "Project Billings", value: "₹285.12M", change: "+8.4%", isPositive: true },
      { label: "Average Deal Size", value: "₹4.85M", change: "+6.1%", isPositive: true },
    ],
    highlights: [
      "Enterprise subscription retainers recorded the highest quarterly surge with 18 newly onboarded corporate accounts.",
      "Southern business cluster contributed 42% of gross quarterly revenue, continuing as the highest performing market segment.",
      "Client retention stood at 96.4%, maintaining low churn throughout the quarter.",
    ],
  },
  {
    id: "rep-3",
    name: "Expense Analysis Report",
    category: {
      label: "Expenses",
      colorClass: "text-[#E11D48]",
      bgClass: "bg-[#FFF1F2]",
      borderClass: "border-[#FECDD3]/80",
    },
    period: "Q1 2025 (Jan – Mar)",
    format: "PDF",
    fileSize: "3.1 MB",
    generatedDate: "Apr 01, 2025 • 02:45 PM",
    generatedBy: "Rohan Varma (Sr. Accountant)",
    status: "Approved",
    description:
      "Departmental expenditure analysis, operational overheads, procurement costs, vendor disbursements, and capital investments.",
    summaryStats: [
      { label: "Total Expenses", value: "₹612.78M", change: "+6.3%", isPositive: true },
      { label: "Operations Cost", value: "₹182.40M", change: "+4.1%", isPositive: true },
      { label: "Vendor Payouts", value: "₹142.10M", change: "+5.8%", isPositive: true },
      { label: "Admin Overheads", value: "₹128.70M", change: "-1.2%", isPositive: false },
    ],
    highlights: [
      "Operational expenditure constituted 29.8% of total outflows, corresponding with cloud infrastructure scalability.",
      "Corporate travel and hospitality costs decreased by 14% following the adoption of central vendor partnerships.",
      "Capital expenditures (Capex) were completed at ₹48.20M, exactly in line with Q1 planned milestones.",
    ],
  },
  {
    id: "rep-4",
    name: "Payroll Cost Summary",
    category: {
      label: "Payroll",
      colorClass: "text-[#0284C7]",
      bgClass: "bg-[#F0F9FF]",
      borderClass: "border-[#BAE6FD]/80",
    },
    period: "Q1 2025 (Jan – Mar)",
    format: "PDF",
    fileSize: "1.9 MB",
    generatedDate: "Apr 03, 2025 • 10:00 AM",
    generatedBy: "Meera Krishnan (Head of HR Operations)",
    status: "Finalized",
    description:
      "Consolidated payroll costs across business units, performance incentives, statutory withholdings, and headcount growth adjustments.",
    summaryStats: [
      { label: "Total Payroll", value: "₹185.67M", change: "+4.8%", isPositive: true },
      { label: "Active Headcount", value: "1,420", change: "+45", isPositive: true },
      { label: "Avg Salary / Emp", value: "₹130.75K", change: "+2.1%", isPositive: true },
      { label: "Statutory Filing", value: "₹24.12M", change: "100%", isPositive: true },
    ],
    highlights: [
      "100% of employee payroll cycles were executed on the last working day of each month with zero pending disbursements.",
      "All statutory deductions including Provident Fund, ESI, and TDS were filed within designated deadlines.",
      "Variable performance bonuses for Q1 were distributed to 384 eligible team leads and managers.",
    ],
  },
  {
    id: "rep-5",
    name: "Receivables & Payables Summary",
    category: {
      label: "Working Capital",
      colorClass: "text-[#4F46E5]",
      bgClass: "bg-[#EEF2FF]",
      borderClass: "border-[#C7D2FE]/80",
    },
    period: "As of Mar 31, 2025",
    format: "PDF",
    fileSize: "2.4 MB",
    generatedDate: "Apr 02, 2025 • 04:15 PM",
    generatedBy: "Anil Deshmukh (Treasury Manager)",
    status: "Finalized",
    description:
      "Working capital management summary, invoice aging breakdown for customer receivables, and vendor payable schedule.",
    summaryStats: [
      { label: "Total Receivables", value: "₹142.80M", change: "Current", isPositive: true },
      { label: "Overdue (>30 Days)", value: "₹18.40M", change: "-12.0%", isPositive: false },
      { label: "Total Payables", value: "₹96.50M", change: "On Track", isPositive: true },
      { label: "Current Ratio", value: "1.84", change: "+0.14", isPositive: true },
    ],
    highlights: [
      "Days Sales Outstanding (DSO) improved from 48 days to 41 days in Q1, accelerating cash conversion cycles.",
      "Vendor invoice clearance rate sustained at 94.2% within agreed 30-day settlement windows.",
      "Working capital buffer maintained at 2.4x monthly operational burn rate.",
    ],
  },
]
