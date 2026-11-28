"use client"

import { Building2, CheckCircle2, Hourglass, AlertCircle } from "lucide-react"

interface TeamsStatsProps {
  totalCount?: number
  activeCount?: number
  expiringCount?: number
  inactiveCount?: number
}

export default function TeamsStats({
  totalCount = 24,
  activeCount = 22,
  expiringCount = 1,
  inactiveCount = 1,
}: TeamsStatsProps) {
  const stats = [
    {
      id: "total",
      label: "Total Companies",
      value: totalCount,
      icon: Building2,
      iconWrapperClass: "bg-[#F3F0FF] text-[#5046E5] rounded-xl",
    },
    {
      id: "active",
      label: "Active Companies",
      value: activeCount,
      icon: CheckCircle2,
      iconWrapperClass: "bg-[#ECFDF5] text-[#10B981] rounded-full",
    },
    {
      id: "expiring",
      label: "Expiring Soon",
      value: expiringCount,
      icon: Hourglass,
      iconWrapperClass: "bg-[#FFFBEB] text-[#F59E0B] rounded-xl",
    },
    {
      id: "inactive",
      label: "Inactive",
      value: inactiveCount,
      icon: AlertCircle,
      iconWrapperClass: "bg-[#FEF2F2] text-[#EF4444] rounded-full",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6">
      {stats.map((stat) => {
        const IconComponent = stat.icon
        return (
          <div
            key={stat.id}
            className="border border-slate-100/90 rounded-2xl p-4 sm:p-5 flex items-center gap-4 bg-[#FAFAFD] hover:bg-white hover:border-slate-200 transition-all"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center shrink-0 ${stat.iconWrapperClass}`}
            >
              <IconComponent className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-[28px] font-bold text-slate-900 leading-tight">
                {stat.value}
              </span>
              <span className="text-xs text-slate-500 font-medium mt-0.5">
                {stat.label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
