"use client"

import { X, Calendar, DollarSign, User, Tag, Clock, Building2, AlertTriangle } from "lucide-react"
import { OverduePaymentItem } from "../types"

interface ViewOverduePaymentModalProps {
  payment: OverduePaymentItem | null
  onClose: () => void
}

export default function ViewOverduePaymentModal({
  payment,
  onClose,
}: ViewOverduePaymentModalProps) {
  if (!payment) return null

  const isOverdue = payment.daysDue !== "-" && Number(payment.daysDue) > 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs font-bold text-[#4F46E5]">
              {payment.paymentId}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Payment Requiring Attention
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
                {payment.formattedAmount}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Overdue Status</span>
              {isOverdue ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]/60">
                  <AlertTriangle className="w-3 h-3 text-[#DC2626]" />
                  {payment.daysDue} days overdue
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]/60">
                  <Clock className="w-3 h-3 text-[#D97706]" />
                  Pending
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2.5 divide-y divide-slate-100">
            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                Payee
              </span>
              <span className="font-semibold text-slate-800">
                {payment.payee}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                Department / Project
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
                {payment.paymentType}
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
                  Payment Method
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
                Disbursement Reason / Notes
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
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Process Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

