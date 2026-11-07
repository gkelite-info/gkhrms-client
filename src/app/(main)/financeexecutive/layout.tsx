"use client"

import Header from "../../../../Layouts/Header"
import FinanceExecutiveSidebar from "./components/FinanceExecutiveSidebar"

export default function FinanceExecutiveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full h-[100vh] bg-gradient-to-b from-[#DEDCFA] to-[#F1F1FD] flex flex-col overflow-hidden">
      <Header />
      <div className="w-full h-[calc(100%-70px)] flex items-start overflow-hidden">
        <FinanceExecutiveSidebar />
        <main className="h-full flex-1 min-w-0 flex flex-col overflow-y-auto overflow-x-hidden scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  )
}

