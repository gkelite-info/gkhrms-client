"use client"

import { UsersThree } from "phosphor-react"
import ReusableSidebar, {
  ReusableSidebarItem,
} from "../../../../../reusableComponents/ReusableSidebar"

export const asstManagerNavItems: ReusableSidebarItem[] = [
  { label: "Attendance", href: "/asstmanager/attendance", icon: UsersThree },
]

export default function AsstManagerSidebar() {
  const isAsstManagerItemActive = (
    item: ReusableSidebarItem,
    currentPath: string
  ): boolean => {
    if (item.href === "/asstmanager/attendance") {
      return (
        currentPath === "/asstmanager" ||
        currentPath.startsWith("/asstmanager") ||
        currentPath === "/assistantmanager" ||
        currentPath.startsWith("/assistantmanager")
      )
    }
    return currentPath === item.href || currentPath.startsWith(`${item.href}/`)
  }

  return (
    <ReusableSidebar
      items={asstManagerNavItems}
      toggleEventName="toggle-asstmanager-sidebar"
      closeEventName="close-asstmanager-sidebar"
      desktopWidthClass="w-[210px] min-w-[210px] max-w-[210px] shrink-0"
      drawerWidthClass="w-[240px]"
      isItemActive={isAsstManagerItemActive}
    />
  )
}

