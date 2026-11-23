"use client"

import { useState } from "react"
import { Image, FileText, LinkSimple, FilePdf, FileXls, FileDoc, ArrowSquareOut } from "phosphor-react"
import { SharedFileItem, SharedMediaItem, SharedLinkItem } from "../types"
import ReusableDownloadButton from "../../ReusableDownloadButton"
import ImageLightboxModal from "./ImageLightboxModal"

interface ChatSharedMediaTabsProps {
  files: SharedFileItem[]
  media: SharedMediaItem[]
  links: SharedLinkItem[]
}

type TabType = "media" | "docs" | "links"

export default function ChatSharedMediaTabs({ files, media, links }: ChatSharedMediaTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("media")
  const [selectedMedia, setSelectedMedia] = useState<SharedMediaItem | null>(null)

  const renderFileIcon = (type: SharedFileItem["type"]) => {
    if (type === "pdf") return <FilePdf size={18} weight="fill" className="text-rose-500" />
    if (type === "sheet") return <FileXls size={18} weight="fill" className="text-emerald-500" />
    return <FileDoc size={18} weight="fill" className="text-blue-500" />
  }

  const getMimeType = (type: SharedFileItem["type"]) => {
    if (type === "pdf") return "application/pdf"
    if (type === "sheet") return "application/vnd.ms-excel"
    return "application/msword"
  }

  return (
    <div className="flex flex-col gap-3 flex-1 min-h-0 w-full min-w-0">
      <div className="flex items-center gap-1 p-1 bg-gray-100/80 rounded-2xl shrink-0 w-full min-w-0 overflow-x-auto custom-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab("media")}
          className={`flex-1 min-w-[76px] py-1.5 px-2 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === "media" ? "bg-white text-[#5B50EC] shadow-xs" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <Image size={14} weight={activeTab === "media" ? "bold" : "regular"} className="shrink-0" />
          <span>Media ({media.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("docs")}
          className={`flex-1 min-w-[76px] py-1.5 px-2 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === "docs" ? "bg-white text-[#5B50EC] shadow-xs" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <FileText size={14} weight={activeTab === "docs" ? "bold" : "regular"} className="shrink-0" />
          <span>Docs ({files.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("links")}
          className={`flex-1 min-w-[76px] py-1.5 px-2 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === "links" ? "bg-white text-[#5B50EC] shadow-xs" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <LinkSimple size={14} weight={activeTab === "links" ? "bold" : "regular"} className="shrink-0" />
          <span>Links ({links.length})</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pr-0.5 max-h-[380px] w-full min-w-0">
        {activeTab === "media" && (
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {media.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedMedia(item)}
                className="group relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-2xs cursor-pointer"
                title={`Click to view ${item.title}`}
              >
                <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1.5 sm:p-2">
                  <span className="text-[10px] sm:text-[11px] text-white font-semibold truncate leading-tight">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "docs" && (
          <div className="flex flex-col gap-2">
            {files.map((file) => (
              <div key={file.id} className="p-2 sm:p-2.5 rounded-2xl bg-gray-50/80 border border-gray-100 flex items-center justify-between gap-2 shrink-0 hover:bg-[#F8F7FF] transition-colors">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                  <div className="p-1.5 sm:p-2 rounded-xl bg-white shadow-2xs shrink-0">{renderFileIcon(file.type)}</div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-gray-800 block truncate">{file.name}</span>
                    <span className="text-[10px] text-gray-400 block truncate">{file.size} · {file.date}</span>
                  </div>
                </div>
                <ReusableDownloadButton
                  fileName={file.name}
                  fileType={getMimeType(file.type)}
                  iconSize={15}
                  className="hover:bg-white shadow-2xs shrink-0"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === "links" && (
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="p-2 sm:p-2.5 rounded-2xl bg-gray-50/80 border border-gray-100 flex items-center justify-between gap-2.5 shrink-0 hover:bg-[#F8F7FF] hover:border-[#D5D2FB] transition-all group"
              >
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0 shadow-2xs">
                    <LinkSimple size={16} weight="bold" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-gray-800 block truncate group-hover:text-[#5B50EC] transition-colors">{link.title}</span>
                    <span className="text-[10px] text-gray-400 block truncate font-mono">{link.domain} · {link.date}</span>
                  </div>
                </div>
                <ArrowSquareOut size={15} className="text-gray-400 group-hover:text-[#5B50EC] shrink-0" weight="bold" />
              </a>
            ))}
          </div>
        )}
      </div>

      <ImageLightboxModal
        isOpen={Boolean(selectedMedia)}
        onClose={() => setSelectedMedia(null)}
        imageUrl={selectedMedia?.url || ""}
        title={selectedMedia?.title}
        date={selectedMedia?.date}
      />
    </div>
  )
}
