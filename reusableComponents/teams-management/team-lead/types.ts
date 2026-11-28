export interface TeamLeadMemberItem {
  id: string
  numericId: number
  name: string
  avatar: string
  employeeId: string
  designation: string
  role: "Team Lead" | "Employee"
  department: string
  reportingTo: string
  reportingToRole?: string
  status: "Present" | "On Leave" | "WFH"
  employmentType?: string
  workLocation?: string
  email?: string
  phone?: string
  joiningDate?: string
}

export interface TeamLeadSummaryStats {
  teamName: string
  manager: string
  assistantManager: string
  totalMembers: number
  presentToday: number
  onLeave: number
  workFromHome: number
}
