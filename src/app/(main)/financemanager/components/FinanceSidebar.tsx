"use client"

import { UsersThree, CurrencyCircleDollar } from "phosphor-react"
import ReusableSidebar, {
  ReusableSidebarItem,
} from "../../../../../reusableComponents/ReusableSidebar"

export const financeNavItems: ReusableSidebarItem[] = [
  { label: "Finance", href: "/financemanager", icon: CurrencyCircleDollar },
  { label: "Attendance", href: "/financemanager/attendance", icon: UsersThree },
]

export default function FinanceSidebar() {
  const isFinanceItemActive = (
    item: ReusableSidebarItem,
    currentPath: string
  ): boolean => {
    if (
      item.href === "/financemanager/attendance" ||
      item.href === "/finance/attendance"
    ) {
      return (
        currentPath.includes("/attendance") ||
        currentPath.includes("/apply-leave") ||
        currentPath.includes("/request-wfh") ||
        currentPath.includes("/requests") ||
        currentPath.includes("/exception-history") ||
        currentPath.includes("/member")
      )
    }
    return (
      (currentPath === "/financemanager" ||
        currentPath === "/financemanger" ||
        currentPath === "/finance") ||
      (currentPath.includes("finance") &&
        !currentPath.includes("attendance") &&
        !currentPath.includes("apply-leave") &&
        !currentPath.includes("request-wfh") &&
        !currentPath.includes("requests") &&
        !currentPath.includes("exception-history") &&
        !currentPath.includes("member"))
    )
  }

  return (
    <ReusableSidebar
      items={financeNavItems}
      toggleEventName="toggle-finance-sidebar"
      closeEventName="close-finance-sidebar"
      desktopWidthClass="w-[210px] min-w-[210px] max-w-[210px] shrink-0"
      drawerWidthClass="w-[240px]"
      isItemActive={isFinanceItemActive}
    />
  )
}
