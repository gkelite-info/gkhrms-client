"use client"

import React from "react"
import { X, FileText, Download, CheckCircle, Eye } from "lucide-react"

export interface DocumentItem {
  id: string
  name: string
  size: string
  uploadDate: string
  verified: boolean
}

export interface IdentityDocumentsModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  documents: DocumentItem[]
}

export default function IdentityDocumentsModal({
  isOpen,
  onClose,
  title,
  documents,
}: IdentityDocumentsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="identity-modal-title"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ECEAFC] flex items-center justify-center text-[#5B50EC]">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 id="identity-modal-title" className="text-base font-bold text-slate-900">
                {title}
              </h3>
              <p className="text-xs text-slate-500">
                Uploaded document attachments ({documents.length} files)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                      {doc.name}
                    </p>
                    {doc.verified && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                        <CheckCircle className="w-2.5 h-2.5" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {doc.size} &bull; Uploaded on {doc.uploadDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-3">
                <button
                  type="button"
                  onClick={() => alert(`Opening preview for ${doc.name}`)}
                  className="p-2 text-slate-500 hover:text-slate-800 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => alert(`Downloading ${doc.name}`)}
                  className="p-2 text-[#5B50EC] hover:text-[#4338CA] hover:bg-[#ECEAFC] rounded-lg border border-transparent transition-colors cursor-pointer"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end px-5 py-3.5 bg-slate-50 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

