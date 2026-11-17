export interface ExpenseRecord {
  id: string
  title: string
  category:
    | "Office & Infrastructure"
    | "Salaries & Benefits"
    | "Software & Tools"
    | "Travel & Conveyance"
    | "Utilities"
    | "Reimbursement"
  amount: string
  expenseDate: string
  paymentStatus: "Paid" | "Unpaid"
  paymentMethod: "Bank Transfer" | "Card" | "UPI" | "Cash"
  notes?: string
}

export interface ExpenseTrendPoint {
  month: string
  amount: number
  label: string
}

export interface ExpenseCategoryItem {
  name: string
  value: number
  color: string
  amount: string
  [key: string]: any
}

export interface QuickInsightItem {
  title: string
  subtitle: string
  value: string
  iconType: "category" | "highest" | "recurring"
}

export const INITIAL_EXPENSES_DATA: ExpenseRecord[] = [
  {
    id: "EXP-1120",
    title: "Office Rent - Nov 2026",
    category: "Office & Infrastructure",
    amount: "₹5,00,000",
    expenseDate: "Nov 01, 2026",
    paymentStatus: "Paid",
    paymentMethod: "Bank Transfer",
    notes: "Monthly corporate headquarters lease payment.",
  },
  {
    id: "EXP-1119",
    title: "AWS - Cloud Services",
    category: "Software & Tools",
    amount: "₹1,20,000",
    expenseDate: "Nov 03, 2026",
    paymentStatus: "Paid",
    paymentMethod: "Card",
    notes: "Production server infrastructure and database hosting.",
  },
  {
    id: "EXP-1118",
    title: "Internet & Utilities Charges",
    category: "Utilities",
    amount: "₹42,000",
    expenseDate: "Nov 07, 2026",
    paymentStatus: "Paid",
    paymentMethod: "UPI",
    notes: "Dedicated fiber leased line and power backup charges.",
  },
  {
    id: "EXP-1117",
    title: "Employee Reimbursement - Laptop",
    category: "Reimbursement",
    amount: "₹90,000",
    expenseDate: "Nov 08, 2026",
    paymentStatus: "Unpaid",
    paymentMethod: "Bank Transfer",
    notes: "Approved hardware reimbursement for Senior Developer.",
  },
  {
    id: "EXP-1116",
    title: "Travel - Client Meeting",
    category: "Travel & Conveyance",
    amount: "₹85,000",
    expenseDate: "Nov 05, 2026",
    paymentStatus: "Unpaid",
    paymentMethod: "UPI",
    notes: "Flights and hotel accommodation for onsite client delivery.",
  },
  {
    id: "EXP-1115",
    title: "Software Subscription - Jira",
    category: "Software & Tools",
    amount: "₹2,40,000",
    expenseDate: "Nov 10, 2026",
    paymentStatus: "Paid",
    paymentMethod: "Card",
    notes: "Annual Atlassian suite licenses for engineering teams.",
  },
  {
    id: "EXP-1114",
    title: "Stationery Purchase",
    category: "Office & Infrastructure",
    amount: "₹18,000",
    expenseDate: "Nov 12, 2026",
    paymentStatus: "Unpaid",
    paymentMethod: "Cash",
    notes: "Quarterly printing, supplies, and desk materials.",
  },
  {
    id: "EXP-1113",
    title: "Office Maintenance - Nov 2026",
    category: "Office & Infrastructure",
    amount: "₹80,000",
    expenseDate: "Nov 15, 2026",
    paymentStatus: "Paid",
    paymentMethod: "Bank Transfer",
    notes: "Facility sanitization, security, and HVAC upkeep.",
  },
  {
    id: "EXP-1112",
    title: "Google Workspace Licenses",
    category: "Software & Tools",
    amount: "₹35,000",
    expenseDate: "Nov 09, 2026",
    paymentStatus: "Paid",
    paymentMethod: "Card",
    notes: "Monthly business email and cloud storage accounts.",
  },
  {
    id: "EXP-1111",
    title: "Client Dinner - Tech Showcase",
    category: "Travel & Conveyance",
    amount: "₹18,000",
    expenseDate: "Nov 10, 2026",
    paymentStatus: "Paid",
    paymentMethod: "UPI",
    notes: "Enterprise client hospitality and executive dinner.",
  },
  {
    id: "EXP-1110",
    title: "Electricity & Power Backup",
    category: "Utilities",
    amount: "₹28,000",
    expenseDate: "Nov 12, 2026",
    paymentStatus: "Paid",
    paymentMethod: "Bank Transfer",
    notes: "State power grid consumption and generator diesel.",
  },
  {
    id: "EXP-1109",
    title: "Team Offsite Lunch",
    category: "Salaries & Benefits",
    amount: "₹24,500",
    expenseDate: "Nov 13, 2026",
    paymentStatus: "Paid",
    paymentMethod: "UPI",
    notes: "Quarterly team recognition lunch.",
  },
  {
    id: "EXP-1108",
    title: "Ergonomic Chairs (x5)",
    category: "Office & Infrastructure",
    amount: "₹65,000",
    expenseDate: "Nov 14, 2026",
    paymentStatus: "Paid",
    paymentMethod: "Bank Transfer",
    notes: "Furniture procurement for new joiners.",
  },
  {
    id: "EXP-1107",
    title: "Zoom Video Conferencing",
    category: "Software & Tools",
    amount: "₹15,000",
    expenseDate: "Nov 14, 2026",
    paymentStatus: "Paid",
    paymentMethod: "Card",
    notes: "Enterprise webinar and video room plan.",
  },
  {
    id: "EXP-1106",
    title: "Medical Checkup Camp",
    category: "Salaries & Benefits",
    amount: "₹45,000",
    expenseDate: "Nov 15, 2026",
    paymentStatus: "Paid",
    paymentMethod: "Bank Transfer",
    notes: "Annual wellness camp for employees.",
  },
  {
    id: "EXP-1105",
    title: "Local Travel - Dispatch",
    category: "Travel & Conveyance",
    amount: "₹6,200",
    expenseDate: "Nov 16, 2026",
    paymentStatus: "Paid",
    paymentMethod: "Cash",
    notes: "Courier deliveries and courier transport.",
  },
]

export const EXPENSE_TREND_DATA: ExpenseTrendPoint[] = [
  { month: "Jun 2026", amount: 11.2, label: "₹ 11.2 L" },
  { month: "Jul 2026", amount: 13.5, label: "₹ 13.5 L" },
  { month: "Aug 2026", amount: 13.0, label: "₹ 13.0 L" },
  { month: "Sep 2026", amount: 15.8, label: "₹ 15.8 L" },
  { month: "Oct 2026", amount: 17.3, label: "₹ 17.3 L" },
  { month: "Nov 2026", amount: 18.75, label: "₹ 18.75 L" },
]

export const EXPENSE_CATEGORY_DATA: ExpenseCategoryItem[] = [
  {
    name: "Office & Infrastructure",
    value: 40.0,
    color: "#3B82F6",
    amount: "₹ 1,30,000",
  },
  {
    name: "Salaries & Benefits",
    value: 24.0,
    color: "#06B6D4",
    amount: "₹ 78,000",
  },
  {
    name: "Software & Tools",
    value: 12.0,
    color: "#8B5CF6",
    amount: "₹ 39,000",
  },
  {
    name: "Travel & Conveyance",
    value: 8.0,
    color: "#F97316",
    amount: "₹ 26,000",
  },
  {
    name: "Utilities",
    value: 6.0,
    color: "#EAB308",
    amount: "₹ 19,500",
  },
]

export const QUICK_INSIGHTS_DATA: QuickInsightItem[] = [
  {
    title: "Top Category",
    subtitle: "Office & Infrastructure",
    value: "₹ 1,30,000",
    iconType: "category",
  },
  {
    title: "Highest Expense",
    subtitle: "Office Rent - Nov 2026",
    value: "₹ 5,00,000",
    iconType: "highest",
  },
  {
    title: "Recurring Expenses",
    subtitle: "3 Items",
    value: "₹ 1,42,000 / month",
    iconType: "recurring",
  },
]
