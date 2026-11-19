"use client"

import { useState } from "react"
import { TeamsManagementProps, TeamItem } from "./types"
import { INITIAL_TEAMS } from "./mockTeamsData"
import TeamsManagementTabsHeader, { TeamsTabKey } from "./TeamsManagementTabsHeader"
import TeamsTableView from "./TeamsTableView"
import TeamTreeView from "./TeamTreeView"
import TeamChatView from "./chat/TeamChatView"

export default function TeamsManagementView({
  currentRole,
  canCreateTeam = true,
  canEditTeam = true,
  canDeleteTeam = true,
  initialTeams,
  defaultTab = "management",
}: TeamsManagementProps) {
  const [activeTab, setActiveTab] = useState<TeamsTabKey>(defaultTab)
  const [teams, setTeams] = useState<TeamItem[]>(initialTeams || INITIAL_TEAMS)
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const handleViewTeamTree = (team: TeamItem) => {
    setSelectedTeamId(team.id)
    setActiveTab("tree")
  }

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5 p-3.5 sm:p-5 md:p-6 max-w-7xl mx-auto select-none">
      <TeamsManagementTabsHeader
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab)
          if (tab !== "tree") setSelectedTeamId(null)
        }}
        onAddNewTeam={canCreateTeam ? () => setIsCreateModalOpen(true) : undefined}
      />

      {activeTab === "management" && (
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
      )}

      {activeTab === "tree" && (
        <TeamTreeView
          teams={teams}
          selectedTeamId={selectedTeamId}
          onSelectTeamId={setSelectedTeamId}
        />
      )}

      {activeTab === "chat" && <TeamChatView />}
    </div>
  )
}
