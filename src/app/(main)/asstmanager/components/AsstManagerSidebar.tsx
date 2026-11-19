"use client"

import { UsersThree, CurrencyCircleDollar } from "phosphor-react"
import ReusableSidebar, {
  ReusableSidebarItem,
} from "../../../../../reusableComponents/ReusableSidebar"

export const asstManagerNavItems: ReusableSidebarItem[] = [
  { label: "Attendance", href: "/asstmanager/attendance", icon: UsersThree },
  {
    label: "Finance & Payroll",
    href: "/asstmanager/finance",
    icon: CurrencyCircleDollar,
  },
]

export default function AsstManagerSidebar() {
  const isAsstManagerItemActive = (
    item: ReusableSidebarItem,
    currentPath: string
  ): boolean => {
    const isOtherSubRoute = [
      "/asstmanager/finance",
      "/assistantmanager/finance",
    ].some((route) => currentPath === route || currentPath.startsWith(`${route}/`))

    if (item.href === "/asstmanager/attendance") {
      return (
        !isOtherSubRoute &&
        (currentPath === "/asstmanager" ||
          currentPath.startsWith("/asstmanager/attendance") ||
          currentPath.startsWith("/asstmanager/member") ||
          currentPath.startsWith("/asstmanager/apply-leave") ||
          currentPath.startsWith("/asstmanager/request-wfh") ||
          currentPath.startsWith("/asstmanager/requests") ||
          currentPath.startsWith("/asstmanager/exception-history") ||
          currentPath === "/assistantmanager" ||
          currentPath.startsWith("/assistantmanager/attendance"))
      )
    }
    return currentPath === item.href || currentPath.startsWith(`${item.href}/`)
  }

  return (
    <ReusableSidebar
      items={asstManagerNavItems}
      toggleEventName="toggle-asstmanager-sidebar"
      closeEventName="close-asstmanager-sidebar"
      desktopWidthClass="w-[210px] min-w-[210px] max-w-[210px] shrink-0"
      drawerWidthClass="w-[240px]"
      isItemActive={isAsstManagerItemActive}
    />
  )
}

