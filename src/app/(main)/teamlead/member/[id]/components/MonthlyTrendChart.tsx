"use client"

import { useState, useMemo } from "react"
import { ChartBar } from "phosphor-react"
import { ReusableDropdown } from "@/components/reusableComponents"

export interface MonthlyTrendItem {
  month: string
  year: number
  percentage: number
  isActive?: boolean
}

interface MonthlyTrendChartProps {
  monthlyTrends?: MonthlyTrendItem[]
  trends?: MonthlyTrendItem[]
}

const defaultMonthlyTrends: MonthlyTrendItem[] = [
  { month: "Jan", year: 2025, percentage: 90 },
  { month: "Feb", year: 2025, percentage: 93 },
  { month: "Mar", year: 2025, percentage: 92 },
  { month: "Apr", year: 2025, percentage: 96 },
  { month: "May", year: 2025, percentage: 88 },
  { month: "Jun", year: 2025, percentage: 100 },
  { month: "Jul", year: 2025, percentage: 94 },
  { month: "Aug", year: 2025, percentage: 95, isActive: true },
  { month: "Sep", year: 2025, percentage: 91 },
  { month: "Oct", year: 2025, percentage: 97 },
  { month: "Nov", year: 2025, percentage: 93 },
  { month: "Dec", year: 2025, percentage: 96 },
]

export default function MonthlyTrendChart({
  monthlyTrends,
  trends,
}: MonthlyTrendChartProps) {
  const [trendRange, setTrendRange] = useState("Last 6 Months")

  const safeTrends = useMemo(() => {
    if (monthlyTrends && monthlyTrends.length > 0) return monthlyTrends
    if (trends && trends.length > 0) return trends
    return defaultMonthlyTrends
  }, [monthlyTrends, trends])

  const displayedTrends = useMemo(() => {
    if (trendRange === "Last 3 Months") {
      return safeTrends.slice(-3)
    }
    if (trendRange === "Last 12 Months") {
      return safeTrends
    }
    return safeTrends.slice(-6)
  }, [safeTrends, trendRange])

  return (
    <div className="lg:col-span-5 bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col justify-between h-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-50 flex-shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center flex-shrink-0">
            <ChartBar size={18} weight="bold" />
          </div>
          <h3 className="text-sm font-bold text-gray-900 truncate">
            Monthly Attendance Trend
          </h3>
        </div>

        <ReusableDropdown
          value={trendRange}
          options={["Last 3 Months", "Last 6 Months", "Last 12 Months"]}
          onChange={(val) => setTrendRange(String(val))}
          buttonClassName="py-1.5 px-3 text-xs rounded-xl border-gray-200 bg-white"
        />
      </div>

      <div className="flex-1 flex flex-col justify-end pt-3 pb-2 min-h-[300px] sm:min-h-[360px] min-w-0">
        <div className="relative flex items-stretch h-full w-full min-h-[260px] sm:min-h-[300px] min-w-0">
          <div className="w-10 sm:w-12 shrink-0 flex flex-col justify-between text-right pr-2.5 text-[10px] text-gray-400 font-semibold select-none pb-7 z-10 bg-white border-r border-gray-100">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>

          <div className="flex-1 min-w-0 overflow-x-auto table-scrollbar pl-4 sm:pl-6 pb-2 select-none">
            <div className="flex items-end justify-start gap-6 sm:gap-7 min-w-max h-full border-b border-gray-100 pb-1 pr-6">
              {displayedTrends.map((t) => {
                const heightPercent = Math.max(10, Math.min(100, t.percentage))
                const isHighlight = t.isActive

                return (
                  <div
                    key={`${t.month}-${t.year}`}
                    className="flex flex-col items-center justify-end h-full w-14 sm:w-16 shrink-0 group"
                  >
                    <span className="text-[10px] sm:text-[11px] font-bold text-gray-700 mb-1.5 select-none">
                      {t.percentage}%
                    </span>
                    <div className="w-10 sm:w-11 bg-gray-50 rounded-t-xl flex-1 flex items-end overflow-hidden border-t border-x border-gray-100/50 max-h-[220px]">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-xl transition-all duration-300 ${
                          isHighlight
                            ? "bg-[#5B50EC] shadow-xs"
                            : "bg-[#CAD1FD] hover:bg-[#B3BDFD]"
                        }`}
                      />
                    </div>
                    <div className="flex flex-col items-center mt-2 select-none">
                      <span className="text-xs font-bold text-gray-800">
                        {t.month}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {t.year}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 min-h-[46px] select-none">
        <span className="text-[11px] text-gray-400 font-medium">Period: {trendRange}</span>
        <span className="text-xs font-semibold text-gray-700">Avg. 94.6%</span>
      </div>
    </div>
  )
}
