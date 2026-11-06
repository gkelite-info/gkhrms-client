"use client"

import { FinanceProvider, useFinance } from "./context/FinanceContext"
import FinanceSidebar from "./components/FinanceSidebar"
import FinanceHeader from "./components/FinanceHeader"

function FinanceLayoutInner({ children }: { children: React.ReactNode }) {
  const { mobileOpen, setMobileOpen, searchQuery, setSearchQuery } = useFinance()

  return (
    <div className="w-full h-screen flex bg-[#EEF0FC] text-slate-800 antialiased overflow-hidden font-sans">
      <FinanceSidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <FinanceHeader
          onOpenMobile={() => setMobileOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 xl:px-8 py-4 xl:py-5 space-y-4 xl:space-y-4.5">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function FinanceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FinanceProvider>
      <FinanceLayoutInner>{children}</FinanceLayoutInner>
    </FinanceProvider>
  )
}

