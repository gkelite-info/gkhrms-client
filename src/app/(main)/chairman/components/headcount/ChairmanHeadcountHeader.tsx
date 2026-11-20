"use client"

import { useState, useRef, useEffect } from "react"
import { Calendar, ChevronDown, ArrowLeft } from "lucide-react"

interface ChairmanHeadcountHeaderProps {
  onBack?: () => void
}

export default function ChairmanHeadcountHeader({
  onBack,
}: ChairmanHeadcountHeaderProps) {
  const [selectedMonth, setSelectedMonth] = useState("Aug 2025")
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const MONTHS = [
    "Aug 2025",
    "Jul 2025",
    "Jun 2025",
    "May 2025",
    "Apr 2025",
    "Mar 2025",
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Headcount
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Overview of total employees and key distribution across your organization.
        </p>
      </div>

      <div className="flex items-center gap-2.5 self-start sm:self-auto">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="h-8 px-3 bg-white border border-slate-200/90 hover:bg-[#EEF0FD] hover:text-[#5B50E5] text-slate-600 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
        )}

        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="h-8 px-3 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 shadow-2xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{selectedMonth}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-32 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
              {MONTHS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setSelectedMonth(m)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-3.5 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                    selectedMonth === m
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
    </div>
  )
}
