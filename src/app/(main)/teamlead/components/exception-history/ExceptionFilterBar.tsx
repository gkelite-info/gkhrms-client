"use client"

import toast from "react-hot-toast"
import { MagnifyingGlass, X } from "phosphor-react"
import {
  ReusableDropdown,
  ReusableDateFilter,
} from "@/components/reusableComponents"

interface ExceptionFilterBarProps {
  searchQuery: string
  onSearchChange: (q: string) => void
  searchPlaceholder?: string
  issueFilter: string
  onIssueFilterChange: (issue: string) => void
  issueTypeOptions: string[]
  statusFilter?: string
  onStatusFilterChange?: (status: string) => void
  statusOptions?: string[]
  fromDate: Date | null
  onFromDateChange: (date: Date | null) => void
  toDate: Date | null
  onToDateChange: (date: Date | null) => void
  onClearAll?: () => void
}

export default function ExceptionFilterBar({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search...",
  issueFilter,
  onIssueFilterChange,
  issueTypeOptions,
  statusFilter = "All",
  onStatusFilterChange,
  statusOptions = ["All", "Approved", "Pending", "Rejected"],
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange,
  onClearAll,
}: ExceptionFilterBarProps) {
  const handleFromDateSelect = (val: any) => {
    let selected: Date | null = null
    if (val instanceof Date) selected = val
    else if (val && typeof val === "object" && val.startDate) selected = new Date(val.startDate)
    if (!selected || isNaN(selected.getTime())) return

    if (toDate && selected.getTime() > toDate.getTime()) {
      toast.error("From Date cannot be after To Date.", { position: "top-right" })
      onToDateChange(selected)
    }
    onFromDateChange(selected)
  }

  const handleToDateSelect = (val: any) => {
    let selected: Date | null = null
    if (val instanceof Date) selected = val
    else if (val && typeof val === "object" && val.startDate) selected = new Date(val.startDate)
    if (!selected || isNaN(selected.getTime())) return

    if (fromDate && selected.getTime() < fromDate.getTime()) {
      toast.error("To Date cannot be before From Date.", { position: "top-right" })
      return
    }
    onToDateChange(selected)
  }

  const handleClear = () => {
    onFromDateChange(null)
    onToDateChange(null)
    if (onClearAll) onClearAll()
  }

  const fromFilterVal = fromDate || ({ label: "From Date", mode: "date" } as any)
  const toFilterVal = toDate || ({ label: "To Date", mode: "date" } as any)
  const hasActiveFilters = Boolean(
    fromDate ||
      toDate ||
      searchQuery.trim() ||
      (issueFilter && issueFilter !== "All" && issueFilter !== "All Issue Types") ||
      (statusFilter && statusFilter !== "All" && statusFilter !== "All Statuses")
  )

  return (
    <div className="flex flex-col gap-3 w-full min-w-0 select-none">
      <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-2.5 sm:gap-3 w-full min-w-0">
        <div className="flex flex-col gap-1 w-full xl:max-w-xs 2xl:max-w-sm min-w-0">
          <span className="text-[11px] font-bold text-gray-700">Search</span>
          <div className="relative w-full">
            <MagnifyingGlass
              size={16}
              weight="bold"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full h-10 pl-10 pr-3.5 rounded-xl border border-gray-200 bg-white text-xs text-gray-700 placeholder:text-gray-400 hover:border-[#5B50EC] focus:border-[#5B50EC] outline-none transition-all shadow-2xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:flex xl:flex-row xl:items-end gap-2.5 sm:gap-3 w-full xl:w-auto min-w-0">
          <div className="flex flex-col gap-1 w-full xl:w-36 min-w-0">
            <span className="text-[11px] font-bold text-gray-700">Issue Type</span>
            <ReusableDropdown
              value={issueFilter}
              options={issueTypeOptions}
              onChange={(val) => onIssueFilterChange(String(val))}
              placeholder="All"
              align="full"
              className="w-full"
              buttonClassName="w-full h-10 px-3.5 rounded-xl border-gray-200 text-xs font-semibold flex items-center justify-between"
            />
          </div>

          <div className="flex flex-col gap-1 w-full xl:w-32 min-w-0">
            <span className="text-[11px] font-bold text-gray-700">Status</span>
            <ReusableDropdown
              value={statusFilter}
              options={statusOptions}
              onChange={(val) => onStatusFilterChange && onStatusFilterChange(String(val))}
              placeholder="All"
              align="full"
              className="w-full"
              buttonClassName="w-full h-10 px-3.5 rounded-xl border-gray-200 text-xs font-semibold flex items-center justify-between"
            />
          </div>

          <div className="flex flex-col gap-1 w-full xl:w-40 min-w-0">
            <span className="text-[11px] font-bold text-gray-700">From Date</span>
            <ReusableDateFilter
              value={fromFilterVal}
              onChange={handleFromDateSelect}
              modes={["date", "month", "year"]}
              title="Select From Date"
              showCaret={false}
              className="w-full"
              buttonClassName="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-800 hover:border-[#5B50EC] flex items-center justify-center gap-2 shadow-2xs"
            />
          </div>

          <div className="flex flex-col gap-1 w-full xl:w-40 min-w-0">
            <span className="text-[11px] font-bold text-gray-700">To Date</span>
            <ReusableDateFilter
              value={toFilterVal}
              onChange={handleToDateSelect}
              modes={["date", "month", "year"]}
              title="Select To Date"
              showCaret={false}
              className="w-full"
              buttonClassName="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-800 hover:border-[#5B50EC] flex items-center justify-center gap-2 shadow-2xs"
            />
          </div>

          {hasActiveFilters && (
            <div className="flex flex-col justify-end w-full sm:col-span-2 md:col-span-4 xl:w-auto sm:items-end">
              <button
                type="button"
                onClick={handleClear}
                className="w-full sm:w-auto xl:w-auto h-10 px-3.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50/50 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                title="Reset filters"
              >
                <X size={14} weight="bold" />
                <span>Reset</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
