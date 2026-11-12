"use client"

import { ChatCircleDots, Eye, NotePencil, Trash } from "phosphor-react"
import { ActivityCommentItem } from "./types"
import ActivityThumbnail from "./ActivityThumbnail"

interface MyActivityCommentsListProps {
  comments: ActivityCommentItem[]
  onViewPost: (postId: string) => void
  onEditComment?: (commentId: string) => void
  onDeleteComment?: (commentId: string) => void
}

export default function MyActivityCommentsList({
  comments,
  onViewPost,
  onEditComment,
  onDeleteComment,
}: MyActivityCommentsListProps) {
  return (
    <div className="flex flex-col gap-3">
      {comments.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 md:gap-4 hover:shadow-xs transition-shadow"
        >
          <div className="flex items-start sm:items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1 w-full md:w-auto">
            <ActivityThumbnail type={item.thumbnailType} src={item.thumbnailUrl} />

            <div className="flex flex-col min-w-0 flex-1 gap-1">
              <span className="w-fit text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border bg-purple-50 text-[#5B50EC] border-purple-200">
                {item.categoryBadge}
              </span>

              <h3 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                {item.postTitle}
              </h3>

              <span className="text-[10px] text-gray-400 truncate">
                Posted by {item.postAuthor} • {item.postDate}
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-0 bg-[#F9F9FE] p-2.5 rounded-xl border border-gray-100 w-full md:max-w-[320px]">
            <div className="flex items-center gap-1.5 text-[#5B50EC] text-[10px] sm:text-[11px] font-bold mb-0.5">
              <ChatCircleDots size={13} weight="fill" />
              <span>My Comment</span>
            </div>
            <p className="text-xs text-gray-700 leading-snug line-clamp-2">
              {item.myComment}
            </p>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-2.5 sm:gap-4 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-50">
            <span className="text-[10px] sm:text-[11px] text-gray-400 font-semibold shrink-0">
              {item.commentDate}
            </span>

            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => onViewPost(item.postId)}
                className="w-8 h-8 rounded-full border border-gray-200 hover:border-[#5B50EC] bg-white hover:bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                title="View Post"
              >
                <Eye size={15} weight="bold" />
              </button>

              <button
                type="button"
                onClick={() => onEditComment?.(item.id)}
                className="w-8 h-8 rounded-full border border-gray-200 hover:border-blue-500 bg-white hover:bg-blue-50 text-gray-500 hover:text-blue-600 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                title="Edit Comment"
              >
                <NotePencil size={15} weight="bold" />
              </button>

              <button
                type="button"
                onClick={() => onDeleteComment?.(item.id)}
                className="w-8 h-8 rounded-full border border-gray-200 hover:border-rose-500 bg-white hover:bg-rose-50 text-gray-500 hover:text-rose-600 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                title="Delete Comment"
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
