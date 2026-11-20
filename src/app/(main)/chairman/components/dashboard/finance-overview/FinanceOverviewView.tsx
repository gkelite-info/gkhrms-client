"use client"

import FinanceOverviewHeader from "./FinanceOverviewHeader"
import FinanceOverviewStatCards from "./FinanceOverviewStatCards"
import FinanceOverviewChartCard from "./FinanceOverviewChartCard"
import FinanceOverviewTableCard from "./FinanceOverviewTableCard"

interface FinanceOverviewViewProps {
  onBack: () => void
}

export default function FinanceOverviewView({
  onBack,
}: FinanceOverviewViewProps) {
  return (
    <div className="flex flex-col gap-4">
      <FinanceOverviewHeader onBack={onBack} />
      <FinanceOverviewStatCards />
      <FinanceOverviewChartCard />
      <FinanceOverviewTableCard />
    </div>
  )
}
