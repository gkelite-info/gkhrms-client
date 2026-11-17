"use client"

import {
  Wallet,
  CheckCircle2,
  Building2,
  RotateCcw,
  TrendingUp,
} from "lucide-react"

export default function MonthlyRevenueStatCards() {
  const cards = [
    {
      id: "total-revenue",
      label: "Total Revenue This Year",
      value: "₹ 51,80,000",
      trend: "+18.6% vs previous year",
      trendColor: "text-emerald-600",
      icon: Wallet,
      iconContainer: "bg-indigo-50/70 border border-indigo-100 text-[#5B50E5]",
    },
    {
      id: "net-revenue",
      label: "Net Revenue",
      value: "₹ 49,72,000",
      trend: "+19.1% vs previous year",
      trendColor: "text-emerald-600",
      icon: CheckCircle2,
      iconContainer: "bg-emerald-50/70 border border-emerald-100 text-emerald-600",
    },
    {
      id: "companies-paid",
      label: "Companies Paid This Month",
      value: "56",
      trend: "+12.0% vs last month",
      trendColor: "text-emerald-600",
      icon: Building2,
      iconContainer: "bg-blue-50/70 border border-blue-100 text-blue-600",
    },
    {
      id: "refund-amount",
      label: "Refund Amount",
      value: "₹ 2,08,000",
      trend: "+4.5% vs previous year",
      trendColor: "text-rose-500",
      icon: RotateCcw,
      iconContainer: "bg-amber-50/70 border border-amber-100 text-amber-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const IconComponent = card.icon

        return (
          <div
            key={card.id}
            className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-medium text-slate-500 block leading-tight">
                  {card.label}
                </span>
                <div className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                  {card.value}
                </div>
              </div>

              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${card.iconContainer}`}
              >
                <IconComponent className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1 text-[11px] font-medium">
              <span className={`font-semibold flex items-center gap-0.5 ${card.trendColor}`}>
                <TrendingUp className="w-3 h-3" />
                {card.trend}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
