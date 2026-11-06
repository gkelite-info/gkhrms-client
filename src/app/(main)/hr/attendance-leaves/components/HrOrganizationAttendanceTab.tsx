"use client"

import { DateFilterValue } from "@/components/reusableComponents"
import HrAttendanceHeader from "./HrAttendanceHeader"
import HrAttendanceStatsCards from "./HrAttendanceStatsCards"
import HrDepartmentOverviewCards from "./HrDepartmentOverviewCards"
import HrAttendanceTableSection from "./HrAttendanceTableSection"
import {
  HR_ATTENDANCE_STATS,
  HR_ATTENDANCE_STATS_FOR_HR,
  HrAttendanceRecord,
} from "../data/hrAttendanceData"

interface HrOrganizationAttendanceTabProps {
  isEffectiveHrManager: boolean
  selectedDepartment: string | null
  onSelectDepartment: (deptName: string) => void
  records: HrAttendanceRecord[]
  filteredCount: number
  totalEmployeesCount: number
  currentPage: number
  pageSize: number
  totalPages: number
  searchQuery: string
  roleFilter: string
  fromDate: DateFilterValue
  toDate: DateFilterValue
  onSearchChange: (query: string) => void
  onRoleFilterChange: (role: string) => void
  onFromDateChange: (date: DateFilterValue) => void
  onToDateChange: (date: DateFilterValue) => void
  onResetFilters: () => void
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  onViewRecord: (record: HrAttendanceRecord) => void
}

export default function HrOrganizationAttendanceTab({
  isEffectiveHrManager,
  selectedDepartment,
  onSelectDepartment,
  records,
  filteredCount,
  totalEmployeesCount,
  currentPage,
  pageSize,
  totalPages,
  searchQuery,
  roleFilter,
  fromDate,
  toDate,
  onSearchChange,
  onRoleFilterChange,
  onFromDateChange,
  onToDateChange,
  onResetFilters,
  onPageChange,
  onPageSizeChange,
  onViewRecord,
}: HrOrganizationAttendanceTabProps) {
  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <HrAttendanceHeader />

      <HrAttendanceStatsCards
        stats={isEffectiveHrManager ? HR_ATTENDANCE_STATS : HR_ATTENDANCE_STATS_FOR_HR}
      />

      <HrDepartmentOverviewCards
        selectedDepartment={selectedDepartment}
        onSelectDepartment={onSelectDepartment}
        hideHrDepartment={!isEffectiveHrManager}
      />

      <HrAttendanceTableSection
        records={records}
        totalItems={
          searchQuery || roleFilter !== "All" || selectedDepartment
            ? filteredCount
            : totalEmployeesCount
        }
        currentPage={currentPage}
        pageSize={pageSize}
        totalPages={totalPages}
        searchQuery={searchQuery}
        roleFilter={roleFilter}
        fromDate={fromDate}
        toDate={toDate}
        showHrRole={isEffectiveHrManager}
        onSearchChange={onSearchChange}
        onRoleFilterChange={onRoleFilterChange}
        onFromDateChange={onFromDateChange}
        onToDateChange={onToDateChange}
        onResetFilters={onResetFilters}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onViewRecord={onViewRecord}
      />
    </div>
  )
}

