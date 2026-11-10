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
import ApplyExceptionFormCard from "./ApplyExceptionFormCard"
import ExceptionGuidelinesCard from "./ExceptionGuidelinesCard"

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

  const isTechAdmin = pathname?.startsWith("/techadmin") || (authRole as string) === "TechAdmin"
  const isAccountantManager = pathname?.startsWith("/accountantmanager") || (authRole as string) === "AccountantManager" || (authRole as string) === "Accountant"
  const isAccountantExecutive = pathname?.startsWith("/accountantexecutive") || (authRole as string) === "AccountantExecutive"
  const isFinanceExecutive = pathname?.startsWith("/financeexecutive")
  const isFinance =
    !isFinanceExecutive && !isAccountantExecutive && !isAccountantManager && !isTechAdmin &&
    (pathname?.startsWith("/financemanager") || pathname?.startsWith("/finance"))
  const isHrManager = pathname?.startsWith("/hrmanager")
  const isHr = !isHrManager && pathname?.startsWith("/hr")
  const isManager = pathname?.startsWith("/manager")
  const isProductManager = pathname?.startsWith("/productmanager")
  const isEmployee = pathname?.startsWith("/employee")
  const basePath = isTechAdmin
    ? "/techadmin/attendance"
    : isAccountantManager
    ? "/accountantmanager/attendance"
    : isAccountantExecutive
    ? "/accountantexecutive/attendance"
    : isFinanceExecutive
    ? "/financeexecutive/attendance"
    : pathname?.startsWith("/financemanager")
    ? "/financemanager/attendance"
    : isFinance
    ? "/financemanager/attendance"
    : isHrManager
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
    if (isTechAdmin || (authRole as string) === "TechAdmin")
      return "Tech Admin"
    if (isAccountantManager || (authRole as string) === "AccountantManager" || (authRole as string) === "Accountant")
      return "Accountant Manager"
    if (isAccountantExecutive || (authRole as string) === "AccountantExecutive")
      return "Accountant Executive"
    if (isFinanceExecutive || authRole === "FinanceExecutive")
      return "Finance Executive"
    if (
      isFinance ||
      (authRole as string) === "Finance" ||
      (authRole as string) === "FinanceManager"
    )
      return "Finance Manager"
    if (isHrManager || authRole === "HrManager") return "HR Manager"
    if (isHr || authRole === "Hr") return "HR"
    if (isManager || authRole === "Manager") return "Manager"
    if (isProductManager || authRole === "ProductManager") return "Product Manager"
    if (isEmployee || authRole === "Employee") return "Employee"
    return "Team Lead"
  })

  const [activeTab, setActiveTab] = useState<FormTabType>(() => {
    if (urlType === "exception" || initialFormType === "exception") return "exception"
    if (urlType === "wfh" || initialFormType === "wfh") return "wfh"
    return "leave"
  })

  useEffect(() => {
    if (urlType === "exception") {
      setActiveTab("exception")
    } else if (urlType === "wfh") {
      setActiveTab("wfh")
    } else if (urlType === "leave") {
      setActiveTab("leave")
    }
  }, [urlType])

  const handleTabChange = (tab: FormTabType) => {
    setActiveTab(tab)
    const tabQuery =
      tab === "exception"
        ? "apply-exception"
        : tab === "wfh"
        ? "request-wfh"
        : "apply-leave"
    router.replace(`${basePath}?tab=${tabQuery}`, { scroll: false })
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
        ) : activeTab === "wfh" ? (
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
        ) : (
          <>
            <div className="lg:col-span-2">
              <ApplyExceptionFormCard
                currentRole={selectedRole}
                onRoleChange={setSelectedRole}
              />
            </div>
            <div className="lg:col-span-1">
              <ExceptionGuidelinesCard role={selectedRole} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
