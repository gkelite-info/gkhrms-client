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

  const isSuperAdmin = pathname?.startsWith("/superadmin")
  const isChairman = pathname?.startsWith("/chairman")
  const isAsstManager = pathname?.startsWith("/asstmanager")
  const isTechAdmin = pathname?.startsWith("/techadmin")
  const isAccountantManager = pathname?.startsWith("/accountantmanager")
  const isAccountantExecutive = pathname?.startsWith("/accountantexecutive")
  const isFinanceExecutive = pathname?.startsWith("/financeexecutive")
  const isFinance =
    isFinanceExecutive ||
    pathname?.startsWith("/financemanager") ||
    pathname?.startsWith("/finance")
  const isEmployee = pathname?.startsWith("/employee")
  const isEmployeeLike = isEmployee || isFinance || isAccountantExecutive || isAccountantManager || isTechAdmin || isSuperAdmin || isChairman || isAsstManager
  const basePath = isSuperAdmin
    ? "/superadmin/attendance"
    : isChairman
    ? "/chairman/attendance"
    : isAsstManager
    ? "/asstmanager/attendance"
    : isTechAdmin
    ? "/techadmin/attendance"
    : isAccountantManager
    ? "/accountantmanager/attendance"
    : isAccountantExecutive
    ? "/accountantexecutive/attendance"
    : isFinanceExecutive
    ? "/financeexecutive/attendance"
    : pathname?.startsWith("/financemanager")
    ? "/financemanager/attendance"
    : isFinance
    ? "/financemanager/attendance"
    : isEmployee
    ? "/employee/attendance"
    : "/teamlead/attendance"

  if (tabParam === "apply-leave") {
    if (isChairman) return null
    return <TeamLeadApplyLeaveSection initialFormType="leave" />
  }

  if (tabParam === "request-wfh") {
    if (isChairman) return null
    return <TeamLeadApplyLeaveSection initialFormType="wfh" />
  }

  if (tabParam === "apply-exception" || tabParam === "regularize") {
    if (isChairman) return null
    return <TeamLeadApplyLeaveSection initialFormType="exception" />
  }

  const resolvedTabParam =
    isChairman && (tabParam === "requests" || tabParam === "team-attendance")
      ? "my-attendance"
      : isEmployeeLike && tabParam === "team-attendance"
      ? "my-attendance"
      : tabParam
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

  const is3Col = isEmployeeLike && !isAsstManager

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
              is3Col
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            <ProfileSummaryCard
              name={
                isSuperAdmin
                  ? "Dr. G. Krishna"
                  : isChairman
                  ? "Ramesh Kumar"
                  : isAsstManager
                  ? "Amitabh Sen"
                  : isTechAdmin
                  ? "Karthik Raman"
                  : isAccountantManager
                  ? "Suresh Iyer"
                  : isAccountantExecutive
                  ? "Vikram Sen"
                  : isFinanceExecutive
                  ? "Aakash Sharma"
                  : isFinance
                  ? "Rohan Verma"
                  : isEmployee
                  ? "John Doe"
                  : "Alexander"
              }
              employeeId={
                isSuperAdmin
                  ? "SA1001"
                  : isChairman
                  ? "CH1001"
                  : isAsstManager
                  ? "AM1001"
                  : isTechAdmin
                  ? "TECH1001"
                  : isAccountantManager
                  ? "ACC1002"
                  : isAccountantExecutive
                  ? "ACC2048"
                  : isFinanceExecutive
                  ? "FIN2045"
                  : isFinance
                  ? "FIN1004"
                  : isEmployee
                  ? "154380"
                  : "154356"
              }
            />
            <AttendanceDonutCard />
            {!is3Col && (
              <AttendanceRequestsCard
                newApprovalCount={3}
                pendingCount={2}
              />
            )}
            <PerformanceDonutCard
              score={95}
              subtitle="This Month (OCT)"
              className={is3Col ? "sm:col-span-2 lg:col-span-1" : undefined}
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
