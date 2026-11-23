"use client"

import { useState } from "react"
import {
  FileText,
  Download,
  MoreHorizontal,
  FileCode,
  Eye,
  Pencil,
  Trash2,
  CheckCircle2,
} from "lucide-react"
import {
  GENERATED_REPORTS_DATA,
  GeneratedReportItem,
} from "./ChairmanReportsData"
import ChairmanViewReportModal from "./ChairmanViewReportModal"
import ChairmanEditReportModal from "./ChairmanEditReportModal"
import ChairmanDeleteReportModal from "./ChairmanDeleteReportModal"

export default function ChairmanGeneratedReportsTable() {
  const [reports, setReports] = useState<GeneratedReportItem[]>(GENERATED_REPORTS_DATA)
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null)

  const [viewReport, setViewReport] = useState<GeneratedReportItem | null>(null)
  const [editReport, setEditReport] = useState<GeneratedReportItem | null>(null)
  const [deleteReport, setDeleteReport] = useState<GeneratedReportItem | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  const handleDownload = (item: GeneratedReportItem) => {
    triggerToast(`Downloading ${item.name}.${item.format.toLowerCase()}...`)
  }

  const handleSaveEdit = (updated: GeneratedReportItem) => {
    setReports((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    )
    triggerToast(`Report "${updated.name}" updated successfully.`)
  }

  const handleConfirmDelete = (reportId: string) => {
    const target = reports.find((r) => r.id === reportId)
    setReports((prev) => prev.filter((r) => r.id !== reportId))
    if (target) {
      triggerToast(`Report "${target.name}" deleted.`)
    }
  }

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs overflow-hidden relative">
      {toastMessage && (
        <div className="absolute top-3 right-3 z-40 bg-slate-900 text-white text-xs font-medium px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="p-4 sm:p-5 pb-3 border-b border-slate-100/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5B50E5] flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">
              Generated Reports
            </h2>
            <p className="text-[11px] text-slate-400">
              Company financial reports for management and board review.
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
          {reports.length} {reports.length === 1 ? "Report" : "Reports"}
        </span>
      </div>

      <div className="overflow-x-auto scrollbar-none pb-12">
        <table className="w-full text-left border-collapse min-w-[550px]">
          <thead>
            <tr className="border-b border-slate-100/80 bg-slate-50/50">
              <th className="py-3 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Report Name
              </th>
              <th className="py-3 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Category
              </th>
              <th className="py-3 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Period
              </th>
              <th className="py-3 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Format
              </th>
              <th className="py-3 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reports.map((item, index) => {
              const isDropdownOpen = activeDropdownId === item.id
              const isNearBottom = index >= reports.length - 2 && reports.length > 2

              return (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                      <button
                        type="button"
                        onClick={() => setViewReport(item)}
                        className="text-xs font-semibold text-slate-800 hover:text-[#5B50E5] transition-colors cursor-pointer text-left"
                      >
                        {item.name}
                      </button>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.category.bgClass} ${item.category.colorClass} ${item.category.borderClass}`}
                    >
                      {item.category.label}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 sm:px-5 text-xs text-slate-600 font-medium whitespace-nowrap">
                    {item.period}
                  </td>

                  <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-500">
                      <FileCode className="w-3.5 h-3.5" />
                      <span>{item.format}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap text-right">
                    <div className="inline-flex items-center gap-2 relative">
                      <button
                        type="button"
                        onClick={() => handleDownload(item)}
                        className="w-7 h-7 rounded-lg text-slate-400 hover:text-[#5B50E5] hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                        title="Download Report"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveDropdownId(isDropdownOpen ? null : item.id)
                          }
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                            isDropdownOpen
                              ? "bg-slate-100 text-slate-800"
                              : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                          }`}
                          title="More options"
                          aria-expanded={isDropdownOpen}
                        >
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>

                        {isDropdownOpen && (
                          <>
                            <div
                              className="fixed inset-0 z-20"
                              onClick={() => setActiveDropdownId(null)}
                            />

                            <div
                              className={`absolute right-0 z-30 w-36 bg-white border border-slate-200/90 rounded-2xl shadow-xl py-1 text-xs divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-100 ${
                                isNearBottom ? "bottom-full mb-1.5" : "top-full mt-1.5"
                              }`}
                            >
                              <div className="py-0.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveDropdownId(null)
                                    setViewReport(item)
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#5B50E5] transition-colors cursor-pointer font-medium"
                                >
                                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                                  <span>View</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveDropdownId(null)
                                    setEditReport(item)
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#5B50E5] transition-colors cursor-pointer font-medium"
                                >
                                  <Pencil className="w-3.5 h-3.5 text-slate-400" />
                                  <span>Edit</span>
                                </button>
                              </div>
                              <div className="py-0.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveDropdownId(null)
                                    setDeleteReport(item)
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer font-medium"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })}

            {reports.length === 0 && (
              <tr>
                <td colSpan={5} className="py-10 text-center text-xs text-slate-400">
                  <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <span>No reports available.</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ChairmanViewReportModal
        isOpen={!!viewReport}
        report={viewReport}
        onClose={() => setViewReport(null)}
        onEdit={(r) => setEditReport(r)}
        onDelete={(r) => setDeleteReport(r)}
        onDownload={handleDownload}
      />

      <ChairmanEditReportModal
        isOpen={!!editReport}
        report={editReport}
        onClose={() => setEditReport(null)}
        onSave={handleSaveEdit}
      />

      <ChairmanDeleteReportModal
        isOpen={!!deleteReport}
        report={deleteReport}
        onClose={() => setDeleteReport(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
