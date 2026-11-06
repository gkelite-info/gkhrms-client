"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  Send,
  Building2,
  User,
  Eye,
  Download,
  FileText,
  FileImage,
  CheckCircle2,
} from "lucide-react"
import { Transaction, TransactionStatus } from "../types"

interface TransactionDetailsViewProps {
  transaction: Transaction
  onBack: () => void
}

export default function TransactionDetailsView({
  transaction,
  onBack,
}: TransactionDetailsViewProps) {
  const [currentStatus, setCurrentStatus] = useState<TransactionStatus>(transaction.status)
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  const handleProcessPayment = () => {
    setCurrentStatus("Paid")
    setShowSuccessToast(true)
    setTimeout(() => {
      setShowSuccessToast(false)
    }, 3500)
  }

  const renderStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case "Paid":
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
            {status}
          </span>
        )
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
            {status}
          </span>
        )
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
            {status}
          </span>
        )
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
            {status}
          </span>
        )
      default:
        return null
    }
  }

  const attachments = transaction.attachments || [
    { name: "receipt.pdf", size: "245 KB", type: "pdf" as const },
    { name: "invoice.jpg", size: "1.2 MB", type: "image" as const },
    { name: "travel_bill.png", size: "892 KB", type: "image" as const },
  ]

  const payeeName = transaction.payeeName || transaction.submittedBy || "Daniel Carter"
  const payeeId = transaction.payeeEmployeeId || "EMP-2048"
  const payeeDept = transaction.payeeDepartment || transaction.department || "Marketing Department"
  const payeeRole = transaction.payeeRole || "Marketing Executive"
  const payeeAvatar = transaction.payeeAvatar || "/images/admin_rohan.jpg"

  const relatedModule = transaction.relatedModule || "Reimbursements"
  const relatedRecordId = transaction.relatedRecordId || "REQ-2025-0176"
  const category = transaction.category || "Travel"
  const purpose =
    transaction.purpose ||
    "Business trip to Singapore for client meetings and product demonstration."

  return (
    <div className="space-y-5 pb-8">
      {showSuccessToast && (
        <div className="fixed top-20 right-8 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white text-xs font-semibold rounded-2xl shadow-xl transition-all animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Payment processed successfully for {transaction.reference}!</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs transition-colors cursor-pointer"
            aria-label="Back to transactions list"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Transaction Details
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              View complete transaction information, payment status, and related records.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleProcessPayment}
          disabled={currentStatus === "Paid"}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer ${
            currentStatus === "Paid"
              ? "bg-slate-200 text-slate-500 cursor-not-allowed"
              : "bg-[#4F46E5] hover:bg-[#4338CA] text-white hover:shadow-md"
          }`}
        >
          <Send className="w-3.5 h-3.5 rotate-[-45deg] -translate-y-0.5 shrink-0" />
          <span>{currentStatus === "Paid" ? "Payment Processed" : "Process Payment"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-7 xl:col-span-8 space-y-5">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100/80 shadow-xs space-y-4">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Basic Information
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Key details of this transaction.
              </p>
            </div>

            <div className="divide-y divide-slate-50 text-xs">
              <div className="flex items-center justify-between py-3">
                <span className="text-slate-400 font-medium">Transaction Type</span>
                <span className="font-semibold text-slate-800">{transaction.type}</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-slate-400 font-medium">Reference ID</span>
                <span className="font-bold text-slate-900 font-mono text-xs">
                  {transaction.reference}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-slate-400 font-medium">Amount</span>
                <span className="font-bold text-slate-900 text-sm">
                  {transaction.formattedAmount}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-slate-400 font-medium">Transaction Date</span>
                <span className="font-medium text-slate-700">{transaction.date}</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-slate-400 font-medium">Payment Status</span>
                <div>{renderStatusBadge(currentStatus)}</div>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-slate-400 font-medium">Payment Method</span>
                <span className="font-semibold text-slate-800">
                  {transaction.paymentMethod || "Bank Transfer"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100/80 shadow-xs space-y-4">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Related Record
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Information about the related request or source record.
              </p>
            </div>

            <div className="divide-y divide-slate-50 text-xs">
              <div className="flex items-center justify-between py-3">
                <span className="text-slate-400 font-medium">Related Module</span>
                <span className="font-semibold text-slate-800">{relatedModule}</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-slate-400 font-medium">Related Record ID</span>
                <span className="font-semibold text-[#4F46E5] hover:underline cursor-pointer">
                  {relatedRecordId}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-slate-400 font-medium">Employee / Requester Name</span>
                <span className="font-semibold text-slate-800">{payeeName}</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-slate-400 font-medium">Department</span>
                <span className="font-medium text-slate-700">{payeeDept}</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-slate-400 font-medium">Category</span>
                <span className="font-medium text-slate-700">{category}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 py-3">
                <span className="text-slate-400 font-medium shrink-0">Purpose / Description</span>
                <span className="text-slate-800 font-medium sm:text-right max-w-sm sm:max-w-md leading-relaxed">
                  {purpose}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4 space-y-5">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100/80 shadow-xs space-y-4">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Payee / Requester
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Employee who submitted this reimbursement...
              </p>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-1 ring-slate-200">
                <Image
                  src={payeeAvatar}
                  alt={payeeName}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-slate-900 text-sm">{payeeName}</span>
                  <span className="text-xs text-slate-400 font-normal">{payeeId}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="whitespace-nowrap">{payeeDept}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                  <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="whitespace-nowrap">{payeeRole}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100/80 shadow-xs space-y-4">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Attachments
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Supporting documents for this transaction.
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              {attachments.map((file, idx) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100/90 hover:border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {file.type === "pdf" ? (
                      <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center font-bold text-[10px] shrink-0">
                        PDF
                      </div>
                    ) : idx === 1 ? (
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <FileImage className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                    )}

                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-xs text-slate-800 truncate">
                        {file.name}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {file.size}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <button
                      type="button"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#4F46E5] hover:bg-white transition-colors cursor-pointer"
                      aria-label={`Preview ${file.name}`}
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#4F46E5] hover:bg-white transition-colors cursor-pointer"
                      aria-label={`Download ${file.name}`}
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

