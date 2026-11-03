"use client"

import React, { useState } from "react"
import { CaretLeft, CaretRight, CaretDown } from "phosphor-react"
import ReusableDropdown from "./ReusableDropdown"
import PaginationDesktopControls from "./pagination/PaginationDesktopControls"
import PaginationJumpModal from "./pagination/PaginationJumpModal"

export interface ReusablePaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems?: number
  pageSize?: number
  onPageSizeChange?: (size: number) => void
  pageSizeOptions?: number[]
  showPageSize?: boolean
  showTotalInfo?: boolean
  showJumpToPage?: boolean
  quickJumpPages?: number[]
  className?: string
  align?: "center" | "between"
  layout?: "auto" | "two-row"
}

export default function ReusablePagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize = 10,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
  showPageSize = true,
  showTotalInfo = true,
  showJumpToPage = true,
  quickJumpPages,
  className = "",
  layout = "auto",
}: ReusablePaginationProps) {
  const [isJumpOpen, setIsJumpOpen] = useState(false)

  if (totalPages <= 0 && totalItems === undefined) return null

  const isEmpty = totalItems !== undefined ? totalItems === 0 : totalPages <= 0

  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= 5) return Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1)
    if (currentPage <= 3) return [1, 2, 3, "...", totalPages]
    if (currentPage >= totalPages - 2) return [1, "...", totalPages - 2, totalPages - 1, totalPages]
    return [1, "...", currentPage, "...", totalPages]
  }

  const pages = getPageNumbers()
  const startItem = totalItems ? Math.min((currentPage - 1) * pageSize + 1, totalItems) : 0
  const endItem = totalItems ? Math.min(currentPage * pageSize, totalItems) : 0
  const isTwoRow = layout === "two-row"

  return (
    <div
      className={`w-full flex ${
        isTwoRow
          ? "flex-col items-center justify-center"
          : "flex-col sm:flex-row items-center justify-between"
      } gap-2.5 sm:gap-3.5 pt-3 pb-2 select-none text-xs min-w-0 ${className}`}
    >
      <div
        className={`flex flex-wrap items-center ${
          isTwoRow
            ? "justify-center w-full"
            : "justify-between sm:justify-start w-full sm:w-auto"
        } gap-2 sm:gap-3 shrink-0 min-w-0`}
      >
        {showTotalInfo && (
          <span className="text-gray-500 font-medium text-xs whitespace-nowrap">
            {totalItems !== undefined ? (
              totalItems === 0 ? (
                <>
                  <span>Showing </span>
                  <strong className="text-gray-800">0</strong> of{" "}
                  <strong className="text-gray-800">0</strong>
                  <span> entries</span>
                </>
              ) : (
                <>
                  <span>Showing </span>
                  <strong className="text-gray-800">{startItem.toLocaleString()}</strong>-
                  <strong className="text-gray-800">{endItem.toLocaleString()}</strong> of{" "}
                  <strong className="text-gray-800">{totalItems.toLocaleString()}</strong>
                  <span> entries</span>
                </>
              )
            ) : (
              `Page ${currentPage} of ${totalPages}`
            )}
          </span>
        )}

        {showPageSize && onPageSizeChange && (
          <div
            className={`flex items-center gap-1.5 ${
              showTotalInfo
                ? isTwoRow
                  ? "pl-2.5 border-l border-gray-200"
                  : "sm:ml-2 sm:pl-2.5 sm:border-l sm:border-gray-200"
                : ""
            } shrink-0`}
          >
            <span className="text-gray-500 text-xs">Rows:</span>
            <ReusableDropdown
              value={pageSize}
              options={pageSizeOptions.map((opt) => ({ label: `${opt}`, value: opt }))}
              onChange={(val) => onPageSizeChange(Number(val))}
              className="min-w-[54px]"
              buttonClassName="py-1 px-2.5 text-xs h-7.5 w-full min-w-[54px]"
              menuClassName="min-w-[76px]"
              selectionType="radio"
              align="right"
            />
          </div>
        )}
      </div>

      <div className="flex sm:hidden items-center justify-center w-full gap-2 pt-0.5 min-w-0">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isEmpty}
          className="w-9 h-8.5 rounded-xl border border-gray-200 bg-white text-gray-700 flex items-center justify-center shadow-2xs hover:bg-gray-50 active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0"
          title="Previous Page"
          aria-label="Previous page"
        >
          <CaretLeft size={14} weight="bold" />
        </button>

        <div className="shrink-0 h-8.5 px-3 rounded-xl bg-gray-50 text-gray-700 font-bold text-xs flex items-center justify-center border border-gray-100 shadow-2xs">
          <span className="whitespace-nowrap">
            {isEmpty ? "Page 0 of 0" : `Page ${currentPage} of ${totalPages}`}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || isEmpty}
          className="w-9 h-8.5 rounded-xl border border-gray-200 bg-white text-gray-700 flex items-center justify-center shadow-2xs hover:bg-gray-50 active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0"
          title="Next Page"
          aria-label="Next page"
        >
          <CaretRight size={14} weight="bold" />
        </button>

        {showJumpToPage && (
          <button
            type="button"
            onClick={() => {
              if (totalPages > 1 && !isEmpty) setIsJumpOpen(true)
            }}
            disabled={totalPages <= 1 || isEmpty}
            className="h-8.5 px-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:text-[#5B50EC] hover:border-[#5B50EC] active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 text-xs font-semibold shrink-0 cursor-pointer whitespace-nowrap shadow-2xs transition-all"
            title="Go to page"
            aria-label="Go to page"
          >
            <span>Go to</span>
            <CaretDown size={11} weight="bold" className="text-gray-400 shrink-0" />
          </button>
        )}
      </div>

      <PaginationDesktopControls
        pages={pages}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        showJumpToPage={showJumpToPage}
        isJumpOpen={isJumpOpen}
        setIsJumpOpen={setIsJumpOpen}
        quickJumpPages={quickJumpPages}
        isTwoRow={isTwoRow}
        isEmpty={isEmpty}
      />

      <PaginationJumpModal
        isOpen={isJumpOpen}
        onClose={() => setIsJumpOpen(false)}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
        quickJumpPages={quickJumpPages}
      />
    </div>
  )
}
