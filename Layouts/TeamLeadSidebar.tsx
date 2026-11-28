"use client"

import { UsersThree, User, ChartLineUp, CurrencyCircleDollar } from "phosphor-react"
import ReusableSidebar, {
  ReusableSidebarItem,
} from "../reusableComponents/ReusableSidebar"

export const teamLeadNavItems: ReusableSidebarItem[] = [
  { label: "My Team", href: "/teamlead/my-team", icon: UsersThree },
  { label: "Attendance", href: "/teamlead/attendance", icon: UsersThree },
  { label: "Performance", href: "/teamlead/performance", icon: ChartLineUp },
  {
    label: "Finance & Payroll",
    href: "/teamlead/finance",
    icon: CurrencyCircleDollar,
  },
  { label: "Profile", href: "/teamlead/profile", icon: User },
]

export default function TeamLeadSidebar() {
  const isTeamLeadItemActive = (
    item: ReusableSidebarItem,
    currentPath: string
  ): boolean => {
    const isOtherSubRoute = [
      "/teamlead/my-team",
      "/teamlead/myteam",
      "/teamlead/performance",
      "/teamlead/finance",
      "/teamlead/profile",
    ].some((route) => currentPath === route || currentPath.startsWith(`${route}/`))

    if (item.href === "/teamlead/my-team") {
      return (
        currentPath === "/teamlead/my-team" ||
        currentPath.startsWith("/teamlead/my-team/") ||
        currentPath === "/teamlead/myteam" ||
        currentPath.startsWith("/teamlead/myteam/")
      )
    }

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
      desktopWidthClass="w-[210px] min-w-[210px] max-w-[210px] shrink-0"
      drawerWidthClass="w-[240px]"
      isItemActive={isTeamLeadItemActive}
    />
  )
}
