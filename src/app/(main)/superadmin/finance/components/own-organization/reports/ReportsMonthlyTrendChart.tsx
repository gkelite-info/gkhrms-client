"use client"

import { useState, useEffect } from "react"
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"
import { MONTHLY_TREND_DATA } from "./ReportsData"

interface CustomTooltipProps {
  active?: boolean
  payload?: { payload: MonthlyTrendDataPoint }[]
  label?: string
}

function CustomTrendTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-900 text-white rounded-xl px-3.5 py-2.5 shadow-xl text-xs flex flex-col gap-1.5 border border-slate-800">
        <span className="font-semibold text-slate-300">{label} 2026</span>
        <div className="flex items-center justify-between gap-4">
          <span className="text-purple-400 font-medium">Payroll:</span>
          <span className="font-bold text-white">{data.payrollFormatted}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-blue-400 font-medium">Expenses:</span>
          <span className="font-bold text-white">{data.expensesFormatted}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-teal-400 font-medium">Reimbursements:</span>
          <span className="font-bold text-white">
            {data.reimbursementsFormatted}
          </span>
        </div>
      </div>
    )
  }
  return null
}

export default function ReportsMonthlyTrendChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          Monthly Trend - Key Metrics
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 py-2">
        <div className="w-full md:w-3/4 h-56 pt-2">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={MONTHLY_TREND_DATA}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="payrollArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#F1F5F9"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  dy={10}
                />

                <YAxis
                  domain={[0, 3.0]}
                  ticks={[0, 1.0, 1.5, 2.0, 2.5, 3.0]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  tickFormatter={(val) =>
                    val === 0 ? "0" : `${val.toFixed(1)}L`
                  }
                />

                <Tooltip content={<CustomTrendTooltip />} />

                <Area
                  type="monotone"
                  dataKey="payroll"
                  fill="url(#payrollArea)"
                  stroke="none"
                />

                <Line
                  type="monotone"
                  dataKey="payroll"
                  stroke="#8B5CF6"
                  strokeWidth={2.5}
                  dot={{ r: 3.5, fill: "#8B5CF6", strokeWidth: 0 }}
                  activeDot={{
                    r: 6,
                    fill: "#8B5CF6",
                    stroke: "#EDE9FE",
                    strokeWidth: 3,
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#3B82F6"
                  strokeWidth={2.2}
                  dot={{ r: 3, fill: "#3B82F6", strokeWidth: 0 }}
                  activeDot={{
                    r: 5,
                    fill: "#3B82F6",
                    stroke: "#DBEAFE",
                    strokeWidth: 2,
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="reimbursements"
                  stroke="#14B8A6"
                  strokeWidth={2.2}
                  dot={{ r: 3, fill: "#14B8A6", strokeWidth: 0 }}
                  activeDot={{
                    r: 5,
                    fill: "#14B8A6",
                    stroke: "#CCFBF1",
                    strokeWidth: 2,
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <span className="text-xs text-slate-400">Loading trend...</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3.5 w-full md:w-1/4 pt-2 border-t md:border-t-0 md:border-l border-slate-100 md:pl-4 text-xs">
          <div>
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] shrink-0" />
              <span>Payroll</span>
            </div>
            <span className="font-bold text-slate-900 text-xs sm:text-sm block mt-0.5 ml-4">
              ₹ 28,50,000
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shrink-0" />
              <span>Expenses</span>
            </div>
            <span className="font-bold text-slate-900 text-xs sm:text-sm block mt-0.5 ml-4">
              ₹ 6,75,000
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6] shrink-0" />
              <span>Reimbursements</span>
            </div>
            <span className="font-bold text-slate-900 text-xs sm:text-sm block mt-0.5 ml-4">
              ₹ 1,20,000
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
