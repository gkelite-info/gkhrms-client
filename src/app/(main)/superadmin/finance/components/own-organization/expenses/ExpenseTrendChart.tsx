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
import { EXPENSE_TREND_DATA } from "./ExpensesData"

interface CustomTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

function CustomExpenseTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-900 text-white rounded-xl px-3.5 py-2.5 shadow-xl text-xs flex flex-col gap-1 border border-slate-800">
        <span className="font-semibold text-slate-300">{label}</span>
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-400">Total Spend:</span>
          <span className="font-bold text-[#A5B4FC]">{data.label}</span>
        </div>
      </div>
    )
  }
  return null
}

export default function ExpenseTrendChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          Expense Trend (Last 6 Months)
        </h2>
      </div>

      <div className="w-full h-64 pt-2">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={EXPENSE_TREND_DATA}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
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
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                dy={10}
              />
              <YAxis
                domain={[0, 25]}
                ticks={[0, 5, 10, 15, 20, 25]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                tickFormatter={(val) => (val === 0 ? "₹ 0" : `₹ ${val}L`)}
              />
              <Tooltip content={<CustomExpenseTooltip />} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#5B50E5"
                strokeWidth={2.5}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "#5B50E5",
                  stroke: "#EEF0FD",
                  strokeWidth: 3,
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
