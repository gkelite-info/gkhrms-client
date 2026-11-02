"use client"

import { useSearchParams, useRouter } from "next/navigation"

export type HrExceptionSubtabKey =
  | "all"
  | "late-check-in"
  | "missed-check-out"
  | "low-hours"
  | "repeated-absences"

interface HrExceptionSubtabsProps {
  activeSubtab: HrExceptionSubtabKey
  counts: {
    all: number
    lateCheckIn: number
    missedCheckOut: number
    lowHours: number
    repeatedAbsences: number
  }
  onSubtabChange?: (key: HrExceptionSubtabKey) => void
}

export default function HrExceptionSubtabs({
  activeSubtab,
  counts,
  onSubtabChange,
}: HrExceptionSubtabsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const tabs: { id: HrExceptionSubtabKey; label: string; count: number }[] = [
    { id: "all", label: "All Exceptions", count: counts.all },
    { id: "late-check-in", label: "Late Check-ins", count: counts.lateCheckIn },
    { id: "missed-check-out", label: "Missed Check-outs", count: counts.missedCheckOut },
    { id: "low-hours", label: "Low Working Hours", count: counts.lowHours },
    { id: "repeated-absences", label: "Repeated Absences", count: counts.repeatedAbsences },
  ]

  const handleTabClick = (tabId: HrExceptionSubtabKey) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", "exception-history")
    params.set("subtab", tabId)
    router.push(`?${params.toString()}`, { scroll: false })
    onSubtabChange?.(tabId)
  }

  return (
    <div className="w-full border-b border-gray-100 overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-6 min-w-max pb-0.5">
        {tabs.map((tab) => {
          const isActive = activeSubtab === tab.id

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-2 pb-3 pt-1 text-xs sm:text-sm font-semibold transition-all cursor-pointer border-b-2 -mb-[2px] ${
                isActive
                  ? "border-[#5B50EC] text-[#5B50EC] font-bold"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                  isActive
                    ? "bg-[#EEF2FF] text-[#5B50EC]"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

