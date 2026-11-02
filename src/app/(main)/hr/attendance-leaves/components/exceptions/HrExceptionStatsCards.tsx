"use client"

import {
  Clock,
  SignOut,
  ChartBar,
  CalendarBlank,
} from "phosphor-react"
import { ExceptionType } from "./hrExceptionData"

interface HrExceptionStatsCardsProps {
  lateCheckInsCount: number
  missedCheckOutsCount: number
  lowWorkingHoursCount: number
  repeatedAbsencesCount: number
  selectedType?: string | null
  onSelectType?: (type: ExceptionType | "All") => void
}

export default function HrExceptionStatsCards({
  lateCheckInsCount,
  missedCheckOutsCount,
  lowWorkingHoursCount,
  repeatedAbsencesCount,
  selectedType,
  onSelectType,
}: HrExceptionStatsCardsProps) {
  const cards = [
    {
      id: "Late Check-in" as ExceptionType,
      label: "Late Check-ins",
      count: lateCheckInsCount,
      trend: "↑ 3",
      trendBadgeBg: "bg-[#FFF1F2]",
      trendBadgeColor: "text-[#EF4444]",
      icon: Clock,
      iconBg: "bg-[#FFF1F2]",
      iconColor: "text-[#EF4444]",
      activeRing: "ring-[#EF4444]/20 border-[#EF4444]",
    },
    {
      id: "Missed Check-out" as ExceptionType,
      label: "Missed Check-outs",
      count: missedCheckOutsCount,
      trend: "↑ 2",
      trendBadgeBg: "bg-[#FFFBEB]",
      trendBadgeColor: "text-[#F59E0B]",
      icon: SignOut,
      iconBg: "bg-[#FFFBEB]",
      iconColor: "text-[#F59E0B]",
      activeRing: "ring-[#F59E0B]/20 border-[#F59E0B]",
    },
    {
      id: "Low Working Hours" as ExceptionType,
      label: "Low Working Hours",
      count: lowWorkingHoursCount,
      trend: "↑ 1",
      trendBadgeBg: "bg-[#FFF1F2]",
      trendBadgeColor: "text-[#EF4444]",
      icon: ChartBar,
      iconBg: "bg-[#EFF6FF]",
      iconColor: "text-[#3B82F6]",
      activeRing: "ring-[#3B82F6]/20 border-[#3B82F6]",
    },
    {
      id: "Repeated Absences" as ExceptionType,
      label: "Repeated Absences",
      count: repeatedAbsencesCount,
      trend: "↑ 1",
      trendBadgeBg: "bg-[#FFF1F2]",
      trendBadgeColor: "text-[#EF4444]",
      icon: CalendarBlank,
      iconBg: "bg-[#FAF5FF]",
      iconColor: "text-[#A855F7]",
      activeRing: "ring-[#A855F7]/20 border-[#A855F7]",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card) => {
        const Icon = card.icon
        const isSelected = selectedType === card.id

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelectType?.(card.id)}
            className={`w-full text-left bg-white rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer shadow-xs select-none ${
              isSelected
                ? `ring-2 ${card.activeRing} shadow-sm`
                : "border-gray-100 hover:border-gray-200 hover:shadow-sm"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`w-12 h-12 rounded-2xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0`}
              >
                <Icon size={24} weight="bold" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-gray-500 font-medium">
                  {card.label}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold text-gray-900 leading-none">
                    {card.count}
                  </span>
                  <span
                    className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded-md text-xs font-semibold ${card.trendBadgeBg} ${card.trendBadgeColor}`}
                  >
                    {card.trend}
                  </span>
                </div>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
