"use client"

import { UsersThree, Plus, TreeStructure, ChatTeardropText } from "phosphor-react"

export type TeamsTabKey = "management" | "tree" | "chat"

interface TeamsManagementTabsHeaderProps {
  activeTab: TeamsTabKey
  onTabChange: (tab: TeamsTabKey) => void
  onAddNewTeam?: () => void
  role?: string
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

const TAB_ICONS = {
  management: UsersThree,
  tree: TreeStructure,
  chat: ChatTeardropText,
}

export default function TeamsManagementTabsHeader({
  activeTab,
  onTabChange,
  onAddNewTeam,
  role,
}: TeamsManagementTabsHeaderProps) {
  const current = TAB_CONFIG[activeTab]
  const isTeamsRole = (role === "hrmanager" || role === "manager") && activeTab === "management"
  const isChairmanRole = role === "chairman" && activeTab === "management"
  const title = isChairmanRole
    ? "My Teams"
    : isTeamsRole
    ? "Teams"
    : current.title
  const subtitle = isChairmanRole
    ? "View and organize people across key roles in the organization."
    : isTeamsRole
    ? "Manage all teams across the organization, create new teams and view team details."
    : current.subtitle

  return (
    <div className="bg-white rounded-3xl border border-gray-100/80 shadow-xs p-4 sm:p-5 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#5B50EC] shrink-0 shadow-xs">
            <UsersThree size={22} weight="bold" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
              {title}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
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

      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pt-1">
        {(["management", "tree", "chat"] as TeamsTabKey[]).map((tabKey) => {
          const isActive = activeTab === tabKey
          const Icon = TAB_ICONS[tabKey]
          return (
            <button
              key={tabKey}
              type="button"
              onClick={() => onTabChange(tabKey)}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                isActive
                  ? "bg-[#5B50EC] text-white shadow-xs"
                  : "bg-white hover:bg-gray-50 text-gray-600 border border-gray-200/80"
              }`}
            >
              <Icon size={16} weight={isActive ? "bold" : "regular"} />
              <span>{TAB_CONFIG[tabKey].label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
