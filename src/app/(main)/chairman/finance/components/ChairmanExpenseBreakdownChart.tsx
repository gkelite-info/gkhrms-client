"use client"

import { useState, useEffect } from "react"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts"
import {
  EXPENSE_BREAKDOWN_SLICES,
  ExpenseBreakdownSlice,
} from "./ChairmanExpensesData"

interface CustomTooltipProps {
  active?: boolean
  payload?: { payload: ExpenseBreakdownSlice }[]
}

function CustomExpenseBreakdownTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-900 text-white rounded-xl px-3 py-1.5 sm:px-3.5 sm:py-2 shadow-xl text-xs flex flex-col gap-1 border border-slate-800">
        <span className="font-semibold text-slate-200">{data.name}</span>
        <div className="flex items-center justify-between gap-3 text-slate-300">
          <span>Amount:</span>
          <span className="font-bold text-white">{data.amount}</span>
        </div>
        <div className="flex items-center justify-between gap-3 text-slate-300">
          <span>Share:</span>
          <span className="font-bold text-white">{data.percentage}%</span>
        </div>
      </div>
    )
  }
  return null
}

export default function ChairmanExpenseBreakdownChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          Expense Breakdown (₹ 1,24,80,000)
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 py-2 flex-1 justify-center">
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 shrink-0 flex items-center justify-center">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomExpenseBreakdownTooltip />} />
                <Pie
                  data={EXPENSE_BREAKDOWN_SLICES}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={68}
                  paddingAngle={2}
                  dataKey="percentage"
                  strokeWidth={0}
                >
                  {EXPENSE_BREAKDOWN_SLICES.map((entry) => (
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
            <span className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
              ₹ 1.24 Cr
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
              Total Expenses
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:gap-2.5 w-full sm:flex-1 min-w-0 justify-center">
          {EXPENSE_BREAKDOWN_SLICES.map((slice) => (
            <div
              key={slice.name}
              className="flex items-center justify-between text-xs gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="text-slate-600 truncate text-[11px] font-medium">
                  {slice.name}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <span className="text-slate-800 font-semibold text-[11px]">
                  {slice.amount}
                </span>
                <span className="text-slate-400 text-[10px] w-9 text-right font-medium">
                  {slice.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
