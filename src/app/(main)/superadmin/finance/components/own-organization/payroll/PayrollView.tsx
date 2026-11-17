"use client"

import PayrollHeader from "./PayrollHeader"
import PayrollStatCards from "./PayrollStatCards"
import PayrollTrendChart from "./PayrollTrendChart"
import PayrollCostDonutChart from "./PayrollCostDonutChart"
import PayrollTable from "./PayrollTable"

export default function PayrollView() {
  return (
    <div className="flex flex-col gap-6">
      <PayrollHeader />
      <PayrollStatCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PayrollTrendChart />
        <PayrollCostDonutChart />
      </div>
      <PayrollTable />
    </div>
  )
}
