"use client"

import React from "react"
import { CaretLeft, CaretRight, CaretDoubleLeft, CaretDoubleRight } from "phosphor-react"
import PaginationJumpDropdown from "./PaginationJumpDropdown"

interface PaginationDesktopControlsProps {
  pages: (number | string)[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showJumpToPage: boolean
  isJumpOpen: boolean
  setIsJumpOpen: React.Dispatch<React.SetStateAction<boolean>>
  quickJumpPages?: number[]
  isTwoRow: boolean
  isEmpty?: boolean
}

export default function PaginationDesktopControls({
  pages,
  currentPage,
  totalPages,
  onPageChange,
  showJumpToPage,
  isJumpOpen,
  setIsJumpOpen,
  quickJumpPages,
  isTwoRow,
  isEmpty = false,
}: PaginationDesktopControlsProps) {
  return (
    <div
      className={`hidden sm:flex flex-wrap items-center ${
        isTwoRow ? "justify-center w-full" : "justify-end"
      } gap-1 sm:gap-1.5 py-1 shrink-0`}
    >
      <button
        type="button"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1 || isEmpty}
        className="w-8 h-8 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-[#F1F0FD] hover:text-[#5B50EC] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors shadow-xs shrink-0 cursor-pointer"
        title="First Page"
        aria-label="First page"
      >
        <CaretDoubleLeft size={13} weight="bold" />
      </button>

      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isEmpty}
        className="w-8 h-8 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-[#F1F0FD] hover:text-[#5B50EC] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors shadow-xs shrink-0 cursor-pointer"
        title="Previous Page"
        aria-label="Previous page"
      >
        <CaretLeft size={13} weight="bold" />
      </button>

      <div className="flex items-center gap-1 shrink-0">
        {pages.map((p, idx) => {
          if (p === "...") {
            return (
              <button
                key={`ellipsis-${idx}`}
                type="button"
                onClick={() => {
                  if (totalPages > 1 && !isEmpty) setIsJumpOpen(true)
                }}
                disabled={totalPages <= 1 || isEmpty}
                className="px-1.5 py-1 text-gray-400 hover:text-[#5B50EC] hover:bg-[#F1F0FD] rounded-lg font-bold select-none text-xs transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                title="Click to jump to page"
                aria-label="Jump to page"
              >
                ...
              </button>
            )
          }
          const pageNum = Number(p)
          const isActive = pageNum === currentPage && !isEmpty

          return (
            <button
              key={`page-${pageNum}`}
              type="button"
              disabled={isEmpty}
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 rounded-xl text-xs font-bold transition-all shrink-0 select-none ${
                isEmpty
                  ? "border border-gray-200 bg-gray-50 text-gray-400 opacity-40 cursor-not-allowed shadow-none"
                  : isActive
                  ? "bg-[#5B50EC] text-white shadow-xs cursor-pointer"
                  : "border border-gray-200 bg-white text-gray-700 hover:border-[#5B50EC] hover:text-[#5B50EC] hover:bg-[#F9F9FE] cursor-pointer"
              }`}
              aria-current={isActive ? "page" : undefined}
              aria-label={`Page ${pageNum}`}
            >
              {pageNum}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages || isEmpty}
        className="w-8 h-8 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-[#F1F0FD] hover:text-[#5B50EC] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors shadow-xs shrink-0 cursor-pointer"
        title="Next Page"
        aria-label="Next page"
      >
        <CaretRight size={13} weight="bold" />
      </button>

      <button
        type="button"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage >= totalPages || isEmpty}
        className="w-8 h-8 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-[#F1F0FD] hover:text-[#5B50EC] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors shadow-xs shrink-0 cursor-pointer"
        title="Last Page"
        aria-label="Last page"
      >
        <CaretDoubleRight size={13} weight="bold" />
      </button>

      {showJumpToPage && (
        <PaginationJumpDropdown
          isOpen={isJumpOpen}
          onToggle={() => setIsJumpOpen((prev) => !prev)}
          onClose={() => setIsJumpOpen(false)}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          quickJumpPages={quickJumpPages}
          disabled={totalPages <= 1 || isEmpty}
        />
      )}
    </div>
  )
}
