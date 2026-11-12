"use client"

import { CheckCircle2, Clock, IndianRupee } from "lucide-react"
import { VendorPaymentKpis } from "../types"

interface AccountantVendorPaymentKpisProps {
  kpis: VendorPaymentKpis
}

export default function AccountantVendorPaymentKpis({
  kpis,
}: AccountantVendorPaymentKpisProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 xl:gap-4">
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 transition-all hover:shadow-sm">
        <div className="w-11 h-11 rounded-xl bg-[#EAF7EE] flex items-center justify-center shrink-0">
          <IndianRupee className="w-5 h-5 text-emerald-500" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase block">
            TOTAL VENDOR PAYMENTS
          </span>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            {kpis.totalAmount}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 transition-all hover:shadow-sm">
        <div className="w-11 h-11 rounded-xl bg-[#EAF7EE] flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase block">
            PAID
          </span>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            {kpis.paidAmount}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {kpis.paidCount} payments
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 transition-all hover:shadow-sm">
        <div className="w-11 h-11 rounded-xl bg-[#FFF8EB] flex items-center justify-center shrink-0">
          <Clock className="w-5 h-5 text-amber-500" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase block">
            PENDING
          </span>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            {kpis.pendingAmount}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {kpis.pendingCount} payments
          </p>
        </div>
      </div>
    </div>
  )
}

