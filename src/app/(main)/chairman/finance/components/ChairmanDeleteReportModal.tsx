"use client"

import { X, Trash2, AlertTriangle, FileText } from "lucide-react"
import { GeneratedReportItem } from "./ChairmanReportsData"

interface ChairmanDeleteReportModalProps {
  isOpen: boolean
  report: GeneratedReportItem | null
  onClose: () => void
  onConfirm: (reportId: string) => void
}

export default function ChairmanDeleteReportModal({
  isOpen,
  report,
  onClose,
  onConfirm,
}: ChairmanDeleteReportModalProps) {
  if (!isOpen || !report) return null

  const handleDelete = () => {
    onConfirm(report.id)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 flex flex-col overflow-hidden z-10 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 sm:p-6 pb-4 flex items-start justify-between border-b border-slate-100/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100/80 shadow-xs">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Delete Report
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Permanent document deletion confirmation.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-slate-900">&quot;{report.name}&quot;</span>?
          </p>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-xs font-bold text-slate-800 truncate">
                {report.name}
              </span>
            </div>
            <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60 text-xs">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${report.category.bgClass} ${report.category.colorClass} ${report.category.borderClass}`}
              >
                {report.category.label}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {report.period}
              </span>
              <span className="text-[11px] text-slate-400">•</span>
              <span className="text-[11px] font-semibold text-rose-500">
                {report.format}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed text-[11px]">
              This action cannot be undone. This report and its cached summaries will be permanently removed from your dashboard.
            </span>
          </div>
        </div>

        <div className="px-5 sm:px-6 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Report</span>
          </button>
        </div>
      </div>
    </div>
  )
}
