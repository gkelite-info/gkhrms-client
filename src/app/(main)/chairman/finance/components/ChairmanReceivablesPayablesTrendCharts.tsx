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
  Cell,
} from "recharts"
import {
  RECEIVABLES_MONTHLY_TREND,
  PAYABLES_MONTHLY_TREND,
  ReceivablesPayablesTrendPoint,
} from "./ChairmanReceivablesPayablesData"

interface CustomTooltipProps {
  active?: boolean
  payload?: { payload: ReceivablesPayablesTrendPoint }[]
  label?: string
}

function CustomTrendTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-900 text-white rounded-xl px-3 py-1.5 sm:px-3.5 sm:py-2 shadow-xl text-xs flex flex-col gap-1 border border-slate-800">
        <span className="font-semibold text-slate-300">{label}</span>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[#A5B4FC] font-medium">Amount:</span>
          <span className="font-bold text-white">{data.amountFormatted}</span>
        </div>
      </div>
    )
  }
  return null
}

function TrendBarCard({
  title,
  data,
  highlightColor,
  normalColor,
}: {
  title: string
  data: ReceivablesPayablesTrendPoint[]
  highlightColor: string
  normalColor: string
}) {
  const [mounted, setMounted] = useState(false)
  const [period, setPeriod] = useState<"Monthly" | "Quarterly" | "Yearly">("Monthly")

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          {title}
        </h2>

        <div className="bg-slate-100/80 p-0.5 rounded-lg inline-flex items-center gap-0.5">
          {(["Monthly", "Quarterly", "Yearly"] as const).map((tab) => {
            const isActive = period === tab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setPeriod(tab)}
                className={`px-2.5 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#5B50E5] text-white shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>
      </div>

      <div className="w-full h-52 sm:h-56 pt-1">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              barCategoryGap="20%"
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
                tick={{ fontSize: 9, fill: "#94A3B8" }}
                dy={6}
              />

              <YAxis
                domain={[0, 75]}
                ticks={[0, 15, 30, 45, 60, 75]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: "#94A3B8" }}
                tickFormatter={(val) => (val === 0 ? "₹ 0" : `₹ ${val}L`)}
              />

              <Tooltip content={<CustomTrendTooltip />} />

              <Bar
                dataKey="amount"
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isHighlighted ? highlightColor : normalColor}
                  />
                ))}
              </Bar>
            </BarChart>
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

export default function ChairmanReceivablesPayablesTrendCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-stretch">
      <TrendBarCard
        title="Receivables Trend"
        data={RECEIVABLES_MONTHLY_TREND}
        highlightColor="#5B50E5"
        normalColor="#DEDCFA"
      />
      <TrendBarCard
        title="Payables Trend"
        data={PAYABLES_MONTHLY_TREND}
        highlightColor="#3B82F6"
        normalColor="#93C5FD"
      />
    </div>
  )
}
