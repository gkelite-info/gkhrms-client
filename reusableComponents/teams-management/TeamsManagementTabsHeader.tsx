"use client"

import { UsersThree, Plus } from "phosphor-react"

export type TeamsTabKey = "management" | "tree" | "chat"

interface TeamsManagementTabsHeaderProps {
  activeTab: TeamsTabKey
  onTabChange: (tab: TeamsTabKey) => void
  onAddNewTeam?: () => void
}

const TAB_CONFIG: Record<TeamsTabKey, { title: string; subtitle: string; label: string }> = {
  management: {
    title: "Teams Management",
    subtitle: "Configure and manage organizational teams and hierarchies.",
    label: "Teams Management",
  },
  tree: {
    title: "Team Tree",
    subtitle: "View the organizational hierarchy of teams and reporting structure",
    label: "Team Tree",
  },
  chat: {
    title: "Team Chat",
    subtitle: "Communicate with team members, team leads, and managers.",
    label: "Chat",
  },
}

export default function TeamsManagementTabsHeader({
  activeTab,
  onTabChange,
  onAddNewTeam,
}: TeamsManagementTabsHeaderProps) {
  const current = TAB_CONFIG[activeTab]

  return (
    <div className="bg-white rounded-3xl border border-gray-100/80 shadow-xs p-4 sm:p-5 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#5B50EC] shrink-0 shadow-xs">
            <UsersThree size={22} weight="bold" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
              {current.title}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">{current.subtitle}</p>
          </div>
        </div>

        {activeTab === "management" && onAddNewTeam && (
          <button
            type="button"
            onClick={onAddNewTeam}
            className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-[#5B50EC] hover:bg-[#4E44D6] text-white text-xs sm:text-sm font-bold shadow-sm shadow-[#5B50EC]/20 transition-all cursor-pointer active:scale-98 self-start sm:self-auto shrink-0"
          >
            <Plus size={16} weight="bold" />
            <span>Add New Team</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-6 border-b border-gray-100 overflow-x-auto custom-scrollbar pt-1">
        {(["management", "tree", "chat"] as TeamsTabKey[]).map((tabKey) => {
          const isActive = activeTab === tabKey
          return (
            <button
              key={tabKey}
              type="button"
              onClick={() => onTabChange(tabKey)}
              className={`pb-2.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer relative ${
                isActive
                  ? "text-[#5B50EC] font-bold"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <span>{TAB_CONFIG[tabKey].label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B50EC] rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
