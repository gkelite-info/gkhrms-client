"use client"

import { UsersThree } from "phosphor-react"
import type { DateFilterValue } from "@/components/reusableComponents"

interface HrAttendanceHeaderProps {
  selectedDate?: DateFilterValue
  onDateChange?: (date: DateFilterValue) => void
}

export default function HrAttendanceHeader({
  selectedDate,
  onDateChange,
}: HrAttendanceHeaderProps = {}) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-2xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
          <UsersThree size={24} weight="bold" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
            Organization Attendance
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5">
            Monitor organization-wide attendance, workforce availability, and daily attendance activity.
          </p>
        </div>
      </div>
    </div>
  )
}
