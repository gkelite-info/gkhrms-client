"use client"

import {
  TrendingUp,
  DollarSign,
  Scale,
  Landmark,
  ShieldCheck,
  Building2,
  Download,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import {
  executiveKpis,
  executiveDepartmentBudgets,
  executiveRevenueTrend,
} from "../data/mockAccountantData"

const formatIndianCurrency = (val: number) => {
  if (val === 0) return "₹ 0"
  const cr = (val / 10000000).toFixed(1)
  return `₹ ${cr} Cr`
}

export default function AccountantExecutiveFinanceView() {
  return (
    <div className="space-y-4 xl:space-y-4.5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 xl:gap-4">
        {executiveKpis.map((kpi) => {
          return (
            <div
              key={kpi.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 sm:gap-4 hover:shadow-sm transition-shadow"
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  kpi.iconType === "revenue"
                    ? "bg-[#EAF7EE] text-[#16A34A]"
                    : kpi.iconType === "opex"
                    ? "bg-[#EFF6FF] text-[#3B82F6]"
                    : kpi.iconType === "margin"
                    ? "bg-[#F5F3FF] text-[#8B5CF6]"
                    : "bg-[#FEF8ED] text-[#D97706]"
                }`}
              >
                {kpi.iconType === "revenue" && <DollarSign className="w-5 h-5" />}
                {kpi.iconType === "opex" && <Building2 className="w-5 h-5" />}
                {kpi.iconType === "margin" && <Scale className="w-5 h-5" />}
                {kpi.iconType === "runway" && <Landmark className="w-5 h-5" />}
              </div>

              <div className="min-w-0">
                <span className="block text-[11px] font-semibold text-slate-400 tracking-wider uppercase truncate">
                  {kpi.title}
                </span>
                <span className="block text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
                  {kpi.value}
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className={`text-[11px] font-semibold ${
                      kpi.trendType === "up"
                        ? "text-[#16A34A]"
                        : kpi.trendType === "down"
                        ? "text-indigo-600"
                        : "text-slate-500"
                    }`}
                  >
                    {kpi.trend}
                  </span>
                  <span className="text-[11px] text-slate-400 truncate">
                    • {kpi.subtitle}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 xl:gap-4">
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Corporate Revenue vs Operating Costs
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Consolidated 6-month financial performance trajectory
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <span>Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
                <span>OpEx</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
                <span>Net Margin</span>
              </div>
            </div>
          </div>

          <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={executiveRevenueTrend}
                margin={{ top: 10, right: 10, left: -5, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="execRevGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="execOpexGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
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
                  tick={{ fill: "#64748B", fontSize: 11, fontWeight: 500 }}
                  dy={6}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={formatIndianCurrency}
                  tick={{ fill: "#94A3B8", fontSize: 10 }}
                  width={68}
                />

                <Tooltip
                  formatter={(val: any, name: any) => [
                    `₹ ${(Number(val) || 0).toLocaleString("en-IN")}`,
                    name === "revenue"
                      ? "Revenue"
                      : name === "opex"
                      ? "Operating Costs"
                      : "Net Margin",
                  ]}
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    fontSize: "12px",
                    color: "#FFFFFF",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
                  }}
                  itemStyle={{
                    color: "#FFFFFF",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                  labelStyle={{
                    color: "#94A3B8",
                    fontSize: "11px",
                    fontWeight: 600,
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#execRevGradient)"
                />

                <Area
                  type="monotone"
                  dataKey="opex"
                  stroke="#6366F1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#execOpexGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Treasury & Capital Health
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#EAF7EE] text-[#16A34A]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Audited</span>
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-medium block">
                    Operating Bank Reserves
                  </span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">
                    ₹ 2,40,00,000
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  HDFC Corporate
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-medium block">
                    Fixed Deposits / Liquid Yield
                  </span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">
                    ₹ 80,00,000
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                  7.2% Yield
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-medium block">
                    Monthly Burn Rate
                  </span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">
                    ₹ 17,50,000
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-600 bg-slate-200/60 px-2.5 py-1 rounded-lg">
                  Controlled
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Runway Status: <strong className="text-slate-900">18.2 Months</strong>
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4F46E5] hover:text-indigo-800 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Audit Report</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Departmental Budget vs Actuals
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Current fiscal quarter allocation and variance ledger
            </p>
          </div>

          <button
            type="button"
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Budget Ledger</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-y border-slate-100 bg-slate-50/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-5 sm:px-6">Department</th>
                <th className="py-3 px-5 sm:px-6">Department Head</th>
                <th className="py-3 px-5 sm:px-6">Allocated Budget</th>
                <th className="py-3 px-5 sm:px-6">Actual Spend</th>
                <th className="py-3 px-5 sm:px-6">Variance</th>
                <th className="py-3 px-5 sm:px-6">Utilization</th>
                <th className="py-3 px-5 sm:px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {executiveDepartmentBudgets.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  <td className="py-3.5 px-5 sm:px-6 font-semibold text-slate-900">
                    {row.department}
                  </td>
                  <td className="py-3.5 px-5 sm:px-6 text-slate-600">
                    {row.head}
                  </td>
                  <td className="py-3.5 px-5 sm:px-6 font-medium text-slate-700">
                    {row.allocatedBudget}
                  </td>
                  <td className="py-3.5 px-5 sm:px-6 font-bold text-slate-900">
                    {row.actualSpend}
                  </td>
                  <td className="py-3.5 px-5 sm:px-6 font-semibold text-emerald-600">
                    {row.variance}
                  </td>
                  <td className="py-3.5 px-5 sm:px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[#4F46E5] h-2 rounded-full"
                          style={{ width: `${row.utilization}%` }}
                        />
                      </div>
                      <span className="font-semibold text-slate-700 text-xs">
                        {row.utilization}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 sm:px-6 text-right">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        row.status === "On Track"
                          ? "bg-[#EAF7EE] text-[#16A34A]"
                          : row.status === "Under Budget"
                          ? "bg-[#EFF6FF] text-[#3B82F6]"
                          : "bg-[#FFF8EB] text-[#D97706]"
                      }`}
                    >
                      {row.status === "On Track" ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <AlertTriangle className="w-3 h-3" />
                      )}
                      <span>{row.status}</span>
                    </span>
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

