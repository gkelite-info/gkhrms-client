"use client"

import { useState, useMemo } from "react"
import {
  X,
  Search,
  Download,
  Filter,
  Check,
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Layers,
  Calendar,
} from "lucide-react"
import {
  ALL_FINANCIAL_ACTIVITIES,
  FinancialActivityItem,
} from "./ChairmanFinanceData"

interface ChairmanAllFinancialActivitiesModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChairmanAllFinancialActivitiesModal({
  isOpen,
  onClose,
}: ChairmanAllFinancialActivitiesModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("All")
  const [selectedStatus, setSelectedStatus] = useState<string>("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(8)
  const [selectedItemForDetail, setSelectedItemForDetail] =
    useState<FinancialActivityItem | null>(null)

  const filteredActivities = useMemo(() => {
    return ALL_FINANCIAL_ACTIVITIES.filter((item) => {
      if (selectedType !== "All" && item.type !== selectedType) {
        return false
      }

      if (selectedStatus !== "All" && item.status !== selectedStatus) {
        return false
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchesRef = item.reference.toLowerCase().includes(query)
        const matchesDept = item.departmentSource.toLowerCase().includes(query)
        const matchesDate = item.date.toLowerCase().includes(query)
        const matchesType = item.type.toLowerCase().includes(query)
        const matchesAmount = item.amount.toLowerCase().includes(query)
        const matchesMethod =
          item.paymentMethod?.toLowerCase().includes(query) || false
        const matchesDesc =
          item.description?.toLowerCase().includes(query) || false

        if (
          !matchesRef &&
          !matchesDept &&
          !matchesDate &&
          !matchesType &&
          !matchesAmount &&
          !matchesMethod &&
          !matchesDesc
        ) {
          return false
        }
      }

      return true
    })
  }, [searchQuery, selectedType, selectedStatus])

  const totalPages = Math.max(1, Math.ceil(filteredActivities.length / rowsPerPage))
  const paginatedActivities = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredActivities.slice(start, start + rowsPerPage)
  }, [filteredActivities, currentPage, rowsPerPage])

  const totals = useMemo(() => {
    const parseAmount = (val: string) => {
      const num = Number(val.replace(/[^0-9.-]+/g, ""))
      return isNaN(num) ? 0 : num
    }

    let rev = 0
    let exp = 0
    let pay = 0

    ALL_FINANCIAL_ACTIVITIES.forEach((item) => {
      const amt = parseAmount(item.amount)
      if (item.type === "Revenue") rev += amt
      else if (item.type === "Expense") exp += amt
      else if (item.type === "Payroll") pay += amt
    })

    const formatCurrency = (val: number) => {
      return `$${val.toLocaleString()}`
    }

    return {
      revenue: formatCurrency(rev),
      expense: formatCurrency(exp),
      payroll: formatCurrency(pay),
      net: formatCurrency(rev - exp - pay),
    }
  }, [])

  if (!isOpen) return null

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

  const exportCsv = () => {
    const headers = "Date,Type,Reference,Department / Source,Amount,Payment Method,Status,Description\n"
    const rows = filteredActivities
      .map(
        (a) =>
          `"${a.date}","${a.type}","${a.reference}","${a.departmentSource}","${a.amount}","${a.paymentMethod || ""}","${a.status}","${a.description || ""}"`
      )
      .join("\n")

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute(
      "download",
      `chairman_financial_activities_${new Date().toISOString().split("T")[0]}.csv`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className="relative bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] overflow-hidden z-10 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 sm:p-6 pb-4 flex items-start justify-between gap-4 border-b border-slate-100/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5B50E5] flex items-center justify-center shrink-0 border border-purple-100/60 shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  All Financial Activities
                </h3>
                <span className="text-xs font-semibold text-[#5B50E5] bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full">
                  {filteredActivities.length} items
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Consolidated ledger of corporate revenues, operational expenses, and payroll disbursements.
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

        <div className="px-5 sm:px-6 py-3.5 bg-slate-50/70 border-b border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
          <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-medium">Total Inflow</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              {totals.revenue}
            </p>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-medium">Total Expenses</span>
              <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              {totals.expense}
            </p>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-medium">Total Payroll</span>
              <DollarSign className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              {totals.payroll}
            </p>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-medium">Net Margin</span>
              <Layers className="w-3.5 h-3.5 text-[#5B50E5]" />
            </div>
            <p className="text-sm sm:text-base font-bold text-emerald-600 tracking-tight">
              {totals.net}
            </p>
          </div>
        </div>

        <div className="px-5 sm:px-6 py-3 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white shrink-0">
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Search reference, department, type or description..."
              className="w-full pl-9 pr-3.5 py-2 bg-slate-50/70 border border-slate-200/90 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-end">
            <div className="inline-flex p-1 bg-slate-100/80 rounded-xl gap-1">
              {["All", "Revenue", "Expense", "Payroll"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setSelectedType(type)
                    setCurrentPage(1)
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedType === type
                      ? "bg-white text-slate-800 shadow-2xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value)
                  setCurrentPage(1)
                }}
                className="h-8.5 px-3 pr-7 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] appearance-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              type="button"
              onClick={exportCsv}
              className="h-8.5 px-3 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              title="Export activities as CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-2 modal-scrollbar">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="py-3 px-3 sm:px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    Date
                  </th>
                  <th className="py-3 px-3 sm:px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    Type
                  </th>
                  <th className="py-3 px-3 sm:px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    Reference
                  </th>
                  <th className="py-3 px-3 sm:px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    Department / Source
                  </th>
                  <th className="py-3 px-3 sm:px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    Method
                  </th>
                  <th className="py-3 px-3 sm:px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    Amount
                  </th>
                  <th className="py-3 px-3 sm:px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {paginatedActivities.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() =>
                      setSelectedItemForDetail(
                        selectedItemForDetail?.id === item.id ? null : item
                      )
                    }
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-3 sm:px-4 text-slate-700 font-medium whitespace-nowrap">
                      {item.date}
                    </td>

                    <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                      {renderTypePill(item.type)}
                    </td>

                    <td className="py-3 px-3 sm:px-4 text-slate-600 font-mono font-medium whitespace-nowrap">
                      {item.reference}
                    </td>

                    <td className="py-3 px-3 sm:px-4 text-slate-800 font-medium whitespace-nowrap">
                      <div>
                        <span>{item.departmentSource}</span>
                        {item.description && (
                          <p className="text-[11px] text-slate-400 font-normal truncate max-w-xs mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-3 sm:px-4 text-slate-600 whitespace-nowrap">
                      {item.paymentMethod || "Direct Transfer"}
                    </td>

                    <td className="py-3 px-3 sm:px-4 font-bold text-slate-900 whitespace-nowrap">
                      {item.amount}
                    </td>

                    <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]/60">
                        <Check className="w-3.5 h-3.5 text-[#059669]" />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredActivities.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400 text-xs">
                      <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <span>No financial activities found matching your criteria.</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="px-5 sm:px-6 py-3.5 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>
              Showing {filteredActivities.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1}–
              {Math.min(currentPage * rowsPerPage, filteredActivities.length)} of{" "}
              {filteredActivities.length} activities
            </span>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Rows:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value))
                  setCurrentPage(1)
                }}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 text-xs text-slate-700 font-semibold focus:outline-none cursor-pointer"
              >
                <option value={5}>5</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-semibold text-slate-700 px-2">
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="ml-2 px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
