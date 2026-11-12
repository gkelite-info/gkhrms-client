"use client"

import { NotePencil, ChartBar, Stack } from "phosphor-react"
import { SocialPostCategory } from "./types"

interface SocialMediaHeaderActionsProps {
  activeCategory: SocialPostCategory
  onCategoryChange: (category: SocialPostCategory) => void
  onCreatePost?: () => void
  onCreatePoll?: () => void
  onMyActivityClick?: () => void
}

const CATEGORIES: { id: SocialPostCategory; label: string; icon?: string }[] = [
  { id: "all", label: "All" },
  { id: "birthdays", label: "Birthdays", icon: "🎂" },
  { id: "anniversaries", label: "Work Anniversaries", icon: "🎉" },
  { id: "new_joiners", label: "New Joiners" },
  { id: "recognitions", label: "Recognitions" },
]

export default function SocialMediaHeaderActions({
  activeCategory,
  onCategoryChange,
  onCreatePost,
  onCreatePoll,
  onMyActivityClick,
}: SocialMediaHeaderActionsProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={onCreatePost}
          className="h-10 px-2 sm:px-3 rounded-xl bg-[#5B50EC] hover:bg-[#4E44D6] text-white text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 sm:gap-1.5 shadow-xs transition-all cursor-pointer active:scale-98"
        >
          <NotePencil size={15} weight="bold" />
          <span className="truncate">Create Post</span>
        </button>

        <button
          type="button"
          onClick={onCreatePoll}
          className="h-10 px-2 sm:px-3 rounded-xl bg-[#5B50EC] hover:bg-[#4E44D6] text-white text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 sm:gap-1.5 shadow-xs transition-all cursor-pointer active:scale-98"
        >
          <ChartBar size={15} weight="bold" />
          <span className="truncate">Create Poll</span>
        </button>

        <button
          type="button"
          onClick={onMyActivityClick}
          className="h-10 px-2 sm:px-3 rounded-xl bg-[#5B50EC] hover:bg-[#4E44D6] text-white text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 sm:gap-1.5 shadow-xs transition-all cursor-pointer active:scale-98"
        >
          <Stack size={15} weight="bold" />
          <span className="truncate">My Activity</span>
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide select-none -mx-1 px-1">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className={`h-8 px-3 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                isActive
                  ? "bg-[#1E1D32] text-white shadow-2xs"
                  : "bg-white text-gray-700 border border-gray-200/90 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              {cat.icon && <span>{cat.icon}</span>}
              <span>{cat.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
