"use client"

import OverduePaymentsHeader from "./components/OverduePaymentsHeader"
import OverduePaymentsStatCards from "./components/OverduePaymentsStatCards"
import OverduePaymentsTable from "./components/OverduePaymentsTable"

export default function OverduePaymentsPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-6 pb-12">
      <OverduePaymentsHeader />
      <OverduePaymentsStatCards />
      <OverduePaymentsTable />
    </div>
  )
}

