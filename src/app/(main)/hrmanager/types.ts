export type UserStatus = "Active" | "Inactive"

export interface UserRecord {
  id: string
  name: string
  initials: string
  employeeId: string
  email: string
  phone: string
  role: string
  department: string
  status: UserStatus
  createdDate: string
  designation?: string
  workLocation?: string
  joiningDate?: string
  employmentType?: string
  reportingTo?: string
  invitationStatus?: string
  avatarUrl?: string
  gender?: string
  address?: string
  city?: string
  state?: string
  pinCode?: string
  notes?: string
}

export interface DepartmentRecord {
  id: string
  name: string
  code: string
  departmentHead: string
  employees: number
  designations: number
  status: "Active" | "Inactive"
}

export interface UserStats {
  total: number
  active: number
  inactive: number
  registeredToday: number
}

export interface FilterState {
  search: string
  role: string
  status: string
  department: string
}
