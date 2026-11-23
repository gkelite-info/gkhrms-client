"use client"

import ChairmanPayrollStatCards from "./ChairmanPayrollStatCards"
import ChairmanPayrollTrendChart from "./ChairmanPayrollTrendChart"
import ChairmanDepartmentPayrollChart from "./ChairmanDepartmentPayrollChart"
import ChairmanPayrollSummaryCard from "./ChairmanPayrollSummaryCard"
import ChairmanRecentPayrollTable from "./ChairmanRecentPayrollTable"

export default function ChairmanPayrollTabContent() {
  return (
    <div className="flex flex-col gap-5">
      <ChairmanPayrollStatCards />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col">
          <ChairmanPayrollTrendChart />
        </div>
        <div className="lg:col-span-6 xl:col-span-4 flex flex-col">
          <ChairmanDepartmentPayrollChart />
        </div>
        <div className="lg:col-span-6 xl:col-span-3 flex flex-col">
          <ChairmanPayrollSummaryCard />
        </div>
      </div>

      <ChairmanRecentPayrollTable />
    </div>
  )
}
