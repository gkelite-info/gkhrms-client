"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AccountantTabs from "../components/AccountantTabs"
import AccountantPaymentsView from "../components/AccountantPaymentsView"
import AccountantModeToggle from "../components/AccountantModeToggle"
import { useAccountant } from "../context/AccountantContext"
import { AccountantTab, PaymentSubTab } from "../types"

const tabRoutes: Record<AccountantTab, string> = {
  "Finance Overview": "/accountantmanager",
  "Executives Overview": "/accountantmanager",
  Transactions: "/accountantmanager/transactions",
  "Expense Entries": "/accountantmanager/expenses",
  Reimbursements: "/accountantmanager/reimbursements",
  Payments: "/accountantmanager/payments",
  Reports: "/accountantmanager/reports",
}

export default function AccountantPaymentsPage() {
  const router = useRouter()
  const { financeMode } = useAccountant()
  const [subTab, setSubTab] = useState<PaymentSubTab>("All Payments")

  useEffect(() => {
    if (financeMode === "Executive Finance") {
      router.push("/accountantmanager")
    }
  }, [financeMode, router])

  const handleTabChange = (tab: AccountantTab) => {
    const route = tabRoutes[tab] || "/accountantmanager"
    router.push(route)
  }

  const subtitle =
    subTab === "Vendor Payments"
      ? "Track and manage outgoing payments for vendor bills and reimbursements."
      : subTab === "Employee Reimbursements"
      ? "Track and manage outgoing payments for vendor bills and employee reimbursements."
      : "Execute and track approved payments (vendor bills, reimbursements, and other expenses)."

  if (financeMode === "Executive Finance") {
    return null
  }

  return (
    <div className="space-y-4 xl:space-y-4.5 pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Payments
            </h1>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>

          <AccountantModeToggle />
        </div>
      </div>

      <AccountantTabs
        activeTab="Payments"
        onTabChange={handleTabChange}
      />

      <AccountantPaymentsView
        initialSubTab={subTab}
        onSubTabChange={setSubTab}
      />
    </div>
  )
}
