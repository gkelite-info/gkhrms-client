"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import EmployeeMeTabs, { MeTabType } from "../components/me/EmployeeMeTabs"
import EmployeeMetricsRow from "../components/me/EmployeeMetricsRow"
import EmployeeOperationsRow from "../components/me/EmployeeOperationsRow"
import EmployeeLeaveBalance from "../components/me/EmployeeLeaveBalance"
import EmployeeAttendanceLogTable from "../components/me/EmployeeAttendanceLogTable"
import EmployeeTimesheetView from "../components/me/EmployeeTimesheetView"
import EmployeeProjectTimeOverview from "../components/me/EmployeeProjectTimeOverview"

export interface EmployeeMeProps {
  basePath?: string
}

export default function EmployeeMe({ basePath }: EmployeeMeProps) {
  const router = useRouter()
  const pathname = usePathname()
  const currentBase =
    basePath || (pathname?.startsWith("/hr") ? "/hr/me" : "/employee/me")
  const [activeTab, setActiveTab] = useState<MeTabType>("overview")

  useEffect(() => {
    const syncTabFromUrl = () => {
      if (typeof window === "undefined") return
      const params = new URLSearchParams(window.location.search)
      const tabParam = (params.get("tab") || params.get("view") || "").toLowerCase()
      const subtabParam = params.get("subtab")

      if (
        subtabParam ||
        tabParam === "expenses" ||
        tabParam === "expenses_travel" ||
        tabParam === "expenses-travel"
      ) {
        const dest = currentBase.startsWith("/hr")
          ? "/hr/finance?tab=expenses_travel"
          : "/employee/finance?tab=expenses_travel"
        router.replace(dest)
        return
      }
      if (
        tabParam === "performance" ||
        tabParam === "monthly_performance" ||
        tabParam === "monthly-performance"
      ) {
        if (!currentBase.startsWith("/hr")) {
          router.replace("/employee/performance")
        }
        return
      }
      if (tabParam === "timesheet") {
        setActiveTab("timesheet")
      } else if (
        tabParam === "project_time" ||
        tabParam === "project_overview" ||
        tabParam === "project-time"
      ) {
        setActiveTab("project_time")
      } else {
        setActiveTab("overview")
      }
    }

    syncTabFromUrl()
    window.addEventListener("popstate", syncTabFromUrl)
    return () => window.removeEventListener("popstate", syncTabFromUrl)
  }, [router, currentBase])

  const handleSelectTab = (tab: MeTabType) => {
    setActiveTab(tab)
    if (currentBase.startsWith("/hr")) {
      if (tab === "overview") {
        router.push(currentBase)
      } else {
        router.push(`${currentBase}?tab=${tab}`)
      }
      return
    }
    if (tab === "timesheet") {
      router.push("/employee/me/timesheet")
    } else if (tab === "overview") {
      router.push("/employee/me")
    } else if (tab === "project_time") {
      router.push("/employee/me/project-time")
    }
  }

  const handleSelectPerformance = () => {
    if (!currentBase.startsWith("/hr")) {
      router.push("/employee/performance")
    }
  }

  return (
    <div className="w-full max-w-full min-w-0 flex flex-col px-3 pt-3 sm:px-4 sm:pt-4 md:px-6 md:pt-6 pb-4 md:pb-6 gap-4 sm:gap-5">
      <EmployeeMeTabs activeTab={activeTab} onSelectTab={handleSelectTab} />

      {activeTab === "timesheet" && <EmployeeTimesheetView />}

      {activeTab === "project_time" && <EmployeeProjectTimeOverview />}

      {activeTab === "overview" && (
        <>
          <EmployeeMetricsRow
            onSelectPerformance={handleSelectPerformance}
          />
          <EmployeeOperationsRow
            onSelectTimings={() => handleSelectTab("timesheet")}
          />
          <EmployeeLeaveBalance />
          <EmployeeAttendanceLogTable />
        </>
      )}

      <div className="w-full h-4 shrink-0" aria-hidden="true" />
    </div>
  )
}
