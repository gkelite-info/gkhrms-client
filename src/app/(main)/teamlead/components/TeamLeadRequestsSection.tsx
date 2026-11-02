"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { UsersThree, FileText } from "phosphor-react"
import TeamLeadMyRequestsSection from "./my-requests/TeamLeadMyRequestsSection"
import { initialMyRequests } from "./my-requests/myRequestsData"
import toast, { Toaster } from "react-hot-toast"
import {
  DateFilterValue,
  ReusableConfirmationModal,
} from "@/components/reusableComponents"
import {
  AttendanceRequestItem,
  getValidStatus,
  getValidType,
} from "../requests/types"
import { initialRequests } from "../requests/data/requestsData"
import RequestsHeader from "../requests/components/RequestsHeader"
import RequestsStatsCards from "../requests/components/RequestsStatsCards"
import RequestsTableCard from "../requests/components/RequestsTableCard"
import RequestDetailModal from "../requests/components/RequestDetailModal"
import { getRequestsColumns } from "../requests/components/requestsColumns"
import { getDefaultDateFilterValue } from "../data/dateFilterUtils"

export default function TeamLeadRequestsSection() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const tabParam = searchParams.get("tab")
  const subtabParam = searchParams.get("subtab")
  const activeSubtab =
    tabParam === "my-requests" || subtabParam === "my-requests"
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
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    type: "approve" | "reject"
    requestId: string
    employeeName: string
  } | null>(null)

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

  const promptAction = (id: string, type: "approve" | "reject") => {
    const item = requests.find((r) => r.id === id)
    setConfirmDialog({
      isOpen: true,
      type,
      requestId: id,
      employeeName: item?.name || "this employee",
    })
  }

  const executeConfirmAction = () => {
    if (!confirmDialog) return
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

  const filteredRequests = useMemo(() => {
    return requests.filter((item) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const match =
          item.name.toLowerCase().includes(query) ||
          item.employeeId.toLowerCase().includes(query) ||
          item.reason.toLowerCase().includes(query) ||
          item.designation.toLowerCase().includes(query)
        if (!match) return false
      }
      if (requestTypeFilter !== "All Types" && item.requestType !== requestTypeFilter) return false
      if (statusFilter !== "All Statuses" && item.status !== statusFilter) return false
      return true
    })
  }, [requests, searchQuery, requestTypeFilter, statusFilter])

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
      }),
    [requests]
  )

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5 min-w-0">
      <Toaster position="top-right" toastOptions={{ duration: 3200 }} />
      <RequestsHeader />

      <div className="w-full border-b border-gray-200 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-6 min-w-max pb-0.5">
          <button
            type="button"
            onClick={() => handleSubtabChange("team-requests")}
            className={`flex items-center gap-2 pb-3 pt-1 text-xs sm:text-sm font-semibold transition-all cursor-pointer border-b-2 -mb-[2px] ${
              activeSubtab === "team-requests"
                ? "border-[#5B50EC] text-[#5B50EC] font-bold"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            <UsersThree
              size={16}
              weight={activeSubtab === "team-requests" ? "fill" : "bold"}
              className={activeSubtab === "team-requests" ? "text-[#5B50EC]" : "text-gray-400"}
            />
            <span>Team Requests</span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                activeSubtab === "team-requests"
                  ? "bg-[#EEF2FF] text-[#5B50EC]"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {requests.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSubtabChange("my-requests")}
            className={`flex items-center gap-2 pb-3 pt-1 text-xs sm:text-sm font-semibold transition-all cursor-pointer border-b-2 -mb-[2px] ${
              activeSubtab === "my-requests"
                ? "border-[#5B50EC] text-[#5B50EC] font-bold"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            <FileText
              size={16}
              weight={activeSubtab === "my-requests" ? "fill" : "bold"}
              className={activeSubtab === "my-requests" ? "text-[#5B50EC]" : "text-gray-400"}
            />
            <span>My Requests</span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                activeSubtab === "my-requests"
                  ? "bg-[#EEF2FF] text-[#5B50EC]"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {initialMyRequests.length}
            </span>
          </button>
        </div>
      </div>

      {activeSubtab === "my-requests" ? (
        <TeamLeadMyRequestsSection hideHeader={true} />
      ) : (
        <>
          <RequestsStatsCards
        pendingCount={pendingCount}
        approvedCount={approvedCount}
        rejectedCount={rejectedCount}
        activeStatus={statusFilter}
        onStatusSelect={(status: string) => {
          setStatusFilter(status)
          setCurrentPage(1)
        }}
      />

      <RequestsTableCard
        searchQuery={searchQuery}
        onSearchChange={(q) => { setSearchQuery(q); setCurrentPage(1); }}
        requestTypeFilter={requestTypeFilter}
        onRequestTypeChange={(t) => { setRequestTypeFilter(t); setCurrentPage(1); }}
        statusFilter={statusFilter}
        onStatusChange={(s) => { setStatusFilter(s); setCurrentPage(1); }}
        dateFilter={dateFilter}
        onDateFilterChange={(v) => { setDateFilter(v); setCurrentPage(1); }}
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
        />
      )}

      {confirmDialog && (
        <ReusableConfirmationModal
          isOpen={confirmDialog.isOpen}
          onClose={() => setConfirmDialog(null)}
          onConfirm={executeConfirmAction}
          type={confirmDialog.type === "approve" ? "success" : "danger"}
          title={
            confirmDialog.type === "approve"
              ? "Approve Attendance Request?"
              : "Reject Attendance Request?"
          }
          description={`Are you sure you want to ${
            confirmDialog.type === "approve" ? "approve" : "reject"
          } the request for ${confirmDialog.employeeName}?`}
          confirmText={confirmDialog.type === "approve" ? "Approve" : "Reject"}
          cancelText="Cancel"
        />
      )}
        </>
      )}
    </div>
  )
}
