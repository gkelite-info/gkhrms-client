"use client"

import { useState, useEffect } from "react"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"
import { EXPENSES_BREAKDOWN_DATA } from "./ReportsData"

export default function ReportsExpensesDonutChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          Expenses Breakdown
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
        <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
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
                              {item.percentage}% ({item.amount})
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Pie
                    data={EXPENSES_BREAKDOWN_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="percentage"
                    strokeWidth={0}
                  >
                    {EXPENSES_BREAKDOWN_DATA.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-sm font-bold text-slate-900 leading-tight">
                  ₹ 6,75,000
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  Total Expenses
                </span>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <span className="text-xs text-slate-400">Loading chart...</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 flex-1 w-full text-xs">
          {EXPENSES_BREAKDOWN_DATA.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-2 text-slate-600"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-[11px] truncate">
                  {item.name}
                </span>
              </div>
              <span className="font-bold text-slate-800 text-[11px] shrink-0">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
