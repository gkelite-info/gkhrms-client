import { TeamItem } from "../types"
import { HrTeamItem } from "./types"

export function toTeamItem(team: HrTeamItem | null): TeamItem | null {
  if (!team) return null
  return {
    id: team.id,
    name: team.name,
    department: team.department,
    manager: { id: "mgr", name: team.managerName, avatar: team.managerAvatar },
    membersCount: team.membersCount,
    members: [],
  }
}

export function buildNewHrTeam(savedTeam: Partial<TeamItem>): HrTeamItem {
  const mgrName = (savedTeam.manager as any)?.name || "Ravi Kumar"
  const mgrAvatar = (savedTeam.manager as any)?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
  return {
    id: `team-${Date.now()}`,
    name: savedTeam.name || "New Team",
    code: `TM-${(savedTeam.department || "TECH").substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
    department: savedTeam.department || "Technology",
    managerName: mgrName,
    managerAvatar: mgrAvatar,
    project: savedTeam.name || "GK Gym Life",
    membersCount: savedTeam.members?.length || 1,
    status: "Active",
    createdOn: "Oct 12, 2026",
    reportingStructure: {
      manager: { name: mgrName, role: "Manager", avatar: mgrAvatar },
    },
    snapshot: { activeMembers: 1, wfh: 0, onLeave: 0, updatedAt: "Updated just now" },
  }
}

export function applyTeamEdit(
  teams: HrTeamItem[],
  editId: string,
  savedTeam: Partial<TeamItem>
): HrTeamItem[] {
  return teams.map((t) => {
    if (t.id !== editId) return t
    const mgrName = (savedTeam.manager as any)?.name || t.managerName
    const mgrAvatar = (savedTeam.manager as any)?.avatar || t.managerAvatar
    return {
      ...t,
      name: savedTeam.name || t.name,
      department: savedTeam.department || t.department,
      managerName: mgrName,
      managerAvatar: mgrAvatar,
      reportingStructure: {
        ...t.reportingStructure,
        manager: { name: mgrName, role: "Manager", avatar: mgrAvatar },
      },
    }
  })
}
