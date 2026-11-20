"use client"

import NewJoinersHeader from "./NewJoinersHeader"
import NewJoinersStatCards from "./NewJoinersStatCards"
import NewJoinersTable from "./NewJoinersTable"

interface NewJoinersViewProps {
  onBack: () => void
}

export default function NewJoinersView({ onBack }: NewJoinersViewProps) {
  return (
    <div className="flex flex-col gap-4">
      <NewJoinersHeader onBack={onBack} />
      <NewJoinersStatCards />
      <NewJoinersTable />
    </div>
  )
}
