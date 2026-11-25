"use client"

import { Suspense } from "react"
import EmployeeCountCard from "../../../../Features/Hr/Components/EmployeeCountCard"
import TrainingExpiringDocMainCard from "../../../../Features/Hr/Components/TrainingExpiringDocMainCard"
import UserDetailsCard from "../../../../utils/UserDetailsCard"
import AttendancePayrolMainCard from "../../../../Features/Hr/Components/AttendancePayrolMainCard"
import DashboardGraphsContainer from "../../../../Features/Hr/Components/DashboardGraphsContainer"

const HrDashboard = () => {
  return (
    <Suspense fallback={<div className="w-full h-40 animate-pulse bg-white/40 rounded-2xl m-4" />}>
      <div className="w-full flex-1 p-3 sm:p-4 md:p-6 pb-16 sm:pb-8 flex flex-col gap-3.5 sm:gap-4 max-w-[1600px] mx-auto min-w-0 overflow-x-hidden">
        <UserDetailsCard />
        <EmployeeCountCard />
        <DashboardGraphsContainer />
        <AttendancePayrolMainCard />
        <TrainingExpiringDocMainCard />
      </div>
    </Suspense>
  )
}

export default HrDashboard
