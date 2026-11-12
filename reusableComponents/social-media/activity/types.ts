export type ActivityTab = "my-posts" | "liked-posts" | "my-comments" | "my-polls"

export interface ActivityPostItem {
  id: string
  title: string
  snippet: string
  category: string
  categoryBadge: string
  categoryColor: "purple" | "blue" | "emerald" | "amber"
  thumbnailType: "welcome" | "image" | "workshop" | "celebration"
  thumbnailUrl?: string
  date: string
  likesCount: number
  commentsCount: number
}

export interface ActivityLikedPostItem {
  id: string
  title: string
  snippet: string
  categoryBadge: string
  categoryColor: "purple" | "blue" | "emerald" | "amber"
  thumbnailType: "welcome" | "image" | "workshop" | "celebration"
  thumbnailUrl?: string
  authorName: string
  authorRole: string
  authorAvatar?: string
  date: string
  likesCount: number
  commentsCount: number
}

export interface ActivityCommentItem {
  id: string
  postId: string
  postTitle: string
  postAuthor: string
  postDate: string
  categoryBadge: string
  thumbnailType: "welcome" | "image" | "workshop" | "celebration"
  thumbnailUrl?: string
  myComment: string
  commentDate: string
}

export interface ActivityPollItem {
  id: string
  authorName: string
  authorAvatar?: string
  question: string
  yesPercentage: number
  noPercentage: number
  totalResponses: number
  status: "active" | "closed"
  isMyPoll?: boolean
}

