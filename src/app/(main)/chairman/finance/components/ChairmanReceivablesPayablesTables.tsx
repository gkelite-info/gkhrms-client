"use client"

import { ArrowRight } from "lucide-react"
import {
  TOP_RECEIVABLES_CLIENTS,
  TOP_PAYABLES_VENDORS,
} from "./ChairmanReceivablesPayablesData"

export default function ChairmanReceivablesPayablesTables() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-stretch">
      <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs overflow-hidden flex flex-col justify-between">
        <div>
          <div className="p-4 sm:p-5 pb-3 border-b border-slate-100/80 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">
              Top Receivables (Clients)
            </h2>
            <button
              type="button"
              className="text-xs font-semibold text-[#5B50E5] hover:text-[#4E44C9] inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto scrollbar-none">
            <table className="w-full text-left border-collapse min-w-[480px]">
              <thead>
                <tr className="border-b border-slate-100/80 bg-slate-50/50">
                  <th className="py-3 px-3.5 sm:px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    Client / Customer
                  </th>
                  <th className="py-3 px-3.5 sm:px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    Invoice Amount (₹)
                  </th>
                  <th className="py-3 px-3.5 sm:px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    Outstanding (₹)
                  </th>
                  <th className="py-3 px-3.5 sm:px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    Aging
                  </th>
                  <th className="py-3 px-3.5 sm:px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TOP_RECEIVABLES_CLIENTS.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-3.5 px-3.5 sm:px-4 text-xs font-semibold text-slate-800 whitespace-nowrap">
                      {row.clientName}
                    </td>
                    <td className="py-3.5 px-3.5 sm:px-4 text-xs text-slate-600 font-medium whitespace-nowrap">
                      {row.invoiceAmount}
                    </td>
                    <td className="py-3.5 px-3.5 sm:px-4 text-xs font-bold text-slate-900 whitespace-nowrap">
                      {row.outstanding}
                    </td>
                    <td
                      className={`py-3.5 px-3.5 sm:px-4 text-xs font-semibold whitespace-nowrap ${row.agingColorClass}`}
                    >
                      {row.aging}
                    </td>
                    <td className="py-3.5 px-3.5 sm:px-4 whitespace-nowrap">
                      {row.status === "Overdue" ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-rose-50 text-rose-500 border border-rose-100">
                          Overdue
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-600 border border-amber-100">
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs overflow-hidden flex flex-col justify-between">
        <div>
          <div className="p-4 sm:p-5 pb-3 border-b border-slate-100/80 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">
              Top Payables (Vendors)
            </h2>
          </div>

          <div className="overflow-x-auto scrollbar-none">
            <table className="w-full text-left border-collapse min-w-[480px]">
              <thead>
                <tr className="border-b border-slate-100/80 bg-slate-50/50">
                  <th className="py-3 px-3.5 sm:px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    Vendor / Supplier
                  </th>
                  <th className="py-3 px-3.5 sm:px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    Bill Amount (₹)
                  </th>
                  <th className="py-3 px-3.5 sm:px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    Outstanding (₹)
                  </th>
                  <th className="py-3 px-3.5 sm:px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    Aging
                  </th>
                  <th className="py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TOP_PAYABLES_VENDORS.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-3.5 px-3.5 sm:px-4 text-xs font-semibold text-slate-800 whitespace-nowrap">
                      {row.vendorName}
                    </td>
                    <td className="py-3.5 px-3.5 sm:px-4 text-xs text-slate-600 font-medium whitespace-nowrap">
                      {row.billAmount}
                    </td>
                    <td className="py-3.5 px-3.5 sm:px-4 text-xs font-bold text-slate-900 whitespace-nowrap">
                      {row.outstanding}
                    </td>
                    <td
                      className={`py-3.5 px-3.5 sm:px-4 text-xs font-semibold whitespace-nowrap ${row.agingColorClass}`}
                    >
                      {row.aging}
                    </td>
                    <td className="py-3.5 px-3.5 sm:px-4 whitespace-nowrap">
                      {row.status === "Overdue" ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-rose-50 text-rose-500 border border-rose-100">
                          Overdue
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-600 border border-amber-100">
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
