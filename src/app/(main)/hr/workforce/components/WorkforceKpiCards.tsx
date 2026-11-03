"use client"

export default function WorkforceKpiCards() {
  const topKpis = [
    { label: "Total Employees", value: "120" },
    { label: "Active Employees", value: "100" },
    { label: "Employees on Leave", value: "10" },
    { label: "Resigned/Terminated", value: "3" },
  ]

  return (
    <div className="flex flex-col gap-3 sm:gap-4 w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
        {topKpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white rounded-lg py-4 px-4 border border-gray-100/80 shadow-2xs flex flex-col items-center justify-center text-center hover:shadow-xs transition-shadow duration-200 min-h-[86px] sm:min-h-[92px]"
          >
            <span className="text-xs sm:text-sm font-semibold text-gray-700">
              {kpi.label}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">
              {kpi.value}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 w-full">
        <div className="bg-white rounded-lg py-4 px-4 border border-gray-100/80 shadow-2xs flex flex-col items-center justify-center text-center hover:shadow-xs transition-shadow duration-200 min-h-[104px] sm:min-h-[110px]">
          <span className="text-sm sm:text-base font-semibold text-gray-800">
            Gender Ratio
          </span>
          <span className="text-base sm:text-lg font-bold text-gray-900 mt-2">
            66% Male / 35% Female
          </span>
        </div>

        <div className="bg-white rounded-lg py-4 px-4 border border-gray-100/80 shadow-2xs flex flex-col items-center justify-center text-center hover:shadow-xs transition-shadow duration-200 min-h-[104px] sm:min-h-[110px]">
          <span className="text-sm sm:text-base font-semibold text-gray-800">
            Experience Range
          </span>
          <div className="flex flex-col items-center text-xs sm:text-sm font-bold text-gray-900 mt-2 space-y-1">
            <span>40% &lt; 2yrs &nbsp;&nbsp; 35% 2-5yrs</span>
            <span>25% &gt; 5yrs</span>
          </div>
        </div>

        <div className="bg-white rounded-lg py-4 px-4 border border-gray-100/80 shadow-2xs flex flex-col items-center justify-center text-center hover:shadow-xs transition-shadow duration-200 min-h-[104px] sm:min-h-[110px]">
          <span className="text-sm sm:text-base font-semibold text-gray-800">
            Upcoming Joinings
          </span>
          <div className="flex items-baseline justify-center mt-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              3
            </span>
            <span className="text-xs sm:text-sm font-semibold text-gray-700 ml-2">
              This week
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
