"use client"

import {
  X,
  ArrowDown,
  ArrowUp,
  Download,
  Calendar,
  Building2,
  Tag,
  CreditCard,
  FileText,
  CheckCircle2,
} from "lucide-react"
import { AccountantTransaction } from "../types"

interface AccountantTransactionModalProps {
  transaction: AccountantTransaction | null
  onClose: () => void
}

export default function AccountantTransactionModal({
  transaction,
  onClose,
}: AccountantTransactionModalProps) {
  if (!transaction) return null

  const isReceived = transaction.type === "Money Received"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 flex flex-col max-h-[88vh] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Transaction Details
            </h3>
            <p className="text-[11px] text-slate-400">
              Reference ID: {transaction.referenceNumber || transaction.id}
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
                Total Amount
              </span>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">
                {transaction.amount}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {transaction.status}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                  isReceived
                    ? "text-emerald-700 bg-emerald-100/60"
                    : "text-rose-700 bg-rose-100/60"
                }`}
              >
                {isReceived ? (
                  <ArrowDown className="w-3 h-3 stroke-[2.5]" />
                ) : (
                  <ArrowUp className="w-3 h-3 stroke-[2.5]" />
                )}
                {transaction.type}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Tag className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">Transaction ID</span>
              </div>
              <p className="font-semibold text-slate-800">{transaction.id}</p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">Recorded Date</span>
              </div>
              <p className="font-semibold text-slate-800">{transaction.date}</p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Building2 className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">Category</span>
              </div>
              <p className="font-semibold text-slate-800">
                {transaction.category}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400">
                <CreditCard className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">Payment Method</span>
              </div>
              <p className="font-semibold text-slate-800">
                {transaction.paymentMethod}
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-slate-500">
              Description / Narration
            </span>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-800">
              {transaction.description}
            </div>
          </div>

          {transaction.party && (
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-slate-500">
                Associated Entity / Payer
              </span>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                {transaction.party}
              </div>
            </div>
          )}

          {transaction.notes && (
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-slate-500">
                Accounting Notes
              </span>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                {transaction.notes}
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
          <button
            type="button"
            onClick={() => alert(`Downloading voucher for ${transaction.id}`)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] shadow-sm shadow-indigo-200 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Voucher</span>
          </button>
        </div>
      </div>
    </div>
  )
}

