"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"
import {
  ReusablePagination,
  ReusableConfirmationModal,
} from "@/components/reusableComponents"
import { MyRequestItem, MyFilterType } from "./types"
import { initialMyRequests } from "./myRequestsData"
import MyRequestsHeader from "./MyRequestsHeader"
import MyRequestsFilterBar from "./MyRequestsFilterBar"
import MyRequestsTable from "./MyRequestsTable"
import MyRequestDetailModal from "./MyRequestDetailModal"

interface TeamLeadMyRequestsSectionProps {
  hideHeader?: boolean
}

export default function TeamLeadMyRequestsSection({
  hideHeader = false,
}: TeamLeadMyRequestsSectionProps = {}) {
  const searchParams = useSearchParams()
  const typeParam = searchParams.get("type")

  const [requests, setRequests] = useState<MyRequestItem[]>(initialMyRequests)
  const [filterType, setFilterType] = useState<MyFilterType>(() => {
    if (typeParam === "leave") return "Leave"
    if (typeParam === "wfh" || typeParam === "work-from-home") return "Work From Home"
    return "All"
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Statuses")
  const [fromDate, setFromDate] = useState<Date | null>(null)
  const [toDate, setToDate] = useState<Date | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [viewingRequest, setViewingRequest] = useState<MyRequestItem | null>(null)
  const [requestToCancel, setRequestToCancel] = useState<MyRequestItem | null>(null)
  const [isCancelling, setIsCancelling] = useState(false)

  useEffect(() => {
    if (typeParam === "leave") setFilterType("Leave")
    else if (typeParam === "wfh" || typeParam === "work-from-home") setFilterType("Work From Home")
    else if (typeParam === "all") setFilterType("All")
  }, [typeParam])

  const filteredRequests = useMemo(() => {
    return requests.filter((item) => {
      if (filterType !== "All" && item.requestType !== filterType) return false
      if (statusFilter !== "All Statuses" && item.status !== statusFilter) return false
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchType = item.requestType.toLowerCase().includes(query)
        const matchLeave = (item.leaveType || "").toLowerCase().includes(query)
        const matchApprover = item.approver.name.toLowerCase().includes(query)
        const matchDates = item.dates.toLowerCase().includes(query)
        if (!matchType && !matchLeave && !matchApprover && !matchDates) return false
      }
      if (fromDate || toDate) {
        const itemTime = new Date(item.requestedOn).getTime()
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
  }, [requests, filterType, statusFilter, searchQuery, fromDate, toDate])

  const totalItems = filteredRequests.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const paginatedRequests = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredRequests.slice(start, start + pageSize)
  }, [filteredRequests, currentPage, pageSize])

  const handleConfirmCancel = () => {
    if (!requestToCancel) return
    setIsCancelling(true)
    setTimeout(() => {
      setRequests((prev) => prev.filter((r) => r.id !== requestToCancel.id))
      toast.success("Your request has been cancelled successfully!", { position: "top-right" })
      setIsCancelling(false)
      setRequestToCancel(null)
      setViewingRequest(null)
    }, 400)
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-5 w-full min-w-0">
      <Toaster position="top-right" />

      {!hideHeader && <MyRequestsHeader />}

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col gap-4 min-w-0">
        <MyRequestsFilterBar
          filterType={filterType}
          onFilterTypeChange={(type) => {
            setFilterType(type)
            setCurrentPage(1)
          }}
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q)
            setCurrentPage(1)
          }}
          statusFilter={statusFilter}
          onStatusChange={(s) => {
            setStatusFilter(s)
            setCurrentPage(1)
          }}
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
        />

        <MyRequestsTable
          requests={paginatedRequests}
          onViewRequest={(item) => setViewingRequest(item)}
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
          pageSizeOptions={[5, 10, 15]}
          showPageSize={true}
          showTotalInfo={true}
          showJumpToPage={true}
          layout="auto"
        />
      </div>

      <MyRequestDetailModal
        request={viewingRequest}
        onClose={() => setViewingRequest(null)}
        onCancelRequest={(item) => setRequestToCancel(item)}
      />

      <ReusableConfirmationModal
        isOpen={!!requestToCancel}
        onClose={() => setRequestToCancel(null)}
        onConfirm={handleConfirmCancel}
        title="Cancel Attendance Request"
        description={`Are you sure you want to cancel your ${requestToCancel?.requestType} request for ${requestToCancel?.dates}? This action cannot be undone.`}
        confirmText="Yes, Cancel Request"
        cancelText="Keep Request"
        type="danger"
        isLoading={isCancelling}
      />
    </div>
  )
}
