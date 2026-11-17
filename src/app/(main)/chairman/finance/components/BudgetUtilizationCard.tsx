"use client"

import { useState } from "react"
import { Compass, ChevronDown } from "lucide-react"

export default function BudgetUtilizationCard() {
  const [period, setPeriod] = useState("This Year")
  const [isOpen, setIsOpen] = useState(false)

  const percentage = 68
  const strokeWidth = 10
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5B50E5] flex items-center justify-center shrink-0">
            <Compass className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            Budget Utilization
          </h2>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="h-7 px-2.5 bg-slate-50 border border-slate-200/80 rounded-lg text-xs font-medium text-slate-600 flex items-center gap-1.5 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span>{period}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
              {["This Year", "Last Year", "This Quarter"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setPeriod(opt)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                    period === opt
                      ? "font-bold text-[#5B50E5]"
                      : "text-slate-600"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 my-auto">
        <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#F1F5F9"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#5B50E5"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-bold text-slate-900 leading-tight">
              {percentage}%
            </span>
            <span className="text-[9px] text-slate-400 font-medium mt-0.5">
              $17.68M of $26.00M
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 flex-1 w-full text-xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Total Budget</span>
            <span className="font-bold text-slate-900">$26.00M</span>
          </div>

          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Utilized</span>
            <span className="font-bold text-slate-900">$17.68M</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Remaining</span>
            <span className="font-bold text-emerald-600">$8.32M</span>
          </div>
        </div>
      </div>
    </div>
  )
}
