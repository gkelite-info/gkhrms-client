"use client"

import { Lightbulb, Confetti } from "phosphor-react"

interface ActivityThumbnailProps {
  type: "welcome" | "image" | "workshop" | "celebration"
  src?: string
}

export default function ActivityThumbnail({ type, src }: ActivityThumbnailProps) {
  if (type === "welcome") {
    return (
      <div className="w-16 sm:w-24 md:w-28 h-14 sm:h-18 md:h-20 rounded-xl bg-gradient-to-br from-[#EEF2FF] to-[#DDD6FE] flex flex-col items-center justify-center p-1.5 text-center shrink-0 border border-purple-100">
        <span className="text-[9px] sm:text-xs font-bold text-[#5B50EC] leading-tight">
          Welcome
        </span>
        <span className="text-[8px] sm:text-[11px] font-extrabold text-[#7E22CE] uppercase tracking-wide">
          Aboard
        </span>
      </div>
    )
  }

  if (type === "workshop") {
    return (
      <div className="w-16 sm:w-24 md:w-28 h-14 sm:h-18 md:h-20 rounded-xl bg-[#1E1B4B] text-white flex flex-col items-center justify-center p-1.5 text-center shrink-0 relative overflow-hidden">
        <div className="flex items-center gap-1 text-[8px] sm:text-[10px] font-bold text-amber-300">
          <Lightbulb size={12} weight="fill" />
          <span>Workshop</span>
        </div>
        <span className="text-[8px] sm:text-[10px] text-gray-300 leading-tight mt-0.5 font-medium">
          Skill Dev
        </span>
      </div>
    )
  }

  if (type === "celebration") {
    return (
      <div className="w-16 sm:w-24 md:w-28 h-14 sm:h-18 md:h-20 rounded-xl bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] text-amber-900 flex flex-col items-center justify-center p-1.5 text-center shrink-0 border border-amber-200">
        <Confetti size={16} weight="fill" className="text-amber-600 mb-0.5" />
        <span className="text-[8px] sm:text-[11px] font-bold">Celebration</span>
      </div>
    )
  }

  return (
    <div className="w-16 sm:w-24 md:w-28 h-14 sm:h-18 md:h-20 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
      <img
        src={src || "/images/alexander.png"}
        alt="Post thumbnail"
        className="w-full h-full object-cover"
      />
    </div>
  )
}
