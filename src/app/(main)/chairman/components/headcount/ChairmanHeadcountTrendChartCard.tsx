"use client"

import { useState, useEffect, useRef } from "react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  LabelList,
} from "recharts"
import { BarChart2, ChevronDown } from "lucide-react"
import {
  HEADCOUNT_TREND_DATA,
  HeadcountTrendMonth,
} from "./ChairmanHeadcountData"

interface CustomTooltipProps {
  active?: boolean
  payload?: { payload: HeadcountTrendMonth }[]
  label?: string
}

function CustomHeadcountTooltip({
  active,
  payload,
  label,
}: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-900 text-white rounded-xl px-3.5 py-2 shadow-xl text-xs flex flex-col gap-1 border border-slate-800">
        <span className="font-semibold text-slate-300">{label}</span>
        <div className="flex items-center justify-between gap-4">
          <span className="text-[#A5B4FC]">Headcount:</span>
          <span className="font-bold text-white">
            {data.headcount.toLocaleString()}
          </span>
        </div>
      </div>
    )
  }
  return null
}

export default function ChairmanHeadcountTrendChartCard() {
  const [mounted, setMounted] = useState(false)
  const [period, setPeriod] = useState("Last 12 Months")
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#5B50E5] flex items-center justify-center shrink-0">
            <BarChart2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">
              Headcount Trend
            </h2>
            <p className="text-xs text-slate-500">
              Total employees over the last 12 months
            </p>
          </div>
        </div>

        <div ref={dropdownRef} className="relative self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="h-8 px-3 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 shadow-2xs flex items-center gap-1.5 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <span>{period}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
              {["Last 12 Months", "Last 6 Months", "This Year"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setPeriod(opt)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-3.5 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
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

      <div className="w-full h-80 pt-4">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={HEADCOUNT_TREND_DATA}
              margin={{ top: 25, right: 15, left: -10, bottom: 5 }}
              barSize={24}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#F1F5F9"
              />

              <XAxis
                dataKey="monthShort"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#94A3B8" }}
                dy={8}
              />

              <YAxis
                domain={[0, 3000]}
                ticks={[0, 500, 1000, 1500, 2000, 2500, 3000]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#94A3B8" }}
                tickFormatter={(val) => val.toLocaleString()}
              />

              <Tooltip content={<CustomHeadcountTooltip />} />

              <Bar
                dataKey="headcount"
                radius={[6, 6, 0, 0]}
              >
                <LabelList
                  dataKey="headcount"
                  position="top"
                  fill="#64748B"
                  fontSize={10}
                  formatter={(val: unknown) => Number(val).toLocaleString()}
                />
                {HEADCOUNT_TREND_DATA.map((entry) => (
                  <Cell
                    key={entry.month}
                    fill={entry.isCurrent ? "#4F46E5" : "#A5B4FC"}
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
