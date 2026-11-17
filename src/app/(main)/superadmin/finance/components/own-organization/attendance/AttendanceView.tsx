"use client"

import AttendanceHeader from "./AttendanceHeader"
import AttendanceStatCards from "./AttendanceStatCards"
import AttendanceTable from "./AttendanceTable"

export default function AttendanceView() {
  return (
    <div className="flex flex-col gap-6">
      <AttendanceHeader />
      <AttendanceStatCards />
      <AttendanceTable />
    </div>
  )
}
