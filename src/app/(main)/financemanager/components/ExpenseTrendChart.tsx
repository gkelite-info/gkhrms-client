"use client"

import { useState, useEffect, useRef } from "react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"
import { Calendar, ChevronDown, ArrowUpRight } from "lucide-react"
import { MonthlyTrendData } from "../types"
import {
  expenseTrendLast12Months,
  expenseTrendLast6Months,
} from "../data/mockFinanceData"

interface ExpenseTrendChartProps {
  onOpenDetails?: () => void
}

export default function ExpenseTrendChart({ onOpenDetails }: ExpenseTrendChartProps) {
  const [mounted, setMounted] = useState(false)
  const [selectedRange, setSelectedRange] = useState<string>("Last 12 Months")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const currentData: MonthlyTrendData[] =
    selectedRange === "Last 6 Months"
      ? expenseTrendLast6Months
      : expenseTrendLast12Months

  const formatYAxis = (val: number) => {
    if (val === 0) return "0"
    return `${val / 1000}K`
  }

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100/80 shadow-xs flex flex-col justify-between h-[300px] xl:h-[320px] hover:border-[#4F46E5]/40 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div
          onClick={onOpenDetails}
          className="flex items-center gap-1.5 cursor-pointer group"
          role="button"
          tabIndex={0}
          title="Click to view detailed trend breakdown"
        >
          <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight group-hover:text-[#4F46E5] transition-colors">
            Expense Trend
          </h2>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#4F46E5] transition-colors" />
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setIsDropdownOpen((prev) => !prev)
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/70 rounded-xl text-xs font-medium text-slate-600 transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{selectedRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-36 bg-white border border-slate-100 rounded-xl shadow-lg py-1 z-20">
              {["Last 12 Months", "Last 6 Months"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedRange(option)
                    setIsDropdownOpen(false)
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                    selectedRange === option
                      ? "bg-indigo-50 text-[#4F46E5] font-semibold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className="w-full h-[225px] xl:h-[240px] cursor-pointer"
        onClick={onOpenDetails}
        title="Click to view full breakdown"
      >
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={currentData}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.16} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#F1F5F9"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                dy={6}
              />
              <YAxis
                domain={[0, 250000]}
                ticks={[0, 50000, 100000, 150000, 200000, 250000]}
                tickFormatter={formatYAxis}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94A3B8" }}
              />

              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const val = Number(payload[0].value)
                    return (
                      <div className="bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs shadow-xl">
                        <span className="text-slate-400 font-medium">
                          {label}:{" "}
                        </span>
                        <span className="font-bold text-indigo-300">
                          ${val.toLocaleString()}
                        </span>
                      </div>
                    )
                  }
                  return null
                }}
              />

              <Area
                type="monotone"
                dataKey="amount"
                stroke="#4F46E5"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#trendGradient)"
                dot={{
                  r: 3,
                  fill: "#4F46E5",
                  stroke: "#FFFFFF",
                  strokeWidth: 1.5,
                }}
                activeDot={{
                  r: 5,
                  fill: "#4F46E5",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full bg-slate-50/50 rounded-xl flex items-center justify-center">
            <span className="text-xs text-slate-400 font-medium animate-pulse">
              Loading trend...
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
