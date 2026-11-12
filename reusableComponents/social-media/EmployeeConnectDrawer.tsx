"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { UsersThree, X } from "phosphor-react"
import { EmployeeConnectDrawerProps, SocialPostCategory, SocialPost } from "./types"
import { DEFAULT_SOCIAL_POSTS } from "./mockSocialData"
import SocialMediaCollapsibleToolbar from "./SocialMediaCollapsibleToolbar"
import EmployeeConnectDrawerFeed from "./EmployeeConnectDrawerFeed"
import CreatePostModal from "./CreatePostModal"
import CreatePollModal from "./CreatePollModal"
import ReusableConfirmationModal from "../ReusableConfirmationModal"

export default function EmployeeConnectDrawer({
  isOpen,
  onClose,
  title = "Employee Connect",
  subtitle = "Share, celebrate and stay connected",
  initialPosts = DEFAULT_SOCIAL_POSTS,
}: EmployeeConnectDrawerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [activeCategory, setActiveCategory] = useState<SocialPostCategory>("all")
  const [posts, setPosts] = useState<SocialPost[]>(initialPosts)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMorePosts, setHasMorePosts] = useState(true)
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [isPollModalOpen, setIsPollModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<SocialPost | null>(null)
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null)
  const [isToolbarFolded, setIsToolbarFolded] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const handleAddNewPost = (newPost: SocialPost) => { setPosts((prev) => [newPost, ...prev]); setActiveCategory("all") }
  const handleUpdatePost = (updated: SocialPost) => { setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p))); setEditingPost(null) }
  const handleEditClick = (post: SocialPost) => { setEditingPost(post); if (post.pollData) setIsPollModalOpen(true); else setIsPostModalOpen(true) }
  const handleConfirmDelete = () => { if (deletingPostId) { setPosts((prev) => prev.filter((p) => p.id !== deletingPostId)); setDeletingPostId(null) } }
  const handleOpenMyActivity = () => { onClose(); router.push(`/${pathname?.split("/")[1] || "teamlead"}/activity`) }

  const handleLoadMorePosts = () => {
    if (isLoadingMore || !hasMorePosts) return
    setIsLoadingMore(true)
    setTimeout(() => {
      const more: SocialPost = {
        id: `post-more-${Date.now()}`, authorName: "Neha Patel", authorInitials: "NP",
        category: "anniversary", categoryBadge: "Work Anniversary", timestamp: "5 Days Ago",
        content: "Celebrating 2 fantastic years with our amazing team! Huge thanks to everyone. 🌟",
        bannerType: "anniversary", bannerData: { employeeName: "Neha", years: 2, title: "Happy Work Anniversary" },
        likesCount: 19, commentsCount: 3, isLiked: false, comments: [],
      }
      setPosts((prev) => [...prev, more]); setIsLoadingMore(false); setHasMorePosts(false)
    }, 800)
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    if (scrollHeight - scrollTop - clientHeight < 60 && hasMorePosts && !isLoadingMore) handleLoadMorePosts()
  }

  const filteredPosts = posts.filter((p) => {
    if (activeCategory === "all") return true
    if (activeCategory === "birthdays") return p.category === "birthday"
    if (activeCategory === "anniversaries") return p.category === "anniversary"
    if (activeCategory === "new_joiners") return p.category === "new_joiner"
    if (activeCategory === "recognitions") return p.category === "recognition"
    return true
  })

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[1000] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-xs" />
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 280 }} className="relative z-10 w-full max-w-[440px] h-full bg-[#F6F7FC] shadow-2xl flex flex-col overflow-hidden">
              <div className="px-4 py-3.5 sm:px-5 sm:py-4 bg-white border-b border-gray-100 flex items-center justify-between shrink-0 shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
                    <UsersThree size={20} weight="bold" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate leading-tight">{title}</h3>
                    <p className="text-[11px] text-gray-500 truncate leading-normal">{subtitle}</p>
                  </div>
                </div>
                <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                  <X size={18} weight="bold" />
                </button>
              </div>

              <SocialMediaCollapsibleToolbar
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                onCreatePost={() => { setEditingPost(null); setIsPostModalOpen(true); }}
                onCreatePoll={() => { setEditingPost(null); setIsPollModalOpen(true); }}
                onMyActivityClick={handleOpenMyActivity}
                isFolded={isToolbarFolded}
                onToggleFold={() => setIsToolbarFolded((prev) => !prev)}
              />

              <div onScroll={handleScroll} className="flex-1 overflow-y-auto p-3 sm:p-4 flex flex-col gap-3.5 custom-scrollbar min-h-0">
                <EmployeeConnectDrawerFeed
                  posts={filteredPosts}
                  isLoadingMore={isLoadingMore}
                  hasMorePosts={hasMorePosts}
                  onLoadMore={handleLoadMorePosts}
                  onEditPost={handleEditClick}
                  onDeletePost={(id) => setDeletingPostId(id)}
                />
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <CreatePostModal isOpen={isPostModalOpen} onClose={() => { setIsPostModalOpen(false); setEditingPost(null); }} onPostCreated={handleAddNewPost} postToEdit={editingPost} onPostUpdated={handleUpdatePost} />
      <CreatePollModal isOpen={isPollModalOpen} onClose={() => { setIsPollModalOpen(false); setEditingPost(null); }} onPollCreated={handleAddNewPost} pollToEdit={editingPost} onPollUpdated={handleUpdatePost} />
      <ReusableConfirmationModal isOpen={Boolean(deletingPostId)} onClose={() => setDeletingPostId(null)} onConfirm={handleConfirmDelete} title="Delete Post" description="Are you sure you want to delete this post? This action cannot be undone." type="danger" confirmText="Delete" cancelText="Cancel" />
    </>
  )
}
