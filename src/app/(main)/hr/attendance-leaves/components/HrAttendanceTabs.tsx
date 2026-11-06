"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  User,
  UsersThree,
  ClipboardText,
  ClockCounterClockwise,
  Plus,
  CaretDown,
} from "phosphor-react"
import HrActionDropdownMenu from "./HrActionDropdownMenu"

export type HrAttendanceTab =
  | "my-attendance"
  | "organization-attendance"
  | "attendance-requests"
  | "my-requests"
  | "exception-history"
  | "apply-leave"
  | "request-wfh"
  | "apply-exception"
  | "regularize"

interface HrAttendanceTabsProps {
  activeTab: HrAttendanceTab
  onTabChange: (tab: HrAttendanceTab) => void
  showActions?: boolean
  onApplyLeave?: () => void
  onRequestWfh?: () => void
  onApplyException?: () => void
  basePath?: string
}

export default function HrAttendanceTabs({
  activeTab,
  onTabChange,
  showActions = true,
  onApplyLeave,
  onRequestWfh,
  onApplyException,
  basePath,
}: HrAttendanceTabsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const effectiveBasePath =
    basePath || (pathname?.startsWith("/hrmanager") ? "/hrmanager/attendance" : "/hr/attendance")

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
    else router.push(`${effectiveBasePath}?tab=apply-leave`)
  }

  const handleRequestWfh = () => {
    setIsMenuOpen(false)
    if (onRequestWfh) onRequestWfh()
    else router.push(`${effectiveBasePath}?tab=request-wfh`)
  }

  const handleApplyException = () => {
    setIsMenuOpen(false)
    if (onApplyException) onApplyException()
    else router.push(`${effectiveBasePath}?tab=apply-exception`)
  }

  const tabs = [
    { id: "my-attendance" as const, label: "My Attendance", icon: User },
    {
      id: "organization-attendance" as const,
      label: "Organization Attendance",
      shortLabel: "Org Attendance",
      icon: UsersThree,
    },
    {
      id: "attendance-requests" as const,
      label: "Attendance Requests",
      shortLabel: "Requests",
      icon: ClipboardText,
    },
    { id: "exception-history" as const, label: "Exception History", icon: ClockCounterClockwise },
  ]

  return (
    <div className="w-full select-none flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
      <div className="overflow-x-auto pb-1 sm:pb-0 scrollbar-hide max-w-full">
        <div className="bg-white rounded-full p-1 shadow-xs border border-gray-100 inline-flex items-center gap-1 sm:gap-1.5 shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive =
              activeTab === tab.id || (tab.id === "attendance-requests" && activeTab === "my-requests")

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-xs transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-[#5B50EC] text-white font-semibold shadow-xs"
                    : "text-[#4B5563] hover:text-[#5B50EC] hover:bg-gray-50/80 font-medium"
                }`}
              >
                <Icon size={16} weight={isActive ? "fill" : "regular"} className="shrink-0" />
                <span className={tab.shortLabel ? "hidden xl:inline" : undefined}>{tab.label}</span>
                {tab.shortLabel && <span className="xl:hidden inline">{tab.shortLabel}</span>}
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
            <HrActionDropdownMenu
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
