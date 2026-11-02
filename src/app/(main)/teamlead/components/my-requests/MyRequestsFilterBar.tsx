"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import toast from "react-hot-toast"
import { MagnifyingGlass, X } from "phosphor-react"
import {
  ReusableDropdown,
  ReusableDateFilter,
} from "@/components/reusableComponents"
import { MyFilterType } from "./types"

const statusOptions = ["All Statuses", "Pending", "Approved", "Rejected"]

interface MyRequestsFilterBarProps {
  filterType: MyFilterType
  onFilterTypeChange: (type: MyFilterType) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  statusFilter: string
  onStatusChange: (status: string) => void
  fromDate: Date | null
  onFromDateChange: (date: Date | null) => void
  toDate: Date | null
  onToDateChange: (date: Date | null) => void
}

export default function MyRequestsFilterBar({
  filterType,
  onFilterTypeChange,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange,
}: MyRequestsFilterBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const filterTabs: MyFilterType[] = ["All", "Leave", "Work From Home"]

  const handleTabClick = (tab: MyFilterType) => {
    onFilterTypeChange(tab)
    const typeQuery =
      tab === "Leave" ? "leave" : tab === "Work From Home" ? "wfh" : "all"
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    params.set("type", typeQuery);
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    })
  }

  const handleFromDateSelect = (val: any) => {
    let selected: Date | null = null
    if (val instanceof Date) {
      selected = val
    } else if (val && typeof val === "object" && val.startDate) {
      selected = new Date(val.startDate)
    }
    if (!selected || isNaN(selected.getTime())) return

    if (toDate && selected.getTime() > toDate.getTime()) {
      toast.error("From Date cannot be after To Date.", { position: "top-right" })
      onToDateChange(selected)
    }
    onFromDateChange(selected)
  }

  const handleToDateSelect = (val: any) => {
    let selected: Date | null = null
    if (val instanceof Date) {
      selected = val
    } else if (val && typeof val === "object" && val.startDate) {
      selected = new Date(val.startDate)
    }
    if (!selected || isNaN(selected.getTime())) return

    if (fromDate && selected.getTime() < fromDate.getTime()) {
      toast.error("To Date cannot be before From Date.", { position: "top-right" })
      return
    }
    onToDateChange(selected)
  }

  const handleClearDates = () => {
    onFromDateChange(null)
    onToDateChange(null)
  }

  const fromFilterValue = fromDate
    ? fromDate
    : ({ label: "From Date", mode: "date" } as any)

  const toFilterValue = toDate
    ? toDate
    : ({ label: "To Date", mode: "date" } as any)

  return (
    <div className="flex flex-col gap-4 w-full min-w-0">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-0.5">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => handleTabClick(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap ${
              filterType === tab
                ? "bg-[#EEF2FF] text-[#5B50EC] shadow-2xs font-bold"
                : "bg-white text-gray-600 hover:text-[#5B50EC] hover:bg-gray-50 border border-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 w-full min-w-0">
        <div className="flex flex-col gap-1 flex-1 max-w-xl w-full">
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
              placeholder="Search by request type or approver..."
              className="w-full h-10 pl-10 pr-3.5 rounded-xl border border-gray-200 bg-white text-xs text-gray-700 placeholder:text-gray-400 hover:border-[#5B50EC] focus:border-[#5B50EC] outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-end gap-2.5 sm:gap-3 w-full lg:w-auto min-w-0">
          <div className="flex flex-col gap-1 w-full sm:w-auto min-w-[130px]">
            <span className="text-[11px] font-bold text-gray-700">Status</span>
            <ReusableDropdown
              value={statusFilter}
              options={statusOptions}
              onChange={(val) => onStatusChange(String(val))}
              placeholder="All Statuses"
              align="full"
              className="w-full sm:w-auto"
              buttonClassName="w-full sm:w-36 h-10 px-3.5 rounded-xl border-gray-200 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-row items-end gap-2 sm:gap-3 w-full sm:w-auto min-w-0">
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-[11px] font-bold text-gray-700">From Date</span>
              <ReusableDateFilter
                value={fromFilterValue}
                onChange={handleFromDateSelect}
                modes={["date", "month", "year"]}
                title="Select From Date"
                className="w-full sm:w-auto [&>button]:h-10 [&>button]:px-3.5 [&>button]:w-full [&>button]:rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-[11px] font-bold text-gray-700">To Date</span>
              <ReusableDateFilter
                value={toFilterValue}
                onChange={handleToDateSelect}
                modes={["date", "month", "year"]}
                title="Select To Date"
                className="w-full sm:w-auto [&>button]:h-10 [&>button]:px-3.5 [&>button]:w-full [&>button]:rounded-xl"
              />
            </div>
          </div>

          {(fromDate || toDate) && (
            <button
              type="button"
              onClick={handleClearDates}
              className="h-10 px-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50/50 flex items-center gap-1.5 transition-all cursor-pointer shrink-0 self-end"
              title="Clear date range"
            >
              <X size={14} weight="bold" />
              <span className="text-xs">Clear</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
