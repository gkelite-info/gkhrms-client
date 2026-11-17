"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function MoneyReceivedHeader() {
  return (
    <div className="flex items-center gap-3.5">
      <Link
        href="/superadmin/finance"
        className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-600 hover:text-[#5B50E5] hover:border-[#5B50E5]/30 hover:bg-[#EEF0FD] transition-all cursor-pointer group shrink-0"
        title="Back to Finance Overview"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
      </Link>

      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Money Received
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          View all successful subscription payments received from registered client companies.
        </p>
      </div>
    </div>
  )
}
