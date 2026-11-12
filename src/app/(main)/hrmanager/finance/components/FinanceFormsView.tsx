"use client"

import React, { useState, useRef, useEffect } from "react"
import { ChevronDown, ArrowDown, Info } from "lucide-react"
import { downloadForm12BBPdf } from "../utils/downloadPdf"

const FINANCIAL_YEARS = [
  "APR 2024 - MAR 2025",
  "APR 2023 - MAR 2024",
  "APR 2022 - MAR 2023",
]

function FormPendingIllustration({
  className = "w-14 h-18 sm:w-16 sm:h-20",
}: {
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 68 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 6C8 4.34315 9.34315 3 11 3H46L62 19V74C62 75.6569 60.6569 77 59 77H11C9.34315 77 8 75.6569 8 74V6Z"
        fill="#FFFFFF"
        stroke="#CBD5E1"
        strokeWidth="2"
      />
      <path
        d="M46 3V19H62"
        fill="#F8FAFC"
        stroke="#CBD5E1"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M16 27H38M16 35H30M16 43H24M16 51H32M16 59H48M16 67H44"
        stroke="#E2E8F0"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="39"
        cy="43"
        r="14"
        fill="#FFFFFF"
        stroke="#94A3B8"
        strokeWidth="2.5"
      />
      <text
        x="39"
        y="49"
        textAnchor="middle"
        fontSize="17"
        fontWeight="bold"
        fill="#94A3B8"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        ?
      </text>
      <path
        d="M49 53L58 62"
        stroke="#94A3B8"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function FinanceFormsView() {
  const [f16Year, setF16Year] = useState(FINANCIAL_YEARS[0])
  const [isF16YearOpen, setIsF16YearOpen] = useState(false)
  const [f12Year, setF12Year] = useState(FINANCIAL_YEARS[0])
  const [isF12YearOpen, setIsF12YearOpen] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  const f16DropdownRef = useRef<HTMLDivElement>(null)
  const f12DropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        f16DropdownRef.current &&
        !f16DropdownRef.current.contains(event.target as Node)
      ) {
        setIsF16YearOpen(false)
      }
      if (
        f12DropdownRef.current &&
        !f12DropdownRef.current.contains(event.target as Node)
      ) {
        setIsF12YearOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (!notification) return
    const timer = setTimeout(() => setNotification(null), 4000)
    return () => clearTimeout(timer)
  }, [notification])

  const handleDownloadForm16 = () => {
    setNotification(
      `Form 16 has not been released by the admin for ${f16Year}.`
    )
  }

  const handleDownloadForm12BB = () => {
    downloadForm12BBPdf(f12Year)
  }

  const handleQuickoRedirect = () => {
    window.open("https://quicko.com", "_blank", "noopener,noreferrer")
  }

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5">
      {notification && (
        <div className="w-full bg-amber-50 border border-amber-200 text-amber-900 rounded-xl px-4 py-2.5 text-xs sm:text-sm flex items-center justify-between shadow-2xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{notification}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-amber-700 hover:text-amber-900 text-xs font-semibold cursor-pointer ml-3"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="w-full bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-2xs flex flex-col">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4">
          <div className="flex flex-col">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Form 16
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1 leading-relaxed">
              Form 16 Summarizes your salary, deductions and tax paid and is
              needed for filing tax returns.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
            <div className="relative" ref={f16DropdownRef}>
              <button
                type="button"
                onClick={() => setIsF16YearOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#8577ED] hover:bg-[#7667e8] transition-colors cursor-pointer shadow-2xs"
              >
                <span>{f16Year}</span>
                <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>

              {isF16YearOpen && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-20 animate-in fade-in">
                  {FINANCIAL_YEARS.map((fy) => (
                    <button
                      key={fy}
                      type="button"
                      onClick={() => {
                        setF16Year(fy)
                        setIsF16YearOpen(false)
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs transition-colors cursor-pointer ${
                        f16Year === fy
                          ? "bg-[#8577ED]/10 text-[#8577ED] font-bold"
                          : "text-slate-700 hover:bg-slate-50 font-medium"
                      }`}
                    >
                      {fy}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleDownloadForm16}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#8577ED] hover:bg-[#7667e8] transition-colors cursor-pointer shadow-2xs"
            >
              <span>Download</span>
              <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center py-8 sm:py-12 px-4 text-center">
          <FormPendingIllustration />

          <p className="text-xs sm:text-sm text-slate-600 font-normal mt-4 max-w-lg leading-relaxed">
            Form 16 has not been released by the admin for the selected
            financial year.
          </p>

          <button
            type="button"
            onClick={handleQuickoRedirect}
            className="mt-5 px-5 py-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 hover:text-slate-900 text-xs sm:text-sm font-medium rounded-lg transition-colors shadow-2xs cursor-pointer"
          >
            Received Form 16 Outside ? File ITR Using Quicko
          </button>
        </div>
      </div>

      <div className="w-full bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-2xs flex flex-col">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex flex-col">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Form 12 BB
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1 leading-relaxed">
              Form 12BB has details about your proposed investments &amp;
              expenses that are tax deductible.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
            <div className="relative" ref={f12DropdownRef}>
              <button
                type="button"
                onClick={() => setIsF12YearOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#8577ED] hover:bg-[#7667e8] transition-colors cursor-pointer shadow-2xs"
              >
                <span>{f12Year}</span>
                <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>

              {isF12YearOpen && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-20 animate-in fade-in">
                  {FINANCIAL_YEARS.map((fy) => (
                    <button
                      key={fy}
                      type="button"
                      onClick={() => {
                        setF12Year(fy)
                        setIsF12YearOpen(false)
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs transition-colors cursor-pointer ${
                        f12Year === fy
                          ? "bg-[#8577ED]/10 text-[#8577ED] font-bold"
                          : "text-slate-700 hover:bg-slate-50 font-medium"
                      }`}
                    >
                      {fy}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleDownloadForm12BB}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#8577ED] hover:bg-[#7667e8] transition-colors cursor-pointer shadow-2xs"
            >
              <span>Download</span>
              <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

