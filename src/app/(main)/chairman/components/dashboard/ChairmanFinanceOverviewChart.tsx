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
import { BarChart2, ChevronDown } from "lucide-react"
import {
  FINANCE_OVERVIEW_DATA,
  FinanceOverviewPoint,
} from "./ChairmanDashboardData"

interface CustomTooltipProps {
  active?: boolean
  payload?: { payload: FinanceOverviewPoint }[]
  label?: string
}

function CustomFinanceTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-900 text-white rounded-xl px-3.5 py-2 shadow-xl text-xs flex flex-col gap-1 border border-slate-800">
        <span className="font-semibold text-slate-300">{label}</span>
        <div className="flex items-center justify-between gap-4">
          <span className="text-[#A5B4FC]">Total Expense:</span>
          <span className="font-bold text-white">{data.expenseFormatted}</span>
        </div>
      </div>
    )
  }
  return null
}

interface ChairmanFinanceOverviewChartProps {
  onClick?: () => void
}

export default function ChairmanFinanceOverviewChart({
  onClick,
}: ChairmanFinanceOverviewChartProps = {}) {
  const [mounted, setMounted] = useState(false)
  const [period, setPeriod] = useState("Last 12 Months")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      onClick={onClick}
      className={`bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full ${
        onClick
          ? "cursor-pointer hover:border-[#5B50E5]/50 hover:shadow-sm transition-all"
          : ""
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5B50E5] flex items-center justify-center shrink-0">
            <BarChart2 className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            Finance Overview
          </h2>
        </div>

        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="h-7 px-2.5 bg-slate-50 border border-slate-200/80 rounded-lg text-xs font-medium text-slate-600 flex items-center gap-1.5 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span>{period}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
              {["Last 12 Months", "Last 6 Months", "This Year"].map((opt) => (
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

      <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#5B50E5]" />
        <span className="font-medium text-[11px]">Total Expense</span>
      </div>

      <div className="w-full h-56 pt-1">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={FINANCE_OVERVIEW_DATA}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="financeAreaGrad" x1="0" y1="0" x2="0" y2="1">
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
                tick={{ fontSize: 10, fill: "#94A3B8" }}
                dy={8}
              />

              <YAxis
                domain={[0, 4]}
                ticks={[0, 1, 2, 3, 4]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#94A3B8" }}
                tickFormatter={(val) => (val === 0 ? "$0" : `$${val}M`)}
              />

              <Tooltip content={<CustomFinanceTooltip />} />

              <Area
                type="monotone"
                dataKey="expense"
                stroke="#5B50E5"
                strokeWidth={2.5}
                fill="url(#financeAreaGrad)"
                dot={{
                  r: 3.5,
                  fill: "#FFFFFF",
                  stroke: "#5B50E5",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 5,
                  fill: "#5B50E5",
                  stroke: "#EDE9FE",
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
