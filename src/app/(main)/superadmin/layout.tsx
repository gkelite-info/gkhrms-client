"use client"

import Header from "../../../../Layouts/Header"
import SuperAdminSidebar from "./components/SuperAdminSidebar"

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full h-[100vh] bg-[#F7F8FC] flex flex-col overflow-hidden">
      <Header />
      <div className="w-full h-[calc(100%-70px)] flex items-start overflow-hidden">
        <SuperAdminSidebar />
        <main className="flex-1 h-full overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
          {children}
        </main>
      </div>
    </div>
  )
}
