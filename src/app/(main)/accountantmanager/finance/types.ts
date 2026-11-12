export type AccountantTab =
  | "Finance Overview"
  | "Executives Overview"
  | "Transactions"
  | "Expense Entries"
  | "Reimbursements"
  | "Payments"
  | "Reports"

export const tabToSlug: Record<AccountantTab, string> = {
  "Finance Overview": "overview",
  "Executives Overview": "executives-overview",
  Transactions: "transactions",
  "Expense Entries": "expense-entries",
  Reimbursements: "reimbursements",
  Payments: "payments",
  Reports: "reports",
}

export const slugToTab: Record<string, AccountantTab> = {
  overview: "Finance Overview",
  "finance-overview": "Finance Overview",
  "executives-overview": "Executives Overview",
  transactions: "Transactions",
  expenses: "Expense Entries",
  "expense-entries": "Expense Entries",
  reimbursements: "Reimbursements",
  payments: "Payments",
  reports: "Reports",
}

export interface AccountantKpi {
  id: string
  title: string
  value: string
  trend?: string
  trendType?: "up" | "down"
  subtitle?: string
  iconType: "received" | "paid" | "upcoming"
}

export interface MonthlyTrendData {
  month: string
  received: number
  paid: number
  displayReceived?: string
  displayPaid?: string
}

export interface CategoryExpenseData {
  [key: string]: any
  name: string
  percentage: number
  amount: number
  color: string
}

export interface PendingItem {
  id: string
  title: string
  amount: string
  count: number
  iconType: "expense-entries" | "reimbursements" | "payments"
}

export interface RecentActivity {
  id: string
  description: string
  amount: string
  date: string
  type: "expense" | "payment" | "reimbursement"
}

export type TransactionType = "Money Received" | "Money Paid"

export type TransactionCategory =
  | "Client Projects"
  | "Office Rent"
  | "Utilities"
  | "Subscriptions"
  | "Reimbursement"
  | "Internet"
  | "Office Supplies"
  | string

export type TransactionPaymentMethod =
  | "Bank Transfer"
  | "UPI"
  | "Online Payment"
  | "Card"
  | string

export type TransactionStatus = "Completed" | "Pending" | "Failed"

export interface AccountantTransaction {
  id: string
  date: string
  type: TransactionType
  category: TransactionCategory
  description: string
  paymentMethod: TransactionPaymentMethod
  amount: string
  numericAmount: number
  status: TransactionStatus
  referenceNumber?: string
  party?: string
  notes?: string
}

export interface AccountantTransactionKpis {
  totalReceipts: string
  totalPayments: string
  totalTransactions: number
  thisMonthAmount: string
  thisMonthTrend: string
}

export interface TransactionFilterState {
  dateRange: string
  type: string
  category: string
  paymentMethod: string
  searchQuery?: string
}

export type ExpenseEntryStatus = "Pending" | "Paid" | "Draft"

export interface AccountantExpenseEntry {
  id: string
  expenseType: string
  vendor: string
  billNumber: string
  billDate: string
  dueDate: string
  amount: string
  numericAmount: number
  taxGst?: string
  paymentMethod: string
  status: ExpenseEntryStatus
  attachmentName?: string
  notes?: string
}

export interface AccountantExpenseKpis {
  totalEntries: number
  pendingBillsCount: number
  pendingBillsAmount: string
  dueThisWeekCount: number
  dueThisWeekAmount: string
  draftEntriesCount: number
  paidThisMonthAmount: string
}

export type ClaimApprovalStatus = "Pending Review" | "Approved" | "Rejected"
export type ClaimPaymentStatus = "Unpaid" | "Paid"

export interface AccountantReimbursementClaim {
  id: string
  claimId: string
  employeeName: string
  employeeRole: string
  employeeAvatar?: string
  expenseType: string
  department: string
  submittedDate: string
  amount: string
  numericAmount: number
  approvalStatus: ClaimApprovalStatus
  paymentStatus: ClaimPaymentStatus
  receiptUrl?: string
  receiptName?: string
  notes?: string
}

export interface AccountantReimbursementKpis {
  totalClaimsAmount: string
  pendingReviewAmount: string
  pendingReviewCount: number
  approvedPaymentAmount: string
  approvedPaymentCount: number
  paidThisMonthAmount: string
  paidThisMonthCount: number
  rejectedClaimsAmount: string
  rejectedClaimsCount: number
}

export interface ReimbursementActivityItem {
  id: string
  title: string
  description: string
  timestamp: string
  type: "submitted" | "approved" | "paid" | "rejected"
}

export type PaymentType = "Vendor Payment" | "Reimbursement"
export type PaymentStatus = "Paid" | "Pending" | "Failed"
export type PaymentMethod = "Bank Transfer" | "UPI" | "Card" | "Cash"

export interface AccountantPayment {
  id: string
  paymentId: string
  date: string
  paymentType: PaymentType
  payee: string
  category?: string
  reference: string
  amount: string
  numericAmount: number
  paymentMethod: PaymentMethod
  status: PaymentStatus
  department?: string
  accountNumber?: string
  transactionRef?: string
  invoiceFile?: {
    name: string
    size: string
    url?: string
  }
  remarks?: string
  notes?: string
}

export interface AccountantPaymentKpis {
  totalPayments: string
  totalPaymentsCount: number
  paymentsThisMonth: string
  thisMonthTrend: string
  vendorPaymentsAmount: string
  reimbursementsAmount: string
}

export type PaymentSubTab =
  | "All Payments"
  | "Vendor Payments"
  | "Employee Reimbursements"

export interface AccountantVendorPayment {
  id: string
  paymentId: string
  vendorName: string
  vendorInitials: string
  category?: string
  billDate: string
  paymentDate: string
  amount: string
  numericAmount: number
  paymentMethod: "Bank Transfer" | "Card" | "UPI" | "Cash"
  status: "Paid" | "Pending" | "Failed"
  billNumber?: string
  transactionRef?: string
  invoiceFile?: {
    name: string
    size: string
    url?: string
  }
  remarks?: string
  department?: string
  notes?: string
}

export interface VendorPaymentKpis {
  totalAmount: string
  paidAmount: string
  paidCount: number
  pendingAmount: string
  pendingCount: number
}

export interface AccountantEmployeeReimbursementPayment {
  id: string
  paymentId: string
  employeeName: string
  expenseType: string
  approvedDate: string
  paymentDate: string
  amount: string
  numericAmount: number
  paymentMethod: "Bank Transfer" | "UPI" | "Card" | "Cash"
  status: "Paid" | "Pending" | "Failed"
  department?: string
  transactionRef?: string
  invoiceFile?: {
    name: string
    size: string
    url?: string
  }
  remarks?: string
  notes?: string
}

export interface EmployeeReimbursementPaymentKpis {
  totalPaid: string
  paidThisMonth: string
  paidThisMonthTrend: string
  pendingAmount: string
  pendingClaimsCount: number
}

export interface AccountantReportKpis {
  moneyReceived: string
  moneyReceivedSubtitle: string
  moneyPaid: string
  moneyPaidSubtitle: string
  totalExpenses: string
  totalExpensesSubtitle: string
  netProfit: string
  netProfitTrend: string
}

export interface ReportSummaryRow {
  id: string
  period: string
  moneyReceived: string
  numericReceived: number
  moneyPaid: string
  numericPaid: number
  totalExpenses: string
  numericExpenses: number
  netProfit: string
  numericNetProfit: number
}

export interface ReportCategoryExpense {
  name: string
  amount: string
  numericAmount: number
  color: string
}

export interface ReportTrendDataPoint {
  period: string
  received: number
  paid: number
}

export interface ReportTransactionItem {
  id: string
  paymentId: string
  employee: string
  department: string
  designation: string
  expenseType: string
  paymentDate: string
  amount: string
  numericAmount: number
  paymentMethod: "Bank Transfer" | "UPI" | "Card" | "Cash"
}

export type FinanceMode = "My Finance" | "Executive Finance"

export interface ExecutiveKpiCard {
  id: string
  title: string
  value: string
  trend: string
  trendType: "up" | "down" | "neutral"
  subtitle: string
  iconType: "revenue" | "opex" | "margin" | "runway"
}

export interface DepartmentBudgetRow {
  id: string
  department: string
  head: string
  allocatedBudget: string
  actualSpend: string
  variance: string
  utilization: number
  status: "On Track" | "Under Budget" | "Review Required"
}

export interface ExecutiveWorkSummary {
  expenseEntries: number
  vendorPayments: number
  employeeReimbursements: number
  moneyHandledThisMonth: string
  averageEntriesPerWeek: number
}

export interface ExecutiveActivityItem {
  id: string
  date: string
  activityType: string
  reference: string
  amount: string
  status: "Completed" | "Approved" | "Pending" | "Rejected"
}

export interface AccountantExecutive {
  id: string
  name: string
  employeeId: string
  role: string
  avatar: string
  status: "Active" | "Inactive" | "On Leave"
  completedEntries: number
  completedReimbursements: number
  lastActivity: string
  department?: string
  designation?: string
  phone?: string
  joiningDate?: string
  email?: string
  reportingTo?: string
  workSummary?: ExecutiveWorkSummary
  recentActivity?: ExecutiveActivityItem[]
}

export interface ExecutiveOverviewKpis {
  totalExecutives: number
  completedEntries: number
  completedReimbursements: number
  completedThisMonth: number
}

export interface AccountantExecutiveTransaction {
  id: string
  transactionId: string
  date: string
  executiveName: string
  executiveAvatar: string
  type: "Expense Entry" | "Reimbursement" | "Payment"
  reference: string
  amount: string
  numericAmount: number
  status: "Completed" | "Pending" | "Failed"
}

export interface AccountantExecutiveTransactionKpis {
  totalTransactions: number
  moneyReceived: string
  moneyPaid: string
  completedThisMonth: number
}

export interface AccountantExecutiveExpenseEntry {
  id: string
  expenseId: string
  date: string
  executiveName: string
  executiveAvatar: string
  expenseType: string
  vendorProvider: string
  amount: string
  numericAmount: number
  status: "Completed" | "Pending" | "Rejected"
}

export interface AccountantExecutiveExpenseKpis {
  totalEntries: number
  utilityBills: number
  officeAdminEntries: number
  completedThisMonth: number
}



