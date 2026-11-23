"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { CaretDown, ArrowUp } from "phosphor-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const chartData = [
  { month: "Jan", score: 2.0 },
  { month: "Feb", score: 2.8 },
  { month: "Mar", score: 2.3 },
  { month: "Apr", score: 3.3 },
  { month: "May", score: 3.3 },
  { month: "Jun", score: 3.5 },
  { month: "Jul", score: 3.4 },
  { month: "Aug", score: 2.8 },
  { month: "Sep", score: 3.5 },
  { month: "Oct", score: 3.9 },
  { month: "Nov", score: 4.5 },
  { month: "Dec", score: 4.6 },
]

interface CustomizedDotProps {
  cx?: number
  cy?: number
  value?: number
}

function CustomizedDot({ cx, cy, value }: CustomizedDotProps) {
  if (cx == null || cy == null) return null
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill="#FFFFFF"
        stroke="#8571EE"
        strokeWidth={2.5}
      />
      <text
        x={cx}
        y={cy - 9}
        textAnchor="middle"
        fontSize={10}
        fontWeight={600}
        fill="#4B5563"
      >
        {value}
      </text>
    </g>
  )
}

const timeOptions = ["Month", "Quarter", "Year"]

export default function PerformanceScoreChart() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [mounted, setMounted] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const parseTimeFromQuery = useCallback((query: string | null): string => {
    const q = (query || "").toLowerCase()
    if (q === "quarter") return "Quarter"
    if (q === "year") return "Year"
    return "Month"
  }, [])

  const initialTime = parseTimeFromQuery(searchParams?.get("time"))
  const [timeFilter, setTimeFilter] = useState(initialTime)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const q = parseTimeFromQuery(searchParams?.get("time"))
    setTimeFilter(q)
  }, [searchParams, parseTimeFromQuery])

  const handleTimeChange = (opt: string) => {
    setTimeFilter(opt)
    setDropdownOpen(false)

    const params = new URLSearchParams(searchParams ? Array.from(searchParams.entries()) : [])
    if (opt.toLowerCase() === "month") {
      params.delete("time")
    } else {
      params.set("time", opt.toLowerCase())
    }
    const query = params.toString()
    router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false })
  }

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-xs border border-gray-100 flex flex-col justify-between h-full min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 mb-3 sm:mb-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight">
            Performance Score by Month
          </h3>
          <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded-full">
            <ArrowUp size={11} weight="bold" />
            <span>10%</span>
            <span className="text-gray-500 font-normal hidden sm:inline">
              Compared to last month
            </span>
          </span>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="inline-flex items-center gap-1.5 bg-[#C5C1FF] hover:bg-[#b8b3ff] text-gray-800 text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-md transition-colors cursor-pointer select-none"
          >
            <span>{timeFilter}</span>
            <CaretDown
              size={12}
              weight="bold"
              className={`transition-transform duration-150 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 min-w-[100px]">
              {timeOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleTimeChange(opt)}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-purple-50 hover:text-[#8571EE] cursor-pointer ${
                    timeFilter === opt
                      ? "text-[#8571EE] font-bold bg-purple-50/50"
                      : "text-gray-700"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-52 sm:h-60 md:h-64 mt-2 min-w-0">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 18, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8571EE" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#8571EE" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#64748B" }}
                dy={6}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={[0, 5]}
                ticks={[1, 2, 3, 4, 5]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#64748B" }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs shadow-lg font-medium flex items-center gap-1.5">
                        <span className="font-bold text-purple-300">
                          {label}:
                        </span>
                        <span>{payload[0].value} / 5</span>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#8571EE"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#scoreGradient)"
                dot={<CustomizedDot />}
                activeDot={{
                  r: 6,
                  fill: "#8571EE",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full bg-gray-50/50 rounded-xl flex items-center justify-center">
            <span className="text-xs text-gray-400 font-medium">
              Loading chart...
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
