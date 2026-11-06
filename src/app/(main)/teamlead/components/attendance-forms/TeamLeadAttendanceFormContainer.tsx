"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import { Toaster } from "react-hot-toast"
import { RootState } from "../../../../../../Redux/Store"
import { ApplicantRole, FormTabType } from "./types"
import AttendanceBanner from "./AttendanceBanner"
import AttendanceFormTabs from "./AttendanceFormTabs"
import ApplyLeaveFormCard from "./ApplyLeaveFormCard"
import CurrentLeaveBalanceCard from "./CurrentLeaveBalanceCard"
import RequestWfhFormCard from "./RequestWfhFormCard"
import WfhGuidelinesCard from "./WfhGuidelinesCard"

interface TeamLeadAttendanceFormContainerProps {
  initialFormType?: FormTabType
}

export default function TeamLeadAttendanceFormContainer({
  initialFormType = "leave",
}: TeamLeadAttendanceFormContainerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const urlType = searchParams.get("type")
  const authRole = useSelector((state: RootState) => state.auth?.role)

  const isHrManager = pathname?.startsWith("/hrmanager")
  const isHr = !isHrManager && pathname?.startsWith("/hr")
  const isManager = pathname?.startsWith("/manager")
  const isProductManager = pathname?.startsWith("/productmanager")
  const isEmployee = pathname?.startsWith("/employee")
  const basePath = isHrManager
    ? "/hrmanager/attendance"
    : isHr
    ? "/hr/attendance"
    : isManager
    ? "/manager/attendance"
    : isProductManager
    ? "/productmanager/attendance"
    : isEmployee
    ? "/employee/attendance"
    : "/teamlead/attendance"

  const [selectedRole, setSelectedRole] = useState<ApplicantRole>(() => {
    if (isHrManager || authRole === "HrManager") return "HR Manager"
    if (isHr || authRole === "Hr") return "HR"
    if (isManager) return "Manager"
    if (isProductManager) return "Product Manager"
    if (isEmployee) return "Employee"
    if (authRole === "Hr" || authRole === "HrManager") return "HR"
    if (authRole === "Manager") return "Manager"
    if (authRole === "ProductManager") return "Product Manager"
    if (authRole === "Employee") return "Employee"
    return "Team Lead"
  })

  const [activeTab, setActiveTab] = useState<FormTabType>(() => {
    if (urlType === "wfh" || initialFormType === "wfh") return "wfh"
    return "leave"
  })

  useEffect(() => {
    if (urlType === "wfh") {
      setActiveTab("wfh")
    } else if (urlType === "leave") {
      setActiveTab("leave")
    }
  }, [urlType])

  const handleTabChange = (tab: FormTabType) => {
    setActiveTab(tab)
    router.replace(`${basePath}?tab=${tab === "wfh" ? "request-wfh" : "apply-leave"}`, { scroll: false })
  }

  return (
    <div className="w-full flex-1 p-3 sm:p-4 md:p-6 pb-16 sm:pb-8 flex flex-col gap-4 sm:gap-5 max-w-[1600px] mx-auto animate-in fade-in duration-200 min-w-0">
      <Toaster position="top-right" />

      <AttendanceBanner onBack={() => router.push(basePath)} />

      <AttendanceFormTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        {activeTab === "leave" ? (
          <>
            <div className="lg:col-span-2">
              <ApplyLeaveFormCard
                currentRole={selectedRole}
                onRoleChange={setSelectedRole}
              />
            </div>
            <div className="lg:col-span-1">
              <CurrentLeaveBalanceCard role={selectedRole} />
            </div>
          </>
        ) : (
          <>
            <div className="lg:col-span-2">
              <RequestWfhFormCard
                currentRole={selectedRole}
                onRoleChange={setSelectedRole}
              />
            </div>
            <div className="lg:col-span-1">
              <WfhGuidelinesCard role={selectedRole} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
