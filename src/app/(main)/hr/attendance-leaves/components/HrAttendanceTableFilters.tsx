"use client"

import { useMemo } from "react"
import { MagnifyingGlass } from "phosphor-react"
import { ReusableDropdown, ReusableDateFilter, DateFilterValue } from "@/components/reusableComponents"

interface HrAttendanceTableFiltersProps {
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
}

export default function HrAttendanceTableFilters({
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
}: HrAttendanceTableFiltersProps) {
  const roleOptions = useMemo(() => {
    const base = [
      { label: "All Roles", value: "All" },
      { label: "Team Lead", value: "Team Lead" },
      { label: "Manager", value: "Manager" },
      { label: "Employee", value: "Employee" },
    ]
    if (showHrRole) base.push({ label: "HR", value: "HR" })
    return base
  }, [showHrRole])

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <div className="relative w-full sm:w-auto sm:flex-1 sm:min-w-[240px] sm:max-w-sm">
          <MagnifyingGlass size={16} weight="bold" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, employee ID, department..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-10 pl-9 pr-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#5B50EC] focus:ring-1 focus:ring-[#5B50EC] transition-all bg-white"
          />
        </div>
        <ReusableDateFilter value={fromDate} onChange={onFromDateChange} modes={["date", "month", "year"]} title="Select From Date" className="w-full sm:w-auto" buttonClassName="w-full sm:w-auto h-10 px-3.5 flex items-center justify-between gap-2 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 hover:border-[#5B50EC] hover:bg-gray-50/50 transition-all shadow-xs cursor-pointer select-none" />
        <ReusableDateFilter value={toDate} onChange={onToDateChange} modes={["date", "month", "year"]} title="Select To Date" className="w-full sm:w-auto" buttonClassName="w-full sm:w-auto h-10 px-3.5 flex items-center justify-between gap-2 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 hover:border-[#5B50EC] hover:bg-gray-50/50 transition-all shadow-xs cursor-pointer select-none" />
        <div className="w-full sm:w-auto">
          <ReusableDropdown value={roleFilter} options={roleOptions} onChange={(val) => onRoleFilterChange(String(val))} placeholder="Select Role" align="left" buttonClassName="w-full sm:w-auto h-10 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-700 bg-white hover:bg-gray-50/50 flex items-center justify-between gap-2" />
        </div>
      </div>
      <button type="button" onClick={onResetFilters} className="h-10 px-3 flex items-center text-xs font-semibold text-[#5B50EC] hover:underline cursor-pointer transition-colors self-end lg:self-auto">Reset Filters</button>
    </div>
  )
}

