import { ItTicket, TicketMetrics } from "./types"

export const INITIAL_TICKET_METRICS: TicketMetrics = {
  total: 28,
  resolved: 18,
  inProgress: 5,
}

export const MOCK_TICKETS: ItTicket[] = [
  { id: "TKT-1058", subject: "VPN access request", category: "Network / VPN", priority: "High", status: "Resolved", date: "Nov 25, 2026", resolutionTime: "5h 46m", iconType: "laptop" },
  { id: "TKT-1057", subject: "Laptop not getting Wi-Fi", category: "Hardware", priority: "Medium", status: "In Progress", date: "Nov 24, 2026", iconType: "wifi" },
  { id: "TKT-1056", subject: "Software installation – VS Code", category: "Software", priority: "Low", status: "Resolved", date: "Nov 22, 2026", resolutionTime: "6h 15m", iconType: "code" },
  { id: "TKT-1054", subject: "Printer not working", category: "Hardware", priority: "Medium", status: "Resolved", date: "Nov 18, 2026", resolutionTime: "22h 18m", iconType: "printer" },
  { id: "TKT-1053", subject: "Dual monitor HDMI adapter request", category: "Hardware", priority: "Low", status: "Resolved", date: "Nov 15, 2026", resolutionTime: "3h 10m", iconType: "laptop" },
  { id: "TKT-1052", subject: "SSO login loop issue", category: "Access / Permissions", priority: "Critical", status: "In Progress", date: "Nov 12, 2026", iconType: "wifi" },
  { id: "TKT-1051", subject: "Node.js environment setup", category: "Software", priority: "Medium", status: "Resolved", date: "Nov 10, 2026", resolutionTime: "1h 45m", iconType: "code" },
  { id: "TKT-1050", subject: "Keyboard key sticking issue", category: "Hardware", priority: "Low", status: "Resolved", date: "Nov 08, 2026", resolutionTime: "4h 20m", iconType: "laptop" },
  { id: "TKT-1049", subject: "Database client access rights", category: "Access / Permissions", priority: "High", status: "In Progress", date: "Nov 05, 2026", iconType: "code" },
  { id: "TKT-1048", subject: "Office network speed degradation", category: "Network / VPN", priority: "Medium", status: "Resolved", date: "Nov 03, 2026", resolutionTime: "2h 30m", iconType: "wifi" },
  { id: "TKT-1047", subject: "Color printer toner replacement", category: "Hardware", priority: "Low", status: "Resolved", date: "Oct 29, 2026", resolutionTime: "18h 05m", iconType: "printer" },
  { id: "TKT-1046", subject: "Cloud sandbox account provision", category: "Access / Permissions", priority: "High", status: "Resolved", date: "Oct 26, 2026", resolutionTime: "7h 12m", iconType: "laptop" },
  { id: "TKT-1045", subject: "Figma enterprise license invite", category: "Software", priority: "Medium", status: "Resolved", date: "Oct 24, 2026", resolutionTime: "3h 40m", iconType: "code" },
  { id: "TKT-1044", subject: "Ethernet port inactive at desk 4B", category: "Network / VPN", priority: "Medium", status: "In Progress", date: "Oct 21, 2026", iconType: "wifi" },
  { id: "TKT-1043", subject: "RAM upgrade request for dev machine", category: "Hardware", priority: "High", status: "Resolved", date: "Oct 18, 2026", resolutionTime: "24h 00m", iconType: "laptop" },
  { id: "TKT-1042", subject: "Badge reader not opening server room", category: "Access / Permissions", priority: "Critical", status: "Resolved", date: "Oct 15, 2026", resolutionTime: "1h 10m", iconType: "printer" },
  { id: "TKT-1041", subject: "Postman workspace shared link request", category: "Software", priority: "Low", status: "Resolved", date: "Oct 12, 2026", resolutionTime: "2h 15m", iconType: "code" },
  { id: "TKT-1040", subject: "Zoom conference room audio failure", category: "Hardware", priority: "High", status: "In Progress", date: "Oct 09, 2026", iconType: "laptop" },
  { id: "TKT-1039", subject: "Office Wi-Fi certificate renew", category: "Network / VPN", priority: "Medium", status: "Resolved", date: "Oct 06, 2026", resolutionTime: "4h 50m", iconType: "wifi" },
  { id: "TKT-1038", subject: "Docker desktop license renewal", category: "Software", priority: "Medium", status: "Resolved", date: "Oct 02, 2026", resolutionTime: "5h 15m", iconType: "code" },
  { id: "TKT-1037", subject: "Multi-function scanner driver install", category: "Hardware", priority: "Low", status: "Resolved", date: "Sep 28, 2026", resolutionTime: "12h 30m", iconType: "printer" },
  { id: "TKT-1036", subject: "GitHub organization permissions", category: "Access / Permissions", priority: "High", status: "Resolved", date: "Sep 25, 2026", resolutionTime: "3h 05m", iconType: "code" },
  { id: "TKT-1035", subject: "Secondary charger replacement", category: "Hardware", priority: "Low", status: "Resolved", date: "Sep 20, 2026", resolutionTime: "6h 45m", iconType: "laptop" },
  { id: "TKT-1034", subject: "Guest Wi-Fi portal unreachable", category: "Network / VPN", priority: "Medium", status: "Resolved", date: "Sep 17, 2026", resolutionTime: "2h 10m", iconType: "wifi" },
  { id: "TKT-1033", subject: "Slack enterprise grid migration bug", category: "Software", priority: "High", status: "Resolved", date: "Sep 14, 2026", resolutionTime: "8h 20m", iconType: "code" },
  { id: "TKT-1032", subject: "New monitor stand request", category: "Hardware", priority: "Low", status: "Resolved", date: "Sep 10, 2026", resolutionTime: "16h 00m", iconType: "laptop" },
  { id: "TKT-1031", subject: "VPN split tunneling reconfiguration", category: "Network / VPN", priority: "Medium", status: "Resolved", date: "Sep 07, 2026", resolutionTime: "4h 15m", iconType: "wifi" },
  { id: "TKT-1030", subject: "Barcode scanner not reading IDs", category: "Hardware", priority: "Medium", status: "Resolved", date: "Sep 03, 2026", resolutionTime: "9h 30m", iconType: "printer" },
]

