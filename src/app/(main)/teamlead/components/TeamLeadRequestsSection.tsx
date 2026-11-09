"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"
import { DateFilterValue, ReusableConfirmationModal } from "@/components/reusableComponents"
import { AttendanceRequestItem, getValidStatus, getValidType } from "../requests/types"
import { initialRequests } from "../requests/data/requestsData"
import { filterAttendanceRequests, ConfirmDialogState } from "../requests/data/filterRequests"
import { getRequestsColumns } from "../requests/components/requestsColumns"
import { getDefaultDateFilterValue } from "../data/dateFilterUtils"
import { initialMyRequests } from "./my-requests/myRequestsData"
import TeamLeadMyRequestsSection from "./my-requests/TeamLeadMyRequestsSection"
import RequestsHeader from "../requests/components/RequestsHeader"
import RequestsStatsCards from "../requests/components/RequestsStatsCards"
import RequestsTableCard from "../requests/components/RequestsTableCard"
import RequestDetailModal from "../requests/components/RequestDetailModal"
import RequestsSubTabNav from "../requests/components/RequestsSubTabNav"

interface TeamLeadRequestsSectionProps {
  canApprove?: boolean
}

export default function TeamLeadRequestsSection({ canApprove: canApproveProp }: TeamLeadRequestsSectionProps = {}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isEmployee = pathname?.startsWith("/employee")
  const isFinance = pathname?.startsWith("/financeexecutive") || pathname?.startsWith("/financemanager") || pathname?.startsWith("/finance") || pathname?.startsWith("/accountantexecutive")
  const isEmployeeLike = isEmployee || isFinance
  const canApprove = canApproveProp ?? !isEmployeeLike

  const tabParam = searchParams.get("tab")
  const subtabParam = searchParams.get("subtab")
  const activeSubtab = isEmployeeLike
    ? "my-requests"
    : subtabParam === "team-requests"
    ? "team-requests"
    : subtabParam === "my-requests" || tabParam === "my-requests"
    ? "my-requests"
    : "team-requests"

  const handleSubtabChange = (subtab: "team-requests" | "my-requests") => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", "requests")
    params.set("subtab", subtab)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const [requests, setRequests] = useState<AttendanceRequestItem[]>(initialRequests)
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get("q") || searchParams.get("search") || "")
  const [requestTypeFilter, setRequestTypeFilter] = useState(() => getValidType(searchParams.get("type")))
  const [statusFilter, setStatusFilter] = useState(() => getValidStatus(searchParams.get("status")))
  const [dateFilter, setDateFilter] = useState<DateFilterValue>(getDefaultDateFilterValue)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [viewingRequest, setViewingRequest] = useState<AttendanceRequestItem | null>(null)
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState | null>(null)

  useEffect(() => {
    const urlStatus = searchParams.get("status")
    if (urlStatus !== null) {
      setStatusFilter(getValidStatus(urlStatus))
      setCurrentPage(1)
    }
  }, [searchParams])

  const pendingCount = useMemo(() => requests.filter((r) => r.status === "Pending").length, [requests])
  const approvedCount = useMemo(() => requests.filter((r) => r.status === "Approved").length, [requests])
  const rejectedCount = useMemo(() => requests.filter((r) => r.status === "Rejected").length, [requests])

  const promptAction = useCallback((id: string, type: "approve" | "reject") => {
    if (!canApprove) return
    const item = requests.find((r) => r.id === id)
    setConfirmDialog({ isOpen: true, type, requestId: id, employeeName: item?.name || "this employee" })
  }, [canApprove, requests])

  const executeConfirmAction = () => {
    if (!confirmDialog || !canApprove) return
    const { requestId, type, employeeName } = confirmDialog
    const newStatus = type === "approve" ? "Approved" : "Rejected"

    setRequests((prev) => prev.map((r) => (r.id === requestId ? { ...r, status: newStatus } : r)))
    if (viewingRequest?.id === requestId) {
      setViewingRequest((prev) => (prev ? { ...prev, status: newStatus } : null))
    }

    if (type === "approve") {
      toast.success(`Request for ${employeeName} approved successfully!`, { position: "top-right" })
    } else {
      toast.error(`Request for ${employeeName} has been rejected.`, { position: "top-right" })
    }
    setConfirmDialog(null)
  }

  const handleResetFilters = () => {
    setSearchQuery("")
    setRequestTypeFilter("All Types")
    setStatusFilter("All Statuses")
    setDateFilter(getDefaultDateFilterValue())
    setCurrentPage(1)
  }

  const filteredRequests = useMemo(
    () => filterAttendanceRequests(requests, searchQuery, requestTypeFilter, statusFilter),
    [requests, searchQuery, requestTypeFilter, statusFilter]
  )

  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / pageSize))
  const paginatedRequests = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredRequests.slice(start, start + pageSize)
  }, [filteredRequests, currentPage, pageSize])

  const columns = useMemo(
    () =>
      getRequestsColumns({
        onApprove: (id) => promptAction(id, "approve"),
        onReject: (id) => promptAction(id, "reject"),
        onView: (row) => setViewingRequest(row),
        canApprove,
      }),
    [promptAction, canApprove]
  )

  const subtitle = isEmployeeLike
    ? "Track and manage your leave and work from home requests."
    : "Review and manage attendance-related requests from your team members."

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5 min-w-0">
      <Toaster position="top-right" toastOptions={{ duration: 3200 }} />
      <RequestsHeader subtitle={subtitle} />
      {!isEmployeeLike && (
        <RequestsSubTabNav
          activeSubtab={activeSubtab}
          onSubtabChange={handleSubtabChange}
          teamRequestsCount={requests.length}
          myRequestsCount={initialMyRequests.length}
        />
      )}
      {activeSubtab === "my-requests" || isEmployeeLike ? (
        <TeamLeadMyRequestsSection hideHeader={true} />
      ) : (
        <>
          <RequestsStatsCards
            pendingCount={pendingCount}
            approvedCount={approvedCount}
            rejectedCount={rejectedCount}
            activeStatus={statusFilter}
            onStatusSelect={(status: string) => { setStatusFilter(status); setCurrentPage(1); }}
          />
          <RequestsTableCard
            searchQuery={searchQuery}
            onSearchChange={(q) => { setSearchQuery(q); setCurrentPage(1); }}
            requestTypeFilter={requestTypeFilter}
            onRequestTypeChange={(t) => { setRequestTypeFilter(t); setCurrentPage(1); }}
            statusFilter={statusFilter}
            onStatusChange={(s) => { setStatusFilter(s); setCurrentPage(1); }}
            dateFilter={dateFilter}
            onDateFilterChange={(d) => { setDateFilter(d); setCurrentPage(1); }}
            onResetFilters={handleResetFilters}
            columns={columns}
            paginatedRequests={paginatedRequests}
            totalItems={filteredRequests.length}
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(newSize) => { setPageSize(newSize); setCurrentPage(1); }}
          />
          {viewingRequest && (
            <RequestDetailModal
              request={viewingRequest}
              onClose={() => setViewingRequest(null)}
              onApprove={(id) => promptAction(id, "approve")}
              onReject={(id) => promptAction(id, "reject")}
              canApprove={canApprove}
            />
          )}
          {confirmDialog && canApprove && (
            <ReusableConfirmationModal
              isOpen={confirmDialog.isOpen}
              onClose={() => setConfirmDialog(null)}
              onConfirm={executeConfirmAction}
              type={confirmDialog.type === "approve" ? "success" : "danger"}
              title={confirmDialog.type === "approve" ? "Approve Attendance Request?" : "Reject Attendance Request?"}
              description={`Are you sure you want to ${confirmDialog.type === "approve" ? "approve" : "reject"} the request for ${confirmDialog.employeeName}?`}
              confirmText={confirmDialog.type === "approve" ? "Approve" : "Reject"}
              cancelText="Cancel"
            />
          )}
        </>
      )}
    </div>
  )
}
