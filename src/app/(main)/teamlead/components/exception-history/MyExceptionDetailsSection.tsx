"use client"

import { useState, useMemo } from "react"
import { ReusablePagination } from "@/components/reusableComponents"
import { MyExceptionItem } from "./types"
import { initialMyExceptions } from "./exceptionHistoryData"
import ExceptionFilterBar from "./ExceptionFilterBar"
import MyExceptionTable from "./MyExceptionTable"
import ExceptionRecordDetailModal from "./ExceptionRecordDetailModal"

const issueTypeOptions = [
  "All",
  "Late Check-in",
  "Missed Check-out",
  "Low Working Hours",
  "Early Check-out",
  "Missed Check-in",
]

const statusOptions = ["All", "Approved", "Pending", "Rejected"]

export default function MyExceptionDetailsSection() {
  const [exceptions] = useState<MyExceptionItem[]>(initialMyExceptions)
  const [searchQuery, setSearchQuery] = useState("")
  const [issueFilter, setIssueFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [fromDate, setFromDate] = useState<Date | null>(null)
  const [toDate, setToDate] = useState<Date | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedRecord, setSelectedRecord] = useState<MyExceptionItem | null>(null)

  const filtered = useMemo(() => {
    return exceptions.filter((item) => {
      if (issueFilter !== "All" && item.issueType !== issueFilter) return false
      if (statusFilter !== "All" && item.status !== statusFilter) return false
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchIssue = item.issueType.toLowerCase().includes(q)
        const matchCorrection = item.requestedCorrection.toLowerCase().includes(q)
        const matchReviewer = item.reviewedBy.name.toLowerCase().includes(q)
        const matchDate = item.date.toLowerCase().includes(q)
        const matchStatus = item.status.toLowerCase().includes(q)
        if (!matchIssue && !matchCorrection && !matchReviewer && !matchDate && !matchStatus) return false
      }
      if (fromDate || toDate) {
        const itemTime = new Date(item.date).getTime()
        if (fromDate) {
          const fromStart = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()).getTime()
          if (itemTime < fromStart) return false
        }
        if (toDate) {
          const toEnd = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 23, 59, 59, 999).getTime()
          if (itemTime > toEnd) return false
        }
      }
      return true
    })
  }, [exceptions, issueFilter, statusFilter, searchQuery, fromDate, toDate])

  const totalItems = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, currentPage, pageSize])

  const handleResetFilters = () => {
    setSearchQuery("")
    setIssueFilter("All")
    setStatusFilter("All")
    setFromDate(null)
    setToDate(null)
    setCurrentPage(1)
  }

  return (
    <div className="flex flex-col gap-4 w-full min-w-0">
      <ExceptionFilterBar
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q)
          setCurrentPage(1)
        }}
        searchPlaceholder="Search by issue, reviewer, or date..."
        issueFilter={issueFilter}
        onIssueFilterChange={(issue) => {
          setIssueFilter(issue)
          setCurrentPage(1)
        }}
        issueTypeOptions={issueTypeOptions}
        statusFilter={statusFilter}
        onStatusFilterChange={(status) => {
          setStatusFilter(status)
          setCurrentPage(1)
        }}
        statusOptions={statusOptions}
        fromDate={fromDate}
        onFromDateChange={(d) => {
          setFromDate(d)
          setCurrentPage(1)
        }}
        toDate={toDate}
        onToDateChange={(d) => {
          setToDate(d)
          setCurrentPage(1)
        }}
        onClearAll={handleResetFilters}
      />

      <MyExceptionTable records={paginated} onSelectRecord={(item) => setSelectedRecord(item)} />

      <ReusablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setCurrentPage(1)
        }}
        pageSizeOptions={[5, 10, 15]}
        showPageSize={true}
        showTotalInfo={true}
        showJumpToPage={true}
        layout="auto"
      />

      <ExceptionRecordDetailModal
        isOpen={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
        record={
          selectedRecord
            ? {
                date: selectedRecord.date,
                issueType: selectedRecord.issueType,
                originalValue: selectedRecord.originalValue,
                correctedValue: selectedRecord.correctedValue,
                reviewerOrApprover: selectedRecord.reviewedBy.name,
                reviewerRole: selectedRecord.reviewedBy.role,
                status: selectedRecord.status,
                reason: selectedRecord.reason,
              }
            : null
        }
      />
    </div>
  )
}
