"use client"

import MoneyReceivedHeader from "./components/MoneyReceivedHeader"
import MoneyReceivedStatCards from "./components/MoneyReceivedStatCards"
import MoneyReceivedTable from "./components/MoneyReceivedTable"

export default function MoneyReceivedPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-6 pb-12">
      <MoneyReceivedHeader />
      <MoneyReceivedStatCards />
      <MoneyReceivedTable />
    </div>
  )
}

