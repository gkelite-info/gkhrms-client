"use client"

import { useState, useMemo } from "react"
import {
  Search,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Receipt,
} from "lucide-react"
import {
  MonthRevenueRecord,
  MONTHLY_REVENUE_RECORDS,
} from "../monthlyRevenueData"
import MonthDetailsModal from "./MonthDetailsModal"

export default function MonthlyRevenueTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDateRange, setSelectedDateRange] = useState(
    "01 Jan 2026 - 31 Dec 2026"
  )
  const [dateRangeOpen, setDateRangeOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10

  const [selectedRecord, setSelectedRecord] = useState<MonthRevenueRecord | null>(
    null
  )

  const filteredRecords = useMemo(() => {
    return MONTHLY_REVENUE_RECORDS.filter((rec) => {
      const q = searchQuery.toLowerCase()
      return (
        rec.month.toLowerCase().includes(q) ||
        rec.totalRevenue.toLowerCase().includes(q) ||
        rec.netRevenue.toLowerCase().includes(q) ||
        rec.companiesPaid.toString().includes(q)
      )
    })
  }, [searchQuery])

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / rowsPerPage))
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedRecords = filteredRecords.slice(
    startIndex,
    startIndex + rowsPerPage
  )

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            placeholder="Search by company, plan or invoice ID..."
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-slate-200/90 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-xs transition-all"
          />
        </div>

        <div className="relative w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setDateRangeOpen(!dateRangeOpen)}
            className="w-full sm:w-auto h-9 px-3.5 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 shadow-xs flex items-center justify-between sm:justify-start gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{selectedDateRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {dateRangeOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-56 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
              {[
                "01 Jan 2026 - 31 Dec 2026",
                "Last 6 Months",
                "Q1 2026",
                "Q2 2026",
                "Q3 2026",
                "Q4 2026",
              ].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setSelectedDateRange(opt)
                    setDateRangeOpen(false)
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                    selectedDateRange === opt
                      ? "font-bold text-[#5B50E5]"
                      : "text-slate-600"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#EEF0FD] flex items-center justify-center text-[#5B50E5]">
            <Receipt className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            Monthly Revenue Summary
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-5">MONTH</th>
                <th className="py-4 px-4">TOTAL REVENUE</th>
                <th className="py-4 px-4">COMPANIES PAID</th>
                <th className="py-4 px-4">REFUND AMOUNT</th>
                <th className="py-4 px-4">NET REVENUE</th>
                <th className="py-4 px-5 text-right">VIEW</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {paginatedRecords.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-slate-400 font-medium"
                  >
                    No monthly revenue records found.
                  </td>
                </tr>
              ) : (
                paginatedRecords.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-3.5 px-5 font-medium text-slate-700">
                      {item.month}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {item.totalRevenue}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {item.companiesPaid}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {item.refundAmount}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {item.netRevenue}
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedRecord(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-[#5B50E5] hover:text-[#4538C9] hover:bg-[#EEF0FD] border border-slate-200/90 hover:border-[#5B50E5]/30 transition-all cursor-pointer shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Showing{" "}
            <span className="font-bold text-slate-700">
              {filteredRecords.length === 0 ? 0 : startIndex + 1}-
              {Math.min(startIndex + rowsPerPage, filteredRecords.length)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-700">
              {filteredRecords.length}
            </span>{" "}
            months
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              const isActive = currentPage === pageNum
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#5B50E5] text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100 font-medium rounded-lg"
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <MonthDetailsModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />
    </div>
  )
}
