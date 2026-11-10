"use client"

import { useRouter } from "next/navigation"
import AccountantTabs from "../components/AccountantTabs"
import AccountantReimbursementsView from "../components/AccountantReimbursementsView"
import AccountantModeToggle from "../components/AccountantModeToggle"
import { useAccountant } from "../context/AccountantContext"
import { AccountantTab } from "../types"

const tabRoutes: Record<AccountantTab, string> = {
  "Finance Overview": "/accountantmanager",
  "Executives Overview": "/accountantmanager",
  Transactions: "/accountantmanager/transactions",
  "Expense Entries": "/accountantmanager/expenses",
  Reimbursements: "/accountantmanager/reimbursements",
  Payments: "/accountantmanager/payments",
  Reports: "/accountantmanager/reports",
}

export default function AccountantReimbursementsPage() {
  const router = useRouter()
  const { financeMode } = useAccountant()

  const handleTabChange = (tab: AccountantTab) => {
    const route = tabRoutes[tab] || "/accountantmanager"
    router.push(route)
  }

  return (
    <div className="space-y-4 xl:space-y-4.5 pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Reimbursements
            </h1>
            <p className="text-xs text-slate-500">
              Track employee-paid claims that need repayment by the company.
            </p>
          </div>

          <AccountantModeToggle />
        </div>
      </div>

      <AccountantTabs
        activeTab="Reimbursements"
        onTabChange={handleTabChange}
      />

      <AccountantReimbursementsView />
    </div>
  )
}
