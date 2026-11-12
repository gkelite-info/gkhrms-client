"use client"

import { useState } from "react"
import { Heart } from "phosphor-react"
import { SocialReply } from "./types"
import ReusableAvatar from "../ReusableAvatar"

interface SocialMediaCommentReplyItemProps {
  reply: SocialReply
  onReply?: (authorName: string) => void
}

export default function SocialMediaCommentReplyItem({
  reply,
  onReply,
}: SocialMediaCommentReplyItemProps) {
  const [isLiked, setIsLiked] = useState(reply.isLiked || false)
  const [likesCount, setLikesCount] = useState(reply.likesCount)

  const handleToggleLike = () => {
    const nextState = !isLiked
    setIsLiked(nextState)
    setLikesCount((prev) => (nextState ? prev + 1 : prev - 1))
  }

  return (
    <div className="flex items-start gap-2 pt-1.5 group">
      <ReusableAvatar
        src={reply.authorAvatar}
        name={reply.authorName}
        size={24}
        shape="circle"
        fallbackType="initials"
        bgColor="#E0E7FF"
        textColor="#4338CA"
        className="shrink-0"
      />

      <div className="flex-1 min-w-0">
        <div className="bg-[#F8F9FE] px-3 py-2 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] font-bold text-gray-900 truncate">
              {reply.authorName}
            </span>
            <span className="text-[10px] text-gray-400 shrink-0">
              {reply.timestamp}
            </span>
          </div>
          <p className="text-xs text-gray-700 mt-0.5 leading-snug break-words">
            {reply.content}
          </p>
        </div>

        <div className="flex items-center gap-3 px-1 mt-1 text-[10px] text-gray-400 font-medium">
          <button
            type="button"
            onClick={handleToggleLike}
            className={`flex items-center gap-1 transition-colors cursor-pointer ${
              isLiked ? "text-rose-500 font-bold" : "hover:text-rose-500"
            }`}
          >
            <Heart size={12} weight={isLiked ? "fill" : "regular"} />
            <span>{likesCount > 0 ? likesCount : "Like"}</span>
          </button>

          <button
            type="button"
            onClick={() => onReply?.(reply.authorName)}
            className="hover:text-[#5B50EC] transition-colors cursor-pointer"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  )
}
