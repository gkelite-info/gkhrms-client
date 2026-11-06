"use client"

import { useMemo } from "react"
import { MagnifyingGlass } from "phosphor-react"
import {
  ReusableTable,
  ReusablePagination,
  ReusableDropdown,
  ReusableDateFilter,
  DateFilterValue,
} from "@/components/reusableComponents"
import { HrAttendanceRecord } from "../data/hrAttendanceData"
import { createHrAttendanceColumns } from "./hrAttendanceColumns"

interface HrAttendanceTableSectionProps {
  records: HrAttendanceRecord[]
  totalItems: number
  currentPage: number
  pageSize: number
  totalPages: number
  searchQuery: string
  roleFilter: string
  fromDate: DateFilterValue
  toDate: DateFilterValue
  showHrRole?: boolean
  onSearchChange: (query: string) => void
  onRoleFilterChange: (role: string) => void
  onFromDateChange: (date: DateFilterValue) => void
  onToDateChange: (date: DateFilterValue) => void
  onResetFilters: () => void
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  onViewRecord: (record: HrAttendanceRecord) => void
}

export default function HrAttendanceTableSection({
  records,
  totalItems,
  currentPage,
  pageSize,
  totalPages,
  searchQuery,
  roleFilter,
  fromDate,
  toDate,
  showHrRole = false,
  onSearchChange,
  onRoleFilterChange,
  onFromDateChange,
  onToDateChange,
  onResetFilters,
  onPageChange,
  onPageSizeChange,
  onViewRecord,
}: HrAttendanceTableSectionProps) {
  const roleOptions = useMemo(() => {
    const base = [
      { label: "All Roles", value: "All" },
      { label: "Team Lead", value: "Team Lead" },
      { label: "Manager", value: "Manager" },
      { label: "Employee", value: "Employee" },
    ]
    if (showHrRole) {
      base.push({ label: "HR", value: "HR" })
    }
    return base
  }, [showHrRole])

  const columns = useMemo(
    () => createHrAttendanceColumns(onViewRecord),
    [onViewRecord]
  )

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <div className="relative w-full sm:w-auto sm:flex-1 sm:min-w-[240px] sm:max-w-sm">
            <MagnifyingGlass
              size={16}
              weight="bold"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search by name, employee ID, department..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-10 pl-9 pr-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#5B50EC] focus:ring-1 focus:ring-[#5B50EC] transition-all bg-white"
            />
          </div>

          <div className="w-full sm:w-auto">
            <ReusableDateFilter
              value={fromDate}
              onChange={onFromDateChange}
              modes={["date", "month", "year"]}
              title="Select From Date"
              className="w-full sm:w-auto"
              buttonClassName="w-full sm:w-auto h-10 px-3.5 flex items-center justify-between gap-2 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 hover:border-[#5B50EC] hover:bg-gray-50/50 transition-all shadow-xs cursor-pointer select-none"
            />
          </div>

          <div className="w-full sm:w-auto">
            <ReusableDateFilter
              value={toDate}
              onChange={onToDateChange}
              modes={["date", "month", "year"]}
              title="Select To Date"
              className="w-full sm:w-auto"
              buttonClassName="w-full sm:w-auto h-10 px-3.5 flex items-center justify-between gap-2 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 hover:border-[#5B50EC] hover:bg-gray-50/50 transition-all shadow-xs cursor-pointer select-none"
            />
          </div>

          <div className="w-full sm:w-auto">
            <ReusableDropdown
              value={roleFilter}
              options={roleOptions}
              onChange={(val) => onRoleFilterChange(String(val))}
              placeholder="Select Role"
              align="left"
              buttonClassName="w-full sm:w-auto h-10 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-700 bg-white hover:bg-gray-50/50 flex items-center justify-between gap-2"
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={onResetFilters}
            className="h-10 px-3 flex items-center text-xs font-semibold text-[#5B50EC] hover:underline cursor-pointer transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto custom-scrollbar">
        <ReusableTable
          columns={columns}
          data={records}
          headerBgColor="transparent"
          headerTextColor="#9CA3AF"
          headerRounded="rounded-none"
          rowHover={true}
          emptyMessage="No employees found matching the filters."
        />
      </div>

      <ReusablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  )
}
