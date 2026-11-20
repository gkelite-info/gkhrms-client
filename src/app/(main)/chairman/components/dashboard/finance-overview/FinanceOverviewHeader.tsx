"use client"

import { BarChart2, ArrowLeft } from "lucide-react"

interface FinanceOverviewHeaderProps {
  onBack?: () => void
}

export default function FinanceOverviewHeader({
  onBack,
}: FinanceOverviewHeaderProps) {
  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#5B50E5] border border-purple-100 flex items-center justify-center shrink-0">
          <BarChart2 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Finance Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            View and analyze organization-wide expense trends over time.
          </p>
        </div>
      </div>

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="h-9 px-3.5 bg-slate-50 border border-slate-200/90 hover:bg-[#EEF0FD] hover:text-[#5B50E5] text-slate-600 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
      )}
    </div>
  )
}
