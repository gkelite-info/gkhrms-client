"use client"

import { X } from "phosphor-react"

interface ChatEmojiPickerProps {
  isOpen: boolean
  onClose: () => void
  onSelectEmoji: (emoji: string) => void
}

const COMMON_EMOJIS = [
  "👍", "❤️", "😂", "🎉", "🔥", "👏",
  "😊", "🙌", "🚀", "👀", "💯", "✨",
  "🤝", "💪", "💡", "✅", "☕", "🙏",
  "😍", "🤔", "👋", "👌", "⭐", "🎯",
]

export default function ChatEmojiPicker({
  isOpen,
  onClose,
  onSelectEmoji,
}: ChatEmojiPickerProps) {
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute bottom-full left-2 right-2 sm:left-auto sm:right-3 mb-2 sm:w-72 bg-white rounded-2xl shadow-2xl border border-gray-200/90 p-3 z-50 select-none">
        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-gray-100 text-xs">
          <span className="font-bold text-gray-800">Quick Emojis</span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={14} weight="bold" />
          </button>
        </div>

        <div className="grid grid-cols-6 gap-1 justify-items-center pt-0.5">
          {COMMON_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => onSelectEmoji(emoji)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-lg sm:text-xl hover:bg-[#F5F4FE] hover:scale-115 active:scale-95 transition-all cursor-pointer"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
