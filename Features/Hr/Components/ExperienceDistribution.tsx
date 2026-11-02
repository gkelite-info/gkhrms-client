"use client"

import React from "react"
import DonutChart from "../../../utils/donotChat"

export interface DonotChatData {
  name: string
  value: number
  color: string
  [key: string]: any
}

const chartData: DonotChatData[] = [
  { name: "< 1 year", value: 120, color: "#2A266E" },
  { name: "> 1 year", value: 80, color: "#110F2C" },
  { name: "> 6 year", value: 50, color: "#C6C4F4" },
  { name: "> 4 year", value: 200, color: "#554DDD" },
]

const categories = {
  lessThan1: {
    label: "Total Experience : < 1 year",
    color: "#2A266E",
    males: 65,
    females: 55,
    total: 120,
  },
  greaterThan1: {
    label: "Total Experience : > 1 year",
    color: "#110F2C",
    males: 45,
    females: 35,
    total: 80,
  },
  greaterThan4: {
    label: "Total Experience : > 4 year",
    color: "#554DDD",
    males: 110,
    females: 90,
    total: 200,
  },
  greaterThan6: {
    label: "Total Experience : > 6 year",
    color: "#C6C4F4",
    males: 28,
    females: 22,
    total: 50,
  },
}

export default function ExperienceDistribution() {
  return (
    <div className="w-full lg:w-[40%] h-[330px] bg-[#F9FAFB] shadow-md rounded-lg p-3.5 sm:p-4 flex flex-col justify-between select-none">
      <h3 className="text-[#323232] font-semibold text-sm text-center">
        Experience Distribution
      </h3>

      <div className="w-full flex-1 flex items-center justify-between gap-1.5 sm:gap-2.5 min-w-0 pt-1">
        <div className="flex-1 flex flex-col justify-between h-full py-1 min-w-0">
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-start gap-1.5 min-w-0">
              <span
                className="w-2 h-2 mt-1 rounded-full shrink-0"
                style={{ backgroundColor: categories.lessThan1.color }}
              />
              <span className="text-[11px] font-semibold text-[#1F2433] leading-tight break-words">
                {categories.lessThan1.label}
              </span>
            </div>
            <div className="pl-3.5 flex flex-col text-[10px] text-[#4B5563]">
              <div className="flex items-center justify-between pr-1">
                <span>Males</span>
                <span className="font-medium text-gray-700">{categories.lessThan1.males}</span>
              </div>
              <div className="flex items-center justify-between pr-1">
                <span>Females</span>
                <span className="font-medium text-gray-700">{categories.lessThan1.females}</span>
              </div>
              <div className="flex items-center justify-between pr-1 border-t border-gray-200/60 pt-0.5 mt-0.5 font-semibold text-gray-900">
                <span>Total</span>
                <span>{categories.lessThan1.total}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-start gap-1.5 min-w-0">
              <span
                className="w-2 h-2 mt-1 rounded-full shrink-0"
                style={{ backgroundColor: categories.greaterThan4.color }}
              />
              <span className="text-[11px] font-semibold text-[#1F2433] leading-tight break-words">
                {categories.greaterThan4.label}
              </span>
            </div>
            <div className="pl-3.5 flex flex-col text-[10px] text-[#4B5563]">
              <div className="flex items-center justify-between pr-1">
                <span>Males</span>
                <span className="font-medium text-gray-700">{categories.greaterThan4.males}</span>
              </div>
              <div className="flex items-center justify-between pr-1">
                <span>Females</span>
                <span className="font-medium text-gray-700">{categories.greaterThan4.females}</span>
              </div>
              <div className="flex items-center justify-between pr-1 border-t border-gray-200/60 pt-0.5 mt-0.5 font-semibold text-gray-900">
                <span>Total</span>
                <span>{categories.greaterThan4.total}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[120px] sm:w-[130px] h-[130px] shrink-0 flex items-center justify-center">
          <DonutChart
            chartData={chartData}
            innerRadius={36}
            outerRadius={56}
            height={130}
          />
        </div>

        <div className="flex-1 flex flex-col justify-between h-full py-1 min-w-0">
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-start gap-1.5 min-w-0">
              <span
                className="w-2 h-2 mt-1 rounded-full shrink-0"
                style={{ backgroundColor: categories.greaterThan1.color }}
              />
              <span className="text-[11px] font-semibold text-[#1F2433] leading-tight break-words">
                {categories.greaterThan1.label}
              </span>
            </div>
            <div className="pl-3.5 flex flex-col text-[10px] text-[#4B5563]">
              <div className="flex items-center justify-between pr-1">
                <span>Males</span>
                <span className="font-medium text-gray-700">{categories.greaterThan1.males}</span>
              </div>
              <div className="flex items-center justify-between pr-1">
                <span>Females</span>
                <span className="font-medium text-gray-700">{categories.greaterThan1.females}</span>
              </div>
              <div className="flex items-center justify-between pr-1 border-t border-gray-200/60 pt-0.5 mt-0.5 font-semibold text-gray-900">
                <span>Total</span>
                <span>{categories.greaterThan1.total}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-start gap-1.5 min-w-0">
              <span
                className="w-2 h-2 mt-1 rounded-full shrink-0"
                style={{ backgroundColor: categories.greaterThan6.color }}
              />
              <span className="text-[11px] font-semibold text-[#1F2433] leading-tight break-words">
                {categories.greaterThan6.label}
              </span>
            </div>
            <div className="pl-3.5 flex flex-col text-[10px] text-[#4B5563]">
              <div className="flex items-center justify-between pr-1">
                <span>Males</span>
                <span className="font-medium text-gray-700">{categories.greaterThan6.males}</span>
              </div>
              <div className="flex items-center justify-between pr-1">
                <span>Females</span>
                <span className="font-medium text-gray-700">{categories.greaterThan6.females}</span>
              </div>
              <div className="flex items-center justify-between pr-1 border-t border-gray-200/60 pt-0.5 mt-0.5 font-semibold text-gray-900">
                <span>Total</span>
                <span>{categories.greaterThan6.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
