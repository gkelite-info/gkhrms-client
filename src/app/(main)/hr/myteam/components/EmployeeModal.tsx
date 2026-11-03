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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-xl overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2.5">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: color }}
            />
            <h3 className="text-base font-bold text-gray-900 tracking-tight">
              {title}
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-[#6D54E6] font-semibold">
              {employees.length} {employees.length === 1 ? "Employee" : "Employees"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-3">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="p-3.5 rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-xs transition-all bg-white flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={emp.avatar}
                  alt={emp.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-100 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">
                    {emp.name}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">
                    {emp.role} • <span className="text-gray-400">{emp.department}</span>
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1 truncate">
                      <EnvelopeSimple size={12} className="text-gray-400" />
                      {emp.email}
                    </span>
                    <span className="flex items-center gap-1 hidden sm:flex">
                      <MapPin size={12} className="text-gray-400" />
                      {emp.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span
                  className="inline-block text-[11px] font-medium px-2.5 py-1 rounded-full"
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
            <p className="text-center text-sm text-gray-400 py-6">
              No employees recorded for this status today.
            </p>
          )}
        </div>

        <div className="px-6 py-3 bg-gray-50/80 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#8571EE] text-white hover:bg-[#725ee0] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

