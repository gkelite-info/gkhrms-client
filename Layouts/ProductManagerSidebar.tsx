"use client"

import { UsersThree, CurrencyCircleDollar } from "phosphor-react"
import ReusableSidebar, {
  ReusableSidebarItem,
} from "../reusableComponents/ReusableSidebar"

export const productManagerNavItems: ReusableSidebarItem[] = [
  { label: "Attendance", href: "/productmanager/attendance", icon: UsersThree },
  {
    label: "Finance & Payroll",
    href: "/productmanager/finance",
    icon: CurrencyCircleDollar,
  },
]

export default function ProductManagerSidebar() {
  const isProductManagerItemActive = (
    item: ReusableSidebarItem,
    currentPath: string
  ): boolean => {
    const isOtherSubRoute = [
      "/productmanager/finance",
    ].some((route) => currentPath === route || currentPath.startsWith(`${route}/`))

    if (item.href === "/productmanager/attendance") {
      return (
        !isOtherSubRoute &&
        (currentPath === "/productmanager" ||
          currentPath.startsWith("/productmanager/attendance") ||
          currentPath.startsWith("/productmanager/member") ||
          currentPath.startsWith("/productmanager/apply-leave") ||
          currentPath.startsWith("/productmanager/request-wfh") ||
          currentPath.startsWith("/productmanager/requests") ||
          currentPath.startsWith("/productmanager/exception-history"))
      )
    }
    return currentPath === item.href || currentPath.startsWith(`${item.href}/`)
  }

  return (
    <ReusableSidebar
      items={productManagerNavItems}
      toggleEventName="toggle-productmanager-sidebar"
      closeEventName="close-productmanager-sidebar"
      desktopWidthClass="w-[210px] min-w-[210px] max-w-[210px] shrink-0"
      drawerWidthClass="w-[240px]"
      isItemActive={isProductManagerItemActive}
    />
  )
}
