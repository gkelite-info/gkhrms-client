"use client"

import { useEffect, useState } from "react"
import { CaretDown, Coffee, Scroll } from "phosphor-react"

export default function EmployeeOperationsRow({
  onSelectTimings,
}: {
  onSelectTimings?: () => void
}) {
  const [selectedDay, setSelectedDay] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<string>("07:18:08 PM")
  const [currentDate, setCurrentDate] = useState<string>("Fri 22 Aug 2025")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      )
      setCurrentDate(
        now.toLocaleDateString("en-GB", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const days = [
    { label: "M", full: "Monday" },
    { label: "T", full: "Tuesday" },
    { label: "W", full: "Wednesday" },
    { label: "T", full: "Thursday" },
    { label: "F", full: "Friday" },
    { label: "S", full: "Saturday" },
    { label: "S", full: "Sunday" },
  ]

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mt-2 sm:mt-3">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3.5 sm:p-5 flex flex-col justify-between min-h-[160px] sm:min-h-[170px]">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-[#1F2937]">Attendance Stats</h3>
          <div className="flex items-center gap-1 text-[11px] sm:text-xs text-gray-500 font-medium cursor-pointer hover:text-gray-700">
            <span>Last Week</span>
            <CaretDown size={12} weight="bold" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-2.5 sm:mt-4 pt-1">
          <div className="flex flex-col">
            <span className="text-[11px] sm:text-xs text-gray-400 font-medium">Avg Hrs / Per DAY</span>
            <span className="text-2xl sm:text-3xl font-bold text-[#1F2937] mt-1 tracking-tight">2h</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] sm:text-xs text-gray-400 font-medium">Avg % / Per DAY</span>
            <span className="text-2xl sm:text-3xl font-bold text-[#1F2937] mt-1 tracking-tight">25%</span>
          </div>
        </div>
      </div>

      <div
        onClick={onSelectTimings}
        style={{ cursor: onSelectTimings ? "pointer" : "default" }}
        className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-3.5 sm:p-5 flex flex-col justify-between transition-all min-h-[160px] sm:min-h-[170px] ${
          onSelectTimings
            ? "cursor-pointer hover:shadow-md hover:border-[#7D73E3]/50 group"
            : ""
        }`}
        title={onSelectTimings ? "Click to view Timesheet" : undefined}
      >
        <div className="flex items-center justify-between">
          <h3 className={`text-xs sm:text-sm font-bold text-[#1F2937] ${onSelectTimings ? "group-hover:text-[#7D73E3] transition-colors" : ""}`}>
            Timings
          </h3>
          {onSelectTimings && (
            <span className="text-[10px] font-semibold text-[#7D73E3] opacity-0 group-hover:opacity-100 transition-opacity">
              View Timesheet &rarr;
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-1 mt-2.5 overflow-x-auto scrollbar-hide py-0.5">
          {days.map((d, index) => {
            const isSelected = selectedDay === index
            return (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedDay(index)
                }}
                className={`h-6 w-6 sm:h-6.5 sm:w-6.5 rounded-full shrink-0 flex items-center justify-center text-[11px] sm:text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1F2937] text-white border-[#1F2937] shadow-sm"
                    : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                {d.label}
              </button>
            )
          })}
        </div>

        <div className="mt-2">
          <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
            Today (10:30 AM - 7:00 PM)
          </p>
          <div className="h-2.5 sm:h-3 w-full bg-[#EAEAEA] rounded-full overflow-hidden mt-1.5">
            <div className="h-full rounded-full bg-gradient-to-r from-[#453F7D] to-[#ABA3FF] w-[65%]" />
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-600 font-medium mt-2 pt-1 flex-wrap gap-1">
          <span>Duration: 9h 0m</span>
          <div className="flex items-center gap-1.5">
            <Coffee size={15} weight="bold" className="text-gray-700" />
            <span>60 min</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3.5 sm:p-5 flex flex-col justify-between min-h-[160px] sm:min-h-[170px]">
        <h3 className="text-xs sm:text-sm font-bold text-[#1F2937]">Actions</h3>

        <div className="flex items-center justify-between gap-2 sm:gap-3 mt-2.5 flex-wrap sm:flex-nowrap">
          <div className="border border-gray-300 rounded-lg px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-bold text-[#1F2937] tracking-wider bg-gray-50/50 whitespace-nowrap">
            {currentTime}
          </div>
          <button
            type="button"
            className="bg-[#BD413D] hover:bg-[#a83330] text-white rounded-lg px-3 sm:px-3.5 py-1.5 text-[10px] sm:text-xs font-semibold shadow-sm transition-colors cursor-pointer whitespace-nowrap"
          >
            Remote Check-Out
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500 font-medium mt-2.5 flex-wrap gap-1">
          <span>{currentDate}</span>
          <span>5h : 8m Since Last Login</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#7D73E3] font-semibold cursor-pointer hover:underline mt-1.5 pt-1">
          <Scroll size={15} weight="bold" />
          <span>Attendance Policy</span>
        </div>
      </div>
    </div>
  )
}
