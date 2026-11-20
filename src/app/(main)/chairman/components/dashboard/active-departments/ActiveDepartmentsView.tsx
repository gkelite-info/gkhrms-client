"use client"

import ActiveDepartmentsHeader from "./ActiveDepartmentsHeader"
import ActiveDepartmentsStatCards from "./ActiveDepartmentsStatCards"
import ActiveDepartmentsTable from "./ActiveDepartmentsTable"

interface ActiveDepartmentsViewProps {
  onBack: () => void
}

export default function ActiveDepartmentsView({
  onBack,
}: ActiveDepartmentsViewProps) {
  return (
    <div className="flex flex-col gap-4">
      <ActiveDepartmentsHeader onBack={onBack} />
      <ActiveDepartmentsStatCards />
      <ActiveDepartmentsTable />
    </div>
  )
}
