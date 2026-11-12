"use client"

import { ArrowLeft } from "phosphor-react"
import { SocialPost } from "../types"
import SocialMediaPostCard from "../SocialMediaPostCard"

interface SocialMediaPostDetailViewProps {
  post: SocialPost
  onBack: () => void
}

export default function SocialMediaPostDetailView({
  post,
  onBack,
}: SocialMediaPostDetailViewProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#5B50EC] hover:text-[#4338CA] bg-[#EEF2FF] hover:bg-[#E0E7FF] px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl transition-all cursor-pointer shrink-0 whitespace-nowrap active:scale-95"
        >
          <ArrowLeft size={15} weight="bold" />
          <span className="hidden sm:inline">Back to Activity</span>
          <span className="sm:hidden">Back</span>
        </button>
      </div>

      <div className="max-w-2xl mx-auto w-full">
        <SocialMediaPostCard post={post} />
      </div>
    </div>
  )
}
