"use client"

import { Layers, Calendar, CheckCircle2, Clock } from "lucide-react"

export default function RecurringExpensesStatCards() {
  const cards = [
    {
      label: "Total Recurring Expenses",
      value: "₹ 10,89,500",
      subtext: "7 active items",
      icon: Layers,
      iconBg: "bg-[#EEF0FD]",
      iconColor: "text-[#5B50E5]",
    },
    {
      label: "Monthly Recurring Cost",
      value: "₹ 5,84,500",
      subtext: "of total recurring expenses",
      icon: Calendar,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Active Recurring Items",
      value: "6",
      subtext: "of 7 total items",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      label: "Upcoming This Month",
      value: "₹ 6,59,500",
      subtext: "5 items due in Dec 2026",
      icon: Clock,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => {
        const Icon = c.icon
        return (
          <div
            key={c.label}
            className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex items-center justify-between"
          >
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-500">
                {c.label}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
                {c.value}
              </span>
              <span className="text-[11px] text-slate-400 mt-1">
                {c.subtext}
              </span>
            </div>

            <div
              className={`w-11 h-11 rounded-xl ${c.iconBg} ${c.iconColor} flex items-center justify-center shrink-0 self-start sm:self-center`}
            >
              <Icon className="w-5 h-5" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
