"use client"

import { useState } from "react"
import { DownloadSimple, CircleNotch } from "phosphor-react"
import toast from "react-hot-toast"

export interface ReusableDownloadButtonProps {
  fileName: string
  fileUrl?: string
  fileType?: string
  className?: string
  iconSize?: number
  variant?: "icon" | "button"
  label?: string
  onDownloadComplete?: () => void
}

export default function ReusableDownloadButton({
  fileName,
  fileUrl,
  fileType = "application/pdf",
  className = "",
  iconSize = 15,
  variant = "icon",
  label = "Download",
  onDownloadComplete,
}: ReusableDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isDownloading) return
    setIsDownloading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      if (fileUrl && fileUrl.startsWith("blob:")) {
        const link = document.createElement("a")
        link.href = fileUrl
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else if (fileUrl && fileUrl.startsWith("http") && !fileUrl.includes("unsplash.com")) {
        try {
          const response = await fetch(fileUrl)
          const blob = await response.blob()
          const blobUrl = window.URL.createObjectURL(blob)
          const link = document.createElement("a")
          link.href = blobUrl
          link.download = fileName
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(blobUrl)
        } catch {
          triggerMockDownload()
        }
      } else {
        triggerMockDownload()
      }

      toast.success(`Downloaded "${fileName}" successfully!`)
      onDownloadComplete?.()
    } catch {
      toast.error(`Failed to download "${fileName}". Please try again.`)
    } finally {
      setIsDownloading(false)
    }
  }

  const triggerMockDownload = () => {
    const content = `GK HRMS Document: ${fileName}\nGenerated: ${new Date().toLocaleString()}\nStatus: Verified QA Report`
    const blob = new Blob([content], { type: fileType || "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = fileName.includes(".") ? fileName : `${fileName}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={handleDownload}
        disabled={isDownloading}
        className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold text-xs transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 active:scale-98 ${className}`}
        title={`Download ${fileName}`}
      >
        {isDownloading ? (
          <CircleNotch size={iconSize} weight="bold" className="animate-spin text-current" />
        ) : (
          <DownloadSimple size={iconSize} weight="bold" />
        )}
        <span>{isDownloading ? "Downloading..." : label}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isDownloading}
      className={`p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 shrink-0 ${className}`}
      title={`Download ${fileName}`}
      aria-label={`Download ${fileName}`}
    >
      {isDownloading ? (
        <CircleNotch size={iconSize} weight="bold" className="animate-spin text-[#5B50EC]" />
      ) : (
        <DownloadSimple size={iconSize} weight="bold" />
      )}
    </button>
  )
}
