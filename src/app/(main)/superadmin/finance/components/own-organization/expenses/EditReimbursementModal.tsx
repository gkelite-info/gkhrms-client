"use client"

import { useState, useEffect } from "react"
import {
  X,
  FileText,
  FolderKanban,
  Calendar,
  Save,
  Receipt,
  AlignLeft,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react"
import { ReimbursementRecord } from "./ReimbursementsData"

interface EditReimbursementModalProps {
  item: ReimbursementRecord | null
  onClose: () => void
  onSave: (updated: ReimbursementRecord) => void
}

export default function EditReimbursementModal({
  item,
  onClose,
  onSave,
}: EditReimbursementModalProps) {
  const [expenseTitle, setExpenseTitle] = useState("")
  const [category, setCategory] = useState<ReimbursementRecord["category"]>("Travel")
  const [amount, setAmount] = useState("")
  const [expenseDate, setExpenseDate] = useState("")
  const [submittedOn, setSubmittedOn] = useState("")
  const [status, setStatus] = useState<ReimbursementRecord["status"]>("Pending")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (item) {
      setExpenseTitle(item.expenseTitle)
      setCategory(item.category)
      setAmount(item.amount.replace("₹", "").trim())
      setExpenseDate(item.expenseDate)
      setSubmittedOn(item.submittedOn)
      setStatus(item.status)
      setDescription(item.description || "")
    }
  }, [item])

  if (!item) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!expenseTitle || !amount) return

    const updated: ReimbursementRecord = {
      ...item,
      expenseTitle,
      category,
      amount: amount.startsWith("₹") ? amount : `₹ ${amount}`,
      expenseDate,
      submittedOn,
      status,
      description,
      approvedBy:
        status === "Paid"
          ? "Finance Dept (Settled)"
          : status === "Rejected"
          ? "Finance Review (Declined)"
          : "Pending Manager Review",
    }

    onSave(updated)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EEF0FD] text-[#5B50E5] flex items-center justify-center shrink-0">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 leading-tight">
                Edit Reimbursement — {item.id}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Update reimbursement claim details and approval status
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
          <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${item.employee.avatarBg}`}
              >
                {item.employee.initials}
              </div>
              <div>
                <span className="font-semibold text-slate-800 block text-xs">
                  {item.employee.name}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {item.employee.designation}
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Claim ID: {item.id}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Expense Title <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-2xs transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Category <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <FolderKanban className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as ReimbursementRecord["category"])
                  }
                  className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200/90 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-2xs appearance-none transition-all cursor-pointer"
                >
                  <option value="Travel">Travel</option>
                  <option value="Communication">Communication</option>
                  <option value="Meals">Meals</option>
                  <option value="Local Travel">Local Travel</option>
                  <option value="IT & Equipment">IT & Equipment</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Other">Other</option>
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
                  className="w-full pl-8 pr-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-2xs transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Expense Date <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={expenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-2xs transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-slate-700">
              Description / Notes
            </label>
            <div className="relative">
              <AlignLeft className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-2xs resize-none transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-slate-700">
              Status <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStatus("Pending")}
                className={`py-2 px-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  status === "Pending"
                    ? "bg-amber-50 text-amber-600 border-amber-200 shadow-2xs"
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Pending</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus("Paid")}
                className={`py-2 px-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  status === "Paid"
                    ? "bg-emerald-50 text-emerald-600 border-emerald-200 shadow-2xs"
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Paid</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus("Rejected")}
                className={`py-2 px-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  status === "Rejected"
                    ? "bg-rose-50 text-rose-600 border-rose-200 shadow-2xs"
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Rejected</span>
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
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
