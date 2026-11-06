"use client"

import {
  House,
  User,
  UsersThree,
  Laptop,
  CurrencyCircleDollar,
  CalendarBlank,
  ArrowsLeftRight,
  Buildings,
  ChartBar,
  ChatCircleDots,
} from "phosphor-react"
import ReusableSidebar, {
  ReusableSidebarItem,
} from "../reusableComponents/ReusableSidebar"

export const hrNavItems: ReusableSidebarItem[] = [
  { label: "Home", href: "/hr", icon: House, exact: true },
  { label: "Me", href: "/hr/me", icon: User },
  { label: "My Team", href: "/hr/myteam", icon: UsersThree },
  { label: "Workforce", href: "/hr/workforce", icon: Laptop },
  {
    label: "Finance & Payroll",
    href: "/hr/finance",
    icon: CurrencyCircleDollar,
  },
  { label: "Attendance", href: "/hr/attendance", icon: UsersThree },
  {
    label: "Automation & Integration",
    href: "/hr/integration-automation",
    icon: ArrowsLeftRight,
  },
  { label: "Org", href: "/hr/org", icon: Buildings },
  {
    label: "Analytics & Reports",
    href: "/hr/analytics-reports",
    icon: ChartBar,
  },
  {
    label: "Engage",
    href: "/hr/engage",
    icon: ChatCircleDots,
  },
]

export default function HrSidebar() {
  const isHrItemActive = (
    item: ReusableSidebarItem,
    currentPath: string
  ): boolean => {
    if (item.href === "/hr") {
      return currentPath === "/hr" || currentPath === "/"
    }
    if (item.href === "/hr/attendance") {
      return (
        currentPath === "/hr/attendance" ||
        currentPath.startsWith("/hr/attendance") ||
        currentPath.startsWith("/hr/attendance-leaves") ||
        currentPath.startsWith("/hr/member") ||
        currentPath.startsWith("/hr/apply-leave") ||
        currentPath.startsWith("/hr/request-wfh") ||
        currentPath.startsWith("/hr/requests") ||
        currentPath.startsWith("/hr/exception-history")
      )
    }
    if (item.href === "/hr/finance") {
      return (
        currentPath.startsWith("/hr/finance") ||
        currentPath.startsWith("/hr/payrole-compliance")
      )
    }
    if (item.href === "/hr/engage") {
      return (
        currentPath.startsWith("/hr/engage") ||
        currentPath.startsWith("/hr/engagement-culture")
      )
    }
    if (item.href === "/hr/integration-automation") {
      return (
        currentPath.startsWith("/hr/integration-automation") ||
        currentPath.startsWith("/admin/integration-automation")
      )
    }
    if (item.href === "/hr/org") {
      return (
        currentPath.startsWith("/hr/org") ||
        currentPath.startsWith("/employee/org")
      )
    }
    return currentPath === item.href || currentPath.startsWith(`${item.href}/`)
  }

  return (
    <ReusableSidebar
      items={hrNavItems}
      toggleEventName="toggle-hr-sidebar"
      closeEventName="close-hr-sidebar"
      desktopWidthClass="w-[210px] min-w-[210px] max-w-[210px] shrink-0"
      drawerWidthClass="w-[240px]"
      isItemActive={isHrItemActive}
    />
  )
}
