"use client"

import { useState, useMemo } from "react"
import {
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  Database,
  ArrowUp,
  ArrowDown,
  Calendar,
  ChevronDown,
  Plus,
} from "lucide-react"
import { PaymentItem, PaymentStatus, PaymentType, PayeeType } from "../types"
import { paymentsKpiCards, mockPayments } from "../data/mockFinanceData"
import { useFinance } from "../context/FinanceContext"
import AddPaymentModal from "./AddPaymentModal"
import ViewPaymentModal from "./ViewPaymentModal"
import ReusablePagination from "@/../reusableComponents/ReusablePagination"

interface PaymentsViewProps {
  onTotalPaymentsClick?: () => void
  onOverduePaymentsClick?: () => void
}

export default function PaymentsView({
  onTotalPaymentsClick,
  onOverduePaymentsClick,
}: PaymentsViewProps) {
  const { searchQuery } = useFinance()
  const [payments, setPayments] = useState<PaymentItem[]>(mockPayments)
  const [paymentTypeFilter, setPaymentTypeFilter] = useState<string>("All")
  const [payeeTypeFilter, setPayeeTypeFilter] = useState<string>("All")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [dateRangeFilter, setDateRangeFilter] = useState<string>("Last 30 Days")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<PaymentItem | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(8)

  const handleAddPayment = (newPayment: PaymentItem) => {
    setPayments((prev) => [newPayment, ...prev])
  }

  const filteredPayments = useMemo(() => {
    return payments.filter((item) => {
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        item.paymentId.toLowerCase().includes(q) ||
        item.payee.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.paymentType.toLowerCase().includes(q)

      const matchesType =
        paymentTypeFilter === "All" || item.paymentType === (paymentTypeFilter as PaymentType)

      const matchesPayeeType =
        payeeTypeFilter === "All" || item.payeeType === (payeeTypeFilter as PayeeType)

      const matchesStatus =
        statusFilter === "All" || item.status === (statusFilter as PaymentStatus)

      return matchesSearch && matchesType && matchesPayeeType && matchesStatus
    })
  }, [payments, searchQuery, paymentTypeFilter, payeeTypeFilter, statusFilter])

  const totalPages = Math.ceil(filteredPayments.length / pageSize) || 1
  const paginatedPayments = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredPayments.slice(start, start + pageSize)
  }, [filteredPayments, currentPage, pageSize])

  const renderStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case "Paid":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
            Paid
          </span>
        )
      case "Scheduled":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FAF5FF] text-[#9333EA] border border-[#F3E8FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9333EA]" />
            Scheduled
          </span>
        )
      case "Processing":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            Processing
          </span>
        )
      case "Overdue":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
            Overdue
          </span>
        )
      case "Pending":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
            Pending
          </span>
        )
    }
  }

  const renderDateCell = (dateStr: string) => {
    if (!dateStr || dateStr === "-") return <span className="text-slate-400">-</span>
    const parts = dateStr.split(" ")
    if (parts.length === 3) {
      return (
        <div className="text-xs leading-tight">
          <span className="font-medium text-slate-700 block">{parts[0]}</span>
          <span className="text-[11px] text-slate-400 block">
            {parts[1]} {parts[2]}
          </span>
        </div>
      )
    }
    return <span className="text-slate-600">{dateStr}</span>
  }

  const renderKpiIcon = (iconType: string) => {
    switch (iconType) {
      case "users":
        return (
          <div className="w-9 h-9 rounded-xl bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center shrink-0">
            <Users className="w-4.5 h-4.5" />
          </div>
        )
      case "clock":
        return (
          <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
            <Clock className="w-4.5 h-4.5" />
          </div>
        )
      case "check":
        return (
          <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4.5 h-4.5" />
          </div>
        )
      case "alert":
        return (
          <div className="w-9 h-9 rounded-xl bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center shrink-0">
            <AlertCircle className="w-4.5 h-4.5" />
          </div>
        )
      case "coins":
      default:
        return (
          <div className="w-9 h-9 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
            <Database className="w-4.5 h-4.5" />
          </div>
        )
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {paymentsKpiCards.map((card) => {
          return (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-100/90 shadow-xs flex flex-col justify-between cursor-default"
            >
              <div className="flex items-start gap-3">
                {renderKpiIcon(card.iconType)}
                <div className="flex flex-col min-w-0">
                  <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-none">
                    {card.value}
                  </span>
                  <span className="text-xs text-slate-500 font-medium mt-1 leading-snug">
                    {card.title}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-50 flex items-center text-xs">
                {card.trend ? (
                  <div
                    className={`flex items-center gap-1 font-semibold text-xs ${
                      card.trendDirection === "down"
                        ? "text-rose-500"
                        : card.id === "overdue-payments"
                        ? "text-rose-500"
                        : "text-emerald-500"
                    }`}
                  >
                    {card.trendDirection === "down" ? (
                      <ArrowDown className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <ArrowUp className="w-3.5 h-3.5 shrink-0" />
                    )}
                    <span>{card.trend}</span>
                    {card.trendLabel && (
                      <span className="font-normal text-slate-400 ml-0.5 text-[11px]">
                        {card.trendLabel}
                      </span>
                    )}
                  </div>
                ) : card.badgeText ? (
                  <span className={`text-xs ${card.badgeColor || "text-slate-400"}`}>
                    {card.badgeText}
                  </span>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-500">
              Payment Type
            </label>
            <div className="relative">
              <select
                value={paymentTypeFilter}
                onChange={(e) => {
                  setPaymentTypeFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="appearance-none bg-white border border-slate-200/90 rounded-xl px-3.5 pr-8 py-2 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#4F46E5] cursor-pointer min-w-[130px]"
              >
                <option value="All">All Types</option>
                <option value="Reimbursement">Reimbursement</option>
                <option value="Vendor Invoice">Vendor Invoice</option>
                <option value="Salary">Salary</option>
                <option value="Operations">Operations</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-500">
              Payee Type
            </label>
            <div className="relative">
              <select
                value={payeeTypeFilter}
                onChange={(e) => {
                  setPayeeTypeFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="appearance-none bg-white border border-slate-200/90 rounded-xl px-3.5 pr-8 py-2 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#4F46E5] cursor-pointer min-w-[130px]"
              >
                <option value="All">All Payees</option>
                <option value="Employee">Employee</option>
                <option value="Vendor">Vendor</option>
                <option value="Contractor">Contractor</option>
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
                className="appearance-none bg-white border border-slate-200/90 rounded-xl px-3.5 pr-8 py-2 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#4F46E5] cursor-pointer min-w-[130px]"
              >
                <option value="All">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Processing">Processing</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-500">
              Date Range
            </label>
            <div className="relative">
              <select
                value={dateRangeFilter}
                onChange={(e) => {
                  setDateRangeFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="appearance-none bg-white border border-slate-200/90 rounded-xl pl-8 pr-8 py-2 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#4F46E5] cursor-pointer min-w-[145px]"
              >
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="This Month">This Month</option>
                <option value="Last 3 Months">Last 3 Months</option>
                <option value="This Year">This Year</option>
                <option value="All Time">All Time</option>
              </select>
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="h-9 px-4 bg-[#4F46E5] hover:bg-[#4338CA] active:scale-98 text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer ml-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Payment</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100/90 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">
          Outgoing Payments ({filteredPayments.length})
        </h3>

        <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pt-1">Payment ID</th>
                <th className="pb-3 pt-1">Payee</th>
                <th className="pb-3 pt-1">Payment Type</th>
                <th className="pb-3 pt-1">Category</th>
                <th className="pb-3 pt-1">Amount</th>
                <th className="pb-3 pt-1">Due Date</th>
                <th className="pb-3 pt-1">Payment Date</th>
                <th className="pb-3 pt-1">Status</th>
                <th className="pb-3 pt-1 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {paginatedPayments.length > 0 ? (
                paginatedPayments.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-3.5 font-medium text-slate-700">
                      {item.paymentId}
                    </td>
                    <td className="py-3.5 font-medium text-slate-800">
                      {item.payee}
                    </td>
                    <td className="py-3.5 text-slate-500">
                      {item.paymentType}
                    </td>
                    <td className="py-3.5 text-slate-500">
                      {item.category}
                    </td>
                    <td className="py-3.5 font-bold text-slate-900">
                      {item.formattedAmount}
                    </td>
                    <td className="py-3.5 whitespace-nowrap">
                      {renderDateCell(item.dueDate)}
                    </td>
                    <td className="py-3.5 whitespace-nowrap">
                      {renderDateCell(item.paymentDate)}
                    </td>
                    <td className="py-3.5 whitespace-nowrap">
                      {renderStatusBadge(item.status)}
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
                    colSpan={9}
                    className="py-10 text-center text-slate-400 text-xs"
                  >
                    No outgoing payments found matching current filters.
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

      <AddPaymentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddPayment}
      />

      <ViewPaymentModal
        payment={selectedPayment}
        onClose={() => setSelectedPayment(null)}
      />
    </div>
  )
}
