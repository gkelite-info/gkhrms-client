"use client"

import { Package, Calendar, CheckCircle2, Clock } from "lucide-react"

export default function ExpensesStatCards() {
  const cards = [
    {
      label: "Total Expenses",
      value: "₹ 18,75,000",
      change: "+8.4%",
      subtext: "vs ₹ 17,30,000 (Oct 2026)",
      icon: Package,
      iconBg: "bg-[#EEF0FD]",
      iconColor: "text-[#5B50E5]",
    },
    {
      label: "This Month's Spend",
      value: "₹ 3,25,000",
      change: "+5.2%",
      subtext: "vs ₹ 3,43,000 (Oct 2026)",
      icon: Calendar,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Paid Expenses",
      value: "₹ 16,20,000",
      subtext: "86.4% of total",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      label: "Unpaid Expenses",
      value: "₹ 2,55,000",
      subtext: "13.6% of total",
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
            className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-2">
              <div
                className={`w-10 h-10 rounded-xl ${c.iconBg} ${c.iconColor} flex items-center justify-center shrink-0`}
              >
                <Icon className="w-5 h-5" />
              </div>
              {c.change && (
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100/90 px-2 py-0.5 rounded-full">
                  {c.change}
                </span>
              )}
            </div>

            <div className="flex flex-col mt-3">
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
          </div>
        )
      })}
    </div>
  )
}
