"use client"

import {
  House,
  User,
  CurrencyCircleDollar,
  Timer,
  ChartBar,
  UsersThree,
} from "phosphor-react"
import ReusableSidebar, {
  ReusableSidebarItem,
} from "../reusableComponents/ReusableSidebar"

export const hrNavItems: ReusableSidebarItem[] = [
  { label: "Home", href: "/hr", icon: House },
  { label: "Workforce", href: "/hr/workforce", icon: User },
  {
    label: "Payroll & Compliance",
    href: "/hr/payrole-compliance",
    icon: CurrencyCircleDollar,
  },
  { label: "Attendance", href: "/hr/attendance", icon: UsersThree },
  {
    label: "Engagement & Culture",
    href: "/hr/engagement-culture",
    icon: Timer,
  },
  {
    label: "Analytics & Reports",
    href: "/hr/analytics-reports",
    icon: ChartBar,
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
        currentPath.startsWith("/hr/attendance-leaves")
      )
    }
    return currentPath === item.href || currentPath.startsWith(`${item.href}/`)
  }

  return (
    <ReusableSidebar
      items={hrNavItems}
      toggleEventName="toggle-hr-sidebar"
      closeEventName="close-hr-sidebar"
      isItemActive={isHrItemActive}
    />
  )
}
