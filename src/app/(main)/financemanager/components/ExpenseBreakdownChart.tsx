"use client"

import { useState, useEffect } from "react"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts"
import { ArrowUpRight } from "lucide-react"
import { expenseBreakdownData } from "../data/mockFinanceData"
import ExpenseBreakdownDetailsModal from "./ExpenseBreakdownDetailsModal"

export default function ExpenseBreakdownChart() {
  const [mounted, setMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        title="Click to view breakdown details"
        className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100/80 shadow-xs flex flex-col justify-between h-[300px] xl:h-[320px] hover:border-[#4F46E5]/40 transition-colors cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight group-hover:text-[#4F46E5] transition-colors">
              Expense Breakdown
            </h2>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#4F46E5] transition-colors" />
          </div>
        </div>

      <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center shrink-0">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="bg-slate-900 text-white px-2.5 py-1.5 rounded-xl text-xs shadow-lg">
                          <span className="font-semibold">{data.name}: </span>
                          <span className="text-indigo-300 font-bold">
                            {data.percentage}%
                          </span>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Pie
                  data={expenseBreakdownData}
                  dataKey="percentage"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={54}
                  outerRadius={76}
                  paddingAngle={2}
                  stroke="#FFFFFF"
                  strokeWidth={2}
                >
                  {expenseBreakdownData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-36 h-36 rounded-full border-4 border-slate-100 animate-pulse" />
          )}

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-base sm:text-lg font-extrabold text-slate-900 leading-none">
              $2.18M
            </span>
            <span className="text-[10px] font-medium text-slate-400 mt-0.5">
              Total Expenses
            </span>
          </div>
        </div>

        <div className="w-full sm:flex-1 flex flex-col justify-center gap-2 pl-0 sm:pl-2">
          {expenseBreakdownData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-xs py-0.5"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-slate-600 whitespace-nowrap text-[11px] sm:text-xs">
                  {item.name}
                </span>
              </div>
              <span className="font-bold text-slate-800 text-[11px] sm:text-xs pl-2">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
      </div>

      <ExpenseBreakdownDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

