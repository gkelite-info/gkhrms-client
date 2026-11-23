"use client"

import { useState, useEffect } from "react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"
import { Activity, ChevronDown } from "lucide-react"
import { REVENUE_TREND_DATA, RevenueTrendPoint } from "./ChairmanRevenueData"

interface CustomTooltipProps {
  active?: boolean
  payload?: { payload: RevenueTrendPoint }[]
  label?: string
}

function CustomRevenueTrendTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-900 text-white rounded-xl px-3 py-1.5 sm:px-3.5 sm:py-2 shadow-xl text-xs flex flex-col gap-1 border border-slate-800">
        <span className="font-semibold text-slate-300">{label}</span>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[#A5B4FC] font-medium">Revenue:</span>
          <span className="font-bold text-white">{data.revenueFormatted}</span>
        </div>
      </div>
    )
  }
  return null
}

export default function ChairmanRevenueTrendChart() {
  const [mounted, setMounted] = useState(false)
  const [rangeDropdown, setRangeDropdown] = useState("Last 12 Months")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5B50E5] flex items-center justify-center shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            Revenue Trend
          </h2>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="h-7 px-2.5 bg-slate-50 border border-slate-200/80 rounded-lg text-xs font-medium text-slate-600 flex items-center gap-1.5 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span>{rangeDropdown}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
              {["Last 12 Months", "Last 6 Months", "This Year"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setRangeDropdown(opt)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                    rangeDropdown === opt
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

      <div className="flex items-center gap-2 text-xs mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#5B50E5]" />
        <span className="font-medium text-[11px] text-slate-500">Revenue</span>
      </div>

      <div className="w-full h-52 sm:h-56 pt-1">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={REVENUE_TREND_DATA}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#F1F5F9"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: "#94A3B8" }}
                dy={6}
              />

              <YAxis
                domain={[10, 30]}
                ticks={[10, 15, 20, 25, 30]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: "#94A3B8" }}
                tickFormatter={(val) => `$${val}M`}
              />

              <Tooltip content={<CustomRevenueTrendTooltip />} />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#5B50E5"
                strokeWidth={2.5}
                dot={{
                  r: 3,
                  fill: "#FFFFFF",
                  stroke: "#5B50E5",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 5,
                  fill: "#5B50E5",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center">
            <span className="text-xs text-slate-400">Loading chart...</span>
          </div>
        )}
      </div>
    </div>
  )
}
