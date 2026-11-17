"use client"

import { useState } from "react"
import LeaveHeader from "./LeaveHeader"
import LeaveStatCards from "./LeaveStatCards"
import LeaveTable from "./LeaveTable"
import { INITIAL_LEAVE_DATA, LeaveRecord } from "./LeaveData"

export default function LeaveView() {
  const [records, setRecords] = useState<LeaveRecord[]>(INITIAL_LEAVE_DATA)
  const [selectedMonth, setSelectedMonth] = useState("Nov 2026")

  const handleUpdateRecord = (updated: LeaveRecord) => {
    setRecords((prev) =>
      prev.map((rec) => (rec.id === updated.id ? updated : rec))
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <LeaveHeader
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />
      <LeaveStatCards records={records} />
      <LeaveTable records={records} onUpdateRecord={handleUpdateRecord} />
    </div>
  )
}
