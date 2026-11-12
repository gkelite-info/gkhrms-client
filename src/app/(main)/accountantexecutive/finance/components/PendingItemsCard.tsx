"use client"

import { FileText, RotateCcw, CreditCard } from "lucide-react"
import { PendingItem } from "../types"

interface PendingItemsCardProps {
  items: PendingItem[]
}

export default function PendingItemsCard({ items }: PendingItemsCardProps) {
  const renderIcon = (type: PendingItem["iconType"]) => {
    switch (type) {
      case "expense-entries":
        return <FileText className="w-4 h-4 text-purple-600" />
      case "reimbursements":
        return <RotateCcw className="w-4 h-4 text-purple-600" />
      case "payments":
        return <CreditCard className="w-4 h-4 text-purple-600" />
      default:
        return <FileText className="w-4 h-4 text-purple-600" />
    }
  }

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex flex-col justify-between">
      <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight mb-3">
        Pending Items
      </h2>

      <div className="flex flex-col divide-y divide-slate-100/80">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-3.5 first:pt-1 last:pb-1 gap-3"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                {renderIcon(item.iconType)}
              </div>
              <span className="text-xs sm:text-[13px] font-semibold text-slate-800 truncate">
                {item.title}
              </span>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <span className="text-xs sm:text-[13px] font-bold text-slate-900">
                {item.amount}
              </span>
              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center">
                {item.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

