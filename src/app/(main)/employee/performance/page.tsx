"use client"

import { useState, useEffect, Suspense, useCallback } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import PerformanceMetricCards from "./components/PerformanceMetricCards"
import PerformanceScoreChart from "./components/PerformanceScoreChart"
import TopEmployeesChart from "./components/TopEmployeesChart"
import PerformanceFeedbackTable from "./components/PerformanceFeedbackTable"
import SkillsAndAchievements from "./components/SkillsAndAchievements"
import DepartmentPerformanceView from "./components/DepartmentPerformanceView"
import SkillsBuildingView from "./components/SkillsBuildingView"

type TabType = "Performance" | "Department" | "Skills Building"

function PerformancePageContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const parseTabFromQuery = useCallback((tabParam: string | null): TabType => {
    const t = (tabParam || "").toLowerCase()
    if (t === "department" || t === "dept") {
      return "Department"
    }
    if (t === "skills" || t === "skills-building" || t === "skillsbuilding") {
      return "Skills Building"
    }
    return "Performance"
  }, [])

  const currentTabFromQuery = parseTabFromQuery(searchParams?.get("tab"))
  const [activeTab, setActiveTab] = useState<TabType>(currentTabFromQuery)

  useEffect(() => {
    setActiveTab(currentTabFromQuery)
  }, [currentTabFromQuery])

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)

    const params = new URLSearchParams(searchParams ? Array.from(searchParams.entries()) : [])
    if (tab === "Performance") {
      params.set("tab", "performance")
    } else if (tab === "Department") {
      params.set("tab", "department")
    } else if (tab === "Skills Building") {
      params.set("tab", "skills")
    }

    const query = params.toString()
    router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false })
  }

  return (
    <div className="w-full min-h-full px-3 py-3 sm:px-5 sm:py-5 md:px-6 md:pt-6 pb-6 flex flex-col gap-4 sm:gap-5 select-none">
      <div className="w-full bg-white rounded-xl sm:rounded-2xl p-1.5 sm:p-2.5 flex items-center gap-1.5 sm:gap-3 shadow-xs border border-gray-100 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => handleTabChange("Performance")}
          className={`flex-1 min-w-[100px] sm:min-w-0 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm text-center whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "Performance"
              ? "bg-[#8571EE] text-white shadow-xs"
              : "bg-[#B3B3B3] text-white hover:bg-gray-400"
          }`}
        >
          Performance
        </button>
        <button
          type="button"
          onClick={() => handleTabChange("Department")}
          className={`flex-1 min-w-[100px] sm:min-w-0 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm text-center whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "Department"
              ? "bg-[#8571EE] text-white shadow-xs"
              : "bg-[#B3B3B3] text-white hover:bg-gray-400"
          }`}
        >
          Department
        </button>
        <button
          type="button"
          onClick={() => handleTabChange("Skills Building")}
          className={`flex-1 min-w-[100px] sm:min-w-0 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm text-center whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "Skills Building"
              ? "bg-[#8571EE] text-white shadow-xs"
              : "bg-[#B3B3B3] text-white hover:bg-gray-400"
          }`}
        >
          Skills Building
        </button>
      </div>

      {activeTab === "Performance" && (
        <div className="flex flex-col gap-4 sm:gap-5 w-full">
          <PerformanceMetricCards />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full">
            <div className="lg:col-span-8 min-w-0">
              <PerformanceScoreChart />
            </div>
            <div className="lg:col-span-4 min-w-0">
              <TopEmployeesChart />
            </div>
          </div>

          <PerformanceFeedbackTable />
          <SkillsAndAchievements />
        </div>
      )}

      {activeTab === "Department" && <DepartmentPerformanceView />}

      {activeTab === "Skills Building" && <SkillsBuildingView />}

      <div className="w-full h-2 shrink-0" aria-hidden="true" />
    </div>
  )
}

export default function EmployeePerformancePage() {
  return (
    <Suspense fallback={null}>
      <PerformancePageContent />
    </Suspense>
  )
}
