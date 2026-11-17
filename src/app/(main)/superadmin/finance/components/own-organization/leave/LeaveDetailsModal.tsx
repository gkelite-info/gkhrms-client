"use client"

import { useState, useEffect } from "react"
import {
  X,
  Calendar,
  Check,
  Clock,
  Home,
  HeartPulse,
  Briefcase,
  ShieldCheck,
} from "lucide-react"
import { LeaveRecord, LeaveType } from "./LeaveData"

interface LeaveDetailsModalProps {
  record: LeaveRecord | null
  onClose: () => void
  onUpdateRecord?: (updated: LeaveRecord) => void
}

export default function LeaveDetailsModal({
  record,
  onClose,
  onUpdateRecord,
}: LeaveDetailsModalProps) {
  const [remarks, setRemarks] = useState("")

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  if (!record) return null

  const handleApprove = () => {
    if (!onUpdateRecord) return
    const updated: LeaveRecord = {
      ...record,
      status: "Approved",
      reviewedBy: "Eleanor Vance (Super Admin)",
      reviewedOn: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      reviewerRemarks: remarks.trim() || "Approved by Super Admin",
    }
    onUpdateRecord(updated)
    onClose()
  }

  const handleReject = () => {
    if (!onUpdateRecord) return
    const updated: LeaveRecord = {
      ...record,
      status: "Rejected",
      reviewedBy: "Eleanor Vance (Super Admin)",
      reviewedOn: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      reviewerRemarks: remarks.trim() || "Rejected by Super Admin",
    }
    onUpdateRecord(updated)
    onClose()
  }

  const renderLeaveTypeIcon = (type: LeaveType) => {
    switch (type) {
      case "Annual Leave":
        return <Calendar className="w-3.5 h-3.5" />
      case "Work From Home":
        return <Home className="w-3.5 h-3.5" />
      case "Sick Leave":
        return <HeartPulse className="w-3.5 h-3.5" />
      case "Casual Leave":
        return <Briefcase className="w-3.5 h-3.5" />
      default:
        return <Calendar className="w-3.5 h-3.5" />
    }
  }

  const getLeaveTypeStyle = (type: LeaveType) => {
    switch (type) {
      case "Annual Leave":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "Work From Home":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Sick Leave":
        return "bg-rose-50 text-rose-700 border-rose-200"
      case "Casual Leave":
        return "bg-amber-50 text-amber-700 border-amber-200"
      default:
        return "bg-slate-50 text-slate-700 border-slate-200"
    }
  }

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl border border-slate-100 flex flex-col animate-in fade-in zoom-in-95 duration-150 overflow-hidden max-h-[90vh]">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${record.avatarColor}`}
            >
              {record.avatarInitials}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                {record.employeeName}
              </h3>
              <span className="text-[11px] text-slate-400">
                {record.employeeId} • {record.designation} • {record.department}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4 text-xs overflow-y-auto">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                Leave Request ID
              </span>
              <div className="text-base font-bold text-slate-800 mt-0.5">
                {record.id}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getLeaveTypeStyle(
                  record.leaveType
                )}`}
              >
                {renderLeaveTypeIcon(record.leaveType)}
                {record.leaveType}
              </span>

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                  record.status === "Approved"
                    ? "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]/60"
                    : record.status === "Pending"
                    ? "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]/60"
                    : record.status === "Rejected"
                    ? "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]/60"
                    : "bg-slate-100 text-slate-600 border-slate-200"
                }`}
              >
                {record.status === "Approved" && (
                  <Check className="w-3.5 h-3.5 text-[#059669]" />
                )}
                {record.status === "Pending" && (
                  <Clock className="w-3.5 h-3.5 text-[#D97706]" />
                )}
                {record.status === "Rejected" && (
                  <X className="w-3.5 h-3.5 text-[#DC2626]" />
                )}
                {record.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Duration
              </span>
              <div className="font-semibold text-slate-800 mt-1">
                {record.duration}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                Total Days
              </span>
              <div className="font-semibold text-slate-800 mt-1">
                {record.totalDaysText}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Applied On
              </span>
              <div className="font-semibold text-slate-800 mt-1">
                {record.appliedOn}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-slate-400" />
                On Leave Today
              </span>
              <div className="font-semibold text-slate-800 mt-1">
                {record.isOnLeaveToday ? "Yes" : "No"}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-100 bg-white">
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block mb-1">
              Reason for Leave
            </span>
            <p className="text-slate-700 leading-relaxed font-normal">
              {record.reason}
            </p>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-700 block mb-2">
              Employee Leave Balances
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/70 text-center">
                <span className="text-[10px] text-slate-400 block">Annual</span>
                <span className="font-bold text-slate-800 text-xs mt-0.5 block">
                  {record.leaveBalance.annualLeave.total -
                    record.leaveBalance.annualLeave.used}{" "}
                  / {record.leaveBalance.annualLeave.total}
                </span>
                <span className="text-[9px] text-slate-400">Days Left</span>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/70 text-center">
                <span className="text-[10px] text-slate-400 block">Sick</span>
                <span className="font-bold text-slate-800 text-xs mt-0.5 block">
                  {record.leaveBalance.sickLeave.total -
                    record.leaveBalance.sickLeave.used}{" "}
                  / {record.leaveBalance.sickLeave.total}
                </span>
                <span className="text-[9px] text-slate-400">Days Left</span>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/70 text-center">
                <span className="text-[10px] text-slate-400 block">Casual</span>
                <span className="font-bold text-slate-800 text-xs mt-0.5 block">
                  {record.leaveBalance.casualLeave.total -
                    record.leaveBalance.casualLeave.used}{" "}
                  / {record.leaveBalance.casualLeave.total}
                </span>
                <span className="text-[9px] text-slate-400">Days Left</span>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/70 text-center">
                <span className="text-[10px] text-slate-400 block">WFH</span>
                <span className="font-bold text-slate-800 text-xs mt-0.5 block">
                  {record.leaveBalance.wfh.total - record.leaveBalance.wfh.used}{" "}
                  / {record.leaveBalance.wfh.total}
                </span>
                <span className="text-[9px] text-slate-400">Days Left</span>
              </div>
            </div>
          </div>

          {record.reviewedBy && (
            <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/70">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-slate-400 font-medium">
                  Review Details
                </span>
                <span className="text-[10px] text-slate-400">
                  {record.reviewedOn}
                </span>
              </div>
              <div className="font-semibold text-slate-800 text-xs">
                {record.reviewedBy}
              </div>
              {record.reviewerRemarks && (
                <p className="text-[11px] text-slate-600 mt-1 italic">
                  &ldquo;{record.reviewerRemarks}&rdquo;
                </p>
              )}
            </div>
          )}

          {record.status === "Pending" && onUpdateRecord && (
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-3">
              <div>
                <label className="text-[11px] font-medium text-slate-600 block mb-1">
                  Admin Remarks (Optional)
                </label>
                <input
                  type="text"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Enter approval or rejection comments..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#5B50E5] focus:bg-white transition-colors"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={handleReject}
                  className="px-4 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                  Reject Request
                </button>
                <button
                  type="button"
                  onClick={handleApprove}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  Approve Request
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 flex items-center justify-end bg-slate-50/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#5B50E5] hover:bg-[#4E44C9] text-xs font-semibold text-white shadow-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
