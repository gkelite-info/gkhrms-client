"use client"

import { useState, useMemo } from "react"
import {
  ArrowLeft,
  Search,
  ChevronDown,
  Calendar,
  FileText,
  AlertCircle,
  IndianRupee,
  ArrowUp,
} from "lucide-react"
import { OverduePaymentItem, OverduePaymentKpi } from "../types"
import {
  overduePaymentKpis,
  mockOverduePayments,
} from "../data/mockFinanceData"
import ViewOverduePaymentModal from "./ViewOverduePaymentModal"
import ReusablePagination from "@/../reusableComponents/ReusablePagination"

interface OverduePaymentsViewProps {
  onBack: () => void
}

export default function OverduePaymentsView({ onBack }: OverduePaymentsViewProps) {
  const [payments, setPayments] = useState<OverduePaymentItem[]>(mockOverduePayments)
  const [search, setSearch] = useState("")
  const [paymentTypeFilter, setPaymentTypeFilter] = useState("Reimbursement")
  const [departmentFilter, setDepartmentFilter] = useState("All Departments")
  const [dateRange, setDateRange] = useState("Select date range")
  const [selectedPayment, setSelectedPayment] = useState<OverduePaymentItem | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const filteredPayments = useMemo(() => {
    return payments.filter((item) => {
      const q = search.toLowerCase().trim()
      const matchesSearch =
        !q ||
        item.paymentId.toLowerCase().includes(q) ||
        item.payee.toLowerCase().includes(q) ||
        item.department.toLowerCase().includes(q) ||
        item.paymentType.toLowerCase().includes(q)

      const matchesType =
        paymentTypeFilter === "All Types" ||
        item.paymentType === paymentTypeFilter

      const matchesDept =
        departmentFilter === "All Departments" ||
        item.department.toLowerCase() === departmentFilter.toLowerCase()

      return matchesSearch && matchesType && matchesDept
    })
  }, [payments, search, paymentTypeFilter, departmentFilter])

  const totalPages = Math.ceil(filteredPayments.length / pageSize) || 1
  const paginatedPayments = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredPayments.slice(start, start + pageSize)
  }, [filteredPayments, currentPage, pageSize])

  const renderKpiIcon = (iconType: OverduePaymentKpi["iconType"]) => {
    switch (iconType) {
      case "file":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
        )
      case "alert":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
        )
      case "currency":
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
            <IndianRupee className="w-5 h-5" />
          </div>
        )
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-white rounded-xl border border-slate-200/80 shadow-2xs transition-colors cursor-pointer shrink-0"
          aria-label="Back to overview"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-none">
            Pending / Overdue Payment Details
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review payments that require immediate finance attention.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {overduePaymentKpis.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex flex-col justify-between transition-all hover:shadow-md min-h-[120px]"
          >
            <div className="flex items-start gap-3.5">
              {renderKpiIcon(card.iconType)}
              <div className="flex flex-col min-w-0">
                <span className="text-2xl font-bold text-slate-900 tracking-tight leading-none">
                  {card.value}
                </span>
                <span className="text-xs text-slate-500 font-medium mt-1 leading-snug">
                  {card.title}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-50 flex items-center text-xs">
              <div
                className={`flex items-center gap-1 font-semibold text-xs ${
                  card.trendColor === "red" ? "text-rose-500" : "text-emerald-500"
                }`}
              >
                <ArrowUp className="w-3.5 h-3.5 shrink-0" />
                <span>{card.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-500">
              Search
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Search payment ID, payee..."
                className="w-full h-9 pl-8 pr-3 text-xs rounded-xl border border-slate-200/90 bg-white placeholder-slate-400 focus:outline-none focus:border-[#4F46E5]"
              />
            </div>
          </div>

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
                className="appearance-none w-full bg-white border border-slate-200/90 rounded-xl px-3.5 pr-8 h-9 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#4F46E5] cursor-pointer"
              >
                <option value="Reimbursement">Reimbursement</option>
                <option value="All Types">All Types</option>
                <option value="Vendor Invoice">Vendor Invoice</option>
                <option value="Operational">Operational</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-500">
              Department / Project
            </label>
            <div className="relative">
              <select
                value={departmentFilter}
                onChange={(e) => {
                  setDepartmentFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="appearance-none w-full bg-white border border-slate-200/90 rounded-xl px-3.5 pr-8 h-9 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#4F46E5] cursor-pointer"
              >
                <option value="All Departments">All Departments</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Operations">Operations</option>
                <option value="Product">Product</option>
                <option value="Finance">Finance</option>
                <option value="Engineering">Engineering</option>
                <option value="HR & Admin">HR & Admin</option>
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
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="appearance-none w-full bg-white border border-slate-200/90 rounded-xl pl-8 pr-8 h-9 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#4F46E5] cursor-pointer"
              >
                <option value="Select date range">Select date range</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="This Month">This Month</option>
                <option value="Last Quarter">Last Quarter</option>
                <option value="All Time">All Time</option>
              </select>
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Payments Requiring Attention
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Payments that are pending or overdue and require finance manager action.
          </p>
        </div>

        <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pt-1">Payment ID</th>
                <th className="pb-3 pt-1">Payee</th>
                <th className="pb-3 pt-1">Payment Type</th>
                <th className="pb-3 pt-1">Department / Project</th>
                <th className="pb-3 pt-1">Amount</th>
                <th className="pb-3 pt-1">Due Date</th>
                <th className="pb-3 pt-1">Days Due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {paginatedPayments.length > 0 ? (
                paginatedPayments.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedPayment(item)}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 font-medium text-slate-700">
                      {item.paymentId}
                    </td>
                    <td className="py-3.5 font-semibold text-slate-800">
                      {item.payee}
                    </td>
                    <td className="py-3.5 text-slate-500">
                      {item.paymentType}
                    </td>
                    <td className="py-3.5 text-slate-600">
                      {item.department}
                    </td>
                    <td className="py-3.5 font-bold text-slate-900">
                      {item.formattedAmount}
                    </td>
                    <td className="py-3.5 text-slate-600 whitespace-nowrap">
                      {item.dueDate}
                    </td>
                    <td className="py-3.5 whitespace-nowrap">
                      {item.daysDue === "-" ? (
                        <span className="text-slate-400">-</span>
                      ) : (
                        <span className="font-semibold text-rose-500">
                          {item.daysDue}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-10 text-center text-slate-400 text-xs"
                  >
                    No payments requiring attention found matching current filters.
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
          pageSizeOptions={[5, 10, 20]}
          showPageSize={true}
          showTotalInfo={true}
          showJumpToPage={false}
          className="pt-4 border-t border-slate-100"
        />
      </div>

      <ViewOverduePaymentModal
        payment={selectedPayment}
        onClose={() => setSelectedPayment(null)}
      />
    </div>
  )
}

