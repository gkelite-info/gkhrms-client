"use client"

import {
  X,
  Clock,
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
} from "lucide-react"
import Image from "next/image"
import { EmployeeAttendanceRecord } from "./AttendanceData"

interface AttendanceDetailsModalProps {
  record: EmployeeAttendanceRecord | null
  onClose: () => void
}

export default function AttendanceDetailsModal({
  record,
  onClose,
}: AttendanceDetailsModalProps) {
  if (!record) return null

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl border border-slate-100 flex flex-col animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 shrink-0 relative">
              <Image
                src={record.avatar}
                alt={record.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                {record.name}
              </h3>
              <span className="text-[11px] text-slate-400">
                {record.employeeId} • {record.department}
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
                Attendance Date
              </span>
              <div className="text-base font-bold text-slate-800 mt-0.5">
                {record.date}
              </div>
            </div>
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                record.status === "Present"
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  : record.status === "WFH"
                  ? "bg-blue-50 text-blue-600 border border-blue-100"
                  : record.status === "On Leave"
                  ? "bg-amber-50 text-amber-600 border border-amber-100"
                  : "bg-rose-50 text-rose-500 border border-rose-100"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {record.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                Check-in
              </span>
              <div className="font-semibold text-slate-800 mt-1">
                {record.checkIn}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                Check-out
              </span>
              <div className="font-semibold text-slate-800 mt-1">
                {record.checkOut}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Working Hours
              </span>
              <div className="font-semibold text-slate-800 mt-1">
                {record.workingHours}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                Location
              </span>
              <div className="font-semibold text-slate-800 mt-1">
                {record.location}
              </div>
            </div>
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
