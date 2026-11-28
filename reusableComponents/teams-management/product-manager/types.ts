export interface ProjectPerson {
  name: string
  avatar: string
  email?: string
  role?: string
}

export interface ProductProjectItem {
  id: string
  numericId: number
  name: string
  code: string
  iconType: "swap" | "desktop" | "archive" | "mobile"
  iconBg: string
  iconColor: string
  manager: ProjectPerson
  assistantManager: ProjectPerson
  teamLeads: ProjectPerson[]
  extraLeadsCount?: number
  totalMembers: number
  startDate: string
  status: "Active" | "Inactive"
}

export interface ProductManagerStats {
  totalProjects: number
  activeProjects: number
  totalMembers: number
}

export type ProductManagerTabKey = "projects" | "tree" | "chat"
