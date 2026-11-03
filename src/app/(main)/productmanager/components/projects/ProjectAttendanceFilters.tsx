"use client"

import React from "react"
import { MagnifyingGlass } from "phosphor-react"
import {
  ReusableDropdown,
  DropdownOption,
  ReusableDateFilter,
  DateFilterValue,
} from "@/components/reusableComponents"

interface ProjectAttendanceFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  statusFilter: string
  onStatusChange: (status: string) => void
  selectedDate: DateFilterValue
  onDateChange: (date: DateFilterValue) => void
}

const statusOptions: DropdownOption[] = [
  { label: "All Projects", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
  { label: "Completed", value: "Completed" },
  { label: "On Hold", value: "On Hold" },
]

export default function ProjectAttendanceFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  selectedDate,
  onDateChange,
}: ProjectAttendanceFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 w-full min-w-0">
      <div className="relative flex-1 min-w-0 max-w-md">
        <MagnifyingGlass
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search project by name or manager..."
          className="w-full h-10 pl-10 pr-4 text-xs sm:text-sm rounded-xl border border-gray-200 bg-white placeholder-gray-400 text-gray-800 focus:outline-none focus:border-[#5B50EC] transition-colors shadow-2xs"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-medium">Status</span>
          <ReusableDropdown
            value={statusFilter}
            options={statusOptions}
            onChange={(val) => onStatusChange(String(val))}
            align="left"
            className="w-36"
            buttonClassName="w-full h-10 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold text-gray-800 bg-white hover:bg-gray-50 flex items-center justify-between shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-medium">Date</span>
          <ReusableDateFilter
            value={selectedDate}
            onChange={onDateChange}
            modes={["date", "month", "year"]}
            title="Select Date"
            showCaret={true}
            className="w-48"
            buttonClassName="w-full h-10 px-3 flex items-center gap-2 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm font-semibold text-gray-800 hover:border-[#5B50EC] hover:bg-gray-50 transition-all shadow-2xs cursor-pointer select-none"
          />
        </div>
      </div>
    </div>
  )
}

