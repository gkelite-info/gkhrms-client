"use client"

import { useState, useEffect } from "react"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts"
import { PieChart as PieIcon, ChevronDown } from "lucide-react"
import {
  REVENUE_BY_SOURCE_SLICES,
  RevenueBySourceSlice,
} from "./ChairmanRevenueData"

interface CustomTooltipProps {
  active?: boolean
  payload?: { payload: RevenueBySourceSlice }[]
}

function CustomDonutTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-900 text-white rounded-xl px-3 py-1.5 sm:px-3.5 sm:py-2 shadow-xl text-xs flex flex-col gap-1 border border-slate-800">
        <span className="font-semibold text-slate-200">{data.name}</span>
        <div className="flex items-center justify-between gap-3 text-slate-300">
          <span>Share:</span>
          <span className="font-bold text-white">{data.percentage}%</span>
        </div>
        <div className="flex items-center justify-between gap-3 text-slate-300">
          <span>Amount:</span>
          <span className="font-bold text-white">{data.amount}</span>
        </div>
      </div>
    )
  }
  return null
}

export default function ChairmanRevenueBySourceChart() {
  const [mounted, setMounted] = useState(false)
  const [filterDropdown, setFilterDropdown] = useState("This Year")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5B50E5] flex items-center justify-center shrink-0">
            <PieIcon className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            Revenue by Source
          </h2>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="h-7 px-2.5 bg-slate-50 border border-slate-200/80 rounded-lg text-xs font-medium text-slate-600 flex items-center gap-1.5 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span>{filterDropdown}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
              {["This Year", "Last Year", "All Time"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setFilterDropdown(opt)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                    filterDropdown === opt
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

      <div className="flex flex-col sm:flex-row items-center gap-4 py-2 flex-1 justify-center">
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 shrink-0 flex items-center justify-center">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomDonutTooltip />} />
                <Pie
                  data={REVENUE_BY_SOURCE_SLICES}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="percentage"
                  strokeWidth={0}
                >
                  {REVENUE_BY_SOURCE_SLICES.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-[10px] text-slate-400">Loading...</span>
            </div>
          )}

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-xs font-bold text-slate-900 leading-tight">
              $24.86M
            </span>
            <span className="text-[9px] text-slate-400 font-medium leading-tight mt-0.5">
              Total Revenue
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 sm:gap-2 w-full sm:flex-1 min-w-0 justify-center">
          {REVENUE_BY_SOURCE_SLICES.map((slice) => (
            <div
              key={slice.name}
              className="flex items-center justify-between text-xs gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="text-slate-600 truncate text-[11px] font-medium">
                  {slice.name}
                </span>
              </div>
              <span className="font-bold text-slate-800 text-[11px] shrink-0">
                {slice.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
