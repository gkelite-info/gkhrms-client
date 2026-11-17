"use client"

import {
  Users,
  CheckCircle2,
  Clock,
  Laptop,
  XCircle,
} from "lucide-react"

export default function AttendanceStatCards() {
  const cards = [
    {
      id: "total",
      label: "Total Employees",
      value: 248,
      icon: Users,
      iconContainer: "bg-purple-50/80 text-purple-600 border border-purple-100",
    },
    {
      id: "present",
      label: "Present Today",
      value: 202,
      icon: CheckCircle2,
      iconContainer: "bg-emerald-50/80 text-emerald-600 border border-emerald-100",
    },
    {
      id: "on-leave",
      label: "On Leave",
      value: 8,
      icon: Clock,
      iconContainer: "bg-amber-50/80 text-amber-600 border border-amber-100",
    },
    {
      id: "wfh",
      label: "Work From Home",
      value: 16,
      icon: Laptop,
      iconContainer: "bg-blue-50/80 text-blue-600 border border-blue-100",
    },
    {
      id: "absent",
      label: "Absent",
      value: 22,
      icon: XCircle,
      iconContainer: "bg-rose-50/80 text-rose-500 border border-rose-100",
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

            <div>
              <span className="text-xs font-medium text-slate-500 block leading-tight">
                {card.label}
              </span>
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
