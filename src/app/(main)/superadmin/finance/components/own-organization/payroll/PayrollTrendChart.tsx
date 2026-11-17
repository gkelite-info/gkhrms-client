"use client"

import { useState, useEffect } from "react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"
import { PAYROLL_TREND_DATA } from "./PayrollData"

interface CustomTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

function CustomPayrollTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-900 text-white rounded-xl px-3.5 py-2.5 shadow-xl text-xs flex flex-col gap-1 border border-slate-800">
        <span className="font-semibold text-slate-300">{label}</span>
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-400">Payroll Amount:</span>
          <span className="font-bold text-[#A5B4FC]">{data.label}</span>
        </div>
      </div>
    )
  }
  return null
}

export default function PayrollTrendChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          Payroll Trend (Last 6 Months)
        </h2>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-[#5B50E5]" />
          <span>Payroll Amount</span>
        </div>
      </div>

      <div className="w-full h-64 pt-2">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={PAYROLL_TREND_DATA}
              margin={{ top: 10, right: 10, left: 15, bottom: 0 }}
            >
              <defs>
                <linearGradient id="payrollAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5B50E5" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#5B50E5" stopOpacity={0.0} />
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
                domain={[0.8, 1.6]}
                ticks={[0.8, 1.0, 1.2, 1.4, 1.6]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                tickFormatter={(val) => `₹ ${val.toFixed(1)} Cr`}
              />
              <Tooltip content={<CustomPayrollTooltip />} />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#5B50E5"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#payrollAreaGradient)"
                dot={{
                  r: 4,
                  fill: "#5B50E5",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: "#5B50E5",
                  stroke: "#EEF0FD",
                  strokeWidth: 3,
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
