"use client"

import { useState, useEffect } from "react"
import {
  TrendingUp,
  BarChart2,
  IndianRupee,
  Clock,
  CreditCard,
  ChevronDown,
  Calendar,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  reportKpiCards,
  reportTrendData,
  reportRevenueBySourceData,
  expensesByCategoryData,
  monthlySummaryData,
} from "../data/mockFinanceData"

export default function ReportsView() {
  const [mounted, setMounted] = useState(false)
  const [reportView, setReportView] = useState("Revenue vs Expenses")
  const [department, setDepartment] = useState("All Departments")
  const [project, setProject] = useState("All Projects")
  const [category, setCategory] = useState("All Categories")
  const [dateRange, setDateRange] = useState("01 Oct 2026 - 31 Oct 2026")

  useEffect(() => {
    setMounted(true)
  }, [])

  const formatYAxis = (val: number) => {
    if (val === 0) return "0"
    return `${val / 100000}L`
  }

  const renderKpiIcon = (iconType: string) => {
    switch (iconType) {
      case "revenue":
        return (
          <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
            <TrendingUp className="w-4.5 h-4.5" />
          </div>
        )
      case "expenses":
        return (
          <div className="w-9 h-9 rounded-xl bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center shrink-0">
            <BarChart2 className="w-4.5 h-4.5" />
          </div>
        )
      case "profit":
        return (
          <div className="w-9 h-9 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
            <IndianRupee className="w-4.5 h-4.5" />
          </div>
        )
      case "receivables":
        return (
          <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
            <Clock className="w-4.5 h-4.5" />
          </div>
        )
      case "payments":
      default:
        return (
          <div className="w-9 h-9 rounded-xl bg-[#CCFBF1] text-[#0D9488] flex items-center justify-center shrink-0">
            <CreditCard className="w-4.5 h-4.5" />
          </div>
        )
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {reportKpiCards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-100 shadow-xs flex items-center gap-3 cursor-default"
          >
            {renderKpiIcon(card.iconType)}
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-slate-500 font-medium">
                {card.title}
              </span>
              <span className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug mt-0.5">
                {card.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium text-slate-500">
            Report View
          </label>
          <div className="relative">
            <select
              value={reportView}
              onChange={(e) => setReportView(e.target.value)}
              className="appearance-none bg-white border border-slate-200/90 rounded-xl px-3.5 pr-8 py-2 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#4F46E5] cursor-pointer min-w-[155px]"
            >
              <option value="Revenue vs Expenses">Revenue vs Expenses</option>
              <option value="Revenue Only">Revenue Only</option>
              <option value="Expenses Only">Expenses Only</option>
              <option value="Net Profit">Net Profit</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium text-slate-500">
            Department
          </label>
          <div className="relative">
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="appearance-none bg-white border border-slate-200/90 rounded-xl px-3.5 pr-8 py-2 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#4F46E5] cursor-pointer min-w-[140px]"
            >
              <option value="All Departments">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Operations">Operations</option>
              <option value="Finance">Finance</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium text-slate-500">
            Project
          </label>
          <div className="relative">
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="appearance-none bg-white border border-slate-200/90 rounded-xl px-3.5 pr-8 py-2 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#4F46E5] cursor-pointer min-w-[130px]"
            >
              <option value="All Projects">All Projects</option>
              <option value="ERP Integration">ERP Integration</option>
              <option value="Mobile App Redesign">Mobile App Redesign</option>
              <option value="Cloud Infrastructure">Cloud Infrastructure</option>
              <option value="Security Audit">Security Audit</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium text-slate-500">
            Category
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none bg-white border border-slate-200/90 rounded-xl px-3.5 pr-8 py-2 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#4F46E5] cursor-pointer min-w-[135px]"
            >
              <option value="All Categories">All Categories</option>
              <option value="Salaries & Benefits">Salaries & Benefits</option>
              <option value="Office & Admin">Office & Admin</option>
              <option value="Software & IT">Software & IT</option>
              <option value="Travel & Transport">Travel & Transport</option>
              <option value="Marketing">Marketing</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-1 sm:ml-auto">
          <label className="text-[11px] font-medium text-slate-500">
            Date Range
          </label>
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none bg-white border border-slate-200/90 rounded-xl pl-8 pr-8 py-2 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:border-[#4F46E5] cursor-pointer min-w-[190px]"
            >
              <option value="01 Oct 2026 - 31 Oct 2026">01 Oct 2026 - 31 Oct 2026</option>
              <option value="01 Sep 2026 - 30 Sep 2026">01 Sep 2026 - 30 Sep 2026</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last Quarter">Last Quarter</option>
              <option value="Year to Date">Year to Date</option>
              <option value="All Time">All Time</option>
            </select>
            <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between min-h-[360px]">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Revenue vs Expenses Trend
            </h3>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                Revenue
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#F43F5E]" />
                Expenses
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                Net Profit
              </span>
            </div>
          </div>

          <div className="w-full h-[280px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={reportTrendData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#F1F5F9"
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#94A3B8", fontSize: 11 }}
                  />
                  <YAxis
                    tickFormatter={formatYAxis}
                    domain={[0, 4000000]}
                    ticks={[0, 1000000, 2000000, 3000000, 4000000]}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#94A3B8", fontSize: 11 }}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1.5 border border-slate-800">
                            <span className="font-bold text-slate-200 block border-b border-slate-700/60 pb-1">
                              {data.month} 2026
                            </span>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-emerald-400 font-medium">Revenue:</span>
                              <span className="font-bold">{data.formattedRevenue}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-rose-400 font-medium">Expenses:</span>
                              <span className="font-bold">{data.formattedExpenses}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-sky-400 font-medium">Net Profit:</span>
                              <span className="font-bold">{data.formattedNetProfit}</span>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar
                    dataKey="revenue"
                    name="Revenue"
                    fill="#10B981"
                    radius={[3, 3, 0, 0]}
                    barSize={9}
                  />
                  <Bar
                    dataKey="expenses"
                    name="Expenses"
                    fill="#F43F5E"
                    radius={[3, 3, 0, 0]}
                    barSize={9}
                  />
                  <Line
                    type="monotone"
                    dataKey="netProfit"
                    name="Net Profit"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ r: 2.5, fill: "#3B82F6" }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full bg-slate-50/60 rounded-xl animate-pulse" />
            )}
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between min-h-[360px]">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-2">
            Revenue by Source
          </h3>

          <div className="relative w-44 h-44 mx-auto flex items-center justify-center shrink-0">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-slate-900 text-white px-2.5 py-1.5 rounded-xl text-xs shadow-lg">
                            <span className="font-medium">{data.name}: </span>
                            <span className="font-bold text-emerald-400">
                              {data.percentage}%
                            </span>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Pie
                    data={reportRevenueBySourceData}
                    dataKey="percentage"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={74}
                    paddingAngle={2}
                    stroke="#FFFFFF"
                    strokeWidth={2}
                  >
                    {reportRevenueBySourceData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-36 h-36 rounded-full border-4 border-slate-100 animate-pulse" />
            )}

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                ₹ 28,45,320
              </span>
              <span className="text-[10px] font-medium text-slate-400 mt-0.5">
                Total Revenue
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1 pt-3 border-t border-slate-50">
            {reportRevenueBySourceData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-xs py-0.5"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-600 text-[11px] truncate">
                    {item.name}
                  </span>
                </div>
                <span className="font-semibold text-slate-800 text-[11px] pl-2">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="mb-3">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Monthly Summary
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Month-wise revenue and expenses.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400">
                  <th className="py-2.5 font-semibold">Month</th>
                  <th className="py-2.5 font-semibold">Revenue (₹)</th>
                  <th className="py-2.5 font-semibold">Expenses (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs">
                {monthlySummaryData.map((row) => (
                  <tr
                    key={row.month}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-3 font-semibold text-slate-800">
                      {row.month}
                    </td>
                    <td className="py-3 font-medium text-slate-600">
                      {row.revenue}
                    </td>
                    <td className="py-3 font-medium text-slate-600">
                      {row.expenses}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between min-h-[360px]">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-2">
            Expenses by Category
          </h3>

          <div className="relative w-44 h-44 mx-auto flex items-center justify-center shrink-0">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-slate-900 text-white px-2.5 py-1.5 rounded-xl text-xs shadow-lg">
                            <span className="font-medium">{data.name}: </span>
                            <span className="font-bold text-rose-400">
                              {data.percentage}%
                            </span>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Pie
                    data={expensesByCategoryData}
                    dataKey="percentage"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={74}
                    paddingAngle={2}
                    stroke="#FFFFFF"
                    strokeWidth={2}
                  >
                    {expensesByCategoryData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-36 h-36 rounded-full border-4 border-slate-100 animate-pulse" />
            )}

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                ₹ 16,28,450
              </span>
              <span className="text-[10px] font-medium text-slate-400 mt-0.5">
                Total Expenses
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1 pt-3 border-t border-slate-50">
            {expensesByCategoryData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-xs py-0.5"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-600 text-[11px] truncate">
                    {item.name}
                  </span>
                </div>
                <span className="font-semibold text-slate-800 text-[11px] pl-2">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#ECFDF5]/80 border border-[#A7F3D0]/60 rounded-2xl p-4 flex items-center gap-3.5 shadow-2xs">
          <div className="w-8 h-8 rounded-full bg-[#D1FAE5] text-[#059669] flex items-center justify-center shrink-0">
            <ArrowUp className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">
              Revenue increased by 12.5%
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Revenue for Oct 2026 is ₹ 28,45,320, up from ₹ 25,28,600 in Sep 2026.
            </p>
          </div>
        </div>

        <div className="bg-[#FEF2F2]/80 border border-[#FECACA]/60 rounded-2xl p-4 flex items-center gap-3.5 shadow-2xs">
          <div className="w-8 h-8 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0">
            <ArrowDown className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">
              Expenses increased by 8.4%
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Expenses for Oct 2026 is ₹ 16,28,450, up from ₹ 15,01,200 in Sep 2026.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
