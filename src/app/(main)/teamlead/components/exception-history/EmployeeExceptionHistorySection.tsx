"use client"

import { useState, useMemo } from "react"
import { ReusablePagination } from "@/components/reusableComponents"
import { TeamMemberExceptionSummary, EmployeeExceptionRecord } from "./types"
import EmployeeExceptionHeaderCard from "./EmployeeExceptionHeaderCard"
import EmployeeExceptionTable from "./EmployeeExceptionTable"
import ExceptionFilterBar from "./ExceptionFilterBar"
import ExceptionRecordDetailModal from "./ExceptionRecordDetailModal"

interface EmployeeExceptionHistorySectionProps {
  member: TeamMemberExceptionSummary
  onBack: () => void
}

const issueTypeOptions = [
  "All",
  "Late Check-in",
  "Missed Check-out",
  "Low Working Hours",
  "Early Check-out",
  "Missed Check-in",
]

const statusOptions = ["All", "Approved", "Pending", "Rejected"]

export default function EmployeeExceptionHistorySection({
  member,
  onBack,
}: EmployeeExceptionHistorySectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [issueFilter, setIssueFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [fromDate, setFromDate] = useState<Date | null>(null)
  const [toDate, setToDate] = useState<Date | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(7)
  const [selectedRecord, setSelectedRecord] = useState<EmployeeExceptionRecord | null>(null)

  const filtered = useMemo(() => {
    return member.records.filter((rec) => {
      if (issueFilter !== "All" && rec.issueType !== issueFilter) return false
      if (statusFilter !== "All" && rec.status !== statusFilter) return false
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchIssue = rec.issueType.toLowerCase().includes(q)
        const matchApprover = rec.approvedBy.toLowerCase().includes(q)
        const matchDate = rec.date.toLowerCase().includes(q)
        const matchStatus = rec.status.toLowerCase().includes(q)
        if (!matchIssue && !matchApprover && !matchDate && !matchStatus) return false
      }
      if (fromDate || toDate) {
        const itemTime = new Date(rec.date).getTime()
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
  }, [member.records, issueFilter, statusFilter, searchQuery, fromDate, toDate])

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
      <EmployeeExceptionHeaderCard member={member} />

      <ExceptionFilterBar
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q)
          setCurrentPage(1)
        }}
        searchPlaceholder="Search by issue, approver, or date..."
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

      <EmployeeExceptionTable
        records={paginated}
        totalRecordsCount={member.records.length}
        onViewDetails={(rec) => setSelectedRecord(rec)}
      />

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
        pageSizeOptions={[5, 7, 10]}
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
                reviewerOrApprover: selectedRecord.approvedBy,
                status: selectedRecord.status,
                reason: selectedRecord.reason,
                employeeName: member.name,
              }
            : null
        }
      />
    </div>
  )
}
