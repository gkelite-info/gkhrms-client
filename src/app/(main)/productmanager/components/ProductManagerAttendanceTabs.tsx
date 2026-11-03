"use client"

import { useRouter } from "next/navigation"
import {
  User,
  UsersThree,
  Article,
  ClockCounterClockwise,
} from "phosphor-react"

export type ProductManagerTabKey =
  | "my-attendance"
  | "team-attendance"
  | "requests"
  | "my-requests"
  | "exception-history"

interface ProductManagerAttendanceTabsProps {
  activeTab: ProductManagerTabKey
  onTabChange?: (tab: ProductManagerTabKey) => void
  showActions?: boolean
  onApplyLeave?: () => void
  onRequestWfh?: () => void
}

export default function ProductManagerAttendanceTabs({
  activeTab,
  onTabChange,
  showActions = true,
  onApplyLeave,
  onRequestWfh,
}: ProductManagerAttendanceTabsProps) {
  const router = useRouter()

  const tabs = [
    {
      key: "my-attendance" as ProductManagerTabKey,
      label: "My Attendance",
      icon: User,
    },
    {
      key: "team-attendance" as ProductManagerTabKey,
      label: "Team Attendance",
      icon: UsersThree,
    },
    {
      key: "requests" as ProductManagerTabKey,
      label: "Requests",
      icon: Article,
    },
    {
      key: "exception-history" as ProductManagerTabKey,
      label: "Exception History",
      icon: ClockCounterClockwise,
    },
  ]

  const handleTabClick = (tabKey: ProductManagerTabKey) => {
    if (onTabChange) {
      onTabChange(tabKey)
    } else {
      router.push(`/productmanager/attendance?tab=${tabKey}`)
    }
  }

  const handleApplyLeave = () => {
    if (onApplyLeave) {
      onApplyLeave()
    } else {
      router.push("/productmanager/attendance?tab=apply-leave")
    }
  }

  const handleRequestWfh = () => {
    if (onRequestWfh) {
      onRequestWfh()
    } else {
      router.push("/productmanager/attendance?tab=request-wfh")
    }
  }

  return (
    <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-3">
      <div className="overflow-x-auto scrollbar-hide py-1 flex-1 min-w-0">
        <div className="flex items-center gap-2 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive =
              activeTab === tab.key ||
              (tab.key === "requests" && activeTab === "my-requests")

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleTabClick(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#5B50EC] text-white shadow-sm shadow-[#5B50EC]/30"
                    : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent shadow-xs"
                }`}
              >
                <Icon size={16} weight={isActive ? "fill" : "regular"} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {showActions && (
        <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-auto">
          <button
            type="button"
            onClick={handleApplyLeave}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#5B50EC] hover:bg-[#4d42df] shadow-xs hover:shadow transition-all duration-150 cursor-pointer active:scale-95 whitespace-nowrap"
          >
            Apply Leave
          </button>
          <button
            type="button"
            onClick={handleRequestWfh}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#5B50EC] hover:bg-[#4d42df] shadow-xs hover:shadow transition-all duration-150 cursor-pointer active:scale-95 whitespace-nowrap"
          >
            Request WFH
          </button>
        </div>
      )}
    </div>
  )
}
