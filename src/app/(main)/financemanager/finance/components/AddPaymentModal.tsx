"use client"

import { useState, useEffect } from "react"
import { X, ChevronDown } from "lucide-react"
import { PaymentItem, PaymentStatus, PaymentType, PayeeType } from "../types"

interface AddPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (payment: PaymentItem) => void
}

export default function AddPaymentModal({
  isOpen,
  onClose,
  onAdd,
}: AddPaymentModalProps) {
  const [payee, setPayee] = useState("")
  const [payeeType, setPayeeType] = useState<PayeeType>("Employee")
  const [paymentType, setPaymentType] = useState<PaymentType>("Reimbursement")
  const [category, setCategory] = useState("Travel")
  const [amount, setAmount] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [paymentDate, setPaymentDate] = useState("")
  const [status, setStatus] = useState<PaymentStatus>("Scheduled")
  const [paymentMethod, setPaymentMethod] = useState("Direct Deposit")
  const [description, setDescription] = useState("")

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!payee.trim() || !amount) return

    const numAmount = parseFloat(amount) || 0
    const formattedDue = dueDate
      ? new Date(dueDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })

    const formattedPayment = paymentDate
      ? new Date(paymentDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : status === "Paid"
      ? formattedDue
      : "-"

    const newPayment: PaymentItem = {
      id: `pay-${Date.now()}`,
      paymentId: `PAY-${String(Math.floor(10 + Math.random() * 90)).padStart(3, "0")}`,
      payee: payee.trim(),
      payeeType,
      paymentType,
      category,
      amount: numAmount,
      formattedAmount: `$${numAmount.toLocaleString()}`,
      dueDate: formattedDue,
      paymentDate: formattedPayment,
      status,
      paymentMethod,
      description: description.trim() || "Outgoing payment disbursement.",
    }

    onAdd(newPayment)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-[500px] max-h-[88vh] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Add Outgoing Payment
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Record a new payment disbursement, reimbursement, or vendor payout
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4 space-y-3.5 max-h-[52vh]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800">
                  Payee Name
                </label>
                <input
                  type="text"
                  required
                  value={payee}
                  onChange={(e) => setPayee(e.target.value)}
                  placeholder="e.g. Priya Mehta or Vendor LLC"
                  className="w-full h-9.5 px-3.5 text-xs text-slate-900 placeholder:text-slate-400 placeholder:opacity-100 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800">
                  Payee Type
                </label>
                <div className="relative">
                  <select
                    value={payeeType}
                    onChange={(e) => setPayeeType(e.target.value as PayeeType)}
                    className="w-full h-9.5 pl-3.5 pr-8 text-xs font-medium text-slate-800 rounded-xl border border-slate-200 bg-white appearance-none focus:outline-none focus:border-[#4F46E5] cursor-pointer"
                  >
                    <option value="Employee">Employee</option>
                    <option value="Vendor">Vendor</option>
                    <option value="Contractor">Contractor</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800">
                  Payment Type
                </label>
                <div className="relative">
                  <select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value as PaymentType)}
                    className="w-full h-9.5 pl-3.5 pr-8 text-xs font-medium text-slate-800 rounded-xl border border-slate-200 bg-white appearance-none focus:outline-none focus:border-[#4F46E5] cursor-pointer"
                  >
                    <option value="Reimbursement">Reimbursement</option>
                    <option value="Vendor Invoice">Vendor Invoice</option>
                    <option value="Salary">Salary</option>
                    <option value="Operations">Operations</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-9.5 pl-3.5 pr-8 text-xs font-medium text-slate-800 rounded-xl border border-slate-200 bg-white appearance-none focus:outline-none focus:border-[#4F46E5] cursor-pointer"
                  >
                    <option value="Travel">Travel</option>
                    <option value="Meals">Meals</option>
                    <option value="Training">Training</option>
                    <option value="Software">Software</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Client Meeting">Client Meeting</option>
                    <option value="Salaries & Benefits">Salaries & Benefits</option>
                    <option value="Rent & Facilities">Rent & Facilities</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800">
                  Amount ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="1240.00"
                  className="w-full h-9.5 px-3.5 text-xs text-slate-900 placeholder:text-slate-400 placeholder:opacity-100 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800">
                  Due Date
                </label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full h-9.5 px-3.5 text-xs text-slate-900 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#4F46E5] cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800">
                  Payment Date
                </label>
                <input
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="w-full h-9.5 px-3.5 text-xs text-slate-900 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#4F46E5] cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as PaymentStatus)}
                    className="w-full h-9.5 pl-3.5 pr-8 text-xs font-medium text-slate-800 rounded-xl border border-slate-200 bg-white appearance-none focus:outline-none focus:border-[#4F46E5] cursor-pointer"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Processing">Processing</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-800">
                Payment Method
              </label>
              <div className="relative">
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full h-9.5 pl-3.5 pr-8 text-xs font-medium text-slate-800 rounded-xl border border-slate-200 bg-white appearance-none focus:outline-none focus:border-[#4F46E5] cursor-pointer"
                >
                  <option value="Direct Deposit">Direct Deposit</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Corporate Card">Corporate Card</option>
                  <option value="Wire Transfer">Wire Transfer</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-800">
                Description / Notes
              </label>
              <textarea
                rows={2.5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide reason or context for this disbursement..."
                className="w-full p-3 text-xs text-slate-900 placeholder:text-slate-400 placeholder:opacity-100 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] resize-none transition-all"
              />
            </div>
          </div>

          <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Add Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
