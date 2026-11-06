"use client"

import { useState } from "react"
import { X, Upload } from "lucide-react"
import { ExpenseRecord, ExpenseType, ExpenseStatus } from "../types"

interface AddExpenseModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (expense: ExpenseRecord) => void
}

export default function AddExpenseModal({
  isOpen,
  onClose,
  onAdd,
}: AddExpenseModalProps) {
  const [submittedBy, setSubmittedBy] = useState("")
  const [expenseType, setExpenseType] = useState<ExpenseType>("Employee")
  const [category, setCategory] = useState("Travel")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!submittedBy.trim() || !amount) return

    const numAmount = parseFloat(amount) || 0
    const newRecord: ExpenseRecord = {
      id: `exp-${Date.now()}`,
      expenseId: `EXP-${Math.floor(300 + Math.random() * 700)}`,
      submittedBy: submittedBy.trim(),
      expenseType,
      category,
      amount: numAmount,
      formattedAmount: `$${numAmount.toLocaleString()}`,
      submittedOn: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Pending" as ExpenseStatus,
      description: description.trim() || "Operational expense claim submission.",
    }

    onAdd(newRecord)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Add Expense Record
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Record a new company or employee expense claim
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
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Submitted By / Vendor Name
            </label>
            <input
              type="text"
              required
              value={submittedBy}
              onChange={(e) => setSubmittedBy(e.target.value)}
              placeholder="e.g. Priya Mehta or Vendor Co."
              className="w-full h-9 px-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Expense Type
              </label>
              <select
                value={expenseType}
                onChange={(e) => setExpenseType(e.target.value as ExpenseType)}
                className="w-full h-9 px-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#4F46E5] cursor-pointer"
              >
                <option value="Employee">Employee Claim</option>
                <option value="Company">Company Direct</option>
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
                <option value="Office Supplies">Office Supplies</option>
                <option value="Client Meeting">Client Meeting</option>
                <option value="Software">Software</option>
                <option value="Local Travel">Local Travel</option>
                <option value="Printing">Printing</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full h-9 px-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Description / Justification
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide reason or project codes..."
              className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            />
          </div>

          <div className="border border-dashed border-slate-200 rounded-xl p-3 flex items-center justify-center gap-2 text-xs text-slate-400 bg-slate-50/50">
            <Upload className="w-4 h-4 text-slate-400" />
            <span>Upload receipt or invoice scan (optional)</span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Submit Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

