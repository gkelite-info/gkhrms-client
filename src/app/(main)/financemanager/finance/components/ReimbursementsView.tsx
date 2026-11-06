"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Calendar, ChevronDown, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { ReimbursementClaim, ReimbursementStatus, ReimbursementPaymentStatus } from "../types"
import { reimbursementsKpiCards, mockReimbursementClaims } from "../data/mockFinanceData"
import KpiCardsGrid from "./KpiCardsGrid"
import AddClaimModal from "./AddClaimModal"
import ViewClaimModal from "./ViewClaimModal"

interface ReimbursementsViewProps {
  onTotalAmountClick?: () => void
}

export default function ReimbursementsView({ onTotalAmountClick }: ReimbursementsViewProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [claims, setClaims] = useState<ReimbursementClaim[]>(mockReimbursementClaims)
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("All")
  const [dateRange, setDateRange] = useState("Last 30 Days")
  const [claimTypeFilter, setClaimTypeFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedClaim, setSelectedClaim] = useState<ReimbursementClaim | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8

  const isAddModalOpen =
    searchParams.get("modal") === "add-claim" ||
    searchParams.get("action") === "add-claim" ||
    searchParams.get("view") === "add-claim"

  const handleOpenAddModal = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("modal", "add-claim")
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleCloseAddModal = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("modal")
    params.delete("action")
    params.delete("view")
    const query = params.toString()
    router.push(query ? `?${query}` : window.location.pathname, { scroll: false })
  }

  const handleCardClick = (cardId: string) => {
    if (cardId === "reimbursements-total-amount" && onTotalAmountClick) {
      onTotalAmountClick()
    }
  }

  const handleAddClaim = (newClaim: ReimbursementClaim) => {
    setClaims((prev) => [newClaim, ...prev])
  }

  const filteredClaims = claims.filter((claim) => {
    const matchesPaymentStatus =
      paymentStatusFilter === "All" ||
      claim.paymentStatus === (paymentStatusFilter as ReimbursementPaymentStatus)

    const matchesClaimType =
      claimTypeFilter === "All" || claim.expenseType === claimTypeFilter

    const matchesStatus =
      statusFilter === "All" || claim.status === (statusFilter as ReimbursementStatus)

    return matchesPaymentStatus && matchesClaimType && matchesStatus
  })

  const totalPages = Math.ceil(filteredClaims.length / pageSize) || 1
  const paginatedClaims = filteredClaims.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const renderStatusBadge = (status: ReimbursementStatus) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
            Approved
          </span>
        )
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
            Pending
          </span>
        )
      case "Paid":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
            Paid
          </span>
        )
      case "Under Review":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FAF5FF] text-[#9333EA] border border-[#F3E8FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9333EA]" />
            Under Review
          </span>
        )
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
            Rejected
          </span>
        )
    }
  }

  const renderPaymentStatusBadge = (status: ReimbursementPaymentStatus) => {
    switch (status) {
      case "Paid":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
            Paid
          </span>
        )
      case "Unpaid":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
            Unpaid
          </span>
        )
      case "Processing":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
            Processing
          </span>
        )
      case "None":
        return <span className="text-slate-400 font-medium pl-3">—</span>
    }
  }

  return (
    <div className="space-y-5">
      <KpiCardsGrid cards={reimbursementsKpiCards} />

      <div className="flex flex-col xl:flex-row items-stretch xl:items-end justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-100/80 shadow-xs">
        <div className="flex flex-wrap items-end gap-3 flex-1">
          <div className="flex flex-col gap-1 min-w-[140px]">
            <label className="text-[11px] font-semibold text-slate-400">
              Payment Status
            </label>
            <div className="relative">
              <select
                value={paymentStatusFilter}
                onChange={(e) => {
                  setPaymentStatusFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full appearance-none h-10 pl-3.5 pr-8 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all cursor-pointer"
              >
                <option value="All">All Payment Status</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Processing">Processing</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1 min-w-[140px]">
            <label className="text-[11px] font-semibold text-slate-400">
              Date Range
            </label>
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full appearance-none h-10 pl-8 pr-8 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all cursor-pointer"
              >
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last 60 Days">Last 60 Days</option>
                <option value="This Year">This Year</option>
              </select>
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1 min-w-[130px]">
            <label className="text-[11px] font-semibold text-slate-400">
              Claim Type
            </label>
            <div className="relative">
              <select
                value={claimTypeFilter}
                onChange={(e) => {
                  setClaimTypeFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full appearance-none h-10 pl-3.5 pr-8 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="Travel">Travel</option>
                <option value="Meals">Meals</option>
                <option value="Client Meeting">Client Meeting</option>
                <option value="Training">Training</option>
                <option value="Office Supplies">Office Supplies</option>
                <option value="Software">Software</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1 min-w-[130px]">
            <label className="text-[11px] font-semibold text-slate-400">
              Status
            </label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full appearance-none h-10 pl-3.5 pr-8 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Paid">Paid</option>
                <option value="Under Review">Under Review</option>
                <option value="Rejected">Rejected</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="h-10 px-5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 mt-2 xl:mt-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Claim</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100/80 shadow-xs space-y-4">
        <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Reimbursement Claims ({filteredClaims.length})
        </h2>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pt-1 font-semibold">Claim ID</th>
                <th className="pb-3 pt-1 font-semibold">Employee</th>
                <th className="pb-3 pt-1 font-semibold">Expense Type</th>
                <th className="pb-3 pt-1 font-semibold">Project / Department</th>
                <th className="pb-3 pt-1 font-semibold">Amount</th>
                <th className="pb-3 pt-1 font-semibold">Submitted On</th>
                <th className="pb-3 pt-1 font-semibold">Status</th>
                <th className="pb-3 pt-1 font-semibold">Payment Status</th>
                <th className="pb-3 pt-1 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {paginatedClaims.length > 0 ? (
                paginatedClaims.map((claim) => (
                  <tr
                    key={claim.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-3.5 font-medium text-slate-700 whitespace-nowrap">
                      {claim.claimId}
                    </td>
                    <td className="py-3.5 text-slate-800 font-semibold whitespace-nowrap">
                      {claim.employee}
                    </td>
                    <td className="py-3.5 text-slate-600 whitespace-nowrap">
                      {claim.expenseType}
                    </td>
                    <td className="py-3.5 text-slate-500 whitespace-nowrap">
                      {claim.department}
                    </td>
                    <td className="py-3.5 text-slate-900 font-bold whitespace-nowrap">
                      {claim.formattedAmount}
                    </td>
                    <td className="py-3.5 text-slate-500 whitespace-nowrap">
                      {claim.submittedOn}
                    </td>
                    <td className="py-3.5 whitespace-nowrap">
                      {renderStatusBadge(claim.status)}
                    </td>
                    <td className="py-3.5 whitespace-nowrap">
                      {renderPaymentStatusBadge(claim.paymentStatus)}
                    </td>
                    <td className="py-3.5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setSelectedClaim(claim)}
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
                    className="py-8 text-center text-slate-400 text-xs"
                  >
                    No reimbursement claims found matching current criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing 1 to {paginatedClaims.length} of {filteredClaims.length} claims
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-7 h-7 rounded-lg border border-slate-200/80 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="w-7 h-7 rounded-lg bg-[#4F46E5] text-white font-bold flex items-center justify-center text-xs shadow-xs">
              {currentPage}
            </span>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-7 h-7 rounded-lg border border-slate-200/80 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <AddClaimModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onAdd={handleAddClaim}
      />

      <ViewClaimModal
        claim={selectedClaim}
        onClose={() => setSelectedClaim(null)}
      />
    </div>
  )
}
