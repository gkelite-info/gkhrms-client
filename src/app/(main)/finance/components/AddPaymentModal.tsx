"use client"

import { useState } from "react"
import { X, Calendar, DollarSign, User, Tag, CreditCard } from "lucide-react"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
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
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Payee Name
              </label>
              <input
                type="text"
                required
                value={payee}
                onChange={(e) => setPayee(e.target.value)}
                placeholder="e.g. Priya Mehta or Vendor LLC"
                className="w-full h-9 px-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Payee Type
              </label>
              <select
                value={payeeType}
                onChange={(e) => setPayeeType(e.target.value as PayeeType)}
                className="w-full h-9 px-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#4F46E5] cursor-pointer"
              >
                <option value="Employee">Employee</option>
                <option value="Vendor">Vendor</option>
                <option value="Contractor">Contractor</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Payment Type
              </label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value as PaymentType)}
                className="w-full h-9 px-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#4F46E5] cursor-pointer"
              >
                <option value="Reimbursement">Reimbursement</option>
                <option value="Vendor Invoice">Vendor Invoice</option>
                <option value="Salary">Salary</option>
                <option value="Operations">Operations</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-9 px-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#4F46E5] cursor-pointer"
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
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
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
                className="w-full h-9 px-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Due Date
              </label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full h-9 px-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#4F46E5] cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Payment Date
              </label>
              <input
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full h-9 px-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#4F46E5] cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PaymentStatus)}
                className="w-full h-9 px-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#4F46E5] cursor-pointer"
              >
                <option value="Paid">Paid</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Processing">Processing</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full h-9 px-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#4F46E5] cursor-pointer"
            >
              <option value="Direct Deposit">Direct Deposit</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Corporate Card">Corporate Card</option>
              <option value="Wire Transfer">Wire Transfer</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Description / Notes
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide reason or context for this disbursement..."
              className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold rounded-xl shadow-xs transition-colors text-xs cursor-pointer"
            >
              Add Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

