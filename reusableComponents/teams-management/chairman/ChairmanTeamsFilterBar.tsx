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
  showDepartmentFilter?: boolean
  departmentOptions?: string[]
}

const DEFAULT_DEPARTMENT_OPTIONS = [
  "All Departments",
  "Technology",
  "Operations",
  "Projects",
  "Product",
  "HR & People",
  "Finance",
  "IT Infrastructure",
  "Systems & Operations",
  "Network & Security",
  "Platform & Tools",
  "IT Support",
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
  showDepartmentFilter = true,
  departmentOptions = DEFAULT_DEPARTMENT_OPTIONS,
}: ChairmanTeamsFilterBarProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100/80 shadow-2xs p-3 sm:p-4 flex flex-col lg:flex-row lg:items-end justify-between gap-3">
      <div className="relative w-full lg:w-80 shrink-0">
        <MagnifyingGlass
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or employee ID..."
          className="w-full pl-10 pr-9 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#5046E5] focus:ring-1 focus:ring-[#5046E5] transition-all bg-white"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-end gap-2 sm:gap-3 w-full lg:w-auto">
        {showDepartmentFilter && (
          <div className="flex flex-col gap-1 w-full sm:w-auto">
            <span className="text-[11px] sm:text-xs font-medium text-gray-500">
              Department / Function
            </span>
            <ReusableDropdown
              value={selectedDepartment}
              options={departmentOptions}
              onChange={(val) => onDepartmentChange(String(val))}
              placeholder="All Departments"
              className="w-full sm:w-auto min-w-[150px]"
              buttonClassName="py-2 px-3 text-xs sm:text-sm rounded-xl border-gray-200 whitespace-nowrap bg-white"
              align="left"
            />
          </div>
        )}

        <div className="flex flex-col gap-1 w-full sm:w-auto">
          <span className="text-[11px] sm:text-xs font-medium text-gray-500">
            Location
          </span>
          <ReusableDropdown
            value={selectedLocation}
            options={LOCATION_OPTIONS}
            onChange={(val) => onLocationChange(String(val))}
            placeholder="All Locations"
            className="w-full sm:w-auto min-w-[130px]"
            buttonClassName="py-2 px-3 text-xs sm:text-sm rounded-xl border-gray-200 whitespace-nowrap bg-white"
            align="left"
          />
        </div>

        <div className="flex flex-col gap-1 w-full sm:w-auto">
          <span className="text-[11px] sm:text-xs font-medium text-gray-500">
            Status
          </span>
          <ReusableDropdown
            value={selectedStatus}
            options={STATUS_OPTIONS}
            onChange={(val) => onStatusChange(String(val))}
            placeholder="All Status"
            className="w-full sm:w-auto min-w-[120px]"
            buttonClassName="py-2 px-3 text-xs sm:text-sm rounded-xl border-gray-200 whitespace-nowrap bg-white"
            align="left"
          />
        </div>

        <div className="flex items-center gap-3 ml-auto sm:ml-0 pt-1 sm:pt-0 whitespace-nowrap">
          <button
            type="button"
            onClick={onReset}
            className="text-xs sm:text-sm font-semibold text-[#5046E5] hover:text-[#4338CA] hover:underline px-2 py-2 cursor-pointer transition-colors whitespace-nowrap"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={onApply}
            className="inline-flex items-center justify-center px-6 py-2 rounded-xl bg-[#5046E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer active:scale-98 whitespace-nowrap"
          >
            <span>Apply</span>
          </button>
        </div>
      </div>
    </div>
  )
}
