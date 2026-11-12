"use client"

import { useState, useRef, useEffect } from "react"
import {
  FileText,
  CreditCard,
  Paperclip,
  UploadCloud,
  Calendar,
  ChevronDown,
  Check,
  X,
} from "lucide-react"
import { AccountantExpenseEntry, ExpenseEntryStatus } from "../types"

interface AccountantAddExpenseModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (entry: AccountantExpenseEntry) => void
  initialData?: AccountantExpenseEntry | null
}

const expenseTypes = [
  "Office Supplies",
  "Electricity",
  "Internet",
  "Office Rent",
  "Software Subscription",
  "Maintenance",
  "Water Bill",
]

const paymentMethods = [
  "Bank Transfer",
  "UPI",
  "Online Payment",
  "Card",
]

const statusOptions: ExpenseEntryStatus[] = ["Draft", "Pending", "Paid"]

export default function AccountantAddExpenseModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: AccountantAddExpenseModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [expenseType, setExpenseType] = useState(
    initialData?.expenseType || "Office Supplies"
  )
  const [vendor, setVendor] = useState(
    initialData?.vendor || "ABC Stationery Pvt. Ltd."
  )
  const [billDate, setBillDate] = useState(
    initialData?.billDate || "29 Nov 2026"
  )
  const [dueDate, setDueDate] = useState(
    initialData?.dueDate || "10 Dec 2026"
  )
  const [amount, setAmount] = useState(
    initialData?.amount || "₹ 12,500.00"
  )
  const [taxGst, setTaxGst] = useState(
    initialData?.taxGst || "₹ 2,250.00"
  )
  const [paymentMethod, setPaymentMethod] = useState(
    initialData?.paymentMethod || "Bank Transfer"
  )
  const [status, setStatus] = useState<ExpenseEntryStatus>(
    initialData?.status || "Draft"
  )
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string>(
    initialData?.attachmentName || ""
  )

  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    if (initialData) {
      setExpenseType(initialData.expenseType)
      setVendor(initialData.vendor)
      setBillDate(initialData.billDate)
      setDueDate(initialData.dueDate)
      setAmount(initialData.amount)
      setTaxGst(initialData.taxGst || "₹ 0.00")
      setPaymentMethod(initialData.paymentMethod)
      setStatus(initialData.status)
      setFileName(initialData.attachmentName || "")
    } else {
      setExpenseType("Office Supplies")
      setVendor("ABC Stationery Pvt. Ltd.")
      setBillDate("29 Nov 2026")
      setDueDate("10 Dec 2026")
      setAmount("₹ 12,500.00")
      setTaxGst("₹ 2,250.00")
      setPaymentMethod("Bank Transfer")
      setStatus("Draft")
      setFileName("")
    }
  }, [initialData, isOpen])

  if (!isOpen) return null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setFileName(e.target.files[0].name)
    }
  }

  const handleSave = (targetStatus?: ExpenseEntryStatus) => {
    const finalStatus = targetStatus || status
    const numericAmt = parseFloat(amount.replace(/[^\d.]/g, "")) || 12500

    const newRecord: AccountantExpenseEntry = {
      id: initialData?.id || `EXP-${Math.floor(160 + Math.random() * 800)}`,
      expenseType,
      vendor: vendor.trim() || "Vendor",
      billNumber: initialData?.billNumber || `BILL-${Math.floor(1000 + Math.random() * 9000)}`,
      billDate,
      dueDate,
      amount: amount.startsWith("₹") ? amount : `₹ ${amount}`,
      numericAmount: numericAmt,
      taxGst,
      paymentMethod,
      status: finalStatus,
      attachmentName: fileName || "invoice.pdf",
    }

    onSave(newRecord)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className="relative bg-white rounded-2xl sm:rounded-3xl w-full max-w-[620px] shadow-2xl border border-slate-100 flex flex-col max-h-[88vh] overflow-hidden z-10 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 overflow-y-auto modal-scrollbar p-5 sm:p-7 space-y-6">
          <div className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
            <FileText className="w-4 h-4 text-[#4F46E5]" />
            <h3 className="text-sm font-bold text-slate-800 tracking-tight">
              Expense Details
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Expense Type <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown(openDropdown === "type" ? null : "type")
                }
                className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-800 hover:border-slate-300 transition-colors cursor-pointer text-left"
              >
                <span className="truncate">{expenseType}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {openDropdown === "type" && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setOpenDropdown(null)}
                  />
                  <div className="absolute top-full mt-1 left-0 z-30 w-full bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                    {expenseTypes.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          setExpenseType(t)
                          setOpenDropdown(null)
                        }}
                        className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center justify-between font-medium cursor-pointer ${
                          expenseType === t
                            ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                            : "text-slate-700"
                        }`}
                      >
                        <span>{t}</span>
                        {expenseType === t && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Vendor / Provider <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                placeholder="ABC Stationery Pvt. Ltd."
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Bill Date <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={billDate}
                  onChange={(e) => setBillDate(e.target.value)}
                  placeholder="29 Nov 2026"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Due Date <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  placeholder="10 Dec 2026"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
            <CreditCard className="w-4 h-4 text-[#4F46E5]" />
            <h3 className="text-sm font-bold text-slate-800 tracking-tight">
              Amount & Payment
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Amount <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="₹ 12,500.00"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Tax / GST
              </label>
              <input
                type="text"
                value={taxGst}
                onChange={(e) => setTaxGst(e.target.value)}
                placeholder="₹ 2,250.00"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Payment Method <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown(openDropdown === "method" ? null : "method")
                }
                className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-800 hover:border-slate-300 transition-colors cursor-pointer text-left"
              >
                <span className="truncate">{paymentMethod}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {openDropdown === "method" && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setOpenDropdown(null)}
                  />
                  <div className="absolute top-full mt-1 left-0 z-30 w-full bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                    {paymentMethods.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => {
                          setPaymentMethod(m)
                          setOpenDropdown(null)
                        }}
                        className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center justify-between font-medium cursor-pointer ${
                          paymentMethod === m
                            ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                            : "text-slate-700"
                        }`}
                      >
                        <span>{m}</span>
                        {paymentMethod === m && (
                          <Check className="w-3.5 h-3.5" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="relative">
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Status <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown(openDropdown === "status" ? null : "status")
                }
                className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-800 hover:border-slate-300 transition-colors cursor-pointer text-left"
              >
                <span className="truncate">{status}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {openDropdown === "status" && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setOpenDropdown(null)}
                  />
                  <div className="absolute top-full mt-1 left-0 z-30 w-full bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                    {statusOptions.map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => {
                          setStatus(st)
                          setOpenDropdown(null)
                        }}
                        className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center justify-between font-medium cursor-pointer ${
                          status === st
                            ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                            : "text-slate-700"
                        }`}
                      >
                        <span>{st}</span>
                        {status === st && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="pb-1 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Paperclip className="w-4 h-4 text-[#4F46E5]" />
              <h3 className="text-sm font-bold text-slate-800 tracking-tight">
                Attachment
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Bill Copy / Invoice
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-indigo-200/80 rounded-2xl p-5 bg-[#FAFBFF] hover:bg-indigo-50/20 transition-all flex flex-col items-center justify-center gap-2 text-center cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-[#4F46E5] group-hover:scale-105 transition-transform">
              <UploadCloud className="w-5 h-5" />
            </div>

            <div className="text-xs text-slate-600">
              <span>Drag and drop file here, or </span>
              <span className="text-[#4F46E5] font-semibold hover:underline">
                click to browse
              </span>
            </div>

            <p className="text-[11px] text-slate-400">
              Supports PDF, JPG, PNG (Max 10 MB)
            </p>

            {fileName && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-indigo-100 rounded-lg text-xs font-medium text-slate-700 mt-1 shadow-2xs">
                <FileText className="w-3.5 h-3.5 text-[#4F46E5]" />
                <span className="truncate max-w-[200px]">{fileName}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 px-5 sm:px-7 py-3.5 bg-slate-50/60 border-t border-slate-100 shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={() => handleSave("Draft")}
          className="px-5 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50/30 text-xs font-semibold text-[#4F46E5] hover:bg-indigo-50 transition-colors cursor-pointer"
        >
          Save as Draft
        </button>

        <button
          type="button"
          onClick={() => handleSave()}
          className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] shadow-sm shadow-indigo-200 transition-all cursor-pointer"
        >
          Save Expense
        </button>
      </div>
    </div>
  </div>
)
}

