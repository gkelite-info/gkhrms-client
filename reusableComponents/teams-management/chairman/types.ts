export type ChairmanRoleCategoryId =
  | "managers"
  | "finance"
  | "team_leads"
  | "employees"
  | "tech_admins"
  | "hr"
  | "product_managers"
  | "accountants"

export interface ChairmanRoleCategory {
  id: ChairmanRoleCategoryId
  label: string
  count?: number
}

export interface ChairmanMemberItem {
  id: string
  name: string
  email: string
  employeeId: string
  designation: string
  department: string
  location: string
  reportingTo: string
  status: "Active" | "Inactive"
  avatar?: string
  category: ChairmanRoleCategoryId
}

export interface ChairmanFilterState {
  searchQuery: string
  department: string
  location: string
  status: string
}
