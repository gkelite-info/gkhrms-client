"use client"

import { usePathname } from "next/navigation"
import Header from "../../../../Layouts/Header"
import HrManagerSidebar from "./components/HrManagerSidebar"

export default function HrManagerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAttendance = Boolean(
    pathname?.startsWith("/hrmanager/attendance") ||
    pathname?.startsWith("/hrmanager/apply-leave") ||
    pathname?.startsWith("/hrmanager/request-wfh") ||
    pathname?.startsWith("/hrmanager/requests") ||
    pathname?.startsWith("/hrmanager/exception-history") ||
    pathname?.startsWith("/hrmanager/member")
  )
  const isFinance = Boolean(pathname?.startsWith("/hrmanager/finance"))

  return (
    <div className="w-full h-[100vh] bg-gradient-to-b from-[#DEDCFA] to-[#F1F1FD] flex flex-col overflow-hidden">
      <Header />
      <div className="w-full h-[calc(100%-70px)] flex items-start overflow-hidden">
        <HrManagerSidebar />
        <main
          className={
            isAttendance || isFinance
              ? "h-full flex-1 min-w-0 flex flex-col overflow-y-auto overflow-x-hidden scrollbar-hide"
              : "flex-1 h-full min-w-0 overflow-y-auto px-4 sm:px-8 py-6 space-y-5"
          }
        >
          {children}
        </main>
      </div>
    </div>
  )
}
