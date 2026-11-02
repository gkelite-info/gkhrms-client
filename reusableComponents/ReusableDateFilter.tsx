"use client"

import React, { useState, useEffect, useMemo } from "react"
import { CalendarBlank, CaretDown } from "phosphor-react"
import {
  DateFilterMode,
  DateFilterValue,
  DateFilterStructuredValue,
  DateRangeValue,
  QuickRangeOption,
  MONTH_NAMES,
  DATE_FILTER_PRESETS,
} from "./dateFilter/types"
import { resolveDateFilterValue } from "./dateFilter/resolveValue"
import DateFilterModal from "./dateFilter/DateFilterModal"

export type {
  DateFilterMode,
  DateFilterValue,
  DateFilterStructuredValue,
  DateRangeValue,
  QuickRangeOption,
}
export { DATE_FILTER_PRESETS }

export type DateFilterCompatibleValue = DateFilterValue

export interface ReusableDateFilterProps<T = DateFilterValue> {
  value?: T
  onChange?:
    | ((val: T) => void)
    | ((val: DateFilterStructuredValue) => void)
    | ((val: Date | DateRangeValue | null) => void)
    | React.Dispatch<React.SetStateAction<T>>
    | React.Dispatch<React.SetStateAction<Date | DateRangeValue | null>>
    | React.Dispatch<React.SetStateAction<DateFilterValue>>
    | React.Dispatch<React.SetStateAction<DateFilterStructuredValue>>
    | React.Dispatch<React.SetStateAction<Date | null>>
    | ((val: any) => void)
  modes?: DateFilterMode[]
  title?: string
  subtitle?: string
  hideTabsIfSingle?: boolean
  tabLabels?: Partial<Record<DateFilterMode, string>>
  quickRangeOptions?: QuickRangeOption[]
  className?: string
  buttonClassName?: string
  backdropClassName?: string
  minYear?: number
  showCaret?: boolean
}

export default function ReusableDateFilter<T = DateFilterValue>({
  value,
  onChange,
  modes,
  title = "Filter Attendance",
  subtitle,
  hideTabsIfSingle = true,
  tabLabels,
  quickRangeOptions,
  className = "",
  buttonClassName,
  backdropClassName,
  minYear,
  showCaret = true,
}: ReusableDateFilterProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const normalizedValue = useMemo(() => resolveDateFilterValue(value), [value])

  const availableModes = useMemo(() => {
    return modes && modes.length > 0
      ? modes
      : (["30-days", "date", "month", "year"] as DateFilterMode[])
  }, [modes])

  const [activeTab, setActiveTab] = useState<DateFilterMode>(() => {
    if (availableModes.includes(normalizedValue.mode)) {
      return normalizedValue.mode
    }
    return availableModes[0] || "date"
  })

  const [navYear, setNavYear] = useState<number>(
    () => normalizedValue.selectedYear || new Date().getFullYear()
  )
  const [navMonth, setNavMonth] = useState<number>(
    () => (normalizedValue.selectedMonth !== undefined ? normalizedValue.selectedMonth : new Date().getMonth())
  )

  useEffect(() => {
    if (availableModes.includes(normalizedValue.mode)) {
      setActiveTab(normalizedValue.mode)
    }
    if (normalizedValue.selectedYear) {
      setNavYear(normalizedValue.selectedYear)
    }
    if (normalizedValue.selectedMonth !== undefined) {
      setNavMonth(normalizedValue.selectedMonth)
    }
  }, [normalizedValue, availableModes])

  const triggerChange = (valObj: DateFilterStructuredValue) => {
    if (!onChange) return
    const parts = valObj.selectedDate?.split("/")
    const dateObj =
      parts && parts.length === 3
        ? new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]))
        : new Date()
    valObj.startDate = dateObj
    valObj.endDate = dateObj

    if (value instanceof Date) {
      ;(onChange as (val: Date) => void)(dateObj)
    } else if (value && typeof value === "object" && "mode" in value) {
      ;(onChange as (val: DateFilterStructuredValue) => void)(valObj)
    } else if (value && typeof value === "object" && "startDate" in value) {
      ;(onChange as (val: DateRangeValue) => void)({ startDate: dateObj, endDate: dateObj })
    } else {
      ;(onChange as (val: any) => void)(valObj)
    }
  }

  const handleSelectDate = (day: number, month: number = navMonth, year: number = navYear) => {
    const dayStr = String(day).padStart(2, "0")
    const monthStr = String(month + 1).padStart(2, "0")
    const d = new Date(year, month, day)
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()]
    triggerChange({
      mode: "date",
      label: `${weekday}, ${dayStr} ${MONTH_NAMES[month]} ${year}`,
      selectedDate: `${dayStr}/${monthStr}/${year}`,
      selectedMonth: month,
      selectedYear: year,
    })
    setIsOpen(false)
  }

  const handleSelectMonth = (mIdx: number) => {
    setNavMonth(mIdx)
    if (availableModes.includes("date")) {
      setActiveTab("date")
      return
    }
    triggerChange({
      mode: "month",
      label: `${MONTH_NAMES[mIdx]} ${navYear}`,
      selectedMonth: mIdx,
      selectedYear: navYear,
    })
    setIsOpen(false)
  }

  const handleSelectYear = (yr: number) => {
    setNavYear(yr)
    if (availableModes.includes("month")) {
      setActiveTab("month")
      return
    }
    if (availableModes.includes("date")) {
      setActiveTab("date")
      return
    }
    triggerChange({ mode: "year", label: `Year ${yr}`, selectedYear: yr })
    setIsOpen(false)
  }

  const handleSelectQuickRange = (range: QuickRangeOption) => {
    triggerChange({
      mode: range.mode,
      label: range.label,
      selectedMonth: range.selectedMonth,
      selectedYear: range.selectedYear,
      selectedDate: range.selectedDate,
    })
    setIsOpen(false)
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={
          buttonClassName ||
          "flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-[#1F2433] hover:border-[#5B50EC] hover:bg-[#F9F8FE] transition-all shadow-xs cursor-pointer select-none"
        }
      >
        <CalendarBlank size={16} weight="bold" className="text-[#5B50EC] shrink-0" />
        <span className="whitespace-nowrap">{normalizedValue.label}</span>
        {showCaret && <CaretDown size={12} weight="bold" className="text-gray-400 shrink-0" />}
      </button>

      <DateFilterModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        subtitle={subtitle}
        backdropClassName={backdropClassName}
        availableModes={availableModes}
        hideTabsIfSingle={hideTabsIfSingle}
        tabLabels={tabLabels}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        value={normalizedValue}
        quickRangeOptions={quickRangeOptions}
        navYear={navYear}
        setNavYear={setNavYear}
        navMonth={navMonth}
        setNavMonth={setNavMonth}
        onSelectQuickRange={handleSelectQuickRange}
        onSelectDate={handleSelectDate}
        onSelectMonth={handleSelectMonth}
        onSelectYear={handleSelectYear}
        minYear={minYear}
      />
    </div>
  )
}
