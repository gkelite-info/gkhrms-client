"use client"

import { useState } from "react"
import HrManagerSidebar from "./components/HrManagerSidebar"
import HrManagerHeader from "./components/HrManagerHeader"

export default function HrManagerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [headerSearch, setHeaderSearch] = useState("")

  return (
    <div className="w-full h-screen flex bg-[#EEF0FC] text-slate-800 antialiased overflow-hidden font-sans">
      <HrManagerSidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <HrManagerHeader
          onOpenMobile={() => setMobileOpen(true)}
          searchQuery={headerSearch}
          onSearchChange={setHeaderSearch}
        />

        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-5">
          {children}
        </main>
      </div>
    </div>
  )
}

