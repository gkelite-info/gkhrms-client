"use client"

import { FilePdf, FileDoc, DownloadSimple } from "phosphor-react"
import { ChatAttachment } from "../types"

interface ChatAttachmentBubbleProps {
  attachment: ChatAttachment
}

export default function ChatAttachmentBubble({
  attachment,
}: ChatAttachmentBubbleProps) {
  if (attachment.type === "image" && attachment.url) {
    return (
      <div className="mb-2 overflow-hidden rounded-xl border border-gray-200 shadow-2xs">
        <img
          src={attachment.url}
          alt={attachment.name}
          className="max-h-52 w-full object-cover"
        />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2.5 p-2.5 mb-2 rounded-xl bg-white border border-[#D5D2FB] shadow-xs">
      <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
        {attachment.type === "pdf" ? (
          <FilePdf size={20} weight="fill" className="text-rose-500" />
        ) : (
          <FileDoc size={20} weight="fill" className="text-blue-500" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <span className="block text-xs font-bold text-gray-900 truncate">
          {attachment.name}
        </span>
        <span className="block text-[11px] font-medium text-gray-500">{attachment.size}</span>
      </div>
      {attachment.url && attachment.url !== "#" ? (
        <a
          href={attachment.url}
          download={attachment.name}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors shrink-0"
          title="Download attachment"
        >
          <DownloadSimple size={15} weight="bold" />
        </a>
      ) : (
        <button
          type="button"
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
          title="Download attachment"
        >
          <DownloadSimple size={15} weight="bold" />
        </button>
      )}
    </div>
  )
}
