"use client"

import {
  Bell,
  Calendar,
  TrendingUp,
  Building2,
  Briefcase,
  FileText,
} from "lucide-react"
import { KEY_ALERTS_DATA } from "./ChairmanDashboardData"

export default function ChairmanKeyAlertsCard() {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "calendar":
        return Calendar
      case "trending":
        return TrendingUp
      case "building":
        return Building2
      case "briefcase":
        return Briefcase
      case "survey":
        return FileText
      default:
        return Bell
    }
  }

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100/80 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5B50E5] flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            Key Alerts & Updates
          </h2>
        </div>

        <button
          type="button"
          className="text-xs font-semibold text-[#5B50E5] hover:text-[#4E44C9] transition-colors cursor-pointer"
        >
          View All
        </button>
      </div>

      <div className="flex flex-col divide-y divide-slate-100/80">
        {KEY_ALERTS_DATA.map((item) => {
          const IconComponent = getAlertIcon(item.iconType)

          return (
            <div
              key={item.id}
              className="py-3 first:pt-1 last:pb-1 flex items-center justify-between gap-3 hover:bg-slate-50/50 -mx-2 px-2 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.iconBg} ${item.iconColor}`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-slate-800 truncate">
                  {item.title}
                </span>
              </div>

              <span className="text-[11px] text-slate-400 font-normal shrink-0 whitespace-nowrap">
                {item.timeAgo}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
