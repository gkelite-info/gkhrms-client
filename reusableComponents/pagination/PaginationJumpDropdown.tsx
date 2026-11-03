"use client"

import React, { useState, useRef, useEffect } from "react"
import { CaretDown, ArrowRight } from "phosphor-react"
import { motion, AnimatePresence } from "framer-motion"

interface PaginationJumpDropdownProps {
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  quickJumpPages?: number[]
  disabled?: boolean
}

export default function PaginationJumpDropdown({
  isOpen,
  onToggle,
  onClose,
  totalPages,
  currentPage,
  onPageChange,
  quickJumpPages,
  disabled = false,
}: PaginationJumpDropdownProps) {
  const [jumpValue, setJumpValue] = useState("")
  const [jumpError, setJumpError] = useState("")
  const [openUpward, setOpenUpward] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen) return
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top
      setOpenUpward(spaceBelow < 200 && spaceAbove > spaceBelow)
    }
    setJumpValue("")
    setJumpError("")
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 60)
    return () => clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("mousedown", handleOutsideClick)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  const parsedJump = parseInt(jumpValue, 10)
  const isValidJump = !isNaN(parsedJump) && parsedJump >= 1 && parsedJump <= totalPages

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    if (raw === "") {
      setJumpValue("")
      setJumpError("")
      return
    }
    if (!/^\d+$/.test(raw)) return
    const num = parseInt(raw, 10)
    if (num <= 0) {
      setJumpValue("1")
      setJumpError("Page must be 1 or greater")
      return
    }
    if (num > totalPages) {
      setJumpValue(String(totalPages))
      setJumpError(`Max page is ${totalPages}`)
      return
    }
    setJumpValue(String(num))
    setJumpError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValidJump) {
      onPageChange(parsedJump)
      onClose()
    }
  }

  const milestones = (() => {
    if (quickJumpPages && quickJumpPages.length > 0) return quickJumpPages
    if (totalPages <= 10) return []
    const quarter = Math.round(totalPages * 0.25)
    const half = Math.round(totalPages * 0.5)
    const threeQuarters = Math.round(totalPages * 0.75)
    const set = new Set<number>()
    ;[quarter, half, threeQuarters].forEach((p) => {
      if (p > 1 && p < totalPages) set.add(p)
    })
    return Array.from(set).filter((p) => p >= 1 && p <= totalPages)
  })()

  return (
    <div ref={containerRef} className="relative inline-block ml-0.5 sm:ml-1">
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled || totalPages <= 1}
        className="h-8 px-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:border-[#5B50EC] hover:bg-[#F9F9FE] hover:text-[#5B50EC] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all text-xs font-semibold shadow-xs shrink-0 cursor-pointer whitespace-nowrap"
        title={disabled || totalPages <= 1 ? "No pages to jump" : "Go to page"}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className="whitespace-nowrap">Go to</span>
        <CaretDown
          size={11}
          weight="bold"
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#5B50EC]" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: openUpward ? 4 : -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: openUpward ? 4 : -4 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={`absolute z-50 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 flex flex-col gap-2.5 right-0 ${
              openUpward ? "bottom-full mb-1.5" : "top-full mt-1.5"
            }`}
            role="dialog"
            aria-label="Jump to page"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <span className="text-xs font-bold text-[#1F2433]">Jump to Page</span>
              <span className="text-[10px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                1 – {totalPages}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <input
                  ref={inputRef}
                  type="number"
                  min={1}
                  max={totalPages}
                  value={jumpValue}
                  onChange={handleInputChange}
                  disabled={totalPages <= 1}
                  placeholder={totalPages <= 1 ? "Disabled" : `1 - ${totalPages}`}
                  className="flex-1 min-w-0 px-2.5 py-1.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#5B50EC] focus:ring-2 focus:ring-[#5B50EC]/15 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed no-spinner [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  aria-label="Target page number"
                />
                <button
                  type="submit"
                  disabled={!isValidJump || totalPages <= 1}
                  className="px-3 py-1.5 rounded-xl bg-[#5B50EC] hover:bg-[#483fd4] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <span>Go</span>
                  <ArrowRight size={11} weight="bold" />
                </button>
              </div>

              {jumpError ? (
                <p className="text-[10px] text-red-500 font-medium px-0.5">{jumpError}</p>
              ) : (
                <p className="text-[10px] text-gray-400 font-medium px-0.5">
                  Type page 1 to {totalPages} and press Enter
                </p>
              )}
            </form>

            {milestones.length > 0 && (
              <div className="pt-2 border-t border-gray-100 flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Quick Milestones
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {milestones.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        onPageChange(m)
                        onClose()
                      }}
                      className={`flex-1 min-w-[62px] px-2 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer text-center select-none shadow-2xs ${
                        currentPage === m
                          ? "bg-[#5B50EC] text-white border-[#5B50EC] shadow-xs"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-[#F1F0FD] hover:text-[#5B50EC] hover:border-[#5B50EC]/30"
                      }`}
                    >
                      Page {m}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
