"use client"

import React from "react"
import { CaretLeft, CaretRight } from "phosphor-react"
import { MONTH_NAMES } from "./types"

interface MonthViewProps {
  navYear: number
  selectedMonth?: number
  selectedYear?: number
  onPrevYear: () => void
  onNextYear: () => void
  onSelectMonth: (monthIdx: number) => void
  onSwitchToYear?: () => void
}

export default function MonthView({
  navYear,
  selectedMonth,
  selectedYear,
  onPrevYear,
  onNextYear,
  onSelectMonth,
  onSwitchToYear,
}: MonthViewProps) {
  const currentMonthIdx = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  return (
    <div className="w-full flex flex-col gap-2 pt-0.5">
      <div className="flex items-center justify-between text-xs font-bold text-gray-800 px-2.5 py-1.5 bg-gray-50/90 rounded-xl border border-gray-100 shrink-0">
        {onSwitchToYear ? (
          <button
            type="button"
            onClick={onSwitchToYear}
            className="hover:text-[#5B50EC] hover:bg-white px-1 py-0.5 rounded-md transition-colors cursor-pointer"
            title="Change year"
          >
            Year {navYear}
          </button>
        ) : (
          <span>Year {navYear}</span>
        )}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onPrevYear}
            title="Previous Year"
            className="p-1 rounded-lg hover:bg-white text-gray-600 hover:text-[#5B50EC] transition-all cursor-pointer shadow-2xs"
          >
            <CaretLeft size={14} weight="bold" />
          </button>
          <button
            type="button"
            onClick={onNextYear}
            title="Next Year"
            className="p-1 rounded-lg hover:bg-white text-gray-600 hover:text-[#5B50EC] transition-all cursor-pointer shadow-2xs"
          >
            <CaretRight size={14} weight="bold" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5 py-0.5">
        {MONTH_NAMES.map((m, idx) => {
          const isSelected = selectedMonth === idx && selectedYear === navYear
          const isCurrent = currentMonthIdx === idx && currentYear === navYear

          return (
            <button
              key={m}
              type="button"
              onClick={() => onSelectMonth(idx)}
              className={`h-10 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none text-center flex items-center justify-center ${
                isSelected
                  ? "bg-[#5B50EC] text-white shadow-xs font-bold"
                  : isCurrent
                  ? "bg-[#F1F0FD] text-[#5B50EC] border border-[#5B50EC]/30 font-bold"
                  : "bg-gray-50 hover:bg-[#F1F0FD] text-gray-700 hover:text-[#5B50EC]"
              }`}
            >
              {m}
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium pt-2 border-t border-gray-100 px-1 shrink-0">
        <span className="text-[10px]">12 months in {navYear}</span>
        <button
          type="button"
          onClick={() => onSelectMonth(currentMonthIdx)}
          className="text-[#5B50EC] hover:underline font-semibold cursor-pointer"
        >
          Current Month
        </button>
      </div>
    </div>
  )
}
