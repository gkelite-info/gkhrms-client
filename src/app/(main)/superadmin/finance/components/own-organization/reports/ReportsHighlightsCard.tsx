"use client"

import { CheckCircle2, FileText } from "lucide-react"
import { MONTHLY_HIGHLIGHTS } from "./ReportsData"

export default function ReportsHighlightsCard() {
  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
          <FileText className="w-4 h-4" />
        </div>
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          Monthly Key Highlights
        </h2>
      </div>

      <div className="flex flex-col gap-3 py-1 my-auto">
        {MONTHLY_HIGHLIGHTS.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
            <span className="text-xs text-slate-700 font-medium leading-tight">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
