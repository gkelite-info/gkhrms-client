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
  Cell,
} from "recharts"
import { User, ChevronDown } from "lucide-react"
import { HEADCOUNT_TREND_DATA, HeadcountPoint } from "./ChairmanDashboardData"

interface CustomTooltipProps {
  active?: boolean
  payload?: { payload: HeadcountPoint }[]
  label?: string
}

function CustomHeadcountTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-900 text-white rounded-xl px-3 py-2 shadow-lg text-xs border border-slate-800">
        <span className="font-semibold">{label}</span>
        <div className="text-emerald-400 font-bold mt-0.5">
          {data.headcount.toLocaleString()} Employees
        </div>
      </div>
    )
  }
  return null
}

interface ChairmanHeadcountTrendChartProps {
  onClick?: () => void
}

export default function ChairmanHeadcountTrendChart({
  onClick,
}: ChairmanHeadcountTrendChartProps = {}) {
  const [mounted, setMounted] = useState(false)
  const [period, setPeriod] = useState("Last 12 Months")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      onClick={onClick}
      className={`bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full ${
        onClick
          ? "cursor-pointer hover:border-[#5B50E5]/50 hover:shadow-sm transition-all"
          : ""
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5B50E5] flex items-center justify-center shrink-0">
            <User className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            Headcount Trend
          </h2>
        </div>

        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="h-7 px-2.5 bg-slate-50 border border-slate-200/80 rounded-lg text-xs font-medium text-slate-600 flex items-center gap-1.5 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span>{period}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
              {["Last 12 Months", "Last 6 Months", "This Year"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setPeriod(opt)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                    period === opt
                      ? "font-bold text-[#5B50E5]"
                      : "text-slate-600"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-56 pt-2">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={HEADCOUNT_TREND_DATA}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#F1F5F9"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#94A3B8" }}
                dy={6}
              />
              <YAxis
                domain={[0, 3000]}
                ticks={[0, 1000, 2000, 3000]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#94A3B8" }}
                tickFormatter={(val) => (val === 0 ? "0" : val.toLocaleString())}
              />
              <Tooltip content={<CustomHeadcountTooltip />} />
              <Bar dataKey="headcount" radius={[5, 5, 0, 0]}>
                {HEADCOUNT_TREND_DATA.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isPeak ? "#818CF8" : "#C7D2FE"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center">
            <span className="text-xs text-slate-400">Loading chart...</span>
          </div>
        )}
      </div>
    </div>
  )
}
