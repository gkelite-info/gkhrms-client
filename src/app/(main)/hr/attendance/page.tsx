"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { User } from "phosphor-react"
import { DateFilterValue } from "@/components/reusableComponents"
import HrAttendanceHeader from "../attendance-leaves/components/HrAttendanceHeader"
import HrAttendanceTabs, { HrAttendanceTab } from "../attendance-leaves/components/HrAttendanceTabs"
import HrAttendanceStatsCards from "../attendance-leaves/components/HrAttendanceStatsCards"
import HrDepartmentOverviewCards from "../attendance-leaves/components/HrDepartmentOverviewCards"
import HrAttendanceTableSection from "../attendance-leaves/components/HrAttendanceTableSection"
import HrEmployeeAttendanceModal from "../attendance-leaves/components/HrEmployeeAttendanceModal"
import {
  HR_ATTENDANCE_RECORDS,
  HrAttendanceRecord,
} from "../attendance-leaves/data/hrAttendanceData"
import HrAttendanceRequestsSection from "../attendance-leaves/components/requests/HrAttendanceRequestsSection"
import HrExceptionHistorySection from "../attendance-leaves/components/exceptions/HrExceptionHistorySection"
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

function HrAttendanceContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab") as HrAttendanceTab | null

  const validTabs: HrAttendanceTab[] = [
    "my-attendance",
    "organization-attendance",
    "attendance-requests",
    "exception-history",
  ]

  const activeTab: HrAttendanceTab =
    tabParam === "my-requests"
      ? "attendance-requests"
      : tabParam && validTabs.includes(tabParam)
      ? tabParam
      : "my-attendance"

  const [fromDate, setFromDate] = useState<DateFilterValue>(new Date(2025, 7, 26))
  const [toDate, setToDate] = useState<DateFilterValue>(new Date(2025, 7, 28))
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("All")
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>("Technology")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [selectedModalRecord, setSelectedModalRecord] = useState<HrAttendanceRecord | null>(null)

  const filteredRecords = useMemo(() => {
    return HR_ATTENDANCE_RECORDS.filter((rec) => {
      if (selectedDepartment && rec.department.toLowerCase() !== selectedDepartment.toLowerCase()) {
        return false
      }

      if (roleFilter !== "All" && rec.role.toLowerCase() !== roleFilter.toLowerCase()) {
        return false
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchesName = rec.name.toLowerCase().includes(q)
        const matchesId = rec.employeeId.toLowerCase().includes(q)
        const matchesDept = rec.department.toLowerCase().includes(q)
        if (!matchesName && !matchesId && !matchesDept) {
          return false
        }
      }

      return true
    })
  }, [selectedDepartment, roleFilter, searchQuery])

  const totalEmployeesCount = 2486
  const totalPages = Math.ceil(
    (searchQuery || roleFilter !== "All" || selectedDepartment
      ? filteredRecords.length
      : totalEmployeesCount) / pageSize
  )

  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredRecords.slice(start, start + pageSize)
  }, [filteredRecords, currentPage, pageSize])

  const handleTabChange = (tab: HrAttendanceTab) => {
    router.push(`/hr/attendance?tab=${tab}`)
  }

  const handleSelectDepartment = (deptName: string) => {
    setSelectedDepartment(deptName)
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setSearchQuery("")
    setRoleFilter("All")
    setSelectedDepartment("Technology")
    setFromDate(new Date(2025, 7, 26))
    setToDate(new Date(2025, 7, 28))
    setCurrentPage(1)
  }

  if (tabParam === "apply-leave") {
    return <TeamLeadAttendanceFormContainer initialFormType="leave" />
  }

  if (tabParam === "request-wfh") {
    return <TeamLeadAttendanceFormContainer initialFormType="wfh" />
  }

  return (
    <div className="w-full flex-1 p-3 sm:p-4 md:p-6 pb-16 sm:pb-8 flex flex-col gap-4 sm:gap-5 max-w-[1600px] mx-auto animate-in fade-in duration-200 min-w-0">
      <HrAttendanceTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {activeTab === "my-attendance" && (
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
            <ProfileSummaryCard name="Sarah Jenkins" employeeId="HR001" />
            <AttendanceDonutCard />
            <AttendanceRequestsCard
              newApprovalCount={6}
              pendingCount={3}
              href="/hr/attendance?tab=attendance-requests"
              newApprovalHref="/hr/attendance?tab=attendance-requests"
              pendingHref="/hr/attendance?tab=attendance-requests"
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
      )}

      {activeTab === "organization-attendance" && (
        <div className="flex flex-col gap-4 sm:gap-5">
          <HrAttendanceHeader />

          <HrAttendanceStatsCards />

          <HrDepartmentOverviewCards
            selectedDepartment={selectedDepartment}
            onSelectDepartment={handleSelectDepartment}
          />

          <HrAttendanceTableSection
            records={paginatedRecords}
            totalItems={
              searchQuery || roleFilter !== "All" || selectedDepartment
                ? filteredRecords.length
                : totalEmployeesCount
            }
            currentPage={currentPage}
            pageSize={pageSize}
            totalPages={totalPages}
            searchQuery={searchQuery}
            roleFilter={roleFilter}
            fromDate={fromDate}
            toDate={toDate}
            onSearchChange={(q) => {
              setSearchQuery(q)
              setCurrentPage(1)
            }}
            onRoleFilterChange={(r) => {
              setRoleFilter(r)
              setCurrentPage(1)
            }}
            onFromDateChange={setFromDate}
            onToDateChange={setToDate}
            onResetFilters={handleResetFilters}
            onPageChange={setCurrentPage}
            onPageSizeChange={(sz) => {
              setPageSize(sz)
              setCurrentPage(1)
            }}
            onViewRecord={setSelectedModalRecord}
          />
        </div>
      )}

      {activeTab === "attendance-requests" && (
        <HrAttendanceRequestsSection />
      )}

      {activeTab === "exception-history" && (
        <HrExceptionHistorySection />
      )}

      <HrEmployeeAttendanceModal
        isOpen={Boolean(selectedModalRecord)}
        onClose={() => setSelectedModalRecord(null)}
        record={selectedModalRecord}
      />
    </div>
  )
}

export default function HrAttendancePage() {
  return (
    <Suspense
      fallback={
        <div className="w-full flex-1 p-6 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#5B50EC] border-t-transparent animate-spin" />
        </div>
      }
    >
      <HrAttendanceContent />
    </Suspense>
  )
}

