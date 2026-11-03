"use client"

import React, { useState } from "react"
import { ArrowLeft, Download, Loader2 } from "lucide-react"
import EmployeePayslipDocument, { PayslipData } from "./EmployeePayslipDocument"
import { downloadPayslipPdf } from "../utils/downloadPdf"

export interface PayslipViewProps {
  onBack: () => void
  data?: PayslipData
}

export default function PayslipView({ onBack, data }: PayslipViewProps) {
  const [isDownloading, setIsDownloading] = useState(false)

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
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-xl shadow-xs border border-slate-100 print:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Finance</span>
          </button>
          <div className="h-4 w-px bg-slate-200 hidden sm:block" />
          <span className="text-xs sm:text-sm font-medium text-slate-500 hidden sm:inline">
            Employee Payslip &bull; Jul 2025
          </span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#5B50EC] hover:bg-[#4d42e2] disabled:opacity-75 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            {isDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>
              {isDownloading ? "Downloading..." : "Download Payslip"}
            </span>
          </button>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-payslip,
          #printable-payslip * {
            visibility: visible;
          }
          #printable-payslip {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 24px !important;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>

      <EmployeePayslipDocument data={data} id="printable-payslip" />
    </div>
  )
}
