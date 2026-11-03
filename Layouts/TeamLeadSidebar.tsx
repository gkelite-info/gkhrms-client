"use client"

import { UsersThree, User, ChartLineUp } from "phosphor-react"
import ReusableSidebar, {
  ReusableSidebarItem,
} from "../reusableComponents/ReusableSidebar"

export const teamLeadNavItems: ReusableSidebarItem[] = [
  { label: "Attendance", href: "/teamlead/attendance", icon: UsersThree },
  { label: "Performance", href: "/teamlead/performance", icon: ChartLineUp },
  { label: "Profile", href: "/teamlead/profile", icon: User },
]

export default function TeamLeadSidebar() {
  const isTeamLeadItemActive = (
    item: ReusableSidebarItem,
    currentPath: string
  ): boolean => {
    const isOtherSubRoute = [
      "/teamlead/performance",
      "/teamlead/profile",
    ].some((route) => currentPath === route || currentPath.startsWith(`${route}/`))

    if (item.href === "/teamlead/attendance") {
      return (
        !isOtherSubRoute &&
        (currentPath === "/teamlead" ||
          currentPath.startsWith("/teamlead/attendance") ||
          currentPath.startsWith("/teamlead/member") ||
          currentPath.startsWith("/teamlead/apply-leave") ||
          currentPath.startsWith("/teamlead/request-wfh") ||
          currentPath.startsWith("/teamlead/requests") ||
          currentPath.startsWith("/teamlead/exception-history"))
      )
    }

    return currentPath === item.href || currentPath.startsWith(`${item.href}/`)
  }

  return (
    <ReusableSidebar
      items={teamLeadNavItems}
      toggleEventName="toggle-teamlead-sidebar"
      closeEventName="close-teamlead-sidebar"
      isItemActive={isTeamLeadItemActive}
    />
  )
}
