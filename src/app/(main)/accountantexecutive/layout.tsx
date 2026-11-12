"use client"

import { usePathname } from "next/navigation"
import Header from "../../../../Layouts/Header"
import AccountantExecutiveSidebar from "./components/AccountantExecutiveSidebar"

export default function AccountantExecutiveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isFinanceRoute = pathname?.startsWith("/accountantexecutive/finance")

  return (
    <div className="w-full h-[100vh] bg-gradient-to-b from-[#DEDCFA] to-[#F1F1FD] flex flex-col overflow-hidden">
      <Header />
      <div className="w-full h-[calc(100%-70px)] flex items-start overflow-hidden">
        <AccountantExecutiveSidebar />
        <main
          className={
            isFinanceRoute
              ? "h-full flex-1 min-w-0 overflow-y-auto px-4 sm:px-6 xl:px-8 py-4 xl:py-5 space-y-4 xl:space-y-4.5"
              : "h-full flex-1 min-w-0 flex flex-col overflow-y-auto overflow-x-hidden scrollbar-hide"
          }
        >
          {children}
        </main>
      </div>
    </div>
  )
}

