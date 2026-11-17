"use client"

import RefundsHeader from "./components/RefundsHeader"
import RefundsStatCards from "./components/RefundsStatCards"
import RefundsTable from "./components/RefundsTable"

export default function RefundsPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-6 pb-12">
      <RefundsHeader />
      <RefundsStatCards />
      <RefundsTable />
    </div>
  )
}

