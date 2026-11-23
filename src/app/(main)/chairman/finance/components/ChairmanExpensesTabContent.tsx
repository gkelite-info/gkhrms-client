"use client"

import ChairmanExpensesStatCards from "./ChairmanExpensesStatCards"
import ChairmanExpenseTrendChart from "./ChairmanExpenseTrendChart"
import ChairmanExpenseBreakdownChart from "./ChairmanExpenseBreakdownChart"
import ChairmanExpenseDetailsTable from "./ChairmanExpenseDetailsTable"

export default function ChairmanExpensesTabContent() {
  return (
    <div className="flex flex-col gap-5">
      <ChairmanExpensesStatCards />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-12 xl:col-span-7 flex flex-col">
          <ChairmanExpenseTrendChart />
        </div>
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col">
          <ChairmanExpenseBreakdownChart />
        </div>
      </div>

      <ChairmanExpenseDetailsTable />
    </div>
  )
}
