"use client"

import { CreditCard, UsersThree } from "phosphor-react"
import ReusableSidebar, {
  ReusableSidebarItem,
} from "../reusableComponents/ReusableSidebar"

export const accountantNavItems: ReusableSidebarItem[] = [
  { label: "Attendance", href: "/accountantmanager/attendance", icon: UsersThree },
  { label: "Finance", href: "/accountantmanager?mode=my-finance&tab=overview", icon: CreditCard },
]

export default function AccountantSidebar() {
  const isAccountantItemActive = (
    item: ReusableSidebarItem,
    currentPath: string
  ): boolean => {
    if (item.href === "/accountantmanager/attendance") {
      return (
        currentPath.includes("/attendance") ||
        currentPath.includes("/apply-leave") ||
        currentPath.includes("/request-wfh") ||
        currentPath.includes("/apply-exception") ||
        currentPath.includes("/requests") ||
        currentPath.includes("/exception-history") ||
        currentPath.includes("/member")
      )
    }
    return (
      (currentPath === "/accountantmanager" ||
        currentPath === "/accountant") ||
      ((currentPath.startsWith("/accountantmanager") || currentPath.startsWith("/accountant")) &&
        !currentPath.includes("/attendance") &&
        !currentPath.includes("/apply-leave") &&
        !currentPath.includes("/request-wfh") &&
        !currentPath.includes("/apply-exception") &&
        !currentPath.includes("/requests") &&
        !currentPath.includes("/exception-history") &&
        !currentPath.includes("/member"))
    )
  }

  return (
    <ReusableSidebar
      items={accountantNavItems}
      toggleEventName="toggle-accountant-sidebar"
      closeEventName="close-accountant-sidebar"
      desktopWidthClass="w-[210px] min-w-[210px] max-w-[210px] shrink-0"
      drawerWidthClass="w-[240px]"
      isItemActive={isAccountantItemActive}
    />
  )
}
