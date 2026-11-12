"use client"

import { motion, AnimatePresence } from "framer-motion"
import { NotePencil, ChartBar, Stack, CaretUp, CaretDown } from "phosphor-react"
import { SocialPostCategory } from "./types"

interface SocialMediaCollapsibleToolbarProps {
  activeCategory: SocialPostCategory
  onCategoryChange: (category: SocialPostCategory) => void
  onCreatePost?: () => void
  onCreatePoll?: () => void
  onMyActivityClick?: () => void
  isFolded: boolean
  onToggleFold: () => void
}

const CATEGORIES: { id: SocialPostCategory; label: string; icon?: string }[] = [
  { id: "all", label: "All" },
  { id: "birthdays", label: "Birthdays", icon: "🎂" },
  { id: "anniversaries", label: "Work Anniversaries", icon: "🎉" },
  { id: "new_joiners", label: "New Joiners" },
  { id: "recognitions", label: "Recognitions" },
]

export default function SocialMediaCollapsibleToolbar({
  activeCategory,
  onCategoryChange,
  onCreatePost,
  onCreatePoll,
  onMyActivityClick,
  isFolded,
  onToggleFold,
}: SocialMediaCollapsibleToolbarProps) {
  const currentCategory = CATEGORIES.find((c) => c.id === activeCategory)

  return (
    <div className="bg-white border-b border-gray-100 shrink-0 z-20 shadow-2xs">
      <AnimatePresence initial={false} mode="wait">
        {isFolded ? (
          <motion.div
            key="folded-bar"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            className="px-3 py-2 flex items-center justify-between gap-1.5"
          >
            <div className="flex items-center gap-1.5 min-w-0 overflow-x-auto scrollbar-hide py-0.5">
              <span className="text-[11px] font-bold text-[#5B50EC] bg-[#EEF2FF] px-2.5 py-1 rounded-lg border border-[#5B50EC]/20 shrink-0">
                {currentCategory?.icon ? `${currentCategory.icon} ` : ""}{currentCategory?.label}
              </span>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={onCreatePost}
                  className="h-7 px-2 rounded-lg bg-[#5B50EC] text-white text-[11px] font-bold flex items-center gap-1 hover:bg-[#4E44D6] transition-all cursor-pointer shadow-2xs"
                  title="Create Post"
                >
                  <NotePencil size={13} weight="bold" />
                  <span>Post</span>
                </button>
                <button
                  type="button"
                  onClick={onCreatePoll}
                  className="h-7 px-2 rounded-lg bg-[#5B50EC] text-white text-[11px] font-bold flex items-center gap-1 hover:bg-[#4E44D6] transition-all cursor-pointer shadow-2xs"
                  title="Create Poll"
                >
                  <ChartBar size={13} weight="bold" />
                  <span>Poll</span>
                </button>
                <button
                  type="button"
                  onClick={onMyActivityClick}
                  className="h-7 px-2 rounded-lg bg-[#EEF2FF] text-[#5B50EC] text-[11px] font-bold flex items-center gap-1 hover:bg-[#E0E7FF] transition-all cursor-pointer"
                  title="My Activity"
                >
                  <Stack size={13} weight="bold" />
                  <span>Activity</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={onToggleFold}
              className="h-7 px-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer shrink-0"
              title="Expand toolbar"
            >
              <span>Unfold</span>
              <CaretDown size={13} weight="bold" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="unfolded-bar"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            className="p-3 sm:p-4 flex flex-col gap-2.5"
          >
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={onCreatePost}
                  className="h-9 px-3 rounded-xl bg-[#5B50EC] hover:bg-[#4E44D6] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-98"
                >
                  <NotePencil size={15} weight="bold" />
                  <span>Create Post</span>
                </button>

                <button
                  type="button"
                  onClick={onCreatePoll}
                  className="h-9 px-3 rounded-xl bg-[#5B50EC] hover:bg-[#4E44D6] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-98"
                >
                  <ChartBar size={15} weight="bold" />
                  <span>Create Poll</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onMyActivityClick}
                  className="flex-1 h-8.5 px-3 rounded-xl bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#5B50EC] text-xs font-bold flex items-center justify-center gap-1.5 border border-[#5B50EC]/20 transition-all cursor-pointer active:scale-98"
                >
                  <Stack size={15} weight="bold" />
                  <span>My Activity</span>
                </button>

                <button
                  type="button"
                  onClick={onToggleFold}
                  className="h-8.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-98 shrink-0"
                  title="Fold toolbar"
                >
                  <CaretUp size={14} weight="bold" />
                  <span>Fold</span>
                </button>
              </div>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
