"use client"

import {
  UsersThree,
  CheckCircle,
  XCircle,
  Sun,
  HouseLine,
  Clock,
} from "phosphor-react"
import { HR_ATTENDANCE_STATS, HrAttendanceStat } from "../data/hrAttendanceData"

interface HrAttendanceStatsCardsProps {
  stats?: HrAttendanceStat[]
}

export default function HrAttendanceStatsCards({
  stats = HR_ATTENDANCE_STATS,
}: HrAttendanceStatsCardsProps = {}) {
  const getIconAndColors = (iconType: HrAttendanceStat["iconType"]) => {
    switch (iconType) {
      case "employees":
        return {
          icon: UsersThree,
          bg: "bg-[#EEF2FF]",
          color: "text-[#5B50EC]",
          trendClass: "text-emerald-600 bg-emerald-50",
        }
      case "present":
        return {
          icon: CheckCircle,
          bg: "bg-[#E8FAF4]",
          color: "text-[#10B981]",
          trendClass: "text-emerald-600 bg-emerald-50",
        }
      case "absent":
        return {
          icon: XCircle,
          bg: "bg-[#FFF1F2]",
          color: "text-[#F43F5E]",
          trendClass: "text-rose-600 bg-rose-50",
        }
      case "leave":
        return {
          icon: Sun,
          bg: "bg-[#FFF8EC]",
          color: "text-[#F59E0B]",
          trendClass: "text-amber-600 bg-amber-50",
        }
      case "wfh":
        return {
          icon: HouseLine,
          bg: "bg-[#EEF2FF]",
          color: "text-[#5B50EC]",
          trendClass: "text-emerald-600 bg-emerald-50",
        }
      case "late":
        return {
          icon: Clock,
          bg: "bg-[#FFF8EC]",
          color: "text-[#F59E0B]",
          trendClass: "text-amber-600 bg-amber-50",
        }
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5">
      {stats.map((stat) => {
        const config = getIconAndColors(stat.iconType)
        const Icon = config.icon

        return (
          <div
            key={stat.id}
            className="bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-100 shadow-xs flex flex-col justify-between gap-2.5 transition-all hover:border-gray-200"
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-xl ${config.bg} ${config.color} flex items-center justify-center shrink-0`}
              >
                <Icon size={17} weight="bold" />
              </div>
              <span className="text-[11px] font-semibold text-gray-500 leading-tight">
                {stat.label}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xl sm:text-2xl font-bold text-gray-900 leading-none">
                {stat.value}
              </span>
              <div>
                <span
                  className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold ${config.trendClass}`}
                >
                  {stat.trend}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

