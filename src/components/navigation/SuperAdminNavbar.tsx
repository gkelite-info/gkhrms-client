"use client"

import {
  SquaresFour,
  Buildings,
  CurrencyInr,
} from "phosphor-react"
import ReusableSidebar, {
  ReusableSidebarItem,
} from "../../../reusableComponents/ReusableSidebar"

export const superAdminNavItems: ReusableSidebarItem[] = [
  { label: "Dashboard", href: "/superadmin", icon: SquaresFour, exact: true },
  { label: "Companies", href: "/superadmin/companies", icon: Buildings },
  { label: "Finance", href: "/superadmin/finance", icon: CurrencyInr },
]

export default function SuperAdminNavbar() {
  const isSuperAdminItemActive = (
    item: ReusableSidebarItem,
    currentPath: string
  ): boolean => {
    if (item.exact || item.href === "/superadmin") {
      return currentPath === "/superadmin"
    }
    return currentPath === item.href || currentPath.startsWith(`${item.href}/`)
  }

  return (
    <ReusableSidebar
      items={superAdminNavItems}
      toggleEventName="toggle-superadmin-sidebar"
      closeEventName="close-superadmin-sidebar"
      desktopWidthClass="w-[210px] min-w-[210px] max-w-[210px] shrink-0"
      drawerWidthClass="w-[240px]"
      isItemActive={isSuperAdminItemActive}
    />
  )
}
