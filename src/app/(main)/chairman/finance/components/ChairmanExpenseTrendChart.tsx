"use client"

import { useState, useEffect } from "react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts"
import {
  MONTHLY_EXPENSE_TREND,
  QUARTERLY_EXPENSE_TREND,
  YEARLY_EXPENSE_TREND,
  ExpenseTrendPoint,
} from "./ChairmanExpensesData"

interface CustomTooltipProps {
  active?: boolean
  payload?: { payload: ExpenseTrendPoint }[]
  label?: string
}

function CustomExpenseTrendTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-900 text-white rounded-xl px-3 py-1.5 sm:px-3.5 sm:py-2 shadow-xl text-xs flex flex-col gap-1 border border-slate-800">
        <span className="font-semibold text-slate-300">{label}</span>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[#A5B4FC] font-medium">Expense:</span>
          <span className="font-bold text-white">{data.amountFormatted}</span>
        </div>
      </div>
    )
  }
  return null
}

export default function ChairmanExpenseTrendChart() {
  const [mounted, setMounted] = useState(false)
  const [period, setPeriod] = useState<"Monthly" | "Quarterly" | "Yearly">("Monthly")

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentData =
    period === "Monthly"
      ? MONTHLY_EXPENSE_TREND
      : period === "Quarterly"
      ? QUARTERLY_EXPENSE_TREND
      : YEARLY_EXPENSE_TREND

  const yDomain = period === "Yearly" ? [0, 150] : period === "Quarterly" ? [0, 40] : [0, 25]
  const yTicks =
    period === "Yearly"
      ? [0, 30, 60, 90, 120, 150]
      : period === "Quarterly"
      ? [0, 10, 20, 30, 40]
      : [0, 5, 10, 15, 20, 25]

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          Expense Trend
        </h2>

        <div className="bg-slate-100/80 p-0.5 rounded-lg inline-flex items-center gap-0.5">
          {(["Monthly", "Quarterly", "Yearly"] as const).map((tab) => {
            const isActive = period === tab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setPeriod(tab)}
                className={`px-2.5 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#5B50E5] text-white shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>
      </div>

      <div className="w-full h-56 sm:h-64 pt-1">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={currentData}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              barCategoryGap="20%"
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
                domain={yDomain}
                ticks={yTicks}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: "#94A3B8" }}
                tickFormatter={(val) => (val === 0 ? "₹ 0" : `₹ ${val}L`)}
              />

              <Tooltip content={<CustomExpenseTrendTooltip />} />

              <Bar
                dataKey="amount"
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
              >
                {currentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isCurrent ? "#5B50E5" : "#DEDCFA"}
                  />
                ))}
              </Bar>
            </BarChart>
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
