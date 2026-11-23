"use client"

import {
  FileText,
  ArrowRight,
  Check,
  Clock,
  CreditCard,
  Tag,
  Users,
  GraduationCap,
  Layers,
} from "lucide-react"
import {
  RECENT_REVENUE_RECORDS,
  RecentRevenueRecord,
} from "./ChairmanRevenueData"

export default function ChairmanRecentRevenueTable() {
  const renderSourceIcon = (icon: RecentRevenueRecord["revenueSource"]["icon"]) => {
    switch (icon) {
      case "card":
        return <CreditCard className="w-3.5 h-3.5 shrink-0" />
      case "tag":
        return <Tag className="w-3.5 h-3.5 shrink-0" />
      case "users":
        return <Users className="w-3.5 h-3.5 shrink-0" />
      case "training":
        return <GraduationCap className="w-3.5 h-3.5 shrink-0" />
      case "layers":
        return <Layers className="w-3.5 h-3.5 shrink-0" />
    }
  }

  const renderStatusIcon = (icon: RecentRevenueRecord["paymentStatus"]["icon"]) => {
    switch (icon) {
      case "check":
        return <Check className="w-3 h-3 stroke-[2.5]" />
      case "clock":
        return <Clock className="w-3 h-3" />
    }
  }

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs overflow-hidden">
      <div className="p-4 sm:p-5 pb-3 border-b border-slate-100/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5B50E5] flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            Recent Revenue Records
          </h2>
        </div>

        <button
          type="button"
          className="text-xs font-semibold text-[#5B50E5] hover:text-[#4E44C9] inline-flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="overflow-x-auto scrollbar-none">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="border-b border-slate-100/80 bg-slate-50/50">
              <th className="py-3.5 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Date
              </th>
              <th className="py-3.5 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Revenue Source
              </th>
              <th className="py-3.5 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Reference ID
              </th>
              <th className="py-3.5 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Client / Department
              </th>
              <th className="py-3.5 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Amount
              </th>
              <th className="py-3.5 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {RECENT_REVENUE_RECORDS.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/60 transition-colors"
              >
                <td className="py-3.5 px-4 sm:px-5 text-xs text-slate-700 font-medium whitespace-nowrap">
                  {item.date}
                </td>

                <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium border ${item.revenueSource.bgClass} ${item.revenueSource.colorClass} ${item.revenueSource.borderClass}`}
                  >
                    {renderSourceIcon(item.revenueSource.icon)}
                    {item.revenueSource.label}
                  </span>
                </td>

                <td className="py-3.5 px-4 sm:px-5 text-xs text-slate-500 font-medium whitespace-nowrap">
                  {item.referenceId}
                </td>

                <td className="py-3.5 px-4 sm:px-5 text-xs font-medium text-slate-800 whitespace-nowrap">
                  {item.clientDepartment}
                </td>

                <td className="py-3.5 px-4 sm:px-5 text-xs font-bold text-slate-900 whitespace-nowrap">
                  {item.amount}
                </td>

                <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold border ${item.paymentStatus.bgClass} ${item.paymentStatus.colorClass} ${item.paymentStatus.borderClass}`}
                  >
                    {renderStatusIcon(item.paymentStatus.icon)}
                    {item.paymentStatus.label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
