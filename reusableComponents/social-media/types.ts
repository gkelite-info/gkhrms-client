export type SocialPostCategory =
  | "all"
  | "birthdays"
  | "anniversaries"
  | "new_joiners"
  | "recognitions"

export interface SocialBannerData {
  employeeName: string
  employeePhoto?: string
  years?: number
  title?: string
  subtitle?: string
}

export interface SocialReply {
  id: string
  authorName: string
  authorAvatar?: string
  authorInitials?: string
  authorRole?: string
  timestamp: string
  content: string
  likesCount: number
  isLiked?: boolean
}

export interface SocialComment {
  id: string
  authorName: string
  authorAvatar?: string
  authorInitials?: string
  authorRole?: string
  timestamp: string
  content: string
  likesCount: number
  isLiked?: boolean
  replies?: SocialReply[]
}

export interface SocialPollOption {
  id: string
  text: string
  votes: number
}

export interface SocialPollData {
  question: string
  options: SocialPollOption[]
  totalVotes: number
  userVotedOptionId?: string
  endDate?: string
}

export interface SocialPost {
  id: string
  authorName: string
  authorAvatar?: string
  authorInitials?: string
  authorRole?: string
  category: "birthday" | "anniversary" | "new_joiner" | "recognition" | "general"
  categoryBadge: string
  timestamp: string
  content: string
  images?: string[]
  bannerType?: "birthday" | "anniversary" | "welcome" | "custom"
  bannerData?: SocialBannerData
  pollData?: SocialPollData
  likesCount: number
  commentsCount: number
  sharesCount?: number
  isLiked?: boolean
  isCurrentUserPost?: boolean
  comments?: SocialComment[]
}

export const SOCIAL_AUDIENCE_OPTIONS = [
  { label: "👥 All Employees", value: "all" },
  { label: "🏢 Engineering Team", value: "engineering" },
  { label: "🎯 Product & Design", value: "design" },
  { label: "📊 Sales & Marketing", value: "sales" },
]

export interface EmployeeConnectDrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  onCreatePost?: () => void
  onCreatePoll?: () => void
  initialPosts?: SocialPost[]
}
