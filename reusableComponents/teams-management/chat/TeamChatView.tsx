"use client"

import { useState, useMemo, useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { ChatConversation, ChatMessage, ChatAttachment } from "../types"
import { MOCK_CHAT_CONVERSATIONS, CURRENT_USER } from "./mockChatData"
import ChatConversationsList from "./ChatConversationsList"
import ChatMessageThread from "./ChatMessageThread"
import ChatDetailsPanel from "./ChatDetailsPanel"

interface TeamChatViewProps {
  initialChatId?: string | null
  onChatChange?: (chatId: string) => void
}

const BOT_REPLIES = [
  "Thanks! Received and reviewed 👍",
  "Got it, will update the team shortly.",
  "Looks good, I will check and get back to you.",
  "Acknowledged, let's discuss in the sync call.",
]

export default function TeamChatView({ initialChatId, onChatChange }: TeamChatViewProps) {
  const [conversations, setConversations] = useState<ChatConversation[]>(MOCK_CHAT_CONVERSATIONS)
  const [selectedId, setSelectedId] = useState<string>(initialChatId || "c-1")
  const [isMobileThreadOpen, setIsMobileThreadOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  useEffect(() => {
    if (initialChatId && initialChatId !== selectedId) {
      setSelectedId(initialChatId)
      setIsMobileThreadOpen(true)
      setIsDetailsOpen(false)
    }
  }, [initialChatId, selectedId])

  const activeConversation = useMemo(() => {
    return conversations.find((c) => c.id === selectedId) || conversations[0]
  }, [conversations, selectedId])

  const handleSelectConversation = (c: ChatConversation) => {
    setSelectedId(c.id)
    setIsMobileThreadOpen(true)
    setIsDetailsOpen(false)
    onChatChange?.(c.id)
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

    setConversations((prev) => {
      const target = prev.find((c) => c.id === selectedId)
      if (!target) return prev
      const updated: ChatConversation = {
        ...target,
        lastMessage: preview,
        lastMessageTime: timeStr,
        messages: [...target.messages, newMessage],
      }
      const others = prev.filter((c) => c.id !== selectedId)
      return [updated, ...others]
    })

    const replyText = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)]
    const targetChatId = selectedId

    setTimeout(() => {
      const replyTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(new Date())

      setConversations((prev) => {
        const target = prev.find((c) => c.id === targetChatId)
        if (!target) return prev

        const replyMsg: ChatMessage = {
          id: `msg-${Date.now()}`,
          senderId: target.id,
          senderName: target.name,
          senderAvatar: target.avatar,
          text: replyText,
          timestamp: replyTime,
          isOutgoing: false,
        }

        const updated: ChatConversation = {
          ...target,
          lastMessage: replyText,
          lastMessageTime: replyTime,
          messages: [...target.messages, replyMsg],
        }
        const others = prev.filter((c) => c.id !== targetChatId)
        return [updated, ...others]
      })
    }, 1500)
  }

  return (
    <div className="w-full max-w-full flex items-start gap-3 sm:gap-4 h-[calc(100vh-210px)] sm:h-[calc(100vh-190px)] lg:h-[calc(100vh-210px)] min-h-[380px] sm:min-h-[480px] lg:min-h-[580px] max-h-[780px] select-none relative">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <div className={`w-full lg:w-72 xl:w-80 shrink-0 h-full min-w-0 ${isMobileThreadOpen ? "hidden lg:flex" : "flex"}`}>
        <ChatConversationsList
          conversations={conversations}
          selectedId={selectedId}
          onSelect={handleSelectConversation}
          selectedTeam="GK Gym Life"
        />
      </div>

      <div className={`flex-1 w-full max-w-full h-full min-w-0 min-h-0 overflow-hidden ${!isMobileThreadOpen ? "hidden lg:flex" : "flex"}`}>
        {isDetailsOpen ? (
          <ChatDetailsPanel
            conversation={activeConversation}
            onClose={() => setIsDetailsOpen(false)}
          />
        ) : (
          <ChatMessageThread
            key={activeConversation.id}
            conversation={activeConversation}
            onSendMessage={handleSendMessage}
            onBack={() => setIsMobileThreadOpen(false)}
            onToggleDetails={() => setIsDetailsOpen(true)}
            isVisible={isMobileThreadOpen}
          />
        )}
      </div>
    </div>
  )
}
