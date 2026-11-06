"use client"

import { FileSpreadsheet, Download, Calendar } from "lucide-react"

export default function ReportsView() {
  const reports = [
    {
      title: "Quarterly Financial Audit Report (Q2 2025)",
      period: "Apr 2025 - Jun 2025",
      type: "PDF Audit File",
      size: "2.4 MB",
    },
    {
      title: "Monthly Expense Ledger - July 2025",
      period: "01 Jul 2025 - 31 Jul 2025",
      type: "Excel Spreadsheet",
      size: "840 KB",
    },
    {
      title: "Departmental Cost Center Utilization",
      period: "Year to Date (YTD 2025)",
      type: "CSV Data Export",
      size: "520 KB",
    },
    {
      title: "Employee Reimbursement & Tax Deduction Summary",
      period: "H1 2025",
      type: "PDF Report",
      size: "1.8 MB",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-5 border border-slate-100/80 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Financial Statements & Exports
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Download certified audit papers and department spreadsheets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {reports.map((report) => (
            <div
              key={report.title}
              className="p-4 rounded-xl border border-slate-100 hover:border-indigo-100 bg-slate-50/40 hover:bg-white transition-all flex items-start justify-between gap-3 shadow-xs"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center shrink-0">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-snug">
                    {report.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {report.period}
                    </span>
                    <span>•</span>
                    <span>{report.size}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="p-2 text-slate-400 hover:text-[#4F46E5] hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer shrink-0"
                aria-label={`Download ${report.title}`}
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

