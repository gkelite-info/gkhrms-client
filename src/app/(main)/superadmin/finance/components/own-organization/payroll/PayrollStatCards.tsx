"use client"

import { Users, CreditCard, CheckCircle2, Clock } from "lucide-react"

export default function PayrollStatCards() {
  const cards = [
    {
      label: "Total Employees",
      value: "248",
      icon: Users,
      iconBg: "bg-[#EEF0FD]",
      iconColor: "text-[#5B50E5]",
    },
    {
      label: "Total Payroll Amount",
      value: "₹ 1,42,80,000",
      icon: CreditCard,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      label: "Processed Payroll",
      value: "₹ 1,42,80,000",
      icon: CheckCircle2,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Pending Payroll",
      value: "₹ 0",
      icon: Clock,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
      badge: "0 Pending",
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
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {c.value}
                </span>
                {c.badge && (
                  <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full">
                    {c.badge}
                  </span>
                )}
              </div>
            </div>

            <div
              className={`w-11 h-11 rounded-xl ${c.iconBg} ${c.iconColor} flex items-center justify-center shrink-0`}
            >
              <Icon className="w-5 h-5" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
