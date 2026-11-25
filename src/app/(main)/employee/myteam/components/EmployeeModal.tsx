"use client"

import { X, EnvelopeSimple, MapPin } from "phosphor-react"

export interface StatusEmployee {
  id: number
  name: string
  role: string
  department: string
  email: string
  phone: string
  location: string
  avatar: string
  statusDetail: string
  time?: string
}

interface EmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  color: string
  employees: StatusEmployee[]
}

export default function EmployeeModal({
  isOpen,
  onClose,
  title,
  color,
  employees,
}: EmployeeModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-gray-50/50 shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 pr-2">
            <span
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0"
              style={{ backgroundColor: color }}
            />
            <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight truncate">
              {title}
            </h3>
            <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-purple-100 text-[#6D54E6] font-semibold shrink-0">
              {employees.length} {employees.length === 1 ? "Employee" : "Employees"}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="p-3.5 sm:p-5 overflow-y-auto space-y-2.5 sm:space-y-3 flex-1 min-h-0">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="p-3 sm:p-3.5 rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-xs transition-all bg-white flex items-center justify-between gap-2.5 sm:gap-3"
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <img
                  src={emp.avatar}
                  alt={emp.name}
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-purple-100 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                    {emp.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-500 truncate">
                    {emp.role} • <span className="text-gray-400">{emp.department}</span>
                  </p>
                  <div className="flex items-center gap-2 sm:gap-3 mt-0.5 text-[10px] sm:text-[11px] text-gray-500">
                    <span className="flex items-center gap-1 truncate">
                      <EnvelopeSimple size={12} className="text-gray-400 shrink-0" />
                      <span className="truncate">{emp.email}</span>
                    </span>
                    <span className="items-center gap-1 hidden sm:flex shrink-0">
                      <MapPin size={12} className="text-gray-400 shrink-0" />
                      <span>{emp.location}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span
                  className="inline-block text-[10px] sm:text-[11px] font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full"
                  style={{
                    backgroundColor: `${color}18`,
                    color: color,
                  }}
                >
                  {emp.statusDetail}
                </span>
                {emp.time && (
                  <p className="text-[10px] text-gray-400 mt-0.5">{emp.time}</p>
                )}
              </div>
            </div>
          ))}

          {employees.length === 0 && (
            <p className="text-center text-xs sm:text-sm text-gray-400 py-6">
              No employees recorded for this status today.
            </p>
          )}
        </div>

        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-50/80 border-t border-gray-100 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 sm:px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#8571EE] text-white hover:bg-[#725ee0] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
