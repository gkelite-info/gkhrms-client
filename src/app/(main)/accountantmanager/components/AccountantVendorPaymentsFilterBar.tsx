"use client"

import { useState } from "react"
import { Calendar, ChevronDown, User, Plus, FileText } from "lucide-react"
import { PaymentSubTab } from "../types"
import {
  paymentDateRanges,
  vendorOptions,
  vendorPaymentStatusOptions,
} from "../data/mockAccountantData"

interface AccountantVendorPaymentsFilterBarProps {
  subTab: PaymentSubTab
  onSubTabChange: (subTab: PaymentSubTab) => void
  dateRange: string
  onDateRangeChange: (val: string) => void
  vendor: string
  onVendorChange: (val: string) => void
  status: string
  onStatusChange: (val: string) => void
  onRecordVendorPaymentClick: () => void
}

export default function AccountantVendorPaymentsFilterBar({
  subTab,
  onSubTabChange,
  dateRange,
  onDateRangeChange,
  vendor,
  onVendorChange,
  status,
  onStatusChange,
  onRecordVendorPaymentClick,
}: AccountantVendorPaymentsFilterBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name))
  }

  const closeDropdown = () => setOpenDropdown(null)

  return (
    <div className="space-y-3.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="inline-flex items-center gap-1 bg-white border border-slate-200/80 p-1 rounded-xl shadow-2xs self-start">
          <button
            type="button"
            onClick={() => onSubTabChange("All Payments")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              subTab === "All Payments"
                ? "bg-[#4F46E5] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            All Payments
          </button>

          <button
            type="button"
            onClick={() => onSubTabChange("Vendor Payments")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              subTab === "Vendor Payments"
                ? "bg-[#4F46E5] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Vendor Payments</span>
          </button>

          <button
            type="button"
            onClick={() => onSubTabChange("Employee Reimbursements")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              subTab === "Employee Reimbursements"
                ? "bg-[#4F46E5] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Employee Reimbursements</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onRecordVendorPaymentClick}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#4F46E5] hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm shadow-indigo-100 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Record Vendor Payment</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="relative">
            <label className="block text-[11px] font-medium text-slate-500 mb-1.5 tracking-tight uppercase">
              Date Range
            </label>
            <button
              type="button"
              onClick={() => toggleDropdown("dateRange")}
              className="w-full flex items-center justify-between gap-2 px-3.5 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors cursor-pointer text-left shadow-2xs"
            >
              <div className="flex items-center gap-2 truncate">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{dateRange}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {openDropdown === "dateRange" && (
              <>
                <div className="fixed inset-0 z-20" onClick={closeDropdown} />
                <div className="absolute top-full mt-1.5 left-0 z-30 w-full min-w-[210px] bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                  {paymentDateRanges.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => {
                        onDateRangeChange(range)
                        closeDropdown()
                      }}
                      className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 font-medium transition-colors cursor-pointer ${
                        dateRange === range
                          ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                          : "text-slate-700"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <label className="block text-[11px] font-medium text-slate-500 mb-1.5 tracking-tight uppercase">
              Vendor
            </label>
            <button
              type="button"
              onClick={() => toggleDropdown("vendor")}
              className="w-full flex items-center justify-between gap-2 px-3.5 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors cursor-pointer text-left shadow-2xs"
            >
              <span className="truncate">{vendor}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {openDropdown === "vendor" && (
              <>
                <div className="fixed inset-0 z-20" onClick={closeDropdown} />
                <div className="absolute top-full mt-1.5 left-0 z-30 w-full min-w-[200px] bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                  {vendorOptions.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => {
                        onVendorChange(v)
                        closeDropdown()
                      }}
                      className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 font-medium transition-colors cursor-pointer ${
                        vendor === v
                          ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                          : "text-slate-700"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <label className="block text-[11px] font-medium text-slate-500 mb-1.5 tracking-tight uppercase">
              Status
            </label>
            <button
              type="button"
              onClick={() => toggleDropdown("status")}
              className="w-full flex items-center justify-between gap-2 px-3.5 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors cursor-pointer text-left shadow-2xs"
            >
              <span className="truncate">{status}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {openDropdown === "status" && (
              <>
                <div className="fixed inset-0 z-20" onClick={closeDropdown} />
                <div className="absolute top-full mt-1.5 left-0 z-30 w-full min-w-[170px] bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                  {vendorPaymentStatusOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        onStatusChange(opt)
                        closeDropdown()
                      }}
                      className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 font-medium transition-colors cursor-pointer ${
                        status === opt
                          ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                          : "text-slate-700"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

