"use client"

import { useState } from "react"
import { FileText, ArrowRight, Check, X } from "lucide-react"
import { RECENT_FINANCIAL_ACTIVITIES } from "./ChairmanFinanceData"
import ChairmanAllFinancialActivitiesModal from "./ChairmanAllFinancialActivitiesModal"

export default function RecentFinancialActivityTable() {
  const [isAllActivitiesModalOpen, setIsAllActivitiesModalOpen] = useState(false)

  const renderTypePill = (type: "Revenue" | "Expense" | "Payroll") => {
    switch (type) {
      case "Revenue":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]/60">
            <Check className="w-3 h-3 text-[#059669]" />
            Revenue
          </span>
        )
      case "Expense":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]/60">
            <X className="w-3 h-3 text-[#DC2626]" />
            Expense
          </span>
        )
      case "Payroll":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            Payroll
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs overflow-hidden">
      <div className="p-5 pb-3 border-b border-slate-100/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5B50E5] flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            Recent Financial Activity
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setIsAllActivitiesModalOpen(true)}
          className="text-xs font-semibold text-[#5B50E5] hover:text-[#4E44C9] inline-flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100/80 bg-slate-50/50">
              <th className="py-3.5 px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Date
              </th>
              <th className="py-3.5 px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Type
              </th>
              <th className="py-3.5 px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Reference
              </th>
              <th className="py-3.5 px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Department / Source
              </th>
              <th className="py-3.5 px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Amount
              </th>
              <th className="py-3.5 px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {RECENT_FINANCIAL_ACTIVITIES.map((item) => (
              <tr
                key={item.id}
                onClick={() => setIsAllActivitiesModalOpen(true)}
                className="hover:bg-slate-50/60 transition-colors cursor-pointer"
              >
                <td className="py-3.5 px-5 text-xs text-slate-700 font-medium whitespace-nowrap">
                  {item.date}
                </td>

                <td className="py-3.5 px-5 whitespace-nowrap">
                  {renderTypePill(item.type)}
                </td>

                <td className="py-3.5 px-5 text-xs text-slate-600 font-medium whitespace-nowrap">
                  {item.reference}
                </td>

                <td className="py-3.5 px-5 text-xs text-slate-700 whitespace-nowrap">
                  {item.departmentSource}
                </td>

                <td className="py-3.5 px-5 text-xs font-bold text-slate-900 whitespace-nowrap">
                  {item.amount}
                </td>

                <td className="py-3.5 px-5 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]/60">
                    <Check className="w-3.5 h-3.5 text-[#059669]" />
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ChairmanAllFinancialActivitiesModal
        isOpen={isAllActivitiesModalOpen}
        onClose={() => setIsAllActivitiesModalOpen(false)}
      />
    </div>
  )
}
