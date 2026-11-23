"use client"

import ChairmanReportsStatCards from "./ChairmanReportsStatCards"
import ChairmanRevenueVsExpensesTrendChart from "./ChairmanRevenueVsExpensesTrendChart"
import ChairmanDepartmentCostProgressCard from "./ChairmanDepartmentCostProgressCard"
import ChairmanGeneratedReportsTable from "./ChairmanGeneratedReportsTable"

export default function ChairmanReportsTabContent() {
  return (
    <div className="flex flex-col gap-5">
      <ChairmanReportsStatCards />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-12 xl:col-span-7 flex flex-col">
          <ChairmanRevenueVsExpensesTrendChart />
        </div>
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col">
          <ChairmanDepartmentCostProgressCard />
        </div>
      </div>

      <ChairmanGeneratedReportsTable />
    </div>
  )
}
