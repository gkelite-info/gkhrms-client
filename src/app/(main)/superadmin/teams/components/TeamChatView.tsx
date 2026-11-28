"use client"

import { useState } from "react"
import {
  Send,
  Search,
  Building2,
  Paperclip,
  Smile,
  Check,
  Info,
} from "lucide-react"

interface ChatConversation {
  id: string
  companyName: string
  primaryAdminName: string
  lastMessage: string
  time: string
  unreadCount?: number
  iconBg: string
  iconColor: string
}

interface MessageItem {
  id: string
  sender: "company" | "admin"
  senderName: string
  senderAvatar: string
  greeting?: string
  content: string
  time: string
}

const mockConversations: ChatConversation[] = [
  {
    id: "gk-gym",
    companyName: "GK Gym Life Pvt. Ltd.",
    primaryAdminName: "Priya Shah",
    lastMessage: "The HRMS portal access for new users...",
    time: "11:24 AM",
    unreadCount: 2,
    iconBg: "bg-[#EDE9FE]",
    iconColor: "text-[#6D28D9]",
  },
  {
    id: "tekton",
    companyName: "Tekton Solutions",
    primaryAdminName: "Rohan Malhotra",
    lastMessage: "Subscription renewal invoice for Q4.",
    time: "10:47 AM",
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-[#D97706]",
  },
  {
    id: "bsl",
    companyName: "BSL Technologies",
    primaryAdminName: "Sneha Rao",
    lastMessage: "Kindly enable the Performance module...",
    time: "Yesterday",
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#15803D]",
  },
  {
    id: "mnr",
    companyName: "MNR Industries",
    primaryAdminName: "Vikram Singh",
    lastMessage: "The recent update is working well, thanks.",
    time: "Nov 20",
    iconBg: "bg-[#FCE7F3]",
    iconColor: "text-[#BE185D]",
  },
  {
    id: "elite",
    companyName: "Elite Info Systems",
    primaryAdminName: "Anita Kulkarni",
    lastMessage: "Requesting an additional 50 user licenses.",
    time: "Nov 18",
    iconBg: "bg-[#E0F2FE]",
    iconColor: "text-[#0284C7]",
  },
]

const initialMessages: MessageItem[] = [
  {
    id: "msg-1",
    sender: "company",
    senderName: "Priya Shah",
    senderAvatar: "/images/jane_smith.jpg",
    greeting: "Hi Super Admin,",
    content:
      "We are unable to add new employees in the HRMS portal. It shows a permission error. Could you please check and help us enable the access?",
    time: "10:02 AM",
  },
  {
    id: "msg-2",
    sender: "admin",
    senderName: "Eleanor Vance",
    senderAvatar: "/images/admin_rohan.jpg",
    greeting: "Hi Priya,",
    content:
      "Sure, let me check the configuration for your company and get back to you shortly.",
    time: "10:08 AM",
  },
  {
    id: "msg-3",
    sender: "company",
    senderName: "Priya Shah",
    senderAvatar: "/images/jane_smith.jpg",
    content:
      "Also, we would like to upgrade our subscription to the Professional plan from next month. Please share the plan details and cost.",
    time: "10:20 AM",
  },
  {
    id: "msg-4",
    sender: "admin",
    senderName: "Eleanor Vance",
    senderAvatar: "/images/admin_rohan.jpg",
    content:
      "Noted. I will share the updated plan details, pricing, and upgrade process with you by EOD today.",
    time: "10:24 AM",
  },
]

export default function TeamChatView() {
  const [selectedConversationId, setSelectedConversationId] = useState("gk-gym")
  const [searchTerm, setSearchTerm] = useState("")
  const [messages, setMessages] = useState<MessageItem[]>(initialMessages)
  const [inputText, setInputText] = useState("")

  const activeConversation =
    mockConversations.find((c) => c.id === selectedConversationId) ||
    mockConversations[0]

  const filteredConversations = mockConversations.filter(
    (c) =>
      c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.primaryAdminName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      sender: "admin",
      senderName: "Eleanor Vance",
      senderAvatar: "/images/admin_rohan.jpg",
      content: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, newMsg])
    setInputText("")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[700px]">
      <div className="lg:col-span-4 bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 leading-tight">
            Company Conversations (24)
          </h2>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search company or primary admin..."
            className="w-full h-10 pl-9 pr-3 text-xs bg-white border border-slate-200/90 rounded-xl focus:outline-none focus:border-[#5046E5] text-slate-800 placeholder:text-slate-400 transition-colors"
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-0.5">
          {filteredConversations.map((conv) => {
            const isSelected = conv.id === selectedConversationId
            return (
              <div
                key={conv.id}
                onClick={() => setSelectedConversationId(conv.id)}
                className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-start gap-3 ${
                  isSelected
                    ? "bg-[#EEF1FB] border border-[#D9E2F7]"
                    : "hover:bg-slate-50 border border-transparent"
                }`}
              >
                <div className="relative shrink-0 mt-0.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${conv.iconBg} ${conv.iconColor}`}
                  >
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-xs font-bold text-slate-900 truncate">
                      {conv.companyName}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-medium shrink-0">
                      {conv.time}
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                    {conv.primaryAdminName} • Primary Admin
                  </p>

                  <div className="flex items-center justify-between gap-2 mt-1">
                    <p className="text-[11px] text-slate-600 truncate">
                      {conv.lastMessage}
                    </p>
                    {conv.unreadCount && !isSelected && (
                      <span className="w-4 h-4 rounded-full bg-[#5046E5] text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="lg:col-span-8 bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${activeConversation.iconBg} ${activeConversation.iconColor}`}
            >
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-tight">
                {activeConversation.companyName}
              </h2>
              <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{activeConversation.primaryAdminName} • Primary Admin</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            className="w-9 h-9 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          <div className="flex justify-center my-2">
            <span className="bg-[#F1F4FA] text-slate-500 text-[11px] font-semibold px-4 py-1 rounded-full">
              Today
            </span>
          </div>

          {messages.map((msg) => {
            const isOutgoing = msg.sender === "admin"

            return (
              <div
                key={msg.id}
                className={`flex items-end gap-2.5 ${
                  isOutgoing ? "justify-end" : "justify-start"
                }`}
              >
                {!isOutgoing && (
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-8 h-8 rounded-full object-cover shrink-0 mb-1 border border-slate-100"
                  />
                )}

                <div
                  className={`p-4 text-xs font-normal leading-relaxed ${
                    isOutgoing
                      ? "bg-[#EEF1FB] text-slate-800 rounded-2xl rounded-tr-xs max-w-md shadow-2xs"
                      : "bg-white border border-slate-100/90 text-slate-800 rounded-2xl rounded-tl-xs max-w-lg shadow-2xs"
                  }`}
                >
                  {msg.greeting && (
                    <p className="font-bold text-slate-900 mb-1">
                      {msg.greeting}
                    </p>
                  )}
                  <p>{msg.content}</p>

                  <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-slate-400 font-medium">
                    <span>{msg.time}</span>
                    {isOutgoing && (
                      <Check className="w-3 h-3 text-[#5046E5] stroke-[2.5]" />
                    )}
                  </div>
                </div>

                {isOutgoing && (
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-8 h-8 rounded-full object-cover shrink-0 mb-1 border border-slate-100"
                  />
                )}
              </div>
            )
          })}
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5">
          <button
            type="button"
            className="w-10 h-10 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <div className="flex-1 h-11 px-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between focus-within:border-[#5046E5] transition-colors">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage()
              }}
              placeholder="Type a message..."
              className="w-full text-xs text-slate-800 focus:outline-none placeholder:text-slate-400"
            />
            <button
              type="button"
              className="text-slate-400 hover:text-slate-600 transition-colors ml-2 cursor-pointer"
            >
              <Smile className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleSendMessage}
            className="w-11 h-11 rounded-xl bg-[#5046E5] hover:bg-[#4338CA] text-white flex items-center justify-center shrink-0 shadow-sm transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
