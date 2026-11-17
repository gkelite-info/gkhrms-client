"use client"

import dynamic from "next/dynamic"
import MonthlyRevenueHeader from "./components/MonthlyRevenueHeader"
import MonthlyRevenueStatCards from "./components/MonthlyRevenueStatCards"
import MonthlyRevenueTable from "./components/MonthlyRevenueTable"

const MonthlyRevenueBarChart = dynamic(
  () => import("./components/MonthlyRevenueBarChart"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs h-80 flex items-center justify-center">
        <span className="text-xs text-slate-400 font-medium animate-pulse">
          Loading revenue trend...
        </span>
      </div>
    ),
  }
)

const PlanContributionDonutChart = dynamic(
  () => import("./components/PlanContributionDonutChart"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs h-80 flex items-center justify-center">
        <span className="text-xs text-slate-400 font-medium animate-pulse">
          Loading contribution...
        </span>
      </div>
    ),
  }
)

export default function MonthlyRevenuePage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-6 pb-12">
      <MonthlyRevenueHeader />
      <MonthlyRevenueStatCards />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <MonthlyRevenueBarChart />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <PlanContributionDonutChart />
        </div>
      </div>

      <MonthlyRevenueTable />
    </div>
  )
}
