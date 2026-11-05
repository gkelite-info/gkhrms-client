"use client"

import { X, Building2, UserCheck, Users, Layers, ShieldCheck } from "lucide-react"
import { DepartmentRecord } from "../types"

interface ViewDepartmentModalProps {
  department: DepartmentRecord | null
  onClose: () => void
  onEdit?: (dept: DepartmentRecord) => void
}

export default function ViewDepartmentModal({
  department,
  onClose,
  onEdit,
}: ViewDepartmentModalProps) {
  if (!department) return null

  const initials = department.code.substring(0, 2).toUpperCase()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[75vh] sm:max-h-[80vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100 bg-white shrink-0">
          <h2 className="text-sm sm:text-base font-bold text-slate-900">
            Department Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5 flex-1 overflow-y-auto">
          <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] text-[#4F46E5] font-bold text-sm flex items-center justify-center shrink-0">
              {initials}
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-slate-900 text-base">
                {department.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-slate-500 font-medium">
                  Code: {department.code}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                    department.status === "Active"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-rose-50 text-rose-600"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      department.status === "Active"
                        ? "bg-emerald-500"
                        : "bg-rose-500"
                    }`}
                  />
                  {department.status}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3.5 text-xs text-slate-700">
            <div className="flex items-center gap-3">
              <UserCheck className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">
                  Department Head
                </span>
                <span className="font-semibold text-slate-800">
                  {department.departmentHead}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">
                  Total Employees
                </span>
                <span className="font-semibold text-slate-800">
                  {department.employees} Employees Assigned
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">
                  Designations
                </span>
                <span className="font-semibold text-slate-800">
                  {department.designations} Active Designations
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">
                  Organization Scope
                </span>
                <span className="font-semibold text-slate-800">
                  Managed under GK-HRMS Enterprise
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-3.5 border-t border-slate-100 bg-white shrink-0">
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(department)}
              className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium rounded-xl transition-colors cursor-pointer"
            >
              Edit Department
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-medium rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

