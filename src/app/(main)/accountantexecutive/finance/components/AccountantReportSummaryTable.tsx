"use client"

import { Eye } from "lucide-react"
import { ReportSummaryRow } from "../types"

interface AccountantReportSummaryTableProps {
  rows: ReportSummaryRow[]
  onViewReport: (row: ReportSummaryRow) => void
}

export default function AccountantReportSummaryTable({
  rows,
  onViewReport,
}: AccountantReportSummaryTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
      <div className="p-5 sm:p-6 pb-4">
        <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Report Summary
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-y border-slate-100 bg-slate-50/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-5 sm:px-6">Period</th>
              <th className="py-3 px-5 sm:px-6">Money Received</th>
              <th className="py-3 px-5 sm:px-6">Money Paid</th>
              <th className="py-3 px-5 sm:px-6">Total Expenses</th>
              <th className="py-3 px-5 sm:px-6">Net Profit</th>
              <th className="py-3 px-5 sm:px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-slate-50/60 transition-colors"
              >
                <td className="py-3.5 px-5 sm:px-6 font-semibold text-slate-800">
                  {row.period}
                </td>
                <td className="py-3.5 px-5 sm:px-6 text-slate-700 font-medium">
                  {row.moneyReceived}
                </td>
                <td className="py-3.5 px-5 sm:px-6 text-slate-700 font-medium">
                  {row.moneyPaid}
                </td>
                <td className="py-3.5 px-5 sm:px-6 text-slate-700 font-medium">
                  {row.totalExpenses}
                </td>
                <td className="py-3.5 px-5 sm:px-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-[#EAF7EE] text-[#16A34A]">
                    {row.netProfit}
                  </span>
                </td>
                <td className="py-3.5 px-5 sm:px-6 text-right">
                  <button
                    type="button"
                    onClick={() => onViewReport(row)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4F46E5] hover:text-indigo-800 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

