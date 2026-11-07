"use client"

import {
  X,
  CalendarBlank,
  Clock,
  User,
  CheckCircle,
  XCircle,
} from "phosphor-react"

interface ExceptionRecordDetailModalProps {
  isOpen: boolean
  onClose: () => void
  record: {
    date: string
    issueType: string
    originalValue: string
    correctedValue: string
    reviewerOrApprover: string
    reviewerRole?: string
    status: string
    reason?: string
    employeeName?: string
  } | null
}

const getStatusConfig = (status?: string) => {
  const norm = status?.toLowerCase()
  if (norm === "approved" || norm === "accepted") {
    return {
      label: "Approved",
      icon: CheckCircle,
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
      dot: "bg-emerald-500",
      card: "bg-emerald-50/60 border-emerald-100",
      iconBox: "bg-emerald-100 text-emerald-700",
      textColor: "text-emerald-700",
    }
  }
  if (norm === "rejected") {
    return {
      label: "Rejected",
      icon: XCircle,
      badge: "bg-rose-50 text-rose-700 border-rose-200/80",
      dot: "bg-rose-500",
      card: "bg-rose-50/60 border-rose-100",
      iconBox: "bg-rose-100 text-rose-700",
      textColor: "text-rose-700",
    }
  }
  return {
    label: "Pending",
    icon: Clock,
    badge: "bg-amber-50 text-amber-700 border-amber-200/80",
    dot: "bg-amber-500",
    card: "bg-amber-50/60 border-amber-100",
    iconBox: "bg-amber-100 text-amber-700",
    textColor: "text-amber-700",
  }
}

export default function ExceptionRecordDetailModal({
  isOpen,
  onClose,
  record,
}: ExceptionRecordDetailModalProps) {
  if (!isOpen || !record) return null

  const statusConfig = getStatusConfig(record.status)
  const StatusIcon = statusConfig.icon

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[85vh] sm:max-h-[90vh] shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="bg-white px-5 sm:px-6 py-4 border-b border-gray-100 flex items-start justify-between shrink-0">
          <div className="flex flex-col min-w-0 pr-3">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                Exception Regularization Details
              </h2>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${statusConfig.badge} shadow-2xs`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                {statusConfig.label}
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium mt-1 truncate">
              {record.employeeName ? `Reviewing request for ${record.employeeName}` : "View details of this attendance regularization."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 sm:px-6 py-4 flex flex-col gap-3 sm:gap-3.5 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
                <CalendarBlank size={16} weight="bold" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-gray-400 font-semibold">Date</span>
                <span className="text-xs font-bold text-gray-900 break-words">{record.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
                <Clock size={16} weight="bold" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-gray-400 font-semibold">Issue Type</span>
                <span className="text-xs font-bold text-gray-900 break-words">{record.issueType}</span>
              </div>
            </div>

            <div className={`flex items-center gap-3 p-3 rounded-xl ${statusConfig.card} border min-w-0`}>
              <div className={`w-8 h-8 rounded-lg ${statusConfig.iconBox} flex items-center justify-center shrink-0`}>
                <StatusIcon size={16} weight="bold" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-gray-500 font-semibold">Status</span>
                <span className={`text-xs font-bold ${statusConfig.textColor} break-words`}>
                  {statusConfig.label}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#FFFBEB] text-[#D97706] flex items-center justify-center shrink-0">
                <CalendarBlank size={16} weight="bold" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-gray-400 font-semibold">Original Value</span>
                <span className="text-xs font-bold text-gray-800 break-words">{record.originalValue}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#059669] flex items-center justify-center shrink-0">
                <CalendarBlank size={16} weight="bold" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-gray-400 font-semibold">Corrected Value</span>
                <span className="text-xs font-bold text-emerald-700 break-words">{record.correctedValue}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
                <User size={16} weight="bold" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-gray-400 font-semibold">Reviewed / Approved By</span>
                <span className="text-xs font-bold text-gray-900 break-words truncate">
                  {record.reviewerOrApprover} {record.reviewerRole ? `(${record.reviewerRole})` : ""}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 p-3.5 rounded-xl bg-gray-50/80 border border-gray-100/70 min-w-0">
            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
              Reason & Resolution Notes
            </span>
            <div className="max-h-36 overflow-y-auto custom-scrollbar pr-1">
              <p className="text-xs text-gray-700 leading-relaxed break-words whitespace-pre-wrap">
                {record.reason || "Biometric discrepancy regularized following verified shift logs."}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white px-5 sm:px-6 py-3.5 border-t border-gray-100 flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#5B50EC] text-white text-xs font-semibold hover:bg-[#4d42e0] transition-all cursor-pointer shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
