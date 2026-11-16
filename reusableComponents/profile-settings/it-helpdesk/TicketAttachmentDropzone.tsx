"use client"

import { useState, useRef } from "react"
import { Paperclip, X, CloudArrowUp, FileText } from "phosphor-react"

interface TicketAttachmentDropzoneProps {
  files: File[]
  onChange: (files: File[]) => void
  maxFiles?: number
  maxSizeMb?: number
}

const ALLOWED_EXTS = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".png", ".jpg", ".jpeg", ".webp"]

export default function TicketAttachmentDropzone({
  files,
  onChange,
  maxFiles = 5,
  maxSizeMb = 10,
}: TicketAttachmentDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const validateAndAddFiles = (newFiles: FileList | File[]) => {
    setError(null)
    const fileArray = Array.from(newFiles)
    if (files.length + fileArray.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed. You already have ${files.length}.`)
      return
    }

    const validNewFiles: File[] = []
    for (const f of fileArray) {
      const ext = "." + f.name.split(".").pop()?.toLowerCase()
      if (!ALLOWED_EXTS.includes(ext)) {
        setError(`"${f.name}" has an invalid file type. Only PDF, DOC, XLS, and Images are allowed.`)
        return
      }
      if (f.size > maxSizeMb * 1024 * 1024) {
        setError(`"${f.name}" exceeds the ${maxSizeMb} MB limit.`)
        return
      }
      validNewFiles.push(f)
    }

    onChange([...files, ...validNewFiles])
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files) {
      validateAndAddFiles(e.dataTransfer.files)
    }
  }

  const handleRemove = (index: number) => {
    const updated = files.filter((_, i) => i !== index)
    onChange(updated)
    setError(null)
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.webp"
        onChange={(e) => {
          if (e.target.files) validateAndAddFiles(e.target.files)
          e.target.value = ""
        }}
        className="hidden"
      />

      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false) }}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-3 sm:p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 ${
          isDragging
            ? "border-[#5B50EC] bg-[#EEF2FF]/70"
            : "border-gray-200 hover:border-[#5B50EC]/60 hover:bg-[#F9F8FE]"
        }`}
      >
        <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center">
          {isDragging ? <CloudArrowUp size={18} weight="bold" /> : <Paperclip size={16} weight="bold" />}
        </div>
        <div>
          <p className="text-xs font-bold text-gray-800">
            <span className="text-[#5B50EC]">Click to browse</span> or drag & drop
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">
            Up to {maxFiles} files • Max {maxSizeMb} MB each (PDF, DOC, XLS, PNG, JPG)
          </p>
        </div>
      </div>

      {error && <p className="text-[10px] text-rose-500 font-semibold px-1">{error}</p>}

      {files.length > 0 && (
        <div className="flex flex-col gap-1.5 pt-1">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            Attached Files ({files.length}/{maxFiles})
          </span>
          <div className="flex flex-col gap-1.5">
            {files.map((file, idx) => (
              <div
                key={`${file.name}-${idx}`}
                className="flex items-center justify-between gap-2 p-2 rounded-xl bg-gray-50 border border-gray-100 text-xs"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <FileText size={15} weight="bold" className="text-[#5B50EC] shrink-0" />
                  <span className="font-semibold text-gray-800 truncate text-[11px]" title={file.name}>{file.name}</span>
                  <span className="text-[9px] text-gray-400 shrink-0">({formatFileSize(file.size)})</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleRemove(idx) }}
                  className="p-1 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                  title="Remove attachment"
                >
                  <X size={12} weight="bold" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

