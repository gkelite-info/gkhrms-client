"use client"

import { useState } from "react"
import { UsersThree, X, Lightning, CheckCircle, Clock, HourglassHigh } from "phosphor-react"
import { HrAttendanceRecord } from "../data/hrAttendanceData"
import { STATUS_OPTIONS } from "./hrAttendanceColumnTypes"
import { ReusableDropdown, ReusableAvatar } from "@/components/reusableComponents"
import AttendanceTimePicker from "./AttendanceTimePicker"
import { calculateWorkingHours, validateAttendanceTimes } from "./attendanceTimeUtils"

interface HrAttendanceBulkUpdateModalProps {
  isOpen: boolean
  onClose: () => void
  selectedEmployees: HrAttendanceRecord[]
  onRemoveEmployee?: (id: string) => void
  onConfirm: (updates: { status: HrAttendanceRecord["status"]; checkIn?: string; checkOut?: string; workingHours?: string }) => void
}

export default function HrAttendanceBulkUpdateModal({
  isOpen,
  onClose,
  selectedEmployees,
  onRemoveEmployee,
  onConfirm,
}: HrAttendanceBulkUpdateModalProps) {
  const [status, setStatus] = useState<HrAttendanceRecord["status"]>("Present")
  const [updateTimings, setUpdateTimings] = useState(false)
  const [checkIn, setCheckIn] = useState("09:00 AM")
  const [checkOut, setCheckOut] = useState("06:00 PM")
  const [workingHours, setWorkingHours] = useState("9h 00m")
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const count = selectedEmployees.length
  const isLeaveOrAbsent = status === "Absent" || status === "On Leave"

  const handleInChange = (newIn: string) => {
    setCheckIn(newIn)
    const auto = calculateWorkingHours(newIn, checkOut)
    if (auto !== "-") setWorkingHours(auto)
  }

  const handleOutChange = (newOut: string) => {
    setCheckOut(newOut)
    const auto = calculateWorkingHours(checkIn, newOut)
    if (auto !== "-") setWorkingHours(auto)
  }

  const handleApply = () => {
    if (count === 0) return
    if (updateTimings && !isLeaveOrAbsent) {
      const v = validateAttendanceTimes(status, checkIn, checkOut)
      if (!v.isValid) { setError(v.error || "Please check time values"); return }
    }
    setError(null)
    onConfirm({
      status,
      ...(updateTimings
        ? isLeaveOrAbsent
          ? { checkIn: "-", checkOut: "-", workingHours: "0h 00m" }
          : { checkIn, checkOut, workingHours: workingHours || calculateWorkingHours(checkIn, checkOut) }
        : {}),
    })
  }

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-2.5 sm:p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg sm:max-w-xl max-h-[92vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shadow-2xs shrink-0">
              <UsersThree size={18} weight="bold" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 truncate">Bulk Update Attendance</h3>
              <p className="text-[10px] sm:text-[11px] text-gray-500 truncate">Updating {count} selected employee{count > 1 ? "s" : ""}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"><X size={18} weight="bold" /></button>
        </div>

        <div className="p-3.5 sm:p-5 flex-1 min-h-0 overflow-y-auto flex flex-col gap-3.5 sm:gap-4 custom-scrollbar">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-gray-700">Selected Employees ({count})</label>
              <span className="text-[10px] sm:text-[11px] text-gray-400">Click &times; to remove</span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 max-h-36 sm:max-h-48 overflow-y-auto p-2 sm:p-2.5 rounded-xl bg-gray-50/80 border border-gray-200/80 custom-scrollbar">
              {count > 0 ? (
                selectedEmployees.map((emp) => (
                  <div key={emp.id} className="flex items-center gap-1.5 bg-white pl-2 pr-1.5 py-1 rounded-lg border border-gray-200 text-xs font-medium text-gray-800 shadow-2xs hover:border-[#DDD9FD] transition-all">
                    <ReusableAvatar src={emp.avatar} alt={emp.name} name={emp.name} size="xs" fallbackType="icon" />
                    <span className="whitespace-nowrap font-semibold text-[11px] sm:text-xs">{emp.name}</span>
                    {onRemoveEmployee && (
                      <button type="button" onClick={() => onRemoveEmployee(emp.id)} className="w-4 h-4 rounded-full flex items-center justify-center text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer ml-0.5" title={`Remove ${emp.name}`} aria-label={`Remove ${emp.name}`}>
                        <X size={10} weight="bold" />
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="w-full py-4 text-center text-xs text-gray-400 font-medium">No employees selected.</div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">New Attendance Status</label>
            <ReusableDropdown value={status} options={STATUS_OPTIONS} onChange={(val) => setStatus(val)} placeholder="Select Status" align="left" buttonClassName="h-9 sm:h-10 px-3 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium text-gray-800 bg-white hover:bg-gray-50/50 justify-between w-full" />
          </div>

          {!isLeaveOrAbsent && (
            <div className={`rounded-2xl border transition-all ${updateTimings ? "bg-[#FAF9FF]/70 border-[#DDD9FD] p-3 sm:p-3.5" : "bg-gray-50/70 border-gray-200/80 p-3"}`}>
              <div onClick={() => setUpdateTimings(!updateTimings)} className="flex items-center justify-between cursor-pointer select-none">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${updateTimings ? "bg-[#EEF2FF] text-[#5B50EC]" : "bg-white text-gray-400 border border-gray-200 shadow-2xs"}`}>
                    <Clock size={16} weight="bold" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-800">Update Timings</span>
                    <span className="text-[10px] text-gray-400">Set check-in, check-out & working hours</span>
                  </div>
                </div>
                <div className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ${updateTimings ? "bg-[#5B50EC]" : "bg-gray-300"}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ${updateTimings ? "translate-x-4" : "translate-x-0"}`} />
                </div>
              </div>

              {updateTimings && (
                <div className="flex flex-col gap-2.5 pt-3 mt-3 border-t border-gray-200/60 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-bold text-gray-600">Check-in Time</span>
                      <AttendanceTimePicker value={checkIn} onChange={handleInChange} className="w-full" buttonClassName="w-full h-9 sm:h-10 px-3 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold text-gray-800 bg-white hover:bg-gray-50/50 justify-between shadow-2xs" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-bold text-gray-600">Check-out Time</span>
                      <AttendanceTimePicker value={checkOut} onChange={handleOutChange} className="w-full" buttonClassName="w-full h-9 sm:h-10 px-3 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold text-gray-800 bg-white hover:bg-gray-50/50 justify-between shadow-2xs" />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-gray-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
                        <HourglassHigh size={14} weight="bold" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[11px] font-bold text-gray-700">Total Working Hours</span>
                        <span className="text-[10px] text-gray-400 truncate">Auto-calculated, editable for break deduction</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                      <input type="text" value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} className="w-20 sm:w-22 h-8 px-2 text-center rounded-lg border border-gray-200 text-xs font-bold text-gray-900 bg-white focus:outline-none focus:border-[#5B50EC] focus:ring-1 focus:ring-[#5B50EC] shadow-2xs" placeholder="9h 00m" />
                      <button type="button" onClick={() => { const a = calculateWorkingHours(checkIn, checkOut); if (a !== "-") setWorkingHours(a) }} className="h-8 px-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-[#F3F2FD] text-[10px] font-bold text-gray-600 hover:text-[#5B50EC] transition-all cursor-pointer whitespace-nowrap">Auto-calc</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}

          <div className="bg-[#EEF2FF] border border-[#DDD9FD] rounded-xl p-3 flex items-start gap-2.5">
            <CheckCircle size={18} weight="fill" className="text-[#5B50EC] shrink-0 mt-0.5" />
            <div className="text-xs text-[#5B50EC]">
              <p className="font-bold">Confirmation Summary</p>
              <p className="text-[11px] text-[#4338CA] mt-0.5">
                All <strong>{count}</strong> selected employees will have their status updated to <strong>{status}</strong>
                {updateTimings && !isLeaveOrAbsent ? ` with timings ${checkIn} - ${checkOut} (${workingHours}).` : "."}
              </p>
            </div>
          </div>
        </div>

        <div className="px-3.5 py-3 sm:px-5 sm:py-3.5 border-t border-gray-100 flex items-center justify-end gap-2 bg-gray-50/50 shrink-0">
          <button type="button" onClick={onClose} className="h-9 px-3.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer shrink-0">Cancel</button>
          <button type="button" disabled={count === 0} onClick={handleApply} className={`h-9 px-3.5 text-xs font-semibold text-white bg-[#5B50EC] hover:bg-[#4E44D6] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${count === 0 ? "opacity-50 cursor-not-allowed" : ""}`}>
            <Lightning size={14} weight="bold" className="shrink-0" />
            <span>
              <span className="sm:hidden">Apply ({count})</span>
              <span className="hidden sm:inline">Apply to {count} Employee{count !== 1 ? "s" : ""}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
