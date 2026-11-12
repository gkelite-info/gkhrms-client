"use client"

import { useState } from "react"
import { Search, ChevronDown, Calendar, Plus } from "lucide-react"
import {
  expenseTypesList,
  expenseStatusList,
  transactionDateRanges,
} from "../data/mockAccountantData"

interface AccountantExpenseFilterBarProps {
  searchQuery: string
  onSearchChange: (q: string) => void
  expenseType: string
  onExpenseTypeChange: (type: string) => void
  status: string
  onStatusChange: (status: string) => void
  dateRange: string
  onDateRangeChange: (range: string) => void
  onAddExpenseClick: () => void
}

export default function AccountantExpenseFilterBar({
  searchQuery,
  onSearchChange,
  expenseType,
  onExpenseTypeChange,
  status,
  onStatusChange,
  dateRange,
  onDateRangeChange,
  onAddExpenseClick,
}: AccountantExpenseFilterBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name))
  }

  const closeDropdown = () => setOpenDropdown(null)

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-0">
        <div className="relative flex-1 min-w-[280px] xl:min-w-[340px] max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by vendor, bill no, or expense..."
            className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs"
          />
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("type")}
            className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors shadow-2xs cursor-pointer"
          >
            <span>{expenseType}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {openDropdown === "type" && (
            <>
              <div className="fixed inset-0 z-20" onClick={closeDropdown} />
              <div className="absolute top-full mt-1.5 left-0 z-30 w-52 bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                {expenseTypesList.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      onExpenseTypeChange(t)
                      closeDropdown()
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 font-medium cursor-pointer ${
                      expenseType === t
                        ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                        : "text-slate-700"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("status")}
            className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors shadow-2xs cursor-pointer"
          >
            <span>{status}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {openDropdown === "status" && (
            <>
              <div className="fixed inset-0 z-20" onClick={closeDropdown} />
              <div className="absolute top-full mt-1.5 left-0 z-30 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                {expenseStatusList.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      onStatusChange(st)
                      closeDropdown()
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 font-medium cursor-pointer ${
                      status === st
                        ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                        : "text-slate-700"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("dateRange")}
            className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors shadow-2xs cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{dateRange}</span>
          </button>

          {openDropdown === "dateRange" && (
            <>
              <div className="fixed inset-0 z-20" onClick={closeDropdown} />
              <div className="absolute top-full mt-1.5 right-0 z-30 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                {transactionDateRanges.map((dr) => (
                  <button
                    key={dr}
                    type="button"
                    onClick={() => {
                      onDateRangeChange(dr)
                      closeDropdown()
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 font-medium cursor-pointer ${
                      dateRange === dr
                        ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                        : "text-slate-700"
                    }`}
                  >
                    {dr}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onAddExpenseClick}
        className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl text-xs font-semibold shadow-sm shadow-indigo-200 transition-all cursor-pointer whitespace-nowrap self-start lg:self-auto"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        <span>Add Expense</span>
      </button>
    </div>
  )
}

