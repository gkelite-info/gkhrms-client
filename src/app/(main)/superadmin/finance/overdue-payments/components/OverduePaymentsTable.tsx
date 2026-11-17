"use client"

import { useState, useMemo } from "react"
import {
  Search,
  ChevronDown,
  Calendar,
  Eye,
  Send,
  Box,
  CheckCircle2,
  Building,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import OverduePaymentModal, {
  OverduePayment,
} from "./OverduePaymentModal"

const OVERDUE_PAYMENTS_DATA: OverduePayment[] = [
  {
    id: "ovd-1",
    company: "TechNova Solutions",
    plan: "Enterprise",
    invoiceId: "INV-2026-1058",
    dueDate: "Oct 25, 2026",
    amountOverdue: "₹ 1,50,000",
    overdueDays: 18,
    status: "Overdue",
    iconColor: "bg-blue-50 text-blue-600",
  },
  {
    id: "ovd-2",
    company: "Orion Enterprises",
    plan: "Professional",
    invoiceId: "INV-2026-1051",
    dueDate: "Oct 22, 2026",
    amountOverdue: "₹ 90,000",
    overdueDays: 21,
    status: "Overdue",
    iconColor: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "ovd-3",
    company: "Horizon Foods",
    plan: "Standard",
    invoiceId: "INV-2026-1048",
    dueDate: "Oct 18, 2026",
    amountOverdue: "₹ 55,000",
    overdueDays: 25,
    status: "Overdue",
    iconColor: "bg-orange-50 text-orange-600",
  },
  {
    id: "ovd-4",
    company: "Aurora Digital",
    plan: "Professional",
    invoiceId: "INV-2026-1041",
    dueDate: "Oct 14, 2026",
    amountOverdue: "₹ 1,10,000",
    overdueDays: 29,
    status: "Overdue",
    iconColor: "bg-purple-50 text-purple-600",
  },
  {
    id: "ovd-5",
    company: "Horizon Foods",
    plan: "Standard",
    invoiceId: "INV-2026-1048",
    dueDate: "Oct 18, 2026",
    amountOverdue: "₹ 55,000",
    overdueDays: 25,
    status: "Overdue",
    iconColor: "bg-orange-50 text-orange-600",
  },
  {
    id: "ovd-6",
    company: "Aurora Digital",
    plan: "Professional",
    invoiceId: "INV-2026-1041",
    dueDate: "Oct 14, 2026",
    amountOverdue: "₹ 1,10,000",
    overdueDays: 29,
    status: "Overdue",
    iconColor: "bg-purple-50 text-purple-600",
  },
  {
    id: "ovd-7",
    company: "Vertex Systems",
    plan: "Enterprise",
    invoiceId: "INV-2026-1034",
    dueDate: "Oct 10, 2026",
    amountOverdue: "₹ 95,000",
    overdueDays: 33,
    status: "Overdue",
    iconColor: "bg-cyan-50 text-cyan-600",
    iconLetter: "V",
  },
  {
    id: "ovd-8",
    company: "Vertex Systems",
    plan: "Enterprise",
    invoiceId: "INV-2026-1034",
    dueDate: "Oct 10, 2026",
    amountOverdue: "₹ 95,000",
    overdueDays: 33,
    status: "Overdue",
    iconColor: "bg-cyan-50 text-cyan-600",
    iconLetter: "V",
  },
  {
    id: "ovd-9",
    company: "BluePeak HR",
    plan: "Standard",
    invoiceId: "INV-2026-1029",
    dueDate: "Oct 05, 2026",
    amountOverdue: "₹ 80,000",
    overdueDays: 38,
    status: "Overdue",
    iconColor: "bg-indigo-50 text-indigo-600",
    iconLetter: "B",
  },
]

export default function OverduePaymentsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("All Plans")
  const [selectedRange, setSelectedRange] = useState("All Overdue Range")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedDateRange, setSelectedDateRange] = useState("Date Range")

  const [planDropdownOpen, setPlanDropdownOpen] = useState(false)
  const [rangeDropdownOpen, setRangeDropdownOpen] = useState(false)
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [selectedPayment, setSelectedPayment] = useState<OverduePayment | null>(
    null
  )
  const [reminderToast, setReminderToast] = useState<string | null>(null)

  const filteredPayments = useMemo(() => {
    return OVERDUE_PAYMENTS_DATA.filter((item) => {
      const matchesSearch =
        item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.invoiceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.plan.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesPlan =
        selectedPlan === "All Plans" || item.plan === selectedPlan

      let matchesRange = true
      if (selectedRange === "1 - 15 Days") {
        matchesRange = item.overdueDays <= 15
      } else if (selectedRange === "16 - 30 Days") {
        matchesRange = item.overdueDays >= 16 && item.overdueDays <= 30
      } else if (selectedRange === "> 30 Days") {
        matchesRange = item.overdueDays > 30
      }

      const matchesStatus =
        selectedStatus === "All Status" || item.status === selectedStatus

      return matchesSearch && matchesPlan && matchesRange && matchesStatus
    })
  }, [searchQuery, selectedPlan, selectedRange, selectedStatus])

  const totalPages = Math.ceil(filteredPayments.length / rowsPerPage) || 1

  const paginatedPayments = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredPayments.slice(start, start + rowsPerPage)
  }, [filteredPayments, currentPage, rowsPerPage])

  const handleSendReminder = (item: OverduePayment) => {
    setReminderToast(`Reminder sent successfully to ${item.company}!`)
    setTimeout(() => {
      setReminderToast(null)
    }, 3500)
  }

  const renderCompanyIcon = (item: OverduePayment) => {
    if (item.iconLetter) {
      return (
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${item.iconColor}`}
        >
          {item.iconLetter}
        </div>
      )
    }

    if (item.company.includes("TechNova")) {
      return (
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${item.iconColor}`}
        >
          <Box className="w-3.5 h-3.5" />
        </div>
      )
    }

    if (item.company.includes("Orion")) {
      return (
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${item.iconColor}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
        </div>
      )
    }

    if (item.company.includes("Horizon")) {
      return (
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${item.iconColor}`}
        >
          <Building className="w-3.5 h-3.5" />
        </div>
      )
    }

    return (
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${item.iconColor}`}
      >
        <Zap className="w-3.5 h-3.5" />
      </div>
    )
  }

  return (
    <>
      <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs p-6 flex flex-col gap-6 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Search by company, plan or invoice ID..."
                className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/15 focus:border-[#5B50E5] transition-all"
              />
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setPlanDropdownOpen(!planDropdownOpen)
                  setRangeDropdownOpen(false)
                  setStatusDropdownOpen(false)
                  setDateDropdownOpen(false)
                }}
                className="h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>{selectedPlan}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {planDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-40 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                  {["All Plans", "Enterprise", "Professional", "Standard"].map(
                    (opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setSelectedPlan(opt)
                          setCurrentPage(1)
                          setPlanDropdownOpen(false)
                        }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                          selectedPlan === opt
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
                  setRangeDropdownOpen(!rangeDropdownOpen)
                  setPlanDropdownOpen(false)
                  setStatusDropdownOpen(false)
                  setDateDropdownOpen(false)
                }}
                className="h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>{selectedRange}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {rangeDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-48 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                  {[
                    "All Overdue Range",
                    "1 - 15 Days",
                    "16 - 30 Days",
                    "> 30 Days",
                  ].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedRange(opt)
                        setCurrentPage(1)
                        setRangeDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                        selectedRange === opt
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
                  setStatusDropdownOpen(!statusDropdownOpen)
                  setPlanDropdownOpen(false)
                  setRangeDropdownOpen(false)
                  setDateDropdownOpen(false)
                }}
                className="h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>{selectedStatus}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {statusDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-36 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                  {["All Status", "Overdue"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedStatus(opt)
                        setCurrentPage(1)
                        setStatusDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                        selectedStatus === opt
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

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setDateDropdownOpen(!dateDropdownOpen)
                setPlanDropdownOpen(false)
                setRangeDropdownOpen(false)
                setStatusDropdownOpen(false)
              }}
              className="h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{selectedDateRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {dateDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-36 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {[
                  "Date Range",
                  "Last 7 Days",
                  "Last 30 Days",
                  "Last 90 Days",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedDateRange(opt)
                      setDateDropdownOpen(false)
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

        {reminderToast && (
          <div className="px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-xs font-medium text-emerald-700 flex items-center justify-between animate-in fade-in">
            <span>{reminderToast}</span>
            <button
              type="button"
              onClick={() => setReminderToast(null)}
              className="text-emerald-500 hover:text-emerald-700"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400">
                <th className="pb-4 font-semibold">Company Name</th>
                <th className="pb-4 font-semibold">Plan</th>
                <th className="pb-4 font-semibold">Invoice ID</th>
                <th className="pb-4 font-semibold">Due Date</th>
                <th className="pb-4 font-semibold">Amount Overdue</th>
                <th className="pb-4 font-semibold">Overdue Days</th>
                <th className="pb-4 font-semibold">Status</th>
                <th className="pb-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedPayments.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="py-4 font-bold text-slate-800">
                    <div className="flex items-center gap-2.5">
                      {renderCompanyIcon(item)}
                      <span className="font-bold text-slate-800">
                        {item.company}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-slate-500 font-medium">
                    {item.plan}
                  </td>
                  <td className="py-4 font-mono text-[11px] text-slate-400 font-medium">
                    {item.invoiceId}
                  </td>
                  <td className="py-4 text-slate-500 font-medium whitespace-nowrap">
                    {item.dueDate}
                  </td>
                  <td className="py-4 font-bold text-slate-800 whitespace-nowrap">
                    {item.amountOverdue}
                  </td>
                  <td className="py-4 text-rose-500 font-bold whitespace-nowrap">
                    {item.overdueDays} Days
                  </td>
                  <td className="py-4">
                    <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-500 border border-rose-100">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedPayment(item)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#5B50E5] hover:underline cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSendReminder(item)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#5B50E5] hover:underline cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Reminder</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value))
                setCurrentPage(1)
              }}
              className="border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#5B50E5]/30 cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <span>
              Showing {filteredPayments.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} -{" "}
              {Math.min(currentPage * rowsPerPage, filteredPayments.length)} of {filteredPayments.length} payments
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

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
              ))}

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

      <OverduePaymentModal
        payment={selectedPayment}
        onClose={() => setSelectedPayment(null)}
        onSendReminder={handleSendReminder}
      />
    </>
  )
}
