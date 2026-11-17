"use client"

import {
  Wallet,
  Calendar,
  Building2,
  TrendingUp,
} from "lucide-react"

interface MetricCard {
  id: string
  label: string
  value: string
  subtext: string
  subtextHighlight?: boolean
  icon: React.ComponentType<{ className?: string }>
  iconContainerClass: string
}

const STAT_CARDS: MetricCard[] = [
  {
    id: "total-amount",
    label: "Total Amount Received",
    value: "₹ 24,80,000",
    subtext: "+18.4% vs previous period",
    subtextHighlight: true,
    icon: Wallet,
    iconContainerClass: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  },
  {
    id: "payments-this-month",
    label: "Payments This Month",
    value: "6 Payments",
    subtext: "+12.8% vs last month",
    subtextHighlight: true,
    icon: Calendar,
    iconContainerClass: "bg-indigo-50 text-indigo-600 border border-indigo-100",
  },
  {
    id: "companies-paid",
    label: "Companies Paid",
    value: "6",
    subtext: "of 6 total companies",
    subtextHighlight: false,
    icon: Building2,
    iconContainerClass: "bg-blue-50 text-blue-600 border border-blue-100",
  },
]

export default function MoneyReceivedStatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {STAT_CARDS.map((card) => {
        const IconComponent = card.icon
        return (
          <div
            key={card.id}
            className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${card.iconContainerClass}`}
              >
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3">
              <span className="text-xs font-medium text-slate-400 block">
                {card.label}
              </span>
              <div className="text-xl font-bold text-slate-800 tracking-tight mt-1">
                {card.value}
              </div>
              <div className="mt-2 text-[11px] font-medium flex items-center gap-1">
                {card.subtextHighlight ? (
                  <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                    {card.subtext}
                  </span>
                ) : (
                  <span className="text-slate-400">{card.subtext}</span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

