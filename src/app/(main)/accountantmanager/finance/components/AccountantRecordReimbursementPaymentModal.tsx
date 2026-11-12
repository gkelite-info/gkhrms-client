"use client"

import { useState } from "react"
import { X, Calendar, CheckCircle2 } from "lucide-react"
import { AccountantEmployeeReimbursementPayment } from "../types"
import { employeeListOptions } from "../data/mockAccountantData"

interface AccountantRecordReimbursementPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSavePayment: (payment: AccountantEmployeeReimbursementPayment) => void
}

export default function AccountantRecordReimbursementPaymentModal({
  isOpen,
  onClose,
  onSavePayment,
}: AccountantRecordReimbursementPaymentModalProps) {
  const [employeeName, setEmployeeName] = useState(
    employeeListOptions[1] || "Ravi Kumar (EMP104)"
  )
  const [expenseType, setExpenseType] = useState("Travel")
  const [approvedDate, setApprovedDate] = useState("26 Nov 2026")
  const [paymentDate, setPaymentDate] = useState("28 Nov 2026")
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<
    "Bank Transfer" | "Card" | "UPI" | "Cash"
  >("Bank Transfer")
  const [status, setStatus] = useState<"Paid" | "Pending">("Paid")
  const [department, setDepartment] = useState("Sales")
  const [notes, setNotes] = useState("")
  const [error, setError] = useState("")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount.trim()) {
      setError("Reimbursement amount is required")
      return
    }

    const numAmount = parseFloat(amount.replace(/[^0-9.]/g, "")) || 0
    const formattedAmount = `₹ ${numAmount.toLocaleString("en-IN")}`

    const newPayment: AccountantEmployeeReimbursementPayment = {
      id: `er-${Date.now()}`,
      paymentId: `ER-0${Math.floor(153 + Math.random() * 50)}`,
      employeeName,
      expenseType,
      approvedDate,
      paymentDate: status === "Pending" ? "—" : paymentDate,
      amount: formattedAmount,
      numericAmount: numAmount,
      paymentMethod,
      status,
      department,
      remarks: notes.trim() || undefined,
      notes: notes.trim() || undefined,
    }

    onSavePayment(newPayment)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className="relative bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 flex flex-col max-h-[85vh] overflow-hidden z-10 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Record Reimbursement Payment
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Disburse approved employee claim payment
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto max-h-[58vh] modal-scrollbar p-6 space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                Employee *
              </label>
              <select
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs cursor-pointer"
              >
                {employeeListOptions
                  .filter((emp) => emp !== "All Employees")
                  .map((emp) => (
                    <option key={emp} value={emp}>
                      {emp}
                    </option>
                  ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Expense Type *
                </label>
                <select
                  value={expenseType}
                  onChange={(e) => setExpenseType(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs cursor-pointer"
                >
                  <option value="Travel">Travel</option>
                  <option value="WFH Internet">WFH Internet</option>
                  <option value="Client Visit Travel">Client Visit Travel</option>
                  <option value="Hotel Stay">Hotel Stay</option>
                  <option value="Office Purchase">Office Purchase</option>
                  <option value="Medical Reimbursement">Medical Reimbursement</option>
                  <option value="Meal Reimbursement">Meal Reimbursement</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Amount (₹) *
                </label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value)
                    if (error) setError("")
                  }}
                  placeholder="e.g. 9800"
                  className={`w-full px-3 py-2 bg-white border rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs ${
                    error ? "border-rose-400" : "border-slate-200/80"
                  }`}
                />
                {error && (
                  <p className="text-[10px] text-rose-500 mt-1">{error}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Approved Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={approvedDate}
                    onChange={(e) => setApprovedDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs"
                  />
                  <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Payment Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs"
                  />
                  <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs cursor-pointer"
                >
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Payment Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs cursor-pointer"
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs cursor-pointer"
              >
                <option value="Sales">Sales</option>
                <option value="Operations">Operations</option>
                <option value="Engineering">Engineering</option>
                <option value="Product">Product</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                Remarks
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional payment remarks..."
                className="w-full px-3 py-2 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs resize-none"
              />
            </div>
          </div>

          <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#4F46E5] hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm shadow-indigo-100 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Record Payment</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
