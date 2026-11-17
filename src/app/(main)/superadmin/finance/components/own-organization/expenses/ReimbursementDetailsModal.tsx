"use client"

import {
  X,
  Receipt,
  User,
  Calendar,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  DollarSign,
} from "lucide-react"
import { ReimbursementRecord } from "./ReimbursementsData"

interface ReimbursementDetailsModalProps {
  item: ReimbursementRecord | null
  onClose: () => void
}

export default function ReimbursementDetailsModal({
  item,
  onClose,
}: ReimbursementDetailsModalProps) {
  if (!item) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EEF0FD] text-[#5B50E5] flex items-center justify-center shrink-0">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-800 leading-tight">
                  {item.id}
                </h3>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                    item.status === "Paid"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                      : item.status === "Pending"
                      ? "bg-amber-50 text-amber-600 border-amber-200"
                      : "bg-rose-50 text-rose-600 border-rose-200"
                  }`}
                >
                  {item.status === "Paid" && <CheckCircle2 className="w-3 h-3" />}
                  {item.status === "Pending" && <Clock className="w-3 h-3" />}
                  {item.status === "Rejected" && <XCircle className="w-3 h-3" />}
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Submitted on {item.submittedOn}
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

        <div className="bg-[#EEF0FD]/40 border border-[#EEF0FD] rounded-2xl p-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Claim Amount
            </span>
            <span className="text-2xl font-bold text-[#5B50E5] mt-0.5">
              {item.amount}
            </span>
          </div>
          <div className="text-right flex flex-col items-end">
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Category
            </span>
            <span className="text-xs font-semibold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200/80 mt-1">
              {item.category}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-xs">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-slate-500 flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Employee
            </span>
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${item.employee.avatarBg}`}
              >
                {item.employee.initials}
              </div>
              <div className="text-right">
                <span className="font-semibold text-slate-800 block">
                  {item.employee.name}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {item.employee.designation}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-slate-500 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              Expense Title
            </span>
            <span className="font-semibold text-slate-800 text-right">
              {item.expenseTitle}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-slate-500 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Expense Date
            </span>
            <span className="font-medium text-slate-700">{item.expenseDate}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-slate-500 flex items-center gap-2">
              <CreditCard className="w-3.5 h-3.5 text-slate-400" />
              Payment Method
            </span>
            <span className="font-medium text-slate-700">
              {item.paymentMethod || "Bank Transfer"}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-slate-500 flex items-center gap-2">
              <DollarSign className="w-3.5 h-3.5 text-slate-400" />
              Approval Status
            </span>
            <span className="font-medium text-slate-700">
              {item.approvedBy || "Finance Team"}
            </span>
          </div>

          {item.description && (
            <div className="flex flex-col gap-1 py-2">
              <span className="text-slate-500 font-medium">Justification / Details</span>
              <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                {item.description}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
