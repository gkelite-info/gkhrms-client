"use client"

import { Database } from "lucide-react"
import { COLLECTIONS_SUMMARY } from "./ChairmanRevenueData"

export default function ChairmanCollectionsSummaryCard() {
  const { totalAmount, growthRate, collectedRevenue, pendingRevenue } =
    COLLECTIONS_SUMMARY

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5B50E5] flex items-center justify-center shrink-0">
          <Database className="w-4 h-4" />
        </div>
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          Collections Summary
        </h2>
      </div>

      <div className="flex flex-col justify-center flex-1 py-1 gap-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {totalAmount}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100/80 px-2.5 py-0.5 rounded-full">
            <span>▲</span>
            <span>{growthRate}</span>
            <span className="font-normal text-slate-400 text-[10px]">
              vs. prior period
            </span>
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600">
                Collected Revenue
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900">
                  {collectedRevenue.amount}
                </span>
                <span className="text-[10px] text-slate-400">
                  {collectedRevenue.percentage}% of total
                </span>
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#5B50E5] transition-all duration-500"
                style={{ width: `${collectedRevenue.percentage}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600">
                Pending Revenue
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900">
                  {pendingRevenue.amount}
                </span>
                <span className="text-[10px] text-slate-400">
                  {pendingRevenue.percentage}% of total
                </span>
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#A5B4FC] transition-all duration-500"
                style={{ width: `${pendingRevenue.percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
