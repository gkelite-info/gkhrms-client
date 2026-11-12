"use client"

import { Stack, ArrowLeft } from "phosphor-react"

interface MyActivityHeaderProps {
  onBack: () => void
  backLabel?: string
}

export default function MyActivityHeader({
  onBack,
  backLabel = "Back to Feed",
}: MyActivityHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-2.5 border-b border-gray-100 pb-3 sm:pb-4 shrink-0">
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0 shadow-2xs">
          <Stack size={18} weight="bold" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-sm sm:text-lg font-bold text-gray-900 leading-tight truncate">
            My Activity
          </h1>
          <p className="text-[10px] sm:text-xs text-gray-500 truncate">
            View your personal posts, likes, comments and polls
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#5B50EC] hover:text-[#4338CA] bg-[#EEF2FF] hover:bg-[#E0E7FF] px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl transition-all cursor-pointer shrink-0 whitespace-nowrap active:scale-95"
      >
        <ArrowLeft size={14} weight="bold" />
        <span className="hidden sm:inline">{backLabel}</span>
        <span className="sm:hidden">Back</span>
      </button>
    </div>
  )
}
