"use client"

import { useState, useMemo } from "react"
import {
  Search,
  ChevronDown,
  Calendar,
  Eye,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import RefundDetailsModal, {
  RefundItem,
} from "./RefundDetailsModal"

const BASE_REFUNDS_DATA: RefundItem[] = [
  {
    refundId: "REF-008764",
    company: "Orion Technologies",
    originalTxnId: "TXN-105784",
    amount: "₹40,000",
    refundDate: "10 Oct 2026",
    reason: "Duplicate Payment",
    status: "Refunded",
  },
  {
    refundId: "REF-008763",
    company: "Phoenix Solutions",
    originalTxnId: "TXN-105783",
    amount: "₹24,000",
    refundDate: "09 Oct 2026",
    reason: "Subscription Cancellation",
    status: "Pending",
  },
  {
    refundId: "REF-008762",
    company: "Horizon Foods",
    originalTxnId: "TXN-105782",
    amount: "₹12,000",
    refundDate: "08 Oct 2026",
    reason: "Billing Error",
    status: "In Review",
  },
  {
    refundId: "REF-008761",
    company: "Aurora Digital",
    originalTxnId: "TXN-105781",
    amount: "₹24,000",
    refundDate: "07 Oct 2026",
    reason: "Plan Downgrade",
    status: "Refunded",
  },
  {
    refundId: "REF-008760",
    company: "Vertex Systems",
    originalTxnId: "TXN-105780",
    amount: "₹40,000",
    refundDate: "06 Oct 2026",
    reason: "Failed Activation",
    status: "Rejected",
  },
  {
    refundId: "REF-008759",
    company: "Nexa Innovations",
    originalTxnId: "TXN-105779",
    amount: "₹72,000",
    refundDate: "05 Oct 2026",
    reason: "Subscription Cancellation",
    status: "Refunded",
  },
  {
    refundId: "REF-008758",
    company: "Summit Analytics",
    originalTxnId: "TXN-105778",
    amount: "₹48,000",
    refundDate: "04 Oct 2026",
    reason: "Duplicate Payment",
    status: "In Review",
  },
  {
    refundId: "REF-008757",
    company: "CloudSphere Tech",
    originalTxnId: "TXN-105777",
    amount: "₹16,000",
    refundDate: "03 Oct 2026",
    reason: "Billing Error",
    status: "Pending",
  },
]

const ADDITIONAL_COMPANIES = [
  "Quantum Dynamics",
  "Alpha Logistics",
  "Starlight Media",
  "Zenith Corp",
  "Titan Industries",
  "BlueOcean Tech",
  "Apex Global",
  "Vanguard Labs",
  "Nova Systems",
  "CoreLogic Inc",
  "Prime Softworks",
  "Silverline Logistics",
]

const REASONS: RefundItem["reason"][] = [
  "Duplicate Payment",
  "Subscription Cancellation",
  "Billing Error",
  "Plan Downgrade",
  "Failed Activation",
]

const STATUSES: RefundItem["status"][] = [
  "Refunded",
  "Pending",
  "In Review",
  "Rejected",
]

const AMOUNTS = ["₹12,000", "₹16,000", "₹24,000", "₹36,000", "₹40,000", "₹48,000", "₹72,000"]

const GENERATED_REFUNDS_DATA: RefundItem[] = [
  ...BASE_REFUNDS_DATA,
  ...Array.from({ length: 48 }, (_, i) => {
    const idNum = 8756 - i
    const txnNum = 105776 - i
    const day = (30 - (i % 28)).toString().padStart(2, "0")
    return {
      refundId: `REF-00${idNum}`,
      company: ADDITIONAL_COMPANIES[i % ADDITIONAL_COMPANIES.length],
      originalTxnId: `TXN-${txnNum}`,
      amount: AMOUNTS[i % AMOUNTS.length],
      refundDate: `${day} Sep 2026`,
      reason: REASONS[i % REASONS.length],
      status: STATUSES[i % STATUSES.length],
    }
  }),
]

const STATUS_BADGES: Record<RefundItem["status"], string> = {
  Refunded: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  Pending: "bg-amber-50 text-amber-700 border border-amber-100",
  "In Review": "bg-sky-50 text-sky-600 border border-sky-100",
  Rejected: "bg-rose-50 text-rose-600 border border-rose-100",
}

export default function RefundsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("Status")
  const [selectedType, setSelectedType] = useState("Refund Type")
  const [selectedDateRange, setSelectedDateRange] = useState(
    "01 Oct 2026 - 31 Oct 2026"
  )

  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false)
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 8

  const [selectedRefund, setSelectedRefund] = useState<RefundItem | null>(null)

  const filteredRefunds = useMemo(() => {
    return GENERATED_REFUNDS_DATA.filter((item) => {
      const matchesSearch =
        item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.refundId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.originalTxnId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.reason.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus =
        selectedStatus === "Status" || item.status === selectedStatus

      const matchesType =
        selectedType === "Refund Type" || item.reason === selectedType

      return matchesSearch && matchesStatus && matchesType
    })
  }, [searchQuery, selectedStatus, selectedType])

  const totalPages = Math.ceil(filteredRefunds.length / rowsPerPage) || 1

  const paginatedRefunds = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredRefunds.slice(start, start + rowsPerPage)
  }, [filteredRefunds, currentPage, rowsPerPage])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status)
    setStatusDropdownOpen(false)
    setCurrentPage(1)
  }

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
    setTypeDropdownOpen(false)
    setCurrentPage(1)
  }

  const startRecord = filteredRefunds.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0
  const endRecord = Math.min(currentPage * rowsPerPage, filteredRefunds.length)

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search refund or company..."
              className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/15 focus:border-[#5B50E5] transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setStatusDropdownOpen(!statusDropdownOpen)
                  setTypeDropdownOpen(false)
                  setDateDropdownOpen(false)
                }}
                className="h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>{selectedStatus}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {statusDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-36 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                  {["Status", "Refunded", "Pending", "In Review", "Rejected"].map(
                    (opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleStatusChange(opt)}
                        className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] cursor-pointer ${
                          selectedStatus === opt
                            ? "font-bold text-[#5B50E5]"
                            : "text-slate-600"
                        }`}
                      >
                        {opt}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setTypeDropdownOpen(!typeDropdownOpen)
                  setStatusDropdownOpen(false)
                  setDateDropdownOpen(false)
                }}
                className="h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>{selectedType}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {typeDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-56 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                  {[
                    "Refund Type",
                    "Duplicate Payment",
                    "Subscription Cancellation",
                    "Billing Error",
                    "Plan Downgrade",
                    "Failed Activation",
                  ].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleTypeChange(opt)}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] cursor-pointer ${
                        selectedType === opt
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

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setDateDropdownOpen(!dateDropdownOpen)
                  setStatusDropdownOpen(false)
                  setTypeDropdownOpen(false)
                }}
                className="h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>{selectedDateRange}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {dateDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-52 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                  {[
                    "01 Oct 2026 - 31 Oct 2026",
                    "Last 30 Days",
                    "Last 90 Days",
                    "This Year",
                  ].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedDateRange(opt)
                        setDateDropdownOpen(false)
                        setCurrentPage(1)
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] cursor-pointer ${
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
        </div>

        <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#EEF0FD] flex items-center justify-center text-[#5B50E5]">
              <RotateCcw className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">
              Refund Transactions
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 bg-slate-50/50">
                  <th className="py-3 px-5 font-semibold">Refund ID</th>
                  <th className="py-3 px-5 font-semibold">Company Name</th>
                  <th className="py-3 px-5 font-semibold">Original Transaction ID</th>
                  <th className="py-3 px-5 font-semibold">Amount</th>
                  <th className="py-3 px-5 font-semibold">Refund Date</th>
                  <th className="py-3 px-5 font-semibold">Reason</th>
                  <th className="py-3 px-5 font-semibold">Status</th>
                  <th className="py-3 px-5 font-semibold text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginatedRefunds.map((item) => (
                  <tr
                    key={item.refundId}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-3.5 px-5 font-mono text-[11px] font-semibold text-slate-700">
                      {item.refundId}
                    </td>
                    <td className="py-3.5 px-5 font-bold text-slate-800">
                      {item.company}
                    </td>
                    <td className="py-3.5 px-5 font-mono text-[11px] text-slate-400 font-medium">
                      {item.originalTxnId}
                    </td>
                    <td className="py-3.5 px-5 font-bold text-slate-800 whitespace-nowrap">
                      {item.amount}
                    </td>
                    <td className="py-3.5 px-5 text-slate-500 font-medium whitespace-nowrap">
                      {item.refundDate}
                    </td>
                    <td className="py-3.5 px-5 text-slate-600 font-medium">
                      {item.reason}
                    </td>
                    <td className="py-3.5 px-5">
                      <span
                        className={`inline-block px-3 py-0.5 rounded-full text-[11px] font-semibold ${
                          STATUS_BADGES[item.status]
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedRefund(item)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#5B50E5] hover:text-[#463cb9] cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span>
              Showing {startRecord} - {endRecord} of {filteredRefunds.length} refunds
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className={`w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center transition-colors ${
                  currentPage === 1
                    ? "text-slate-300 cursor-not-allowed"
                    : "text-slate-600 hover:bg-slate-50 cursor-pointer"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${
                      currentPage === page
                        ? "bg-[#5B50E5] text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              {totalPages > 5 && (
                <>
                  <span className="px-1 text-slate-400">...</span>
                  <button
                    type="button"
                    onClick={() => setCurrentPage(totalPages)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${
                      currentPage === totalPages
                        ? "bg-[#5B50E5] text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className={`w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center transition-colors ${
                  currentPage === totalPages
                    ? "text-slate-300 cursor-not-allowed"
                    : "text-slate-600 hover:bg-slate-50 cursor-pointer"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <RefundDetailsModal
        refund={selectedRefund}
        onClose={() => setSelectedRefund(null)}
      />
    </>
  )
}
