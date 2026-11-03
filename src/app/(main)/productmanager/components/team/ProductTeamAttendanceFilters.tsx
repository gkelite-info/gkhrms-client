"use client"

import React from "react"
import { MagnifyingGlass } from "phosphor-react"
import {
  ReusableDropdown,
  DropdownOption,
  ReusableDateFilter,
  DateFilterValue,
} from "@/components/reusableComponents"

interface ProductTeamAttendanceFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  roleFilter: string
  onRoleChange: (role: string) => void
  statusFilter: string
  onStatusChange: (status: string) => void
  selectedDate: DateFilterValue
  onDateChange: (date: DateFilterValue) => void
}

const roleOptions: DropdownOption[] = [
  { label: "Role: All", value: "All" },
  { label: "Manager", value: "Manager" },
  { label: "Team Lead", value: "Team Lead" },
  { label: "Employee", value: "Employee" },
]

const statusOptions: DropdownOption[] = [
  { label: "Status: All", value: "All" },
  { label: "Present", value: "Present" },
  { label: "WFH", value: "WFH" },
  { label: "On Leave", value: "On Leave" },
  { label: "Absent", value: "Absent" },
]

export default function ProductTeamAttendanceFilters({
  searchQuery,
  onSearchChange,
  roleFilter,
  onRoleChange,
  statusFilter,
  onStatusChange,
  selectedDate,
  onDateChange,
}: ProductTeamAttendanceFiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 min-w-0">
      <div className="relative flex-1 min-w-0 max-w-lg">
        <MagnifyingGlass
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by employee name or ID..."
          className="w-full h-10 pl-10 pr-4 text-xs sm:text-sm rounded-xl border border-gray-200 bg-white placeholder-gray-400 text-gray-800 focus:outline-none focus:border-[#5B50EC] transition-colors"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
        <ReusableDropdown
          value={roleFilter}
          options={roleOptions}
          onChange={(val) => onRoleChange(String(val))}
          align="left"
          className="w-36"
          buttonClassName="w-full h-10 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center justify-between"
        />

        <ReusableDropdown
          value={statusFilter}
          options={statusOptions}
          onChange={(val) => onStatusChange(String(val))}
          align="left"
          className="w-36"
          buttonClassName="w-full h-10 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center justify-between"
        />

        <ReusableDateFilter
          value={selectedDate}
          onChange={onDateChange}
          modes={["date", "month", "year"]}
          title="Select Date"
          showCaret={false}
          className="w-44"
          buttonClassName="w-full h-10 px-3 flex items-center gap-2 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 hover:border-[#5B50EC] hover:bg-gray-50 transition-all shadow-2xs cursor-pointer select-none"
        />
      </div>
    </div>
  )
}

