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
  X,
  Calendar,
  ChevronDown,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  TrendingUp,
  ArrowLeft,
} from "lucide-react"
import {
  expenseTrendStackedBarData,
  expenseTrendCategoryDonut,
  monthWiseExpenseBreakdownTable,
} from "../data/mockFinanceData"

interface ExpenseTrendDetailsViewProps {
  onBack: () => void
}

export default function ExpenseTrendDetailsView({
  onBack,
}: ExpenseTrendDetailsViewProps) {
  const [mounted, setMounted] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [departmentFilter, setDepartmentFilter] = useState("All Departments")
  const [projectFilter, setProjectFilter] = useState("All Projects")
  const [expenseTypeFilter, setExpenseTypeFilter] = useState("All Types")
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("All Status")
  const [activeView, setActiveView] = useState<"Monthly" | "Category-wise">("Monthly")

  useEffect(() => {
    setMounted(true)
  }, [])

  const exportExcel = () => {
    const headers =
      "Month,Total Expenses (₹),Salaries & Benefits (₹),Operations (₹),Technology (₹),Travel (₹),Marketing (₹),Other (₹)\n"
    const rows = monthWiseExpenseBreakdownTable
      .map(
        (r) =>
          `"${r.month}","${r.totalExpenses}","${r.salaries}","${r.operations}","${r.technology}","${r.travel}","${r.marketing}","${r.other}"`
      )
      .join("\n")

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `Expense_Trend_Breakdown_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-100/80 shadow-xs flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-1.5 -ml-1.5 mt-0.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Back to Finance Overview"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Expense Trend Details
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              View month-wise expense trends with category and department/project breakdown.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            type="button"
            className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Jan 2026 - Dec 2026</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Back to Finance Overview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-slate-400">
            Category
          </label>
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full appearance-none h-9 pl-3 pr-8 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#4F46E5] focus:bg-white cursor-pointer"
            >
              <option value="All Categories">All Categories</option>
              <option value="Salaries & Benefits">Salaries & Benefits</option>
              <option value="Operations">Operations</option>
              <option value="Technology">Technology</option>
              <option value="Travel">Travel</option>
              <option value="Marketing">Marketing</option>
              <option value="Others">Others</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-slate-400">
            Department
          </label>
          <div className="relative">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full appearance-none h-9 pl-3 pr-8 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#4F46E5] focus:bg-white cursor-pointer"
            >
              <option value="All Departments">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Product Design">Product Design</option>
              <option value="Sales & Growth">Sales & Growth</option>
              <option value="HR Operations">HR Operations</option>
              <option value="Finance Ops">Finance Ops</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-slate-400">
            Project
          </label>
          <div className="relative">
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="w-full appearance-none h-9 pl-3 pr-8 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#4F46E5] focus:bg-white cursor-pointer"
            >
              <option value="All Projects">All Projects</option>
              <option value="ERP Platform">ERP Platform</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Cloud Migration">Cloud Migration</option>
              <option value="AI Engine">AI Engine</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-slate-400">
            Expense Type
          </label>
          <div className="relative">
            <select
              value={expenseTypeFilter}
              onChange={(e) => setExpenseTypeFilter(e.target.value)}
              className="w-full appearance-none h-9 pl-3 pr-8 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#4F46E5] focus:bg-white cursor-pointer"
            >
              <option value="All Types">All Types</option>
              <option value="Employee">Employee</option>
              <option value="Company Direct">Company Direct</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-slate-400">
            Payment Status
          </label>
          <div className="relative">
            <select
              value={paymentStatusFilter}
              onChange={(e) => setPaymentStatusFilter(e.target.value)}
              className="w-full appearance-none h-9 pl-3 pr-8 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#4F46E5] focus:bg-white cursor-pointer"
            >
              <option value="All Status">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-slate-50/60 rounded-2xl p-4 border border-slate-100 flex flex-col justify-between min-h-[110px]">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center text-sm font-bold shrink-0">
              ₹
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-medium text-slate-400">
                Total Expenses
              </span>
              <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5 whitespace-nowrap">
                ₹ 2,18,45,300
              </span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100/60 flex items-center gap-1 text-xs text-emerald-600 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>8.4%</span>
            <span className="text-slate-400 font-normal text-[11px]">vs previous period</span>
          </div>
        </div>

        <div className="bg-slate-50/60 rounded-2xl p-4 border border-slate-100 flex flex-col justify-between min-h-[110px]">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-medium text-slate-400">
                Monthly Average
              </span>
              <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5 whitespace-nowrap">
                ₹ 18,20,442
              </span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100/60 flex items-center gap-1 text-xs text-emerald-600 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>6.2%</span>
            <span className="text-slate-400 font-normal text-[11px]">vs previous period</span>
          </div>
        </div>

        <div className="bg-slate-50/60 rounded-2xl p-4 border border-slate-100 flex flex-col justify-between min-h-[110px]">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-medium text-slate-400">
                Highest Month
              </span>
              <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5 whitespace-nowrap">
                ₹ 24,85,200
              </span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100/60 text-[11px] text-slate-400 font-medium">
            Oct 2026
          </div>
        </div>

        <div className="bg-slate-50/60 rounded-2xl p-4 border border-slate-100 flex flex-col justify-between min-h-[110px]">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#CCFBF1] text-[#0D9488] flex items-center justify-center shrink-0">
              <ArrowDownRight className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-medium text-slate-400">
                Lowest Month
              </span>
              <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5 whitespace-nowrap">
                ₹ 12,48,900
              </span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100/60 text-[11px] text-slate-400 font-medium">
            Feb 2026
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex flex-col justify-between h-[360px] overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Month-wise Expense Trend
            </h3>

            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] sm:text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                <span>Salaries & Benefits</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
                <span>Operations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" />
                <span>Technology</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <span>Travel</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                <span>Marketing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#64748B]" />
                <span>Others</span>
              </div>
            </div>
          </div>

          <div className="w-full h-[285px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={expenseTrendStackedBarData}
                  margin={{ top: 15, right: 10, left: -10, bottom: 0 }}
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
                    domain={[0, 30]}
                    ticks={[0, 5, 10, 15, 20, 25, 30]}
                    tickFormatter={(val) => `${val}L`}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#94A3B8" }}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-900 text-white p-2.5 rounded-xl text-xs shadow-xl space-y-1">
                            <span className="font-bold text-slate-300 block border-b border-slate-700 pb-1 mb-1">
                              {label} 2026
                            </span>
                            {payload.map((entry) => (
                              <div
                                key={entry.dataKey as string}
                                className="flex items-center justify-between gap-3 text-[11px]"
                              >
                                <span style={{ color: entry.color }}>
                                  {entry.name}:
                                </span>
                                <span className="font-semibold">
                                  ₹ {entry.value}L
                                </span>
                              </div>
                            ))}
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="salaries" name="Salaries" stackId="exp" fill="#3B82F6" maxBarSize={20} />
                  <Bar dataKey="operations" name="Operations" stackId="exp" fill="#F97316" maxBarSize={20} />
                  <Bar dataKey="technology" name="Technology" stackId="exp" fill="#EAB308" maxBarSize={20} />
                  <Bar dataKey="travel" name="Travel" stackId="exp" fill="#10B981" maxBarSize={20} />
                  <Bar dataKey="marketing" name="Marketing" stackId="exp" fill="#EF4444" maxBarSize={20} />
                  <Bar dataKey="others" name="Others" stackId="exp" fill="#64748B" radius={[4, 4, 0, 0]} maxBarSize={20} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full bg-slate-50/50 rounded-xl flex items-center justify-center">
                <span className="text-xs text-slate-400 font-medium animate-pulse">
                  Loading breakdown...
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex flex-col justify-between h-[360px] overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Expense by Category
            </h3>
          </div>

          <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 min-w-0">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center shrink-0">
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
                                {data.percentage}% ({data.amount})
                              </span>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Pie
                      data={expenseTrendCategoryDonut}
                      dataKey="percentage"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={38}
                      outerRadius={56}
                      paddingAngle={2}
                      stroke="#FFFFFF"
                      strokeWidth={2}
                    >
                      {expenseTrendCategoryDonut.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-28 h-28 rounded-full border-4 border-slate-100 animate-pulse" />
              )}

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 leading-none">
                  ₹ 2,18,45,300
                </span>
                <span className="text-[9px] sm:text-[10px] font-medium text-slate-400 mt-1">
                  Total Expenses
                </span>
              </div>
            </div>

            <div className="w-full min-w-0 flex-1 flex flex-col justify-center gap-1.5 pl-0 sm:pl-2">
              {expenseTrendCategoryDonut.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-xs py-0.5 min-w-0"
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-slate-600 truncate text-[11px] sm:text-xs">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <span className="font-bold text-slate-800 text-[11px] sm:text-xs min-w-[28px] text-right">
                      {item.percentage}%
                    </span>
                    <span className="text-[11px] sm:text-xs text-slate-500 font-medium whitespace-nowrap text-right min-w-[72px]">
                      {item.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Month-wise Expense Breakdown
          </h3>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span>View:</span>
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg">
                <button
                  type="button"
                  onClick={() => setActiveView("Monthly")}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    activeView === "Monthly"
                      ? "bg-[#4F46E5] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView("Category-wise")}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    activeView === "Category-wise"
                      ? "bg-[#4F46E5] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Category-wise
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={exportExcel}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Excel</span>
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pt-1">Month</th>
                <th className="pb-3 pt-1">Total Expenses (₹)</th>
                <th className="pb-3 pt-1">Salaries & Benefits (₹)</th>
                <th className="pb-3 pt-1">Operations (₹)</th>
                <th className="pb-3 pt-1">Technology (₹)</th>
                <th className="pb-3 pt-1">Travel (₹)</th>
                <th className="pb-3 pt-1">Marketing (₹)</th>
                <th className="pb-3 pt-1">Other (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {monthWiseExpenseBreakdownTable.map((row) => (
                <tr
                  key={row.month}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  <td className="py-3 text-slate-700 font-semibold whitespace-nowrap">
                    {row.month}
                  </td>
                  <td className="py-3 text-slate-900 font-bold whitespace-nowrap">
                    {row.totalExpenses}
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
    </div>
  )
}

