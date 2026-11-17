"use client"

import { useState } from "react"
import {
  X,
  User,
  FileText,
  FolderKanban,
  Calendar,
  Save,
  Receipt,
  AlignLeft,
  CheckCircle2,
  Clock,
} from "lucide-react"
import { ReimbursementRecord } from "./ReimbursementsData"

interface AddReimbursementModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (item: ReimbursementRecord) => void
}

const EMPLOYEE_PRESETS = [
  {
    name: "Rahul Sharma",
    designation: "Software Developer",
    initials: "RS",
    avatarBg: "bg-purple-100 text-purple-700",
    email: "rahul.sharma@gkelite.com",
  },
  {
    name: "Ananya Mehta",
    designation: "UI/UX Designer",
    initials: "AM",
    avatarBg: "bg-blue-100 text-blue-700",
    email: "ananya.mehta@gkelite.com",
  },
  {
    name: "Vikram Kumar",
    designation: "Project Manager",
    initials: "VK",
    avatarBg: "bg-amber-100 text-amber-700",
    email: "vikram.kumar@gkelite.com",
  },
  {
    name: "Priya Desai",
    designation: "QA Engineer",
    initials: "PD",
    avatarBg: "bg-pink-100 text-pink-700",
    email: "priya.desai@gkelite.com",
  },
  {
    name: "Suresh Nair",
    designation: "DevOps Engineer",
    initials: "SN",
    avatarBg: "bg-sky-100 text-sky-700",
    email: "suresh.nair@gkelite.com",
  },
]

export default function AddReimbursementModal({
  isOpen,
  onClose,
  onAdd,
}: AddReimbursementModalProps) {
  const [selectedEmpIndex, setSelectedEmpIndex] = useState(0)
  const [expenseTitle, setExpenseTitle] = useState("")
  const [category, setCategory] = useState<ReimbursementRecord["category"]>("Travel")
  const [amount, setAmount] = useState("")
  const [expenseDate, setExpenseDate] = useState("Nov 05, 2026")
  const [submittedOn, setSubmittedOn] = useState("Nov 06, 2026")
  const [status, setStatus] = useState<ReimbursementRecord["status"]>("Pending")
  const [description, setDescription] = useState("")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!expenseTitle || !amount) return

    const emp = EMPLOYEE_PRESETS[selectedEmpIndex]
    const newItem: ReimbursementRecord = {
      id: `RMB-${Math.floor(1000 + Math.random() * 9000)}`,
      employee: emp,
      expenseTitle,
      category,
      amount: amount.startsWith("₹") ? amount : `₹ ${amount}`,
      expenseDate,
      submittedOn,
      status,
      description: description || "Reimbursement claim submitted for expense.",
      approvedBy: status === "Paid" ? "Finance Dept" : "Pending Manager Review",
      paymentMethod: status === "Paid" ? "Bank Transfer" : "Pending",
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
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 leading-tight">
                Add Reimbursement
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Create a new reimbursement claim for employee business expenses
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
                Employee <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={selectedEmpIndex}
                  onChange={(e) => setSelectedEmpIndex(Number(e.target.value))}
                  className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200/90 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-2xs appearance-none transition-all cursor-pointer"
                >
                  {EMPLOYEE_PRESETS.map((emp, idx) => (
                    <option key={emp.email} value={idx}>
                      {emp.name} ({emp.designation})
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  ▼
                </div>
              </div>
            </div>

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
                  placeholder="e.g., Client Travel - Pune"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-2xs transition-all"
                />
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
                  placeholder="e.g. 18,500"
                  className="w-full pl-8 pr-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-2xs transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700">
                Submitted On <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={submittedOn}
                  onChange={(e) => setSubmittedOn(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-2xs transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-slate-700">
              Description / Justification
            </label>
            <div className="relative">
              <AlignLeft className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Details of the expenditure, client names, project codes..."
                className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-2xs resize-none transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-slate-700">
              Status <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus("Pending")}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  status === "Pending"
                    ? "bg-amber-50 text-amber-600 border-amber-200 shadow-2xs"
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Pending Approval</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus("Paid")}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  status === "Paid"
                    ? "bg-emerald-50 text-emerald-600 border-emerald-200 shadow-2xs"
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Paid / Settled</span>
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
              <span>Submit Reimbursement</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
