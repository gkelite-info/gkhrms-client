"use client"

import { Users, UsersThree, CurrencyCircleDollar } from "phosphor-react"
import ReusableSidebar, {
  ReusableSidebarItem,
} from "../reusableComponents/ReusableSidebar"

export const hrManagerNavItems: ReusableSidebarItem[] = [
  { label: "User Management", href: "/hrmanager", icon: Users },
  { label: "Attendance", href: "/hrmanager/attendance", icon: UsersThree },
  {
    label: "Finance & Payroll",
    href: "/hrmanager/finance",
    icon: CurrencyCircleDollar,
  },
]

export default function HrManagerSidebar() {
  const isHrManagerItemActive = (
    item: ReusableSidebarItem,
    currentPath: string
  ): boolean => {
    if (item.href === "/hrmanager/attendance") {
      return (
        currentPath.startsWith("/hrmanager/attendance") ||
        currentPath.startsWith("/hrmanager/apply-leave") ||
        currentPath.startsWith("/hrmanager/request-wfh") ||
        currentPath.startsWith("/hrmanager/requests") ||
        currentPath.startsWith("/hrmanager/exception-history") ||
        currentPath.startsWith("/hrmanager/member")
      )
    }
    if (item.href === "/hrmanager/finance") {
      return currentPath.startsWith("/hrmanager/finance")
    }
    if (item.href === "/hrmanager") {
      return (
        currentPath === "/hrmanager" ||
        (currentPath.startsWith("/hrmanager") &&
          !currentPath.includes("/attendance") &&
          !currentPath.includes("/apply-leave") &&
          !currentPath.includes("/request-wfh") &&
          !currentPath.includes("/requests") &&
          !currentPath.includes("/exception-history") &&
          !currentPath.includes("/member") &&
          !currentPath.includes("/finance"))
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
