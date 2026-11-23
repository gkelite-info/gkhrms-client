"use client"

import { useEffect } from "react"
import { X } from "phosphor-react"
import ReusableDownloadButton from "../../ReusableDownloadButton"

export interface ImageLightboxModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  title?: string
  date?: string
}

export default function ImageLightboxModal({
  isOpen,
  onClose,
  imageUrl,
  title,
  date,
}: ImageLightboxModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !imageUrl) return null

  const fileName = title ? `${title.replace(/\s+/g, "_")}.jpg` : "preview_image.jpg"

  return (
    <div className="fixed inset-0 z-[1300] flex items-center justify-center p-3 sm:p-6 select-none animate-in fade-in duration-200">
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col items-center gap-3">
        <div className="w-full flex items-center justify-between px-2 text-white shrink-0 gap-2">
          <div className="min-w-0 pr-2 sm:pr-4 flex-1">
            {title && <h3 className="text-xs sm:text-sm md:text-base font-bold text-white break-words leading-tight">{title}</h3>}
            {date && <span className="text-[10px] sm:text-[11px] text-gray-400 block mt-0.5">{date}</span>}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <ReusableDownloadButton
              fileName={fileName}
              fileUrl={imageUrl}
              fileType="image/jpeg"
              variant="button"
              label="Download"
              iconSize={14}
              className="bg-white/15 hover:bg-white/25 text-white border border-white/20 !px-2.5 sm:!px-3 !py-1 sm:!py-1.5 text-xs"
            />
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              title="Close (Esc)"
            >
              <X size={20} weight="bold" />
            </button>
          </div>
        </div>

        <div className="relative max-w-full max-h-[80vh] flex items-center justify-center rounded-2xl overflow-hidden bg-black/40 shadow-2xl border border-white/10">
          <img
            src={imageUrl}
            alt={title || "Enlarged preview"}
            className="w-auto h-auto max-w-[92vw] sm:max-w-[85vw] max-h-[78vh] object-contain rounded-xl"
          />
        </div>
      </div>
    </div>
  )
}
