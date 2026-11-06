"use client"

import { X, Calendar, DollarSign, User, Tag, CreditCard, Clock, FileText } from "lucide-react"
import { PaymentItem } from "../types"

interface ViewPaymentModalProps {
  payment: PaymentItem | null
  onClose: () => void
}

export default function ViewPaymentModal({ payment, onClose }: ViewPaymentModalProps) {
  if (!payment) return null

  const getStatusBadge = () => {
    switch (payment.status) {
      case "Paid":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
            Paid
          </span>
        )
      case "Scheduled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF5FF] text-[#9333EA] border border-[#F3E8FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9333EA]" />
            Scheduled
          </span>
        )
      case "Processing":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            Processing
          </span>
        )
      case "Overdue":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
            Overdue
          </span>
        )
      case "Pending":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
            Pending
          </span>
        )
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs font-bold text-[#4F46E5]">
              {payment.paymentId}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Outgoing Payment Details
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
              <span className="text-slate-500 font-medium">Disbursement Amount</span>
              <span className="text-xl font-bold text-slate-900">
                {payment.formattedAmount}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Payment Status</span>
              {getStatusBadge()}
            </div>
          </div>

          <div className="space-y-2.5 divide-y divide-slate-100">
            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                Payee
              </span>
              <div className="text-right">
                <span className="font-semibold text-slate-800 block">
                  {payment.payee}
                </span>
                <span className="text-[11px] text-slate-400">
                  {payment.payeeType}
                </span>
              </div>
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
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                Category
              </span>
              <span className="font-medium text-slate-700">
                {payment.category}
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

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Payment Date
              </span>
              <span className="font-medium text-slate-700">
                {payment.paymentDate !== "-" ? payment.paymentDate : "Pending settlement"}
              </span>
            </div>

            {payment.paymentMethod && (
              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-slate-400" />
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
                Description / Purpose
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
          </div>
        </div>
      </div>
    </div>
  )
}

