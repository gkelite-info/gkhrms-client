"use client"

import { useState, useRef, useEffect } from "react"
import { Calendar, ChevronDown } from "lucide-react"

interface PayrollHeaderProps {
  selectedMonth?: string
  onMonthChange?: (month: string) => void
}

export default function PayrollHeader({
  selectedMonth = "Nov 2026",
  onMonthChange,
}: PayrollHeaderProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedMonth)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const MONTH_OPTIONS = [
    "Nov 2026",
    "Oct 2026",
    "Sep 2026",
    "Aug 2026",
    "Jul 2026",
    "Jun 2026",
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (m: string) => {
    setCurrentMonth(m)
    setDropdownOpen(false)
    if (onMonthChange) onMonthChange(m)
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Payroll
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Manage employee salaries, payroll processing, and payout history.
        </p>
      </div>

      <div ref={dropdownRef} className="relative self-start sm:self-auto">
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="h-9 px-3.5 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{currentMonth}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
            {MONTH_OPTIONS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => handleSelect(m)}
                className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                  currentMonth === m
                    ? "font-bold text-[#5B50E5]"
                    : "text-slate-600"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
