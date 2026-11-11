"use client"

import { usePathname } from "next/navigation"
import Header from "../../../Layouts/Header"
import Sidebar from "../../../Layouts/Sidebar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isSuperAdmin = pathname?.startsWith("/superadmin")
  const isHrManager = pathname?.startsWith("/hrmanager")
  const isFinance =
    pathname?.startsWith("/finance") ||
    pathname?.startsWith("/financemanager") ||
    pathname?.startsWith("/financemanger")
  const isFinanceExecutive = pathname?.startsWith("/financeexecutive")
  const isAccountant =
    pathname?.startsWith("/accountant") ||
    pathname?.startsWith("/accountantmanager")
  const isAccountantExecutive = pathname?.startsWith("/accountantexecutive")
  const isTechAdmin = pathname?.startsWith("/techadmin")
  const isChairman = pathname?.startsWith("/chairman")
  const isAsstManager =
    pathname?.startsWith("/asstmanager") ||
    pathname?.startsWith("/assistantmanager")

  if (
    isSuperAdmin ||
    isHrManager ||
    isFinance ||
    isFinanceExecutive ||
    isAccountant ||
    isAccountantExecutive ||
    isTechAdmin ||
    isChairman ||
    isAsstManager
  ) {
    return <div className="w-full h-screen overflow-hidden">{children}</div>
  }

  return (
    <div className="w-full h-[100vh] bg-gradient-to-b from-[#DEDCFA] to-[#F1F1FD] flex flex-col overflow-hidden">
      <Header />
      <div className="w-full h-[calc(100%-70px)] flex items-start overflow-hidden">
        <Sidebar />
        <main className="h-full flex-1 min-w-0 flex flex-col overflow-y-auto overflow-x-hidden scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  )
}
