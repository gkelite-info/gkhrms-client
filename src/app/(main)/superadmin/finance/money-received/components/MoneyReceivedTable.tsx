"use client"

import { useState, useMemo } from "react"
import {
  Search,
  ChevronDown,
  Calendar,
  Eye,
  Receipt,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import TransactionDetailsModal, {
  ReceivedPayment,
} from "./TransactionDetailsModal"

const RECEIVED_PAYMENTS_DATA: ReceivedPayment[] = [
  {
    id: "TXN-105784",
    company: "NovaTech Solutions",
    plan: "Enterprise",
    billingCycle: "Annual",
    billingPeriod: "01 Nov 2026 - 31 Oct 2027",
    amount: "₹ 4,00,000",
    date: "10 Nov 2026",
    method: "Bank Transfer",
    status: "Paid",
  },
  {
    id: "TXN-105783",
    company: "Apex Industries",
    plan: "Professional",
    billingCycle: "Annual",
    billingPeriod: "01 Nov 2026 - 31 Oct 2027",
    amount: "₹ 2,40,000",
    date: "09 Nov 2026",
    method: "UPI",
    status: "Paid",
  },
  {
    id: "TXN-105782",
    company: "GreenLeaf Retail",
    plan: "Basic",
    billingCycle: "Monthly",
    billingPeriod: "01 Nov 2026 - 30 Nov 2026",
    amount: "₹ 1,20,000",
    date: "08 Nov 2026",
    method: "Card",
    status: "Paid",
  },
  {
    id: "TXN-105781",
    company: "BluePeak Systems",
    plan: "Professional",
    billingCycle: "Monthly",
    billingPeriod: "01 Nov 2026 - 30 Nov 2026",
    amount: "₹ 2,40,000",
    date: "07 Nov 2026",
    method: "UPI",
    status: "Paid",
  },
  {
    id: "TXN-105780",
    company: "Horizon Works",
    plan: "Enterprise",
    billingCycle: "Annual",
    billingPeriod: "01 Nov 2026 - 31 Oct 2027",
    amount: "₹ 4,00,000",
    date: "06 Nov 2026",
    method: "Bank Transfer",
    status: "Paid",
  },
  {
    id: "TXN-105779",
    company: "Vertex Labs",
    plan: "Professional",
    billingCycle: "Monthly",
    billingPeriod: "01 Nov 2026 - 30 Nov 2026",
    amount: "₹ 2,40,000",
    date: "06 Nov 2026",
    method: "Card",
    status: "Paid",
  },
]

const PLAN_BADGES = {
  Enterprise: "bg-purple-50 text-purple-700 border border-purple-100",
  Professional: "bg-blue-50 text-blue-600 border border-blue-100",
  Basic: "bg-amber-50 text-amber-700 border border-amber-100",
}

export default function MoneyReceivedTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("All Plans")
  const [selectedCycle, setSelectedCycle] = useState("All Cycles")
  const [selectedMethod, setSelectedMethod] = useState("All Methods")
  const [selectedDateRange, setSelectedDateRange] = useState("Last 30 Days")

  const [planDropdownOpen, setPlanDropdownOpen] = useState(false)
  const [cycleDropdownOpen, setCycleDropdownOpen] = useState(false)
  const [methodDropdownOpen, setMethodDropdownOpen] = useState(false)
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false)

  const [selectedPayment, setSelectedPayment] = useState<ReceivedPayment | null>(
    null
  )

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const filteredPayments = useMemo(() => {
    return RECEIVED_PAYMENTS_DATA.filter((item) => {
      const matchesSearch =
        item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesPlan =
        selectedPlan === "All Plans" || item.plan === selectedPlan

      const matchesCycle =
        selectedCycle === "All Cycles" || item.billingCycle === selectedCycle

      const matchesMethod =
        selectedMethod === "All Methods" || item.method === selectedMethod

      return matchesSearch && matchesPlan && matchesCycle && matchesMethod
    })
  }, [searchQuery, selectedPlan, selectedCycle, selectedMethod])

  const totalPages = Math.ceil(filteredPayments.length / rowsPerPage) || 1

  const paginatedPayments = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredPayments.slice(start, start + rowsPerPage)
  }, [filteredPayments, currentPage, rowsPerPage])

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company name or transaction ID"
              className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/15 focus:border-[#5B50E5] transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setPlanDropdownOpen(!planDropdownOpen)
                  setCycleDropdownOpen(false)
                  setMethodDropdownOpen(false)
                  setDateDropdownOpen(false)
                }}
                className="h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>Subscription Plan: {selectedPlan}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {planDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-44 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                  {["All Plans", "Enterprise", "Professional", "Basic"].map(
                    (opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setSelectedPlan(opt)
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
                  setCycleDropdownOpen(!cycleDropdownOpen)
                  setPlanDropdownOpen(false)
                  setMethodDropdownOpen(false)
                  setDateDropdownOpen(false)
                }}
                className="h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>Billing Cycle: {selectedCycle}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {cycleDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-40 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                  {["All Cycles", "Annual", "Monthly"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedCycle(opt)
                        setCycleDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                        selectedCycle === opt
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
                  setMethodDropdownOpen(!methodDropdownOpen)
                  setPlanDropdownOpen(false)
                  setCycleDropdownOpen(false)
                  setDateDropdownOpen(false)
                }}
                className="h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>Payment Method: {selectedMethod}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {methodDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-44 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                  {["All Methods", "Bank Transfer", "UPI", "Card"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedMethod(opt)
                        setMethodDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                        selectedMethod === opt
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
                  setPlanDropdownOpen(false)
                  setCycleDropdownOpen(false)
                  setMethodDropdownOpen(false)
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
                    "Last 7 Days",
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
        </div>

        <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#EEF0FD] flex items-center justify-center text-[#5B50E5]">
              <Receipt className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">
              Received Payments
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 bg-slate-50/50">
                  <th className="py-3 px-5 font-semibold">TRANSACTION ID</th>
                  <th className="py-3 px-5 font-semibold">COMPANY NAME</th>
                  <th className="py-3 px-5 font-semibold">SUBSCRIPTION PLAN</th>
                  <th className="py-3 px-5 font-semibold">BILLING CYCLE</th>
                  <th className="py-3 px-5 font-semibold">BILLING PERIOD</th>
                  <th className="py-3 px-5 font-semibold">AMOUNT RECEIVED</th>
                  <th className="py-3 px-5 font-semibold">PAYMENT DATE</th>
                  <th className="py-3 px-5 font-semibold">PAYMENT METHOD</th>
                  <th className="py-3 px-5 font-semibold">STATUS</th>
                  <th className="py-3 px-5 font-semibold text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginatedPayments.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-3.5 px-5 font-semibold text-slate-700">
                      {item.id}
                    </td>
                    <td className="py-3.5 px-5 font-bold text-slate-800">
                      {item.company}
                    </td>
                    <td className="py-3.5 px-5">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          PLAN_BADGES[item.plan]
                        }`}
                      >
                        {item.plan}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-600 font-medium">
                      {item.billingCycle}
                    </td>
                    <td className="py-3.5 px-5 text-slate-500 font-medium whitespace-nowrap">
                      {item.billingPeriod}
                    </td>
                    <td className="py-3.5 px-5 font-bold text-slate-800 whitespace-nowrap">
                      {item.amount}
                    </td>
                    <td className="py-3.5 px-5 text-slate-500 font-medium whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="py-3.5 px-5 text-slate-600 font-medium">
                      {item.method}
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedPayment(item)}
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
                {Math.min(currentPage * rowsPerPage, filteredPayments.length)} of{" "}
                {filteredPayments.length} payments
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
      </div>

      <TransactionDetailsModal
        payment={selectedPayment}
        onClose={() => setSelectedPayment(null)}
      />
    </>
  )
}

