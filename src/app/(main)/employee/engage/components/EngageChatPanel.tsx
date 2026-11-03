"use client"

import React, { useState, useMemo, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  MagnifyingGlass,
  VideoCamera,
  X,
  PaperPlaneTilt,
  Smiley,
  DotsThreeVertical,
  ArrowsOutSimple,
  ArrowsInSimple,
  Checks,
} from "phosphor-react"

export interface ChatContact {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unreadCount?: number
  isOnline?: boolean
}

export interface ChatMessage {
  id: string
  sender: "me" | "them"
  text: string
  time: string
  status?: "sent" | "delivered" | "read"
}

const initialContacts: ChatContact[] = [
  {
    id: "emma",
    name: "Emma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    lastMessage: "i Wanted to ask about the project status",
    time: "9:43 AM",
    isOnline: true,
  },
  {
    id: "c1",
    name: "John Martin",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80",
    lastMessage: "Sure, I'll take care of it",
    time: "9:43 AM",
    isOnline: true,
  },
  {
    id: "c2",
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    lastMessage: "Can we meet tomorrow",
    time: "9:43 AM",
    isOnline: true,
  },
  {
    id: "c3",
    name: "James",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    lastMessage: "Yes, i will join meeting",
    time: "9:43 AM",
    isOnline: false,
  },
  {
    id: "c4",
    name: "Emily Davis",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    lastMessage: "Thank YoU",
    time: "9:43 AM",
    isOnline: true,
  },
  {
    id: "c5",
    name: "John Martin",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
    lastMessage: "All good, Let me know",
    time: "9:43 AM",
    isOnline: false,
  },
  {
    id: "c6",
    name: "Ravi Patel",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
    lastMessage: "Sure, I'll take care of it",
    time: "9:43 AM",
    isOnline: true,
  },
  {
    id: "c7",
    name: "Michael",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    lastMessage: "Got it , Thanks",
    time: "9:43 AM",
    isOnline: false,
  },
  {
    id: "c8",
    name: "Riya",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    lastMessage: "Sure, I'll take care of it",
    time: "9:43 AM",
    isOnline: true,
  },
  {
    id: "c9",
    name: "Kate",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
    lastMessage: "Sure, I'll take care of it",
    time: "9:43 AM",
    isOnline: false,
  },
  {
    id: "c10",
    name: "John Martin",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
    lastMessage: "Sure, I'll take care of it",
    time: "9:43 AM",
    isOnline: false,
  },
  {
    id: "c11",
    name: "John Martin",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
    lastMessage: "Sure, I'll take care of it",
    time: "9:43 AM",
    isOnline: true,
  },
]

export default function EngageChatPanel() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const chatParam = searchParams?.get("chat")

  const [contacts] = useState<ChatContact[]>(initialContacts)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [openChats, setOpenChats] = useState<ChatContact[]>([])
  const [activeChatId, setActiveChatId] = useState<string>("")
  const [inputTexts, setInputTexts] = useState<Record<string, string>>({})

  const [conversation, setConversation] = useState<Record<string, ChatMessage[]>>({
    emma: [
      { id: "m1", sender: "me", text: "Hi, Emma, how are you ?", time: "9:43 AM" },
      { id: "m2", sender: "them", text: "Hi! i'm good, thank you.How about you?", time: "9:43 AM" },
      { id: "m3", sender: "me", text: "i'm doing well. Thanks!", time: "9:43 AM" },
      { id: "m4", sender: "them", text: "i Wanted to ask about the project status", time: "9:43 AM" },
    ],
    c1: [
      { id: "m1", sender: "them", text: "Hey Alexander, did you review the Figma handoff?", time: "9:38 AM" },
      { id: "m2", sender: "me", text: "Yes! Looks great, just checking the responsive tokens.", time: "9:41 AM" },
      { id: "m3", sender: "them", text: "Sure, I'll take care of it", time: "9:43 AM" },
    ],
    c2: [
      { id: "m1", sender: "me", text: "Hi Priya, how are you ?", time: "9:43 AM" },
      { id: "m2", sender: "them", text: "Hi! i'm good, thank you.How about you?", time: "9:43 AM" },
      { id: "m3", sender: "me", text: "i'm doing well. Thanks!", time: "9:43 AM" },
      { id: "m4", sender: "them", text: "Can we meet tomorrow", time: "9:43 AM" },
    ],
  })

  useEffect(() => {
    if (!chatParam) {
      return
    }

    const found = contacts.find(
      (c) =>
        c.id.toLowerCase() === chatParam.toLowerCase() ||
        c.name.toLowerCase() === chatParam.toLowerCase().replace(/-/g, " ")
    ) || {
      id: chatParam,
      name: chatParam
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      lastMessage: "i Wanted to ask about the project status",
      time: "9:43 AM",
      isOnline: true,
    }

    setActiveChatId(found.id)
    setOpenChats((prev) => {
      const exists = prev.some((c) => c.id.toLowerCase() === found.id.toLowerCase())
      if (exists) return prev
      if (prev.length >= 3) return [found]
      return [...prev, found]
    })
  }, [chatParam, contacts])

  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return contacts
    const q = searchQuery.toLowerCase()
    return contacts.filter(
      (c) => c.name.toLowerCase().includes(q) || c.lastMessage.toLowerCase().includes(q)
    )
  }, [contacts, searchQuery])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 2500)
  }

  const handleSelectContact = (contact: ChatContact) => {
    setActiveChatId(contact.id)
    setOpenChats((prev) => {
      const exists = prev.some((c) => c.id === contact.id)
      if (exists) return prev
      if (prev.length >= 3) return [contact]
      return [...prev, contact]
    })

    const params = new URLSearchParams(searchParams?.toString() || "")
    params.set("chat", contact.id)
    router.push(`/employee/engage?${params.toString()}`, { scroll: false })
  }

  const handleActivateChat = (contactId: string) => {
    setActiveChatId(contactId)
    const params = new URLSearchParams(searchParams?.toString() || "")
    params.set("chat", contactId)
    router.push(`/employee/engage?${params.toString()}`, { scroll: false })
  }

  const handleCloseChat = (contactId: string) => {
    const nextChats = openChats.filter((c) => c.id !== contactId)
    setOpenChats(nextChats)

    if (activeChatId === contactId) {
      if (nextChats.length > 0) {
        const nextActive = nextChats[nextChats.length - 1]
        setActiveChatId(nextActive.id)
        const params = new URLSearchParams(searchParams?.toString() || "")
        params.set("chat", nextActive.id)
        router.push(`/employee/engage?${params.toString()}`, { scroll: false })
      } else {
        setActiveChatId("")
        const params = new URLSearchParams(searchParams?.toString() || "")
        params.delete("chat")
        const q = params.toString()
        router.push(q ? `/employee/engage?${q}` : `/employee/engage`, { scroll: false })
      }
    }
  }

  const handleCloseAll = () => {
    setOpenChats([])
    setActiveChatId("")
    const params = new URLSearchParams(searchParams?.toString() || "")
    params.delete("chat")
    const q = params.toString()
    router.push(q ? `/employee/engage?${q}` : `/employee/engage`, { scroll: false })
  }

  const handleSendMessage = (contactId: string) => {
    const text = inputTexts[contactId]?.trim()
    if (!text) return
    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: "me",
      text,
      time: timeStr,
    }

    const currentContact = openChats.find((c) => c.id === contactId)
    const contactName = currentContact?.name || "Emma"
    const fallbackMessage = currentContact?.lastMessage || "i Wanted to ask about the project status"
    const fallbackTime = currentContact?.time || "9:43 AM"

    setConversation((prev) => ({
      ...prev,
      [contactId]: [
        ...(prev[contactId] || [
          { id: "m1", sender: "me", text: `Hi, ${contactName}, how are you ?`, time: "9:43 AM" },
          { id: "m2", sender: "them", text: "Hi! i'm good, thank you.How about you?", time: "9:43 AM" },
          { id: "m3", sender: "me", text: "i'm doing well. Thanks!", time: "9:43 AM" },
          { id: "m4", sender: "them", text: fallbackMessage, time: fallbackTime },
        ]),
        newMsg,
      ],
    }))

    setInputTexts((prev) => ({ ...prev, [contactId]: "" }))
  }

  const getChatMessages = (contact: ChatContact) => {
    return (
      conversation[contact.id] || [
        { id: "m1", sender: "me", text: `Hi, ${contact.name}, how are you ?`, time: "9:43 AM" },
        { id: "m2", sender: "them", text: "Hi! i'm good, thank you.How about you?", time: "9:43 AM" },
        { id: "m3", sender: "me", text: "i'm doing well. Thanks!", time: "9:43 AM" },
        { id: "m4", sender: "them", text: contact.lastMessage, time: contact.time },
      ]
    )
  }

  return (
    <>
      <div className="relative z-30 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col w-full h-[520px] xl:h-full min-h-0 overflow-hidden select-none">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 shrink-0">
          <h2 className="text-xl font-bold text-[#1F2937] tracking-tight">Chat</h2>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                setShowSearch((prev) => !prev)
                if (showSearch) setSearchQuery("")
              }}
              className="p-2 text-gray-600 hover:text-[#5B50EC] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Search chats"
            >
              <MagnifyingGlass size={19} weight="bold" />
            </button>

            <button
              type="button"
              onClick={() => router.push("/employee/engage?tab=meetings")}
              className="p-2 text-gray-600 hover:text-[#5B50EC] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Meetings"
            >
              <VideoCamera size={19} weight="bold" />
            </button>
          </div>
        </div>

        {showSearch && (
          <div className="px-4 py-2 bg-gray-50/70 border-b border-gray-100 flex items-center gap-2">
            <MagnifyingGlass size={15} weight="bold" className="text-gray-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="bg-transparent text-xs w-full text-gray-800 placeholder:text-gray-400 focus:outline-none"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
              >
                <X size={13} weight="bold" />
              </button>
            )}
          </div>
        )}

        <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-gray-50 scrollbar-thin pb-3">
          {filteredContacts.map((contact) => {
            const isSelected = activeChatId === contact.id
            return (
              <div
                key={contact.id}
                onClick={() => handleSelectContact(contact)}
                className={`flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer group ${isSelected
                  ? "bg-[#F3F2FD] border-l-4 border-[#5B50EC]"
                  : "hover:bg-gray-50/80"
                  }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-100"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/images/alexander.png"
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="text-xs sm:text-sm font-bold text-[#1F2937] truncate">
                      {contact.name}
                    </h4>
                    <span className="text-[11px] sm:text-xs text-gray-400 font-medium shrink-0">
                      {contact.time}
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-gray-600 truncate font-normal">
                    {contact.lastMessage}
                  </p>
                </div>
              </div>
            )
          })}

          <div className="h-3 shrink-0 border-none pointer-events-none" aria-hidden="true" />

          {filteredContacts.length === 0 && (
            <div className="p-8 text-center text-xs text-gray-400">
              No conversations found.
            </div>
          )}
        </div>
      </div>

      {openChats.length > 0 && (
        <div
          className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm transition-opacity animate-in fade-in duration-200 cursor-pointer"
          onClick={handleCloseAll}
        />
      )}

      {openChats.length > 0 && (
        <div className="fixed z-40 bottom-6 right-4 xl:right-[305px] 2xl:right-[315px] flex items-end gap-3 pointer-events-none max-w-[calc(100vw-2rem)] overflow-x-auto sm:overflow-visible">
          {openChats.map((contact) => {
            const isBig = activeChatId === contact.id
            const chatMessages = getChatMessages(contact)

            if (!isBig) {
              return (
                <div
                  key={contact.id}
                  onClick={() => handleActivateChat(contact.id)}
                  className="w-[230px] sm:w-[245px] h-[215px] sm:h-[225px] bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col overflow-hidden pointer-events-auto cursor-pointer transition-all duration-200 hover:shadow-2xl animate-in fade-in slide-in-from-bottom-3 select-none"
                >
                  <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-100 shrink-0 bg-white">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-6 h-6 rounded-full object-cover ring-1 ring-gray-100 shrink-0"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/images/alexander.png"
                        }}
                      />
                      <h4 className="text-xs font-bold text-[#1E293B] truncate leading-tight">
                        {contact.name}
                      </h4>
                    </div>

                    <div className="flex items-center gap-0.5 shrink-0 text-gray-400">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          showToast("Options menu")
                        }}
                        className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                        aria-label="Options"
                      >
                        <DotsThreeVertical size={13} weight="bold" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleActivateChat(contact.id)
                        }}
                        className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                        aria-label="Expand"
                      >
                        <ArrowsOutSimple size={13} weight="bold" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCloseChat(contact.id)
                        }}
                        className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                        aria-label="Close"
                      >
                        <X size={13} weight="bold" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 min-h-0 overflow-y-auto px-2.5 pt-1.5 pb-2 flex flex-col gap-1.5 scrollbar-thin [scrollbar-width:thin] [scrollbar-color:#CBD5E1_transparent] bg-white">
                    {chatMessages.map((msg) => {
                      const isMe = msg.sender === "me"
                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                        >
                          <div
                            className={`max-w-[88%] px-2.5 py-1 rounded-xl text-[10.5px] leading-tight shadow-2xs ${
                              isMe
                                ? "bg-[#EDE9FE] text-gray-800 rounded-br-xs"
                                : "bg-[#F1F3F5] text-gray-800 rounded-bl-xs"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="px-2 pt-1 pb-2 shrink-0 bg-white border-t border-gray-100">
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-2 py-0.5 shadow-2xs">
                      <span className="text-[10px] text-gray-400 truncate flex-1">
                        Type a message.......
                      </span>
                      <div className="w-5 h-5 rounded-full bg-[#EDE9FE] text-[#8571EE] flex items-center justify-center shrink-0">
                        <PaperPlaneTilt size={11} weight="fill" className="rotate-45" />
                      </div>
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <div
                key={contact.id}
                className={
                  isExpanded
                    ? "fixed z-50 inset-3 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[500px] sm:h-[560px] max-w-[95vw] max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden pointer-events-auto animate-in zoom-in-95 duration-150 select-none"
                    : "w-[calc(100vw-2rem)] sm:w-[320px] md:w-[330px] h-[340px] sm:h-[350px] max-h-[58vh] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-200 select-none"
                }
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-3.5 py-2 border-b border-gray-100 shrink-0 bg-white">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative shrink-0">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-gray-100"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/images/alexander.png"
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#1E293B] truncate leading-tight">
                        {contact.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 text-gray-500">
                    <button
                      type="button"
                      onClick={() => showToast("Options menu")}
                      className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                      aria-label="Options"
                    >
                      <DotsThreeVertical size={15} weight="bold" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsExpanded((prev) => !prev)}
                      className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                      aria-label={isExpanded ? "Collapse" : "Expand"}
                    >
                      {isExpanded ? (
                        <ArrowsInSimple size={15} weight="bold" />
                      ) : (
                        <ArrowsOutSimple size={15} weight="bold" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCloseChat(contact.id)}
                      className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                      aria-label="Close chat"
                    >
                      <X size={15} weight="bold" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto px-3.5 pt-2 pb-4 flex flex-col gap-2 scrollbar-thin [scrollbar-width:thin] [scrollbar-color:#CBD5E1_transparent] bg-white">
                  {chatMessages.map((msg) => {
                    const isMe = msg.sender === "me"
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`max-w-[85%] px-3 py-1.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${isMe
                            ? "bg-[#EDE9FE] text-gray-800 rounded-br-xs"
                            : "bg-[#F1F3F5] text-gray-800 rounded-bl-xs"
                            }`}
                        >
                          {msg.text}
                        </div>
                        {isMe ? (
                          <div className="flex items-center gap-1 text-[9.5px] text-gray-400 mt-0.5 px-1 font-medium">
                            <span>{msg.time}</span>
                            <Checks size={12} weight="bold" className="text-[#8571EE]" />
                          </div>
                        ) : (
                          <span className="text-[9.5px] text-gray-400 mt-0.5 px-1 font-medium">
                            {msg.time}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="px-3.5 pt-2.5 pb-4 shrink-0 bg-white border-t border-gray-100">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSendMessage(contact.id)
                    }}
                    className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-2.5 py-1.5 shadow-2xs focus-within:border-[#8571EE] transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => showToast("Emoji picker")}
                      className="text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer transition-colors"
                      aria-label="Add emoji"
                    >
                      <Smiley size={18} weight="regular" />
                    </button>

                    <input
                      type="text"
                      value={inputTexts[contact.id] || ""}
                      onChange={(e) =>
                        setInputTexts((prev) => ({ ...prev, [contact.id]: e.target.value }))
                      }
                      placeholder="Type a message......."
                      className="flex-1 bg-transparent text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none"
                    />

                    <button
                      type="submit"
                      disabled={!inputTexts[contact.id]?.trim()}
                      className="w-7 h-7 rounded-full bg-[#EDE9FE] hover:bg-[#DDD6FE] text-[#8571EE] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-2xs"
                      aria-label="Send message"
                    >
                      <PaperPlaneTilt size={14} weight="fill" className="rotate-45" />
                    </button>
                  </form>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toastMessage}
        </div>
      )}
    </>
  )
}

