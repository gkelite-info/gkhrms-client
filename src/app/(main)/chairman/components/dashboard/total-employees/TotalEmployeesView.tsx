"use client"

import TotalEmployeesHeader from "./TotalEmployeesHeader"
import TotalEmployeesStatCards from "./TotalEmployeesStatCards"
import TotalEmployeesTable from "./TotalEmployeesTable"

interface TotalEmployeesViewProps {
  onBack: () => void
}

export default function TotalEmployeesView({ onBack }: TotalEmployeesViewProps) {
  return (
    <div className="flex flex-col gap-4">
      <TotalEmployeesHeader onBack={onBack} />
      <TotalEmployeesStatCards />
      <TotalEmployeesTable />
    </div>
  )
}
