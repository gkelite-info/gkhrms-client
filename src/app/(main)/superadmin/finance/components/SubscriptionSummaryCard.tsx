"use client"

import Link from "next/link"
import {
  Building2,
  CheckCircle2,
  Clock,
  XCircle,
  ShieldCheck,
} from "lucide-react"

interface SummaryMetric {
  id: string
  label: string
  sublabel?: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  iconContainerClass: string
  href?: string
}

const SUMMARY_METRICS: SummaryMetric[] = [
  {
    id: "total-companies",
    label: "Total Companies",
    value: 64,
    icon: Building2,
    iconContainerClass: "bg-blue-50 text-blue-600 border border-blue-100",
    href: "/superadmin/companies",
  },
  {
    id: "active-subscriptions",
    label: "Active Subscriptions",
    value: 64,
    icon: CheckCircle2,
    iconContainerClass: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    href: "/superadmin/finance/active-paid-companies",
  },
  {
    id: "expiring-soon",
    label: "Expiring Soon",
    sublabel: "(Next 30 Days)",
    value: 12,
    icon: Clock,
    iconContainerClass: "bg-amber-50 text-amber-600 border border-amber-100",
    href: "/superadmin/finance/active-paid-companies",
  },
  {
    id: "inactive-cancelled",
    label: "Inactive / Cancelled",
    value: 2,
    icon: XCircle,
    iconContainerClass: "bg-rose-50 text-rose-500 border border-rose-100",
  },
]

export default function SubscriptionSummaryCard() {
  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-[#EEF0FD] flex items-center justify-center text-[#5B50E5]">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          Subscription Summary
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 items-stretch">
        {SUMMARY_METRICS.map((metric) => {
          const IconComponent = metric.icon
          const content = (
            <div
              className={`bg-slate-50/50 border border-slate-100/80 rounded-xl p-4 flex flex-col justify-between transition-all h-full ${
                metric.href
                  ? "hover:bg-slate-50 hover:border-[#5B50E5]/30 cursor-pointer group"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform ${metric.iconContainerClass} ${
                    metric.href ? "group-hover:scale-105" : ""
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-medium text-slate-500 block leading-tight group-hover:text-slate-700 transition-colors">
                    {metric.label}
                  </span>
                  {metric.sublabel && (
                    <span className="text-[10px] text-slate-400 font-medium block">
                      {metric.sublabel}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-800 mt-2 group-hover:text-[#5B50E5] transition-colors">
                {metric.value}
              </div>
            </div>
          )

          if (metric.href) {
            return (
              <Link key={metric.id} href={metric.href} className="block h-full">
                {content}
              </Link>
            )
          }

          return <div key={metric.id}>{content}</div>
        })}
      </div>
    </div>
  )
}

