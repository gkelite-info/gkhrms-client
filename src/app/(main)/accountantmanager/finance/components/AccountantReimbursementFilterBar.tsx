"use client"

import { useState } from "react"
import { Search, ChevronDown, Calendar } from "lucide-react"
import {
  claimTypesList,
  departmentsList,
  claimStatusesList,
  transactionDateRanges,
} from "../data/mockAccountantData"

interface AccountantReimbursementFilterBarProps {
  searchQuery: string
  onSearchChange: (q: string) => void
  claimType: string
  onClaimTypeChange: (val: string) => void
  department: string
  onDepartmentChange: (val: string) => void
  status: string
  onStatusChange: (val: string) => void
  dateRange: string
  onDateRangeChange: (val: string) => void
}

export default function AccountantReimbursementFilterBar({
  searchQuery,
  onSearchChange,
  claimType,
  onClaimTypeChange,
  department,
  onDepartmentChange,
  status,
  onStatusChange,
  dateRange,
  onDateRangeChange,
}: AccountantReimbursementFilterBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name))
  }

  const closeDropdown = () => setOpenDropdown(null)

  return (
    <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-slate-100 shadow-xs flex flex-col lg:flex-row lg:items-end justify-between gap-3">
      <div className="relative flex-1 max-w-xl">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by employee name, claim ID, or expense type..."
          className="w-full pl-9 pr-3.5 py-1.5 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs h-[34px]"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative">
          <span className="block text-[10px] text-slate-400 font-medium mb-1 tracking-tight">
            Claim Type
          </span>
          <button
            type="button"
            onClick={() => toggleDropdown("claimType")}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors shadow-2xs cursor-pointer h-[34px]"
          >
            <span>{claimType}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {openDropdown === "claimType" && (
            <>
              <div className="fixed inset-0 z-20" onClick={closeDropdown} />
              <div className="absolute top-full mt-1.5 left-0 z-30 w-52 bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                {claimTypesList.map((ct) => (
                  <button
                    key={ct}
                    type="button"
                    onClick={() => {
                      onClaimTypeChange(ct)
                      closeDropdown()
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 font-medium cursor-pointer ${
                      claimType === ct
                        ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                        : "text-slate-700"
                    }`}
                  >
                    {ct}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <span className="block text-[10px] text-slate-400 font-medium mb-1 tracking-tight">
            Department
          </span>
          <button
            type="button"
            onClick={() => toggleDropdown("department")}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors shadow-2xs cursor-pointer h-[34px]"
          >
            <span>{department}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {openDropdown === "department" && (
            <>
              <div className="fixed inset-0 z-20" onClick={closeDropdown} />
              <div className="absolute top-full mt-1.5 left-0 z-30 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                {departmentsList.map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => {
                      onDepartmentChange(dept)
                      closeDropdown()
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 font-medium cursor-pointer ${
                      department === dept
                        ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                        : "text-slate-700"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <span className="block text-[10px] text-slate-400 font-medium mb-1 tracking-tight">
            Status
          </span>
          <button
            type="button"
            onClick={() => toggleDropdown("status")}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors shadow-2xs cursor-pointer h-[34px]"
          >
            <span>{status}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {openDropdown === "status" && (
            <>
              <div className="fixed inset-0 z-20" onClick={closeDropdown} />
              <div className="absolute top-full mt-1.5 left-0 z-30 w-40 bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                {claimStatusesList.map((st) => (
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
          <span className="block text-[10px] text-slate-400 font-medium mb-1 tracking-tight">
            Date Range
          </span>
          <button
            type="button"
            onClick={() => toggleDropdown("dateRange")}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors shadow-2xs cursor-pointer h-[34px]"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{dateRange}</span>
          </button>

          {openDropdown === "dateRange" && (
            <>
              <div className="fixed inset-0 z-20" onClick={closeDropdown} />
              <div className="absolute top-full mt-1.5 right-0 z-30 w-52 bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
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
    </div>
  )
}
