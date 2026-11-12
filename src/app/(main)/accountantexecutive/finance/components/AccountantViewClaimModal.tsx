"use client"

import {
  X,
  User,
  Calendar,
  Building2,
  Tag,
  CreditCard,
  FileText,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react"
import { AccountantReimbursementClaim } from "../types"

interface AccountantViewClaimModalProps {
  claim: AccountantReimbursementClaim | null
  onClose: () => void
  onProcessPay?: (claim: AccountantReimbursementClaim) => void
}

export default function AccountantViewClaimModal({
  claim,
  onClose,
  onProcessPay,
}: AccountantViewClaimModalProps) {
  if (!claim) return null

  const isApproved = claim.approvalStatus === "Approved"
  const isUnpaid = claim.paymentStatus === "Unpaid"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className="relative bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 flex flex-col max-h-[88vh] overflow-hidden z-10 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Reimbursement Claim Details
            </h3>
            <p className="text-[11px] text-slate-400">
              Claim ID: {claim.claimId}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto modal-scrollbar p-6 space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <span className="text-[11px] text-slate-400 font-medium block">
                Claim Amount
              </span>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">
                {claim.amount}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  claim.approvalStatus === "Approved"
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200/60"
                    : claim.approvalStatus === "Pending Review"
                    ? "bg-amber-50 text-amber-600 border border-amber-200/60"
                    : "bg-rose-50 text-rose-600 border border-rose-200/60"
                }`}
              >
                {claim.approvalStatus === "Approved" ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : claim.approvalStatus === "Pending Review" ? (
                  <Clock className="w-3.5 h-3.5" />
                ) : (
                  <XCircle className="w-3.5 h-3.5" />
                )}
                {claim.approvalStatus}
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                  claim.paymentStatus === "Paid"
                    ? "bg-emerald-100/70 text-emerald-700"
                    : "bg-rose-100/70 text-rose-700"
                }`}
              >
                {claim.paymentStatus === "Paid" ? "Paid" : "Unpaid"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400">
                <User className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">Claimant</span>
              </div>
              <p className="font-semibold text-slate-800">
                {claim.employeeName}
              </p>
              <p className="text-[11px] text-slate-400 font-normal">
                {claim.employeeRole}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Building2 className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">Department</span>
              </div>
              <p className="font-semibold text-slate-800">{claim.department}</p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Tag className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">Expense Type</span>
              </div>
              <p className="font-semibold text-slate-800">{claim.expenseType}</p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">Submission Date</span>
              </div>
              <p className="font-semibold text-slate-800">
                {claim.submittedDate}
              </p>
            </div>
          </div>

          {claim.notes && (
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-slate-500">
                Employee Justification / Description
              </span>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                {claim.notes}
              </div>
            </div>
          )}

          {claim.receiptName && (
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-slate-500">
                Attached Receipt / Proof
              </span>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-4 h-4 text-[#4F46E5] shrink-0" />
                  <span className="font-medium text-slate-700 truncate">
                    {claim.receiptName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => alert(`Downloading ${claim.receiptName}`)}
                  className="flex items-center gap-1 text-[#4F46E5] hover:text-[#4338CA] font-semibold text-xs transition-colors cursor-pointer shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2.5 px-6 py-4 bg-slate-50/50 border-t border-slate-100 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close
          </button>
          {isApproved && isUnpaid && onProcessPay && (
            <button
              type="button"
              onClick={() => {
                onClose()
                onProcessPay(claim)
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] shadow-sm shadow-indigo-200 transition-all cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Process Pay</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

