"use client"

import { useState } from "react"
import { X } from "phosphor-react"
import { AttendanceRequestItem } from "../types"
import { ReusableAvatar } from "@/components/reusableComponents"
import RequestDetailContent from "./RequestDetailContent"

interface RequestDetailModalProps {
  request: AttendanceRequestItem
  onClose: () => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
  canApprove?: boolean
}

export default function RequestDetailModal({
  request,
  onClose,
  onApprove,
  onReject,
  canApprove = true,
}: RequestDetailModalProps) {
  const [remarks, setRemarks] = useState("")

  const isPending = request.status === "Pending"
  const isApproved = request.status === "Approved"
  const isRejected = request.status === "Rejected"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-[480px] max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100 bg-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-bold text-gray-900">
              Attendance Request Details
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#F8F9FD] border border-gray-100">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="relative shrink-0">
                <ReusableAvatar
                  src={request.avatar}
                  name={request.name}
                  size={52}
                  fallbackType="icon"
                  bgColor="#EEF2FF"
                  textColor="#5B50EC"
                />
              </div>
              <div className="flex flex-col items-center sm:items-start min-w-0">
                <span className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                  {request.name}
                </span>
                <span className="text-xs text-gray-500 font-medium mt-0.5">
                  {request.employeeId} <span className="text-gray-300 mx-1">|</span> {request.designation}
                </span>
                <span className="text-[11px] text-gray-400 mt-0.5">
                  Team Lead: Neha Reddy
                </span>
              </div>
            </div>

            <div className="flex justify-center sm:justify-end shrink-0 w-full sm:w-auto">
              <span
                className={`px-3.5 py-1 rounded-full text-xs font-semibold ${
                  isApproved
                    ? "bg-[#E8FAF4] text-[#059669] border border-[#A7F3D0]"
                    : isRejected
                    ? "bg-[#FFF1F2] text-[#E11D48] border border-[#FECDD3]"
                    : "bg-[#FFF9EE] text-[#F59E0B] border border-[#FDE68A]"
                }`}
              >
                {request.status}
              </span>
            </div>
          </div>

          <RequestDetailContent request={request} />

          {canApprove && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-800">
                Manager Remarks (Optional)
              </label>
              <textarea
                rows={4}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add remarks..."
                className="w-full min-h-[96px] p-3 rounded-2xl border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#5B50EC] focus:ring-2 focus:ring-[#5B50EC]/15 transition-all resize-none"
              />
            </div>
          )}
        </div>

        <div className="shrink-0 p-4 sm:px-5 sm:py-3.5 border-t border-gray-100 bg-white">
          {isPending && canApprove ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onReject(request.id)}
                className="flex-1 py-2.5 rounded-xl border border-[#EF4444] text-[#EF4444] hover:bg-red-50 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => onApprove(request.id)}
                className="flex-1 py-2.5 rounded-xl bg-[#0E9F6E] hover:bg-[#087F5B] text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs"
              >
                Approve
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
