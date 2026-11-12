"use client"

import { Plus, CreditCard, RotateCcw } from "lucide-react"
import { RecentActivity } from "../types"

interface RecentActivityCardProps {
  activities: RecentActivity[]
  onViewAll?: () => void
}

export default function RecentActivityCard({
  activities,
  onViewAll,
}: RecentActivityCardProps) {
  const renderIcon = (type: RecentActivity["type"]) => {
    switch (type) {
      case "expense":
        return (
          <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </div>
        )
      case "payment":
        return (
          <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <CreditCard className="w-3.5 h-3.5" />
          </div>
        )
      case "reimbursement":
        return (
          <div className="w-7 h-7 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <RotateCcw className="w-3.5 h-3.5" />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Recent Finance Activity
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#4F46E5] hover:underline cursor-pointer"
        >
          View All
        </button>
      </div>

      <div className="flex flex-col divide-y divide-slate-100/80">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between py-2.5 first:pt-1 last:pb-1 gap-3"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {renderIcon(activity.type)}
              <span className="text-xs sm:text-[13px] font-medium text-slate-800 truncate">
                {activity.description}
              </span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 shrink-0 text-right">
              <span className="text-xs sm:text-[13px] font-bold text-slate-900 min-w-[75px] text-right">
                {activity.amount}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium min-w-[70px] text-right">
                {activity.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

