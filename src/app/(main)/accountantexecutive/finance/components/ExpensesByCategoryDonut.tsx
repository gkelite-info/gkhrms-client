"use client"

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"
import { CategoryExpenseData } from "../types"

interface ExpensesByCategoryDonutProps {
  data: CategoryExpenseData[]
  totalExpenseText: string
}

export default function ExpensesByCategoryDonut({
  data,
  totalExpenseText,
}: ExpensesByCategoryDonutProps) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex flex-col justify-between">
      <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight mb-3">
        Expenses by Category
      </h2>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 flex-1 min-h-[260px]">
        <div className="relative w-44 h-44 sm:w-48 sm:h-48 shrink-0 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                formatter={(val: unknown, name: unknown) => [
                  `${val}%`,
                  String(name ?? ""),
                ]}
                contentStyle={{
                  backgroundColor: "#0F172A",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  fontSize: "12px",
                  color: "#FFFFFF",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
                }}
                itemStyle={{
                  color: "#FFFFFF",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
                labelStyle={{
                  color: "#94A3B8",
                  fontSize: "11px",
                  fontWeight: 600,
                }}
              />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
                dataKey="percentage"
              >
                {data.map((item, index) => (
                  <Cell key={`cell-${index}`} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
              {totalExpenseText}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 mt-0.5">
              Total Expenses
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 flex-1 w-full min-w-0 pr-1">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-600 font-medium truncate">
                  {item.name}
                </span>
              </div>
              <span className="font-bold text-slate-800 text-xs shrink-0">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
