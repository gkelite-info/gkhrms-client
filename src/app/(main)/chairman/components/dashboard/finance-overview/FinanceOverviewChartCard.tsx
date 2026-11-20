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
import {
  BarChart2,
  Search,
  Calendar,
  ChevronDown,
  Download,
} from "lucide-react"
import {
  FINANCE_OVERVIEW_MONTHLY_DATA,
  FinanceOverviewMonthlyData,
} from "./FinanceOverviewData"

interface CustomTooltipProps {
  active?: boolean
  payload?: { payload: FinanceOverviewMonthlyData }[]
  label?: string
}

function CustomFinanceTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-900 text-white rounded-xl px-3.5 py-2 shadow-xl text-xs flex flex-col gap-1 border border-slate-800">
        <span className="font-semibold text-slate-300">{data.monthFull || label}</span>
        <div className="flex items-center justify-between gap-4">
          <span className="text-[#A5B4FC]">Total Expense:</span>
          <span className="font-bold text-white">{data.expenseAmount}</span>
        </div>
      </div>
    )
  }
  return null
}

export default function FinanceOverviewChartCard() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState("Date Range")
  const [selectedYear, setSelectedYear] = useState("Year: 2024")

  const [dateOpen, setDateOpen] = useState(false)
  const [yearOpen, setYearOpen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)

  const dateRef = useRef<HTMLDivElement>(null)
  const yearRef = useRef<HTMLDivElement>(null)
  const exportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    function handleClickOutside(event: MouseEvent) {
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setDateOpen(false)
      }
      if (yearRef.current && !yearRef.current.contains(event.target as Node)) {
        setYearOpen(false)
      }
      if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
        setExportOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleExport = (type: "csv" | "excel") => {
    const csvRows = [
      ["Month", "Total Expense"],
      ...FINANCE_OVERVIEW_MONTHLY_DATA.map((d) => [d.monthFull, `"${d.expenseAmount}"`]),
    ]
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((r) => r.join(",")).join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `Chairman_Finance_Overview_2024.${type === "csv" ? "csv" : "xlsx"}`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setExportOpen(false)
  }

  const chartData = searchQuery
    ? FINANCE_OVERVIEW_MONTHLY_DATA.filter((d) =>
        d.month.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        d.monthFull.toLowerCase().includes(searchQuery.toLowerCase().trim())
      )
    : FINANCE_OVERVIEW_MONTHLY_DATA

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#5B50E5] flex items-center justify-center shrink-0">
            <BarChart2 className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            Total Expense
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by month or expense period"
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-2xs transition-all"
            />
          </div>

          <div ref={dateRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setDateOpen(!dateOpen)
                setYearOpen(false)
                setExportOpen(false)
              }}
              className="h-8 px-3 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 shadow-2xs flex items-center gap-1.5 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{dateRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {dateOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {["All Months", "Q1 (Jan-Mar)", "Q2 (Apr-Jun)", "Q3 (Jul-Sep)", "Q4 (Oct-Dec)"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setDateRange(opt)
                      setDateOpen(false)
                    }}
                    className={`w-full text-left px-3.5 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                      dateRange === opt ? "font-bold text-[#5B50E5]" : "text-slate-600"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div ref={yearRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setYearOpen(!yearOpen)
                setDateOpen(false)
                setExportOpen(false)
              }}
              className="h-8 px-3 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 shadow-2xs flex items-center gap-1.5 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{selectedYear}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {yearOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-32 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {["Year: 2024", "Year: 2023", "Year: 2022"].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => {
                      setSelectedYear(yr)
                      setYearOpen(false)
                    }}
                    className={`w-full text-left px-3.5 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                      selectedYear === yr ? "font-bold text-[#5B50E5]" : "text-slate-600"
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div ref={exportRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setExportOpen(!exportOpen)
                setDateOpen(false)
                setYearOpen(false)
              }}
              className="h-8 px-3 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 shadow-2xs flex items-center gap-1.5 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {exportOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-32 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                <button
                  type="button"
                  onClick={() => handleExport("csv")}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] text-slate-600"
                >
                  Export as CSV
                </button>
                <button
                  type="button"
                  onClick={() => handleExport("excel")}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] text-slate-600"
                >
                  Export as Excel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full h-72 pt-2">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 15, right: 15, left: -5, bottom: 5 }}
            >
              <defs>
                <linearGradient id="financeOverviewGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5B50E5" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#5B50E5" stopOpacity={0.01} />
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
                tick={{ fontSize: 11, fill: "#64748B" }}
                dy={10}
              />

              <YAxis
                domain={[0, 4]}
                ticks={[0, 1, 2, 3, 4]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#64748B" }}
                tickFormatter={(val) => (val === 0 ? "$0" : `$${val}M`)}
              />

              <Tooltip content={<CustomFinanceTooltip />} />

              <Area
                type="monotone"
                dataKey="expense"
                stroke="#5B50E5"
                strokeWidth={2.5}
                fill="url(#financeOverviewGrad)"
                dot={{
                  r: 4,
                  fill: "#FFFFFF",
                  stroke: "#5B50E5",
                  strokeWidth: 2.5,
                }}
                activeDot={{
                  r: 6,
                  fill: "#5B50E5",
                  stroke: "#EDE9FE",
                  strokeWidth: 3,
                }}
              />
            </AreaChart>
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
