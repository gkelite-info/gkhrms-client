"use client"

import React from "react"
import {
  House,
  User,
  UsersThree,
  CurrencyCircleDollar,
  Buildings,
  TrendUp,
  ChatCircleDots,
} from "phosphor-react"
import ReusableSidebar, {
  ReusableSidebarItem,
} from "../../../reusableComponents/ReusableSidebar"

export const employeeNavItems: ReusableSidebarItem[] = [
  { label: "Home", href: "/employee", icon: House, exact: true },
  { label: "Attendance", href: "/employee/attendance", icon: UsersThree },
  { label: "Me", href: "/employee/me", icon: User },
  { label: "My Team", href: "/employee/myteam", icon: UsersThree },
  {
    label: "Finance & Payroll",
    href: "/employee/finance",
    icon: CurrencyCircleDollar,
  },
  { label: "Org", href: "/employee/org", icon: Buildings },
  { label: "Performance", href: "/employee/performance", icon: TrendUp },
  { label: "Engage", href: "/employee/engage", icon: ChatCircleDots },
]

export interface EmployeeNavbarProps {
  className?: string
}

export default function EmployeeNavbar({ className = "" }: EmployeeNavbarProps) {
  const isEmployeeItemActive = (
    item: ReusableSidebarItem,
    currentPath: string
  ): boolean => {
    if (item.href === "/employee/attendance") {
      return (
        currentPath.startsWith("/employee/attendance") ||
        currentPath.startsWith("/employee/apply-leave") ||
        currentPath.startsWith("/employee/request-wfh") ||
        currentPath.startsWith("/employee/requests") ||
        currentPath.startsWith("/employee/exception-history") ||
        currentPath.startsWith("/employee/member")
      )
    }
    if (item.exact) {
      return currentPath === item.href
    }
    return currentPath === item.href || currentPath.startsWith(`${item.href}/`)
  }

  return (
    <ReusableSidebar
      items={employeeNavItems}
      toggleEventName="toggle-employee-sidebar"
      closeEventName="close-employee-sidebar"
      isItemActive={isEmployeeItemActive}
      desktopWidthClass="w-[210px] min-w-[210px]"
      drawerWidthClass="w-[240px]"
      activeColorClass="bg-[#5B50EC] text-white shadow-sm ring-1 ring-[#5B50EC]/30"
      inactiveColorClass="text-[#4B5563] hover:text-[#5B50EC] hover:bg-[#F3F2FD]"
      footerText="Powered by GK Elite"
      className={className}
    />
  )
}
