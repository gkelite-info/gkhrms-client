"use client"

import { CalendarBlank } from "phosphor-react"
import ReusableDateFilter, { DateFilterValue } from "../ReusableDateFilter"

interface ProfileDobPickerProps {
  value: string
  onChange: (dateStr: string) => void
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

export default function ProfileDobPicker({ value, onChange }: ProfileDobPickerProps) {
  const parseDobToDate = (dobStr: string): Date => {
    if (!dobStr) return new Date(1995, 0, 1)
    const parts = dobStr.trim().split(" ")
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10)
      const monthIdx = MONTH_NAMES.findIndex((m) => m.toLowerCase() === parts[1].toLowerCase())
      const year = parseInt(parts[2], 10)
      if (!isNaN(day) && monthIdx !== -1 && !isNaN(year)) {
        return new Date(year, monthIdx, day)
      }
    }
    const fallback = new Date(dobStr)
    return isNaN(fallback.getTime()) ? new Date(1995, 0, 1) : fallback
  }

  const selectedDate = parseDobToDate(value)

  const handleDateChange = (val: DateFilterValue) => {
    if (!val) return
    if (val instanceof Date) {
      const day = String(val.getDate()).padStart(2, "0")
      const month = MONTH_NAMES[val.getMonth()]
      const year = val.getFullYear()
      onChange(`${day} ${month} ${year}`)
      return
    }
    if (typeof val === "object" && "selectedDate" in val && val.selectedDate) {
      const parts = val.selectedDate.split("/")
      if (parts.length === 3) {
        const day = parts[0]
        const mIdx = parseInt(parts[1], 10) - 1
        const year = parts[2]
        const month = MONTH_NAMES[mIdx] || parts[1]
        onChange(`${day} ${month} ${year}`)
        return
      }
    }
    if (typeof val === "object" && "startDate" in val && val.startDate instanceof Date) {
      const d = val.startDate
      const day = String(d.getDate()).padStart(2, "0")
      const month = MONTH_NAMES[d.getMonth()]
      const year = d.getFullYear()
      onChange(`${day} ${month} ${year}`)
    }
  }

  return (
    <div className="relative">
      <label className="text-[11px] font-semibold text-gray-700 block mb-1">
        Date of Birth <span className="text-rose-500 font-bold">*</span>
      </label>
      <ReusableDateFilter
        value={selectedDate}
        onChange={handleDateChange}
        modes={["date", "month", "year"]}
        hideTabsIfSingle={false}
        title="Select Date of Birth"
        subtitle="Choose year, month and day"
        className="w-full"
        buttonClassName="w-full px-3 py-2 text-xs font-semibold text-gray-900 bg-white rounded-xl border border-gray-200 focus:border-[#5B50EC] flex items-center justify-between cursor-pointer transition-all hover:border-gray-300 shadow-2xs"
        showCaret={false}
      >
        <span className={value ? "text-gray-900 font-semibold" : "text-gray-400 font-normal"}>
          {value || "Select date of birth"}
        </span>
        <CalendarBlank size={15} weight="bold" className="text-[#5B50EC] shrink-0" />
      </ReusableDateFilter>
    </div>
  )
}
