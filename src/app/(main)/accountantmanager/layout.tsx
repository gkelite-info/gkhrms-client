"use client"

import { usePathname } from "next/navigation"
import Header from "../../../../Layouts/Header"
import AccountantSidebar from "./components/AccountantSidebar"
import { AccountantProvider } from "./finance/context/AccountantContext"

function AccountantLayoutInner({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAttendance = Boolean(
    pathname?.includes("/attendance") ||
    pathname?.includes("/apply-leave") ||
    pathname?.includes("/request-wfh") ||
    pathname?.includes("/apply-exception") ||
    pathname?.includes("/requests") ||
    pathname?.includes("/exception-history") ||
    pathname?.includes("/member")
  )

  return (
    <div className="w-full h-[100vh] bg-gradient-to-b from-[#DEDCFA] to-[#F1F1FD] flex flex-col overflow-hidden">
      <Header />
      <div className="w-full h-[calc(100%-70px)] flex items-start overflow-hidden">
        <AccountantSidebar />
        <main
          className={
            isAttendance
              ? "h-full flex-1 min-w-0 flex flex-col overflow-y-auto overflow-x-hidden scrollbar-hide"
              : "h-full flex-1 min-w-0 overflow-y-auto px-4 sm:px-6 xl:px-8 py-4 xl:py-5 space-y-4 xl:space-y-4.5"
          }
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default function AccountantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AccountantProvider>
      <AccountantLayoutInner>{children}</AccountantLayoutInner>
    </AccountantProvider>
  )
}
