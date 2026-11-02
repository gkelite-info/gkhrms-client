"use client"

import React from "react"
import { CaretLeft, CaretRight } from "phosphor-react"
import { MONTH_NAMES } from "./types"

interface DateViewProps {
  navYear: number
  navMonth: number
  selectedDate?: string
  onPrevMonth: () => void
  onNextMonth: () => void
  onSelectDate: (day: number, month?: number, year?: number) => void
  onSwitchToMonth?: () => void
  onSwitchToYear?: () => void
}

export default function DateView({
  navYear,
  navMonth,
  selectedDate,
  onPrevMonth,
  onNextMonth,
  onSelectDate,
  onSwitchToMonth,
  onSwitchToYear,
}: DateViewProps) {
  const daysInMonth = new Date(navYear, navMonth + 1, 0).getDate()
  const firstDayIndex = new Date(navYear, navMonth, 1).getDay()

  const today = new Date()
  const isCurrentMonthAndYear =
    today.getMonth() === navMonth && today.getFullYear() === navYear
  const currentDay = isCurrentMonthAndYear ? today.getDate() : null

  return (
    <div className="w-full flex flex-col gap-2 pt-0.5">
      <div className="flex items-center justify-between text-xs font-bold text-gray-800 px-2.5 py-1.5 bg-gray-50/90 rounded-xl border border-gray-100 shrink-0">
        <div className="flex items-center gap-1">
          {onSwitchToMonth ? (
            <button
              type="button"
              onClick={onSwitchToMonth}
              className="hover:text-[#5B50EC] hover:bg-white px-1 py-0.5 rounded-md transition-colors cursor-pointer"
              title="Change month"
            >
              {MONTH_NAMES[navMonth]}
            </button>
          ) : (
            <span>{MONTH_NAMES[navMonth]}</span>
          )}
          {onSwitchToYear ? (
            <button
              type="button"
              onClick={onSwitchToYear}
              className="hover:text-[#5B50EC] hover:bg-white px-1 py-0.5 rounded-md transition-colors cursor-pointer"
              title="Change year"
            >
              {navYear}
            </button>
          ) : (
            <span>{navYear}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onPrevMonth}
            title="Previous Month"
            className="p-1 rounded-lg hover:bg-white text-gray-600 hover:text-[#5B50EC] transition-all cursor-pointer shadow-2xs"
          >
            <CaretLeft size={14} weight="bold" />
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            title="Next Month"
            className="p-1 rounded-lg hover:bg-white text-gray-600 hover:text-[#5B50EC] transition-all cursor-pointer shadow-2xs"
          >
            <CaretRight size={14} weight="bold" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div key={d} className="py-0.5">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="w-7 h-7 sm:w-7.5 sm:h-7.5" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const dayStr = String(day).padStart(2, "0")
            const monthStr = String(navMonth + 1).padStart(2, "0")
            const isSelected = selectedDate === `${dayStr}/${monthStr}/${navYear}`
            const isToday = currentDay === day

            return (
              <button
                key={day}
                type="button"
                onClick={() => onSelectDate(day, navMonth, navYear)}
                className={`w-7 h-7 sm:w-7.5 sm:h-7.5 mx-auto flex items-center justify-center rounded-xl text-xs font-semibold transition-all cursor-pointer select-none ${
                  isSelected
                    ? "bg-[#5B50EC] text-white shadow-xs font-bold"
                    : isToday
                    ? "border border-[#5B50EC] text-[#5B50EC] bg-[#F1F0FD]/60 font-bold"
                    : "hover:bg-[#F1F0FD] text-gray-700 hover:text-[#5B50EC]"
                }`}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 px-1 shrink-0">
        <span className="text-[10px] text-gray-400 select-none">Click day to select</span>
        <button
          type="button"
          onClick={() => {
            onSelectDate(today.getDate(), today.getMonth(), today.getFullYear())
          }}
          className="text-[11px] font-semibold text-[#5B50EC] hover:underline cursor-pointer"
        >
          Select Today
        </button>
      </div>
    </div>
  )
}
