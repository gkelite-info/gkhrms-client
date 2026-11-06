"use client"

import { Bell, Menu, Search } from "lucide-react"
import Image from "next/image"

interface FinanceHeaderProps {
  onOpenMobile: () => void
  searchQuery: string
  onSearchChange: (value: string) => void
}

export default function FinanceHeader({
  onOpenMobile,
  searchQuery,
  onSearchChange,
}: FinanceHeaderProps) {
  return (
    <header className="w-full h-16 bg-[#EEF0FC]/95 backdrop-blur-xs px-4 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-30 shrink-0 border-b border-slate-200/50">
      <div className="flex items-center gap-2 lg:hidden">
        <button
          type="button"
          onClick={onOpenMobile}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-white/80 rounded-xl transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 max-w-xl hidden sm:block">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search employees, departments, attendance, etc..."
            className="w-full h-10 pl-11 pr-4 bg-white text-xs text-slate-800 placeholder-slate-400 font-normal rounded-full shadow-xs border border-transparent focus:border-[#4F46E5]/30 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/15 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 shrink-0 ml-auto">
        <button
          type="button"
          aria-label="Notifications"
          className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-white/60 rounded-full transition-colors cursor-pointer"
        >
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#3B82F6] rounded-full ring-2 ring-[#EEF0FC]" />
        </button>

        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full overflow-hidden ring-1 ring-slate-200/70 shrink-0">
            <Image
              src="/images/jane_smith.jpg"
              alt="Eleanor Vance"
              fill
              className="object-cover"
              sizes="36px"
            />
          </div>
          <div className="hidden sm:flex flex-col text-left leading-tight">
            <span className="text-xs font-bold text-slate-800">
              Eleanor Vance
            </span>
            <span className="text-[11px] font-medium text-slate-400">
              Manager
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

