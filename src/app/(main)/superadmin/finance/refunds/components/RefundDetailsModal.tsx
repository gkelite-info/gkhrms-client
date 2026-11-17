"use client"

import {
  X,
  RotateCcw,
  Building2,
  Calendar,
  Receipt,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react"

export interface RefundItem {
  refundId: string
  company: string
  originalTxnId: string
  amount: string
  refundDate: string
  reason: string
  status: "Refunded" | "Pending" | "In Review" | "Rejected"
}

interface RefundDetailsModalProps {
  refund: RefundItem | null
  onClose: () => void
}

export default function RefundDetailsModal({
  refund,
  onClose,
}: RefundDetailsModalProps) {
  if (!refund) return null

  const getStatusIcon = (status: RefundItem["status"]) => {
    switch (status) {
      case "Refunded":
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
      case "Pending":
        return <Clock className="w-3.5 h-3.5 text-amber-600" />
      case "In Review":
        return <AlertCircle className="w-3.5 h-3.5 text-sky-600" />
      case "Rejected":
        return <XCircle className="w-3.5 h-3.5 text-rose-600" />
    }
  }

  const getStatusBadge = (status: RefundItem["status"]) => {
    switch (status) {
      case "Refunded":
        return "bg-emerald-50 text-emerald-600 border border-emerald-100"
      case "Pending":
        return "bg-amber-50 text-amber-700 border border-amber-100"
      case "In Review":
        return "bg-sky-50 text-sky-600 border border-sky-100"
      case "Rejected":
        return "bg-rose-50 text-rose-600 border border-rose-100"
    }
  }

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl border border-slate-100 flex flex-col animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EEF0FD] flex items-center justify-center text-[#5B50E5]">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Refund Details
              </h3>
              <span className="text-[11px] text-slate-400">
                {refund.refundId}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 font-medium">
                Refund Amount
              </span>
              <div className="text-xl font-bold text-slate-800 mt-0.5">
                {refund.amount}
              </div>
            </div>
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                refund.status
              )}`}
            >
              {getStatusIcon(refund.status)}
              {refund.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Building2 className="w-3 h-3 text-slate-400" />
                Company
              </span>
              <div className="font-semibold text-slate-800 mt-1">
                {refund.company}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Receipt className="w-3 h-3 text-slate-400" />
                Original Transaction ID
              </span>
              <div className="font-semibold text-slate-800 mt-1 font-mono text-[11px]">
                {refund.originalTxnId}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Refund Date
              </span>
              <div className="font-semibold text-slate-800 mt-1">
                {refund.refundDate}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <RotateCcw className="w-3 h-3 text-slate-400" />
                Reason
              </span>
              <div className="font-semibold text-slate-800 mt-1">
                {refund.reason}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 flex items-center justify-end gap-2 bg-slate-50/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              window.print()
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#5B50E5] text-white hover:bg-[#4E43DB] flex items-center gap-1.5 cursor-pointer shadow-xs shadow-indigo-100"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Slip</span>
          </button>
        </div>
      </div>
    </div>
  )
}

