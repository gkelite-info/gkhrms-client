"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import ManagerAttendanceTabs, { ManagerTabKey } from "./components/ManagerAttendanceTabs"
import ManagerTabHeaderBanner from "./components/ManagerTabHeaderBanner"
import ManagerTeamAttendanceSection from "./components/ManagerTeamAttendanceSection"
import ProfileSummaryCard from "../teamlead/components/ProfileSummaryCard"
import AttendanceDonutCard from "../teamlead/components/AttendanceDonutCard"
import AttendanceRequestsCard from "../teamlead/components/AttendanceRequestsCard"
import PerformanceDonutCard from "../teamlead/components/PerformanceDonutCard"
import AttendanceStatsCard from "../teamlead/components/AttendanceStatsCard"
import TimingsCard from "../teamlead/components/TimingsCard"
import ActionsCard from "../teamlead/components/ActionsCard"
import LeaveBalanceSection from "../teamlead/components/LeaveBalanceSection"
import ManagerRequestsSection from "./components/requests/ManagerRequestsSection"
import AttendanceLogSection from "../teamlead/components/AttendanceLogSection"
import TeamLeadExceptionHistorySection from "../teamlead/components/exception-history/TeamLeadExceptionHistorySection"
import TeamLeadAttendanceFormContainer from "../teamlead/components/attendance-forms/TeamLeadAttendanceFormContainer"

function ManagerAttendanceContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")

  if (tabParam === "apply-leave") {
    return <TeamLeadAttendanceFormContainer initialFormType="leave" />
  }

  if (tabParam === "request-wfh") {
    return <TeamLeadAttendanceFormContainer initialFormType="wfh" />
  }

  const validTabs: ManagerTabKey[] = [
    "my-attendance",
    "team-attendance",
    "requests",
    "exception-history",
  ]
  const activeTab: ManagerTabKey =
    tabParam === "my-requests"
      ? "requests"
      : tabParam === "tl-wise-attendance"
      ? "team-attendance"
      : tabParam && validTabs.includes(tabParam as ManagerTabKey)
      ? (tabParam as ManagerTabKey)
      : "my-attendance"

  const handleTabChange = (newTab: ManagerTabKey) => {
    router.push(`/manager?tab=${newTab}`)
  }

  return (
    <div className="w-full flex-1 p-3 sm:p-4 md:p-6 pb-16 sm:pb-8 flex flex-col gap-4 sm:gap-5 max-w-[1600px] mx-auto animate-in fade-in duration-200 min-w-0">
      <ManagerAttendanceTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {activeTab === "team-attendance" ? (
        <>
          <ManagerTabHeaderBanner activeTab={activeTab} />
          <ManagerTeamAttendanceSection />
        </>
      ) : activeTab === "requests" ? (
        <>
          <ManagerTabHeaderBanner activeTab={activeTab} />
          <ManagerRequestsSection />
        </>
      ) : activeTab === "exception-history" ? (
        <TeamLeadExceptionHistorySection />
      ) : (
        <>
          <ManagerTabHeaderBanner activeTab={activeTab} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ProfileSummaryCard name="David Miller" employeeId="MGR001" />
            <AttendanceDonutCard />
            <AttendanceRequestsCard
              newApprovalCount={4}
              pendingCount={2}
              href="/manager?tab=requests"
              newApprovalHref="/manager?tab=requests"
              pendingHref="/manager?tab=requests"
            />
            <PerformanceDonutCard score={96} subtitle="This Month (OCT)" />
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
        </>
      )}
    </div>
  )
}

export default function ManagerAttendancePage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[400px] flex items-center justify-center text-xs text-gray-400">
          Loading...
        </div>
      }
    >
      <ManagerAttendanceContent />
    </Suspense>
  )
}
