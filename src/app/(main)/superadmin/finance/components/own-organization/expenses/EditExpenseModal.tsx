"use client"

import { useState, useEffect } from "react"
import { X, Check } from "lucide-react"
import { ExpenseRecord } from "./ExpensesData"

interface EditExpenseModalProps {
  expense: ExpenseRecord | null
  onClose: () => void
  onSave: (updated: ExpenseRecord) => void
}

export default function EditExpenseModal({
  expense,
  onClose,
  onSave,
}: EditExpenseModalProps) {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState<ExpenseRecord["category"]>(
    "Office & Infrastructure"
  )
  const [amount, setAmount] = useState("")
  const [expenseDate, setExpenseDate] = useState("")
  const [paymentStatus, setPaymentStatus] = useState<"Paid" | "Unpaid">("Paid")
  const [paymentMethod, setPaymentMethod] =
    useState<ExpenseRecord["paymentMethod"]>("Bank Transfer")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    if (expense) {
      setTitle(expense.title)
      setCategory(expense.category)
      setAmount(expense.amount)
      setExpenseDate(expense.expenseDate)
      setPaymentStatus(expense.paymentStatus)
      setPaymentMethod(expense.paymentMethod || "Bank Transfer")
      setNotes(expense.notes || "")
    }
  }, [expense])

  if (!expense) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...expense,
      title,
      category,
      amount: amount.startsWith("₹") ? amount : `₹ ${amount}`,
      expenseDate,
      paymentStatus,
      paymentMethod,
      notes,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold text-[#5B50E5] uppercase tracking-wider">
              {expense.id}
            </span>
            <h3 className="text-base font-bold text-slate-800 leading-tight mt-0.5">
              Edit Expense
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-slate-700">Expense Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">Category</label>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as ExpenseRecord["category"])
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5]"
              >
                <option value="Office & Infrastructure">
                  Office & Infrastructure
                </option>
                <option value="Salaries & Benefits">Salaries & Benefits</option>
                <option value="Software & Tools">Software & Tools</option>
                <option value="Travel & Conveyance">Travel & Conveyance</option>
                <option value="Utilities">Utilities</option>
                <option value="Reimbursement">Reimbursement</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">Amount</label>
              <input
                type="text"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">Date</label>
              <input
                type="text"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">Status</label>
              <select
                value={paymentStatus}
                onChange={(e) =>
                  setPaymentStatus(e.target.value as "Paid" | "Unpaid")
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5]"
              >
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">Method</label>
              <select
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value as ExpenseRecord["paymentMethod"]
                  )
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5]"
              >
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-slate-700">Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5]"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#5B50E5] hover:bg-[#4E44C9] font-semibold text-white shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
