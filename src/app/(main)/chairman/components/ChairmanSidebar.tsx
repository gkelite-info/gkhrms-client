"use client"

import {
  House,
  CalendarCheck,
  UserList,
  CurrencyDollar,
  UsersThree,
} from "phosphor-react"
import ReusableSidebar, {
  ReusableSidebarItem,
} from "../../../../../reusableComponents/ReusableSidebar"

export const chairmanNavItems: ReusableSidebarItem[] = [
  { label: "Dashboard", href: "/chairman", icon: House, exact: true },
  { label: "My Teams", href: "/chairman/my-team", icon: UsersThree },
  { label: "Attendance", href: "/chairman/attendance", icon: CalendarCheck },
  { label: "Headcount", href: "/chairman/headcount", icon: UserList },
  { label: "Finance", href: "/chairman/finance", icon: CurrencyDollar },
  { label: "User Registration", href: "/chairman/user-registration", icon: UsersThree },
]

export default function ChairmanSidebar() {
  const isChairmanItemActive = (
    item: ReusableSidebarItem,
    currentPath: string
  ): boolean => {
    if (item.href === "/chairman/my-team") {
      return currentPath.startsWith("/chairman/my-team")
    }
    if (item.href === "/chairman/attendance") {
      return (
        currentPath.startsWith("/chairman/attendance") ||
        currentPath.startsWith("/chairman/exception-history") ||
        currentPath.startsWith("/chairman/member")
      )
    }
    if (item.exact || item.href === "/chairman") {
      return (
        currentPath === "/chairman" || currentPath === "/chairman/dashboard"
      )
    }
    return currentPath === item.href || currentPath.startsWith(`${item.href}/`)
  }

  return (
    <ReusableSidebar
      items={chairmanNavItems}
      toggleEventName="toggle-chairman-sidebar"
      closeEventName="close-chairman-sidebar"
      desktopWidthClass="w-[210px] min-w-[210px] max-w-[210px] shrink-0"
      drawerWidthClass="w-[240px]"
      isItemActive={isChairmanItemActive}
    />
  )
}
