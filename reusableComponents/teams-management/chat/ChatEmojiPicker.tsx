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
    <div className="absolute bottom-full right-0 mb-3 w-64 sm:w-72 bg-white rounded-2xl shadow-2xl border border-gray-200/90 p-2.5 z-50 select-none">
      <div className="flex items-center justify-between pb-1.5 mb-1 border-b border-gray-100 text-xs">
        <span className="font-bold text-gray-800">Quick Emojis</span>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X size={14} weight="bold" />
        </button>
      </div>

      <div className="grid grid-cols-6 gap-1 pt-0.5">
        {COMMON_EMOJIS.map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => onSelectEmoji(emoji)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-lg hover:bg-[#F5F4FE] hover:scale-115 active:scale-95 transition-all cursor-pointer"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  )
}
