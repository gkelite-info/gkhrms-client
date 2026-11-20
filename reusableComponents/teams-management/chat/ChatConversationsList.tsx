"use client"

import { useState, useMemo } from "react"
import { MagnifyingGlass, UsersThree } from "phosphor-react"
import { ChatConversation } from "../types"
import ReusableAvatar from "../../ReusableAvatar"

interface ChatConversationsListProps {
  conversations: ChatConversation[]
  selectedId: string
  onSelect: (c: ChatConversation) => void
  selectedTeam?: string
}

export default function ChatConversationsList({
  conversations,
  selectedId,
  onSelect,
  selectedTeam = "GK Gym Life",
}: ChatConversationsListProps) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    if (!query.trim()) return conversations
    const q = query.toLowerCase()
    return conversations.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q)
    )
  }, [conversations, query])

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-3xl border border-gray-100/90 shadow-xs p-3.5 sm:p-4 select-none">
      <div className="flex flex-col gap-1 pb-3 border-b border-gray-100">
        <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
          Viewing chats for
        </span>
        <div className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200/60 flex items-center gap-2 text-left">
          <div className="w-6 h-6 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#5B50EC] shrink-0">
            <UsersThree size={13} weight="bold" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-gray-900 truncate">
            {selectedTeam}
          </span>
        </div>
      </div>

      <div className="pt-3 pb-2">
        <div className="relative flex items-center">
          <MagnifyingGlass size={15} className="absolute left-3 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search team members or chats..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 rounded-xl border border-gray-200/70 focus:border-[#5B50EC] outline-none transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar flex flex-col gap-1 pr-0.5">
        {filtered.map((item) => {
          const isSelected = item.id === selectedId
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item)}
              className={`w-full p-2.5 rounded-2xl flex items-center gap-2.5 transition-all text-left cursor-pointer border ${
                isSelected
                  ? "bg-[#F5F4FE] border-[#E0DCFE] shadow-xs"
                  : "bg-white border-transparent hover:bg-gray-50/80"
              }`}
            >
              <div className="relative shrink-0">
                <ReusableAvatar
                  src={item.avatar}
                  name={item.name}
                  size={36}
                  shape="circle"
                  fallbackType="icon"
                />
                {item.isOnline && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-gray-900 truncate">{item.name}</span>
                  <span className="text-[10px] text-gray-500 font-semibold shrink-0">
                    {item.lastMessageTime}
                  </span>
                </div>
                <span className="text-[10px] text-[#5B50EC] font-bold block truncate">
                  {item.role}
                </span>
                <span className="text-[11px] text-gray-800 font-medium truncate block mt-0.5">
                  {item.lastMessage}
                </span>
              </div>

              {item.unreadCount ? (
                <span className="w-4.5 h-4.5 rounded-full bg-[#5B50EC] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  {item.unreadCount}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
