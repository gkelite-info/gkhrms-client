"use client"

import React, { useState } from "react"

interface DepartmentCount {
  name: string
  count: number
}

const departmentData: DepartmentCount[] = [
  { name: "Design", count: 28 },
  { name: "Development", count: 42 },
  { name: "HR", count: 34 },
  { name: "Marketing", count: 20 },
  { name: "Finance", count: 36 },
  { name: "Operations", count: 42 },
]

export default function DepartmentWiseChart() {
  const [hoveredDept, setHoveredDept] = useState<DepartmentCount | null>(null)
  const maxScale = 50
  const yTicks = [40, 30, 20, 10, 0]

  return (
    <div className="w-full bg-white rounded-lg p-5 sm:p-6 border border-gray-100/80 shadow-2xs flex flex-col select-none">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
          Department - Wise Employee Count
        </h3>

        {hoveredDept && (
          <div className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#5B50EC] text-white animate-in fade-in duration-150">
            {hoveredDept.name}: {hoveredDept.count}
          </div>
        )}
      </div>

      <div className="w-full overflow-x-auto pb-1">
        <div className="min-w-[560px] flex">
          <div className="flex flex-col justify-between h-[190px] sm:h-[200px] pr-3 text-right text-xs font-medium text-gray-400 shrink-0 select-none pb-6">
            {yTicks.map((tick) => (
              <span key={tick} className="leading-none">
                {tick}
              </span>
            ))}
          </div>

          <div className="flex-1 flex flex-col">
            <div className="relative h-[190px] sm:h-[200px] w-full flex items-end justify-around pb-6 border-b border-gray-100">
              <div className="absolute inset-x-0 top-0 h-[1px] border-b border-gray-100/70 pointer-events-none" />
              <div className="absolute inset-x-0 top-[25%] h-[1px] border-b border-gray-100/70 pointer-events-none" />
              <div className="absolute inset-x-0 top-[50%] h-[1px] border-b border-gray-100/70 pointer-events-none" />
              <div className="absolute inset-x-0 top-[75%] h-[1px] border-b border-gray-100/70 pointer-events-none" />

              {departmentData.map((dept) => {
                const heightPercent = Math.min(100, (dept.count / maxScale) * 100)

                return (
                  <div
                    key={dept.name}
                    className="flex flex-col items-center justify-end h-full w-10 sm:w-12 lg:w-14 group cursor-pointer relative z-10"
                    onMouseEnter={() => setHoveredDept(dept)}
                    onMouseLeave={() => setHoveredDept(null)}
                  >
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-[#8E79EE] via-[#A898F3] to-[#C5C1FF] rounded-t-lg transition-all duration-200 group-hover:brightness-95 group-hover:scale-y-[1.02] origin-bottom shadow-xs"
                    />
                  </div>
                )
              })}
            </div>

            <div className="flex items-center justify-around pt-3">
              {departmentData.map((dept) => (
                <div
                  key={dept.name}
                  className="w-20 -mx-4 text-center text-xs sm:text-sm font-semibold text-gray-700 tracking-tight whitespace-nowrap"
                  title={dept.name}
                >
                  {dept.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
