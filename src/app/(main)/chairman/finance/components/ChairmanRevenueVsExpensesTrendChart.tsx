"use client"

import { useState, useEffect } from "react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"
import { TrendingUp } from "lucide-react"
import {
  QUARTERLY_TREND_DATA,
  QuarterlyTrendPoint,
} from "./ChairmanReportsData"

interface CustomTooltipProps {
  active?: boolean
  payload?: { payload: QuarterlyTrendPoint }[]
  label?: string
}

function CustomQuarterlyTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-900 text-white rounded-xl px-3 py-1.5 sm:px-3.5 sm:py-2 shadow-xl text-xs flex flex-col gap-1.5 border border-slate-800">
        <span className="font-semibold text-slate-300">{label}</span>
        <div className="flex items-center justify-between gap-4">
          <span className="text-[#A5B4FC] font-medium">Revenue:</span>
          <span className="font-bold text-white">{data.revenueFormatted}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-sky-300 font-medium">Expenses:</span>
          <span className="font-bold text-white">{data.expensesFormatted}</span>
        </div>
      </div>
    )
  }
  return null
}

export default function ChairmanRevenueVsExpensesTrendChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5B50E5] flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">
              Revenue vs Expenses Trend
            </h2>
            <p className="text-[11px] text-slate-400">
              Quarterly company performance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3730A3]" />
            <span className="font-medium text-[11px]">Revenue</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-[#818CF8]" />
            <span className="font-medium text-[11px]">Expenses</span>
          </div>
        </div>
      </div>

      <div className="w-full h-52 sm:h-56 pt-2">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={QUARTERLY_TREND_DATA}
              margin={{ top: 15, right: 10, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient id="reportsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818CF8" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#818CF8" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#F1F5F9"
              />

              <XAxis
                dataKey="quarter"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: "#94A3B8" }}
                dy={6}
              />

              <YAxis
                domain={[0, 1000]}
                ticks={[0, 400, 600, 800, 1000]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: "#94A3B8" }}
                tickFormatter={(val) => (val === 0 ? "0" : val === 1000 ? "1,000M" : `${val}M`)}
              />

              <Tooltip content={<CustomQuarterlyTooltip />} />

              <Area
                type="monotone"
                dataKey="revenue"
                fill="url(#reportsGrad)"
                stroke="none"
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3730A3"
                strokeWidth={2.5}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#3730A3",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                }}
              />

              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#818CF8"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#818CF8",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
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
