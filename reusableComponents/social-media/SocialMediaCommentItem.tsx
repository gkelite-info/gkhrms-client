"use client"

import { useState } from "react"
import { Heart, CaretDown, CaretUp, PaperPlaneTilt } from "phosphor-react"
import { SocialComment, SocialReply } from "./types"
import SocialMediaCommentReplyItem from "./SocialMediaCommentReplyItem"
import ReusableAvatar from "../ReusableAvatar"

interface SocialMediaCommentItemProps {
  comment: SocialComment
  onAddReply?: (commentId: string, reply: SocialReply) => void
}

export default function SocialMediaCommentItem({
  comment,
  onAddReply,
}: SocialMediaCommentItemProps) {
  const [isLiked, setIsLiked] = useState(comment.isLiked || false)
  const [likesCount, setLikesCount] = useState(comment.likesCount)
  const [showReplies, setShowReplies] = useState(false)
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyText, setReplyText] = useState("")
  const [replies, setReplies] = useState<SocialReply[]>(comment.replies || [])

  const handleToggleLike = () => {
    const nextState = !isLiked
    setIsLiked(nextState)
    setLikesCount((prev) => (nextState ? prev + 1 : prev - 1))
  }

  const handleStartReply = (authorName?: string) => {
    setShowReplyInput(true)
    setReplyText(authorName ? `@${authorName} ` : "")
  }

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyText.trim()) return

    const newReply: SocialReply = {
      id: `rep_${Date.now()}`,
      authorName: "You",
      authorInitials: "YO",
      timestamp: "Just now",
      content: replyText.trim(),
      likesCount: 0,
    }

    setReplies((prev) => [...prev, newReply])
    setReplyText("")
    setShowReplyInput(false)
    setShowReplies(true)
    onAddReply?.(comment.id, newReply)
  }

  return (
    <div className="flex flex-col gap-1 text-xs">
      <div className="flex items-start gap-2.5">
        <ReusableAvatar
          src={comment.authorAvatar}
          name={comment.authorName}
          size={28}
          shape="circle"
          fallbackType="initials"
          bgColor="#EEF2FF"
          textColor="#5B50EC"
          className="shrink-0 shadow-2xs"
        />

        <div className="flex-1 min-w-0">
          <div className="bg-[#F8F9FE] px-3 py-2.5 rounded-2xl border border-gray-100">
            <div className="flex items-center justify-between gap-1">
              <span className="font-bold text-gray-900 text-xs truncate">
                {comment.authorName}
              </span>
              <span className="text-[10px] text-gray-400 shrink-0">
                {comment.timestamp}
              </span>
            </div>
            <p className="text-gray-700 text-xs mt-0.5 leading-relaxed break-words">
              {comment.content}
            </p>
          </div>

          <div className="flex items-center gap-4 px-1 mt-1 text-[11px] text-gray-400 font-medium">
            <button
              type="button"
              onClick={handleToggleLike}
              className={`flex items-center gap-1 transition-colors cursor-pointer ${
                isLiked ? "text-rose-500 font-bold" : "hover:text-rose-500"
              }`}
            >
              <Heart size={13} weight={isLiked ? "fill" : "regular"} />
              <span>{likesCount > 0 ? likesCount : "Like"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleStartReply(comment.authorName)}
              className="hover:text-[#5B50EC] transition-colors cursor-pointer"
            >
              Reply
            </button>
          </div>
        </div>
      </div>

      {showReplyInput && (
        <form
          onSubmit={handlePostReply}
          className="ml-8 sm:ml-9 mt-1 flex items-center gap-1.5 bg-white border border-[#5B50EC]/30 rounded-xl p-1.5 shadow-2xs"
        >
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={`Reply to @${comment.authorName}...`}
            className="flex-1 text-xs bg-transparent focus:outline-none px-2 text-gray-800 placeholder:text-gray-400"
            autoFocus
          />
          <button
            type="submit"
            disabled={!replyText.trim()}
            className="px-2.5 py-1 rounded-lg bg-[#5B50EC] text-white hover:bg-[#483ece] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center justify-center shrink-0"
          >
            <PaperPlaneTilt size={13} weight="bold" />
          </button>
        </form>
      )}

      {replies.length > 0 && (
        <div className="ml-6 sm:ml-9 mt-1 pl-2 border-l-2 border-gray-100 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => setShowReplies((prev) => !prev)}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#5B50EC] hover:text-[#4438CA] transition-colors cursor-pointer w-fit py-0.5"
          >
            {showReplies ? (
              <>
                <CaretUp size={12} weight="bold" />
                <span>Hide {replies.length === 1 ? "reply" : "replies"}</span>
              </>
            ) : (
              <>
                <CaretDown size={12} weight="bold" />
                <span>View {replies.length} {replies.length === 1 ? "reply" : "replies"}</span>
              </>
            )}
          </button>

          {showReplies && (
            <div className="flex flex-col gap-1.5 pt-0.5">
              {replies.map((reply) => (
                <SocialMediaCommentReplyItem
                  key={reply.id}
                  reply={reply}
                  onReply={handleStartReply}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
