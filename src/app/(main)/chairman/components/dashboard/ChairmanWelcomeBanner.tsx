"use client"

import { Crown, Calendar } from "lucide-react"

export default function ChairmanWelcomeBanner() {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex items-center gap-3.5 flex-1 min-w-0">
        <div className="w-11 h-11 rounded-xl bg-purple-50 text-[#5B50E5] border border-purple-100 flex items-center justify-center shrink-0">
          <Crown className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Good morning, Mr. Rajiv Mehta</span>
            <span className="inline-block animate-wave text-base">👋</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 truncate">
            Here&apos;s a strategic overview of our people, performance and financial health.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex items-center gap-3 shrink-0 self-start sm:self-auto">
        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
          <Calendar className="w-5 h-5 text-slate-500" />
        </div>
        <div>
          <span className="text-xs font-bold text-slate-800 block leading-tight">
            Tuesday, 26 Aug 2025
          </span>
          <span className="text-[10px] text-slate-400 font-normal block leading-tight mt-0.5">
            Stay informed. Lead with insight.
          </span>
        </div>
      </div>
    </div>
  )
}
