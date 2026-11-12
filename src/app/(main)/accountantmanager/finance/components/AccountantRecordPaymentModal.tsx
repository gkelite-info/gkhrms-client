"use client"

import { useState } from "react"
import {
  X,
  Building2,
  User,
  Calendar,
  CheckCircle2,
} from "lucide-react"
import { AccountantPayment, PaymentType, PaymentMethod } from "../types"
import {
  vendorOptions,
  employeeListOptions,
} from "../data/mockAccountantData"

interface AccountantRecordPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSavePayment: (payment: AccountantPayment) => void
}

export default function AccountantRecordPaymentModal({
  isOpen,
  onClose,
  onSavePayment,
}: AccountantRecordPaymentModalProps) {
  const [paymentType, setPaymentType] = useState<PaymentType>("Vendor Payment")
  const [vendorName, setVendorName] = useState(vendorOptions[1] || "Airtel Business")
  const [employeeName, setEmployeeName] = useState(
    employeeListOptions[1] || "Ravi Kumar (EMP104)"
  )
  const [expenseType, setExpenseType] = useState("Travel")
  const [billNumber, setBillNumber] = useState("")
  const [date1, setDate1] = useState("24 Nov 2026")
  const [paymentDate, setPaymentDate] = useState("28 Nov 2026")
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Bank Transfer")
  const [status, setStatus] = useState<"Paid" | "Pending">("Paid")
  const [department, setDepartment] = useState("Operations")
  const [notes, setNotes] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: { [key: string]: string } = {}
    if (!amount.trim()) newErrors.amount = "Payment amount is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const numAmount = parseFloat(amount.replace(/[^0-9.]/g, "")) || 0
    const formattedAmount = `₹ ${numAmount.toLocaleString("en-IN")}`

    const payee =
      paymentType === "Vendor Payment" ? vendorName : employeeName

    const reference =
      paymentType === "Vendor Payment"
        ? billNumber.trim() || "INV-8912 (Disbursement)"
        : `${expenseType} Claim - Nov 2026`

    const newPayment: AccountantPayment = {
      id: `pay-${Date.now()}`,
      paymentId: `PAY-0${Math.floor(153 + Math.random() * 50)}`,
      date: status === "Pending" ? "—" : paymentDate,
      paymentType,
      payee,
      reference,
      amount: formattedAmount,
      numericAmount: numAmount,
      paymentMethod,
      status,
      department,
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
              Record Payment
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Execute and record approved payment disbursement
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
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Payment Type *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentType("Vendor Payment")}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    paymentType === "Vendor Payment"
                      ? "bg-[#FAF5FF] border-purple-300 text-purple-700 shadow-xs"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-purple-500" />
                  <span>Vendor Payment</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType("Reimbursement")}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    paymentType === "Reimbursement"
                      ? "bg-[#F0F9FF] border-sky-300 text-sky-700 shadow-xs"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-sky-500" />
                  <span>Employee Reimbursement</span>
                </button>
              </div>
            </div>

            {paymentType === "Vendor Payment" ? (
              <>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                    Vendor *
                  </label>
                  <select
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs cursor-pointer"
                  >
                    {vendorOptions
                      .filter((v) => v !== "All Vendors")
                      .map((vendor) => (
                        <option key={vendor} value={vendor}>
                          {vendor}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                      Bill / Invoice #
                    </label>
                    <input
                      type="text"
                      value={billNumber}
                      onChange={(e) => setBillNumber(e.target.value)}
                      placeholder="e.g. INV-7845"
                      className="w-full px-3 py-2 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs"
                    />
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
                        if (errors.amount) setErrors((prev) => ({ ...prev, amount: "" }))
                      }}
                      placeholder="e.g. 18450"
                      className={`w-full px-3 py-2 bg-white border rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs ${
                        errors.amount ? "border-rose-400" : "border-slate-200/80"
                      }`}
                    />
                    {errors.amount && (
                      <p className="text-[10px] text-rose-500 mt-1">{errors.amount}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                      Bill Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={date1}
                        onChange={(e) => setDate1(e.target.value)}
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
              </>
            ) : (
              <>
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
                        if (errors.amount) setErrors((prev) => ({ ...prev, amount: "" }))
                      }}
                      placeholder="e.g. 9800"
                      className={`w-full px-3 py-2 bg-white border rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs ${
                        errors.amount ? "border-rose-400" : "border-slate-200/80"
                      }`}
                    />
                    {errors.amount && (
                      <p className="text-[10px] text-rose-500 mt-1">{errors.amount}</p>
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
                        value={date1}
                        onChange={(e) => setDate1(e.target.value)}
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
              </>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
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
                <option value="Operations">Operations</option>
                <option value="Sales">Sales</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="HR">HR</option>
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
