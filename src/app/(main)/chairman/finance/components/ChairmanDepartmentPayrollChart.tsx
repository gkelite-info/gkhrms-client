"use client"

import { useState, useEffect } from "react"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts"
import { Layers } from "lucide-react"
import {
  DEPARTMENT_PAYROLL_SLICES,
  DepartmentPayrollSlice,
} from "./ChairmanPayrollData"

interface CustomTooltipProps {
  active?: boolean
  payload?: { payload: DepartmentPayrollSlice }[]
}

function CustomDepartmentTooltip({ active, payload }: CustomTooltipProps) {
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

export default function ChairmanDepartmentPayrollChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const topSlices = DEPARTMENT_PAYROLL_SLICES.slice(0, 3)

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5B50E5] flex items-center justify-center shrink-0">
          <Layers className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            Department-wise Payroll Cost
          </h2>
          <p className="text-[11px] text-slate-400">
            Share of total payroll cost (TTM).
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 py-1">
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomDepartmentTooltip />} />
                <Pie
                  data={DEPARTMENT_PAYROLL_SLICES}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="percentage"
                  strokeWidth={0}
                >
                  {DEPARTMENT_PAYROLL_SLICES.map((entry) => (
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
            <span className="text-xs font-bold text-slate-900 leading-tight">
              $12.84M
            </span>
            <span className="text-[9px] text-slate-400 font-medium leading-tight mt-0.5">
              Total
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 w-full mt-3">
          {topSlices.map((slice) => (
            <div
              key={slice.name}
              className="flex items-center justify-between text-xs gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-xs shrink-0"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="text-slate-600 truncate text-[11px] font-medium">
                  {slice.name}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <span className="text-slate-400 text-[10px] font-medium">
                  {slice.percentage}%
                </span>
                <span className="font-bold text-slate-800 text-[11px] w-14 text-right">
                  {slice.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
