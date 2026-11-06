"use client"

import { User } from "phosphor-react"
import ProfileSummaryCard from "../../../teamlead/components/ProfileSummaryCard"
import AttendanceDonutCard from "../../../teamlead/components/AttendanceDonutCard"
import AttendanceRequestsCard from "../../../teamlead/components/AttendanceRequestsCard"
import PerformanceDonutCard from "../../../teamlead/components/PerformanceDonutCard"
import AttendanceStatsCard from "../../../teamlead/components/AttendanceStatsCard"
import TimingsCard from "../../../teamlead/components/TimingsCard"
import ActionsCard from "../../../teamlead/components/ActionsCard"
import LeaveBalanceSection from "../../../teamlead/components/LeaveBalanceSection"
import AttendanceLogSection from "../../../teamlead/components/AttendanceLogSection"

interface HrMyAttendanceTabProps {
  basePath?: string
  userName?: string
  employeeId?: string
}

export default function HrMyAttendanceTab({
  basePath = "/hr/attendance",
  userName = "Sarah Jenkins",
  employeeId = "HR001",
}: HrMyAttendanceTabProps) {
  const requestsHref = `${basePath}?tab=attendance-requests`

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex items-center justify-between gap-4 min-w-0 transition-all">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
            <User size={24} weight="bold" />
          </div>
          <div className="flex flex-col min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight break-words">
              My Attendance
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5 break-words">
              Track your personal attendance records, daily timings, and leave balance overview.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProfileSummaryCard name={userName} employeeId={employeeId} />
        <AttendanceDonutCard />
        <AttendanceRequestsCard
          newApprovalCount={6}
          pendingCount={3}
          href={requestsHref}
          newApprovalHref={requestsHref}
          pendingHref={requestsHref}
        />
        <PerformanceDonutCard score={98} subtitle="This Month (OCT)" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        <AttendanceStatsCard />
        <TimingsCard />
        <div className="md:col-span-2 lg:col-span-1">
          <ActionsCard />
        </div>
      </div>

      <LeaveBalanceSection />
      <AttendanceLogSection />
    </div>
  )
}
