"use client"

import { useState, useEffect } from "react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
} from "recharts"
import { TrendingUp } from "lucide-react"
import { MONTHLY_REVENUE_RECORDS } from "../monthlyRevenueData"

interface CustomTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

function CustomBarTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-900 text-white rounded-xl px-3.5 py-2.5 shadow-xl text-xs flex flex-col gap-1 border border-slate-800">
        <span className="font-semibold text-slate-300">{label}</span>
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-400">Total Revenue:</span>
          <span className="font-bold text-emerald-400">{data.totalRevenue}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-400">Companies Paid:</span>
          <span className="font-semibold text-white">{data.companiesPaid}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-400">Net Revenue:</span>
          <span className="font-semibold text-indigo-300">{data.netRevenue}</span>
        </div>
      </div>
    )
  }
  return null
}

export default function MonthlyRevenueBarChart() {
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
            Revenue Trend
          </h2>
        </div>
      </div>

      <div className="w-full h-80 pt-2">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={MONTHLY_REVENUE_RECORDS}
              margin={{ top: 25, right: 15, left: -15, bottom: 0 }}
              barSize={28}
            >
              <defs>
                <linearGradient id="revenueBarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A49BFB" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#C4BCFC" stopOpacity={0.65} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#F1F5F9"
              />

              <XAxis
                dataKey="shortMonth"
                tickLine={false}
                axisLine={{ stroke: "#E2E8F0" }}
                tick={({ x, y, payload }) => (
                  <g transform={`translate(${x},${y})`}>
                    <text
                      x={0}
                      y={0}
                      dy={14}
                      textAnchor="middle"
                      fill="#64748B"
                      fontSize={11}
                      fontWeight={500}
                    >
                      {payload.value}
                    </text>
                    <text
                      x={0}
                      y={0}
                      dy={26}
                      textAnchor="middle"
                      fill="#94A3B8"
                      fontSize={9}
                      fontWeight={400}
                    >
                      2026
                    </text>
                  </g>
                )}
                interval={0}
              />

              <YAxis
                domain={[0, 80]}
                ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 500 }}
                tickFormatter={(value) => `₹ ${value}L`}
              />

              <Tooltip
                content={<CustomBarTooltip />}
                cursor={{ fill: "rgba(238, 240, 253, 0.4)", radius: 6 }}
              />

              <Bar
                dataKey="totalRevenueNum"
                fill="url(#revenueBarGradient)"
                radius={[6, 6, 0, 0]}
              >
                <LabelList
                  dataKey="barLabel"
                  position="top"
                  fill="#1E293B"
                  fontSize={10}
                  fontWeight={600}
                  offset={6}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs text-slate-400 font-medium animate-pulse">
              Loading revenue chart...
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
