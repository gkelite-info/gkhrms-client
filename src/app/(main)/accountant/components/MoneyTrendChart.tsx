"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { MonthlyTrendData } from "../types"

interface MoneyTrendChartProps {
  data: MonthlyTrendData[]
}

const formatIndianCurrency = (value: number) => {
  if (value === 0) return "₹ 0"
  return `₹ ${value.toLocaleString("en-IN")}`
}

export default function MoneyTrendChart({ data }: MoneyTrendChartProps) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Money Received vs Money Paid Trend
        </h2>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            <span>Money Received</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]" />
            <span>Money Paid</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[260px] sm:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            barGap={6}
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
              tick={{ fill: "#64748B", fontSize: 11, fontWeight: 500 }}
              dy={6}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, 2500000]}
              ticks={[0, 500000, 1000000, 1500000, 2000000, 2500000]}
              tickFormatter={formatIndianCurrency}
              tick={{ fill: "#94A3B8", fontSize: 10 }}
              width={82}
            />
            <Tooltip
              formatter={(value: any, name: any) => [
                formatIndianCurrency(Number(value) || 0),
                name === "received" ? "Money Received" : "Money Paid",
              ]}
              contentStyle={{
                backgroundColor: "#1E293B",
                borderRadius: "12px",
                border: "none",
                fontSize: "12px",
                color: "#FFFFFF",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              labelStyle={{ color: "#94A3B8", fontWeight: 600, marginBottom: "4px" }}
            />
            <Bar
              dataKey="received"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
              maxBarSize={16}
            />
            <Bar
              dataKey="paid"
              fill="#F43F5E"
              radius={[4, 4, 0, 0]}
              maxBarSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

