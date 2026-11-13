"use client"

import { useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { ActivityTab, ActivityPostItem, ActivityLikedPostItem, ActivityCommentItem, ActivityPollItem } from "./types"
import { MOCK_MY_POSTS, MOCK_LIKED_POSTS, MOCK_MY_COMMENTS, MOCK_ACTIVITY_POLLS } from "./mockActivityData"
import { DEFAULT_SOCIAL_POSTS } from "../mockSocialData"
import { SocialPost } from "../types"
import MyActivityHeader from "./MyActivityHeader"
import MyActivityTabsNav from "./MyActivityTabsNav"
import MyActivityPostsList from "./MyActivityPostsList"
import MyActivityLikedPostsList from "./MyActivityLikedPostsList"
import MyActivityCommentsList from "./MyActivityCommentsList"
import MyActivityPollsList from "./MyActivityPollsList"
import SocialMediaPostDetailView from "./SocialMediaPostDetailView"
import EditCommentModal from "./EditCommentModal"
import CreatePostModal from "../CreatePostModal"
import ReusablePagination from "../../ReusablePagination"
import ReusableConfirmationModal from "../../ReusableConfirmationModal"

export default function MyActivityScreen() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeTab = (searchParams.get("tab") as ActivityTab) || "my-posts"
  const subTab = (searchParams.get("subtab") as "active" | "closed" | "my") || "active"
  const currentPage = Number(searchParams.get("page")) || 1
  const viewPostId = searchParams.get("viewPost")
  const [pageSize, setPageSize] = useState(3)

  const [posts, setPosts] = useState<ActivityPostItem[]>(MOCK_MY_POSTS)
  const [likedPosts, setLikedPosts] = useState<ActivityLikedPostItem[]>(MOCK_LIKED_POSTS)
  const [comments, setComments] = useState<ActivityCommentItem[]>(MOCK_MY_COMMENTS)
  const [polls, setPolls] = useState<ActivityPollItem[]>(MOCK_ACTIVITY_POLLS)

  const [deletingItem, setDeletingItem] = useState<{ id: string; type: "post" | "comment" | "liked" | "poll" } | null>(null)
  const [editingPost, setEditingPost] = useState<SocialPost | null>(null)
  const [editingComment, setEditingComment] = useState<ActivityCommentItem | null>(null)

  const handleTabChange = (newTab: ActivityTab) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", newTab); params.set("page", "1"); params.delete("viewPost")
    if (newTab === "my-polls") params.set("subtab", subTab || "active")
    else params.delete("subtab")
    router.push(`${pathname}?${params.toString()}`)
  }
  const handleSubTabChange = (newSubTab: "active" | "closed" | "my") => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("subtab", newSubTab); params.set("page", "1")
    router.push(`${pathname}?${params.toString()}`)
  }
  const handlePageChange = (p: number) => { const sp = new URLSearchParams(searchParams.toString()); sp.set("page", String(p)); router.push(`${pathname}?${sp.toString()}`) }
  const handleViewPost = (id: string) => { const sp = new URLSearchParams(searchParams.toString()); sp.set("viewPost", id); router.push(`${pathname}?${sp.toString()}`) }
  const handleBackFromDetail = () => { const sp = new URLSearchParams(searchParams.toString()); sp.delete("viewPost"); router.push(`${pathname}?${sp.toString()}`) }

  const handleBackToMain = () => {
    const from = searchParams.get("from")
    const currentRole = pathname.split("/").filter(Boolean)[0] || "teamlead"
    if (from && from.startsWith("/") && !from.includes("/activity")) {
      router.push(from)
      return
    }
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back()
    } else {
      router.push(`/${currentRole}/attendance`)
    }
  }

  const handleStartEditPost = (postId: string) => {
    const target = posts.find((p) => p.id === postId)
    if (!target) return
    setEditingPost({
      id: target.id, authorName: "Alexander", authorRole: "Team Lead",
      category: target.category as any, categoryBadge: target.categoryBadge,
      timestamp: target.date, content: target.snippet || target.title,
      likesCount: target.likesCount, commentsCount: target.commentsCount,
      images: target.thumbnailUrl ? [target.thumbnailUrl] : [], comments: [],
    })
  }

  const handleUpdatePost = (updated: SocialPost) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === updated.id
          ? { ...p, title: updated.content.slice(0, 36) + (updated.content.length > 36 ? "..." : ""), snippet: updated.content, category: updated.category }
          : p
      )
    )
    setEditingPost(null)
  }

  const handleConfirmDelete = () => {
    if (!deletingItem) return
    if (deletingItem.type === "post") setPosts((prev) => prev.filter((p) => p.id !== deletingItem.id))
    if (deletingItem.type === "liked") setLikedPosts((prev) => prev.filter((p) => p.id !== deletingItem.id))
    if (deletingItem.type === "comment") setComments((prev) => prev.filter((c) => c.id !== deletingItem.id))
    if (deletingItem.type === "poll") setPolls((prev) => prev.filter((p) => p.id !== deletingItem.id))
    setDeletingItem(null)
  }

  if (viewPostId) {
    const selected = DEFAULT_SOCIAL_POSTS.find((p) => p.id === viewPostId) || { ...DEFAULT_SOCIAL_POSTS[0], id: viewPostId, title: "Activity Post" }
    return (
      <div className="p-2.5 sm:p-6 max-w-5xl mx-auto w-full">
        <SocialMediaPostDetailView post={selected} onBack={handleBackFromDetail} />
      </div>
    )
  }

  const filteredPollsCount = polls.filter((p) => subTab === "closed" ? p.status === "closed" : subTab === "my" ? p.isMyPoll : p.status === "active").length
  const totalItems = activeTab === "liked-posts" ? likedPosts.length : activeTab === "my-comments" ? comments.length : activeTab === "my-polls" ? filteredPollsCount : posts.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  return (
    <div className="p-2 sm:p-4 md:p-6 max-w-5xl mx-auto w-full flex flex-col gap-4 sm:gap-5">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-3.5 sm:p-5 md:p-6 flex flex-col gap-4">
        <MyActivityHeader onBack={handleBackToMain} />

        <MyActivityTabsNav activeTab={activeTab} onTabChange={handleTabChange} counts={{ posts: posts.length, liked: likedPosts.length, comments: comments.length }} />

        <div className="min-h-[280px] py-1">
          {activeTab === "my-posts" && (
            <MyActivityPostsList posts={posts} onViewPost={handleViewPost} onEditPost={handleStartEditPost} onDeletePost={(id) => setDeletingItem({ id, type: "post" })} />
          )}
          {activeTab === "liked-posts" && (
            <MyActivityLikedPostsList posts={likedPosts} onViewPost={handleViewPost} onUnlikePost={(id) => setDeletingItem({ id, type: "liked" })} />
          )}
          {activeTab === "my-comments" && (
            <MyActivityCommentsList
              comments={comments}
              onViewPost={handleViewPost}
              onEditComment={(id) => setEditingComment(comments.find((c) => c.id === id) || null)}
              onDeleteComment={(id) => setDeletingItem({ id, type: "comment" })}
            />
          )}
          {activeTab === "my-polls" && (
            <MyActivityPollsList
              polls={polls}
              activeSubTab={subTab}
              onSubTabChange={handleSubTabChange}
              onViewProfile={() => router.push(`/${pathname.split("/")[1] || "teamlead"}/profile`)}
              onDeletePoll={(id) => setDeletingItem({ id, type: "poll" })}
            />
          )}
        </div>

        <div className="border-t border-gray-100 pt-3">
          <ReusablePagination currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} pageSize={pageSize} onPageChange={handlePageChange} onPageSizeChange={(s) => setPageSize(s)} showPageSize showTotalInfo showJumpToPage />
        </div>
      </div>

      <CreatePostModal isOpen={Boolean(editingPost)} onClose={() => setEditingPost(null)} postToEdit={editingPost} onPostUpdated={handleUpdatePost} />

      <EditCommentModal
        isOpen={Boolean(editingComment)}
        onClose={() => setEditingComment(null)}
        initialText={editingComment?.myComment || ""}
        postTitle={editingComment?.postTitle}
        onSave={(newText) => {
          if (editingComment) setComments((prev) => prev.map((c) => (c.id === editingComment.id ? { ...c, myComment: newText } : c)))
          setEditingComment(null)
        }}
      />

      <ReusableConfirmationModal
        isOpen={Boolean(deletingItem)}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleConfirmDelete}
        title={deletingItem?.type === "post" ? "Delete Post" : deletingItem?.type === "comment" ? "Delete Comment" : deletingItem?.type === "poll" ? "Delete Poll" : "Remove from Liked"}
        description={
          deletingItem?.type === "liked"
            ? "Are you sure you want to remove this post from your liked list?"
            : `Are you sure you want to delete this ${deletingItem?.type || "item"}? This action cannot be undone.`
        }
        type="danger"
        confirmText={deletingItem?.type === "liked" ? "Remove" : "Delete"}
        cancelText="Cancel"
      />
    </div>
  )
}
