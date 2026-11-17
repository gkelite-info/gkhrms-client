"use client"

import { useState } from "react"
import { Calendar, ChevronDown } from "lucide-react"

interface FinanceHeaderProps {
  activeScope: "platform" | "own_organization"
  onScopeChange: (scope: "platform" | "own_organization") => void
}

export default function FinanceHeader({
  activeScope,
  onScopeChange,
}: FinanceHeaderProps) {
  const [dateRange, setDateRange] = useState("Last 30 Days")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const dateRangeOptions = [
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days",
    "This Year",
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white border border-slate-200/80 rounded-full p-1 inline-flex items-center gap-1 shadow-2xs self-start">
        <button
          type="button"
          onClick={() => onScopeChange("platform")}
          className={`px-6 py-2 rounded-full font-semibold text-xs transition-all cursor-pointer ${
            activeScope === "platform"
              ? "bg-[#5B50E5] text-white shadow-xs shadow-indigo-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Platform
        </button>
        <button
          type="button"
          onClick={() => onScopeChange("own_organization")}
          className={`px-6 py-2 rounded-full font-semibold text-xs transition-all cursor-pointer ${
            activeScope === "own_organization"
              ? "bg-[#5B50E5] text-white shadow-xs shadow-indigo-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Own organization
        </button>
      </div>

      {activeScope === "platform" && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              Finance Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Platform revenue, payments, and subscription performance across all client companies.
            </p>
          </div>

          <div className="relative self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-3.5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{dateRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-36 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {dateRangeOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setDateRange(opt)
                      setDropdownOpen(false)
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                      dateRange === opt
                        ? "font-bold text-[#5B50E5]"
                        : "text-slate-600"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
