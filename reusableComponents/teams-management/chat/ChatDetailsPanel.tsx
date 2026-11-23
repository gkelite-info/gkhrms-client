"use client"

import {
  User,
  IdentificationBadge,
  Flag,
  Buildings,
  UserSwitch,
  ArrowLeft,
  X,
} from "phosphor-react"
import { ChatConversation, SharedFileItem, SharedMediaItem, SharedLinkItem } from "../types"
import { MOCK_SHARED_FILES } from "./mockChatData"
import { MOCK_SHARED_MEDIA, MOCK_SHARED_LINKS } from "./mockChatMedia"
import ReusableAvatar from "../../ReusableAvatar"
import ChatSharedMediaTabs from "./ChatSharedMediaTabs"

interface ChatDetailsPanelProps {
  conversation: ChatConversation
  onClose?: () => void
  files?: SharedFileItem[]
  media?: SharedMediaItem[]
  links?: SharedLinkItem[]
}

export default function ChatDetailsPanel({
  conversation,
  onClose,
  files = MOCK_SHARED_FILES,
  media = MOCK_SHARED_MEDIA,
  links = MOCK_SHARED_LINKS,
}: ChatDetailsPanelProps) {
  const profileItems = [
    { label: "Name", value: conversation.name, icon: User },
    { label: "Role", value: conversation.role, icon: IdentificationBadge },
    { label: "Team / Project", value: conversation.team, icon: Flag },
    { label: "Department", value: conversation.department || "Product & Engineering", icon: Buildings },
    {
      label: "Reporting To",
      value: conversation.reportingTo || "Ravi Kumar",
      subValue: conversation.reportingToRole ? `(${conversation.reportingToRole})` : "(Manager)",
      icon: UserSwitch,
    },
  ]

  return (
    <div className="w-full h-full bg-white rounded-3xl border border-gray-100/90 shadow-xs flex flex-col overflow-hidden select-none">
      <div className="sticky top-0 z-10 px-4 py-3.5 sm:px-6 sm:py-4 flex items-center justify-between border-b border-gray-100 shrink-0 bg-white">
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
              title="Back to chat"
            >
              <ArrowLeft size={18} weight="bold" />
            </button>
          )}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">Contact Info</h3>
            <span className="text-[11px] text-gray-400 font-medium">Profile, media, docs and links</span>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
            title="Close"
          >
            <X size={18} weight="bold" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar p-3.5 sm:p-6">
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-5">
          <div className="md:col-span-2 flex flex-col gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#F8F7FF] to-white border border-[#EEF0FE] flex items-center gap-3.5 shrink-0 shadow-2xs">
              <ReusableAvatar
                src={conversation.avatar}
                name={conversation.name}
                size={48}
                shape="circle"
                fallbackType="icon"
                status={conversation.isOnline ? "online" : undefined}
                className="shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-sm sm:text-base font-bold text-gray-900 break-words leading-tight">{conversation.name}</h4>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#EEF2FF] text-[#5B50EC]">
                  {conversation.role}
                </span>
                <span className="text-[11px] text-gray-500 font-medium block break-words mt-0.5">{conversation.team}</span>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-gray-100 flex flex-col divide-y divide-gray-50 text-xs shadow-2xs">
              {profileItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div key={index} className="py-2.5 first:pt-1 last:pb-1 flex items-start justify-between gap-2.5">
                    <div className="flex items-center gap-2 text-gray-400 shrink-0">
                      <IconComponent size={14} />
                      <span className="text-gray-500 font-medium">{item.label}</span>
                    </div>
                    <div className="text-right min-w-0 flex-1 pl-2">
                      <span className="font-bold text-gray-900 block break-words leading-snug">{item.value}</span>
                      {item.subValue && <span className="text-[10px] text-gray-400 font-normal block mt-0.5">{item.subValue}</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="md:col-span-3 p-3.5 sm:p-5 rounded-2xl bg-white border border-gray-100 flex flex-col min-h-[380px] sm:min-h-[420px] shadow-2xs">
            <ChatSharedMediaTabs files={files} media={media} links={links} />
          </div>
        </div>
      </div>
    </div>
  )
}
