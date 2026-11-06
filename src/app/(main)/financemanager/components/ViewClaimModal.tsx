"use client"

import { X, Calendar, User, Tag, Building2 } from "lucide-react"
import { ReimbursementClaim } from "../types"

interface ViewClaimModalProps {
  claim: ReimbursementClaim | null
  onClose: () => void
}

export default function ViewClaimModal({ claim, onClose }: ViewClaimModalProps) {
  if (!claim) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs font-bold text-[#4F46E5]">
              {claim.claimId}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Reimbursement Voucher
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div className="bg-slate-50/70 p-4 rounded-xl space-y-3 border border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Claim Amount</span>
              <span className="text-xl font-bold text-slate-900">
                {claim.formattedAmount}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Approval Status</span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  claim.status === "Approved"
                    ? "bg-[#ECFDF5] text-[#059669]"
                    : claim.status === "Pending"
                    ? "bg-[#FFFBEB] text-[#D97706]"
                    : claim.status === "Paid"
                    ? "bg-[#EEF2FF] text-[#4F46E5]"
                    : claim.status === "Under Review"
                    ? "bg-[#FAF5FF] text-[#9333EA]"
                    : "bg-[#FEF2F2] text-[#DC2626]"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    claim.status === "Approved"
                      ? "bg-[#059669]"
                      : claim.status === "Pending"
                      ? "bg-[#D97706]"
                      : claim.status === "Paid"
                      ? "bg-[#4F46E5]"
                      : claim.status === "Under Review"
                      ? "bg-[#9333EA]"
                      : "bg-[#DC2626]"
                  }`}
                />
                {claim.status}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Payment Status</span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  claim.paymentStatus === "Paid"
                    ? "bg-[#ECFDF5] text-[#059669]"
                    : claim.paymentStatus === "Processing"
                    ? "bg-[#FFFBEB] text-[#D97706]"
                    : claim.paymentStatus === "Unpaid"
                    ? "bg-[#FEF2F2] text-[#DC2626]"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {claim.paymentStatus !== "None" && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      claim.paymentStatus === "Paid"
                        ? "bg-[#059669]"
                        : claim.paymentStatus === "Processing"
                        ? "bg-[#D97706]"
                        : "bg-[#DC2626]"
                    }`}
                  />
                )}
                {claim.paymentStatus === "None" ? "—" : claim.paymentStatus}
              </span>
            </div>
          </div>

          <div className="space-y-2.5 divide-y divide-slate-100">
            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                Employee
              </span>
              <span className="font-semibold text-slate-800">
                {claim.employee}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                Expense Type
              </span>
              <span className="font-semibold text-slate-800">
                {claim.expenseType}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                Project / Dept
              </span>
              <span className="font-medium text-slate-600">
                {claim.department}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Submitted On
              </span>
              <span className="text-slate-700 font-medium">
                {claim.submittedOn}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
