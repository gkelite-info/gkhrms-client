"use client"

import { useState, useCallback } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { TeamsManagementProps, TeamItem } from "./types"
import { INITIAL_TEAMS } from "./mockTeamsData"
import TeamsManagementTabsHeader, { TeamsTabKey } from "./TeamsManagementTabsHeader"
import TeamsTableView from "./TeamsTableView"
import TeamTreeView from "./TeamTreeView"
import TeamChatView from "./chat/TeamChatView"
import HrTeamsManagementContainer from "./hr-manager/HrTeamsManagementContainer"
import { ChairmanTeamsManagementView, ChairmanTeamTreeView, ChairmanTeamChatView } from "./chairman"
import { ProductManagerTeamsView } from "./product-manager"

const VALID_TABS: TeamsTabKey[] = ["management", "tree", "chat"]

export default function TeamsManagementView({
  currentRole,
  canCreateTeam = true,
  canEditTeam = true,
  canDeleteTeam = true,
  initialTeams,
  defaultTab = "management",
}: TeamsManagementProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const tabQuery = searchParams?.get("tab") as TeamsTabKey | null
  const teamIdQuery = searchParams?.get("teamId")
  const chatIdQuery = searchParams?.get("chatId")

  const activeTab: TeamsTabKey =
    tabQuery && VALID_TABS.includes(tabQuery) ? tabQuery : defaultTab

  const [teams, setTeams] = useState<TeamItem[]>(initialTeams || INITIAL_TEAMS)
  const [internalTeamId, setInternalTeamId] = useState<string | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const selectedTeamId = teamIdQuery || internalTeamId

  const handleTabChange = useCallback(
    (tab: TeamsTabKey) => {
      const params = new URLSearchParams(searchParams?.toString() || "")
      if (tab === "management") {
        params.delete("tab")
      } else {
        params.set("tab", tab)
      }
      if (tab !== "tree") {
        params.delete("teamId")
        setInternalTeamId(null)
      }
      if (tab !== "chat") {
        params.delete("chatId")
      }
      const qs = params.toString()
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  const handleViewTeamTree = (team: TeamItem) => {
    setInternalTeamId(team.id)
    const params = new URLSearchParams(searchParams?.toString() || "")
    params.set("tab", "tree")
    params.set("teamId", team.id)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleSelectTeamId = (id: string | null) => {
    setInternalTeamId(id)
    const params = new URLSearchParams(searchParams?.toString() || "")
    if (id) {
      params.set("teamId", id)
    } else {
      params.delete("teamId")
    }
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const handleChatChange = (chatId: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "")
    params.set("tab", "chat")
    params.set("chatId", chatId)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="w-full flex flex-col gap-3 sm:gap-5 p-2 sm:p-4 md:p-6 max-w-7xl mx-auto select-none">
      <TeamsManagementTabsHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onAddNewTeam={canCreateTeam && currentRole !== "hrmanager" && currentRole !== "manager" && currentRole !== "chairman" ? () => setIsCreateModalOpen(true) : undefined}
        role={currentRole}
      />

      {activeTab === "management" && (
        currentRole === "chairman" || currentRole === "manager" ? (
          <ChairmanTeamsManagementView />
        ) : currentRole === "productmanager" ? (
          <ProductManagerTeamsView />
        ) : currentRole === "hrmanager" ? (
          <HrTeamsManagementContainer />
        ) : (
          <TeamsTableView
            teams={teams}
            setTeams={setTeams}
            currentRole={currentRole}
            canCreateTeam={canCreateTeam}
            canEditTeam={canEditTeam}
            canDeleteTeam={canDeleteTeam}
            isCreateModalOpen={isCreateModalOpen}
            setIsCreateModalOpen={setIsCreateModalOpen}
            onViewTeamTree={handleViewTeamTree}
          />
        )
      )}

      {activeTab === "tree" && (
        currentRole === "chairman" || currentRole === "manager" ? (
          <ChairmanTeamTreeView />
        ) : (
          <TeamTreeView
            teams={teams}
            selectedTeamId={selectedTeamId}
            onSelectTeamId={handleSelectTeamId}
          />
        )
      )}

      {activeTab === "chat" && (
        currentRole === "chairman" || currentRole === "manager" ? (
          <ChairmanTeamChatView
            initialChatId={chatIdQuery}
            onChatChange={handleChatChange}
          />
        ) : (
          <TeamChatView
            initialChatId={chatIdQuery}
            onChatChange={handleChatChange}
          />
        )
      )}
    </div>
  )
}
