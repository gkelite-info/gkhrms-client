"use client"

import { useState, useEffect } from "react"
import { X, Pencil, FileText, Check, ChevronDown } from "lucide-react"
import {
  GeneratedReportItem,
  REPORT_CATEGORIES,
  ReportCategory,
} from "./ChairmanReportsData"

interface ChairmanEditReportModalProps {
  isOpen: boolean
  report: GeneratedReportItem | null
  onClose: () => void
  onSave: (updatedReport: GeneratedReportItem) => void
}

export default function ChairmanEditReportModal({
  isOpen,
  report,
  onClose,
  onSave,
}: ChairmanEditReportModalProps) {
  const [name, setName] = useState("")
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState("")
  const [period, setPeriod] = useState("")
  const [format, setFormat] = useState<"PDF" | "XLSX">("PDF")
  const [status, setStatus] = useState<"Finalized" | "Approved" | "Draft">("Finalized")
  const [generatedBy, setGeneratedBy] = useState("")
  const [description, setDescription] = useState("")
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  useEffect(() => {
    if (report) {
      setName(report.name)
      setSelectedCategoryLabel(report.category.label)
      setPeriod(report.period)
      setFormat(report.format)
      setStatus(report.status || "Finalized")
      setGeneratedBy(report.generatedBy || "Finance Controller")
      setDescription(report.description || "")
      setIsCategoryOpen(false)
    }
  }, [report])

  if (!isOpen || !report) return null

  const currentCategory: ReportCategory =
    REPORT_CATEGORIES.find((c) => c.label === selectedCategoryLabel) ||
    report.category

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    const updated: GeneratedReportItem = {
      ...report,
      name: name.trim(),
      category: currentCategory,
      period: period.trim() || report.period,
      format,
      status,
      generatedBy: generatedBy.trim() || report.generatedBy,
      description: description.trim() || report.description,
    }

    onSave(updated)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden z-10 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 sm:p-6 pb-4 flex items-center justify-between border-b border-slate-100/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center shrink-0 border border-indigo-100/60 shadow-xs">
              <Pencil className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Edit Report Details
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Update document metadata and reporting classification.
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

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="px-5 sm:px-6 py-5 space-y-4 flex-1 overflow-y-auto max-h-[64vh] modal-scrollbar">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Report Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Company Financial Summary"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200/90 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 relative">
                <label className="text-xs font-semibold text-slate-700">
                  Category <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-50/70 border border-slate-200/90 rounded-xl text-xs text-slate-800 text-left hover:bg-slate-100/70 transition-colors cursor-pointer"
                >
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${currentCategory.bgClass} ${currentCategory.colorClass} ${currentCategory.borderClass}`}
                  >
                    {currentCategory.label}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                </button>

                {isCategoryOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setIsCategoryOpen(false)}
                    />
                    <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-white border border-slate-200 rounded-xl shadow-lg p-1 space-y-1 max-h-48 overflow-y-auto">
                      {REPORT_CATEGORIES.map((cat) => (
                        <button
                          key={cat.label}
                          type="button"
                          onClick={() => {
                            setSelectedCategoryLabel(cat.label)
                            setIsCategoryOpen(false)
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                            selectedCategoryLabel === cat.label
                              ? "bg-slate-100 font-semibold"
                              : "hover:bg-slate-50"
                          }`}
                        >
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${cat.bgClass} ${cat.colorClass} ${cat.borderClass}`}
                          >
                            {cat.label}
                          </span>
                          {selectedCategoryLabel === cat.label && (
                            <Check className="w-3.5 h-3.5 text-[#5B50E5]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Reporting Period <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  placeholder="e.g. Q1 2025 (Jan – Mar)"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200/90 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Document Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormat("PDF")}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      format === "PDF"
                        ? "bg-rose-50 border-rose-200 text-rose-600 shadow-2xs"
                        : "bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormat("XLSX")}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      format === "XLSX"
                        ? "bg-emerald-50 border-emerald-200 text-emerald-600 shadow-2xs"
                        : "bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>XLSX</span>
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Audit Status
                </label>
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as "Finalized" | "Approved" | "Draft")
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200/90 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] transition-all cursor-pointer"
                >
                  <option value="Finalized">Finalized</option>
                  <option value="Approved">Approved</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Prepared By
              </label>
              <input
                type="text"
                value={generatedBy}
                onChange={(e) => setGeneratedBy(e.target.value)}
                placeholder="e.g. Suresh Narayanan (CFO)"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200/90 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Description / Notes
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary notes regarding the contents and scope of this report..."
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200/90 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] transition-all resize-none"
              />
            </div>
          </div>

          <div className="px-5 sm:px-6 py-3.5 border-t border-slate-100 bg-white flex items-center justify-end gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#5B50E5] hover:bg-[#4F46E5] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
