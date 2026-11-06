"use client"

interface PerformanceDonutCardProps {
  score?: number
  subtitle?: string
  className?: string
}

export default function PerformanceDonutCard({
  score = 95,
  subtitle = "This Month (OCT)",
  className = "",
}: PerformanceDonutCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between gap-3 transition-all hover:shadow-md min-h-[110px] h-auto ${className}`}
    >
      <div className="flex flex-col justify-between h-full py-0.5">
        <div>
          <h3 className="text-sm font-bold text-[#1F2433]">Performance</h3>
          <p className="text-xs text-gray-400 font-medium">{subtitle}</p>
        </div>
        <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full w-fit">
          +4.2% from last month
        </span>
      </div>

      <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
          <path
            className="text-gray-100"
            strokeWidth="3.5"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-[#5B50EC]"
            strokeDasharray={`${score}, 100`}
            strokeWidth="3.5"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[11px] font-bold text-[#1F2433]">{score} %</span>
        </div>
      </div>
    </div>
  )
}
