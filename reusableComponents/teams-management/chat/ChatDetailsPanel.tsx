"use client"

import {
  User,
  IdentificationBadge,
  Flag,
  Buildings,
  UserSwitch,
  FilePdf,
  FileXls,
  FileDoc,
  DownloadSimple,
  X,
} from "phosphor-react"
import { ChatConversation, SharedFileItem, RecentActivityItem } from "../types"
import { MOCK_SHARED_FILES, MOCK_RECENT_ACTIVITIES } from "./mockChatData"
import ReusableAvatar from "../../ReusableAvatar"

interface ChatDetailsPanelProps {
  conversation: ChatConversation
  onClose?: () => void
  files?: SharedFileItem[]
  activities?: RecentActivityItem[]
}

export default function ChatDetailsPanel({
  conversation,
  onClose,
  files = MOCK_SHARED_FILES,
  activities = MOCK_RECENT_ACTIVITIES,
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

  const renderFileIcon = (type: SharedFileItem["type"]) => {
    if (type === "pdf") return <FilePdf size={18} weight="fill" className="text-rose-500" />
    if (type === "sheet") return <FileXls size={18} weight="fill" className="text-emerald-500" />
    return <FileDoc size={18} weight="fill" className="text-blue-500" />
  }

  return (
    <div className="w-full h-full bg-white rounded-3xl border border-gray-100/90 shadow-xs flex flex-col overflow-hidden select-none">
      <div className="px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between border-b border-gray-100 shrink-0">
        <h3 className="text-sm sm:text-base font-bold text-gray-900">Details</h3>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={16} weight="bold" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-5 flex flex-col gap-4">
        <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-[#F8F7FF] to-white border border-[#EEF0FE] flex items-center gap-3 shrink-0">
          <ReusableAvatar src={conversation.avatar} name={conversation.name} size={42} shape="circle" fallbackType="icon" />
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate leading-tight">{conversation.name}</h4>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#EEF2FF] text-[#5B50EC]">
              {conversation.role}
            </span>
          </div>
        </div>

        <div className="flex flex-col divide-y divide-gray-50 text-xs shrink-0">
          {profileItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div key={index} className="py-2.5 first:pt-1 last:pb-1 flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 text-gray-400 shrink-0">
                  <IconComponent size={14} />
                  <span className="text-gray-500 font-medium">{item.label}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-900 block">{item.value}</span>
                  {item.subValue && <span className="text-[10px] text-gray-400 font-normal block">{item.subValue}</span>}
                </div>
              </div>
            )
          })}
        </div>

        <div className="pt-2 border-t border-gray-100 flex flex-col gap-2.5 shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-900">Shared Files ({files.length})</span>
            <button type="button" className="text-[11px] font-bold text-[#5B50EC] hover:underline cursor-pointer">
              View All
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {files.map((file) => (
              <div key={file.id} className="p-2 sm:p-2.5 rounded-2xl bg-gray-50/70 border border-gray-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-xl bg-white shadow-xs shrink-0">{renderFileIcon(file.type)}</div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-gray-800 block truncate">{file.name}</span>
                    <span className="text-[10px] text-gray-400 block truncate">{file.size} · {file.date}</span>
                  </div>
                </div>
                <button type="button" className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-white transition-colors cursor-pointer shrink-0">
                  <DownloadSimple size={14} weight="bold" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100 flex flex-col gap-2.5 shrink-0">
          <span className="text-xs font-bold text-gray-900">Recent Activity</span>
          <div className="relative pl-4 space-y-3 before:absolute before:left-1.5 before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-[#EEF0FE]">
            {activities.map((act) => (
              <div key={act.id} className="relative">
                <span className="absolute -left-4 top-1 w-2.5 h-2.5 rounded-full bg-[#5B50EC] ring-4 ring-white" />
                <div className="text-[11px]">
                  <p className="font-semibold text-gray-800 leading-tight">
                    {act.action}: <span className="font-bold text-gray-900">{act.target}</span>
                  </p>
                  <span className="text-[10px] text-gray-400">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
