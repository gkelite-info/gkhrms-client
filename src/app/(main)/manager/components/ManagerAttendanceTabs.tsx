"use client"

import { useRouter } from "next/navigation"
import {
  User,
  UsersThree,
  Article,
  ClockCounterClockwise,
} from "phosphor-react"

export type ManagerTabKey =
  | "my-attendance"
  | "team-attendance"
  | "requests"
  | "my-requests"
  | "tl-wise-attendance"
  | "exception-history"

interface ManagerAttendanceTabsProps {
  activeTab: ManagerTabKey
  onTabChange?: (tab: ManagerTabKey) => void
  showActions?: boolean
  onApplyLeave?: () => void
  onRequestWfh?: () => void
}

export default function ManagerAttendanceTabs({
  activeTab,
  onTabChange,
  showActions = true,
  onApplyLeave,
  onRequestWfh,
}: ManagerAttendanceTabsProps) {
  const router = useRouter()

  const tabs = [
    {
      key: "my-attendance" as ManagerTabKey,
      label: "My Attendance",
      icon: User,
    },
    {
      key: "team-attendance" as ManagerTabKey,
      label: "Team Attendance",
      icon: UsersThree,
    },
    {
      key: "requests" as ManagerTabKey,
      label: "Requests",
      icon: Article,
    },
    {
      key: "exception-history" as ManagerTabKey,
      label: "Exception History",
      icon: ClockCounterClockwise,
    },
  ]

  const handleTabClick = (tabKey: ManagerTabKey) => {
    if (onTabChange) {
      onTabChange(tabKey)
    } else {
      router.push(`/manager/attendance?tab=${tabKey}`)
    }
  }

  return (
    <div className="w-full select-none flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 min-w-0">
      <div className="overflow-x-auto pb-1 lg:pb-0 scrollbar-hide max-w-full">
        <div className="bg-white rounded-full p-1 shadow-xs border border-gray-100 inline-flex items-center gap-1 sm:gap-1.5 shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive =
              activeTab === tab.key ||
              (tab.key === "requests" && activeTab === "my-requests") ||
              (tab.key === "team-attendance" && activeTab === "tl-wise-attendance")

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleTabClick(tab.key)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-xs transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-[#5B50EC] text-white font-semibold shadow-xs"
                    : "text-[#4B5563] hover:text-[#5B50EC] hover:bg-gray-50/80 font-medium"
                }`}
              >
                <Icon
                  size={16}
                  weight={isActive ? "bold" : "regular"}
                  className="shrink-0"
                />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {showActions && (
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 self-start lg:self-auto overflow-x-auto scrollbar-hide">
          <button
            type="button"
            onClick={() => {
              if (onApplyLeave) {
                onApplyLeave()
              } else {
                router.push("/manager/attendance?tab=apply-leave")
              }
            }}
            className="px-4 sm:px-5 py-2 rounded-xl bg-[#5B50EC] hover:bg-[#4d42e0] text-white text-xs font-semibold shadow-xs cursor-pointer transition-all duration-150 active:scale-95 whitespace-nowrap"
          >
            Apply Leave
          </button>
          <button
            type="button"
            onClick={() => {
              if (onRequestWfh) {
                onRequestWfh()
              } else {
                router.push("/manager/attendance?tab=request-wfh")
              }
            }}
            className="px-4 sm:px-5 py-2 rounded-xl bg-[#5B50EC] hover:bg-[#4d42e0] text-white text-xs font-semibold shadow-xs cursor-pointer transition-all duration-150 active:scale-95 whitespace-nowrap"
          >
            Request WFH
          </button>
        </div>
      )}
    </div>
  )
}
