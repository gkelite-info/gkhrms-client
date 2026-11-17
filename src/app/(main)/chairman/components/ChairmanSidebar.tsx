"use client"

import { UsersThree, CurrencyDollar } from "phosphor-react"
import ReusableSidebar, {
  ReusableSidebarItem,
} from "../../../../../reusableComponents/ReusableSidebar"

export const chairmanNavItems: ReusableSidebarItem[] = [
  { label: "Attendance", href: "/chairman/attendance", icon: UsersThree },
  { label: "Finance", href: "/chairman/finance", icon: CurrencyDollar },
]

export default function ChairmanSidebar() {
  const isChairmanItemActive = (
    item: ReusableSidebarItem,
    currentPath: string
  ): boolean => {
    if (item.href === "/chairman/attendance") {
      return (
        currentPath === "/chairman" ||
        currentPath.startsWith("/chairman/attendance") ||
        currentPath.startsWith("/chairman/exception-history") ||
        currentPath.startsWith("/chairman/member")
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

