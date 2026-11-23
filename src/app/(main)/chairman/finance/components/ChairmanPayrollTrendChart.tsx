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
import { BarChart2 } from "lucide-react"
import { PAYROLL_TREND_DATA, PayrollTrendPoint } from "./ChairmanPayrollData"

interface CustomTooltipProps {
  active?: boolean
  payload?: { payload: PayrollTrendPoint }[]
  label?: string
}

function CustomPayrollTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-900 text-white rounded-xl px-3 py-1.5 sm:px-3.5 sm:py-2 shadow-xl text-xs flex flex-col gap-1 border border-slate-800">
        <span className="font-semibold text-slate-300">{label}</span>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[#A5B4FC] font-medium">Payroll Cost:</span>
          <span className="font-bold text-white">{data.costFormatted}</span>
        </div>
      </div>
    )
  }
  return null
}

export default function ChairmanPayrollTrendChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between h-full relative">
      <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5B50E5] flex items-center justify-center shrink-0">
            <BarChart2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">
              Payroll Trend
            </h2>
            <p className="text-[11px] text-slate-400">
              Monthly payroll cost for the last 12 months.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1 bg-[#1E1B4B] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs">
          <span>Dec: $1.08M</span>
        </div>
      </div>

      <div className="w-full h-52 sm:h-56 pt-2">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={PAYROLL_TREND_DATA}
              margin={{ top: 15, right: 10, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient id="payrollAreaGrad" x1="0" y1="0" x2="0" y2="1">
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
                tick={{ fontSize: 9, fill: "#94A3B8" }}
                dy={6}
              />

              <YAxis
                domain={[0.6, 1.2]}
                ticks={[0.6, 0.8, 1.0, 1.2]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: "#94A3B8" }}
                tickFormatter={(val) => `$${val.toFixed(2)}M`}
              />

              <Tooltip content={<CustomPayrollTooltip />} />

              <Area
                type="monotone"
                dataKey="cost"
                stroke="#5B50E5"
                strokeWidth={2.5}
                fill="url(#payrollAreaGrad)"
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
