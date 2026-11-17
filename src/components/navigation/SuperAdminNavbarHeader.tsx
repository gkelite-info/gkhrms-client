"use client"

import { Search, Bell, User } from "lucide-react"
import { useState } from "react"

export default function SuperAdminNavbarHeader() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="w-full h-16 bg-white/70 backdrop-blur-md border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Search Bar */}
      <div className="w-full max-w-xl">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-[#7C74EA] absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search companies..."
            className="w-full h-10 pl-11 pr-4 bg-[#EEF0FD] hover:bg-[#E8EAFD] focus:bg-white text-xs text-slate-800 placeholder-slate-400 font-medium rounded-full border border-transparent focus:border-[#5B50E5]/30 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/15 transition-all"
          />
        </div>
      </div>

      {/* Right User & Actions */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative p-2 text-slate-600 hover:text-[#5B50E5] hover:bg-[#EEF0FD] rounded-full transition-colors cursor-pointer"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#5B50E5] rounded-full ring-2 ring-white" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
          <div className="flex flex-col text-right leading-tight">
            <span className="text-xs font-bold text-slate-800">
              Eleanor Vance
            </span>
            <span className="text-[10px] font-semibold text-slate-400">
              Super Admin
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#5B50E5] text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-indigo-200 cursor-pointer hover:ring-2 hover:ring-[#5B50E5]/30 transition-all">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  )
}
