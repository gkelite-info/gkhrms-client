"use client"

import { UsersThree } from "phosphor-react"
import ReusableSidebar, {
  ReusableSidebarItem,
} from "../../../../../reusableComponents/ReusableSidebar"

export const accountantExecutiveNavItems: ReusableSidebarItem[] = [
  { label: "Attendance", href: "/accountantexecutive/attendance", icon: UsersThree },
]

export default function AccountantExecutiveSidebar() {
  const isAccountantExecutiveItemActive = (
    item: ReusableSidebarItem,
    currentPath: string
  ): boolean => {
    if (item.href === "/accountantexecutive/attendance") {
      return (
        currentPath === "/accountantexecutive" ||
        currentPath.startsWith("/accountantexecutive")
      )
    }
    return currentPath === item.href || currentPath.startsWith(`${item.href}/`)
  }

  return (
    <ReusableSidebar
      items={accountantExecutiveNavItems}
      toggleEventName="toggle-accountantexecutive-sidebar"
      closeEventName="close-accountantexecutive-sidebar"
      desktopWidthClass="w-[210px] min-w-[210px] max-w-[210px] shrink-0"
      drawerWidthClass="w-[240px]"
      isItemActive={isAccountantExecutiveItemActive}
    />
  )
}

