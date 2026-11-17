"use client"

import { useState, useEffect } from "react"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts"
import { TrendingUp } from "lucide-react"

interface PlanRevenueItem {
  name: string
  amountFormatted: string
  value: number
  color: string
  [key: string]: any
}

const PLANS_DATA: PlanRevenueItem[] = [
  {
    name: "Enterprise Plan",
    amountFormatted: "₹12,40,000",
    value: 1240000,
    color: "#6C5CE7",
  },
  {
    name: "Professional Plan",
    amountFormatted: "₹7,20,000",
    value: 720000,
    color: "#0984E3",
  },
  {
    name: "Standard Plan",
    amountFormatted: "₹3,60,000",
    value: 360000,
    color: "#00CEC9",
  },
  {
    name: "Basic Plan",
    amountFormatted: "₹1,60,000",
    value: 160000,
    color: "#FDCB6E",
  },
]

export default function RevenueByPlanChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#EEF0FD] flex items-center justify-center text-[#5B50E5]">
            <TrendingUp className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            Revenue by Plan
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        <div className="sm:col-span-6 relative w-full h-56 flex items-center justify-center">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload as PlanRevenueItem
                      return (
                        <div className="bg-slate-900 text-white px-2.5 py-1 rounded-md text-xs shadow-md font-medium">
                          <span className="font-semibold text-indigo-300">
                            {item.name}:
                          </span>{" "}
                          {item.amountFormatted}
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Pie
                  data={PLANS_DATA}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={68}
                  paddingAngle={3}
                  stroke="#FFFFFF"
                  strokeWidth={2}
                >
                  {PLANS_DATA.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-28 h-28 rounded-full border-4 border-slate-100 animate-pulse" />
          )}

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs sm:text-sm font-extrabold text-slate-800 leading-none">
              ₹ 24,80,000
            </span>
            <span className="text-[10px] font-semibold text-slate-400 mt-0.5">
              Total Revenue
            </span>
          </div>
        </div>

        <div className="sm:col-span-6 flex flex-col gap-3">
          {PLANS_DATA.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-xs gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-slate-600 truncate">
                  {item.name}
                </span>
              </div>
              <span className="font-bold text-slate-800 shrink-0">
                {item.amountFormatted}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
