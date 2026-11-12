"use client"

import { Crown, Sparkle } from "phosphor-react"
import { SocialBannerData } from "./types"

interface SocialMediaCardBannerProps {
  type?: "birthday" | "anniversary" | "welcome" | "custom"
  data?: SocialBannerData
}

export default function SocialMediaCardBanner({
  type = "birthday",
  data,
}: SocialMediaCardBannerProps) {
  if (type === "birthday") {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-[#F2EEFF] via-[#ECE5FF] to-[#DFD6FF] p-4 sm:p-5 border border-[#DDD4FE] shadow-2xs flex items-center justify-between select-none">
        <div className="absolute -top-3 -left-3 w-16 h-16 bg-purple-200/40 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-indigo-200/40 rounded-full blur-xl pointer-events-none" />

        <div className="flex flex-col z-10 pr-2">
          <div className="flex items-center gap-1.5 text-[#5B50EC] mb-1">
            <Sparkle size={14} weight="fill" className="text-amber-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#5B50EC]">
              Celebration
            </span>
          </div>
          <h4 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-tight italic font-serif">
            Happy Birthday
          </h4>
          <span className="text-xs sm:text-sm font-semibold text-[#5B50EC] mt-0.5">
            {data?.employeeName || "Team Member"}!
          </span>
        </div>

        <div className="relative flex items-center gap-2 z-10 shrink-0">
          <div className="relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-white p-1 rounded-full shadow-xs border-2 border-white z-20">
              <Crown size={12} weight="fill" />
            </div>
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-purple-100 flex items-center justify-center">
              {data?.employeePhoto ? (
                <img
                  src={data.employeePhoto}
                  alt={data.employeeName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-lg font-bold text-[#5B50EC]">
                  {data?.employeeName?.charAt(0) || "A"}
                </span>
              )}
            </div>
          </div>
          <div className="hidden xs:flex flex-col text-lg select-none">
            <span>🎁</span>
            <span className="-mt-1">✨</span>
          </div>
        </div>
      </div>
    )
  }

  if (type === "anniversary") {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-[#FAF5FF] via-[#F3EAFF] to-[#E9DCFF] p-4 sm:p-5 border border-[#E9D5FF] shadow-2xs flex items-center justify-between select-none">
        <div className="flex items-center gap-3.5 z-10">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 text-white flex flex-col items-center justify-center shadow-md border-2 border-white shrink-0">
            <span className="text-lg sm:text-xl font-black leading-none">
              {data?.years || 3}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">
              Years
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-600">
              Milestone
            </span>
            <h4 className="text-base sm:text-lg font-extrabold text-gray-900 leading-snug">
              Happy Work Anniversary
            </h4>
            <span className="text-xs sm:text-sm font-bold text-[#5B50EC]">
              {data?.employeeName || "Team Member"}!
            </span>
          </div>
        </div>
        <div className="text-2xl sm:text-3xl select-none z-10 shrink-0">
          🎉
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-[#F0FDF4] via-[#E7F9EE] to-[#DCFCE7] p-4 sm:p-5 border border-[#BBF7D0] shadow-2xs flex items-center justify-between select-none">
      <div className="flex flex-col z-10">
        <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600">
          Welcome
        </span>
        <h4 className="text-base sm:text-lg font-extrabold text-gray-900 leading-snug">
          {data?.title || "Welcome to the Team"}
        </h4>
        <span className="text-xs sm:text-sm font-semibold text-emerald-700">
          {data?.employeeName}
        </span>
      </div>
      <div className="text-2xl sm:text-3xl select-none z-10 shrink-0">
        🚀
      </div>
    </div>
  )
}

