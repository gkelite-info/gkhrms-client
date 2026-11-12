"use client"

import {
  X,
  Calendar,
  CreditCard,
  FileText,
  CheckCircle2,
  Clock,
  Landmark,
  Download,
  MessageSquare,
} from "lucide-react"
import { AccountantVendorPayment } from "../types"

interface AccountantViewVendorPaymentModalProps {
  payment: AccountantVendorPayment | null
  onClose: () => void
}

export default function AccountantViewVendorPaymentModal({
  payment,
  onClose,
}: AccountantViewVendorPaymentModalProps) {
  if (!payment) return null

  const category = payment.category || "Telecom & Internet"
  const transactionRef = payment.transactionRef || "UTR9876543210"
  const invoiceName = payment.invoiceFile?.name || "Airtel_Bill_Nov2026.pdf"
  const invoiceSize = payment.invoiceFile?.size || "286 KB"
  const remarks =
    payment.remarks ||
    payment.notes ||
    "Monthly internet and office broadband charges – Nov 2026."

  const renderPaymentMethod = (method: string) => {
    switch (method) {
      case "Bank Transfer":
        return (
          <div className="flex items-center gap-1.5 font-semibold text-slate-900">
            <Landmark className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>Bank Transfer</span>
          </div>
        )
      case "Card":
        return (
          <div className="flex items-center gap-1.5 font-semibold text-slate-900">
            <CreditCard className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>Card</span>
          </div>
        )
      case "UPI":
        return (
          <div className="flex items-center gap-1.5 font-semibold text-slate-900">
            <span className="italic font-extrabold text-[11px] text-indigo-600 tracking-tight leading-none">
              UPI
            </span>
            <span>UPI</span>
          </div>
        )
      default:
        return <span className="font-semibold text-slate-900">{method}</span>
    }
  }

  const renderStatusBadge = (status: string) => {
    if (status === "Paid") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EAF7EE] text-[#16A34A]">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>Paid</span>
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF8EB] text-[#D97706]">
        <Clock className="w-3.5 h-3.5 shrink-0" />
        <span>{status}</span>
      </span>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 flex flex-col max-h-[85vh] overflow-hidden z-10 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 sm:p-6 pb-4 flex items-start justify-between gap-4 border-b border-slate-100/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F2FD] flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Payment Details
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                View complete payment information
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 sm:px-6 py-5 space-y-4 flex-1 overflow-y-auto max-h-[60vh] modal-scrollbar">
          <div className="bg-[#F8F9FE] border border-indigo-50/80 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-1 h-7 rounded-full bg-[#4F46E5]" />
              <div>
                <span className="block text-[11px] font-medium text-slate-400 leading-tight">
                  Payment ID
                </span>
                <span className="block text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
                  {payment.paymentId}
                </span>
              </div>
            </div>

            <div>{renderStatusBadge(payment.status)}</div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              <span>Payment Information</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Category</span>
                <span className="font-semibold text-slate-900">{category}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Payment Date</span>
                <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{payment.paymentDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Amount</span>
                <span className="font-bold text-slate-900">{payment.amount}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Payment Method</span>
                <div>{renderPaymentMethod(payment.paymentMethod)}</div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">
                  Transaction Reference
                </span>
                <span className="font-semibold text-slate-900 font-mono">
                  # {transactionRef}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Status</span>
                <div>{renderStatusBadge(payment.status)}</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Bill / Invoice</span>
            </div>

            <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="px-1.5 py-0.5 rounded bg-[#EF4444] text-white text-[9px] font-extrabold uppercase shrink-0">
                  PDF
                </span>
                <span className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer truncate">
                  {invoiceName}
                </span>
                <span className="text-xs text-slate-400 shrink-0 font-normal">
                  ({invoiceSize})
                </span>
              </div>

              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer p-1"
                title="Download Invoice"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              <span>Remarks</span>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-xs text-slate-700 leading-relaxed">
              {remarks}
            </div>
          </div>
        </div>

        <div className="px-6 py-3.5 border-t border-slate-100 flex items-center justify-end bg-white shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
