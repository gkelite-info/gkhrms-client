"use client"

import { UserPlus, ArrowLeft } from "lucide-react"

interface NewJoinersHeaderProps {
  onBack?: () => void
}

export default function NewJoinersHeader({ onBack }: NewJoinersHeaderProps) {
  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 border border-amber-100 flex items-center justify-center shrink-0">
          <UserPlus className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            New Joiners This Month
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            View and review employees who joined the organization this month.
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
