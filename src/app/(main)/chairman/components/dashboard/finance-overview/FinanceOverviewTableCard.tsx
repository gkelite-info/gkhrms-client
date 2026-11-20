"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { FINANCE_OVERVIEW_MONTHLY_DATA } from "./FinanceOverviewData"

export default function FinanceOverviewTableCard() {
  const leftMonths = FINANCE_OVERVIEW_MONTHLY_DATA.slice(0, 6)
  const rightMonths = FINANCE_OVERVIEW_MONTHLY_DATA.slice(6, 12)

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100/80">
                <th className="py-2.5 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Month
                </th>
                <th className="py-2.5 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">
                  Total Expense
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {leftMonths.map((row) => (
                <tr key={row.monthFull} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-3 text-xs font-semibold text-slate-700">
                    {row.monthFull}
                  </td>
                  <td className="py-3 px-3 text-xs font-semibold text-slate-900 text-right">
                    {row.expenseAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100/80">
                <th className="py-2.5 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Month
                </th>
                <th className="py-2.5 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">
                  Total Expense
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {rightMonths.map((row) => (
                <tr key={row.monthFull} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-3 text-xs font-semibold text-slate-700">
                    {row.monthFull}
                  </td>
                  <td className="py-3 px-3 text-xs font-semibold text-slate-900 text-right">
                    {row.expenseAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="text-slate-500 font-medium text-center sm:text-left">
          Showing 1 to 12 of 12 months
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled
            className="w-7 h-7 rounded-lg border border-slate-200/80 flex items-center justify-center text-slate-400 opacity-40 cursor-not-allowed"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs bg-[#5B50E5] text-white font-semibold shadow-xs"
          >
            1
          </button>

          <button
            type="button"
            disabled
            className="w-7 h-7 rounded-lg border border-slate-200/80 flex items-center justify-center text-slate-400 opacity-40 cursor-not-allowed"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
