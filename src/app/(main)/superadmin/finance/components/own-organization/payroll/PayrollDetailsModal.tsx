"use client"

import { X, Check, Building, CreditCard, Download } from "lucide-react"
import Image from "next/image"
import { PayrollEmployeeRecord } from "./PayrollData"

interface PayrollDetailsModalProps {
  record: PayrollEmployeeRecord | null
  onClose: () => void
}

export default function PayrollDetailsModal({
  record,
  onClose,
}: PayrollDetailsModalProps) {
  if (!record) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 shrink-0 relative">
              <Image
                src={record.avatar}
                alt={record.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 leading-tight">
                {record.name}
              </h3>
              <p className="text-xs text-slate-400">
                {record.employeeId} • {record.department}
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

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 flex flex-col gap-1">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Gross Salary
            </span>
            <span className="text-base font-bold text-slate-800">
              {record.grossSalary}
            </span>
          </div>

          <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100/70 flex flex-col gap-1">
            <span className="text-[11px] font-medium text-rose-500 uppercase tracking-wider">
              Total Deductions
            </span>
            <span className="text-base font-bold text-rose-600">
              {record.deductions}
            </span>
          </div>

          <div className="col-span-2 p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-emerald-600 uppercase tracking-wider">
                Net Disbursed Salary
              </span>
              <span className="text-xl font-bold text-emerald-700">
                {record.netSalary}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-700">
              <Check className="w-3 h-3" />
              {record.status}
            </span>
          </div>
        </div>

        <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 flex flex-col gap-2 text-xs">
          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Building className="w-3.5 h-3.5" />
              Payment Date
            </span>
            <span className="font-semibold text-slate-800">
              {record.paymentDate || "Nov 01, 2026"}
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-1.5 text-slate-500">
              <CreditCard className="w-3.5 h-3.5" />
              Disbursed To
            </span>
            <span className="font-semibold text-slate-800">
              {record.bankAccount || "HDFC Bank (Primary)"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#5B50E5] hover:bg-[#4E44C9] text-xs font-semibold text-white shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Download Payslip
          </button>
        </div>
      </div>
    </div>
  )
}
