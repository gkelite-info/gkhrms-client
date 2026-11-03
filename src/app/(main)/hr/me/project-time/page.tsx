"use client"

import { useRouter } from "next/navigation"
import EmployeeMeTabs, { MeTabType } from "../../../employee/components/me/EmployeeMeTabs"
import EmployeeProjectTimeOverview from "../../../employee/components/me/EmployeeProjectTimeOverview"

export default function HrProjectTimePage() {
  const router = useRouter()

  const handleSelectTab = (tab: MeTabType) => {
    if (tab === "overview") {
      router.push("/hr/me")
    } else if (tab === "timesheet") {
      router.push("/hr/me/timesheet")
    } else if (tab === "project_time") {
      router.push("/hr/me/project-time")
    }
  }

  return (
    <div className="w-full max-w-full min-w-0 flex flex-col p-3 sm:p-4 md:p-6 pb-20 sm:pb-24 gap-4 sm:gap-5">
      <EmployeeMeTabs activeTab="project_time" onSelectTab={handleSelectTab} />
      <EmployeeProjectTimeOverview />
    </div>
  )
}

