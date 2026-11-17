"use client"

import { useState } from "react"
import {
  X,
  FileText,
  CircleDot,
  FolderKanban,
  CreditCard,
  Calendar,
  Check,
  Pause,
  Save,
  CalendarCheck,
} from "lucide-react"
import { RecurringExpenseRecord } from "./RecurringExpensesData"

interface AddRecurringExpenseModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (item: RecurringExpenseRecord) => void
}

export default function AddRecurringExpenseModal({
  isOpen,
  onClose,
  onAdd,
}: AddRecurringExpenseModalProps) {
  const [expenseName, setExpenseName] = useState("")
  const [expenseType, setExpenseType] = useState("")
  const [category, setCategory] = useState<RecurringExpenseRecord["category"] | "">("")
  const [paymentMethod, setPaymentMethod] = useState<RecurringExpenseRecord["paymentMethod"] | "">("")
  const [frequency, setFrequency] = useState<RecurringExpenseRecord["frequency"]>("Monthly")
  const [amount, setAmount] = useState("")
  const [startDate, setStartDate] = useState("01 Dec 2026")
  const [nextDueDate, setNextDueDate] = useState("01 Dec 2026")
  const [status, setStatus] = useState<"Active" | "Paused">("Active")
  const [autoCreate, setAutoCreate] = useState(true)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!expenseName || !amount) return

    const newItem: RecurringExpenseRecord = {
      id: `rec-${Date.now()}`,
      expenseName,
      vendor: expenseType || "Recurring Vendor",
      category: (category as RecurringExpenseRecord["category"]) || "Rent & Facilities",
      expenseType,
      frequency,
      amount: amount.startsWith("₹") ? amount : `₹ ${amount}`,
      startDate,
      nextDueDate,
      paymentMethod: (paymentMethod as RecurringExpenseRecord["paymentMethod"]) || "Bank Transfer",
      status,
      autoCreate,
      notes: `${frequency} recurring operational charge. Auto-created: ${autoCreate ? "Yes" : "No"}.`,
    }

    onAdd(newItem)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EEF0FD] text-[#5B50E5] flex items-center justify-center shrink-0">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 leading-tight">
                Add Recurring Expense
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Create a recurring expense to automatically track and manage repeat costs
              </p>
            </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Expense Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                  placeholder="e.g., Office Rent"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-2xs transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Expense Type <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <CircleDot className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  required
                  value={expenseType}
                  onChange={(e) => setExpenseType(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200/90 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-2xs appearance-none transition-all cursor-pointer"
                >
                  <option value="" disabled>Select expense type</option>
                  <option value="Operational (OpEx)">Operational (OpEx)</option>
                  <option value="Facilities & Rent">Facilities & Rent</option>
                  <option value="Software & Subscriptions">Software & Subscriptions</option>
                  <option value="Vendor Services">Vendor Services</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Capital Expenditure (CapEx)">Capital Expenditure (CapEx)</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  ▼
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Category <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <FolderKanban className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  required
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as RecurringExpenseRecord["category"])
                  }
                  className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200/90 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-2xs appearance-none transition-all cursor-pointer"
                >
                  <option value="" disabled>Select category</option>
                  <option value="Rent & Facilities">Rent & Facilities</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Software Subscription">Software Subscription</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Other">Other</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  ▼
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Payment Method <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  required
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value as RecurringExpenseRecord["paymentMethod"])
                  }
                  className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200/90 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-2xs appearance-none transition-all cursor-pointer"
                >
                  <option value="" disabled>Select payment method</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Card">Card</option>
                  <option value="UPI">UPI</option>
                  <option value="Cash">Cash</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  ▼
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Frequency <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["Monthly", "Quarterly", "Yearly"] as const).map((freq) => {
                  const isSelected = frequency === freq
                  return (
                    <label
                      key={freq}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                        isSelected
                          ? "border-[#5B50E5] bg-[#EEF0FD]/60 text-[#5B50E5] font-semibold shadow-2xs"
                          : "border-slate-200/90 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="modal-frequency"
                        value={freq}
                        checked={isSelected}
                        onChange={() => setFrequency(freq)}
                        className="sr-only"
                      />
                      <span
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? "border-[#5B50E5] bg-[#5B50E5]"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </span>
                      <span>{freq}</span>
                    </label>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Amount <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-xs">
                  ₹
                </span>
                <input
                  type="text"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full pl-8 pr-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-2xs transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Start Date <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Select start date"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-2xs transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Next Due Date <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={nextDueDate}
                  onChange={(e) => setNextDueDate(e.target.value)}
                  placeholder="Select next due date"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-2xs transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 items-center">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Status <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStatus("Active")}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    status === "Active"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-200 shadow-2xs"
                      : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Active</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus("Paused")}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    status === "Paused"
                      ? "bg-amber-50 text-amber-600 border-amber-200 shadow-2xs"
                      : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>Paused</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 p-3 bg-slate-50/60 rounded-xl border border-slate-200/70 sm:self-end">
              <span className="text-xs text-slate-600 font-medium">
                Auto-create expense on due date
              </span>
              <button
                type="button"
                onClick={() => setAutoCreate(!autoCreate)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  autoCreate ? "bg-[#5B50E5]" : "bg-slate-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    autoCreate ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#5B50E5] hover:bg-[#4E44C9] text-xs font-semibold text-white shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Recurring Expense</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
