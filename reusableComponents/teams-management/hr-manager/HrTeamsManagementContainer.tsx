"use client"

import React, { useState } from "react"
import HrTeamsOverview from "./HrTeamsOverview"
import HrTeamDetailsView from "./HrTeamDetailsView"
import HrManageMembersView from "./HrManageMembersView"
import RemoveMemberModal from "./RemoveMemberModal"
import CreateTeamModal from "../CreateTeamModal"
import DeleteTeamModal from "../DeleteTeamModal"
import { TeamItem } from "../types"
import { INITIAL_HR_TEAMS, INITIAL_HR_TEAM_MEMBERS } from "./mockHrTeamsData"
import { HrTeamItem, HrTeamMember, HrTeamsViewMode } from "./types"
import { toTeamItem, buildNewHrTeam, applyTeamEdit } from "./hrTeamHelpers"

export default function HrTeamsManagementContainer() {
  const [hrTeams, setHrTeams] = useState<HrTeamItem[]>(INITIAL_HR_TEAMS)
  const [selectedTeam, setSelectedTeam] = useState<HrTeamItem>(INITIAL_HR_TEAMS[0])
  const [members, setMembers] = useState<HrTeamMember[]>(INITIAL_HR_TEAM_MEMBERS)
  const [viewMode, setViewMode] = useState<HrTeamsViewMode>("overview")
  const [memberToRemove, setMemberToRemove] = useState<HrTeamMember | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [teamToEdit, setTeamToEdit] = useState<TeamItem | null>(null)
  const [teamToDelete, setTeamToDelete] = useState<HrTeamItem | null>(null)

  const handleOpenEditTeam = (team: HrTeamItem) => {
    setTeamToEdit(toTeamItem(team))
    setIsCreateModalOpen(true)
  }

  const handleSaveTeam = (savedTeam: Partial<TeamItem>) => {
    if (teamToEdit) {
      setHrTeams((prev) => applyTeamEdit(prev, teamToEdit.id, savedTeam))
    } else {
      setHrTeams((prev) => [buildNewHrTeam(savedTeam), ...prev])
    }
    setIsCreateModalOpen(false)
    setTeamToEdit(null)
  }

  const handleConfirmDeleteTeam = () => {
    if (!teamToDelete) return
    setHrTeams((prev) => prev.filter((t) => t.id !== teamToDelete.id))
    setTeamToDelete(null)
  }

  const handleAddMember = (employeeName: string, role: string) => {
    const newMember: HrTeamMember = {
      id: `m-${Date.now()}`,
      name: employeeName,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      employeeId: `EMP${Math.floor(1000 + Math.random() * 9000)}`,
      designation: role,
      teamRole: role,
      department: selectedTeam.department,
      reportingTo: selectedTeam.managerName,
      status: "Active",
    }
    setMembers((prev) => [newMember, ...prev])
    setHrTeams((prev) =>
      prev.map((t) => (t.id === selectedTeam.id ? { ...t, membersCount: t.membersCount + 1 } : t))
    )
  }

  const handleUpdateLeadership = (teamLead: string, asstManager: string) => {
    setHrTeams((prev) =>
      prev.map((t) => {
        if (t.id !== selectedTeam.id) return t
        return {
          ...t,
          reportingStructure: {
            ...t.reportingStructure,
            teamLead: teamLead ? { name: teamLead, role: "Team Lead", avatar: t.reportingStructure.teamLead?.avatar || "" } : undefined,
            assistantManager: asstManager ? { name: asstManager, role: "Assistant Manager", avatar: t.reportingStructure.assistantManager?.avatar || "" } : undefined,
          },
        }
      })
    )
  }

  const handleReassignMember = (memberId: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId))
    setHrTeams((prev) =>
      prev.map((t) => (t.id === selectedTeam.id ? { ...t, membersCount: Math.max(0, t.membersCount - 1) } : t))
    )
  }

  const handleConfirmRemoveMember = () => {
    if (!memberToRemove) return
    setMembers((prev) => prev.filter((m) => m.id !== memberToRemove.id))
    setHrTeams((prev) =>
      prev.map((t) => (t.id === selectedTeam.id ? { ...t, membersCount: Math.max(0, t.membersCount - 1) } : t))
    )
    setMemberToRemove(null)
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {viewMode === "overview" && (
        <HrTeamsOverview
          teams={hrTeams}
          onViewTeam={(team) => { setSelectedTeam(team); setViewMode("details") }}
          onEditTeam={handleOpenEditTeam}
          onDeleteTeam={(team) => setTeamToDelete(team)}
          onCreateTeam={() => { setTeamToEdit(null); setIsCreateModalOpen(true) }}
        />
      )}

      {viewMode === "details" && (
        <HrTeamDetailsView
          team={selectedTeam}
          members={members}
          onBack={() => setViewMode("overview")}
          onManageMembers={() => setViewMode("manage-members")}
        />
      )}

      {viewMode === "manage-members" && (
        <HrManageMembersView
          team={selectedTeam}
          members={members}
          onBack={() => setViewMode("details")}
          onAddMember={handleAddMember}
          onUpdateLeadership={handleUpdateLeadership}
          onReassignMember={handleReassignMember}
          onRemoveMember={(m) => setMemberToRemove(m)}
        />
      )}

      <CreateTeamModal
        isOpen={isCreateModalOpen}
        onClose={() => { setIsCreateModalOpen(false); setTeamToEdit(null) }}
        onSave={handleSaveTeam}
        initialTeam={teamToEdit}
      />

      <DeleteTeamModal
        isOpen={Boolean(teamToDelete)}
        team={toTeamItem(teamToDelete)}
        onClose={() => setTeamToDelete(null)}
        onConfirm={handleConfirmDeleteTeam}
      />

      <RemoveMemberModal
        isOpen={Boolean(memberToRemove)}
        member={memberToRemove}
        teamName={selectedTeam.name}
        onClose={() => setMemberToRemove(null)}
        onConfirm={handleConfirmRemoveMember}
      />
    </div>
  )
}
