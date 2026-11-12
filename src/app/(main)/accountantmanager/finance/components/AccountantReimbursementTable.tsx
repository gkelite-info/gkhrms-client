"use client"

import {
  Plane,
  Building,
  Users,
  Fuel,
  ShoppingBag,
  Wifi,
  FileText,
  Eye,
  Check,
  X,
  Clock,
  CreditCard,
} from "lucide-react"
import ReusableAvatar from "../../../../../../reusableComponents/ReusableAvatar"
import { AccountantReimbursementClaim } from "../types"

interface AccountantReimbursementTableProps {
  claims: AccountantReimbursementClaim[]
  onViewClick?: (claim: AccountantReimbursementClaim) => void
  onProcessPayClick?: (claim: AccountantReimbursementClaim) => void
}

export default function AccountantReimbursementTable({
  claims,
  onViewClick,
  onProcessPayClick,
}: AccountantReimbursementTableProps) {
  const renderExpenseIcon = (type: string) => {
    switch (type) {
      case "Travel":
        return <Plane className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
      case "Hotel (Stay)":
        return <Building className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
      case "Client Meeting":
        return <Users className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
      case "Fuel":
        return <Fuel className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
      case "Office Purchase":
        return <ShoppingBag className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
      case "Internet Reimbursement":
        return <Wifi className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
      default:
        return <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
    }
  }

  const renderApprovalBadge = (status: AccountantReimbursementClaim["approvalStatus"]) => {
    switch (status) {
      case "Pending Review":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-600">
            <Clock className="w-3 h-3" />
            <span>Pending Review</span>
          </span>
        )
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600">
            <Check className="w-3 h-3 stroke-[3]" />
            <span>Approved</span>
          </span>
        )
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-600">
            <X className="w-3 h-3 stroke-[3]" />
            <span>Rejected</span>
          </span>
        )
    }
  }

  const renderPaymentBadge = (status: AccountantReimbursementClaim["paymentStatus"]) => {
    if (status === "Paid") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600">
          <Check className="w-3 h-3 stroke-[3]" />
          <span>Paid</span>
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-600">
        <X className="w-3 h-3 stroke-[3]" />
        <span>Unpaid</span>
      </span>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[960px]">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-semibold text-slate-500 bg-white">
              <th className="py-3.5 px-5 font-semibold">Employee</th>
              <th className="py-3.5 px-4 font-semibold">Expense Type</th>
              <th className="py-3.5 px-4 font-semibold">Department</th>
              <th className="py-3.5 px-4 font-semibold">Submitted Date</th>
              <th className="py-3.5 px-4 font-semibold">Amount Paid by Employee</th>
              <th className="py-3.5 px-4 font-semibold">Approval Status</th>
              <th className="py-3.5 px-4 font-semibold">Payment Status</th>
              <th className="py-3.5 px-5 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80 text-xs">
            {claims.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-12 text-center text-xs font-medium text-slate-400"
                >
                  No reimbursement claims match the selected filters.
                </td>
              </tr>
            ) : (
              claims.map((claim) => {
                const canProcessPay =
                  (claim.id === "cl-1" || claim.id === "cl-2") &&
                  claim.paymentStatus === "Unpaid"

                return (
                  <tr
                    key={claim.id}
                    className="hover:bg-slate-50/70 transition-colors group"
                  >
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <ReusableAvatar
                          name={claim.employeeName}
                          size={32}
                          shape="circle"
                          fallbackType="initials"
                          bgColor="#E0E7FF"
                          textColor="#4F46E5"
                          className="shrink-0 font-bold"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 leading-tight">
                            {claim.employeeName}
                          </p>
                          <span className="text-[11px] text-slate-400 font-normal">
                            {claim.employeeRole}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-slate-700 font-medium">
                        {renderExpenseIcon(claim.expenseType)}
                        <span>{claim.expenseType}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {claim.department}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {claim.submittedDate}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                      {claim.amount}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {renderApprovalBadge(claim.approvalStatus)}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {renderPaymentBadge(claim.paymentStatus)}
                    </td>

                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onViewClick?.(claim)}
                          className="p-1 text-slate-400 hover:text-[#4F46E5] hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                          title="View claim details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {canProcessPay && (
                          <button
                            type="button"
                            onClick={() => onProcessPayClick?.(claim)}
                            className="flex items-center gap-1 px-2.5 py-1 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                          >
                            <CreditCard className="w-3 h-3" />
                            <span>Process Pay</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

