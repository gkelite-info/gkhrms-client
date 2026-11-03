"use client"

import { UsersThree } from "phosphor-react"
import ReusableSidebar, {
  ReusableSidebarItem,
} from "../reusableComponents/ReusableSidebar"

export const productManagerNavItems: ReusableSidebarItem[] = [
  { label: "Attendance", href: "/productmanager/attendance", icon: UsersThree },
]

export default function ProductManagerSidebar() {
  const isProductManagerItemActive = (
    item: ReusableSidebarItem,
    currentPath: string
  ): boolean => {
    if (item.href === "/productmanager/attendance") {
      return (
        currentPath === "/productmanager" ||
        currentPath.startsWith("/productmanager/attendance") ||
        currentPath.startsWith("/productmanager/member") ||
        currentPath.startsWith("/productmanager")
      )
    }
    return currentPath === item.href || currentPath.startsWith(`${item.href}/`)
  }

  return (
    <ReusableSidebar
      items={productManagerNavItems}
      toggleEventName="toggle-productmanager-sidebar"
      closeEventName="close-productmanager-sidebar"
      isItemActive={isProductManagerItemActive}
    />
  )
}
