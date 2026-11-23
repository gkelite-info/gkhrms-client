"use client"

import { Star, ArrowUp } from "phosphor-react"

export default function PerformanceMetricCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-4 w-full">
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xs border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow duration-200 min-h-[105px] sm:min-h-[115px]">
        <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700">
          Overall Rating
        </span>
        <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
          <Star
            size={20}
            weight="fill"
            className="text-[#EAB308] shrink-0 sm:w-[22px] sm:h-[22px]"
          />
          <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            4.2 / 5
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xs border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow duration-200 min-h-[105px] sm:min-h-[115px]">
        <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700">
          Best Month
        </span>
        <h3 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 tracking-tight mt-1">
          June 2025
        </h3>
        <div className="flex items-center gap-1 mt-1">
          <Star
            size={13}
            weight="fill"
            className="text-[#EAB308] shrink-0 sm:w-[14px] sm:h-[14px]"
          />
          <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-800">
            4.8 / 5
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xs border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow duration-200 min-h-[105px] sm:min-h-[115px]">
        <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700">
          Growth
        </span>
        <div className="flex items-center gap-1 sm:gap-1.5 mt-1.5 sm:mt-2 text-[#10B981]">
          <ArrowUp size={18} weight="bold" className="sm:w-[22px] sm:h-[22px]" />
          <span className="text-xl sm:text-2xl md:text-3xl font-bold">+12%</span>
        </div>
        <span className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">vs last year</span>
      </div>

      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xs border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow duration-200 min-h-[105px] sm:min-h-[115px]">
        <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700">
          Need Improvement
        </span>
        <h3 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 tracking-tight mt-1">
          March 2025
        </h3>
        <div className="flex items-center gap-1 mt-1">
          <Star
            size={13}
            weight="fill"
            className="text-[#EAB308] shrink-0 sm:w-[14px] sm:h-[14px]"
          />
          <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-800">
            3.5 / 5
          </span>
        </div>
      </div>
    </div>
  )
}
