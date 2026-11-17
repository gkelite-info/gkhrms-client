"use client"

import {
  X,
  Calendar,
  Building2,
  Download,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
} from "lucide-react"
import { MonthRevenueRecord } from "../monthlyRevenueData"

interface MonthDetailsModalProps {
  record: MonthRevenueRecord | null
  onClose: () => void
}

export default function MonthDetailsModal({
  record,
  onClose,
}: MonthDetailsModalProps) {
  if (!record) return null

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl border border-slate-100 flex flex-col animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EEF0FD] flex items-center justify-center text-[#5B50E5]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                {record.month} Breakdown
              </h3>
              <span className="text-[11px] text-slate-400">
                Financial Summary & Invoices
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4 text-xs overflow-y-auto max-h-[calc(85vh-120px)]">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 font-medium">
                Total Revenue Collected
              </span>
              <div className="text-xl font-bold text-slate-800 mt-0.5">
                {record.totalRevenue}
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Collected
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-slate-400" />
                Net Revenue
              </span>
              <div className="font-bold text-slate-800 mt-1 text-sm">
                {record.netRevenue}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <RotateCcw className="w-3 h-3 text-slate-400" />
                Refunds Issued
              </span>
              <div className="font-bold text-rose-600 mt-1 text-sm">
                {record.refundAmount}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Building2 className="w-3 h-3 text-slate-400" />
                Companies Paid
              </span>
              <div className="font-bold text-slate-800 mt-1 text-sm">
                {record.companiesPaid} Companies
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Billing Cycle
              </span>
              <div className="font-bold text-slate-800 mt-1 text-sm">
                {record.month}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 flex flex-col gap-2">
            <span className="text-[11px] font-bold text-slate-600">
              Plan Revenue Split
            </span>
            <div className="flex items-center justify-between text-slate-600">
              <span>Basic Plan</span>
              <span className="font-semibold text-slate-800">{record.basicRevenue}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Professional Plan</span>
              <span className="font-semibold text-slate-800">{record.proRevenue}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Enterprise Plan</span>
              <span className="font-semibold text-slate-800">{record.enterpriseRevenue}</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              alert(`Report for ${record.month} downloaded.`)
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#5B50E5] hover:bg-[#4E44C9] flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Export Monthly Report
          </button>
        </div>
      </div>
    </div>
  )
}
