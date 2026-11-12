"use client"

import { useState, useRef, useEffect } from "react"
import { PaperPlaneTilt, ArrowClockwise, Smiley } from "phosphor-react"
import { SocialComment, SocialReply } from "./types"
import SocialMediaCommentItem from "./SocialMediaCommentItem"
import { CommentItemSkeleton } from "./SocialMediaSkeletons"

const EMOJI_GRID = [
  "❤️", "👍", "👏", "🔥", "🎉", "🎂", "🙌", "✨",
  "💯", "💖", "🥳", "🤩", "💐", "🚀", "😍", "😊",
  "😂", "🙏", "💪", "🌟", "😎", "🎯", "🧁", "🎊"
]

interface SocialMediaCommentSectionProps {
  initialComments?: SocialComment[]
  onCommentCountChange?: (newCount: number) => void
}

export default function SocialMediaCommentSection({
  initialComments = [],
  onCommentCountChange,
}: SocialMediaCommentSectionProps) {
  const [comments, setComments] = useState<SocialComment[]>(initialComments)
  const [commentInput, setCommentInput] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMoreComments, setHasMoreComments] = useState(initialComments.length > 2)
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowEmojiPicker(false)
      }
    }
    if (showEmojiPicker) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showEmojiPicker])

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentInput.trim()) return

    const newComment: SocialComment = {
      id: `comm_${Date.now()}`,
      authorName: "Alexander",
      authorInitials: "AL",
      timestamp: "Just now",
      content: commentInput.trim(),
      likesCount: 0,
      replies: [],
    }

    const updated = [newComment, ...comments]
    setComments(updated)
    setCommentInput("")
    setShowEmojiPicker(false)
    onCommentCountChange?.(updated.length)
  }

  const handleAddReply = (commentId: string, reply: SocialReply) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId ? { ...c, replies: [...(c.replies || []), reply] } : c
      )
    )
  }

  const handleLoadMore = () => {
    if (isLoadingMore) return
    setIsLoadingMore(true)
    setTimeout(() => {
      const older: SocialComment = {
        id: `comm_older_${Date.now()}`,
        authorName: "Pooja Hegde",
        authorInitials: "PH",
        timestamp: "Yesterday",
        content: "Many congratulations and best wishes for the journey ahead!",
        likesCount: 3,
        replies: [],
      }
      setComments((prev) => [...prev, older])
      setIsLoadingMore(false)
      setHasMoreComments(false)
    }, 700)
  }

  return (
    <div className="pt-3 border-t border-gray-100 flex flex-col gap-3 relative">
      <form onSubmit={handlePostComment} className="relative flex items-center gap-2">
        <div className="relative flex-1 flex items-center bg-gray-50 rounded-xl px-2.5 py-1.5 border border-gray-100 focus-within:border-[#5B50EC] focus-within:bg-white transition-all">
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="p-1 rounded-lg text-gray-400 hover:text-[#5B50EC] hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
            title="Add emoji"
          >
            <Smiley size={18} weight="bold" />
          </button>

          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Write a comment..."
            className="w-full text-xs bg-transparent focus:outline-none px-2 text-gray-800 placeholder:text-gray-400"
          />

          {showEmojiPicker && (
            <div
              ref={pickerRef}
              className="absolute bottom-11 left-0 z-50 bg-white border border-gray-100 shadow-xl rounded-2xl p-2.5 w-[240px] grid grid-cols-6 gap-1 animate-in fade-in zoom-in-95 duration-150"
            >
              {EMOJI_GRID.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setCommentInput((prev) => prev + emoji)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-sm active:scale-125 transition-transform cursor-pointer"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!commentInput.trim()}
          className="h-8 px-3 rounded-xl bg-[#5B50EC] text-white hover:bg-[#483ece] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center shrink-0 shadow-2xs"
          title="Send comment"
        >
          <PaperPlaneTilt size={14} weight="bold" />
        </button>
      </form>

      <div className="flex flex-col gap-3 pt-1">
        {comments.map((comment) => (
          <SocialMediaCommentItem
            key={comment.id}
            comment={comment}
            onAddReply={handleAddReply}
          />
        ))}

        {isLoadingMore && <CommentItemSkeleton />}

        {hasMoreComments && !isLoadingMore && (
          <button
            type="button"
            onClick={handleLoadMore}
            className="self-center flex items-center gap-1.5 py-1 text-[11px] font-semibold text-gray-400 hover:text-[#5B50EC] transition-colors cursor-pointer"
          >
            <ArrowClockwise size={12} weight="bold" />
            <span>Load more comments</span>
          </button>
        )}
      </div>
    </div>
  )
}
