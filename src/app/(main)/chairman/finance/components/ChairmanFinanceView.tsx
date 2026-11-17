"use client"

import { useState } from "react"
import ChairmanFinanceHeader from "./ChairmanFinanceHeader"
import ChairmanFinanceTabs, { ChairmanFinanceTab } from "./ChairmanFinanceTabs"
import ChairmanFinanceStatCards from "./ChairmanFinanceStatCards"
import RevenueVsExpensesChart from "./RevenueVsExpensesChart"
import ExpenseBreakdownDonutChart from "./ExpenseBreakdownDonutChart"
import ReceivablesVsPayablesCard from "./ReceivablesVsPayablesCard"
import BudgetUtilizationCard from "./BudgetUtilizationCard"
import RecentFinancialActivityTable from "./RecentFinancialActivityTable"

export default function ChairmanFinanceView() {
  const [activeTab, setActiveTab] = useState<ChairmanFinanceTab>("overview")

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 sm:p-6 flex flex-col gap-5 pb-12">
      <ChairmanFinanceHeader />
      <ChairmanFinanceTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "overview" ? (
        <>
          <ChairmanFinanceStatCards />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-7 flex flex-col">
              <RevenueVsExpensesChart />
            </div>
            <div className="lg:col-span-5 flex flex-col">
              <ExpenseBreakdownDonutChart />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-6 flex flex-col">
              <ReceivablesVsPayablesCard />
            </div>
            <div className="lg:col-span-6 flex flex-col">
              <BudgetUtilizationCard />
            </div>
          </div>

          <RecentFinancialActivityTable />
        </>
      ) : (
        <div className="bg-white border border-slate-100/90 rounded-2xl p-12 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-base font-bold text-slate-800 capitalize">
            {activeTab.replace(/_/g, " ")} Details
          </span>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            Detailed breakdown and reports for {activeTab.replace(/_/g, " ")} are currently in live synchronization.
          </p>
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#5B50E5] hover:bg-[#4E44C9] transition-colors cursor-pointer"
          >
            Back to Finance Overview
          </button>
        </div>
      )}
    </div>
  )
}
