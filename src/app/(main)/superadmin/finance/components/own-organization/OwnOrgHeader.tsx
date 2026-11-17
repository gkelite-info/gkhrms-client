"use client"

import { Plus } from "lucide-react"

interface OwnOrgHeaderProps {
  onAddEmployee: () => void
}

export default function OwnOrgHeader({ onAddEmployee }: OwnOrgHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Employees
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Manage your organization&apos;s employees, view details, and take quick actions.
        </p>
      </div>

      <button
        type="button"
        onClick={onAddEmployee}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#5B50E5] hover:bg-[#4E44C9] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
      >
        <Plus className="w-4 h-4" />
        Add Employee
      </button>
    </div>
  )
}
