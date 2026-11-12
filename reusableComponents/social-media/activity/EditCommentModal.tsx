"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChatCircleDots, X, Check } from "phosphor-react"

interface EditCommentModalProps {
  isOpen: boolean
  onClose: () => void
  initialText: string
  postTitle?: string
  onSave: (newText: string) => void
}

export default function EditCommentModal({
  isOpen,
  onClose,
  initialText,
  postTitle,
  onSave,
}: EditCommentModalProps) {
  const [commentText, setCommentText] = useState(initialText)

  useEffect(() => {
    if (isOpen) setCommentText(initialText)
  }, [isOpen, initialText])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim()) return
    onSave(commentText.trim())
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 p-4 sm:p-6 flex flex-col gap-4 overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center">
                  <ChatCircleDots size={18} weight="bold" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                    Edit Comment
                  </h3>
                  {postTitle && (
                    <p className="text-[11px] text-gray-500 truncate max-w-[260px] sm:max-w-xs">
                      On: {postTitle}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X size={16} weight="bold" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-700">
                  Comment <span className="text-rose-500">*</span>
                </label>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write your comment..."
                  rows={4}
                  maxLength={500}
                  className="w-full p-3 text-xs sm:text-sm text-gray-900 bg-gray-50/70 border border-gray-200 rounded-xl focus:bg-white focus:border-[#5B50EC] focus:ring-2 focus:ring-[#5B50EC]/15 transition-all outline-none resize-none"
                />
                <span className="text-[10px] text-gray-400 text-right">
                  {commentText.length}/500
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#5B50EC] hover:bg-[#483ece] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-md shadow-[#5B50EC]/20"
                >
                  <Check size={14} weight="bold" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

