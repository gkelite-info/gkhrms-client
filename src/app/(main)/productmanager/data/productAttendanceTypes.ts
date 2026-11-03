export type MemberRole = "Manager" | "Team Lead" | "Employee"
export type AttendanceStatus = "Present" | "WFH" | "On Leave" | "Absent"

export interface ProductProject {
  id: string
  name: string
  description?: string
  totalCount: number
}

export interface ProductTeamMember {
  id: string
  employeeId: string
  name: string
  avatar?: string | null
  designation: string
  role: MemberRole
  status: AttendanceStatus
  checkIn: string
  checkOut: string
  workingHours: string
  productId: string
  date: string
  email?: string
  shift?: string
}

export interface ProductMemberDetails {
  id: string
  employeeId: string
  name: string
  avatar?: string | null
  designation: string
  department: string
  status: "Present" | "Late" | "On Leave"
  checkIn: string
  checkOut: string
  workingHours: string
  shift: string
  attendancePercentage: number
  presentDays: number
  leaveDays: number
  lateDays: number
  monthlyTrends: Array<{
    month: string
    year: number
    percentage: number
    isActive?: boolean
  }>
  history: Array<{
    id: string
    date: string
    status: "Present" | "Late" | "On Leave"
    checkIn: string
    checkOut: string
    effectiveHours: string
    grossHours: string
  }>
}

