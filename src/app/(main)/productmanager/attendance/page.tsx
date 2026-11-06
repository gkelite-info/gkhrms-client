"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import ProductManagerAttendanceTabs, {
  ProductManagerTabKey,
} from "../components/ProductManagerAttendanceTabs"
import ProjectsOverviewSection from "../components/projects/ProjectsOverviewSection"
import ProductTeamAttendanceSection from "../components/ProductTeamAttendanceSection"
import ProductManagerRequestsSection from "../components/ProductManagerRequestsSection"
import ProductManagerExceptionHistorySection from "../components/ProductManagerExceptionHistorySection"
import ProfileSummaryCard from "../../teamlead/components/ProfileSummaryCard"
import AttendanceDonutCard from "../../teamlead/components/AttendanceDonutCard"
import AttendanceRequestsCard from "../../teamlead/components/AttendanceRequestsCard"
import PerformanceDonutCard from "../../teamlead/components/PerformanceDonutCard"
import AttendanceStatsCard from "../../teamlead/components/AttendanceStatsCard"
import TimingsCard from "../../teamlead/components/TimingsCard"
import ActionsCard from "../../teamlead/components/ActionsCard"
import LeaveBalanceSection from "../../teamlead/components/LeaveBalanceSection"
import AttendanceLogSection from "../../teamlead/components/AttendanceLogSection"
import TeamLeadAttendanceFormContainer from "../../teamlead/components/attendance-forms/TeamLeadAttendanceFormContainer"

function ProductManagerAttendanceContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const projectParam = searchParams.get("project")

  if (tabParam === "apply-leave") {
    return <TeamLeadAttendanceFormContainer initialFormType="leave" />
  }

  if (tabParam === "request-wfh") {
    return <TeamLeadAttendanceFormContainer initialFormType="wfh" />
  }

  if (tabParam === "apply-exception" || tabParam === "regularize") {
    return <TeamLeadAttendanceFormContainer initialFormType="exception" />
  }

  const activeTab: ProductManagerTabKey =
    tabParam === "my-requests"
      ? "requests"
      : tabParam === "team-attendance" ||
        tabParam === "requests" ||
        tabParam === "exception-history"
      ? tabParam
      : "my-attendance"

  const handleTabChange = (newTab: ProductManagerTabKey) => {
    router.push(`/productmanager/attendance?tab=${newTab}`)
  }

  return (
    <div className="w-full flex-1 p-3 sm:p-4 md:p-6 pb-16 sm:pb-8 flex flex-col gap-4 sm:gap-5 max-w-[1600px] mx-auto animate-in fade-in duration-200 min-w-0">
      <ProductManagerAttendanceTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {activeTab === "team-attendance" ? (
        projectParam ? (
          <ProductTeamAttendanceSection
            selectedProjectId={projectParam}
            onBack={() => router.push("/productmanager/attendance?tab=team-attendance")}
          />
        ) : (
          <ProjectsOverviewSection
            onSelectProject={(projectId) =>
              router.push(`/productmanager/attendance?tab=team-attendance&project=${projectId}`)
            }
          />
        )
      ) : activeTab === "requests" ? (
        <ProductManagerRequestsSection />
      ) : activeTab === "exception-history" ? (
        <ProductManagerExceptionHistorySection />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ProfileSummaryCard name="Alexander" employeeId="154356" />
            <AttendanceDonutCard />
            <AttendanceRequestsCard newApprovalCount={3} pendingCount={2} />
            <PerformanceDonutCard score={95} subtitle="This Month (OCT)" />
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

export default function ProductManagerAttendancePage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[400px] flex items-center justify-center text-xs text-gray-400">
          Loading...
        </div>
      }
    >
      <ProductManagerAttendanceContent />
    </Suspense>
  )
}
