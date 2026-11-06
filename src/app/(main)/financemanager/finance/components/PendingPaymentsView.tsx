"use client"

import { useState, useMemo } from "react"
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  Clock,
  AlertTriangle,
  TrendingUp,
  Search,
} from "lucide-react"
import {
  PendingPaymentItem,
  PendingPaymentType,
  PendingPaymentKpiData,
} from "../types"
import {
  pendingPaymentKpis,
  mockPendingPayments,
} from "../data/mockFinanceData"
import ViewPendingPaymentModal from "./ViewPendingPaymentModal"
import ReusablePagination from "@/../reusableComponents/ReusablePagination"

interface PendingPaymentsViewProps {
  onBack: () => void
}

export default function PendingPaymentsView({ onBack }: PendingPaymentsViewProps) {
  const [payments, setPayments] = useState<PendingPaymentItem[]>(mockPendingPayments)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")
  const [employeeFilter, setEmployeeFilter] = useState("All")
  const [projectFilter, setProjectFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("Pending")
  const [dueDateRange, setDueDateRange] = useState("01 Oct 2026 - 31 Oct 2026")
  const [selectedPayment, setSelectedPayment] = useState<PendingPaymentItem | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)

  const filteredPayments = useMemo(() => {
    return payments.filter((item) => {
      const q = search.toLowerCase().trim()
      const matchesSearch =
        !q ||
        item.reference.toLowerCase().includes(q) ||
        item.employee.toLowerCase().includes(q) ||
        item.department.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)

      const matchesType =
        typeFilter === "All" || item.type === (typeFilter as PendingPaymentType)

      const matchesEmployee =
        employeeFilter === "All" || item.employee === employeeFilter

      const matchesProject =
        projectFilter === "All" || item.department === projectFilter

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter

      return (
        matchesSearch &&
        matchesType &&
        matchesEmployee &&
        matchesProject &&
        matchesStatus
      )
    })
  }, [payments, search, typeFilter, employeeFilter, projectFilter, statusFilter])

  const totalPages = Math.ceil(filteredPayments.length / pageSize) || 1
  const paginatedPayments = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredPayments.slice(start, start + pageSize)
  }, [filteredPayments, currentPage, pageSize])

  const renderTypeBadge = (type: PendingPaymentType) => {
    switch (type) {
      case "Reimbursement":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]/60">
            Reimbursement
          </span>
        )
      case "Expense Claim":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FFF1F2] text-[#E11D48] border border-[#FECDD3]">
            Expense Claim
          </span>
        )
      case "Travel Expense":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F0FDFA] text-[#0D9488] border border-[#99F6E4]">
            Travel Expense
          </span>
        )
      case "Subscription":
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FEFCE8] text-[#CA8A04] border border-[#FEF08A]">
            Subscription
          </span>
        )
    }
  }

  const renderKpiIcon = (iconType: PendingPaymentKpiData["iconType"]) => {
    switch (iconType) {
      case "clock":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        )
      case "alert":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
        )
      case "calendar":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
        )
      case "users":
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
        )
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-white rounded-xl border border-slate-200/80 shadow-2xs transition-colors cursor-pointer"
            aria-label="Back to overview"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-none">
              Pending Payments
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Payments that are pending approval or scheduled for payment.
            </p>
          </div>
        </div>

        <div className="relative">
          <select
            value={dueDateRange}
            onChange={(e) => setDueDateRange(e.target.value)}
            className="appearance-none bg-white border border-slate-200/90 rounded-xl pl-8 pr-8 py-2 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#4F46E5] cursor-pointer min-w-[200px]"
          >
            <option value="01 Oct 2026 - 31 Oct 2026">01 Oct 2026 - 31 Oct 2026</option>
            <option value="This Month">This Month</option>
            <option value="Next 30 Days">Next 30 Days</option>
            <option value="All Time">All Time</option>
          </select>
          <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {pendingPaymentKpis.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center gap-3.5 transition-all hover:shadow-md"
          >
            {renderKpiIcon(card.iconType)}
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-slate-700">
                {card.title}
              </span>
              <span className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-0.5 leading-snug">
                {card.amount}
              </span>
              <span className="text-[11px] font-medium text-slate-400">
                {card.subtext}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-500">
              Payment Type
            </label>
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="appearance-none w-full bg-white border border-slate-200/90 rounded-xl px-3.5 pr-8 py-2 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#4F46E5] cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Reimbursement">Reimbursement</option>
                <option value="Expense Claim">Expense Claim</option>
                <option value="Travel Expense">Travel Expense</option>
                <option value="Subscription">Subscription</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-500">
              Employee
            </label>
            <div className="relative">
              <select
                value={employeeFilter}
                onChange={(e) => {
                  setEmployeeFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="appearance-none w-full bg-white border border-slate-200/90 rounded-xl px-3.5 pr-8 py-2 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#4F46E5] cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Rahul Sharma">Rahul Sharma</option>
                <option value="Priya Mehta">Priya Mehta</option>
                <option value="Amit Kumar">Amit Kumar</option>
                <option value="Sneha Patel">Sneha Patel</option>
                <option value="Vikram Reddy">Vikram Reddy</option>
                <option value="SoftwareHub Licences">SoftwareHub Licences</option>
                <option value="Kavya Nair">Kavya Nair</option>
                <option value="Arjun Patel">Arjun Patel</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-500">
              Project
            </label>
            <div className="relative">
              <select
                value={projectFilter}
                onChange={(e) => {
                  setProjectFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="appearance-none w-full bg-white border border-slate-200/90 rounded-xl px-3.5 pr-8 py-2 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#4F46E5] cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Product Team">Product Team</option>
                <option value="Operations">Operations</option>
                <option value="Sales Team">Sales Team</option>
                <option value="Client Visit">Client Visit</option>
                <option value="Field Operations">Field Operations</option>
                <option value="HR & Admin">HR & Admin</option>
                <option value="Client Support">Client Support</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-500">
              Due Date
            </label>
            <div className="relative">
              <select
                value={dueDateRange}
                onChange={(e) => {
                  setDueDateRange(e.target.value)
                  setCurrentPage(1)
                }}
                className="appearance-none w-full bg-white border border-slate-200/90 rounded-xl px-3.5 pr-8 py-2 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#4F46E5] cursor-pointer"
              >
                <option value="01 Oct 2026 - 31 Oct 2026">01 Oct 2026 - 31 Oct 2026</option>
                <option value="This Month">This Month</option>
                <option value="Next 30 Days">Next 30 Days</option>
                <option value="All Time">All Time</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-500">
              Status
            </label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="appearance-none w-full bg-white border border-slate-200/90 rounded-xl px-3.5 pr-8 py-2 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#4F46E5] cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
                <option value="Processing">Processing</option>
                <option value="Approved">Approved</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Pending Payments ({filteredPayments.length})
          </h3>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Search by reference, requester..."
              className="w-full h-8.5 pl-8 pr-3 bg-white text-xs text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200/90 shadow-2xs focus:outline-none focus:border-[#4F46E5]"
            />
          </div>
        </div>

        <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400">
                <th className="pb-3 pt-1">Due Date</th>
                <th className="pb-3 pt-1">Type</th>
                <th className="pb-3 pt-1">Reference</th>
                <th className="pb-3 pt-1">Employee / Requester</th>
                <th className="pb-3 pt-1">Project / Department</th>
                <th className="pb-3 pt-1">Amount (₹)</th>
                <th className="pb-3 pt-1">Status</th>
                <th className="pb-3 pt-1 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {paginatedPayments.length > 0 ? (
                paginatedPayments.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-3.5 font-medium text-slate-600 whitespace-nowrap">
                      {item.dueDate}
                    </td>
                    <td className="py-3.5 whitespace-nowrap">
                      {renderTypeBadge(item.type)}
                    </td>
                    <td className="py-3.5 font-mono text-slate-700">
                      {item.reference}
                    </td>
                    <td className="py-3.5 font-medium text-slate-800">
                      {item.employee}
                    </td>
                    <td className="py-3.5 text-slate-600">
                      {item.department}
                    </td>
                    <td className="py-3.5 font-bold text-slate-900">
                      {item.formattedAmount}
                    </td>
                    <td className="py-3.5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold text-[#D97706]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setSelectedPayment(item)}
                        className="text-xs font-semibold text-[#4F46E5] hover:text-[#4338CA] hover:underline cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="py-10 text-center text-slate-400 text-xs"
                  >
                    No pending payments found matching current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <ReusablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredPayments.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(size) => {
            setPageSize(size)
            setCurrentPage(1)
          }}
          pageSizeOptions={[5, 8, 10, 20]}
          showPageSize={true}
          showTotalInfo={true}
          showJumpToPage={false}
          className="pt-4 border-t border-slate-100"
        />
      </div>

      <ViewPendingPaymentModal
        payment={selectedPayment}
        onClose={() => setSelectedPayment(null)}
        onApprove={(id) => {
          setPayments((prev) => prev.filter((p) => p.id !== id))
        }}
      />
    </div>
  )
}

