"use client"

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"
import { ReportCategoryExpense } from "../types"

interface AccountantReportExpenseCategoriesDonutProps {
  categories: ReportCategoryExpense[]
  totalExpenseText: string
}

export default function AccountantReportExpenseCategoriesDonut({
  categories,
  totalExpenseText,
}: AccountantReportExpenseCategoriesDonutProps) {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-xs flex flex-col justify-between h-full">
      <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight mb-4">
        Expense Categories
      </h2>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 flex-1 min-h-[280px]">
        <div className="relative w-44 h-44 sm:w-48 sm:h-48 shrink-0 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                formatter={(val: any, name: any) => [
                  `₹ ${Number(val).toLocaleString("en-IN")}`,
                  name,
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
                data={categories as any}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={76}
                paddingAngle={2}
                dataKey="numericAmount"
              >
                {categories.map((cat, index) => (
                  <Cell key={`cell-${index}`} fill={cat.color} />
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

        <div className="flex flex-col justify-center gap-3 flex-1 w-full min-w-0 pr-1">
          {categories.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-600 font-medium truncate">
                  {item.name}
                </span>
              </div>
              <span className="font-bold text-slate-900 tracking-tight text-xs shrink-0">
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

