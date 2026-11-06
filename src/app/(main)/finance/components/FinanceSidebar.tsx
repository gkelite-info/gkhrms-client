"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CreditCard, LayoutGrid, X } from "lucide-react"

interface FinanceSidebarProps {
  mobileOpen: boolean
  onCloseMobile: () => void
}

export default function FinanceSidebar({
  mobileOpen,
  onCloseMobile,
}: FinanceSidebarProps) {
  const pathname = usePathname()
  const isFinanceActive = pathname === "/finance" || pathname?.startsWith("/finance")

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-xs transition-opacity cursor-pointer"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-screen w-[220px] shrink-0 bg-white border-r border-[#E8EAFD] flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between px-1 py-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#4F46E5] flex items-center justify-center text-white shadow-sm shadow-indigo-200">
                <LayoutGrid className="w-5 h-5 fill-white/20" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-[#1E293B] text-[15px] tracking-tight">
                  GK-HRMS
                </span>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider">
                  FINANCE MANAGER
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-1.5">
            <Link
              href="/finance"
              onClick={onCloseMobile}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all cursor-pointer ${
                isFinanceActive
                  ? "bg-[#4F46E5] text-white shadow-sm shadow-indigo-200"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <CreditCard className="w-4 h-4 shrink-0" />
              <span>Finance</span>
            </Link>
          </nav>
        </div>
      </aside>
    </>
  )
}

