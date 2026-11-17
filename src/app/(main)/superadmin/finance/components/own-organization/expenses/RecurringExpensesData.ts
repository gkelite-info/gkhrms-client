export interface RecurringExpenseRecord {
  id: string
  expenseName: string
  vendor: string
  category:
    | "Rent & Facilities"
    | "Utilities"
    | "Software Subscription"
    | "Maintenance"
    | "Insurance"
    | "Other"
  expenseType?: string
  frequency: "Monthly" | "Quarterly" | "Yearly"
  amount: string
  startDate?: string
  nextDueDate: string
  paymentMethod: "Bank Transfer" | "Card" | "UPI" | "Cash"
  status: "Active" | "Paused"
  autoCreate?: boolean
  notes?: string
}

export const INITIAL_RECURRING_EXPENSES: RecurringExpenseRecord[] = [
  {
    id: "rec-1",
    expenseName: "Office Rent",
    vendor: "RentOK Properties",
    category: "Rent & Facilities",
    frequency: "Monthly",
    amount: "₹ 5,00,000",
    nextDueDate: "01 Dec 2026",
    paymentMethod: "Bank Transfer",
    status: "Active",
    notes: "Headquarters commercial lease, auto-debited on 1st of every month.",
  },
  {
    id: "rec-2",
    expenseName: "Internet Bill",
    vendor: "Airtel Business",
    category: "Utilities",
    frequency: "Monthly",
    amount: "₹ 18,500",
    nextDueDate: "05 Dec 2026",
    paymentMethod: "UPI",
    status: "Active",
    notes: "High-speed corporate optical fiber leased lines.",
  },
  {
    id: "rec-3",
    expenseName: "Electricity Bill",
    vendor: "TSSPDCL",
    category: "Utilities",
    frequency: "Monthly",
    amount: "₹ 42,000",
    nextDueDate: "08 Dec 2026",
    paymentMethod: "Bank Transfer",
    status: "Active",
    notes: "Main grid electricity and substations charges.",
  },
  {
    id: "rec-4",
    expenseName: "Microsoft 365",
    vendor: "Microsoft",
    category: "Software Subscription",
    frequency: "Yearly",
    amount: "₹ 1,20,000",
    nextDueDate: "15 Jan 2027",
    paymentMethod: "Card",
    status: "Active",
    notes: "Enterprise cloud license renewals for office workstations.",
  },
  {
    id: "rec-5",
    expenseName: "Slack Subscription",
    vendor: "Slack",
    category: "Software Subscription",
    frequency: "Monthly",
    amount: "₹ 24,000",
    nextDueDate: "10 Dec 2026",
    paymentMethod: "Card",
    status: "Active",
    notes: "Internal communication workspace for 250 users.",
  },
  {
    id: "rec-6",
    expenseName: "Housekeeping Contract",
    vendor: "CleanServe",
    category: "Maintenance",
    frequency: "Quarterly",
    amount: "₹ 75,000",
    nextDueDate: "20 Dec 2026",
    paymentMethod: "Bank Transfer",
    status: "Active",
    notes: "Facility sanitization, security, and cleaning contract.",
  },
  {
    id: "rec-7",
    expenseName: "Office Insurance",
    vendor: "ICICI Lombard",
    category: "Insurance",
    frequency: "Yearly",
    amount: "₹ 2,10,000",
    nextDueDate: "12 Feb 2027",
    paymentMethod: "Bank Transfer",
    status: "Paused",
    notes: "Comprehensive property, fire, and asset protection policy.",
  },
]
