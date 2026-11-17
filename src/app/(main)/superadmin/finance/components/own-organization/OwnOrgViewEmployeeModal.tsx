"use client"

import {
  X,
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  MapPin,
  Calendar,
  CheckCircle2,
} from "lucide-react"
import Image from "next/image"
import { OwnOrgEmployee } from "./OwnOrgEmployeesData"

interface OwnOrgViewEmployeeModalProps {
  employee: OwnOrgEmployee | null
  onClose: () => void
}

export default function OwnOrgViewEmployeeModal({
  employee,
  onClose,
}: OwnOrgViewEmployeeModalProps) {
  if (!employee) return null

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl border border-slate-100 flex flex-col animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 shrink-0 relative">
              {employee.avatar ? (
                <Image
                  src={employee.avatar}
                  alt={employee.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-slate-600">
                  {employee.name[0]}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                {employee.name}
              </h3>
              <span className="text-[11px] text-slate-400">
                Employee ID: {employee.employeeId}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4 text-xs overflow-y-auto max-h-[calc(85vh-120px)]">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-medium">
                Current Role
              </span>
              <div className="text-base font-bold text-slate-800 mt-0.5">
                {employee.designation}
              </div>
              <span className="text-[11px] text-slate-500">
                {employee.department}
              </span>
            </div>
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                employee.status === "Active"
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  : employee.status === "On Leave"
                  ? "bg-amber-50 text-amber-600 border border-amber-100"
                  : "bg-rose-50 text-rose-500 border border-rose-100"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {employee.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Building2 className="w-3 h-3 text-slate-400" />
                Department
              </span>
              <div className="font-semibold text-slate-800 mt-1">
                {employee.department}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-slate-400" />
                Designation
              </span>
              <div className="font-semibold text-slate-800 mt-1">
                {employee.designation}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                Work Location
              </span>
              <div className="font-semibold text-slate-800 mt-1">
                {employee.location}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Joining Date
              </span>
              <div className="font-semibold text-slate-800 mt-1">
                {employee.joiningDate}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-slate-600">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{employee.email}</span>
            </div>
            {employee.phone && (
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{employee.phone}</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
