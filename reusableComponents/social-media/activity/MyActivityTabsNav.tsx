"use client"

import { NotePencil, ThumbsUp, ChatCircleDots, ChartBar } from "phosphor-react"
import { ActivityTab } from "./types"

interface MyActivityTabsNavProps {
  activeTab: ActivityTab
  onTabChange: (tab: ActivityTab) => void
  counts?: {
    posts?: number
    liked?: number
    comments?: number
  }
}

export default function MyActivityTabsNav({
  activeTab,
  onTabChange,
  counts = { posts: 12, liked: 38, comments: 16 },
}: MyActivityTabsNavProps) {
  const tabs = [
    {
      id: "my-posts" as ActivityTab,
      label: `My Posts (${counts.posts ?? 12})`,
      icon: NotePencil,
    },
    {
      id: "liked-posts" as ActivityTab,
      label: `Liked Posts (${counts.liked ?? 38})`,
      icon: ThumbsUp,
    },
    {
      id: "my-comments" as ActivityTab,
      label: `My Comments (${counts.comments ?? 16})`,
      icon: ChatCircleDots,
    },
    {
      id: "my-polls" as ActivityTab,
      label: "My Polls",
      icon: ChartBar,
    },
  ]

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 border-b border-gray-100 overflow-x-auto pb-1.5 scrollbar-hide select-none -mx-1 px-1">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              isActive
                ? "bg-[#EEF2FF] text-[#5B50EC] shadow-2xs border-b-2 border-[#5B50EC]"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            <Icon size={15} weight={isActive ? "fill" : "bold"} />
            <span>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
