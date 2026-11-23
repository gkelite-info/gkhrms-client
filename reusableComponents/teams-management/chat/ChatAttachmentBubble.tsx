"use client"

import { useState } from "react"
import { FilePdf, FileDoc } from "phosphor-react"
import { ChatAttachment } from "../types"
import ReusableDownloadButton from "../../ReusableDownloadButton"
import ImageLightboxModal from "./ImageLightboxModal"

interface ChatAttachmentBubbleProps {
  attachment: ChatAttachment
}

export default function ChatAttachmentBubble({
  attachment,
}: ChatAttachmentBubbleProps) {
  const [isImageOpen, setIsImageOpen] = useState(false)

  if (attachment.type === "image" && attachment.url) {
    return (
      <>
        <div
          onClick={() => setIsImageOpen(true)}
          className="mb-1.5 overflow-hidden rounded-xl border border-gray-200 shadow-2xs max-w-full cursor-pointer hover:opacity-95 transition-opacity"
          title="Click to view full image"
        >
          <img
            src={attachment.url}
            alt={attachment.name}
            className="max-h-52 w-full object-cover"
          />
        </div>
        <ImageLightboxModal
          isOpen={isImageOpen}
          onClose={() => setIsImageOpen(false)}
          imageUrl={attachment.url}
          title={attachment.name}
        />
      </>
    )
  }

  return (
    <div className="flex items-center justify-between gap-2 p-2 sm:p-2.5 mb-1.5 rounded-xl bg-white border border-[#D5D2FB] shadow-xs w-full min-w-0">
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
        <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
          {attachment.type === "pdf" ? (
            <FilePdf size={18} weight="fill" className="text-rose-500" />
          ) : (
            <FileDoc size={18} weight="fill" className="text-blue-500" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <span className="block text-xs font-bold text-gray-900 truncate w-full" title={attachment.name}>
            {attachment.name}
          </span>
          <span className="block text-[10px] sm:text-[11px] font-medium text-gray-500 mt-0.5">{attachment.size}</span>
        </div>
      </div>
      <ReusableDownloadButton
        fileName={attachment.name}
        fileUrl={attachment.url}
        fileType={attachment.type === "pdf" ? "application/pdf" : "application/octet-stream"}
        iconSize={15}
        className="hover:bg-gray-100 shrink-0 p-1.5 rounded-lg"
      />
    </div>
  )
}
