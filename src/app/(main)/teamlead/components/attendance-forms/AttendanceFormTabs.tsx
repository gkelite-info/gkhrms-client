"use client"

import { FormTabType } from "./types"

interface AttendanceFormTabsProps {
  activeTab: FormTabType
  onTabChange: (tab: FormTabType) => void
}

export default function AttendanceFormTabs({
  activeTab,
  onTabChange,
}: AttendanceFormTabsProps) {
  return (
    <div className="w-full flex items-center justify-start select-none overflow-x-auto scrollbar-hide py-0.5">
      <div className="bg-white rounded-xl sm:rounded-2xl p-1 shadow-xs border border-gray-100 inline-flex items-center gap-1 sm:gap-1.5 shrink-0 max-w-full">
        <button
          type="button"
          onClick={() => onTabChange("leave")}
          className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap ${
            activeTab === "leave"
              ? "bg-[#5B50EC] text-white shadow-xs"
              : "text-[#4B5563] hover:text-[#5B50EC] hover:bg-gray-50/60"
          }`}
        >
          Apply Leave
        </button>
        <button
          type="button"
          onClick={() => onTabChange("wfh")}
          className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap ${
            activeTab === "wfh"
              ? "bg-[#5B50EC] text-white shadow-xs"
              : "text-[#4B5563] hover:text-[#5B50EC] hover:bg-gray-50/60"
          }`}
        >
          Request Work From Home
        </button>
        <button
          type="button"
          onClick={() => onTabChange("exception")}
          className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap ${
            activeTab === "exception"
              ? "bg-[#5B50EC] text-white shadow-xs"
              : "text-[#4B5563] hover:text-[#5B50EC] hover:bg-gray-50/60"
          }`}
        >
          Apply Exception
        </button>
      </div>
    </div>
  )
}
