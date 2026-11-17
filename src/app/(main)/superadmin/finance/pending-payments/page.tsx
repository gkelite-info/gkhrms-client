"use client"

import PendingPaymentsHeader from "./components/PendingPaymentsHeader"
import PendingPaymentsStatCards from "./components/PendingPaymentsStatCards"
import PendingPaymentsTable from "./components/PendingPaymentsTable"

export default function PendingPaymentsPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-6 pb-12">
      <PendingPaymentsHeader />
      <PendingPaymentsStatCards />
      <PendingPaymentsTable />
    </div>
  )
}

