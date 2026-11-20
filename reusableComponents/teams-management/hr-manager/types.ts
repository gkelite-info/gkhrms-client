export interface HrTeamReportingNode {
  name: string
  role: string
  avatar: string
}

export interface HrTeamSnapshot {
  activeMembers: number
  wfh: number
  onLeave: number
  updatedAt: string
}

export interface HrTeamItem {
  id: string
  name: string
  code: string
  department: string
  managerName: string
  managerAvatar: string
  project: string
  membersCount: number
  status: "Active" | "Inactive"
  createdOn: string
  reportingStructure: {
    manager: HrTeamReportingNode
    assistantManager?: HrTeamReportingNode
    teamLead?: HrTeamReportingNode
  }
  snapshot: HrTeamSnapshot
}

export interface HrTeamMember {
  id: string
  name: string
  avatar: string
  employeeId: string
  designation: string
  teamRole: string
  department: string
  reportingTo: string
  status: "Active" | "On Leave" | "Inactive"
}

export type HrTeamsViewMode = "overview" | "details" | "manage-members"
