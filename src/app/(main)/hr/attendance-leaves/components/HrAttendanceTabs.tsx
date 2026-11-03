"use client"

import { useRouter } from "next/navigation"
import {
  User,
  UsersThree,
  ClipboardText,
  ClockCounterClockwise,
} from "phosphor-react"

export type HrAttendanceTab =
  | "my-attendance"
  | "organization-attendance"
  | "attendance-requests"
  | "my-requests"
  | "exception-history"
  | "apply-leave"
  | "request-wfh"

interface HrAttendanceTabsProps {
  activeTab: HrAttendanceTab
  onTabChange: (tab: HrAttendanceTab) => void
  showActions?: boolean
  onApplyLeave?: () => void
  onRequestWfh?: () => void
}

export default function HrAttendanceTabs({
  activeTab,
  onTabChange,
  showActions = true,
  onApplyLeave,
  onRequestWfh,
}: HrAttendanceTabsProps) {
  const router = useRouter()

  const tabs = [
    {
      id: "my-attendance" as const,
      label: "My Attendance",
      icon: User,
    },
    {
      id: "organization-attendance" as const,
      label: "Organization Attendance",
      icon: UsersThree,
    },
    {
      id: "attendance-requests" as const,
      label: "Attendance Requests",
      icon: ClipboardText,
    },
    {
      id: "exception-history" as const,
      label: "Exception History",
      icon: ClockCounterClockwise,
    },
  ]

  return (
    <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-3">
      <div className="overflow-x-auto scrollbar-hide py-1 flex-1 min-w-0">
        <div className="flex items-center gap-2 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive =
              activeTab === tab.id ||
              (tab.id === "attendance-requests" && activeTab === "my-requests")

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#5B50EC] text-white shadow-sm ring-1 ring-[#5B50EC]/30"
                    : "bg-white text-gray-600 hover:text-[#5B50EC] hover:bg-[#F3F2FD] border border-gray-100"
                }`}
              >
                <Icon
                  size={16}
                  weight={isActive ? "fill" : "bold"}
                  className={isActive ? "text-white" : "text-gray-400"}
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
                router.push("/hr/attendance?tab=apply-leave")
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
                router.push("/hr/attendance?tab=request-wfh")
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
