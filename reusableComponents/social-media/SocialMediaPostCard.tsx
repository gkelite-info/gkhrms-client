"use client"

import { useState, useRef, useEffect } from "react"
import { Heart, ChatCircleDots, DotsThreeVertical, PencilSimple, Trash } from "phosphor-react"
import { SocialPost } from "./types"
import SocialMediaCardBanner from "./SocialMediaCardBanner"
import SocialMediaCommentSection from "./SocialMediaCommentSection"
import SocialMediaPollCard from "./SocialMediaPollCard"
import ReusableAvatar from "../ReusableAvatar"

interface SocialMediaPostCardProps {
  post: SocialPost
  onLikeToggle?: (postId: string, newLiked: boolean) => void
  onEditPost?: (post: SocialPost) => void
  onDeletePost?: (postId: string) => void
}

export default function SocialMediaPostCard({
  post,
  onLikeToggle,
  onEditPost,
  onDeletePost,
}: SocialMediaPostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false)
  const [likesCount, setLikesCount] = useState(post.likesCount)
  const [showComments, setShowComments] = useState(false)
  const [commentsCount, setCommentsCount] = useState(post.commentsCount)
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false)
      }
    }
    if (showMenu) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showMenu])

  const handleToggleLike = () => {
    const nextState = !isLiked
    setIsLiked(nextState)
    setLikesCount((prev) => (nextState ? prev + 1 : prev - 1))
    onLikeToggle?.(post.id, nextState)
  }

  const getBadgeStyle = () => {
    switch (post.category) {
      case "birthday": return "text-rose-500 font-semibold"
      case "anniversary": return "text-amber-600 font-semibold"
      case "new_joiner": return "text-emerald-600 font-semibold"
      default: return "text-[#5B50EC] font-semibold"
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100/90 shadow-2xs hover:shadow-xs transition-shadow p-3.5 sm:p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between relative">
        <div className="flex items-center gap-2.5 min-w-0">
          <ReusableAvatar
            src={post.authorAvatar}
            name={post.authorName.replace(/\(You\)/i, "").trim()}
            size={36}
            shape="circle"
            fallbackType="initials"
            bgColor="#EEF2FF"
            textColor="#5B50EC"
            className="shrink-0 shadow-2xs"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-sm font-bold text-gray-900 leading-snug truncate">
              {post.authorName}
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
              <span className={getBadgeStyle()}>{post.categoryBadge}</span>
              <span>•</span>
              <span className="truncate">{post.timestamp}</span>
            </div>
          </div>
        </div>

        {post.isCurrentUserPost && (
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setShowMenu((prev) => !prev)}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer shrink-0"
              title="Post options"
            >
              <DotsThreeVertical size={16} weight="bold" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-7 z-20 w-32 bg-white rounded-xl shadow-lg border border-gray-100 py-1 flex flex-col text-xs animate-in fade-in zoom-in-95 duration-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false)
                    onEditPost?.(post)
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer font-medium text-left"
                >
                  <PencilSimple size={14} />
                  <span>Edit Post</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false)
                    onDeletePost?.(post.id)
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer font-medium text-left"
                >
                  <Trash size={14} />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {post.content && (
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {post.content}
        </p>
      )}

      {post.images && post.images.length > 0 && (
        <div className={`grid gap-2 rounded-2xl overflow-hidden ${
          post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
        }`}>
          {post.images.map((img, i) => (
            <img key={i} src={img} alt="Post attachment" className="w-full h-36 sm:h-44 object-cover rounded-xl border border-gray-100" />
          ))}
        </div>
      )}

      {post.pollData && <SocialMediaPollCard pollData={post.pollData} />}

      {post.bannerType && (
        <SocialMediaCardBanner type={post.bannerType} data={post.bannerData} />
      )}

      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-500 select-none">
        <button
          type="button"
          onClick={handleToggleLike}
          className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
            isLiked ? "text-rose-500 font-bold bg-rose-50/70" : "text-gray-600 hover:bg-gray-50 hover:text-rose-500"
          }`}
        >
          <Heart size={16} weight={isLiked ? "fill" : "regular"} />
          <span>{likesCount} Likes</span>
        </button>

        <button
          type="button"
          onClick={() => setShowComments((prev) => !prev)}
          className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
            showComments ? "text-[#5B50EC] font-semibold bg-[#EEF2FF]" : "text-gray-600 hover:bg-gray-50 hover:text-[#5B50EC]"
          }`}
        >
          <ChatCircleDots size={16} weight="regular" />
          <span>{commentsCount} Comments</span>
        </button>
      </div>

      {showComments && (
        <SocialMediaCommentSection
          initialComments={post.comments}
          onCommentCountChange={setCommentsCount}
        />
      )}
    </div>
  )
}
