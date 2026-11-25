"use client"

import AttendanceLeaveCard from "./AttendanceLeaveCard"
import PayroleDashboardCard from "./PayroleDashboardCard"

const AttendancePayrolMainCard = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-3 sm:gap-4 items-stretch">
      <AttendanceLeaveCard />
      <PayroleDashboardCard />
    </div>
  )
}

export default AttendancePayrolMainCard
