"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import { TrendingUp, ChevronDown, ArrowUpRight } from "lucide-react"

interface RevenuePoint {
  month: string
  revenue: number
  displayRevenue: string
  [key: string]: any
}

const REVENUE_DATA: RevenuePoint[] = [
  { month: "Jan", revenue: 4.8, displayRevenue: "₹ 4,80,000" },
  { month: "Feb", revenue: 9.6, displayRevenue: "₹ 9,60,000" },
  { month: "Mar", revenue: 8.5, displayRevenue: "₹ 8,50,000" },
  { month: "Apr", revenue: 10.4, displayRevenue: "₹ 10,40,000" },
  { month: "May", revenue: 11.2, displayRevenue: "₹ 11,20,000" },
  { month: "Jun", revenue: 10.8, displayRevenue: "₹ 10,80,000" },
  { month: "Jul", revenue: 14.5, displayRevenue: "₹ 14,50,000" },
  { month: "Aug", revenue: 13.9, displayRevenue: "₹ 13,90,000" },
  { month: "Sep", revenue: 17.6, displayRevenue: "₹ 17,60,000" },
  { month: "Oct", revenue: 24.8, displayRevenue: "₹ 24,80,000" },
]

export default function RevenueTrendChart() {
  const [mounted, setMounted] = useState(false)
  const [period, setPeriod] = useState("Monthly")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/superadmin/finance/monthly-revenue"
          className="flex items-center gap-2 group cursor-pointer"
          title="View detailed monthly revenue report"
        >
          <div className="w-7 h-7 rounded-lg bg-[#EEF0FD] flex items-center justify-center text-[#5B50E5] group-hover:bg-[#5B50E5] group-hover:text-white transition-all">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-[#5B50E5] transition-colors">
              Revenue Trend
            </h2>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#5B50E5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
        </Link>

        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setDropdownOpen(!dropdownOpen)
            }}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-lg text-xs font-semibold text-slate-600 transition-colors cursor-pointer"
          >
            <span>{period}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-28 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
              {["Monthly", "Quarterly", "Yearly"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setPeriod(opt)
                    setDropdownOpen(false)
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                    period === opt ? "font-bold text-[#5B50E5]" : "text-slate-600"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Link
        href="/superadmin/finance/monthly-revenue"
        className="relative w-full h-72 block cursor-pointer group"
        title="Click to view detailed monthly revenue report"
      >
        {mounted ? (
          <>
            <div className="absolute top-4 right-10 z-10 hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#5B50E5] text-white text-[11px] font-bold shadow-md shadow-indigo-100">
              ₹ 24,80,000
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={REVENUE_DATA}
                margin={{ top: 20, right: 25, left: -15, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revenueTrendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C5DFB" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#7C5DFB" stopOpacity={0.0} />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  dy={6}
                />
                <YAxis
                  domain={[0, 30]}
                  ticks={[0, 5, 10, 15, 20, 30]}
                  tickFormatter={(val) => (val === 0 ? "0" : `${val}L`)}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload as RevenuePoint
                      return (
                        <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs shadow-lg font-medium">
                          <span className="font-semibold text-indigo-300">
                            {label}:
                          </span>{" "}
                          {item.displayRevenue}
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#7C5DFB"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueTrendGradient)"
                  dot={{
                    r: 3,
                    fill: "#FFFFFF",
                    stroke: "#7C5DFB",
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 5,
                    fill: "#7C5DFB",
                    stroke: "#FFFFFF",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </>
        ) : (
          <div className="w-full h-full bg-slate-50/50 rounded-xl flex items-center justify-center">
            <span className="text-xs text-slate-400 font-medium animate-pulse">
              Loading revenue trend...
            </span>
          </div>
        )}
      </Link>
    </div>
  )
}
