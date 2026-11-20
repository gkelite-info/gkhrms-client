"use client"

export default function ChairmanBudgetUtilizationCard() {
  const percentage = 68
  const strokeWidth = 11
  const radius = 48
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="mb-2">
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          Budget Utilization
        </h2>
      </div>

      <div className="relative w-36 h-36 mx-auto my-auto flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#F1F5F9"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#5B50E5"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold text-slate-900 leading-tight">
            {percentage}%
          </span>
          <span className="text-[10px] text-slate-400 font-medium mt-0.5">
            8.2M of 12M
          </span>
        </div>
      </div>

      <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3 text-center mt-3">
        <span className="text-base font-bold text-slate-900 block leading-tight">
          $3.8M
        </span>
        <span className="text-xs text-slate-400 font-medium block mt-0.5">
          Remaining Budget
        </span>
      </div>
    </div>
  )
}
