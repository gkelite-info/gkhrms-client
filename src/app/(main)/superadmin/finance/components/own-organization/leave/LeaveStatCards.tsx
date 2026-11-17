"use client"

import {
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  CalendarDays,
} from "lucide-react"
import { LeaveRecord } from "./LeaveData"

interface LeaveStatCardsProps {
  records?: LeaveRecord[]
}

export default function LeaveStatCards({ records }: LeaveStatCardsProps) {
  const total = records ? records.length : 42
  const approved = records
    ? records.filter((r) => r.status === "Approved").length
    : 26
  const pending = records
    ? records.filter((r) => r.status === "Pending").length
    : 8
  const rejected = records
    ? records.filter((r) => r.status === "Rejected").length
    : 4
  const onLeaveToday = records
    ? records.filter((r) => r.isOnLeaveToday).length
    : 4

  const approvedPct = total > 0 ? ((approved / total) * 100).toFixed(1) + "%" : "0%"
  const pendingPct = total > 0 ? ((pending / total) * 100).toFixed(1) + "%" : "0%"
  const rejectedPct = total > 0 ? ((rejected / total) * 100).toFixed(1) + "%" : "0%"

  const cards = [
    {
      id: "total",
      label: "Total Requests",
      value: total,
      badge: null,
      icon: Calendar,
      iconContainer: "bg-purple-50/80 text-purple-600 border border-purple-100",
    },
    {
      id: "approved",
      label: "Approved",
      value: approved,
      badge: {
        text: approvedPct,
        style: "bg-emerald-50 text-emerald-600 border border-emerald-200/60",
      },
      icon: CheckCircle2,
      iconContainer: "bg-emerald-50/80 text-emerald-600 border border-emerald-100",
    },
    {
      id: "pending",
      label: "Pending",
      value: pending,
      badge: {
        text: pendingPct,
        style: "bg-amber-50 text-amber-600 border border-amber-200/60",
      },
      icon: Clock,
      iconContainer: "bg-amber-50/80 text-amber-500 border border-amber-100",
    },
    {
      id: "rejected",
      label: "Rejected",
      value: rejected,
      badge: {
        text: rejectedPct,
        style: "bg-rose-50 text-rose-600 border border-rose-200/60",
      },
      icon: XCircle,
      iconContainer: "bg-rose-50/80 text-rose-500 border border-rose-100",
    },
    {
      id: "on-leave",
      label: "On Leave Today",
      value: onLeaveToday,
      badge: null,
      icon: CalendarDays,
      iconContainer: "bg-sky-50/80 text-sky-600 border border-sky-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
        const IconComponent = card.icon

        return (
          <div
            key={card.id}
            className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex items-center gap-4"
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${card.iconContainer}`}
            >
              <IconComponent className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-medium text-slate-500 truncate leading-tight">
                  {card.label}
                </span>
                {card.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-semibold leading-none shrink-0 ${card.badge.style}`}
                  >
                    {card.badge.text}
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                {card.value}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
