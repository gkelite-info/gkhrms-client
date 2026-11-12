"use client"

import { ArrowClockwise } from "phosphor-react"
import { SocialPost } from "./types"
import SocialMediaPostCard from "./SocialMediaPostCard"
import { PostCardSkeleton } from "./SocialMediaSkeletons"

interface EmployeeConnectDrawerFeedProps {
  posts: SocialPost[]
  isLoadingMore: boolean
  hasMorePosts: boolean
  onLoadMore: () => void
  onEditPost: (post: SocialPost) => void
  onDeletePost: (id: string) => void
}

export default function EmployeeConnectDrawerFeed({
  posts,
  isLoadingMore,
  hasMorePosts,
  onLoadMore,
  onEditPost,
  onDeletePost,
}: EmployeeConnectDrawerFeedProps) {
  if (posts.length === 0) {
    return (
      <div className="py-12 px-4 text-center bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center gap-2">
        <span className="text-3xl">🎈</span>
        <p className="text-xs sm:text-sm font-semibold text-gray-700">No posts found in this category</p>
        <p className="text-[11px] text-gray-400">Check back later or share a celebration with your team!</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 pt-1">
      {posts.map((post) => (
        <SocialMediaPostCard
          key={post.id}
          post={post}
          onEditPost={onEditPost}
          onDeletePost={onDeletePost}
        />
      ))}

      {isLoadingMore && <PostCardSkeleton />}

      {hasMorePosts && !isLoadingMore && (
        <button
          type="button"
          onClick={onLoadMore}
          className="self-center flex items-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-500 hover:text-[#5B50EC] hover:border-[#5B50EC] transition-all cursor-pointer shadow-2xs"
        >
          <ArrowClockwise size={13} weight="bold" />
          <span>Load older updates</span>
        </button>
      )}
    </div>
  )
}

