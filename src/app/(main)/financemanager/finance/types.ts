export type FinanceTab =
  | "Finance Overview"
  | "Revenue"
  | "Expenses"
  | "Reimbursements"
  | "Payments"
  | "Budgets"
  | "Reports"

export interface KpiCardData {
  id: string
  title: string
  value: string
  subtitle?: string
  trend?: string
  trendDirection?: "up" | "down" | "neutral"
  trendLabel?: string
  badgeText?: string
  badgeColor?: string
  iconType:
    | "currency"
    | "receipt"
    | "payment"
    | "budget"
    | "approved"
    | "overdue"
    | "rejected"
    | "users"
    | "building"
    | "pending"
    | "calendar"
    | "bar-chart"
    | "trend-up"
    | "trend-down"
    | "credit-card"
    | "clock"
    | "alert-triangle"
  clickable?: boolean
  secondaryLabel?: string
  secondaryValue?: string
}

export interface MonthlyTrendData {
  [key: string]: string | number | undefined
  month: string
  amount: number
}

export interface ExpenseBreakdownItem {
  [key: string]: string | number | undefined
  name: string
  value: number
  percentage: number
  color: string
}

export interface ExpenseBreakdownDetailItem {
  [key: string]: string | number | undefined
  name: string
  amount: string
  share: string
  percentage: number
  color: string
}

export type TransactionStatus = "Paid" | "Pending" | "Approved" | "Completed" | "Rejected"

export interface TransactionAttachment {
  name: string
  size: string
  type: "pdf" | "image"
}

export interface Transaction {
  id: string
  date: string
  type: "Reimbursement" | "Expense Claim" | "Budget Transfer" | "Vendor Invoice" | "Payroll"
  reference: string
  amount: number
  formattedAmount: string
  status: TransactionStatus
  department?: string
  submittedBy?: string
  paymentMethod?: string
  payeeName?: string
  payeeEmployeeId?: string
  payeeDepartment?: string
  payeeRole?: string
  payeeAvatar?: string
  relatedModule?: string
  relatedRecordId?: string
  category?: string
  purpose?: string
  attachments?: TransactionAttachment[]
}

export type ExpenseType = "Employee" | "Company"
export type ExpenseStatus = "Pending" | "Approved" | "Rejected"

export interface ExpenseRecord {
  id: string
  expenseId: string
  submittedBy: string
  expenseType: ExpenseType
  category: string
  amount: number
  formattedAmount: string
  submittedOn: string
  status: ExpenseStatus
  description?: string
  receiptUrl?: string
}

export type ReimbursementStatus =
  | "Pending"
  | "Approved"
  | "Paid"
  | "Under Review"
  | "Rejected"

export type ReimbursementPaymentStatus =
  | "Unpaid"
  | "Paid"
  | "Processing"
  | "None"

export interface ReimbursementClaim {
  id: string
  claimId: string
  employee: string
  expenseType: string
  department: string
  amount: number
  formattedAmount: string
  submittedOn: string
  status: ReimbursementStatus
  paymentStatus: ReimbursementPaymentStatus
  description?: string
}

export interface MonthlySpendSummary {
  month: string
  totalSpend: string
  totalSpendNum: number
  salaries: string
  operations: string
  technology: string
  travel: string
  marketing: string
  other: string
}

export interface BudgetInsight {
  id: string
  text: string
  type: "highest" | "increase" | "stable" | "normal"
}

export interface BudgetItem {
  department: string
  allocated: number
  spent: number
  percentage: number
}

export interface RevenueRecord {
  id: string
  invoiceId: string
  clientName: string
  service: string
  amount: number
  formattedAmount: string
  issueDate: string
  dueDate: string
  status: "Collected" | "Pending" | "Overdue"
}

export type RevenueStatusType = "Received" | "Pending" | "Overdue" | "Partially Paid"

export interface RevenueDetailedRecord {
  id: string
  invoiceId: string
  source: "Client Project" | "Service Fee" | "Product Sales" | "Subscription" | "Training"
  clientProject: string
  category: string
  amount: number
  formattedAmount: string
  invoiceDate: string
  receivedDate: string
  status: RevenueStatusType
}

export interface RevenueTrendMonthItem {
  [key: string]: string | number | undefined
  month: string
  received: number
  pending: number
}

export interface RevenueStatusMetric {
  status: RevenueStatusType
  amount: string
  percentage: number
  color: string
}

export type PaymentStatus = "Paid" | "Scheduled" | "Processing" | "Overdue" | "Pending"
export type PaymentType = "Reimbursement" | "Vendor Invoice" | "Salary" | "Operations"
export type PayeeType = "Employee" | "Vendor" | "Contractor"

export interface PaymentItem {
  id: string
  paymentId: string
  payee: string
  payeeType: PayeeType
  paymentType: PaymentType
  category: string
  amount: number
  formattedAmount: string
  dueDate: string
  paymentDate: string
  status: PaymentStatus
  description?: string
  paymentMethod?: string
}

export interface PaymentKpiData {
  id: string
  title: string
  value: string
  trend?: string
  trendDirection?: "up" | "down" | "neutral"
  trendLabel?: string
  badgeText?: string
  badgeColor?: string
  iconType: "users" | "clock" | "check" | "alert" | "coins"
}

export interface ReportKpiCard {
  id: string
  title: string
  value: string
  iconType: "revenue" | "expenses" | "profit" | "receivables" | "payments"
}

export interface RevenueExpenseTrendItem {
  [key: string]: string | number | undefined
  month: string
  revenue: number
  expenses: number
  netProfit: number
  formattedRevenue: string
  formattedExpenses: string
  formattedNetProfit: string
}

export interface ReportDonutItem {
  [key: string]: string | number | undefined
  name: string
  percentage: number
  color: string
  value?: number
}

export interface MonthlySummaryRow {
  month: string
  revenue: string
  expenses: string
}

export type PendingPaymentType = "Reimbursement" | "Expense Claim" | "Travel Expense" | "Subscription"

export interface PendingPaymentItem {
  id: string
  dueDate: string
  type: PendingPaymentType
  reference: string
  employee: string
  department: string
  amount: number
  formattedAmount: string
  status: "Pending" | "Overdue" | "Processing" | "Approved"
  description?: string
  paymentMethod?: string
}

export interface PendingPaymentKpiData {
  id: string
  title: string
  amount: string
  subtext: string
  iconType: "clock" | "alert" | "calendar" | "users"
}

export interface OverduePaymentItem {
  id: string
  paymentId: string
  payee: string
  paymentType: string
  department: string
  amount: number
  formattedAmount: string
  dueDate: string
  daysDue: string | number
  status: "Pending" | "Overdue"
  description?: string
  paymentMethod?: string
}

export interface OverduePaymentKpi {
  id: string
  title: string
  value: string
  trend: string
  trendDirection: "up" | "down"
  trendColor: "green" | "red"
  iconType: "file" | "alert" | "currency"
}
