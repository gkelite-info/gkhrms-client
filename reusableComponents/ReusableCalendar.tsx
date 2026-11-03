"use client"

import React, { useState, useMemo } from "react"
import { CaretLeft, CaretRight } from "phosphor-react"

export interface ReusableCalendarProps {
  value?: Date
  onChange?: (date: Date) => void
  initialDate?: Date
  monthName?: string
  className?: string
  size?: "compact" | "normal"
  showNav?: boolean
  weekStartsOn?: "mon" | "sun"
}

interface CalendarCell {
  date: Date
  dayNumber: number
  isCurrentMonth: boolean
  isSelected: boolean
  isToday: boolean
}

export default function ReusableCalendar({
  value,
  onChange,
  initialDate,
  monthName,
  className = "",
  size = "compact",
  showNav = true,
  weekStartsOn = "mon",
}: ReusableCalendarProps) {
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date>(() => {
    return value || initialDate || new Date(2025, 0, 2)
  })

  const selectedDate = value !== undefined ? value : internalSelectedDate

  const [viewDate, setViewDate] = useState<Date>(() => {
    return initialDate || value || new Date(2025, 0, 1)
  })

  const currentYear = viewDate.getFullYear()
  const currentMonth = viewDate.getMonth()

  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1))
  }

  const handleDateClick = (cellDate: Date) => {
    setInternalSelectedDate(cellDate)
    onChange?.(cellDate)
    if (cellDate.getMonth() !== currentMonth) {
      setViewDate(new Date(cellDate.getFullYear(), cellDate.getMonth(), 1))
    }
  }

  const daysHeader = useMemo(() => {
    return weekStartsOn === "mon"
      ? ["m", "t", "w", "t", "f", "s", "s"]
      : ["s", "m", "t", "w", "t", "f", "s"]
  }, [weekStartsOn])

  const calendarGrid = useMemo<CalendarCell[][]>(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
    const daysInCurrentMonth = lastDayOfMonth.getDate()

    let startDayOfWeek = firstDayOfMonth.getDay()
    if (weekStartsOn === "mon") {
      startDayOfWeek = (startDayOfWeek + 6) % 7
    }

    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate()

    const cells: CalendarCell[] = []
    const today = new Date()

    const isSameDate = (d1: Date, d2: Date) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()

    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const cellDate = new Date(currentYear, currentMonth - 1, prevMonthLastDay - i)
      cells.push({
        date: cellDate,
        dayNumber: prevMonthLastDay - i,
        isCurrentMonth: false,
        isSelected: isSameDate(cellDate, selectedDate),
        isToday: isSameDate(cellDate, today),
      })
    }

    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const cellDate = new Date(currentYear, currentMonth, day)
      cells.push({
        date: cellDate,
        dayNumber: day,
        isCurrentMonth: true,
        isSelected: isSameDate(cellDate, selectedDate),
        isToday: isSameDate(cellDate, today),
      })
    }

    const remainingCells = 35 - cells.length > 0 ? 35 - cells.length : 42 - cells.length
    for (let nextDay = 1; nextDay <= remainingCells; nextDay++) {
      const cellDate = new Date(currentYear, currentMonth + 1, nextDay)
      cells.push({
        date: cellDate,
        dayNumber: nextDay,
        isCurrentMonth: false,
        isSelected: isSameDate(cellDate, selectedDate),
        isToday: isSameDate(cellDate, today),
      })
    }

    const weeks: CalendarCell[][] = []
    for (let i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7))
    }
    return weeks
  }, [currentYear, currentMonth, selectedDate, weekStartsOn])

  const formattedMonth = useMemo(() => {
    if (monthName) return monthName
    return viewDate.toLocaleDateString("en-US", { month: "long" })
  }, [monthName, viewDate])

  const isCompact = size === "compact"

  return (
    <div
      className={`bg-white rounded-xl ${
        isCompact ? "p-3 sm:p-3.5" : "p-4 sm:p-5"
      } border border-slate-100 shadow-2xs flex flex-col justify-between select-none ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <h5
          className={`font-semibold ${
            isCompact ? "text-xs" : "text-sm"
          } text-slate-800`}
        >
          {formattedMonth}
        </h5>

        {showNav && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              aria-label="Previous month"
              className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <CaretLeft size={12} weight="bold" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Next month"
              className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <CaretRight size={12} weight="bold" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-7 text-center mb-1.5">
        {daysHeader.map((day, idx) => (
          <span
            key={idx}
            className="text-[10px] text-slate-400 lowercase select-none font-medium"
          >
            {day}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        {calendarGrid.map((week, wIdx) => (
          <div key={wIdx} className="grid grid-cols-7 text-center items-center">
            {week.map((cell, dIdx) => {
              const displayDay = String(cell.dayNumber).padStart(2, "0")

              if (cell.isSelected) {
                return (
                  <button
                    key={dIdx}
                    type="button"
                    onClick={() => handleDateClick(cell.date)}
                    className="w-5 h-5 mx-auto rounded-full bg-[#5B50EC] text-white text-[9.5px] font-bold flex items-center justify-center select-none shadow-2xs cursor-pointer hover:bg-[#4E44D4] transition-colors"
                  >
                    {displayDay}
                  </button>
                )
              }

              return (
                <button
                  key={dIdx}
                  type="button"
                  onClick={() => handleDateClick(cell.date)}
                  className={`text-[9.5px] sm:text-[10px] py-0.5 rounded hover:bg-slate-50 transition-colors select-none cursor-pointer ${
                    !cell.isCurrentMonth
                      ? "text-slate-300 font-normal"
                      : "text-slate-600 font-medium"
                  }`}
                >
                  {displayDay}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

