"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import AttendanceTabs, { TabKey } from "./AttendanceTabs"
import TeamAttendanceSection from "./TeamAttendanceSection"
import ProfileSummaryCard from "./ProfileSummaryCard"
import AttendanceDonutCard from "./AttendanceDonutCard"
import AttendanceRequestsCard from "./AttendanceRequestsCard"
import PerformanceDonutCard from "./PerformanceDonutCard"
import AttendanceStatsCard from "./AttendanceStatsCard"
import TimingsCard from "./TimingsCard"
import ActionsCard from "./ActionsCard"
import LeaveBalanceSection from "./LeaveBalanceSection"
import AttendanceLogSection from "./AttendanceLogSection"
import TeamLeadRequestsSection from "./TeamLeadRequestsSection"
import TeamLeadApplyLeaveSection from "./TeamLeadApplyLeaveSection"
import TeamLeadExceptionHistorySection from "./exception-history/TeamLeadExceptionHistorySection"

export default function TeamLeadAttendanceContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")

  const isFinance =
    pathname?.startsWith("/financemanager") || pathname?.startsWith("/finance")
  const isEmployee = pathname?.startsWith("/employee")
  const isEmployeeLike = isEmployee || isFinance
  const basePath = pathname?.startsWith("/financemanager")
    ? "/financemanager/attendance"
    : isFinance
    ? "/finance/attendance"
    : isEmployee
    ? "/employee/attendance"
    : "/teamlead/attendance"

  if (tabParam === "apply-leave") {
    return <TeamLeadApplyLeaveSection initialFormType="leave" />
  }

  if (tabParam === "request-wfh") {
    return <TeamLeadApplyLeaveSection initialFormType="wfh" />
  }

  if (tabParam === "apply-exception" || tabParam === "regularize") {
    return <TeamLeadApplyLeaveSection initialFormType="exception" />
  }

  const resolvedTabParam = isEmployeeLike && tabParam === "team-attendance" ? "my-attendance" : tabParam
  const activeTab: TabKey =
    resolvedTabParam === "my-requests"
      ? "requests"
      : resolvedTabParam === "team-attendance" && !isEmployeeLike
      ? "team-attendance"
      : resolvedTabParam === "requests" || resolvedTabParam === "exception-history"
      ? resolvedTabParam
      : "my-attendance"

  const handleTabChange = (newTab: TabKey) => {
    router.push(`${basePath}?tab=${newTab}`)
  }

  return (
    <div className="w-full flex-1 p-3 sm:p-4 md:p-6 pb-16 sm:pb-8 flex flex-col gap-4 sm:gap-5 max-w-[1600px] mx-auto animate-in fade-in duration-200 min-w-0">
      <AttendanceTabs activeTab={activeTab} onTabChange={handleTabChange} basePath={basePath} />

      {activeTab === "team-attendance" && !isEmployeeLike ? (
        <TeamAttendanceSection />
      ) : activeTab === "requests" ? (
        <TeamLeadRequestsSection />
      ) : activeTab === "exception-history" ? (
        <TeamLeadExceptionHistorySection />
      ) : (
        <>
          <div
            className={`grid gap-4 ${
              isEmployeeLike
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            <ProfileSummaryCard
              name={isFinance ? "Rohan Verma" : isEmployee ? "John Doe" : "Alexander"}
              employeeId={isFinance ? "FIN1004" : isEmployee ? "154380" : "154356"}
            />
            <AttendanceDonutCard />
            {!isEmployeeLike && (
              <AttendanceRequestsCard
                newApprovalCount={3}
                pendingCount={2}
              />
            )}
            <PerformanceDonutCard
              score={95}
              subtitle="This Month (OCT)"
              className={isEmployeeLike ? "sm:col-span-2 lg:col-span-1" : undefined}
            />
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
