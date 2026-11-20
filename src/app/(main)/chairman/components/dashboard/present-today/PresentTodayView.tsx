"use client"

import PresentTodayHeader from "./PresentTodayHeader"
import PresentTodayStatCards from "./PresentTodayStatCards"
import PresentTodayTable from "./PresentTodayTable"

interface PresentTodayViewProps {
  onBack: () => void
}

export default function PresentTodayView({ onBack }: PresentTodayViewProps) {
  return (
    <div className="flex flex-col gap-4">
      <PresentTodayHeader onBack={onBack} />
      <PresentTodayStatCards />
      <PresentTodayTable />
    </div>
  )
}
