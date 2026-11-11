"use client"

import { useState, useMemo } from "react"
import toast, { Toaster } from "react-hot-toast"
import { ReusableTable, ReusablePagination, DateFilterValue } from "@/components/reusableComponents"
import { HrAttendanceRecord } from "../data/hrAttendanceData"
import { createHrAttendanceColumns, RowEditFormState } from "./hrAttendanceColumns"
import { validateAttendanceTimes } from "./attendanceTimeUtils"
import HrAttendanceTableFilters from "./HrAttendanceTableFilters"
import HrAttendanceSelectionBanner from "./HrAttendanceSelectionBanner"
import HrAttendanceEditConfirmModal from "./HrAttendanceEditConfirmModal"
import HrAttendanceBulkUpdateModal from "./HrAttendanceBulkUpdateModal"

interface HrAttendanceTableSectionProps {
  records: HrAttendanceRecord[]
  totalItems: number
  currentPage: number
  pageSize: number
  totalPages: number
  searchQuery: string
  roleFilter: string
  fromDate: DateFilterValue
  toDate: DateFilterValue
  showHrRole?: boolean
  onSearchChange: (query: string) => void
  onRoleFilterChange: (role: string) => void
  onFromDateChange: (date: DateFilterValue) => void
  onToDateChange: (date: DateFilterValue) => void
  onResetFilters: () => void
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  onViewRecord: (record: HrAttendanceRecord) => void
  onUpdateRecord?: (updatedRecord: HrAttendanceRecord) => void
  onBulkUpdateRecords?: (ids: string[], updates: Partial<HrAttendanceRecord>) => void
}

export default function HrAttendanceTableSection({
  records,
  totalItems,
  currentPage,
  pageSize,
  totalPages,
  searchQuery,
  roleFilter,
  fromDate,
  toDate,
  showHrRole = false,
  onSearchChange,
  onRoleFilterChange,
  onFromDateChange,
  onToDateChange,
  onResetFilters,
  onPageChange,
  onPageSizeChange,
  onViewRecord,
  onUpdateRecord,
  onBulkUpdateRecords,
}: HrAttendanceTableSectionProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [editingRowId, setEditingRowId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<RowEditFormState | null>(null)
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    original: HrAttendanceRecord | null
    updated: HrAttendanceRecord | null
  }>({ isOpen: false, original: null, updated: null })

  const isAllSelected = records.length > 0 && records.every((r) => selectedIds.includes(r.id))
  const isSomeSelected = records.some((r) => selectedIds.includes(r.id)) && !isAllSelected

  const selectedRecords = useMemo(
    () => records.filter((r) => selectedIds.includes(r.id)),
    [records, selectedIds]
  )

  const handleToggleSelectRow = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      const pageIds = new Set(records.map((r) => r.id))
      setSelectedIds((prev) => prev.filter((id) => !pageIds.has(id)))
    } else {
      setSelectedIds(Array.from(new Set([...selectedIds, ...records.map((r) => r.id)])))
    }
  }

  const handleStartEdit = (record: HrAttendanceRecord) => {
    setEditingRowId(record.id)
    const isUnmarked = record.status === "Not Marked"
    setEditForm({
      status: isUnmarked ? "Present" : record.status,
      checkIn: isUnmarked || record.checkIn === "-" ? "09:00 AM" : record.checkIn,
      checkOut: isUnmarked || record.checkOut === "-" ? "06:00 PM" : record.checkOut,
      workingHours: isUnmarked || record.workingHours === "-" || record.workingHours === "0h 00m" ? "9h 00m" : record.workingHours,
    })
  }

  const handleCancelEdit = () => {
    setEditingRowId(null)
    setEditForm(null)
  }

  const handleSaveEdit = (record: HrAttendanceRecord) => {
    if (!editForm) return
    const validation = validateAttendanceTimes(editForm.status, editForm.checkIn, editForm.checkOut)
    if (!validation.isValid) {
      toast.error(validation.error || "Invalid attendance timings")
      return
    }
    setConfirmModal({ isOpen: true, original: record, updated: { ...record, ...editForm } })
  }

  const handleConfirmSave = () => {
    if (confirmModal.updated && onUpdateRecord) {
      onUpdateRecord(confirmModal.updated)
      toast.success(`Attendance updated for ${confirmModal.updated.name}!`)
    }
    setConfirmModal({ isOpen: false, original: null, updated: null })
    setEditingRowId(null)
    setEditForm(null)
  }

  const handleConfirmBulkUpdate = (updates: Partial<HrAttendanceRecord>) => {
    if (onBulkUpdateRecords && selectedIds.length > 0) {
      onBulkUpdateRecords(selectedIds, updates)
      toast.success(`Attendance updated for ${selectedIds.length} employees!`)
      setSelectedIds([])
      setIsBulkModalOpen(false)
    }
  }

  const columns = useMemo(
    () =>
      createHrAttendanceColumns({
        onViewRecord,
        onStartEdit: handleStartEdit,
        onSaveEdit: handleSaveEdit,
        onCancelEdit: handleCancelEdit,
        editingRowId,
        editForm,
        onEditFormChange: setEditForm,
        selectedIds,
        onToggleSelectRow: handleToggleSelectRow,
        onToggleSelectAll: handleToggleSelectAll,
        isAllSelected,
        isSomeSelected,
      }),
    [onViewRecord, editingRowId, editForm, selectedIds, isAllSelected, isSomeSelected]
  )

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col gap-4">
      <Toaster position="top-right" />
      <HrAttendanceTableFilters
        searchQuery={searchQuery}
        roleFilter={roleFilter}
        fromDate={fromDate}
        toDate={toDate}
        showHrRole={showHrRole}
        onSearchChange={onSearchChange}
        onRoleFilterChange={onRoleFilterChange}
        onFromDateChange={onFromDateChange}
        onToDateChange={onToDateChange}
        onResetFilters={onResetFilters}
      />

      <HrAttendanceSelectionBanner
        selectedCount={selectedIds.length}
        pageRecordCount={records.length}
        currentPage={currentPage}
        onClearSelection={() => setSelectedIds([])}
        onOpenBulkModal={() => setIsBulkModalOpen(true)}
      />

      <div className="w-full overflow-x-auto custom-scrollbar min-h-[220px]">
        <ReusableTable columns={columns} data={records} headerBgColor="transparent" headerTextColor="#9CA3AF" headerRounded="rounded-none" rowHover={true} emptyMessage="No employees found matching the filters." />
      </div>

      <ReusablePagination currentPage={currentPage} totalPages={totalPages} pageSize={pageSize} totalItems={totalItems} onPageChange={onPageChange} onPageSizeChange={onPageSizeChange} />

      <HrAttendanceEditConfirmModal isOpen={confirmModal.isOpen} onClose={() => setConfirmModal({ isOpen: false, original: null, updated: null })} onConfirm={handleConfirmSave} original={confirmModal.original} updated={confirmModal.updated} />

      <HrAttendanceBulkUpdateModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        selectedEmployees={selectedRecords}
        onRemoveEmployee={(id) => setSelectedIds((prev) => prev.filter((i) => i !== id))}
        onConfirm={handleConfirmBulkUpdate}
      />
    </div>
  )
}
