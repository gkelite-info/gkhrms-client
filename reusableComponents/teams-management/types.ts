export interface TeamMember {
  id: string
  name: string
  email?: string
  role?: string
  avatar?: string
}

export interface ManagerUser {
  id: string
  name: string
  avatar?: string
  role?: string
}

export interface RoleUser {
  id: string
  name: string
  role: string
  avatar?: string
  email?: string
  department?: string
}

export interface TeamItem {
  id: string
  name: string
  chairman?: RoleUser | string
  hrManager?: RoleUser | string
  manager?: ManagerUser | RoleUser
  financeManager?: RoleUser | string
  asstManager?: RoleUser | string
  financeExecutive?: RoleUser | string
  techAdmin?: RoleUser | string
  teamLead?: RoleUser | string
  teamLeadAvatar?: string
  membersCount: number
  members: TeamMember[]
  department?: string
  createdAt?: string
}

export interface TeamsManagementProps {
  currentRole?: string
  canCreateTeam?: boolean
  canEditTeam?: boolean
  canDeleteTeam?: boolean
  initialTeams?: TeamItem[]
  defaultTab?: "management" | "tree" | "chat"
}

export interface TeamTreeNode {
  id: string
  name: string
  role: string
  avatar?: string
  isTeamProject?: boolean
  teamName?: string
  department?: string
  reportingTo?: string
  reportingToRole?: string
  membersCount?: number
  iconType?: "crown" | "briefcase" | "users" | "flag"
}

export interface ChatAttachment {
  name: string
  size: string
  type: "image" | "pdf" | "file"
  url?: string
}

export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  text: string
  timestamp: string
  isOutgoing: boolean
  status?: "sent" | "delivered" | "read"
  attachment?: ChatAttachment
}

export interface ChatConversation {
  id: string
  name: string
  role: string
  avatar?: string
  team: string
  department?: string
  reportingTo?: string
  reportingToRole?: string
  lastMessage: string
  lastMessageTime: string
  unreadCount?: number
  isOnline?: boolean
  messages: ChatMessage[]
}

export interface SharedFileItem {
  id: string
  name: string
  size: string
  date: string
  type: "pdf" | "sheet" | "doc"
}

export interface SharedMediaItem {
  id: string
  title: string
  url: string
  date: string
}

export interface SharedLinkItem {
  id: string
  title: string
  url: string
  domain: string
  date: string
}

export interface RecentActivityItem {
  id: string
  action: string
  target: string
  time: string
}
