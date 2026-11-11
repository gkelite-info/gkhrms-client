"use client"

import { X, CheckCircle, ArrowRight } from "phosphor-react"
import { ReusableAvatar } from "@/components/reusableComponents"
import { HrAttendanceRecord } from "../data/hrAttendanceData"
import { getStatusBadge } from "./hrAttendanceColumns"

interface HrAttendanceEditConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  original: HrAttendanceRecord | null
  updated: HrAttendanceRecord | null
  isLoading?: boolean
}

export default function HrAttendanceEditConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  original,
  updated,
  isLoading = false,
}: HrAttendanceEditConfirmModalProps) {
  if (!isOpen || !original || !updated) return null

  const changes = [
    { label: "Status", oldVal: original.status, newVal: updated.status, isStatus: true },
    { label: "Check-in", oldVal: original.checkIn, newVal: updated.checkIn },
    { label: "Check-out", oldVal: original.checkOut, newVal: updated.checkOut },
    { label: "Working Hours", oldVal: original.workingHours, newVal: updated.workingHours },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full p-4 sm:p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
              <CheckCircle size={22} weight="bold" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                Confirm Attendance Update
              </h3>
              <p className="text-xs text-gray-500 font-normal mt-0.5">
                Review modified attendance values before saving.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="p-3 rounded-xl bg-gray-50/70 border border-gray-100 flex items-center gap-3">
          <ReusableAvatar
            src={original.avatar}
            alt={original.name}
            name={original.name}
            size="sm"
            fallbackType="icon"
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                {original.name}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-gray-200/70 text-gray-700">
                {original.employeeId}
              </span>
            </div>
            <span className="text-[11px] text-gray-500 font-medium">
              {original.department} • {original.role}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 overflow-hidden text-xs">
          <div className="grid grid-cols-12 bg-gray-50/80 px-3 py-2 font-semibold text-gray-500 border-b border-gray-100">
            <span className="col-span-4">Field</span>
            <span className="col-span-3">Original</span>
            <span className="col-span-1 text-center" />
            <span className="col-span-4">Updated</span>
          </div>
          <div className="divide-y divide-gray-100/70 bg-white">
            {changes.map((item) => {
              const isDifferent = item.oldVal !== item.newVal
              return (
                <div
                  key={item.label}
                  className={`grid grid-cols-12 items-center px-3 py-2.5 ${
                    isDifferent ? "bg-[#FAF9FF]" : ""
                  }`}
                >
                  <span className="col-span-4 font-medium text-gray-700">
                    {item.label}
                  </span>
                  <span className="col-span-3 text-gray-500 truncate">
                    {item.oldVal || "-"}
                  </span>
                  <span className="col-span-1 text-center text-gray-300 flex justify-center">
                    <ArrowRight size={12} weight="bold" />
                  </span>
                  <span className={`col-span-4 font-semibold truncate ${
                    isDifferent ? "text-[#5B50EC]" : "text-gray-800"
                  }`}>
                    {item.newVal || "-"}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-1">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl text-xs font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#5B50EC] hover:bg-[#4d42e0] text-white shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            {isLoading ? "Saving..." : "Confirm & Save"}
          </button>
        </div>
      </div>
    </div>
  )
}

