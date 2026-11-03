"use client"

import { usePathname } from "next/navigation"
import { roleBasedNav } from "./RoleBasedLink"
import { RootState } from "../Redux/Store"
import { useSelector } from "react-redux"
import EmployeeSidebar from "./EmployeeSidebar"
import TeamLeadSidebar from "./TeamLeadSidebar"
import ManagerSidebar from "./ManagerSidebar"
import HrSidebar from "./HrSidebar"
import ProductManagerSidebar from "./ProductManagerSidebar"
import ReusableSidebar from "../reusableComponents/ReusableSidebar"

export default function Sidebar() {
  const pathname = usePathname()
  const { role } = useSelector((state: RootState) => state.auth)

  if (pathname?.startsWith("/teamlead") || role === "TeamLead") {
    return <TeamLeadSidebar />
  }

  if (pathname?.startsWith("/manager") || role === "Manager") {
    return <ManagerSidebar />
  }

  if (pathname?.startsWith("/hr") || role === "Hr") {
    return <HrSidebar />
  }

  if (pathname?.startsWith("/productmanager") || role === "ProductManager") {
    return <ProductManagerSidebar />
  }

  if (pathname?.startsWith("/employee") || role === "Employee") {
    return <EmployeeSidebar />
  }

  const activeRole =
    pathname?.startsWith("/admin") || role === "Admin"
      ? "Admin"
      : pathname?.startsWith("/hr") || role === "Hr"
      ? "Hr"
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
