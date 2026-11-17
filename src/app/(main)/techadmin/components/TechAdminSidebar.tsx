"use client"

import { UsersThree, CurrencyCircleDollar } from "phosphor-react"
import ReusableSidebar, {
  ReusableSidebarItem,
} from "../../../../../reusableComponents/ReusableSidebar"

export const techAdminNavItems: ReusableSidebarItem[] = [
  { label: "Attendance", href: "/techadmin/attendance", icon: UsersThree },
  {
    label: "Finance & Payroll",
    href: "/techadmin/finance",
    icon: CurrencyCircleDollar,
  },
]

export default function TechAdminSidebar() {
  const isTechAdminItemActive = (
    item: ReusableSidebarItem,
    currentPath: string
  ): boolean => {
    if (item.href === "/techadmin/attendance") {
      return (
        currentPath === "/techadmin" ||
        (currentPath.startsWith("/techadmin") &&
          !currentPath.startsWith("/techadmin/finance"))
      )
    }
    return currentPath === item.href || currentPath.startsWith(`${item.href}/`)
  }

  return (
    <ReusableSidebar
      items={techAdminNavItems}
      toggleEventName="toggle-techadmin-sidebar"
      closeEventName="close-techadmin-sidebar"
      desktopWidthClass="w-[210px] min-w-[210px] max-w-[210px] shrink-0"
      drawerWidthClass="w-[240px]"
      isItemActive={isTechAdminItemActive}
    />
  )
}

