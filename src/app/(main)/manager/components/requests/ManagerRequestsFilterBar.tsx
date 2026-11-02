"use client"

import { MagnifyingGlass } from "phosphor-react"
import {
  ReusableDropdown,
  ReusableDateFilter,
  DateFilterValue,
} from "@/components/reusableComponents"

interface ManagerRequestsFilterBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  requestTypeFilter: string
  onRequestTypeChange: (type: string) => void
  statusFilter: string
  onStatusChange: (status: string) => void
  selectedRoles: string[]
  onRolesChange: (roles: string[]) => void
  roleOptions: string[]
  dateFilter: DateFilterValue
  onDateChange: (date: DateFilterValue) => void
  onResetFilters: () => void
}

export default function ManagerRequestsFilterBar({
  searchQuery,
  onSearchChange,
  requestTypeFilter,
  onRequestTypeChange,
  statusFilter,
  onStatusChange,
  selectedRoles,
  onRolesChange,
  roleOptions,
  dateFilter,
  onDateChange,
  onResetFilters,
}: ManagerRequestsFilterBarProps) {
  const typeOptions = [
    { label: "All Types", value: "All Types" },
    { label: "Leave", value: "Leave" },
    { label: "Work From Home", value: "Work From Home" },
    { label: "Half Day", value: "Half Day" },
  ]

  const statusOptions = [
    { label: "All Requests", value: "All Requests" },
    { label: "Pending", value: "Pending" },
    { label: "Approved", value: "Approved" },
    { label: "Rejected", value: "Rejected" },
    { label: "Leave Requests", value: "Leave" },
    { label: "Work From Home", value: "Work From Home" },
  ]

  return (
    <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 min-w-0">
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 flex-1 min-w-0">
        <div className="relative w-full sm:w-auto sm:flex-1 sm:min-w-[180px] sm:max-w-xs">
          <MagnifyingGlass
            size={16}
            weight="bold"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search employee name, ID..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-10 pl-9 pr-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#5B50EC] focus:ring-1 focus:ring-[#5B50EC] transition-all bg-white"
          />
        </div>

        <ReusableDropdown
          value={requestTypeFilter}
          options={typeOptions}
          onChange={(val) => onRequestTypeChange(String(val))}
          align="left"
          placeholder="Request Type"
          className="w-full sm:w-auto"
          buttonClassName="w-full sm:w-auto h-10 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-700 bg-white hover:bg-gray-50/50 flex items-center justify-between gap-2"
        />

        <ReusableDropdown
          value={statusFilter}
          options={statusOptions}
          onChange={(val) => onStatusChange(String(val))}
          align="left"
          placeholder="Status"
          className="w-full sm:w-auto"
          buttonClassName="w-full sm:w-auto h-10 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-700 bg-white hover:bg-gray-50/50 flex items-center justify-between gap-2"
        />

        <ReusableDropdown
          value={selectedRoles}
          options={roleOptions}
          onChange={(val) => onRolesChange(val)}
          selectionType="checkbox"
          multiple={true}
          placeholder="All Roles"
          className="w-full sm:w-auto"
          buttonClassName="w-full sm:w-auto h-10 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-700 bg-white hover:bg-gray-50/50 flex items-center justify-between gap-2"
          menuClassName="w-56"
        />

        <ReusableDateFilter
          value={dateFilter}
          onChange={onDateChange}
          modes={["date", "month", "year"]}
          title="Filter Request Date"
          className="w-full sm:w-auto"
          buttonClassName="w-full sm:w-auto h-10 px-3.5 flex items-center justify-between gap-2 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 hover:border-[#5B50EC] hover:bg-gray-50/50 transition-all shadow-xs cursor-pointer select-none"
        />
      </div>

      <div className="flex items-center justify-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-50">
        <button
          type="button"
          onClick={onResetFilters}
          className="h-10 px-3 flex items-center text-xs sm:text-sm font-semibold text-[#5B50EC] hover:text-[#4338CA] hover:underline transition-all cursor-pointer"
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}
