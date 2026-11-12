"use client"

import { ThumbsUp, ChatCircleDots, Eye, NotePencil, Trash } from "phosphor-react"
import { ActivityPostItem } from "./types"
import ActivityThumbnail from "./ActivityThumbnail"

interface MyActivityPostsListProps {
  posts: ActivityPostItem[]
  onViewPost: (postId: string) => void
  onEditPost?: (postId: string) => void
  onDeletePost?: (postId: string) => void
}

export default function MyActivityPostsList({
  posts,
  onViewPost,
  onEditPost,
  onDeletePost,
}: MyActivityPostsListProps) {
  const getBadgeStyle = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-50 text-blue-600 border-blue-200"
      case "emerald":
        return "bg-emerald-50 text-emerald-600 border-emerald-200"
      case "amber":
        return "bg-amber-50 text-amber-600 border-amber-200"
      default:
        return "bg-purple-50 text-[#5B50EC] border-purple-200"
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-4 hover:shadow-xs transition-shadow"
        >
          <div className="flex items-start sm:items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1 w-full sm:w-auto">
            <ActivityThumbnail type={post.thumbnailType} src={post.thumbnailUrl} />

            <div className="flex flex-col min-w-0 flex-1 gap-1">
              <span
                className={`w-fit text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border ${getBadgeStyle(
                  post.categoryColor
                )}`}
              >
                {post.categoryBadge}
              </span>

              <h3 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                {post.title}
              </h3>

              <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-1">
                {post.snippet}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-4 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-50">
            <div className="flex flex-col items-start sm:items-end text-[10px] sm:text-[11px] text-gray-400">
              <span className="font-semibold text-gray-600">{post.date}</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1 font-medium">
                  <ThumbsUp size={12} weight="bold" className="text-gray-400" />
                  {post.likesCount}
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <ChatCircleDots size={12} weight="bold" className="text-gray-400" />
                  {post.commentsCount}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => onViewPost(post.id)}
                className="w-8 h-8 rounded-full border border-gray-200 hover:border-[#5B50EC] bg-white hover:bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                title="View Post"
              >
                <Eye size={15} weight="bold" />
              </button>

              <button
                type="button"
                onClick={() => onEditPost?.(post.id)}
                className="w-8 h-8 rounded-full border border-gray-200 hover:border-blue-500 bg-white hover:bg-blue-50 text-gray-500 hover:text-blue-600 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                title="Edit Post"
              >
                <NotePencil size={15} weight="bold" />
              </button>

              <button
                type="button"
                onClick={() => onDeletePost?.(post.id)}
                className="w-8 h-8 rounded-full border border-gray-200 hover:border-rose-500 bg-white hover:bg-rose-50 text-gray-500 hover:text-rose-600 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                title="Delete Post"
              >
                <Trash size={15} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
