"use client"

import { UsersThree } from "phosphor-react"
import ReusableSidebar, {
  ReusableSidebarItem,
} from "../reusableComponents/ReusableSidebar"

export const hrManagerNavItems: ReusableSidebarItem[] = [
  { label: "Attendance", href: "/hrmanager/attendance", icon: UsersThree },
]

export default function HrManagerSidebar() {
  const isHrManagerItemActive = (
    item: ReusableSidebarItem,
    currentPath: string
  ): boolean => {
    if (item.href === "/hrmanager/attendance") {
      return (
        currentPath === "/hrmanager" ||
        currentPath.startsWith("/hrmanager/attendance") ||
        currentPath.startsWith("/hrmanager/apply-leave") ||
        currentPath.startsWith("/hrmanager/request-wfh") ||
        currentPath.startsWith("/hrmanager/requests") ||
        currentPath.startsWith("/hrmanager/exception-history") ||
        currentPath.startsWith("/hrmanager/member")
      )
    }
    return currentPath === item.href || currentPath.startsWith(`${item.href}/`)
  }

  return (
    <ReusableSidebar
      items={hrManagerNavItems}
      toggleEventName="toggle-hrmanager-sidebar"
      closeEventName="close-hrmanager-sidebar"
      desktopWidthClass="w-[210px] min-w-[210px] max-w-[210px] shrink-0"
      drawerWidthClass="w-[240px]"
      isItemActive={isHrManagerItemActive}
    />
  )
}
