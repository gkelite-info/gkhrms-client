"use client"

import { useMemo } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { UsersThree, FileText } from "phosphor-react"
import ManagerRequestsSection from "@/app/(main)/manager/components/requests/ManagerRequestsSection"
import TeamLeadMyRequestsSection from "@/app/(main)/teamlead/components/my-requests/TeamLeadMyRequestsSection"
import { INITIAL_MANAGER_REQUESTS } from "@/app/(main)/manager/data/managerRequestsData"
import { initialMyRequests } from "@/app/(main)/teamlead/components/my-requests/myRequestsData"

export type ProductRequestsSubtabKey = "team-requests" | "my-requests"

export default function ProductManagerRequestsSection() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const tabParam = searchParams.get("tab")
  const subtabParam = searchParams.get("subtab")

  const activeSubtab: ProductRequestsSubtabKey = useMemo(() => {
    if (tabParam === "my-requests" || subtabParam === "my-requests") {
      return "my-requests"
    }
    return "team-requests"
  }, [tabParam, subtabParam])

  const handleSubtabChange = (subtab: ProductRequestsSubtabKey) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", "requests")
    params.set("subtab", subtab)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const teamRequestsCount = INITIAL_MANAGER_REQUESTS.length
  const myRequestsCount = initialMyRequests.length

  const subtabs = [
    {
      id: "team-requests" as const,
      label: "Product Team Requests",
      icon: UsersThree,
      count: teamRequestsCount,
    },
    {
      id: "my-requests" as const,
      label: "My Requests",
      icon: FileText,
      count: myRequestsCount,
    },
  ]

  return (
    <div className="flex flex-col gap-4 sm:gap-5 w-full min-w-0">
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex items-center justify-between gap-4 min-w-0">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide py-0.5">
          {subtabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeSubtab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSubtabChange(tab.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                  isActive
                    ? "bg-[#5B50EC] text-white shadow-xs"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-100"
                }`}
              >
                <Icon size={16} weight={isActive ? "bold" : "regular"} />
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {activeSubtab === "team-requests" ? (
        <ManagerRequestsSection
          hideSubtabs={true}
          customTitle="Product Team Requests"
        />
      ) : (
        <TeamLeadMyRequestsSection hideHeader={true} />
      )}
    </div>
  )
}
