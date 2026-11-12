"use client"

import {
  X,
  Calendar,
  CheckCircle2,
  FileText,
  RotateCcw,
  Briefcase,
  Mail,
  Phone,
  Clock,
  ArrowUpRight,
} from "lucide-react"
import Image from "next/image"
import { AccountantExecutive } from "../types"

interface AccountantViewExecutiveModalProps {
  executive: AccountantExecutive | null
  onClose: () => void
}

export default function AccountantViewExecutiveModal({
  executive,
  onClose,
}: AccountantViewExecutiveModalProps) {
  if (!executive) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 flex flex-col max-h-[88vh] overflow-hidden z-10 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 sm:p-6 pb-4 flex items-start justify-between gap-4 border-b border-slate-100/70 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-100 shrink-0 bg-slate-100">
              <Image
                src={executive.avatar}
                alt={executive.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {executive.name}
                </h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EAF7EE] text-[#16A34A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                  <span>{executive.status}</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {executive.employeeId} • {executive.role}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 sm:px-6 py-5 space-y-4 flex-1 overflow-y-auto max-h-[62vh] modal-scrollbar">
          <div className="grid grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-[#F8F9FE] border border-indigo-50/80">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-white shadow-2xs flex items-center justify-center text-[#9333EA]">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Completed Entries
                </span>
              </div>
              <span className="text-2xl font-bold text-slate-900 tracking-tight block">
                {executive.completedEntries}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Bills & vouchers processed
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F9FE] border border-indigo-50/80">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-white shadow-2xs flex items-center justify-center text-[#9333EA]">
                  <RotateCcw className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Completed Reimbursements
                </span>
              </div>
              <span className="text-2xl font-bold text-slate-900 tracking-tight block">
                {executive.completedReimbursements}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Claims approved & disbursed
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900">
              Executive Work Information
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Department</span>
                <span className="font-semibold text-slate-800">
                  Accounts & Finance
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Assigned Queue</span>
                <span className="font-semibold text-slate-800">
                  Vendor Payables & Travel Claims
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Approval Accuracy</span>
                <span className="font-semibold text-emerald-600">99.4%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Last Recorded Activity</span>
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{executive.lastActivity}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900">
                Recent Queue Actions
              </h4>
              <span className="text-[11px] font-semibold text-[#4F46E5] hover:underline cursor-pointer">
                View All Activity
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span className="font-medium text-slate-700">
                    Approved claim ER-0152 (Ravi Kumar - ₹ 9,800)
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">11:24 AM</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span className="font-medium text-slate-700">
                    Recorded vendor disbursement VP-0149 (₹ 35,000)
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">09:50 AM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-3.5 border-t border-slate-100 flex items-center justify-end bg-white shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

