export type TicketStatus = "Resolved" | "In Progress" | "Open"
export type TicketPriority = "Low" | "Medium" | "High" | "Critical"
export type TicketCategory = "Hardware" | "Software" | "Network / VPN" | "Access / Permissions" | "Other"

export interface ItTicket {
  id: string
  subject: string
  category: TicketCategory
  priority: TicketPriority
  status: TicketStatus
  date: string
  resolutionTime?: string
  iconType: "laptop" | "wifi" | "code" | "printer"
  message?: string
}

export interface TicketMetrics {
  total: number
  resolved: number
  inProgress: number
}

