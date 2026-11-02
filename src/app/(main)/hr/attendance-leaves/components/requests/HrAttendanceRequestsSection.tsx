"use client"

import { useMemo } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { ClipboardText, UsersThree, FileText } from "phosphor-react"
import ManagerRequestsSection from "@/app/(main)/manager/components/requests/ManagerRequestsSection"
import TeamLeadMyRequestsSection from "@/app/(main)/teamlead/components/my-requests/TeamLeadMyRequestsSection"
import { INITIAL_MANAGER_REQUESTS } from "@/app/(main)/manager/data/managerRequestsData"
import { initialMyRequests } from "@/app/(main)/teamlead/components/my-requests/myRequestsData"

export type HrRequestsSubtabKey = "employee-requests" | "my-requests"

export default function HrAttendanceRequestsSection() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const tabParam = searchParams.get("tab")
  const subtabParam = searchParams.get("subtab")

  const activeSubtab: HrRequestsSubtabKey = useMemo(() => {
    if (tabParam === "my-requests" || subtabParam === "my-requests") {
      return "my-requests"
    }
    return "employee-requests"
  }, [tabParam, subtabParam])

  const handleSubtabChange = (subtab: HrRequestsSubtabKey) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", "attendance-requests")
    params.set("subtab", subtab)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const employeeRequestsCount = INITIAL_MANAGER_REQUESTS.length
  const myRequestsCount = initialMyRequests.length

  const subtabs: {
    id: HrRequestsSubtabKey
    label: string
    icon: typeof UsersThree
    count: number
  }[] = [
    {
      id: "employee-requests",
      label: "Employee Requests",
      icon: UsersThree,
      count: employeeRequestsCount,
    },
    {
      id: "my-requests",
      label: "My Requests",
      icon: FileText,
      count: myRequestsCount,
    },
  ]

  return (
    <div className="flex flex-col gap-4 sm:gap-5 w-full min-w-0">
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex items-center justify-between gap-4 min-w-0 transition-all">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
            <ClipboardText size={24} weight="bold" />
          </div>
          <div className="flex flex-col min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight break-words">
              Attendance Requests
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5 break-words">
              Review and manage leave and work from home requests across the organization.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full border-b border-gray-200 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-6 min-w-max pb-0.5">
          {subtabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeSubtab === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSubtabChange(tab.id)}
                className={`flex items-center gap-2 pb-3 pt-1 text-xs sm:text-sm font-semibold transition-all cursor-pointer border-b-2 -mb-[2px] ${
                  isActive
                    ? "border-[#5B50EC] text-[#5B50EC] font-bold"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                <Icon
                  size={16}
                  weight={isActive ? "fill" : "bold"}
                  className={isActive ? "text-[#5B50EC]" : "text-gray-400"}
                />
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                    isActive
                      ? "bg-[#EEF2FF] text-[#5B50EC]"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {activeSubtab === "employee-requests" ? (
        <ManagerRequestsSection hideSubtabs={true} />
      ) : (
        <TeamLeadMyRequestsSection hideHeader={true} />
      )}
    </div>
  )
}

