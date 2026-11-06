"use client"

import { useState, useEffect } from "react"
import { X, Upload, ChevronDown } from "lucide-react"
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-[490px] max-h-[88vh] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
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
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4 space-y-3.5 max-h-[52vh]">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-800">
                Submitted By / Vendor Name
              </label>
              <input
                type="text"
                required
                value={submittedBy}
                onChange={(e) => setSubmittedBy(e.target.value)}
                placeholder="e.g. Priya Mehta or Vendor Co."
                className="w-full h-9.5 px-3.5 text-xs text-slate-900 placeholder:text-slate-400 placeholder:opacity-100 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800">
                  Expense Type
                </label>
                <div className="relative">
                  <select
                    value={expenseType}
                    onChange={(e) => setExpenseType(e.target.value as ExpenseType)}
                    className="w-full h-9.5 pl-3.5 pr-8 text-xs font-medium text-slate-800 rounded-xl border border-slate-200 bg-white appearance-none focus:outline-none focus:border-[#4F46E5] cursor-pointer"
                  >
                    <option value="Employee">Employee Claim</option>
                    <option value="Company">Company Direct</option>
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
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Client Meeting">Client Meeting</option>
                    <option value="Software">Software</option>
                    <option value="Local Travel">Local Travel</option>
                    <option value="Printing">Printing</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-800">
                Amount ($)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full h-9.5 px-3.5 text-xs text-slate-900 placeholder:text-slate-400 placeholder:opacity-100 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-800">
                Description / Justification
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide reason or project codes..."
                className="w-full p-3 text-xs text-slate-900 placeholder:text-slate-400 placeholder:opacity-100 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] resize-none transition-all"
              />
            </div>

            <div className="border border-dashed border-slate-200 rounded-xl p-3 flex items-center justify-center gap-2 text-xs text-slate-500 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
              <Upload className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-medium">Upload receipt or invoice scan (optional)</span>
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
              Submit Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
