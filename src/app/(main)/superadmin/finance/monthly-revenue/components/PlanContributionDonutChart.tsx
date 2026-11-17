"use client"

import { useState, useEffect } from "react"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts"
import { Clock } from "lucide-react"
import { PLAN_CONTRIBUTIONS } from "../monthlyRevenueData"

export default function PlanContributionDonutChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-lg bg-[#EEF0FD] flex items-center justify-center text-[#5B50E5]">
          <Clock className="w-4 h-4" />
        </div>
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          Plan-wise Contribution
        </h2>
      </div>

      <div className="relative w-full h-48 flex items-center justify-center">
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
                            {item.revenue} ({item.percentage})
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Pie
                  data={PLAN_CONTRIBUTIONS}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {PLAN_CONTRIBUTIONS.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-sm font-bold text-slate-900 tracking-tight">
                ₹ 51,80,000
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Total Revenue
              </span>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs text-slate-400 font-medium animate-pulse">
              Loading contribution...
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 mt-3 pt-3 border-t border-slate-100">
        {PLAN_CONTRIBUTIONS.map((plan) => (
          <div
            key={plan.name}
            className="flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2.5">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: plan.color }}
              />
              <div>
                <span className="font-semibold text-slate-800 block leading-tight">
                  {plan.name}
                </span>
                <span className="text-[11px] text-slate-400 font-medium block">
                  {plan.revenue}
                </span>
              </div>
            </div>

            <span className="font-bold text-slate-800 text-xs">
              {plan.percentage}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
