"use client"

import { Globe, CaretRight } from "phosphor-react"

interface SettingsSupportSectionProps {
  theme?: "light" | "dark" | "system"
  onThemeChange?: (theme: "light" | "dark" | "system") => void
  onOpenHelpdesk: () => void
}

export default function SettingsSupportSection({
  onOpenHelpdesk,
}: SettingsSupportSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
        <Globe size={13} weight="bold" className="text-blue-500" /> Support, Audit & Legal
      </span>
      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 shadow-2xs">
        <button
          type="button"
          onClick={onOpenHelpdesk}
          className="w-full p-3 flex items-center justify-between hover:bg-gray-50/70 transition-colors text-left cursor-pointer"
        >
          <span className="text-xs font-bold text-gray-800">IT Helpdesk</span>
          <CaretRight size={14} className="text-gray-400" />
        </button>
        <button
          type="button"
          className="w-full p-3 flex items-center justify-between hover:bg-gray-50/70 transition-colors text-left cursor-pointer"
        >
          <span className="text-xs font-bold text-gray-800">Enterprise Privacy Policy & Terms</span>
          <CaretRight size={14} className="text-gray-400" />
        </button>
      </div>
    </div>
  )
}

