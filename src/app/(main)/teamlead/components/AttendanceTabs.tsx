"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  User,
  UsersThree,
  Article,
  ClockCounterClockwise,
  Plus,
  CaretDown,
} from "phosphor-react"
import AttendanceActionDropdownMenu from "./attendance-forms/AttendanceActionDropdownMenu"

export type TabKey =
  | "my-attendance"
  | "team-attendance"
  | "requests"
  | "my-requests"
  | "exception-history"

interface AttendanceTabsProps {
  activeTab: TabKey
  onTabChange?: (tab: TabKey) => void
  showActions?: boolean
  onApplyLeave?: () => void
  onRequestWfh?: () => void
  onApplyException?: () => void
  basePath?: string
}

export default function AttendanceTabs({
  activeTab,
  onTabChange,
  showActions = true,
  onApplyLeave,
  onRequestWfh,
  onApplyException,
  basePath,
}: AttendanceTabsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const isFinance =
    pathname?.startsWith("/financeexecutive") ||
    pathname?.startsWith("/financemanager") ||
    pathname?.startsWith("/finance")
  const isEmployee = pathname?.startsWith("/employee")
  const isEmployeeLike = isEmployee || isFinance
  const defaultBasePath = pathname?.startsWith("/financeexecutive")
    ? "/financeexecutive/attendance"
    : pathname?.startsWith("/financemanager")
    ? "/financemanager/attendance"
    : isFinance
    ? "/financemanager/attendance"
    : isEmployee
    ? "/employee/attendance"
    : pathname?.startsWith("/manager")
    ? "/manager/attendance"
    : pathname?.startsWith("/productmanager")
    ? "/productmanager/attendance"
    : "/teamlead/attendance"
  const targetBasePath = basePath || defaultBasePath

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
    else router.push(`${targetBasePath}?tab=apply-leave`)
  }

  const handleRequestWfh = () => {
    setIsMenuOpen(false)
    if (onRequestWfh) onRequestWfh()
    else router.push(`${targetBasePath}?tab=request-wfh`)
  }

  const handleApplyException = () => {
    setIsMenuOpen(false)
    if (onApplyException) onApplyException()
    else router.push(`${targetBasePath}?tab=apply-exception`)
  }

  const allTabs = [
    { key: "my-attendance" as TabKey, label: "My Attendance", icon: User },
    { key: "team-attendance" as TabKey, label: "Team Attendance", icon: UsersThree },
    { key: "requests" as TabKey, label: "Requests", icon: Article },
    { key: "exception-history" as TabKey, label: "Exception History", icon: ClockCounterClockwise },
  ]

  const tabs = isEmployeeLike
    ? allTabs.filter((tab) => tab.key !== "team-attendance")
    : allTabs

  const handleTabClick = (tabKey: TabKey) => {
    if (onTabChange) onTabChange(tabKey)
    else router.push(`${targetBasePath}?tab=${tabKey}`)
  }

  return (
    <div className="w-full select-none flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
      <div className="overflow-x-auto pb-1 sm:pb-0 scrollbar-hide max-w-full">
        <div className="bg-white rounded-full p-1 shadow-xs border border-gray-100 inline-flex items-center gap-1 sm:gap-1.5 shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.key || (tab.key === "requests" && activeTab === "my-requests")

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
