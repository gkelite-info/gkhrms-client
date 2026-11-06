"use client"

import { X, Calendar, DollarSign, User, Tag, Clock, Building2, CheckCircle2 } from "lucide-react"
import { PendingPaymentItem } from "../types"

interface ViewPendingPaymentModalProps {
  payment: PendingPaymentItem | null
  onClose: () => void
  onApprove?: (id: string) => void
}

export default function ViewPendingPaymentModal({
  payment,
  onClose,
  onApprove,
}: ViewPendingPaymentModalProps) {
  if (!payment) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs font-bold text-[#4F46E5]">
              {payment.reference}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Pending Payment Details
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
              <span className="text-slate-500 font-medium">Payment Amount</span>
              <span className="text-xl font-bold text-slate-900">
                ₹ {payment.formattedAmount}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Status</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]/60">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                {payment.status}
              </span>
            </div>
          </div>

          <div className="space-y-2.5 divide-y divide-slate-100">
            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                Employee / Requester
              </span>
              <span className="font-semibold text-slate-800">
                {payment.employee}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                Project / Department
              </span>
              <span className="font-medium text-slate-700">
                {payment.department}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                Payment Type
              </span>
              <span className="font-medium text-slate-700">
                {payment.type}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Due Date
              </span>
              <span className="font-medium text-slate-700">
                {payment.dueDate}
              </span>
            </div>

            {payment.paymentMethod && (
              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Settlement Method
                </span>
                <span className="font-medium text-slate-700">
                  {payment.paymentMethod}
                </span>
              </div>
            )}
          </div>

          {payment.description && (
            <div className="pt-2">
              <span className="text-slate-500 font-medium block mb-1">
                Claim Purpose / Description
              </span>
              <p className="p-3 bg-slate-50 rounded-xl text-slate-700 leading-relaxed border border-slate-100">
                {payment.description}
              </p>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Close
            </button>
            {onApprove && (
              <button
                type="button"
                onClick={() => {
                  onApprove(payment.id)
                  onClose()
                }}
                className="px-4 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Approve Payment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

