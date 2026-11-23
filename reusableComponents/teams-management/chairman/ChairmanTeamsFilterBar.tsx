"use client"

import React from "react"
import { MagnifyingGlass, X } from "phosphor-react"
import ReusableDropdown from "../../ReusableDropdown"

interface ChairmanTeamsFilterBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedDepartment: string
  onDepartmentChange: (dep: string) => void
  selectedLocation: string
  onLocationChange: (loc: string) => void
  selectedStatus: string
  onStatusChange: (status: string) => void
  onReset: () => void
  onApply: () => void
}

const DEPARTMENT_OPTIONS = [
  "All Departments",
  "Technology",
  "Operations",
  "Projects",
  "Product",
  "HR & People",
  "Finance",
]

const LOCATION_OPTIONS = [
  "All Locations",
  "Bangalore",
  "Hyderabad",
  "Mumbai",
  "Delhi",
]

const STATUS_OPTIONS = ["All Status", "Active", "Inactive"]

export default function ChairmanTeamsFilterBar({
  searchQuery,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  selectedLocation,
  onLocationChange,
  selectedStatus,
  onStatusChange,
  onReset,
  onApply,
}: ChairmanTeamsFilterBarProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-3 sm:p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
      <div className="relative w-full lg:max-w-xs shrink-0">
        <MagnifyingGlass
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or employee ID..."
          className="w-full pl-10 pr-9 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#5B50EC] focus:ring-1 focus:ring-[#5B50EC] transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto">
        <ReusableDropdown
          value={selectedDepartment}
          options={DEPARTMENT_OPTIONS}
          onChange={(val) => onDepartmentChange(String(val))}
          placeholder="All Departments"
          className="w-full sm:w-auto min-w-[140px]"
          buttonClassName="py-2 px-3 text-xs sm:text-sm rounded-xl border-gray-200"
          align="left"
        />

        <ReusableDropdown
          value={selectedLocation}
          options={LOCATION_OPTIONS}
          onChange={(val) => onLocationChange(String(val))}
          placeholder="All Locations"
          className="w-full sm:w-auto min-w-[130px]"
          buttonClassName="py-2 px-3 text-xs sm:text-sm rounded-xl border-gray-200"
          align="left"
        />

        <ReusableDropdown
          value={selectedStatus}
          options={STATUS_OPTIONS}
          onChange={(val) => onStatusChange(String(val))}
          placeholder="All Status"
          className="w-full sm:w-auto min-w-[120px]"
          buttonClassName="py-2 px-3 text-xs sm:text-sm rounded-xl border-gray-200"
          align="left"
        />

        <div className="flex items-center gap-3 ml-auto sm:ml-0 pt-1 sm:pt-0">
          <button
            type="button"
            onClick={onReset}
            className="text-xs sm:text-sm font-semibold text-[#5B50EC] hover:text-[#4E44D6] hover:underline px-2 py-2 cursor-pointer transition-colors"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={onApply}
            className="px-5 py-2 rounded-xl bg-[#5B50EC] hover:bg-[#4E44D6] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer active:scale-98"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
