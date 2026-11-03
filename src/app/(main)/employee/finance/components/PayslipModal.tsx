"use client"

import React, { useEffect, useState } from "react"
import { X, Download, Loader2 } from "lucide-react"
import EmployeePayslipDocument, { PayslipData } from "./EmployeePayslipDocument"
import { downloadPayslipPdf } from "../utils/downloadPdf"

export interface PayslipModalProps {
  isOpen: boolean
  onClose: () => void
  data?: PayslipData
}

export default function PayslipModal({
  isOpen,
  onClose,
  data,
}: PayslipModalProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleDownload = () => {
    if (isDownloading) return
    setIsDownloading(true)
    try {
      downloadPayslipPdf(data, "Payslip_Alexander_Jul2025.pdf")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-slate-100 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-white border-b border-slate-200">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              Payslip Preview
            </h2>
            <p className="text-[11px] text-slate-500">
              26 Jun 2025 - 25 Jul 2025 &bull; Alexander
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#5B50EC] hover:bg-[#4d42e2] disabled:opacity-75 rounded-lg transition-colors cursor-pointer"
            >
              {isDownloading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{isDownloading ? "Downloading..." : "Download"}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer ml-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-3 sm:p-6 bg-slate-100">
          <EmployeePayslipDocument data={data} id="modal-printable-payslip" />
        </div>
      </div>
    </div>
  )
}
