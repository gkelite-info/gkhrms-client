"use client"

import ChairmanReceivablesPayablesStatCards from "./ChairmanReceivablesPayablesStatCards"
import ChairmanReceivablesPayablesSummaryCards from "./ChairmanReceivablesPayablesSummaryCards"
import ChairmanReceivablesPayablesTrendCharts from "./ChairmanReceivablesPayablesTrendCharts"
import ChairmanReceivablesPayablesTables from "./ChairmanReceivablesPayablesTables"

export default function ChairmanReceivablesPayablesTabContent() {
  return (
    <div className="flex flex-col gap-5">
      <ChairmanReceivablesPayablesStatCards />
      <ChairmanReceivablesPayablesSummaryCards />
      <ChairmanReceivablesPayablesTrendCharts />
      <ChairmanReceivablesPayablesTables />
    </div>
  )
}
