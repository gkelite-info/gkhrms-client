"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { ReportTrendDataPoint } from "../types"

interface AccountantReportTrendChartProps {
  data: ReportTrendDataPoint[]
}

const formatYAxisTick = (val: number) => {
  if (val === 0) return "₹ 0"
  const lakhs = val / 100000
  return `₹ ${lakhs}L`
}

const formatTooltipAmount = (val: number) => {
  return `₹ ${val.toLocaleString("en-IN")}`
}

export default function AccountantReportTrendChart({
  data,
}: AccountantReportTrendChartProps) {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-xs flex flex-col justify-between h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Money Received vs Money Paid
        </h2>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
            <span>Money Received</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#93C5FD]" />
            <span>Money Paid</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[280px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="receivedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="paidGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#93C5FD" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#93C5FD" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F1F5F9"
            />

            <XAxis
              dataKey="period"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 11, fontWeight: 500 }}
              dy={8}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, 6000000]}
              ticks={[0, 1000000, 2000000, 3000000, 4000000, 5000000, 6000000]}
              tickFormatter={formatYAxisTick}
              tick={{ fill: "#94A3B8", fontSize: 10 }}
              width={64}
            />

            <Tooltip
              formatter={(value: unknown, name: unknown) => [
                formatTooltipAmount(Number(value) || 0),
                name === "received" ? "Money Received" : "Money Paid",
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
              labelStyle={{ color: "#94A3B8", fontWeight: 600, marginBottom: "4px" }}
            />

            <Area
              type="monotone"
              dataKey="paid"
              stroke="#93C5FD"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#paidGradient)"
            />

            <Area
              type="monotone"
              dataKey="received"
              stroke="#6366F1"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#receivedGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

