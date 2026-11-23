"use client"

import { useRouter } from "next/navigation"
import EmployeeMeTabs, { MeTabType } from "../components/me/EmployeeMeTabs"
import EmployeeTimesheetView from "../components/me/EmployeeTimesheetView"

export default function EmployeeTimesheetDirectPage() {
  const router = useRouter()

  const handleSelectTab = (tab: MeTabType) => {
    if (tab === "overview") {
      router.push("/employee/me?tab=overview")
    } else if (tab === "timesheet") {
      router.push("/employee/me?tab=timesheet")
    } else if (tab === "project_time") {
      router.push("/employee/me?tab=project_time")
    }
  }

  return (
    <div className="w-full max-w-full min-w-0 flex flex-col p-3 sm:p-4 md:p-6 pb-20 sm:pb-24 gap-4 sm:gap-5">
      <EmployeeMeTabs activeTab="timesheet" onSelectTab={handleSelectTab} />
      <EmployeeTimesheetView />
    </div>
  )
}
