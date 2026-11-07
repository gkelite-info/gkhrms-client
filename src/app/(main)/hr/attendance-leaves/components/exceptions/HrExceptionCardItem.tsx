"use client"

import { useState } from "react"
import {
  Clock,
  SignOut,
  ChartBar,
  CalendarBlank,
} from "phosphor-react"
import { ReusableAvatar } from "@/components/reusableComponents"
import { HrExceptionItem, ExceptionType } from "./hrExceptionData"

interface HrExceptionCardItemProps {
  item: HrExceptionItem
  onViewDetails: (item: HrExceptionItem) => void
}

const BADGE_MAP: Record<ExceptionType, { icon: any; bg: string; text: string; border: string }> = {
  "Late Check-in": { icon: Clock, bg: "bg-[#FFF1F2]", text: "text-[#EF4444]", border: "border-rose-100" },
  "Missed Check-out": { icon: SignOut, bg: "bg-[#FFFBEB]", text: "text-[#F59E0B]", border: "border-amber-100" },
  "Low Working Hours": { icon: ChartBar, bg: "bg-[#EFF6FF]", text: "text-[#3B82F6]", border: "border-blue-100" },
  "Repeated Absences": { icon: CalendarBlank, bg: "bg-[#FAF5FF]", text: "text-[#A855F7]", border: "border-purple-100" },
}

export default function HrExceptionCardItem({
  item,
  onViewDetails,
}: HrExceptionCardItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isLongReason = Boolean(
    item.reason && (item.reason.length > 100 || item.reason.includes("\n"))
  )

  const badge = BADGE_MAP[item.exceptionType] || BADGE_MAP["Late Check-in"]
  const BadgeIcon = badge.icon

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs hover:border-[#5B50EC]/30 hover:shadow-sm transition-all flex flex-col gap-3.5 min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
        <div className="flex items-center gap-3.5 min-w-0">
          <ReusableAvatar
            src={item.avatar}
            name={item.name}
            alt={item.name}
            size={44}
            shape="circle"
            fallbackType="icon"
            bgColor="#F1F0FD"
            textColor="#5B50EC"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-gray-900 leading-tight">
              {item.name}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mt-0.5 flex-wrap">
              <span className="font-mono text-gray-400 font-semibold">{item.employeeId}</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-600">{item.designation}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 self-start sm:self-auto flex-wrap">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}
          >
            <BadgeIcon size={13} weight="bold" />
            <span>{item.exceptionType}</span>
          </span>

          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-2xs ${
              item.status === "Regularized"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-amber-50 text-amber-700 border-amber-200"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                item.status === "Regularized" ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            {item.status}
          </span>

          <button
            type="button"
            onClick={() => onViewDetails(item)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#5B50EC] bg-[#EEF2FF] hover:bg-[#5B50EC] hover:text-white transition-all cursor-pointer shadow-xs active:scale-95 whitespace-nowrap"
          >
            View Details
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-3 rounded-xl bg-gray-50/60 border border-gray-100/80 min-w-0">
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap">
            {item.exceptionType === "Late Check-in"
              ? "Check-in Time"
              : item.exceptionType === "Missed Check-out"
              ? "Check-in Time / Out"
              : item.exceptionType === "Low Working Hours"
              ? "Working Hours"
              : "Absence Duration"}
          </span>
          <span className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5 whitespace-nowrap">
            {item.checkInTime}
          </span>
          {item.checkInSubtitle && (
            <span
              className={`text-[11px] font-semibold mt-0.5 break-words ${
                item.exceptionType === "Late Check-in"
                  ? "text-rose-500"
                  : item.exceptionType === "Low Working Hours"
                  ? "text-blue-500"
                  : "text-gray-400"
              }`}
            >
              {item.checkInSubtitle}
            </span>
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap">
            Date
          </span>
          <span className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5 whitespace-nowrap">
            {item.date}
          </span>
          <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap">
            {item.day}
          </span>
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap">
            Department
          </span>
          <span className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5 whitespace-nowrap">
            {item.department}
          </span>
          <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap">
            {item.team}
          </span>
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap">
            Manager
          </span>
          <span className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5 whitespace-nowrap">
            {item.manager}
          </span>
        </div>
      </div>

      {item.reason && (
        <div className="rounded-xl bg-gray-50/70 p-3.5 border border-gray-100 flex flex-col gap-1.5 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Reason for Exception
          </span>
          <div className="text-xs text-gray-700 font-medium leading-relaxed break-words whitespace-pre-wrap">
            {isExpanded || !isLongReason ? (
              item.reason
            ) : (
              <span className="line-clamp-2">{item.reason}</span>
            )}
          </div>
          {isLongReason && (
            <div className="pt-2 mt-1 border-t border-gray-100/70">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[#5B50EC] font-semibold hover:underline cursor-pointer inline-flex items-center gap-1 text-xs transition-colors"
              >
                {isExpanded ? "Show less" : "Read full reason"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
