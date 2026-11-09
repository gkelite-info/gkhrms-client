"use client"

import { CreditCard } from "phosphor-react"
import ReusableSidebar, {
  ReusableSidebarItem,
} from "../reusableComponents/ReusableSidebar"

export const accountantNavItems: ReusableSidebarItem[] = [
  { label: "Finance", href: "/accountant", icon: CreditCard },
]

export default function AccountantSidebar() {
  const isAccountantItemActive = (
    item: ReusableSidebarItem,
    currentPath: string
  ): boolean => {
    return currentPath === "/accountant" || currentPath.startsWith("/accountant")
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
