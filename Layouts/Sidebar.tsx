"use client"

import { usePathname } from "next/navigation"
import { roleBasedNav } from "./RoleBasedLink"
import { RootState } from "../Redux/Store"
import { useSelector } from "react-redux"
import EmployeeSidebar from "./EmployeeSidebar"
import TeamLeadSidebar from "./TeamLeadSidebar"
import ManagerSidebar from "./ManagerSidebar"
import HrSidebar from "./HrSidebar"
import HrManagerSidebar from "./HrManagerSidebar"
import ProductManagerSidebar from "./ProductManagerSidebar"
import FinanceSidebar from "./FinanceSidebar"
import AccountantSidebar from "./AccountantSidebar"
import FinanceExecutiveSidebar from "./FinanceExecutiveSidebar"
import ReusableSidebar from "../reusableComponents/ReusableSidebar"

export default function Sidebar() {
  const pathname = usePathname()
  const { role } = useSelector((state: RootState) => state.auth)

  if (pathname?.startsWith("/financeexecutive")) {
    return <FinanceExecutiveSidebar />
  }

  if (
    pathname?.startsWith("/financemanager") ||
    pathname?.startsWith("/financemanger") ||
    pathname?.startsWith("/finance")
  ) {
    return <FinanceSidebar />
  }

  if (pathname?.startsWith("/accountant")) {
    return <AccountantSidebar />
  }

  if (pathname?.startsWith("/hrmanager")) {
    return <HrManagerSidebar />
  }

  if (pathname?.startsWith("/hr")) {
    return <HrSidebar />
  }

  if (pathname?.startsWith("/teamlead")) {
    return <TeamLeadSidebar />
  }

  if (pathname?.startsWith("/manager")) {
    return <ManagerSidebar />
  }

  if (pathname?.startsWith("/productmanager")) {
    return <ProductManagerSidebar />
  }

  if (pathname?.startsWith("/employee")) {
    return <EmployeeSidebar />
  }

  if (role === "HrManager") {
    return <HrManagerSidebar />
  }

  if (role === "Finance" || (role as string) === "FinanceManager") {
    return <FinanceSidebar />
  }

  if (role === "Accountant" || (role as string) === "Accountant") {
    return <AccountantSidebar />
  }

  if (role === "FinanceExecutive" || (role as string) === "FinanceExecutive") {
    return <FinanceExecutiveSidebar />
  }

  if (role === "Hr") {
    return <HrSidebar />
  }

  if (role === "TeamLead") {
    return <TeamLeadSidebar />
  }

  if (role === "Manager") {
    return <ManagerSidebar />
  }

  if (role === "ProductManager") {
    return <ProductManagerSidebar />
  }

  if (role === "Employee") {
    return <EmployeeSidebar />
  }

  const activeRole =
    pathname?.startsWith("/admin") || role === "Admin"
      ? "Admin"
      : role ?? "Employee"

  const navItems = roleBasedNav[activeRole] || []

  return (
    <ReusableSidebar
      items={navItems}
      toggleEventName="toggle-sidebar"
      closeEventName="close-sidebar"
      desktopWidthClass="w-[210px] min-w-[210px] max-w-[210px] shrink-0"
      drawerWidthClass="w-[240px]"
    />
  )
}
