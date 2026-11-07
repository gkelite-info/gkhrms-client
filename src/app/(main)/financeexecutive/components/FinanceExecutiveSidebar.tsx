"use client"

import { UsersThree } from "phosphor-react"
import ReusableSidebar, {
  ReusableSidebarItem,
} from "../../../../../reusableComponents/ReusableSidebar"

export const financeExecutiveNavItems: ReusableSidebarItem[] = [
  { label: "Attendance", href: "/financeexecutive/attendance", icon: UsersThree },
]

export default function FinanceExecutiveSidebar() {
  const isFinanceExecutiveItemActive = (
    item: ReusableSidebarItem,
    currentPath: string
  ): boolean => {
    if (item.href === "/financeexecutive/attendance") {
      return (
        currentPath === "/financeexecutive" ||
        currentPath.startsWith("/financeexecutive")
      )
    }
    return currentPath === item.href || currentPath.startsWith(`${item.href}/`)
  }

  return (
    <ReusableSidebar
      items={financeExecutiveNavItems}
      toggleEventName="toggle-financeexecutive-sidebar"
      closeEventName="close-financeexecutive-sidebar"
      desktopWidthClass="w-[210px] min-w-[210px] max-w-[210px] shrink-0"
      drawerWidthClass="w-[240px]"
      isItemActive={isFinanceExecutiveItemActive}
    />
  )
}

