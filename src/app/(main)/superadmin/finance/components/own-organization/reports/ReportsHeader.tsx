"use client"

import { useState, useRef, useEffect } from "react"
import { Calendar, ChevronDown, Download, SlidersHorizontal, Check } from "lucide-react"

interface ReportsHeaderProps {
  selectedRange?: string
  onRangeChange?: (range: string) => void
  onExportExcel?: () => void
}

export default function ReportsHeader({
  selectedRange = "Nov 01, 2026 - Nov 30, 2026",
  onRangeChange,
  onExportExcel,
}: ReportsHeaderProps) {
  const [currentRange, setCurrentRange] = useState(selectedRange)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [filterActive, setFilterActive] = useState(false)
  const [exported, setExported] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const RANGE_OPTIONS = [
    "Nov 01, 2026 - Nov 30, 2026",
    "Oct 01, 2026 - Oct 31, 2026",
    "Sep 01, 2026 - Sep 30, 2026",
    "Q3 2026 (Jul - Sep)",
    "Q4 2026 (Oct - Dec)",
    "Year to Date (2026)",
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

  const handleSelect = (r: string) => {
    setCurrentRange(r)
    setDropdownOpen(false)
    if (onRangeChange) onRangeChange(r)
  }

  const handleExport = () => {
    setExported(true)
    setTimeout(() => setExported(false), 2500)
    if (onExportExcel) onExportExcel()
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Reports
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Comprehensive reports for employees, attendance, payroll, expenses and leave in your organization.
        </p>
      </div>

      <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="h-9 px-3.5 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{currentRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-56 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
              {RANGE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className={`w-full text-left px-3.5 py-2 hover:bg-[#EEF0FD] hover:text-[#5B50E5] transition-colors ${
                    currentRange === opt
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

        <button
          type="button"
          onClick={() => setFilterActive(!filterActive)}
          className={`h-9 w-9 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
            filterActive
              ? "bg-[#EEF0FD] border-[#5B50E5] text-[#5B50E5]"
              : "bg-white border-slate-200/90 text-slate-500 hover:bg-slate-50 hover:text-slate-700 shadow-xs"
          }`}
          title="Filter preferences"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={handleExport}
          className="h-9 px-4 bg-[#5B50E5] hover:bg-[#4E44C9] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
        >
          {exported ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Exported!</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>Export Excel</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
