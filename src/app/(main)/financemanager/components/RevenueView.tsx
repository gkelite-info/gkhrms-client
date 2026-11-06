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
import { Search, Calendar, ChevronDown, RotateCcw } from "lucide-react"
import {
  revenueKpiCardsImage1,
  monthlyRevenueTrendData,
  revenueBySourceData,
  revenueStatusData,
  mockRevenueDetailedRecords,
} from "../data/mockFinanceData"
import { RevenueDetailedRecord, RevenueStatusType } from "../types"
import KpiCardsGrid from "./KpiCardsGrid"

interface RevenueViewProps {
  onTotalRevenueClick?: () => void
}

export default function RevenueView({ onTotalRevenueClick }: RevenueViewProps) {
  const [mounted, setMounted] = useState(false)
  const [sourceFilter, setSourceFilter] = useState("All Sources")
  const [clientFilter, setClientFilter] = useState("All Clients")
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [searchTable, setSearchTable] = useState("")
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [trendRange, setTrendRange] = useState("Last 12 Months")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCardClick = (cardId: string) => {
    if (cardId === "rev-total-revenue" && onTotalRevenueClick) {
      onTotalRevenueClick()
    }
  }

  const handleResetFilters = () => {
    setSourceFilter("All Sources")
    setClientFilter("All Clients")
    setCategoryFilter("All Categories")
    setStatusFilter("All Status")
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(mockRevenueDetailedRecords.map((r) => r.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const filteredRecords = mockRevenueDetailedRecords.filter((record) => {
    const matchesSource =
      sourceFilter === "All Sources" || record.source === sourceFilter
    const matchesClient =
      clientFilter === "All Clients" || record.clientProject === clientFilter
    const matchesCategory =
      categoryFilter === "All Categories" || record.category === categoryFilter
    const matchesStatus =
      statusFilter === "All Status" || record.status === statusFilter

    const q = searchTable.toLowerCase()
    const matchesSearch =
      !q ||
      record.invoiceId.toLowerCase().includes(q) ||
      record.clientProject.toLowerCase().includes(q) ||
      record.category.toLowerCase().includes(q) ||
      record.source.toLowerCase().includes(q)

    return matchesSource && matchesClient && matchesCategory && matchesStatus && matchesSearch
  })

  const renderStatusBadge = (status: RevenueStatusType) => {
    switch (status) {
      case "Received":
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]/60">
            Received
          </span>
        )
      case "Pending":
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD]">
            Pending
          </span>
        )
      case "Overdue":
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]">
            Overdue
          </span>
        )
      case "Partially Paid":
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">
            Partially Paid
          </span>
        )
    }
  }

  const renderSourceBadge = (source: RevenueDetailedRecord["source"]) => {
    switch (source) {
      case "Client Project":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
            Client Project
          </span>
        )
      case "Service Fee":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FAF5FF] text-[#9333EA] border border-[#E9D5FF]">
            Service Fee
          </span>
        )
      case "Product Sales":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5]">
            Product Sales
          </span>
        )
      case "Subscription":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FEFCE8] text-[#CA8A04] border border-[#FEF08A]">
            Subscription
          </span>
        )
      case "Training":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FDF2F8] text-[#DB2777] border border-[#FBCFE8]">
            Training
          </span>
        )
    }
  }

  return (
    <div className="space-y-5">
      <KpiCardsGrid cards={revenueKpiCardsImage1} onCardClick={handleCardClick} />

      <div className="flex flex-col xl:flex-row items-stretch xl:items-end justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-100/80 shadow-xs">
        <div className="flex flex-wrap items-end gap-3 flex-1">
          <div className="flex flex-col gap-1 min-w-[125px]">
            <label className="text-[11px] font-semibold text-slate-400">
              Source
            </label>
            <div className="relative">
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="w-full appearance-none h-10 pl-3 pr-8 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all cursor-pointer"
              >
                <option value="All Sources">All Sources</option>
                <option value="Client Project">Client Project</option>
                <option value="Service Fee">Service Fee</option>
                <option value="Product Sales">Product Sales</option>
                <option value="Subscription">Subscription</option>
                <option value="Training">Training</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1 min-w-[130px]">
            <label className="text-[11px] font-semibold text-slate-400">
              Client / Project
            </label>
            <div className="relative">
              <select
                value={clientFilter}
                onChange={(e) => setClientFilter(e.target.value)}
                className="w-full appearance-none h-10 pl-3 pr-8 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all cursor-pointer"
              >
                <option value="All Clients">All Clients</option>
                <option value="ABC Technologies">ABC Technologies</option>
                <option value="XYZ Solutions">XYZ Solutions</option>
                <option value="Prime Learning">Prime Learning</option>
                <option value="Global Services Ltd">Global Services Ltd</option>
                <option value="HealthCare Systems">HealthCare Systems</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1 min-w-[130px]">
            <label className="text-[11px] font-semibold text-slate-400">
              Category
            </label>
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full appearance-none h-10 pl-3 pr-8 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all cursor-pointer"
              >
                <option value="All Categories">All Categories</option>
                <option value="Web Development">Web Development</option>
                <option value="IT Consulting">IT Consulting</option>
                <option value="Software License">Software License</option>
                <option value="Annual Subscription">Annual Subscription</option>
                <option value="Corporate Training">Corporate Training</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1 min-w-[120px]">
            <label className="text-[11px] font-semibold text-slate-400">
              Status
            </label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none h-10 pl-3 pr-8 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all cursor-pointer"
              >
                <option value="All Status">All Status</option>
                <option value="Received">Received</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
                <option value="Partially Paid">Partially Paid</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1 min-w-[180px]">
            <label className="text-[11px] font-semibold text-slate-400">
              Period
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-full h-10 pl-8 pr-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 flex items-center justify-between cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
                <span className="whitespace-nowrap text-xs">01 Oct 2026 - 31 Oct 2026</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1 shrink-0" />
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleResetFilters}
          className="h-10 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-600 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 mt-2 xl:mt-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-100/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Monthly Revenue Trend
          </h2>

          <div className="flex items-center gap-4 text-xs">
            <div className="relative">
              <select
                value={trendRange}
                onChange={(e) => setTrendRange(e.target.value)}
                className="appearance-none h-8 pl-3 pr-7 bg-slate-50 border border-slate-200/80 rounded-lg text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="Last 12 Months">Last 12 Months</option>
                <option value="Last 6 Months">Last 6 Months</option>
                <option value="This Year">This Year</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className="text-slate-600 font-medium text-[11px]">
                Revenue Received
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A78BFA]" />
              <span className="text-slate-600 font-medium text-[11px]">
                Pending Revenue
              </span>
            </div>
          </div>
        </div>

        <div className="w-full h-[270px]">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyRevenueTrendData}
                margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
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
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
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
                        <div className="bg-slate-900 text-white px-3 py-2 rounded-xl text-xs shadow-xl space-y-1">
                          <span className="text-slate-400 font-semibold block">
                            {label} 2026
                          </span>
                          <span className="text-emerald-300 block">
                            Received: ₹ {payload[0]?.value}L
                          </span>
                          <span className="text-indigo-300 block">
                            Pending: ₹ {payload[1]?.value}L
                          </span>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar
                  dataKey="received"
                  stackId="revenueStack"
                  fill="#10B981"
                  maxBarSize={28}
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="pending"
                  stackId="revenueStack"
                  fill="#A78BFA"
                  maxBarSize={28}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full bg-slate-50/50 rounded-xl flex items-center justify-center">
              <span className="text-xs text-slate-400 font-medium animate-pulse">
                Loading revenue trend...
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100/80 shadow-xs flex flex-col justify-between h-[340px]">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight mb-2">
            Revenue by Source
          </h2>

          <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center shrink-0">
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
                      data={revenueBySourceData}
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
                      {revenueBySourceData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-slate-100 animate-pulse" />
              )}

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-sm sm:text-base font-extrabold text-slate-900 leading-none">
                  ₹ 28,45,320
                </span>
                <span className="text-[10px] font-medium text-slate-400 mt-1">
                  Total Revenue
                </span>
              </div>
            </div>

            <div className="w-full sm:flex-1 flex flex-col justify-center gap-2 pl-0 sm:pl-2">
              {revenueBySourceData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-xs py-0.5"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-slate-600 whitespace-nowrap text-[11px] sm:text-xs">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-bold text-slate-800 text-[11px] sm:text-xs pl-2">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100/80 shadow-xs flex flex-col justify-between h-[340px]">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight mb-2">
            Revenue Status
          </h2>

          <div className="space-y-4 flex-1 flex flex-col justify-around">
            {revenueStatusData.map((item) => (
              <div key={item.status} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">
                    {item.status}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900">
                      {item.amount}
                    </span>
                    <span className="text-slate-400 font-medium text-[11px] w-8 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                </div>

                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Revenue Records ({filteredRecords.length})
          </h2>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTable}
              onChange={(e) => setSearchTable(e.target.value)}
              placeholder="Search by Invoice ID, client, project..."
              className="w-full h-9 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pt-1 w-8">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === filteredRecords.length &&
                      filteredRecords.length > 0
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5] cursor-pointer"
                  />
                </th>
                <th className="pb-3 pt-1 font-semibold">Invoice ID</th>
                <th className="pb-3 pt-1 font-semibold">Source</th>
                <th className="pb-3 pt-1 font-semibold">Client / Project</th>
                <th className="pb-3 pt-1 font-semibold">Category</th>
                <th className="pb-3 pt-1 font-semibold">Amount (₹)</th>
                <th className="pb-3 pt-1 font-semibold">Invoice Date</th>
                <th className="pb-3 pt-1 font-semibold">Received Date</th>
                <th className="pb-3 pt-1 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {filteredRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(r.id)}
                      onChange={() => handleSelectOne(r.id)}
                      className="rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5] cursor-pointer"
                    />
                  </td>
                  <td className="py-3.5 font-medium text-slate-700 whitespace-nowrap">
                    {r.invoiceId}
                  </td>
                  <td className="py-3.5 whitespace-nowrap">
                    {renderSourceBadge(r.source)}
                  </td>
                  <td className="py-3.5 text-slate-900 font-semibold whitespace-nowrap">
                    {r.clientProject}
                  </td>
                  <td className="py-3.5 text-slate-600 whitespace-nowrap">
                    {r.category}
                  </td>
                  <td className="py-3.5 font-bold text-slate-900 whitespace-nowrap">
                    {r.formattedAmount}
                  </td>
                  <td className="py-3.5 text-slate-500 whitespace-nowrap">
                    {r.invoiceDate}
                  </td>
                  <td className="py-3.5 text-slate-500 whitespace-nowrap">
                    {r.receivedDate}
                  </td>
                  <td className="py-3.5 whitespace-nowrap">
                    {renderStatusBadge(r.status)}
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
