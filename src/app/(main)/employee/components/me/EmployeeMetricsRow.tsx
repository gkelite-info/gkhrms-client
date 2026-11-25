"use client"

import { useRouter } from "next/navigation"
import { CaretRight } from "phosphor-react"

export default function EmployeeMetricsRow({
  onSelectPerformance,
  onSelectProfile,
}: {
  onSelectPerformance?: () => void
  onSelectProfile?: () => void
}) {
  const router = useRouter()

  const handleProfileClick = () => {
    if (onSelectProfile) {
      onSelectProfile()
    } else {
      router.push("/employee/profile")
    }
  }

  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      <div
        onClick={handleProfileClick}
        style={{ cursor: "pointer" }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 cursor-pointer hover:border-[#7D73E3]/40 hover:shadow-md transition-all group select-none min-h-[96px]"
      >
        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden shrink-0 shadow-sm border border-gray-100 bg-gray-50 flex items-center justify-center">
          <img
            src="/images/alexander.png"
            alt="Alexander"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = "none"
            }}
          />
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="text-xs sm:text-base font-bold text-[#1F2937] leading-snug group-hover:text-[#5B50E5] transition-colors truncate">
            Alexander
          </h3>
          <p className="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5 truncate">
            Employee ID : 154358
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 flex items-center justify-between min-h-[96px]">
        <div className="flex flex-col justify-between h-full min-w-0 pr-1">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#1F2937] truncate">Attendance</h3>
            <p className="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5 truncate">October Month</p>
          </div>
          <div className="flex flex-col gap-0.5 sm:gap-1 mt-1.5 sm:mt-2">
            <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-gray-500 font-medium">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#F59E0B] shrink-0" />
              <span className="truncate">Holidays</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-gray-500 font-medium">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#EF4444] shrink-0" />
              <span className="truncate">Unpaid leave</span>
            </div>
          </div>
        </div>

        <div className="relative h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="transparent"
              stroke="#F3F4F6"
              strokeWidth="4"
            />
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="transparent"
              stroke="#F59E0B"
              strokeWidth="4"
              strokeDasharray="88 88"
              strokeDashoffset="0"
            />
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="transparent"
              stroke="#7D73E3"
              strokeWidth="4"
              strokeDasharray="83.6 88"
              strokeDashoffset="0"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-[10px] sm:text-xs font-bold text-[#1F2937]">95 %</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 flex flex-col justify-between min-h-[96px]">
        <h3 className="text-xs sm:text-sm font-bold text-[#1F2937] truncate">Attendance Requests</h3>
        <div className="flex flex-col gap-1.5 sm:gap-2 mt-1 sm:mt-2">
          <button
            type="button"
            className="flex items-center justify-between text-[11px] sm:text-xs text-gray-700 font-medium hover:text-[#7D73E3] transition-colors focus:outline-none cursor-pointer"
          >
            <span>New Approval</span>
            <CaretRight size={13} className="text-gray-400 shrink-0" />
          </button>
          <button
            type="button"
            className="flex items-center justify-between text-[11px] sm:text-xs text-gray-700 font-medium hover:text-[#7D73E3] transition-colors focus:outline-none cursor-pointer"
          >
            <span>Pending</span>
            <CaretRight size={13} className="text-gray-400 shrink-0" />
          </button>
        </div>
      </div>

      <div
        onClick={onSelectPerformance}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 flex items-center justify-between cursor-pointer hover:shadow-md hover:border-[#7D73E3]/50 transition-all group min-h-[96px]"
        title="Click to view detailed Performance analysis"
      >
        <div className="flex flex-col justify-between h-full min-w-0 pr-1">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#1F2937] group-hover:text-[#7D73E3] transition-colors truncate">
              Performance
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5 truncate">This Month (OCT)</p>
          </div>
        </div>

        <div className="relative h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="transparent"
              stroke="#F3F4F6"
              strokeWidth="4"
            />
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="transparent"
              stroke="#7D73E3"
              strokeWidth="4"
              strokeDasharray="83.6 88"
              strokeDashoffset="0"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-[10px] sm:text-xs font-bold text-[#1F2937]">95 %</span>
        </div>
      </div>
    </div>
  )
}
