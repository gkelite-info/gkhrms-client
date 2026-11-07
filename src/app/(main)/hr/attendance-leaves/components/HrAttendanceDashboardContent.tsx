"use client"

import { useState, useMemo } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { DateFilterValue } from "@/components/reusableComponents"
import HrAttendanceTabs, { HrAttendanceTab } from "./HrAttendanceTabs"
import HrOrganizationAttendanceTab from "./HrOrganizationAttendanceTab"
import HrMyAttendanceTab from "./HrMyAttendanceTab"
import HrAttendanceRequestsSection from "./requests/HrAttendanceRequestsSection"
import HrExceptionHistoryContainer from "./exceptions/HrExceptionHistoryContainer"
import TeamLeadAttendanceFormContainer from "@/app/(main)/teamlead/components/attendance-forms/TeamLeadAttendanceFormContainer"
import {
  HR_ATTENDANCE_RECORDS,
  HrAttendanceRecord,
} from "../data/hrAttendanceData"

interface HrAttendanceDashboardContentProps {
  isHrManager?: boolean
}

export default function HrAttendanceDashboardContent({
  isHrManager = false,
}: HrAttendanceDashboardContentProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")

  const isEffectiveHrManager = isHrManager || Boolean(pathname?.startsWith("/hrmanager"))
  const basePath = isEffectiveHrManager ? "/hrmanager/attendance" : "/hr/attendance"

  const validTabs: string[] = [
    "my-attendance", "organization-attendance", "attendance-requests", "exception-history"
  ]

  const activeTab: HrAttendanceTab =
    tabParam === "my-requests"
      ? "attendance-requests"
      : tabParam && validTabs.includes(tabParam)
      ? (tabParam as HrAttendanceTab)
      : "my-attendance"

  const [fromDate, setFromDate] = useState<DateFilterValue>(new Date(2025, 7, 26))
  const [toDate, setToDate] = useState<DateFilterValue>(new Date(2025, 7, 28))
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("All")
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>("Technology")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)

  const availableRecords = useMemo(() => {
    if (isEffectiveHrManager) {
      return HR_ATTENDANCE_RECORDS
    }
    return HR_ATTENDANCE_RECORDS.filter(
      (rec) => rec.department !== "Human Resources" && rec.role !== "HR"
    )
  }, [isEffectiveHrManager])

  const filteredRecords = useMemo(() => {
    return availableRecords.filter((rec) => {
      if (
        selectedDepartment &&
        rec.department.toLowerCase() !== selectedDepartment.toLowerCase()
      ) {
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
  }, [availableRecords, selectedDepartment, roleFilter, searchQuery])

  const totalEmployeesCount = isEffectiveHrManager ? 2486 : 2256
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
    router.push(`${basePath}?tab=${tab}`)
  }

  const handleSelectDepartment = (deptName: string) => {
    setSelectedDepartment(deptName)
    setCurrentPage(1)
  }

  const handleViewRecord = (record: HrAttendanceRecord) => {
    const targetRoute = isEffectiveHrManager
      ? `/hrmanager/member/${record.employeeId}`
      : `/hr/member/${record.employeeId}`
    router.push(targetRoute)
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

  if (tabParam === "apply-exception" || tabParam === "regularize") {
    return <TeamLeadAttendanceFormContainer initialFormType="exception" />
  }

  return (
    <div className="w-full flex-1 p-3 sm:p-4 md:p-6 pb-16 sm:pb-8 flex flex-col gap-4 sm:gap-5 max-w-[1600px] mx-auto animate-in fade-in duration-200 min-w-0">
      <HrAttendanceTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        basePath={basePath}
      />

      {activeTab === "my-attendance" && (
        <HrMyAttendanceTab
          basePath={basePath}
          userName={isEffectiveHrManager ? "Priya Mehta" : "Sarah Jenkins"}
          employeeId={isEffectiveHrManager ? "HRM001" : "HR001"}
        />
      )}

      {activeTab === "organization-attendance" && (
        <HrOrganizationAttendanceTab
          isEffectiveHrManager={isEffectiveHrManager}
          selectedDepartment={selectedDepartment}
          onSelectDepartment={handleSelectDepartment}
          records={paginatedRecords}
          filteredCount={filteredRecords.length}
          totalEmployeesCount={totalEmployeesCount}
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
          onViewRecord={handleViewRecord}
        />
      )}

      {activeTab === "attendance-requests" && <HrAttendanceRequestsSection />}

      {activeTab === "exception-history" && (
        <HrExceptionHistoryContainer hideHrDepartment={!isEffectiveHrManager} />
      )}


    </div>
  )
}
