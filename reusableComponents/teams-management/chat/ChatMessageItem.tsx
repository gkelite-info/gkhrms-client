"use client"

import { Checks } from "phosphor-react"
import { ChatMessage } from "../types"
import { CURRENT_USER } from "./mockChatData"
import ReusableAvatar from "../../ReusableAvatar"
import ChatAttachmentBubble from "./ChatAttachmentBubble"

interface ChatMessageItemProps {
  message: ChatMessage
}

export default function ChatMessageItem({ message }: ChatMessageItemProps) {
  if (message.isOutgoing) {
    return (
      <div className="flex justify-end gap-1.5 sm:gap-2.5 items-end w-full">
        <div className="flex flex-col items-end max-w-[94%] sm:max-w-[80%] md:max-w-[70%] min-w-0">
          <div className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl rounded-br-xs bg-[#EEF2FF] text-[#1E1B4B] font-medium text-xs sm:text-[13px] leading-relaxed shadow-xs border border-[#D5D2FB] break-words [overflow-wrap:anywhere] ${
            message.attachment ? "w-full min-w-[210px] sm:min-w-[250px] max-w-full" : "w-fit"
          }`}>
            {message.attachment && <ChatAttachmentBubble attachment={message.attachment} />}
            {message.text && <span className="block break-words">{message.text}</span>}
            <div className="flex items-center justify-end gap-1 mt-1 text-[10px] sm:text-[11px] font-semibold text-[#5B50EC] select-none shrink-0">
              <span className="whitespace-nowrap">{message.timestamp}</span>
              <Checks size={14} weight="bold" className="shrink-0" />
            </div>
          </div>
        </div>
        <div className="shrink-0 mb-1">
          <ReusableAvatar src={message.senderAvatar || CURRENT_USER.avatar} name={message.senderName || CURRENT_USER.name} size={26} shape="circle" fallbackType="icon" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start gap-1.5 sm:gap-2.5 items-end w-full">
      <div className="shrink-0 mb-1">
        <ReusableAvatar src={message.senderAvatar} name={message.senderName} size={26} shape="circle" fallbackType="icon" />
      </div>
      <div className="flex flex-col items-start max-w-[94%] sm:max-w-[80%] md:max-w-[70%] min-w-0">
        <div className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl rounded-bl-xs bg-white text-gray-900 font-medium text-xs sm:text-[13px] leading-relaxed shadow-xs border border-gray-200/90 break-words [overflow-wrap:anywhere] ${
          message.attachment ? "w-full min-w-[210px] sm:min-w-[250px] max-w-full" : "w-fit"
        }`}>
          {message.attachment && <ChatAttachmentBubble attachment={message.attachment} />}
          {message.text && <span className="block break-words">{message.text}</span>}
          <div className="flex items-center justify-end gap-1 mt-1 text-[10px] sm:text-[11px] font-medium text-gray-400 select-none shrink-0">
            <span className="whitespace-nowrap">{message.timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
