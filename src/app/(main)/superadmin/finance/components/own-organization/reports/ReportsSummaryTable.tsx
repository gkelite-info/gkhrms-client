"use client"

import {
  Users,
  CalendarCheck,
  Coins,
  CreditCard,
  Umbrella,
  ArrowUp,
} from "lucide-react"
import { REPORT_SUMMARY_DATA } from "./ReportsData"

export default function ReportsSummaryTable() {
  const getIcon = (id: string) => {
    switch (id) {
      case "employees":
        return Users
      case "attendance":
        return CalendarCheck
      case "payroll":
        return Coins
      case "expenses":
        return CreditCard
      case "leave":
        return Umbrella
      default:
        return Users
    }
  }

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs overflow-hidden">
      <div className="p-5 pb-3 border-b border-slate-100/80">
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          Report Summary
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100/80 bg-slate-50/50">
              <th className="py-3.5 px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap w-48">
                Report
              </th>
              <th className="py-3.5 px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Key Metrics (Nov 2026)
              </th>
              <th className="py-3.5 px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap text-right w-44">
                Change vs Oct 2026
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {REPORT_SUMMARY_DATA.map((row) => {
              const IconComponent = getIcon(row.id)

              return (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  <td className="py-4 px-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${row.iconBg} ${row.iconColor}`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-slate-800 text-xs">
                        {row.reportName}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-5 text-xs text-slate-600 font-medium">
                    {row.keyMetrics}
                  </td>

                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                        row.isGood ? "text-emerald-600" : "text-rose-500"
                      }`}
                    >
                      <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                      {row.change}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
