"use client"

import { FileText, Check, CreditCard } from "lucide-react"
import { ReimbursementActivityItem } from "../types"

interface AccountantReimbursementActivityProps {
  activities: ReimbursementActivityItem[]
  onViewAll?: () => void
}

export default function AccountantReimbursementActivity({
  activities,
  onViewAll,
}: AccountantReimbursementActivityProps) {
  const renderIcon = (type: ReimbursementActivityItem["type"]) => {
    switch (type) {
      case "submitted":
        return <FileText className="w-3.5 h-3.5 text-[#4F46E5]" />
      case "approved":
        return <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
      case "paid":
        return <CreditCard className="w-3.5 h-3.5 text-blue-600" />
      default:
        return <FileText className="w-3.5 h-3.5 text-slate-400" />
    }
  }

  const renderDotColor = (type: ReimbursementActivityItem["type"]) => {
    switch (type) {
      case "submitted":
        return "bg-[#4F46E5]"
      case "approved":
        return "bg-emerald-500"
      case "paid":
        return "bg-blue-500"
      default:
        return "bg-slate-400"
    }
  }

  const renderIconBg = (type: ReimbursementActivityItem["type"]) => {
    switch (type) {
      case "submitted":
        return "bg-indigo-50 border-indigo-100/60"
      case "approved":
        return "bg-emerald-50 border-emerald-100/60"
      case "paid":
        return "bg-blue-50 border-blue-100/60"
      default:
        return "bg-slate-50 border-slate-100"
    }
  }

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Recent Reimbursement Activity
        </h3>
        <button
          type="button"
          onClick={() => onViewAll?.()}
          className="text-xs font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors cursor-pointer"
        >
          View All Activity →
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {activities.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2 first:pt-0 last:pb-0"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${renderDotColor(
                  item.type
                )}`}
              />
              <div
                className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${renderIconBg(
                  item.type
                )}`}
              >
                {renderIcon(item.type)}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0 text-xs">
                <span className="font-bold text-slate-900 whitespace-nowrap">
                  {item.title}
                </span>
                <span className="text-slate-600 truncate">
                  {item.description}
                </span>
              </div>
            </div>

            <span className="text-[11px] text-slate-400 font-normal shrink-0 pl-5 sm:pl-0">
              {item.timestamp}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

