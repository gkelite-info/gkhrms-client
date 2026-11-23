"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { MagnifyingGlass } from "phosphor-react"

function EmployeeProjectTimeOverviewContent() {
  const searchParams = useSearchParams()
  const qParam = searchParams?.get("q") || searchParams?.get("search") || ""
  const [searchQuery, setSearchQuery] = useState(qParam)

  useEffect(() => {
    if (qParam) {
      setSearchQuery(qParam)
    }
  }, [qParam])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      if (value) {
        url.searchParams.set("q", value)
      } else {
        url.searchParams.delete("q")
      }
      window.history.pushState(null, "", url.toString())
    }
  }

  return (
    <div className="w-full max-w-full flex flex-col gap-4 sm:gap-6">
      <div className="w-fit bg-[#C5C1FF] text-[#1F2937] font-bold text-base sm:text-lg md:text-xl px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-sm">
        Projects Time Overview
      </div>

      <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
        <div className="flex items-center justify-between bg-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl w-full sm:flex-1 min-w-0 sm:min-w-[200px] border border-gray-200/90 shadow-2xs focus-within:border-[#7D73E3] transition-colors">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search"
            className="bg-transparent text-xs sm:text-sm text-[#1F2937] placeholder-gray-500 font-medium focus:outline-none w-full"
          />
          <MagnifyingGlass size={17} weight="bold" className="text-gray-700 ml-2 flex-shrink-0 cursor-pointer" />
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap w-full sm:w-auto">
          <div className="flex-1 sm:flex-initial bg-white border border-gray-200/90 shadow-2xs px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#1F2937] select-none text-center sm:text-left whitespace-nowrap">
            Start Date : <span className="font-semibold text-gray-700">18 Aug 2025</span>
          </div>

          <div className="flex-1 sm:flex-initial bg-white border border-gray-200/90 shadow-2xs px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#1F2937] select-none text-center sm:text-left whitespace-nowrap">
            End Date : <span className="font-semibold text-gray-700">18 Aug 2025</span>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col justify-center min-h-[135px] sm:min-h-[155px] md:min-h-[170px] shadow-sm border border-gray-100">
          <h3 className="text-lg sm:text-xl font-bold text-[#1F2937] leading-tight">GKElite</h3>
          <p className="text-xs sm:text-sm font-semibold text-gray-600 mt-2 sm:mt-3">Project : HRMS</p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center min-h-[135px] sm:min-h-[155px] md:min-h-[170px] shadow-sm border border-gray-100">
          <span className="text-xs font-bold text-gray-700">Total Duration</span>
          <div className="flex items-baseline justify-center gap-1.5 mt-2 sm:mt-3">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2937] tracking-tight">6,657</span>
            <span className="text-xs font-semibold text-gray-600">Hours</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col justify-between min-h-[135px] sm:min-h-[155px] md:min-h-[170px] shadow-sm border border-gray-100">
          <span className="text-xs font-bold text-gray-700 text-center block">Billable Hours</span>
          <div className="flex flex-col gap-1 my-1.5 sm:my-2">
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-xl sm:text-2xl font-bold text-[#1F2937]">3000</span>
              <span className="text-xs font-semibold text-gray-600">Hours</span>
            </div>
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-xl sm:text-2xl font-bold text-[#1F2937]">50,000</span>
              <span className="text-xs font-semibold text-gray-600">Pay</span>
            </div>
          </div>
          <div className="h-2.5 sm:h-3 w-full bg-[#EAEAEA] rounded-full overflow-hidden mt-1">
            <div className="h-full rounded-full bg-gradient-to-r from-[#6357E8] to-[#E056FD] w-[65%]" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col justify-between min-h-[135px] sm:min-h-[155px] md:min-h-[170px] shadow-sm border border-gray-100">
          <span className="text-xs font-bold text-gray-700 text-center block">Non Billable Hours</span>
          <div className="flex flex-col gap-1 my-1.5 sm:my-2">
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-xl sm:text-2xl font-bold text-[#1F2937]">1000</span>
              <span className="text-xs font-semibold text-gray-600">Hours</span>
            </div>
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-xl sm:text-2xl font-bold text-[#1F2937]">30,000</span>
              <span className="text-xs font-semibold text-gray-600">Pay</span>
            </div>
          </div>
          <div className="h-2.5 sm:h-3 w-full bg-[#EAEAEA] rounded-full overflow-hidden mt-1">
            <div className="h-full rounded-full bg-gradient-to-r from-[#6357E8] to-[#E056FD] w-[55%]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EmployeeProjectTimeOverview() {
  return (
    <Suspense fallback={null}>
      <EmployeeProjectTimeOverviewContent />
    </Suspense>
  )
}
