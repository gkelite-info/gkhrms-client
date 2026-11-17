"use client"

import { FileText, Calendar } from "lucide-react"

interface MetricCard {
  id: string
  label: string
  value: string
  subtext: string
  icon: React.ComponentType<{ className?: string }>
  iconContainerClass: string
}

const STAT_CARDS: MetricCard[] = [
  {
    id: "total-pending",
    label: "Total Pending",
    value: "₹ 4,20,000",
    subtext: "5 Companies",
    icon: FileText,
    iconContainerClass: "bg-[#EEF0FD] text-[#5B50E5]",
  },
  {
    id: "this-month-due",
    label: "This Month Due",
    value: "₹ 2,40,000",
    subtext: "3 Companies",
    icon: Calendar,
    iconContainerClass: "bg-[#EFF6FF] text-[#3B82F6]",
  },
]

export default function PendingPaymentsStatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {STAT_CARDS.map((card) => {
        const IconComponent = card.icon
        return (
          <div
            key={card.id}
            className="bg-white border border-slate-100/90 rounded-2xl p-6 shadow-xs flex items-center gap-5 transition-shadow hover:shadow-sm"
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${card.iconContainerClass}`}
            >
              <IconComponent className="w-5 h-5" />
            </div>

            <div>
              <span className="text-xs font-medium text-slate-500 block">
                {card.label}
              </span>
              <div className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">
                {card.value}
              </div>
              <span className="text-xs font-medium text-slate-400 mt-1 block">
                {card.subtext}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
