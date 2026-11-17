"use client"

import { useState, useEffect } from "react"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"
import { EXPENSE_CATEGORY_DATA } from "./ExpensesData"

export default function ExpenseCategoryDonutChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          Expense by Category (Nov 2026)
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
        <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
          {mounted ? (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const item = payload[0].payload
                        return (
                          <div className="bg-slate-900 text-white rounded-xl px-3 py-2 shadow-lg text-xs border border-slate-800">
                            <span className="font-semibold">{item.name}</span>
                            <div className="text-emerald-400 font-bold mt-0.5">
                              {item.value}% ({item.amount})
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Pie
                    data={EXPENSE_CATEGORY_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {EXPENSE_CATEGORY_DATA.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-lg font-bold text-slate-900 leading-tight">
                  ₹ 3,25,000
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  Total Spend
                </span>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <span className="text-xs text-slate-400">Loading...</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2.5 flex-1 w-full sm:w-auto text-xs">
          {EXPENSE_CATEGORY_DATA.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-3 text-slate-600"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium truncate">{item.name}</span>
              </div>
              <span className="font-bold text-slate-900 shrink-0">
                {item.value.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
