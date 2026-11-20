"use client"

import { useState, useRef, useEffect } from "react"
import { Paperclip, Smiley, PaperPlaneRight, Checks, ArrowLeft, Info, X } from "phosphor-react"
import { ChatConversation, ChatMessage, ChatAttachment } from "../types"
import { CURRENT_USER } from "./mockChatData"
import ReusableAvatar from "../../ReusableAvatar"
import ChatEmojiPicker from "./ChatEmojiPicker"
import ChatAttachmentBubble from "./ChatAttachmentBubble"

interface ChatMessageThreadProps {
  conversation: ChatConversation
  onSendMessage: (text: string, attachment?: ChatAttachment) => void
  onBack?: () => void
  onToggleDetails?: () => void
}

export default function ChatMessageThread({
  conversation,
  onSendMessage,
  onBack,
  onToggleDetails,
}: ChatMessageThreadProps) {
  const [inputText, setInputText] = useState("")
  const [isEmojiOpen, setIsEmojiOpen] = useState(false)
  const [selectedAttachment, setSelectedAttachment] = useState<ChatAttachment | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation.messages])

  const handleSelectEmoji = (emoji: string) => {
    setInputText((prev) => prev + emoji)
    setIsEmojiOpen(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const sizeKB = Math.round(file.size / 1024)
    const sizeStr = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`
    const type = file.type.startsWith("image/") ? "image" : file.type.includes("pdf") ? "pdf" : "file"
    setSelectedAttachment({ name: file.name, size: sizeStr, type, url: URL.createObjectURL(file) })
    e.target.value = ""
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim() && !selectedAttachment) return
    onSendMessage(inputText.trim(), selectedAttachment || undefined)
    setInputText("")
    setSelectedAttachment(null)
    setIsEmojiOpen(false)
  }

  return (
    <div className="flex-1 w-full max-w-full h-full flex flex-col bg-[#FAF9FF]/40 sm:bg-[#FAF9FF]/60 rounded-3xl border border-gray-100/90 shadow-xs overflow-hidden select-none relative min-w-0">
      <div className="px-3.5 sm:px-4 py-3 bg-white border-b border-gray-100 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          {onBack && (
            <button type="button" onClick={onBack} className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer shrink-0">
              <ArrowLeft size={18} weight="bold" />
            </button>
          )}
          <div className="relative shrink-0">
            <ReusableAvatar src={conversation.avatar} name={conversation.name} size={36} shape="circle" fallbackType="icon" />
            {conversation.isOnline && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 truncate">{conversation.name}</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EEF2FF] text-[#5B50EC]">{conversation.role}</span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium block truncate">{conversation.team}</span>
          </div>
        </div>
        {onToggleDetails && (
          <button type="button" onClick={onToggleDetails} className="xl:hidden p-2 rounded-xl text-gray-500 hover:text-[#5B50EC] hover:bg-[#EEF2FF] transition-colors cursor-pointer shrink-0" title="View details">
            <Info size={18} weight="bold" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-5 flex flex-col gap-3 custom-scrollbar w-full min-w-0">
        <div className="flex justify-center my-1">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-white border border-gray-200/70 text-gray-600 shadow-xs">Today</span>
        </div>
        {conversation.messages.map((msg: ChatMessage) => {
          if (msg.isOutgoing) {
            return (
              <div key={msg.id} className="flex justify-end gap-2 sm:gap-2.5 items-end w-full min-w-0">
                <div className="flex-1 flex flex-col items-end min-w-0 w-full">
                  <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl rounded-br-xs bg-[#EEF2FF] text-[#1E1B4B] font-semibold text-xs sm:text-[13px] leading-relaxed shadow-xs border border-[#D5D2FB] w-full min-w-0 break-words [overflow-wrap:anywhere]">
                    {msg.attachment && <ChatAttachmentBubble attachment={msg.attachment} />}
                    {msg.text && <span className="block break-words">{msg.text}</span>}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-[#5B50EC]">
                    <span>{msg.timestamp}</span>
                    <Checks size={14} weight="bold" />
                  </div>
                </div>
                <div className="shrink-0 mb-1">
                  <ReusableAvatar src={msg.senderAvatar || CURRENT_USER.avatar} name={msg.senderName || CURRENT_USER.name} size={28} shape="circle" fallbackType="icon" />
                </div>
              </div>
            )
          }

          return (
            <div key={msg.id} className="flex gap-2 sm:gap-2.5 items-end w-full min-w-0">
              <div className="shrink-0 mb-1">
                <ReusableAvatar src={msg.senderAvatar} name={msg.senderName} size={28} shape="circle" fallbackType="icon" />
              </div>
              <div className="flex-1 flex flex-col min-w-0">
                <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl rounded-bl-xs bg-white text-gray-900 font-semibold text-xs sm:text-[13px] leading-relaxed shadow-xs border border-gray-200/90 w-full min-w-0 break-words [overflow-wrap:anywhere]">
                  {msg.attachment && <ChatAttachmentBubble attachment={msg.attachment} />}
                  {msg.text && <span className="block break-words">{msg.text}</span>}
                </div>
                <span className="text-[11px] text-gray-500 font-medium mt-1 ml-1">{msg.timestamp}</span>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {selectedAttachment && (
        <div className="px-3 sm:px-4 py-1.5 bg-[#F5F4FE] border-t border-purple-100 flex items-center justify-between text-xs shrink-0 w-full min-w-0 overflow-hidden">
          <div className="flex items-center gap-2 truncate">
            <Paperclip size={14} className="text-[#5B50EC] shrink-0" />
            <span className="font-bold text-gray-900 truncate">{selectedAttachment.name}</span>
            <span className="text-[10px] text-gray-500 shrink-0">({selectedAttachment.size})</span>
          </div>
          <button type="button" onClick={() => setSelectedAttachment(null)} className="p-1 text-gray-400 hover:text-rose-500 cursor-pointer shrink-0">
            <X size={12} weight="bold" />
          </button>
        </div>
      )}

      <form onSubmit={handleSend} className="relative p-2 sm:p-3 bg-white border-t border-gray-100 flex items-center gap-1.5 sm:gap-2 shrink-0 w-full min-w-0">
        <label className="p-1.5 sm:p-2 rounded-xl text-gray-500 hover:text-[#5B50EC] hover:bg-gray-50 transition-colors cursor-pointer shrink-0 flex items-center justify-center" title="Attach file">
          <Paperclip size={18} weight="bold" />
          <input type="file" onChange={handleFileChange} className="sr-only" />
        </label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 min-w-0 px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-semibold text-gray-900 bg-white rounded-xl border border-gray-200 focus:border-[#5B50EC] outline-none transition-all placeholder:text-gray-500 placeholder:font-normal"
        />
        <button
          type="button"
          onClick={() => setIsEmojiOpen(!isEmojiOpen)}
          className={`p-1.5 sm:p-2 rounded-xl transition-colors cursor-pointer shrink-0 ${isEmojiOpen ? "text-[#5B50EC] bg-[#EEF2FF]" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
          title="Insert emoji"
        >
          <Smiley size={18} weight="bold" />
        </button>
        <button
          type="submit"
          disabled={!inputText.trim() && !selectedAttachment}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#5B50EC] hover:bg-[#4E44D6] disabled:opacity-40 disabled:hover:bg-[#5B50EC] text-white flex items-center justify-center transition-all cursor-pointer shadow-sm shadow-[#5B50EC]/30 shrink-0"
          title="Send message"
        >
          <PaperPlaneRight size={15} weight="fill" />
        </button>
        <ChatEmojiPicker isOpen={isEmojiOpen} onClose={() => setIsEmojiOpen(false)} onSelectEmoji={handleSelectEmoji} />
      </form>
    </div>
  )
}
