"use client"

import { UsersThree, User, CurrencyCircleDollar } from "phosphor-react"
import ReusableSidebar, {
  ReusableSidebarItem,
} from "../reusableComponents/ReusableSidebar"

export const managerNavItems: ReusableSidebarItem[] = [
  { label: "Attendance", href: "/manager/attendance", icon: UsersThree },
  {
    label: "Finance & Payroll",
    href: "/manager/finance",
    icon: CurrencyCircleDollar,
  },
  { label: "Profile", href: "/manager/profile", icon: User },
]

export default function ManagerSidebar() {
  const isManagerItemActive = (
    item: ReusableSidebarItem,
    currentPath: string
  ): boolean => {
    const isOtherSubRoute = [
      "/manager/profile",
      "/manager/finance",
    ].some((route) => currentPath === route || currentPath.startsWith(`${route}/`))

    if (item.href === "/manager/attendance") {
      return (
        !isOtherSubRoute &&
        (currentPath === "/manager" ||
          currentPath.startsWith("/manager/attendance") ||
          currentPath.startsWith("/manager/member") ||
          currentPath.startsWith("/manager/apply-leave") ||
          currentPath.startsWith("/manager/request-wfh") ||
          currentPath.startsWith("/manager/requests") ||
          currentPath.startsWith("/manager/pending-approvals") ||
          currentPath.startsWith("/manager/my-team") ||
          currentPath.startsWith("/manager/inbox") ||
          currentPath.startsWith("/manager/reports"))
      )
    }

    return currentPath === item.href || currentPath.startsWith(`${item.href}/`)
  }

  return (
    <ReusableSidebar
      items={managerNavItems}
      toggleEventName="toggle-manager-sidebar"
      closeEventName="close-manager-sidebar"
      desktopWidthClass="w-[210px] min-w-[210px] max-w-[210px] shrink-0"
      drawerWidthClass="w-[240px]"
      isItemActive={isManagerItemActive}
    />
  )
}
