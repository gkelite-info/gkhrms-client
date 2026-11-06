"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  User,
  UsersThree,
  Article,
  ClockCounterClockwise,
  Plus,
  CaretDown,
} from "phosphor-react"
import AttendanceActionDropdownMenu from "../../teamlead/components/attendance-forms/AttendanceActionDropdownMenu"

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
  onApplyException?: () => void
}

export default function ManagerAttendanceTabs({
  activeTab,
  onTabChange,
  showActions = true,
  onApplyLeave,
  onRequestWfh,
  onApplyException,
}: ManagerAttendanceTabsProps) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleApplyLeave = () => {
    setIsMenuOpen(false)
    if (onApplyLeave) onApplyLeave()
    else router.push("/manager/attendance?tab=apply-leave")
  }

  const handleRequestWfh = () => {
    setIsMenuOpen(false)
    if (onRequestWfh) onRequestWfh()
    else router.push("/manager/attendance?tab=request-wfh")
  }

  const handleApplyException = () => {
    setIsMenuOpen(false)
    if (onApplyException) onApplyException()
    else router.push("/manager/attendance?tab=apply-exception")
  }

  const tabs = [
    { key: "my-attendance" as ManagerTabKey, label: "My Attendance", icon: User },
    { key: "team-attendance" as ManagerTabKey, label: "Team Attendance", icon: UsersThree },
    { key: "requests" as ManagerTabKey, label: "Requests", icon: Article },
    { key: "exception-history" as ManagerTabKey, label: "Exception History", icon: ClockCounterClockwise },
  ]

  const handleTabClick = (tabKey: ManagerTabKey) => {
    if (onTabChange) onTabChange(tabKey)
    else router.push(`/manager/attendance?tab=${tabKey}`)
  }

  return (
    <div className="w-full select-none flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
      <div className="overflow-x-auto pb-1 sm:pb-0 scrollbar-hide max-w-full">
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
                <Icon size={16} weight={isActive ? "bold" : "regular"} className="shrink-0" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {showActions && (
        <div className="relative shrink-0 self-start sm:self-auto" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4.5 py-2 rounded-full bg-[#5B50EC] hover:bg-[#4d42e0] text-white text-xs font-semibold shadow-xs cursor-pointer transition-all duration-150 active:scale-95 whitespace-nowrap"
          >
            <Plus size={15} weight="bold" />
            <span>Apply Request</span>
            <CaretDown
              size={13}
              weight="bold"
              className={`transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isMenuOpen && (
            <AttendanceActionDropdownMenu
              onApplyLeave={handleApplyLeave}
              onRequestWfh={handleRequestWfh}
              onApplyException={handleApplyException}
            />
          )}
        </div>
      )}
    </div>
  )
}
