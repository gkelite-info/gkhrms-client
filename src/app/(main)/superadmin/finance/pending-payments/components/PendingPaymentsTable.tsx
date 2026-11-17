"use client"

import { useState, useMemo } from "react"
import {
  Search,
  ChevronDown,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import PendingPaymentDetailsModal, {
  PendingPayment,
} from "./PendingPaymentDetailsModal"

const PENDING_PAYMENTS_DATA: PendingPayment[] = [
  {
    company: "TechNova Solutions",
    plan: "Enterprise",
    invoiceId: "INV-2026-1045",
    billingPeriod: "Oct 01, 2026 - Oct 31, 2026",
    amountDue: "₹ 1,20,000",
    dueDate: "Nov 05, 2026",
    daysPending: 6,
    status: "Pending",
  },
  {
    company: "Orion Enterprises",
    plan: "Professional",
    invoiceId: "INV-2026-1042",
    billingPeriod: "Oct 01, 2026 - Oct 31, 2026",
    amountDue: "₹ 80,000",
    dueDate: "Nov 03, 2026",
    daysPending: 8,
    status: "Pending",
  },
  {
    company: "Horizon Foods",
    plan: "Standard",
    invoiceId: "INV-2026-1039",
    billingPeriod: "Oct 01, 2026 - Oct 31, 2026",
    amountDue: "₹ 60,000",
    dueDate: "Oct 28, 2026",
    daysPending: 14,
    status: "Pending",
  },
  {
    company: "Aurora Digital",
    plan: "Professional",
    invoiceId: "INV-2026-1037",
    billingPeriod: "Sep 01, 2026 - Sep 30, 2026",
    amountDue: "₹ 1,00,000",
    dueDate: "Oct 24, 2026",
    daysPending: 18,
    status: "Pending",
  },
  {
    company: "Vertex Systems",
    plan: "Enterprise",
    invoiceId: "INV-2026-1033",
    billingPeriod: "Sep 01, 2026 - Sep 30, 2026",
    amountDue: "₹ 60,000",
    dueDate: "Oct 15, 2026",
    daysPending: 26,
    status: "Pending",
  },
]

export default function PendingPaymentsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("All Plans")
  const [selectedPeriod, setSelectedPeriod] = useState("All Billing Periods")
  const [selectedDueStatus, setSelectedDueStatus] = useState("All Due Status")
  const [selectedDateRange, setSelectedDateRange] = useState("Date Range")

  const [planDropdownOpen, setPlanDropdownOpen] = useState(false)
  const [periodDropdownOpen, setPeriodDropdownOpen] = useState(false)
  const [dueStatusDropdownOpen, setDueStatusDropdownOpen] = useState(false)
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [selectedPayment, setSelectedPayment] = useState<PendingPayment | null>(
    null
  )

  const filteredPayments = useMemo(() => {
    return PENDING_PAYMENTS_DATA.filter((item) => {
      const matchesSearch =
        item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.invoiceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.plan.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesPlan =
        selectedPlan === "All Plans" || item.plan === selectedPlan

      const matchesPeriod =
        selectedPeriod === "All Billing Periods" ||
        item.billingPeriod === selectedPeriod

      let matchesDueStatus = true
      if (selectedDueStatus === "< 7 Days") {
        matchesDueStatus = item.daysPending < 7
      } else if (selectedDueStatus === "7 - 14 Days") {
        matchesDueStatus = item.daysPending >= 7 && item.daysPending <= 14
      } else if (selectedDueStatus === "> 14 Days") {
        matchesDueStatus = item.daysPending > 14
      }

      return matchesSearch && matchesPlan && matchesPeriod && matchesDueStatus
    })
  }, [searchQuery, selectedPlan, selectedPeriod, selectedDueStatus])

  const totalPages = Math.ceil(filteredPayments.length / rowsPerPage) || 1

  const paginatedPayments = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredPayments.slice(start, start + rowsPerPage)
  }, [filteredPayments, currentPage, rowsPerPage])

  return (
    <>
      <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs p-6 flex flex-col gap-6 overflow-hidden">
        <div className="flex flex-col gap-3">
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
                    setPeriodDropdownOpen(false)
                    setDueStatusDropdownOpen(false)
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
                    setPeriodDropdownOpen(!periodDropdownOpen)
                    setPlanDropdownOpen(false)
                    setDueStatusDropdownOpen(false)
                    setDateDropdownOpen(false)
                  }}
                  className="h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>{selectedPeriod}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {periodDropdownOpen && (
                  <div className="absolute left-0 mt-1.5 w-56 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                    {[
                      "All Billing Periods",
                      "Oct 01, 2026 - Oct 31, 2026",
                      "Sep 01, 2026 - Sep 30, 2026",
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setSelectedPeriod(opt)
                          setCurrentPage(1)
                          setPeriodDropdownOpen(false)
                        }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                          selectedPeriod === opt
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
                  setPeriodDropdownOpen(false)
                  setDueStatusDropdownOpen(false)
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

          <div className="relative self-start">
            <button
              type="button"
              onClick={() => {
                setDueStatusDropdownOpen(!dueStatusDropdownOpen)
                setPlanDropdownOpen(false)
                setPeriodDropdownOpen(false)
                setDateDropdownOpen(false)
              }}
              className="h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{selectedDueStatus}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {dueStatusDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-40 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {["All Due Status", "< 7 Days", "7 - 14 Days", "> 14 Days"].map(
                  (opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedDueStatus(opt)
                        setCurrentPage(1)
                        setDueStatusDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                        selectedDueStatus === opt
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
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400">
                <th className="pb-4 font-semibold">COMPANY NAME</th>
                <th className="pb-4 font-semibold">PLAN</th>
                <th className="pb-4 font-semibold">INVOICE ID</th>
                <th className="pb-4 font-semibold">BILLING PERIOD</th>
                <th className="pb-4 font-semibold">AMOUNT DUE</th>
                <th className="pb-4 font-semibold">DUE DATE</th>
                <th className="pb-4 font-semibold">DAYS PENDING</th>
                <th className="pb-4 font-semibold text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedPayments.map((item) => (
                <tr
                  key={item.invoiceId}
                  onClick={() => setSelectedPayment(item)}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                >
                  <td className="py-4 font-bold text-slate-800">
                    {item.company}
                  </td>
                  <td className="py-4 text-slate-500 font-medium">
                    {item.plan}
                  </td>
                  <td className="py-4 font-mono text-[11px] text-slate-400 font-medium">
                    {item.invoiceId}
                  </td>
                  <td className="py-4 text-slate-500 font-medium whitespace-nowrap">
                    {item.billingPeriod}
                  </td>
                  <td className="py-4 font-bold text-slate-800 whitespace-nowrap">
                    {item.amountDue}
                  </td>
                  <td className="py-4 text-slate-500 font-medium whitespace-nowrap">
                    {item.dueDate}
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                        item.daysPending <= 10
                          ? "bg-[#FEF9C3] text-[#A16207]"
                          : "bg-[#FFE4E6] text-[#E11D48]"
                      }`}
                    >
                      {item.daysPending} Days
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF9C3] text-[#CA8A04] border border-amber-200/50">
                      {item.status}
                    </span>
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

      <PendingPaymentDetailsModal
        payment={selectedPayment}
        onClose={() => setSelectedPayment(null)}
      />
    </>
  )
}
