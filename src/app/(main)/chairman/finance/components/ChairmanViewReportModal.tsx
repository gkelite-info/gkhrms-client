"use client"

import { useState } from "react"
import {
  X,
  FileText,
  Download,
  Pencil,
  Trash2,
  Calendar,
  User,
  HardDrive,
  FileCode,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Printer,
  Sparkles,
} from "lucide-react"
import { GeneratedReportItem } from "./ChairmanReportsData"

interface ChairmanViewReportModalProps {
  isOpen: boolean
  report: GeneratedReportItem | null
  onClose: () => void
  onEdit?: (report: GeneratedReportItem) => void
  onDelete?: (report: GeneratedReportItem) => void
  onDownload?: (report: GeneratedReportItem) => void
}

export default function ChairmanViewReportModal({
  isOpen,
  report,
  onClose,
  onEdit,
  onDelete,
  onDownload,
}: ChairmanViewReportModalProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false)

  if (!isOpen || !report) return null

  const handleDownload = () => {
    if (onDownload) {
      onDownload(report)
    }
    setDownloadSuccess(true)
    setTimeout(() => {
      setDownloadSuccess(false)
    }, 2500)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] overflow-hidden z-10 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 sm:p-6 pb-4 flex items-start justify-between gap-4 border-b border-slate-100/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5B50E5] flex items-center justify-center shrink-0 border border-purple-100/60 shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {report.name}
                </h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${report.category.bgClass} ${report.category.colorClass} ${report.category.borderClass}`}
                >
                  {report.category.label}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {report.status || "Finalized"}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Financial report reference ID: {report.id.toUpperCase()}
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

        <div className="px-5 sm:px-6 py-5 space-y-5 flex-1 overflow-y-auto max-h-[66vh] modal-scrollbar">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">Reporting Period</span>
              </div>
              <p className="text-xs font-bold text-slate-800">{report.period}</p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <FileCode className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-[11px] font-medium">Format & Size</span>
              </div>
              <p className="text-xs font-bold text-slate-800">
                {report.format} • {report.fileSize || "3.2 MB"}
              </p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <User className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">Prepared By</span>
              </div>
              <p className="text-xs font-bold text-slate-800 truncate" title={report.generatedBy}>
                {report.generatedBy || "Finance Controller"}
              </p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <HardDrive className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">Generated On</span>
              </div>
              <p className="text-xs font-bold text-slate-800 truncate" title={report.generatedDate}>
                {report.generatedDate || "Apr 02, 2025"}
              </p>
            </div>
          </div>

          {report.summaryStats && report.summaryStats.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                Executive Key Metrics
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {report.summaryStats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-2xs hover:border-slate-200 transition-all"
                  >
                    <span className="text-[11px] font-medium text-slate-400 block truncate">
                      {stat.label}
                    </span>
                    <div className="flex items-baseline justify-between gap-1.5 mt-1">
                      <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                        {stat.value}
                      </span>
                      {stat.change && (
                        <span
                          className={`inline-flex items-center gap-0.5 text-[11px] font-bold ${
                            stat.isPositive ? "text-emerald-600" : "text-rose-600"
                          }`}
                        >
                          {stat.isPositive ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {stat.change}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {report.description && (
            <div className="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-100/60 text-xs">
              <div className="flex items-center gap-2 text-indigo-700 font-bold mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Overview</span>
              </div>
              <p className="text-slate-600 leading-relaxed">{report.description}</p>
            </div>
          )}

          {report.highlights && report.highlights.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Audited Highlights & Observations
              </h4>
              <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 shadow-2xs overflow-hidden">
                {report.highlights.map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-start gap-2.5 text-xs text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">File Verification & Security</span>
              <span className="text-[11px] font-mono text-slate-400">SHA-256 Verified</span>
            </div>
            <p className="text-[11px] text-slate-500">
              This document has been digitally verified for board and executive compliance review.
              All data points reflect audited figures from the central ERP ledger.
            </p>
          </div>
        </div>

        <div className="px-5 sm:px-6 py-3.5 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onDelete && (
              <button
                type="button"
                onClick={() => {
                  onClose()
                  onDelete(report)
                }}
                className="px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            )}

            {onEdit && (
              <button
                type="button"
                onClick={() => {
                  onClose()
                  onEdit(report)
                }}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5"
              title="Print Report"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="px-4 py-2 bg-[#5B50E5] hover:bg-[#4F46E5] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadSuccess ? "Downloaded!" : `Download ${report.format}`}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
