"use client"

import { CheckSquare, X, Lightning } from "phosphor-react"

interface HrAttendanceSelectionBannerProps {
  selectedCount: number
  pageRecordCount: number
  currentPage: number
  onClearSelection: () => void
  onOpenBulkModal: () => void
}

export default function HrAttendanceSelectionBanner({
  selectedCount,
  pageRecordCount,
  currentPage,
  onClearSelection,
  onOpenBulkModal,
}: HrAttendanceSelectionBannerProps) {
  if (selectedCount === 0) return null

  const isAllOnPage = selectedCount === pageRecordCount && pageRecordCount > 0

  return (
    <div className="bg-[#EEF2FF] border border-[#DDD9FD] rounded-xl px-3 sm:px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 text-xs text-[#5B50EC] font-medium animate-in fade-in duration-150">
      <div className="flex items-center gap-2 min-w-0">
        <CheckSquare size={16} weight="bold" className="shrink-0" />
        <span className="truncate text-xs">
          {isAllOnPage ? (
            <>All <strong>{pageRecordCount}</strong> on page {currentPage} selected.</>
          ) : (
            <><strong>{selectedCount}</strong> employee{selectedCount > 1 ? "s" : ""} selected.</>
          )}
        </span>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
        <button
          type="button"
          onClick={onOpenBulkModal}
          className="h-8 px-2.5 sm:px-3 rounded-lg bg-[#5B50EC] text-white hover:bg-[#4E44D6] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
        >
          <Lightning size={14} weight="bold" className="shrink-0" />
          <span>
            <span className="sm:hidden">Update ({selectedCount})</span>
            <span className="hidden sm:inline">Add / Update Attendance ({selectedCount})</span>
          </span>
        </button>
        <button
          type="button"
          onClick={onClearSelection}
          className="h-8 px-2 sm:px-2.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-white/60 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 shrink-0"
        >
          <X size={13} weight="bold" />
          <span>Deselect</span>
        </button>
      </div>
    </div>
  )
}
