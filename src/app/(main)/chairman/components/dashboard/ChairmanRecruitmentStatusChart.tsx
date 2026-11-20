"use client"

import { useState, useEffect } from "react"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"
import { UserPlus } from "lucide-react"
import { RECRUITMENT_SLICES } from "./ChairmanDashboardData"

export default function ChairmanRecruitmentStatusChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5B50E5] flex items-center justify-center shrink-0">
          <UserPlus className="w-4 h-4" />
        </div>
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          Recruitment Status
        </h2>
      </div>

      <div className="relative w-full h-40 flex items-center justify-center my-1">
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
                            {item.count} Positions ({item.percentage}%)
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Pie
                  data={RECRUITMENT_SLICES}
                  cx="50%"
                  cy="50%"
                  innerRadius={46}
                  outerRadius={62}
                  paddingAngle={3}
                  dataKey="percentage"
                  strokeWidth={0}
                >
                  {RECRUITMENT_SLICES.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-xl font-bold text-slate-900 leading-tight">
                56
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Open Positions
              </span>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center">
            <span className="text-xs text-slate-400">Loading chart...</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] pt-1 border-t border-slate-100">
        {RECRUITMENT_SLICES.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-1 text-slate-600">
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="truncate">{item.name}</span>
            </div>
            <span className="font-bold text-slate-800 shrink-0">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
