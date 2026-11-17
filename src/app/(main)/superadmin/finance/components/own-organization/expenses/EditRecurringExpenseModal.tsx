"use client"

import { useState, useEffect } from "react"
import { X, Check } from "lucide-react"
import { RecurringExpenseRecord } from "./RecurringExpensesData"

interface EditRecurringExpenseModalProps {
  item: RecurringExpenseRecord | null
  onClose: () => void
  onSave: (updated: RecurringExpenseRecord) => void
}

export default function EditRecurringExpenseModal({
  item,
  onClose,
  onSave,
}: EditRecurringExpenseModalProps) {
  const [expenseName, setExpenseName] = useState("")
  const [vendor, setVendor] = useState("")
  const [category, setCategory] = useState<
    RecurringExpenseRecord["category"]
  >("Rent & Facilities")
  const [frequency, setFrequency] = useState<
    RecurringExpenseRecord["frequency"]
  >("Monthly")
  const [amount, setAmount] = useState("")
  const [nextDueDate, setNextDueDate] = useState("")
  const [paymentMethod, setPaymentMethod] =
    useState<RecurringExpenseRecord["paymentMethod"]>("Bank Transfer")
  const [status, setStatus] = useState<"Active" | "Paused">("Active")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    if (item) {
      setExpenseName(item.expenseName)
      setVendor(item.vendor)
      setCategory(item.category)
      setFrequency(item.frequency)
      setAmount(item.amount)
      setNextDueDate(item.nextDueDate)
      setPaymentMethod(item.paymentMethod)
      setStatus(item.status)
      setNotes(item.notes || "")
    }
  }, [item])

  if (!item) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...item,
      expenseName,
      vendor,
      category,
      frequency,
      amount: amount.startsWith("₹") ? amount : `₹ ${amount}`,
      nextDueDate,
      paymentMethod,
      status,
      notes,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-800 leading-tight">
              Edit Recurring Expense
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{item.expenseName}</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">Expense Name</label>
              <input
                type="text"
                required
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">Vendor</label>
              <input
                type="text"
                required
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">Category</label>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value as RecurringExpenseRecord["category"]
                  )
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5]"
              >
                <option value="Rent & Facilities">Rent & Facilities</option>
                <option value="Utilities">Utilities</option>
                <option value="Software Subscription">
                  Software Subscription
                </option>
                <option value="Maintenance">Maintenance</option>
                <option value="Insurance">Insurance</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">Frequency</label>
              <select
                value={frequency}
                onChange={(e) =>
                  setFrequency(
                    e.target.value as RecurringExpenseRecord["frequency"]
                  )
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5]"
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">Next Due Date</label>
              <input
                type="text"
                value={nextDueDate}
                onChange={(e) => setNextDueDate(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">Status</label>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "Active" | "Paused")
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5]"
              >
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
              </select>
            </div>
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
