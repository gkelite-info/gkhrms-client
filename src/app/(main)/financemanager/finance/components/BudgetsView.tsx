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
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Search,
  Calendar,
  ChevronDown,
  BarChart2,
  PieChart as PieIcon,
  FileText,
  Info,
  TrendingUp,
  ArrowUpRight,
  BarChart3,
  Check,
} from "lucide-react"
import {
  budgetsKpiCards,
  monthlySpendBarData,
  budgetSpendBreakdown,
  monthlySpendSummaryTable,
  budgetKeyInsights,
} from "../data/mockFinanceData"

interface BudgetsViewProps {
  onTotalSpendClick?: () => void
}

export default function BudgetsView({ onTotalSpendClick }: BudgetsViewProps) {
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [dateRange, setDateRange] = useState("Last 12 Months")

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredMonthlySummary = monthlySpendSummaryTable.filter((row) => {
    return (
      row.month.toLowerCase().includes(search.toLowerCase()) ||
      row.totalSpend.toLowerCase().includes(search.toLowerCase())
    )
  })

  const renderTopKpiIcon = (iconType: string) => {
    switch (iconType) {
      case "currency":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center text-sm font-bold shrink-0">
            ₹
          </div>
        )
      case "calendar":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
        )
      case "bar-chart":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
            <BarChart3 className="w-4 h-4" />
          </div>
        )
      case "trend-up":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
        )
      case "trend-down":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#FEF9C3] text-[#CA8A04] flex items-center justify-center shrink-0">
            <ArrowUpRight className="w-4 h-4 rotate-90" />
          </div>
        )
      default:
        return null
    }
  }

  const renderInsightIcon = (type: string) => {
    switch (type) {
      case "highest":
        return (
          <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
        )
      case "increase":
        return (
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        )
      case "stable":
        return (
          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <BarChart2 className="w-3.5 h-3.5" />
          </div>
        )
      case "normal":
        return (
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
        )
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {budgetsKpiCards.map((card) => {
          return (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-4 border border-slate-100/80 shadow-xs flex flex-col justify-between min-h-[105px] cursor-default"
            >
              <div className="flex items-start gap-3">
                {renderTopKpiIcon(card.iconType)}
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[11px] font-medium text-slate-500 leading-snug break-normal hyphens-none">
                    {card.title}
                  </span>

                  {card.secondaryLabel ? (
                    <div className="flex items-center justify-between mt-1 pt-0.5">
                      <span className="text-xs font-semibold text-slate-700">
                        {card.secondaryLabel}
                      </span>
                      <span className="text-lg font-bold text-slate-900 tracking-tight leading-none">
                        {card.secondaryValue}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
                      {card.value}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-100/80 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by month or reference..."
            className="w-full h-10 pl-11 pr-4 bg-slate-50 text-xs text-slate-800 placeholder-slate-400 rounded-full border border-slate-200/80 focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium hidden md:inline">
              Category
            </span>
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none h-10 pl-3.5 pr-8 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all cursor-pointer"
              >
                <option value="All Categories">All Categories</option>
                <option value="Salaries & Benefits">Salaries & Benefits</option>
                <option value="Operations">Operations</option>
                <option value="Technology">Technology</option>
                <option value="Travel">Travel</option>
                <option value="Marketing">Marketing</option>
                <option value="Other">Other</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium hidden md:inline">
              Date Range
            </span>
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="appearance-none h-10 pl-8 pr-8 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all cursor-pointer"
              >
                <option value="Last 12 Months">Last 12 Months</option>
                <option value="Last 6 Months">Last 6 Months</option>
                <option value="This Year">This Year</option>
              </select>
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-slate-100/80 shadow-xs flex flex-col justify-between h-[360px]">
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 className="w-4 h-4 text-[#4F46E5]" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Monthly Spend Trend
            </h2>
          </div>

          <div className="w-full h-[290px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlySpendBarData}
                  margin={{ top: 22, right: 10, left: -10, bottom: 0 }}
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
                    domain={[0, 1200]}
                    ticks={[0, 300, 600, 900, 1200]}
                    tickFormatter={(val) => {
                      if (val === 0) return "$0"
                      if (val === 1200) return "$1.2M"
                      return `$${val}K`
                    }}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#94A3B8" }}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs shadow-xl">
                            <span className="text-slate-400 font-medium">
                              {label}:{" "}
                            </span>
                            <span className="font-bold text-indigo-300">
                              ${payload[0].value}K
                            </span>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar
                    dataKey="spend"
                    fill="#C7D2FE"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={32}
                    label={{
                      position: "top",
                      formatter: (val: string | number | unknown) => `$${val}K`,
                      fontSize: 9,
                      fill: "#94A3B8",
                      dy: -2,
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full bg-slate-50/50 rounded-xl flex items-center justify-center">
                <span className="text-xs text-slate-400 font-medium animate-pulse">
                  Loading spend trend...
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-100/80 shadow-xs flex flex-col justify-between h-[360px]">
          <div className="flex items-center gap-2 mb-2">
            <PieIcon className="w-4 h-4 text-[#4F46E5]" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Spend Breakdown
            </h2>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-slate-900 text-white px-2.5 py-1.5 rounded-xl text-xs shadow-lg">
                              <span className="font-semibold">{data.name}: </span>
                              <span className="text-indigo-300 font-bold">
                                {data.percentage}%
                              </span>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Pie
                      data={budgetSpendBreakdown}
                      dataKey="percentage"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={68}
                      paddingAngle={2}
                      stroke="#FFFFFF"
                      strokeWidth={2}
                    >
                      {budgetSpendBreakdown.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-slate-100 animate-pulse" />
              )}

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-base font-extrabold text-slate-900 leading-none">
                  $8.2M
                </span>
                <span className="text-[10px] font-medium text-slate-400 mt-0.5">
                  Total Spend
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-1.5 mt-3 pt-2 border-t border-slate-50">
              {budgetSpendBreakdown.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-xs py-0.5"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-slate-600 whitespace-nowrap text-[11px]">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-bold text-slate-800 text-[11px] pl-2">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 sm:p-6 border border-slate-100/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#4F46E5]" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Month-wise Spend Summary
            </h2>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 tracking-wider">
                  <th className="pb-3 pt-1">Month</th>
                  <th className="pb-3 pt-1">Total Spend</th>
                  <th className="pb-3 pt-1">Salaries & Benefits</th>
                  <th className="pb-3 pt-1">Operations</th>
                  <th className="pb-3 pt-1">Technology</th>
                  <th className="pb-3 pt-1">Travel</th>
                  <th className="pb-3 pt-1">Marketing</th>
                  <th className="pb-3 pt-1">Other</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs">
                {filteredMonthlySummary.map((row) => (
                  <tr
                    key={row.month}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-3 text-slate-700 font-semibold whitespace-nowrap">
                      {row.month}
                    </td>
                    <td className="py-3 text-slate-900 font-bold whitespace-nowrap">
                      {row.totalSpend}
                    </td>
                    <td className="py-3 text-slate-600 whitespace-nowrap">
                      {row.salaries}
                    </td>
                    <td className="py-3 text-slate-600 whitespace-nowrap">
                      {row.operations}
                    </td>
                    <td className="py-3 text-slate-600 whitespace-nowrap">
                      {row.technology}
                    </td>
                    <td className="py-3 text-slate-600 whitespace-nowrap">
                      {row.travel}
                    </td>
                    <td className="py-3 text-slate-600 whitespace-nowrap">
                      {row.marketing}
                    </td>
                    <td className="py-3 text-slate-600 whitespace-nowrap">
                      {row.other}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-100/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-4 h-4 text-[#4F46E5]" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Key Insights
            </h2>
          </div>

          <div className="space-y-3 flex-1 flex flex-col justify-around">
            {budgetKeyInsights.map((insight) => (
              <div
                key={insight.id}
                className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50/60 border border-slate-100/80"
              >
                {renderInsightIcon(insight.type)}
                <p className="text-xs text-slate-700 leading-snug font-normal mt-0.5">
                  {insight.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
