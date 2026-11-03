"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { FinanceTabType } from "./components/types"
import FinanceTabs from "./components/FinanceTabs"
import FinanceSummaryView from "./components/FinanceSummaryView"
import FinanceMyPayView from "./components/FinanceMyPayView"
import FinanceManageTaxView from "./components/FinanceManageTaxView"
import EmployeeExpensesView from "../components/me/EmployeeExpensesView"
import PayslipView from "./components/PayslipView"

function FinanceContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<FinanceTabType>("summary")

  const viewParam = searchParams.get("view")?.toLowerCase()
  const payslipParam = searchParams.get("payslip")?.toLowerCase()
  const isPayslipActive = viewParam === "payslip" || payslipParam === "true"

  useEffect(() => {
    const rawTab = searchParams.get("tab")?.toLowerCase()
    if (rawTab === "mypay" || rawTab === "my-pay") {
      setActiveTab("mypay")
    } else if (
      rawTab === "manage_tax" ||
      rawTab === "manage-tax" ||
      rawTab === "tax"
    ) {
      setActiveTab("manage_tax")
    } else if (
      rawTab === "expenses" ||
      rawTab === "expenses_travel" ||
      rawTab === "expenses-travel"
    ) {
      setActiveTab("expenses_travel")
    } else {
      setActiveTab("summary")
    }
  }, [searchParams])

  const handleSelectTab = (tab: FinanceTabType) => {
    setActiveTab(tab)
    if (tab === "summary") {
      router.push("/employee/finance")
    } else {
      router.push(`/employee/finance?tab=${tab}`)
    }
  }

  const handleOpenPayslip = () => {
    const tabSuffix = activeTab === "summary" ? "" : `tab=${activeTab}&`
    router.push(`/employee/finance?${tabSuffix}view=payslip`)
  }

  const handleClosePayslip = () => {
    if (activeTab === "summary") {
      router.push("/employee/finance")
    } else {
      router.push(`/employee/finance?tab=${activeTab}`)
    }
  }

  if (isPayslipActive) {
    return (
      <div className="w-full h-full max-w-full min-w-0 flex flex-col px-3 pt-2.5 sm:px-4 sm:pt-3 md:px-6 md:pt-3 pb-3 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <PayslipView onBack={handleClosePayslip} />
      </div>
    )
  }

  return (
    <div className="w-full min-h-full max-w-full min-w-0 flex flex-col px-3 pt-2.5 sm:px-4 sm:pt-3 md:px-6 md:pt-3 pb-8 overflow-y-auto overflow-x-hidden scrollbar-hide">
      <div className="shrink-0 mb-2 sm:mb-2.5">
        <FinanceTabs activeTab={activeTab} onSelectTab={handleSelectTab} />
      </div>

      <div className="w-full flex flex-col mt-2">
        {activeTab === "summary" && (
          <div className="w-full flex flex-col pb-4">
            <FinanceSummaryView onViewPayslip={handleOpenPayslip} />
          </div>
        )}

        {activeTab === "mypay" && (
          <FinanceMyPayView onViewPayslip={handleOpenPayslip} />
        )}

        {activeTab === "manage_tax" && <FinanceManageTaxView />}

        {activeTab === "expenses_travel" && (
          <div className="w-full flex flex-col pb-4">
            <EmployeeExpensesView onAddMore={() => router.push("/employee/tickets")} />
          </div>
        )}
      </div>
    </div>
  )
}

export default function FinancePage() {
  return (
    <Suspense
      fallback={
        <div className="w-full p-4">
          <div className="w-full h-9 bg-white/60 animate-pulse rounded-xl mb-3" />
          <div className="w-full h-16 bg-white/60 animate-pulse rounded-xl mb-3" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="h-48 bg-white/60 animate-pulse rounded-xl" />
            <div className="h-48 bg-white/60 animate-pulse rounded-xl" />
          </div>
        </div>
      }
    >
      <FinanceContent />
    </Suspense>
  )
}
