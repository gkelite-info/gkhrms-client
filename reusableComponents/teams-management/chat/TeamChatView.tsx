"use client"

import { useState, useMemo } from "react"
import { ChatConversation, ChatMessage, ChatAttachment } from "../types"
import { MOCK_CHAT_CONVERSATIONS, CURRENT_USER } from "./mockChatData"
import ChatConversationsList from "./ChatConversationsList"
import ChatMessageThread from "./ChatMessageThread"
import ChatDetailsPanel from "./ChatDetailsPanel"

export default function TeamChatView() {
  const [conversations, setConversations] = useState<ChatConversation[]>(MOCK_CHAT_CONVERSATIONS)
  const [selectedId, setSelectedId] = useState<string>("c-1")
  const [isMobileThreadOpen, setIsMobileThreadOpen] = useState(false)
  const [isMobileDetailsOpen, setIsMobileDetailsOpen] = useState(false)

  const activeConversation = useMemo(() => {
    return conversations.find((c) => c.id === selectedId) || conversations[0]
  }, [conversations, selectedId])

  const handleSelectConversation = (c: ChatConversation) => {
    setSelectedId(c.id)
    setIsMobileThreadOpen(true)
    setConversations((prev) =>
      prev.map((item) => (item.id === c.id ? { ...item, unreadCount: 0 } : item))
    )
  }

  const handleSendMessage = (text: string, attachment?: ChatAttachment) => {
    const timeStr = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date())

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: CURRENT_USER.id,
      senderName: CURRENT_USER.name,
      senderAvatar: CURRENT_USER.avatar,
      text,
      timestamp: timeStr,
      isOutgoing: true,
      status: "read",
      attachment,
    }

    const preview = attachment ? (text ? `${text} (Attachment)` : `Sent a file: ${attachment.name}`) : text

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== selectedId) return c
        return {
          ...c,
          lastMessage: preview,
          lastMessageTime: timeStr,
          messages: [...c.messages, newMessage],
        }
      })
    )
  }

  return (
    <div className="w-full flex items-start gap-4 h-[calc(100vh-210px)] min-h-[580px] max-h-[760px] select-none">
      <div className={`w-full lg:w-72 xl:w-80 shrink-0 h-full ${isMobileThreadOpen ? "hidden lg:flex" : "flex"}`}>
        <ChatConversationsList
          conversations={conversations}
          selectedId={selectedId}
          onSelect={handleSelectConversation}
          selectedTeam="GK Gym Life"
        />
      </div>

      <div className={`flex-1 h-full min-w-0 ${!isMobileThreadOpen ? "hidden lg:flex" : "flex"}`}>
        <ChatMessageThread
          conversation={activeConversation}
          onSendMessage={handleSendMessage}
          onBack={() => setIsMobileThreadOpen(false)}
          onToggleDetails={() => setIsMobileDetailsOpen(true)}
        />
      </div>

      <div className="hidden xl:flex w-72 lg:w-80 shrink-0 h-full">
        <ChatDetailsPanel conversation={activeConversation} />
      </div>

      {isMobileDetailsOpen && (
        <div className="fixed inset-0 z-[1200] xl:hidden flex items-end sm:items-center justify-center p-3 sm:p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsMobileDetailsOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md max-h-[85vh] overflow-hidden rounded-3xl bg-white shadow-2xl">
            <ChatDetailsPanel
              conversation={activeConversation}
              onClose={() => setIsMobileDetailsOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
