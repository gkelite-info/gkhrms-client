export type AccountantTab =
  | "Finance Overview"
  | "Transactions"
  | "Expense Entries"
  | "Reimbursements"
  | "Payments"
  | "Reports"

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
